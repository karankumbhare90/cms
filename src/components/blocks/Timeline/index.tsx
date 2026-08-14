import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Timeline: React.FC<any> = ({ introText, introLinks, events, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {events && events.length > 0 && (
          <div className="relative border-l-4 border-gray-200 dark:border-gray-700 ml-4 md:ml-0 md:left-1/2 md:-translate-x-2 space-y-12">
            {events.map((event: any, idx: number) => {
              const isEven = idx % 2 === 0
              return (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal w-full group">
                  {/* Marker */}
                  <div className="absolute left-[-10px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 z-10"></div>
                  
                  {/* Content Container */}
                  <div className={`ml-8 md:ml-0 w-full md:w-5/12 flex flex-col ${isEven ? 'md:pr-12 md:text-right md:ml-auto md:order-first' : 'md:pl-12 md:mr-auto'}`}>
                    <span className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-2 block">{event.dateOrYear}</span>
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    {event.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                    )}
                    {event.image?.url && (
                      <div className="rounded-xl overflow-hidden shadow-md mt-4">
                        <img src={event.image.url} alt={event.image.alt || event.title} className="w-full h-auto object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {introLinks && introLinks.length > 0 && (
          <div className="mt-16 flex justify-center">
            <IntroLinks introLinks={introLinks} />
          </div>
        )}
      </div>
    </section>
  )
}
