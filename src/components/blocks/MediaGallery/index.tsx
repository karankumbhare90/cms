'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const MediaGallery: React.FC<any> = ({
  introText,
  mediaItems,
  introLinks,
  settings,
  enableMasonry,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const validMediaItems = mediaItems?.filter((item: any) => item.image?.url) || []
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Custom Masonry Logic
  const [columnsCount, setColumnsCount] = useState(3)

  useEffect(() => {
    if (!enableMasonry) return

    const updateColumns = () => {
      if (window.innerWidth < 640) setColumnsCount(1)
      else if (window.innerWidth < 1024) setColumnsCount(2)
      else setColumnsCount(3)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [enableMasonry])

  const getMasonryColumns = () => {
    const cols: { item: any; originalIdx: number }[][] = Array.from(
      { length: columnsCount },
      () => [],
    )
    validMediaItems.forEach((item: any, idx: number) => {
      cols[idx % columnsCount].push({ item, originalIdx: idx })
    })
    return cols
  }

  return (
    <section className={`media-gallery ${themeClass} ${textAlignment}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {validMediaItems.length > 0 &&
            (enableMasonry ? (
              <div className="flex gap-6 content-wrap items-start">
                {getMasonryColumns().map((col, colIndex) => (
                  <div key={colIndex} className="flex-1 flex flex-col gap-6">
                    {col.map(({ item, originalIdx }) => (
                      <div
                        key={originalIdx}
                        onClick={() => setSelectedIndex(originalIdx)}
                        className="relative group overflow-hidden rounded-xl border border-[#E0EFFE] hover:border-[var(--color-6)]/40 shadow-sm hover:shadow-lg bg-[var(--title-colour-light-bg)] transition-all duration-300 cursor-pointer min-h-[200px]"
                      >
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.caption || 'Gallery Image'}
                          width={500}
                          height={350}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={75}
                          loading="lazy"
                          className="w-full h-auto block opacity-90 transition-transform duration-500 group-hover:scale-105"
                        />
                        {item.caption && (
                          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                            <p className="!text-[var(--color-1)] font-medium text-[15px] m-0">
                              {item.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 content-wrap">
                {validMediaItems.map((item: any, idx: number) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className="relative group overflow-hidden rounded-[12px] border border-[#E0EFFE] hover:border-[var(--color-6)]/40 shadow-sm hover:shadow-lg bg-[var(--title-colour-light-bg)] transition-all duration-300 cursor-pointer aspect-square"
                    >
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.caption || 'Gallery Image'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 aspect-square"
                      />
                      {item.caption && (
                        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0C1E33]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                          <p className="text-[var(--color-1)] font-medium text-[15px] m-0">
                            {item.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}

          {introLinks && introLinks.length > 0 && (
            <div className="w-full">
              <IntroLinks introLinks={introLinks} />
            </div>
          )}

          {/* Lightbox Modal */}
          {selectedIndex !== null && validMediaItems[selectedIndex] && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center text-white z-[110]">
                {/* Counter */}
                <div className="text-xl font-medium tracking-wide">
                  {selectedIndex + 1} / {validMediaItems.length}
                </div>

                {/* Close Button */}
                <button
                  className="text-white hover:text-gray-300 transition-transform hover:scale-110 p-2"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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

              {/* Left Arrow */}
              {validMediaItems.length > 1 && (
                <button
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-white transition-all bg-black/50 hover:bg-black/80 hover:scale-110 rounded-full p-3 z-[110]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex(
                      (selectedIndex - 1 + validMediaItems.length) % validMediaItems.length,
                    )
                  }}
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              {/* Right Arrow */}
              {validMediaItems.length > 1 && (
                <button
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-white transition-all bg-black/50 hover:bg-black/80 hover:scale-110 rounded-full p-3 z-[110]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex((selectedIndex + 1) % validMediaItems.length)
                  }}
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}

              <div
                className="relative max-w-6xl w-full h-full p-12 flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={validMediaItems[selectedIndex].image.url}
                  alt={
                    validMediaItems[selectedIndex].image.alt ||
                    validMediaItems[selectedIndex].caption ||
                    'Gallery Image'
                  }
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                {validMediaItems[selectedIndex].caption && (
                  <div className="mt-4 p-4 bg-black/60 rounded-xl backdrop-blur-md">
                    <p className="text-white font-medium text-lg text-center tracking-wide">
                      {validMediaItems[selectedIndex].caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
