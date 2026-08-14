'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { createPortal } from 'react-dom'

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

  const drawerContent = (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      <div
        className={`fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end items-center p-6 border-b border-gray-100">
          {/* <span className="text-xl font-black text-gray-900 tracking-tight">Menu</span> */}
          <button
            aria-label="Close Menu"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-900 focus:outline-none transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-6 overflow-y-auto h-full">
          <ul className="flex flex-col space-y-4">
            {(navigation?.links as any[])?.map((link, index) => {
              const hasSubLinks = link.subLinks && link.subLinks.length > 0
              const url =
                link.type === 'custom'
                  ? link.url
                  : typeof link.reference === 'object' && link.reference !== null
                    ? `/${link.reference.slug}`
                    : typeof link.reference === 'string'
                      ? `/${link.reference}`
                      : '#'
              return (
                <li key={index} className="flex flex-col">
                  {hasSubLinks ? (
                    <>
                      <button
                        onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                        className="flex items-center justify-between text-lg font-semibold text-gray-700 hover:text-blue-600 uppercase tracking-wide transition-colors w-full text-left py-2"
                      >
                        {link.label}
                        <svg className={`w-5 h-5 transition-transform duration-300 ${expandedItem === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedItem === index && (
                        <ul className="flex flex-col pl-4 mt-2 space-y-3 border-l-2 border-gray-100 mb-2">
                          {link.subLinks.map((sub: any, subIdx: number) => {
                            const subUrl = sub.type === 'custom' 
                              ? sub.url 
                              : typeof sub.reference === 'object' && sub.reference !== null
                                ? `/${sub.reference.slug}` 
                                : typeof sub.reference === 'string'
                                  ? `/${sub.reference}`
                                  : '#'
                            const hasSubSubLinks = sub.subLinks && sub.subLinks.length > 0;
                            return (
                              <li key={subIdx} className="flex flex-col">
                                {hasSubSubLinks ? (
                                  <>
                                    <button
                                      onClick={() => setExpandedSubItem(expandedSubItem === subIdx ? null : subIdx)}
                                      className="flex items-center justify-between text-base font-medium text-gray-600 hover:text-blue-600 capitalize transition-colors w-full text-left py-1"
                                    >
                                      {sub.label}
                                      <svg className={`w-4 h-4 transition-transform duration-300 ${expandedSubItem === subIdx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                    {expandedSubItem === subIdx && (
                                      <ul className="flex flex-col pl-4 mt-1 space-y-2 border-l-2 border-gray-100 mb-1">
                                        {sub.subLinks.map((subSub: any, subSubIdx: number) => {
                                          const subSubUrl = subSub.type === 'custom'
                                            ? subSub.url
                                            : typeof subSub.reference === 'object' && subSub.reference !== null
                                              ? `/${subSub.reference.slug}`
                                              : typeof subSub.reference === 'string'
                                                ? `/${subSub.reference}`
                                                : '#'
                                          return (
                                            <li key={subSubIdx}>
                                              <Link
                                                href={subSubUrl || '#'}
                                                onClick={() => setIsOpen(false)}
                                                className="text-sm font-medium text-gray-500 hover:text-blue-600 capitalize transition-colors block py-1"
                                              >
                                                {subSub.label}
                                              </Link>
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    )}
                                  </>
                                ) : (
                                  <Link
                                    href={subUrl || '#'}
                                    onClick={() => setIsOpen(false)}
                                    className="text-base font-medium text-gray-600 hover:text-blue-600 capitalize transition-colors block py-1"
                                  >
                                    {sub.label}
                                  </Link>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={url || '#'}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-semibold text-gray-700 hover:text-blue-600 uppercase tracking-wide transition-colors block py-2"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col space-y-4">
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-all active:scale-95"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Admin Login
            </Link>

            {showCTA && ctaLink && ctaLink.length > 0 && (
              <a
                href={ctaLink[0].url || '#'}
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md shadow-blue-500/30 transition-all active:scale-95"
              >
                {ctaLink[0].label}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(true)}
          className="text-gray-900 focus:outline-none hover:text-blue-600 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {mounted && createPortal(drawerContent, document.body)}
    </>
  )
}
