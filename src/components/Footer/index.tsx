import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buildPagePath } from '@/utils/pageUtils'
import { ScrollToTop } from './ScrollToTop'
import { DynamicIcon } from './DynamicIcon'
import { IoLocationOutline } from 'react-icons/io5'
import { FaRegEnvelope } from 'react-icons/fa6'
import { IoMdCall } from 'react-icons/io'
import { getFooterCached, getSiteSettingsCached } from '@/utils/cachedData'

export async function Footer() {
  const footer = await getFooterCached()
  const siteSettings = await getSiteSettingsCached()

  const isFourColumn = footer.enableFourColumnLayout
  const groups = (footer.footerLinkGroups as any[]) || []

  const getLinkUrl = (link: any): string => {
    if (!link) return '#'
    if (link.type === 'custom') return link.url || '#'
    if (link.type === 'reference' && link.reference) {
      const pageObj =
        typeof link.reference === 'object' && link.reference !== null && 'value' in link.reference
          ? link.reference.value
          : link.reference
      if (typeof pageObj === 'object' && pageObj !== null) {
        return buildPagePath(pageObj)
      }
      if (typeof pageObj === 'string' && pageObj) {
        return `/${pageObj}`
      }
    }
    return '#'
  }

  return (
    <>
      <ScrollToTop />
      <footer className="bg-[#0C1E33]">
        <div className="container mx-auto pt-16 pb-10">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${isFourColumn ? 'lg:grid-cols-4 xl:grid-cols-4' : 'lg:grid-cols-4 xl:grid-cols-5'} gap-8 lg:gap-10 pb-12 border-b border-white/10`}
          >
            {/* Logo & Description */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              {footer.footerLogo &&
              typeof footer.footerLogo === 'object' &&
              footer.footerLogo.url ? (
                <Link href="/">
                  <Image
                    src={footer.footerLogo.url}
                    alt={footer.footerLogo.alt || siteSettings.siteName}
                    width={160}
                    height={32}
                    quality={80}
                    loading="lazy"
                    className="w-auto mb-5 h-8"
                  />
                </Link>
              ) : (
                <h3 className="text-2xl font-black text-white tracking-tight mb-5">
                  {siteSettings.siteName}
                </h3>
              )}
              <p className="text-[14px] text-white/75 leading-[1.65] mb-5 !mt-0 font-[var(--font-family-base)]">
                {siteSettings.description ||
                  'Building better digital experiences for modern forward-thinking companies.'}
              </p>
            </div>

            {/* Dynamic Link Groups */}
            {groups.map((group, index) => (
              <div key={index}>
                <p className="!mt-0 text-[11px] font-bold tracking-widest uppercase text-white/70 mb-4 font-[var(--font-family-base)]">
                  {group.groupName}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.links?.map((link: any, lIndex: number) => {
                    const url = getLinkUrl(link)
                    return (
                      <li key={lIndex}>
                        <Link
                          href={url || '#'}
                          className="text-[14px] text-white/75 hover:text-white transition-colors font-[var(--font-family-base)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}

            {/* Contact & Social */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <p className="!mt-0 text-[11px] font-bold tracking-widest uppercase text-white/70 mb-4 font-[var(--font-family-base)]">
                Contact Us
              </p>
              <ul className="flex flex-col gap-4 mb-5">
                {siteSettings.address && (
                  <li>
                    {siteSettings.addressUrl ? (
                      <a
                        href={siteSettings.addressUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-[14px] text-white/75 hover:text-white transition-colors font-[var(--font-family-base)] group"
                      >
                        <IoLocationOutline className="mt-1 flex-shrink-0 text-white/75 group-hover:text-white transition-colors" />
                        <span>{siteSettings.address}</span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 text-[14px] text-white/75 font-[var(--font-family-base)]">
                        <IoLocationOutline className="mt-1 flex-shrink-0 text-white/75" />
                        <span>{siteSettings.address}</span>
                      </div>
                    )}
                  </li>
                )}
                {siteSettings.email && (
                  <li>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="flex items-start gap-3 text-[14px] text-white/75 hover:text-white transition-colors font-[var(--font-family-base)] group"
                    >
                      <FaRegEnvelope className="mt-1 flex-shrink-0 text-white/75 group-hover:text-white transition-colors" />
                      <span>{siteSettings.email}</span>
                    </a>
                  </li>
                )}
                {siteSettings.phone && (
                  <li>
                    <a
                      href={`tel:${siteSettings.phone}`}
                      className="flex items-start gap-3 text-[14px] text-white/75 hover:text-white transition-colors font-[var(--font-family-base)] group"
                    >
                      <IoMdCall className="mt-1 flex-shrink-0 text-white/75 group-hover:text-white transition-colors" />
                      <span>{siteSettings.phone}</span>
                    </a>
                  </li>
                )}
              </ul>
              {(siteSettings.socialLinks as any[])?.length > 0 && (
                <div className="flex items-center gap-4">
                  {(siteSettings.socialLinks as any[]).map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link || '#'}
                      title={social.title || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-transform hover:scale-110 text-[18px]"
                    >
                      {social.icon ? <DynamicIcon name={social.icon} /> : social.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Copyright & Bottom Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-between -mb-4">
            {/* Left: copyright */}
            <div className="w-full md:w-1/2 lg:w-1/3 sm:-mx-4 mb-4 flex flex-1 justify-center md:justify-start">
              <p className="text-[13px] text-white/70 text-center md:text-left !m-0 sm:px-4 sm:whitespace-nowrap font-[var(--font-family-base)]">
                {footer.copyrightText ||
                  `© ${new Date().getFullYear()} ${siteSettings.siteName} All rights reserved.`}
              </p>
            </div>
            {/* Centre: Sitemap + Support / Footer Bottom Links */}
            <div className="flex justify-center md:justify-end lg:justify-center gap-6 w-full md:w-1/2 lg:w-1/3 mb-4">
              {footer.footerBottomLinks && footer.footerBottomLinks.length > 0 ? (
                footer.footerBottomLinks.map((link: any, idx: number) => {
                  const url = getLinkUrl(link)
                  return (
                    <Link
                      key={idx}
                      href={url || '#'}
                      className="text-[13px] text-white/70 hover:text-white transition-colors font-[var(--font-family-base)]"
                    >
                      {link.label}
                    </Link>
                  )
                })
              ) : (
                <>
                  <Link
                    href="/privacy-policy"
                    className="text-[13px] text-white/70 hover:text-white transition-colors font-[var(--font-family-base)]"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-[13px] text-white/70 hover:text-white transition-colors font-[var(--font-family-base)]"
                  >
                    Terms of Service
                  </Link>
                </>
              )}
            </div>
            {/* Right: Designed & Developed by */}
            <div className="flex items-center gap-2 w-full lg:w-1/3 justify-center lg:justify-end sm:-mx-4 mb-4 text-[13px] text-white/70 sm:px-4">
              <span className="font-[var(--font-family-base)]">Design &amp; developed by</span>
              <span className="font-bold text-white/90 font-[var(--font-family-base)]">
                Karan Kumbhare
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
