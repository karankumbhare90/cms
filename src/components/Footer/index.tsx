import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

export async function Footer() {
  const payload = await getPayload({ config })
  const footer = await payload.findGlobal({ slug: 'footer' })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  const isFourColumn = footer.enableFourColumnLayout
  const groups = (footer.footerLinkGroups as any[]) || []

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isFourColumn ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-12 lg:gap-8`}>
          {/* Logo & Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">{siteSettings.siteName}</h3>
              <p className="text-sm text-gray-400 max-w-xs">{siteSettings.description || "Building better digital experiences for modern forward-thinking companies."}</p>
            </div>
            
            <div className="space-y-3">
              {siteSettings.address && (
                <p className="flex items-start text-sm hover:text-white transition-colors">
                  <span className="mr-3 text-blue-500">📍</span>
                  {siteSettings.address}
                </p>
              )}
              {siteSettings.email && (
                <p className="flex items-center text-sm">
                  <span className="mr-3 text-blue-500">✉</span>
                  <a href={`mailto:${siteSettings.email}`} className="hover:text-blue-400 hover:underline transition-all">{siteSettings.email}</a>
                </p>
              )}
              {siteSettings.phone && (
                <p className="flex items-center text-sm">
                  <span className="mr-3 text-blue-500">☏</span>
                  <a href={`tel:${siteSettings.phone}`} className="hover:text-blue-400 hover:underline transition-all">{siteSettings.phone}</a>
                </p>
              )}
            </div>

            {/* Social Links */}
            {(siteSettings.socialLinks as any[])?.length > 0 && (
              <div className="flex items-center space-x-4 pt-2">
                {(siteSettings.socialLinks as any[]).map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link || '#'}
                    title={social.title || ''}
                    className="text-gray-400 hover:text-white transition-transform hover:scale-110"
                  >
                    {social.icon || social.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Link Groups */}
          {groups.map((group, index) => (
            <div key={index}>
              <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">{group.groupName}</h4>
              <ul className="space-y-4">
                {group.links?.map((link: any, lIndex: number) => {
                  const url = link.type === 'custom' ? link.url : (typeof link.reference?.value === 'object' ? `/${link.reference.value.slug}` : '#')
                  return (
                    <li key={lIndex}>
                      <Link href={url || '#'} className="group text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center">
                        <span className="mr-2 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0 text-blue-500">›</span>
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            {footer.copyrightText || `© ${new Date().getFullYear()} ${siteSettings.siteName}. All rights reserved.`}
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
