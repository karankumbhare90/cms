import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Testimonial: React.FC<any> = ({ introText, testimonials, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(settings?.itemsPerRow || '3', 10)
  const enableCarousel = settings?.enableCarousel // Handles fallback to grid if false

  let gridClass = 'grid-cols-1 md:grid-cols-2'
  if (itemsPerRow === 3) gridClass += ' lg:grid-cols-3'
  else if (itemsPerRow === 4) gridClass += ' lg:grid-cols-4'

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {testimonials && testimonials.length > 0 && (
          <div className={`grid gap-8 ${enableCarousel ? 'flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8' : gridClass}`}>
            {testimonials.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className={`flex flex-col bg-white/5 border border-white/10 p-8 rounded-3xl shadow-lg backdrop-blur-sm ${enableCarousel ? 'min-w-[320px] snap-center shrink-0' : ''}`}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6 text-yellow-400">
                  {Array.from({ length: item.rating || 5 }).map((_, rIdx) => (
                    <svg key={rIdx} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-xl font-medium italic mb-8 flex-grow">"{item.quote}"</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  {item.image?.url ? (
                    <img src={item.image.url} alt={item.authorName} className="w-14 h-14 rounded-full object-cover shadow-md" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xl shadow-md">
                      {item.authorName?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-lg">{item.authorName}</h4>
                    {item.role && <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.role}</p>}
                  </div>
                </div>
              </div>
            ))}
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
