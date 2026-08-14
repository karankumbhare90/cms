import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { MobileMenu } from './MobileMenu'
import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa'

export async function Header() {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const navigation = await payload.findGlobal({ slug: 'navigation', depth: 2 })

  // Automatically fetch child pages for any reference links
  const allPagesRes = await payload.find({
    collection: 'pages',
    limit: 1000,
    depth: 1, // to get parent
  })
  const allPages = allPagesRes.docs

  // Recursive function to attach children
  const attachChildren = (link: any) => {
    if (link.type === 'reference' && link.reference) {
      const pageObj = typeof link.reference === 'object' ? link.reference : null
      const pageId = pageObj ? pageObj.id : link.reference

      // Override the navigation label if the referenced page has a navTitle
      if (pageObj && pageObj.navigation?.navTitle) {
        link.label = pageObj.navigation.navTitle
      }

      // Find all pages whose parent is this page
      const childPages = allPages.filter((p: any) => {
        const parentId = typeof p.parent === 'object' && p.parent !== null ? p.parent.id : p.parent
        return (
          parentId === pageId &&
          (p._status === 'published' || !p._status) &&
          p.navigation?.hideFromNavigation !== true &&
          p.navigation?.hideFromSitemap !== true
        )
      })

      if (childPages.length > 0) {
        // Convert child pages to link format
        const autoLinks = childPages.map((child: any) => {
          const newLink = {
            label: child.navigation?.navTitle || child.title,
            type: 'reference',
            reference: child,
            subLinks: [],
          }
          // Recursively attach children to this new link too!
          attachChildren(newLink)
          return newLink
        })
        link.subLinks = [...(link.subLinks || []), ...autoLinks]
      }
    }

    // Process existing subLinks as well
    if (link.subLinks && link.subLinks.length > 0) {
      link.subLinks.forEach((subLink: any) => attachChildren(subLink))
    }
  }

  if (navigation.links) {
    navigation.links.forEach((link: any) => attachChildren(link))
  }

  // Extract top header info from siteSettings
  const email = siteSettings.email as string
  const phone = siteSettings.phone as string
  const socialLinks = (siteSettings.socialLinks as any[]) || []
  const ctaLink = siteSettings.headerCTA as any[]
  const showCTA = siteSettings?.displayHeaderCTA
  const icon =
    typeof siteSettings.siteIcon === 'string' ? siteSettings.siteIcon : siteSettings.siteIcon?.url

  return (
    <header className="relative w-full z-50 transition-all duration-300">
      {/* Top Header - Dark & Sleek */}
      {(email || phone || socialLinks.length > 0) && (
        <section className="bg-c5 text-gray-200 py-2 sm:py-2.5 border-b border-gray-900/60">
          <div className="w-full container mx-auto">
            <div className="w-full flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex gap-2 items-center text-sm font-semibold hover:text-white transition-colors"
                >
                  <FaRegEnvelope className="w-4 h-4" />
                  {email}
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex gap-2 items-center text-sm font-semibold hover:text-white transition-colors"
                >
                  <FaPhoneAlt className="w-4 h-4" />
                  {phone}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Navigation - #cssmenu style */}
      <nav className="w-full bg-c5 border-b border-white/10 sticky top-0">
        <div className="w-full container mx-auto ">
          <div className="w-full flex justify-between items-center relative py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group z-10">
              {icon ? (
                <Image
                  src={icon}
                  alt={siteSettings.siteName}
                  width={160}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
              ) : (
                <span className="text-2xl font-black tracking-tight text-white transition-colors">
                  {siteSettings.siteName}
                </span>
              )}
            </Link>

            <div className="hidden lg:flex items-center h-full ml-auto">
              <ul className="flex items-stretch gap-5 h-full">
                {(navigation.links as any[])?.map((link, index) => {
                  const hasSubLinks = link.subLinks && link.subLinks.length > 0
                  const url =
                    link.type === 'custom'
                      ? link.url
                      : typeof link.reference === 'object' && link.reference !== null
                        ? `/${link.reference.slug}`
                        : typeof link.reference === 'string'
                          ? `/${link.reference}`
                          : '#'

                  const liClasses = `h-full flex items-stretch`

                  return (
                    <li key={index} className={`${liClasses} relative group`}>
                      {hasSubLinks ? (
                        <div className="flex items-center cursor-pointer gap-1 text-sm font-normal text-white transition-colors h-full">
                          <Link href={url || '#'} className="flex items-center h-full">
                            {link.label}
                          </Link>
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>

                          <div className="absolute top-full left-0 min-w-[200px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50">
                            <ul className="py-0 flex flex-col">
                              {link.subLinks.map((sub: any, subIdx: number) => {
                                const subUrl =
                                  sub.type === 'custom'
                                    ? sub.url
                                    : typeof sub.reference === 'object' && sub.reference !== null
                                      ? `/${sub.reference.slug}`
                                      : typeof sub.reference === 'string'
                                        ? `/${sub.reference}`
                                        : '#'
                                const hasSubSubLinks = sub.subLinks && sub.subLinks.length > 0
                                return (
                                  <li key={subIdx} className="relative group/sub">
                                    {hasSubSubLinks ? (
                                      <div className="flex items-center justify-between cursor-pointer text-sm font-normal text-[#4a2800] hover:bg-[#faf8f3] transition-colors">
                                        <Link href={subUrl || '#'} className="flex-grow px-4 py-3">
                                          {sub.label}
                                        </Link>
                                        <svg
                                          className="w-3 h-3 mr-4 -rotate-90 text-[#4a2800]"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                          />
                                        </svg>
                                        <div className="absolute top-0 left-full min-w-[200px] bg-white opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 shadow-xl z-50">
                                          <ul className="py-0 flex flex-col">
                                            {sub.subLinks.map((subSub: any, subSubIdx: number) => {
                                              const subSubUrl =
                                                subSub.type === 'custom'
                                                  ? subSub.url
                                                  : typeof subSub.reference === 'object' &&
                                                      subSub.reference !== null
                                                    ? `/${subSub.reference.slug}`
                                                    : typeof subSub.reference === 'string'
                                                      ? `/${subSub.reference}`
                                                      : '#'
                                              return (
                                                <li key={subSubIdx}>
                                                  <Link
                                                    href={subSubUrl || '#'}
                                                    className="block px-4 py-3 text-sm font-normal text-[#4a2800] hover:bg-[#faf8f3] transition-colors"
                                                  >
                                                    {subSub.label}
                                                  </Link>
                                                </li>
                                              )
                                            })}
                                          </ul>
                                        </div>
                                      </div>
                                    ) : (
                                      <Link
                                        href={subUrl || '#'}
                                        className="block px-4 py-3 text-sm font-normal text-[#4a2800] hover:bg-[#faf8f3] transition-colors"
                                      >
                                        {sub.label}
                                      </Link>
                                    )}
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={url || '#'}
                          className="flex items-center h-full text-sm font-normal text-white hover:bg-white/10 transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>

              <div className="flex items-center space-x-4 pl-4 h-full">
                {/* CTA Button */}
                {showCTA && ctaLink && ctaLink.length > 0 && (
                  <div className="h-8 flex items-center">
                    <a
                      href={ctaLink[0].url || '#'}
                      className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-semibold text-[#4a2800] bg-white hover:bg-gray-100 rounded shadow-md transition-colors"
                    >
                      {ctaLink[0].label}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button & Drawer */}
            <MobileMenu navigation={navigation} ctaLink={ctaLink} showCTA={showCTA as boolean} />
          </div>
        </div>
      </nav>
    </header>
  )
}
