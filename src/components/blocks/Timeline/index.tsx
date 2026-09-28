import React from 'react'
import Image from 'next/image'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Timeline: React.FC<any> = ({ introText, introLinks, events, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const customClass = settings?.customClass || ''

  return (
    <section className={`timeline ${themeClass} ${textAlignment} ${customClass}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {events && events.length > 0 && (
            <div className="w-full content-wrap relative space-y-12 before:content-[''] before:absolute before:inset-y-0 before:left-[16px] md:before:left-1/2 before:w-[2px] before:-ml-[1px] before:bg-[#E0EFFE]">
              {events.map((event: any, idx: number) => {
                const isEven = idx % 2 === 0
                return (
                  <div key={idx} className="relative flex w-full">
                    {/* Marker */}
                    <div className="absolute top-6 md:top-1/2 left-[16px] md:left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-5 h-5 rounded-full bg-[var(--color-6)] border-4 border-[var(--color-1)] shadow-sm z-10"></div>

                    {/* Content Container */}
                    <div
                      className={`ml-[48px] md:ml-0 w-[calc(100%-48px)] md:w-1/2 flex flex-col ${isEven ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'}`}
                    >
                      <div
                        className={`p-6 rounded-[12px] border border-[#E0EFFE] bg-[var(--color-1)] shadow-sm hover:shadow-md transition-shadow duration-300 w-full ${isEven ? 'md:text-right' : 'md:text-left'}`}
                      >
                        <span className="text-[13px] md:text-[14px] font-bold tracking-wider text-[var(--color-6)] uppercase mb-2 block">
                          {event.dateOrYear}
                        </span>
                        <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[var(--title-colour-light-bg)]">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="text-[15px] text-[var(--fonts-color-base)] leading-[1.8] !m-0">
                            {event.description}
                          </p>
                        )}
                        {event.image?.url && (
                          <div className="rounded-[8px] overflow-hidden border border-[#E0EFFE] mt-4">
                            <Image
                              src={event.image.url}
                              alt={event.image.alt || event.title}
                              width={500}
                              height={300}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              quality={75}
                              loading="lazy"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

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
