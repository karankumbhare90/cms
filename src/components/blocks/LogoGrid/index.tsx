'use client'

import React from 'react'
import Image from 'next/image'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import Slider from 'react-slick'

export const LogoGrid: React.FC<any> = ({
  introText,
  logos,
  introLinks,
  settings,
  itemsPerRow: _itemsPerRow,
  enableCarousel,
  enableGridBorder,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(_itemsPerRow || '4', 10)
  const customClass = settings.customClass || ''

  let gridClass = 'grid-cols-2 md:grid-cols-3'
  if (itemsPerRow === 4) gridClass += ' lg:grid-cols-4'
  else if (itemsPerRow === 5) gridClass += ' lg:grid-cols-5'
  else if (itemsPerRow === 6) gridClass += ' lg:grid-cols-6'

  const dynamicSpeed = logos && logos.length > 0 ? logos.length * 1000 : 6000

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: dynamicSpeed,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: false,
    slidesToShow: itemsPerRow,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.max(itemsPerRow, 6),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  }

  return (
    <section className={`logo-grid ${themeClass} ${textAlignment} ${customClass}`}>
      <div className="inner-wrap">
        {enableCarousel ? (
          <>
            <div className="container mx-auto">
              <div className="w-full">
                <IntroText introText={introText} />
              </div>
            </div>

            {logos && logos.length > 0 && (
              <div
                className="logo-carousel-wrapper content-wrap mt-8"
                style={{
                  maskImage:
                    'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                }}
              >
                <Slider {...sliderSettings}>
                  {logos.map((logo: any, idx: number) => {
                    const isLink =
                      logo.linkText &&
                      (logo.linkText.startsWith('http') || logo.linkText.startsWith('/'))

                    const inner = (
                      <div
                        className={`group relative flex items-center justify-center transition-all duration-300 w-full h-24 px-4`}
                      >
                        {logo.image?.url && (
                          <Image
                            src={logo.image.url}
                            alt={logo.linkText || 'Client Logo'}
                            width={160}
                            height={60}
                            loading="lazy"
                            quality={80}
                            className="max-w-full max-h-full h-auto object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300 mx-auto"
                          />
                        )}
                      </div>
                    )

                    if (isLink) {
                      return (
                        <div key={idx} className="outline-none">
                          <a
                            href={logo.linkText}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block outline-none"
                          >
                            {inner}
                          </a>
                        </div>
                      )
                    }

                    return (
                      <div key={idx} className="outline-none">
                        {inner}
                      </div>
                    )
                  })}
                </Slider>
              </div>
            )}

            {introLinks && introLinks.length > 0 && (
              <div className="container mx-auto">
                <div className="w-full">
                  <IntroLinks introLinks={introLinks} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="container mx-auto">
            <div className="w-full">
              <IntroText introText={introText} />
            </div>

            {logos && logos.length > 0 && (
              <div className={`${enableGridBorder ? 'overflow-hidden' : ''} content-wrap`}>
                <div
                  className={`grid items-center justify-items-center ${gridClass} ${enableGridBorder ? 'gap-0 -mt-[1px] -ml-[1px]' : 'gap-8'}`}
                >
                  {logos.map((logo: any, idx: number) => {
                    const isLink =
                      logo.linkText &&
                      (logo.linkText.startsWith('http') || logo.linkText.startsWith('/'))

                    const cellClasses = `w-full flex items-center justify-center ${enableGridBorder ? 'border-t border-l border-solid border-gray-100 p-8' : ''}`

                    const inner = (
                      <div
                        className={`group relative flex items-center justify-center transition-all duration-300 w-full h-20`}
                      >
                        {logo.image?.url && (
                          <Image
                            src={logo.image.url}
                            alt={logo.linkText || 'Client Logo'}
                            width={160}
                            height={60}
                            loading="lazy"
                            quality={80}
                            className="max-w-full max-h-full h-auto object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                          />
                        )}
                      </div>
                    )

                    if (isLink) {
                      return (
                        <a
                          key={idx}
                          href={logo.linkText}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block ${cellClasses}`}
                        >
                          {inner}
                        </a>
                      )
                    }

                    return (
                      <div key={idx} className={cellClasses}>
                        {inner}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {introLinks && introLinks.length > 0 && (
              <div className="w-full">
                <IntroLinks introLinks={introLinks} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
