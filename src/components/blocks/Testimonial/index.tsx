'use client'

import React, { useState, useEffect } from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { motion } from 'framer-motion'

export const Testimonial: React.FC<any> = ({
  introText,
  testimonials,
  introLinks,
  settings,
  enableCarousel,
  itemsPerRow: itemsPerRowProp,
}) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(itemsPerRowProp || '3', 10)

  let gridClass = 'grid-cols-1 md:grid-cols-2'
  if (itemsPerRow === 3) gridClass += ' lg:grid-cols-3'
  else if (itemsPerRow === 4) gridClass += ' xl:grid-cols-4'

  const totalTestimonials = Array.isArray(testimonials) ? testimonials.length : 0

  const sliderSettings = {
    dots: true,
    infinite: totalTestimonials > 1,
    speed: 500,
    slidesToShow: Math.min(itemsPerRow, Math.max(totalTestimonials, 1)),
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    dotsClass: 'slick-dots custom-testimonial-dots',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(itemsPerRow, 3, Math.max(totalTestimonials, 1)),
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(itemsPerRow, 2, Math.max(totalTestimonials, 1)),
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  }

  const renderTestimonialCard = (item: any, idx: number, isCarousel: boolean) => {
    const imageUrl =
      typeof item.image === 'object' && item.image?.url
        ? item.image.url
        : typeof item.image === 'string' &&
            (item.image.startsWith('/') || item.image.startsWith('http'))
          ? item.image
          : null

    const authorNameClean = item.authorName?.trim() || ''
    const authorInitial = authorNameClean ? authorNameClean.charAt(0).toUpperCase() : ''

    const cardContent = (
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="flex flex-col h-full bg-white shadow-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-xl border border-gray-100/90 text-left"
      >
        {/* Card Content Container */}
        <div className="w-full flex flex-col items-start justify-between gap-5 flex-1 h-full">
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
              <h4 className="font-semibold text-base sm:text-lg text-[#0C1E33] truncate">
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
          <p className="text-sm sm:text-base text-gray-600 m-0 flex-1 leading-relaxed">
            {item.quote}
          </p>

          {/* Footer: Role Badge & Quote Icon */}
          <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
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
        </div>
      </motion.div>
    )

    if (isCarousel) {
      return (
        <div key={idx} className="px-2.5 pb-2 outline-none text-left h-full flex flex-col box-border">
          {cardContent}
        </div>
      )
    }

    return (
      <div key={idx} className="w-full h-full text-left flex flex-col">
        {cardContent}
      </div>
    )
  }

  const isDarkBg = themeClass === 'bg-c7' || themeClass === 'bg-c8'

  return (
    <section className={`testimonial ${themeClass} ${textAlignment} relative`}>
      {/* Scoped styling for Testimonial Carousel and Brand Dots */}
      <style jsx global>{`
        .testimonial-slider-wrapper .slick-slider {
          position: relative;
          display: block;
          box-sizing: border-box;
          user-select: none;
          touch-action: pan-y;
        }
        .testimonial-slider-wrapper .slick-list {
          overflow: hidden;
          margin: 0;
          padding: 8px 0 12px;
        }
        .testimonial-slider-wrapper .slick-track {
          display: flex !important;
          margin-left: auto;
          margin-right: auto;
        }
        .testimonial-slider-wrapper .slick-slide {
          height: auto !important;
          display: flex !important;
          flex-shrink: 0 !important;
          box-sizing: border-box;
        }
        .testimonial-slider-wrapper .slick-slide > div {
          display: flex !important;
          width: 100% !important;
          height: 100% !important;
        }
        /* Custom Brand Styled Dots */
        .testimonial-slider-wrapper .slick-dots.custom-testimonial-dots {
          position: relative;
          bottom: auto;
          margin-top: 28px;
          margin-bottom: 0;
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0;
          list-style: none;
          width: 100%;
        }
        .testimonial-slider-wrapper .slick-dots.custom-testimonial-dots li {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: auto;
          height: auto;
          margin: 0;
          padding: 0;
          cursor: pointer;
        }
        .testimonial-slider-wrapper .slick-dots.custom-testimonial-dots li button {
          border: 0;
          padding: 0;
          cursor: pointer;
          outline: none;
          font-size: 0;
          line-height: 0;
          color: transparent;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background-color: ${isDarkBg ? 'rgba(255, 255, 255, 0.35)' : 'var(--color-5, #BFDBFE)'};
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.85;
        }
        .testimonial-slider-wrapper .slick-dots.custom-testimonial-dots li button:before {
          display: none !important;
          content: '' !important;
        }
        .testimonial-slider-wrapper .slick-dots.custom-testimonial-dots li:hover button {
          background-color: ${isDarkBg ? '#FFFFFF' : 'var(--color-6, #2563EB)'};
          opacity: 1;
          transform: scale(1.15);
        }
        .testimonial-slider-wrapper .slick-dots.custom-testimonial-dots li.slick-active button {
          width: 28px;
          height: 10px;
          border-radius: 9999px;
          background-color: ${isDarkBg ? '#FFFFFF' : 'var(--color-6, #2563EB)'};
          opacity: 1;
          box-shadow: ${isDarkBg ? '0 2px 8px rgba(255, 255, 255, 0.45)' : '0 2px 8px rgba(37, 99, 235, 0.35)'};
        }
      `}</style>

      <div className="inner-wrap">
        <div className="container mx-auto">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {testimonials && testimonials.length > 0 && (
            enableCarousel ? (
              <div className="testimonial-slider-wrapper content-wrap w-full -mx-2.5">
                {mounted ? (
                  <Slider {...sliderSettings}>
                    {testimonials.map((item: any, idx: number) =>
                      renderTestimonialCard(item, idx, true),
                    )}
                  </Slider>
                ) : (
                  /* SSR Fallback to prevent flash of squished slides */
                  <div className={`grid gap-6 ${gridClass}`}>
                    {testimonials.slice(0, itemsPerRow).map((item: any, idx: number) =>
                      renderTestimonialCard(item, idx, false),
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className={`content-wrap w-full grid gap-6 sm:gap-8 ${gridClass}`}>
                {testimonials.map((item: any, idx: number) =>
                  renderTestimonialCard(item, idx, false),
                )}
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


