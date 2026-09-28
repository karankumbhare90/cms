'use client'

import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import Slider from 'react-slick'
import { motion } from 'framer-motion'

const SlickArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  )
}

export const Testimonial: React.FC<any> = ({
  introText,
  testimonials,
  introLinks,
  settings,
  enableCarousel,
  itemsPerRow: itemsPerRowProp,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(itemsPerRowProp || '3', 10)

  let gridClass = 'grid-cols-1 md:grid-cols-2'
  if (itemsPerRow === 3) gridClass += ' lg:grid-cols-3'
  else if (itemsPerRow === 4) gridClass += ' xl:grid-cols-4'

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    // arrow: false,
    slidesToShow: itemsPerRow,
    slidesToScroll: 1,
    // nextArrow: <SlickArrow />,
    // prevArrow: <SlickArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(itemsPerRow, 3),
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className={`flex flex-col h-full bg-white shadow-sm p-8 rounded-3xl transition-shadow duration-300 hover:shadow-xl border border-gray-100`}
      >
        {/* Card Content Container */}
        <div className="w-full flex flex-col items-start justify-start gap-4 flex-1 h-full">
          {/* Header: Avatar, Name, Stars */}
          <div className="flex items-center gap-5">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={authorNameClean || 'Author'}
                className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xl shadow-sm shrink-0 uppercase text-gray-700">
                {authorInitial || (
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
            )}
            <div className="flex-grow">
              <h4 className="font-semibold text-base lg:text-lg xl:text-xl text-[#0C1E33]">
                {authorNameClean || 'Anonymous'}
              </h4>
              <div className="flex gap-1 mt-1 text-yellow-500">
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
          <p className="text-base text-gray-600 m-0 flex-1 leading-relaxed">{item.quote}</p>

          {/* Footer: Role Badge & Quote Icon */}
          <div className="w-full flex items-center justify-between mt-auto pt-4">
            {item.role ? (
              <span className="bg-[var(--color-6,#2563EB)] text-white text-xs font-medium px-3 py-1 rounded-full">
                {item.role}
              </span>
            ) : (
              <span />
            )}
            <svg className="w-8 h-8 text-yellow-500/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </div>
      </motion.div>
    )

    if (isCarousel) {
      return (
        <div key={idx} className="pr-4 pb-2 outline-none text-left h-full flex flex-col">
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

  return (
    <section className={`testimonial ${themeClass} ${textAlignment}`}>
      <div className="inner-wrap">
        <div className="container mx-auto">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {testimonials &&
            testimonials.length > 0 &&
            (enableCarousel ? (
              <div className="content-wrap w-full -mr-4 [&_.slick-track]:!flex [&_.slick-slide]:!h-auto [&_.slick-slide]:!flex [&_.slick-slide>div]:!flex [&_.slick-slide>div]:!w-full [&_.slick-slide>div]:!h-full">
                <Slider {...sliderSettings}>
                  {testimonials.map((item: any, idx: number) =>
                    renderTestimonialCard(item, idx, true),
                  )}
                </Slider>
              </div>
            ) : (
              <div className={`content-wrap w-full grid gap-8 ${gridClass}`}>
                {testimonials.map((item: any, idx: number) =>
                  renderTestimonialCard(item, idx, false),
                )}
              </div>
            ))}

          {introLinks && introLinks.length > 0 && (
            <div className="w-full">
              <IntroLinks introLinks={introLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
