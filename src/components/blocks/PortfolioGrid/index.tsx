import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const PortfolioGrid: React.FC<any> = ({ introText, introLinks, portfolioItems, settings, itemsPerRow }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  
  let gridColsClass = 'lg:grid-cols-3'
  if (itemsPerRow === '2') gridColsClass = 'lg:grid-cols-2'
  if (itemsPerRow === '4') gridColsClass = 'lg:grid-cols-4'

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {portfolioItems && portfolioItems.length > 0 && (
          <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-8`}>
            {portfolioItems.map((item: any, idx: number) => (
              <div key={idx} className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
                {item.image?.url && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image.url} 
                      alt={item.image.alt || item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {item.link && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a href={item.link} className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                          View Project
                        </a>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{item.description}</p>
                  )}
                  {item.link && !item.image?.url && (
                    <a href={item.link} className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-auto">
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
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
