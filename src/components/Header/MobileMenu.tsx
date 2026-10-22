'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { buildPagePath } from '@/utils/pageUtils'

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

export function MobileMenu({
  navigation,
  ctaLink,
  showCTA,
}: {
  navigation: any
  ctaLink: any[]
  showCTA: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [expandedSubItem, setExpandedSubItem] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleAccordion = (index: number) => {
    setExpandedItem((prev) => (prev === index ? null : index))
  }

  const toggleSubAccordion = (index: number) => {
    setExpandedSubItem((prev) => (prev === index ? null : index))
  }

  const drawerContent = (
    <>
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 flex flex-col overflow-y-auto z-40 border-t border-white/10"
          style={{ background: '#0C1E33', top: 'var(--header-height, 110px)' }}
        >
          <div className="container py-3 flex flex-col gap-0.5 pb-6">
            {(navigation?.links as any[])?.map((link, index) => {
              const hasSubLinks = link.subLinks && link.subLinks.length > 0
              const url = getLinkUrl(link)

              const accordionOpen = expandedItem === index

              if (!hasSubLinks) {
                return (
                  <Link
                    key={index}
                    href={url || '#'}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-3 rounded-[8px] text-[15px] font-medium transition-colors"
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      color: 'rgba(255,255,255,0.75)',
                      background: 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              }

              return (
                <div key={index}>
                  <div
                    className="flex items-center rounded-[8px] overflow-hidden"
                    style={{ background: accordionOpen ? 'rgba(255,255,255,0.09)' : 'transparent' }}
                  >
                    <Link
                      href={url || '#'}
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-3 py-3 text-[15px] font-medium transition-colors"
                      style={{
                        fontFamily: 'var(--font-family-base)',
                        color: accordionOpen ? 'white' : 'rgba(255,255,255,0.75)',
                      }}
                    >
                      {link.label}
                    </Link>
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="px-3 py-3 text-white/50 hover:text-white transition-colors"
                      aria-label={`Toggle ${link.label} submenu`}
                    >
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 14 14"
                        style={{
                          transition: 'transform 0.2s',
                          transform: accordionOpen ? 'rotate(180deg)' : 'none',
                        }}
                      >
                        <path
                          d="M2.5 5l4.5 4.5L11.5 5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {accordionOpen && (
                    <div className="ml-3 mt-2 mb-2 flex flex-col gap-0.5 pl-3 border-l border-white/10">
                      {link.subLinks.map((sub: any, subIdx: number) => {
                        const subUrl = getLinkUrl(sub)
                        const hasSubSubLinks = sub.subLinks && sub.subLinks.length > 0
                        const subAccordionOpen = expandedSubItem === subIdx

                        if (!hasSubSubLinks) {
                          return (
                            <Link
                              key={subIdx}
                              href={subUrl || '#'}
                              onClick={() => setIsOpen(false)}
                              className="px-3 py-2.5 rounded-[7px] text-[14px] transition-colors"
                              style={{
                                fontFamily: 'var(--font-family-base)',
                                color: 'rgba(255,255,255,0.60)',
                                background: 'transparent',
                              }}
                            >
                              {sub.label}
                            </Link>
                          )
                        }

                        return (
                          <div key={subIdx}>
                            <div
                              className="flex items-center rounded-[7px] overflow-hidden"
                              style={{
                                background: subAccordionOpen
                                  ? 'rgba(255,255,255,0.06)'
                                  : 'transparent',
                              }}
                            >
                              <Link
                                href={subUrl || '#'}
                                onClick={() => setIsOpen(false)}
                                className="flex-1 px-3 py-2.5 text-[14px] transition-colors"
                                style={{
                                  fontFamily: 'var(--font-family-base)',
                                  color: subAccordionOpen ? 'white' : 'rgba(255,255,255,0.60)',
                                }}
                              >
                                {sub.label}
                              </Link>
                              <button
                                onClick={() => toggleSubAccordion(subIdx)}
                                className="px-3 py-2.5 text-white/50 hover:text-white transition-colors"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  style={{
                                    transition: 'transform 0.2s',
                                    transform: subAccordionOpen ? 'rotate(180deg)' : 'none',
                                  }}
                                >
                                  <path
                                    d="M2.5 5l4.5 4.5L11.5 5"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>

                            {subAccordionOpen && (
                              <div className="ml-3 mt-0.5 mb-1 flex flex-col gap-0.5 pl-3 border-l border-white/12">
                                {sub.subLinks.map((subSub: any, subSubIdx: number) => {
                                  const subSubUrl = getLinkUrl(subSub)

                                  return (
                                    <Link
                                      key={subSubIdx}
                                      href={subSubUrl || '#'}
                                      onClick={() => setIsOpen(false)}
                                      className="px-3 py-2 rounded-[6px] text-[13px] transition-colors"
                                      style={{
                                        fontFamily: 'var(--font-family-base)',
                                        color: 'rgba(255,255,255,0.50)',
                                      }}
                                    >
                                      {subSub.label}
                                    </Link>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="w-full border-t border-white/10">
            <div className="container pb-5 pt-5  bg-[#0C1E33] sticky bottom-0">
              {showCTA && ctaLink && ctaLink.length > 0 ? (
                <Link
                  href={ctaLink[0].url || '#'}
                  onClick={() => setIsOpen(false)}
                  className="outline-none !text-white w-full flex items-center justify-center py-3 rounded-[8px] text-[15px] font-semibold hover:opacity-90 transition-all"
                  style={{
                    background: 'linear-gradient(135deg,#2563EB,#1E40AF)',
                    fontFamily: 'var(--font-family-base)',
                  }}
                >
                  {ctaLink[0].label}
                </Link>
              ) : (
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center py-3 rounded-[8px] text-[15px] font-semibold text-white hover:opacity-90 transition-all"
                  style={{
                    background: 'linear-gradient(135deg,#2563EB,#1E40AF)',
                    fontFamily: 'var(--font-family-base)',
                  }}
                >
                  Contact Us
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
      <button
        className="text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none"
        onClick={() => {
          setIsOpen((o) => !o)
          setExpandedItem(null)
          setExpandedSubItem(null)
        }}
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
          {isOpen ? (
            <path d="M4 4l14 14M18 4L4 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <>
              <rect y="4" width="22" height="2" rx="1" fill="white" />
              <rect y="10" width="22" height="2" rx="1" fill="white" />
              <rect y="16" width="22" height="2" rx="1" fill="white" />
            </>
          )}
        </svg>
      </button>

      {mounted && createPortal(drawerContent, document.body)}
    </>
  )
}
