import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa'
import { MobileMenu } from './MobileMenu'
import { HeaderHeightObserver } from './HeaderHeightObserver'
import { DesktopNav } from './DesktopNav'
import { getSiteSettingsCached, getNavigationCached } from '@/utils/cachedData'

export async function Header() {
  const siteSettings = await getSiteSettingsCached()
  const navigation = await getNavigationCached()

  // Extract top header info from siteSettings
  const email = siteSettings.email as string
  const phone = siteSettings.phone as string
  const socialLinks = (siteSettings.socialLinks as any[]) || []
  const ctaLink = siteSettings.headerCTA as any[]
  const showCTA = siteSettings?.displayHeaderCTA
  const showTopHeader = siteSettings?.displayTopHeader ?? true
  const siteIconData = siteSettings?.siteIcon as any
  let icon: string | null = null
  if (typeof siteIconData === 'object' && siteIconData !== null) {
    if (siteIconData.url) {
      icon = siteIconData.url
    } else if (siteIconData.filename) {
      icon = `/api/media/file/${siteIconData.filename}`
    }
  } else if (
    typeof siteIconData === 'string' &&
    (siteIconData.startsWith('/') ||
      siteIconData.startsWith('http://') ||
      siteIconData.startsWith('https://'))
  ) {
    icon = siteIconData
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0C1E33] border-b border-white/10">
        <HeaderHeightObserver />
        {/* Top Header */}
        {showTopHeader && (email || phone || socialLinks.length > 0) && (
          <section className="bg-white/5 text-gray-300 py-2 sm:py-2.5 border-b border-white/5">
            <div className="container mx-auto">
              <div className="w-full flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex gap-2 items-center text-xs sm:text-sm font-medium hover:text-white transition-colors duration-300"
                  >
                    <FaRegEnvelope className="w-3.5 h-3.5" />
                    {email}
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex gap-2 items-center text-xs sm:text-sm font-medium hover:text-white transition-colors duration-300"
                  >
                    <FaPhoneAlt className="w-3.5 h-3.5" />
                    {phone}
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        <div className="container mx-auto flex items-center justify-between h-[72px] relative">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group z-20">
            {icon ? (
              <Image
                src={icon}
                alt={siteSettings.siteName || 'Site Logo'}
                width={220}
                height={40}
                className="h-10 w-auto object-contain"
                priority
                unoptimized={Boolean(icon && icon.includes('.svg'))}
              />
            ) : (
              <span className="text-2xl font-black tracking-tight text-white transition-colors">
                {siteSettings.siteName}
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <DesktopNav links={navigation.links as any[]} />

          <div className="flex items-center gap-3 z-20">
            {/* CTA Button */}
            {showCTA && ctaLink && ctaLink.length > 0 && (
              <div className="hidden xl:flex items-center">
                <a
                  href={ctaLink[0].url || '#'}
                  className="px-5 py-2 rounded-[6px] text-[14px] font-semibold !outline-none !text-white hover:!text-white hover:opacity-90 transition-all shadow-md"
                  style={{ background: 'linear-gradient(135deg,#2563EB,#1E40AF)' }}
                >
                  {ctaLink[0].label}
                </a>
              </div>
            )}

            {/* Mobile Menu Button & Drawer */}
            <div className="xl:hidden flex items-center">
              <MobileMenu navigation={navigation} ctaLink={ctaLink} showCTA={showCTA as boolean} />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
