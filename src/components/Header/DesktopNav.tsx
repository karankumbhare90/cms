'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buildPagePath } from '@/utils/pageUtils'

export function DesktopNav({ links }: { links: any[] }) {
  const pathname = usePathname()

  const isActive = (url: string) => {
    if (!url || url === '#') return false
    if (url === '/') return pathname === '/'
    return pathname === url || pathname.startsWith(url + '/')
  }

  const getLinkUrl = (link: any) => {
    if (!link) return '#'
    if (link.type === 'custom') return link.url || '#'
    if (typeof link.reference === 'object' && link.reference !== null) {
      return buildPagePath(link.reference)
    }
    if (typeof link.reference === 'string' && link.reference) {
      return `/${link.reference}`
    }
    return '#'
  }

  return (
    <nav className="hidden xl:flex items-center justify-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-lg">
      {links?.map((link, index) => {
        const hasSubLinks = link.subLinks && link.subLinks.length > 0
        const url = getLinkUrl(link)

        const active = isActive(url)

        return (
          <div key={index} className="gel-nav-parent relative group">
            <Link
              href={url || '#'}
              className="flex items-center gap-1 px-3 py-2 rounded-[6px] text-[14px] font-medium transition-colors"
              style={{
                color: active ? 'white' : 'rgba(255,255,255,0.7)',
                background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.color = 'white'
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'
              }}
            >
              {link.label}
              {hasSubLinks && (
                <svg className="gel-chevron ml-1" width="11" height="11" fill="none" viewBox="0 0 11 11">
                  <path
                    d="M2 4l3.5 3.5L9 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>

            {hasSubLinks && (
              <div
                className="gel-dropdown absolute top-full left-0 pt-2 z-50"
                style={{ minWidth: 220 }}
              >
                <div
                  className="rounded-[10px] border border-white/10 overflow-hidden shadow-2xl"
                  style={{ background: '#0F2740' }}
                >
                  {link.subLinks.map((sub: any, subIdx: number) => {
                    const subUrl = getLinkUrl(sub)
                    
                    const childActive = isActive(subUrl)

                    return (
                      <Link
                        key={subIdx}
                        href={subUrl || '#'}
                        className="block px-4 py-2.5 text-[14px] transition-colors"
                        style={{
                          color: childActive ? 'white' : 'rgba(255,255,255,0.72)',
                          background: childActive ? 'rgba(37,99,235,0.25)' : 'transparent',
                          fontWeight: childActive ? '600' : '400',
                        }}
                        onMouseEnter={(e) => {
                          if (!childActive) {
                            (e.currentTarget as HTMLElement).style.color = 'white'
                            ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!childActive) {
                            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.72)'
                            ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                          }
                        }}
                      >
                        {sub.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
