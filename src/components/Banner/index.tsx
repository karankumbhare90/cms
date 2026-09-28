import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buildBreadcrumbs, BreadcrumbItem } from '@/utils/pageUtils'

type BannerProps = {
  pageTitle?: string
  pageDescription?: string
  displayBreadcrumb?: boolean
  bannerBackground?: any
  textAlign?: 'left' | 'center' | 'right'
  displayOverlay?: boolean
  overlayOpacity?: number
  /** Pass ancestor pages for a multi-level breadcrumb. Falls back to Home → parent(s) → pageTitle. */
  breadcrumbs?: BreadcrumbItem[]
  /** Payload page document to auto-generate parent hierarchy breadcrumbs */
  page?: any
}

export const Banner: React.FC<BannerProps> = ({
  pageTitle,
  pageDescription,
  displayBreadcrumb,
  bannerBackground,
  textAlign = 'left',
  displayOverlay = true,
  overlayOpacity = 50,
  breadcrumbs,
  page,
}) => {
  if (!pageTitle && !bannerBackground) return null

  const hasBackground =
    bannerBackground && typeof bannerBackground === 'object' && bannerBackground.url

  // Convert 0-100 integer to a 0-0.93 scale for the gradient's max opacity
  const overlayAlpha = (Math.min(100, Math.max(0, overlayOpacity ?? 50)) / 100) * 0.93

  // Build breadcrumb items: custom breadcrumbs > page parent hierarchy > default [Home → pageTitle]
  const crumbs: BreadcrumbItem[] = breadcrumbs?.length
    ? breadcrumbs
    : page
      ? buildBreadcrumbs(page, pageTitle)
      : [{ label: 'Home', href: '/' }, ...(pageTitle ? [{ label: pageTitle, href: '#' }] : [])]

  return (
    <div
      className={`relative w-full overflow-hidden py-24 ${
        hasBackground ? 'text-white' : 'bg-c8 bg-gradient text-white'
      }`}
    >
      {/* ── Background image ─────────────────────────────────────────── */}
      {hasBackground && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerBackground.url}
            alt={bannerBackground.alt || 'Banner background'}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ── Diagonal gradient overlay ─────────────────────────────────── */}
      {hasBackground && displayOverlay && (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(120deg, rgba(12, 30, 51, ${overlayAlpha}) 40%, rgba(30, 64, 175, 0.0) 100%)`,
          }}
        />
      )}

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className={`relative z-20 container mx-auto px-4 text-${textAlign}`}>
        {/* Breadcrumb nav — matches _GenericBreadCrumb.cshtml banner-mode */}
        {displayBreadcrumb && crumbs.length > 0 && (
          <nav className="flex items-center gap-2 mb-5 flex-wrap" aria-label="Breadcrumb">
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1
              // Matches reference: name.Length > 3 ? name.Substring(0, 3) + "..." : name
              const shortLabel =
                crumb.label.length > 3 ? crumb.label.substring(0, 3) + '...' : crumb.label

              return (
                <span key={i} className="flex items-center gap-2">
                  {/* Chevron separator – skip before first item */}
                  {i > 0 && (
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12" aria-hidden="true">
                      <path
                        d="M4 2.5l3.5 3.5L4 9.5"
                        stroke="#8ec5ff99"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  {isLast ? (
                    /* Current page – white/80, font-medium */
                    <span
                      className="text-[13px] text-white/80 font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    /* Ancestor link – muted blue, hover to lighter blue */
                    <Link
                      href={crumb.href}
                      className="text-[13px] transition-colors"
                      style={{
                        color: 'rgba(142, 197, 255, 0.6)',
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {/* First crumb (Home) shows full label always; subsequent crumbs truncate on mobile */}
                      {i > 0 ? (
                        <>
                          <span className="sm:hidden">{shortLabel}</span>
                          <span className="hidden sm:inline">{crumb.label}</span>
                        </>
                      ) : (
                        crumb.label
                      )}
                    </Link>
                  )}
                </span>
              )
            })}
          </nav>
        )}

        {/* Page title */}
        {pageTitle && (
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md leading-tight">
            {pageTitle}
          </h1>
        )}

        {/* Page description */}
        {pageDescription && (
          <p
            className={`text-lg md:text-xl max-w-3xl mt-3 ${
              textAlign === 'center' ? 'mx-auto' : textAlign === 'right' ? 'ml-auto' : ''
            } ${hasBackground ? 'text-gray-200' : 'text-gray-600'}`}
          >
            {pageDescription}
          </p>
        )}
      </div>
    </div>
  )
}
