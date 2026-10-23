'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import { motion } from 'framer-motion'

export const Testimonial: React.FC<any> = ({
  introText,
  testimonials,
  introLinks,
  settings,
  enableCarousel = true,
  itemsPerRow: itemsPerRowProp,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(itemsPerRowProp || '3', 10)
  const isDarkBg = themeClass === 'bg-c7' || themeClass === 'bg-c8'

  const totalTestimonials = Array.isArray(testimonials) ? testimonials.length : 0

  // Embla Carousel setup: pure CSS responsiveness prevents any mobile squishing!
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: totalTestimonials > 1,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  let gridClass = 'grid-cols-1 md:grid-cols-2'
  if (itemsPerRow === 3) gridClass += ' lg:grid-cols-3'
  else if (itemsPerRow === 4) gridClass += ' xl:grid-cols-4'

  const renderTestimonialCard = (item: any, idx: number) => {
    const imageUrl =
      typeof item.image === 'object' && item.image?.url
        ? item.image.url
        : typeof item.image === 'string' &&
            (item.image.startsWith('/') || item.image.startsWith('http'))
          ? item.image
          : null

    const authorNameClean = item.authorName?.trim() || ''
    const authorInitial = authorNameClean ? authorNameClean.charAt(0).toUpperCase() : ''

    return (
      <motion.div
        key={idx}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="flex flex-col h-full bg-white shadow-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-xl border border-gray-100/90 text-left justify-between box-border"
      >
        <div className="flex flex-col gap-4 flex-1">
          {/* Header: Avatar, Name, Rating */}
          <div className="flex items-center gap-4 w-full">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={authorNameClean || 'Author'}
                className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0 border border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[var(--color-4,#EFF6FF)] text-[var(--color-6,#2563EB)] border border-[var(--color-5,#BFDBFE)] flex items-center justify-center font-bold text-lg shadow-sm shrink-0 uppercase">
                {authorInitial || (
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg text-[#0C1E33] leading-snug">
                {authorNameClean || 'Anonymous'}
              </h4>
              <div className="flex gap-1 mt-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, rIdx) => {
                  const isFilled = rIdx < (item.rating || 5)
                  return (
                    <svg
                      key={rIdx}
                      className={`w-4 h-4 ${isFilled ? 'fill-current' : 'fill-transparent stroke-current'}`}
                      viewBox="0 0 20 20"
                      strokeWidth={isFilled ? '0' : '1.5'}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Body: Quote */}
          <p className="text-sm sm:text-base text-gray-600 m-0 leading-relaxed font-normal">
            {item.quote}
          </p>
        </div>

        {/* Footer: Role Badge & Quote Icon */}
        <div className="w-full flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          {item.role ? (
            <span className="bg-[var(--color-4,#EFF6FF)] text-[var(--color-6,#2563EB)] border border-[var(--color-5,#BFDBFE)] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
              {item.role}
            </span>
          ) : (
            <span />
          )}
          <svg className="w-7 h-7 text-amber-400/80 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
      </motion.div>
    )
  }

  return (
    <section className={`testimonial ${themeClass} ${textAlignment} relative`}>
      <div className="inner-wrap">
        <div className="container mx-auto">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {testimonials && testimonials.length > 0 && (
            enableCarousel ? (
              <div className="testimonial-carousel-wrapper content-wrap w-full">
                {/* Embla Viewport */}
                <div className="overflow-hidden w-full select-none cursor-grab active:cursor-grabbing" ref={emblaRef}>
                  <div className="flex -mx-3 items-stretch">
                    {testimonials.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className={`min-w-0 flex-[0_0_100%] sm:flex-[0_0_100%] md:flex-[0_0_50%] ${
                          itemsPerRow === 4
                            ? 'lg:flex-[0_0_33.333333%] xl:flex-[0_0_25%]'
                            : 'lg:flex-[0_0_33.333333%]'
                        } px-3 pb-2 flex flex-col box-border`}
                      >
                        {renderTestimonialCard(item, idx)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand-Styled Interactive Carousel Dots */}
                {scrollSnaps.length > 1 && (
                  <div
                    className="flex items-center justify-center gap-2.5 mt-8 w-full"
                    aria-label="Testimonials pagination"
                  >
                    {scrollSnaps.map((_, index) => {
                      const isActive = index === selectedIndex
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => scrollTo(index)}
                          aria-label={`Go to slide ${index + 1}`}
                          className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                            isActive
                              ? isDarkBg
                                ? 'w-8 bg-white shadow-[0_2px_8px_rgba(255,255,255,0.45)]'
                                : 'w-8 bg-[var(--color-6,#2563EB)] shadow-[0_2px_8px_rgba(37,99,235,0.35)]'
                              : isDarkBg
                                ? 'w-2.5 bg-white/35 hover:bg-white/70'
                                : 'w-2.5 bg-[var(--color-5,#BFDBFE)] hover:bg-[var(--color-6,#2563EB)] opacity-85'
                          }`}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className={`content-wrap w-full grid gap-6 sm:gap-8 ${gridClass}`}>
                {testimonials.map((item: any, idx: number) => (
                  <div key={idx} className="w-full h-full flex flex-col">
                    {renderTestimonialCard(item, idx)}
                  </div>
                ))}
              </div>
            )
          )}

          {introLinks && introLinks.length > 0 && (
            <div className="w-full mt-8">
              <IntroLinks introLinks={introLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { TestimonialSkeleton } from '../skeletons'
