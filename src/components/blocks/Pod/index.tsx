import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Pod: React.FC<any> = ({ introText, podItems, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const introPosition = settings?.introTextPosition || 'above'
  const itemsPerRow = parseInt(settings?.itemsPerRow || '3', 10)

  let gridClass = 'grid-cols-1 md:grid-cols-2'
  if (itemsPerRow === 3) gridClass += ' lg:grid-cols-3'
  else if (itemsPerRow === 4) gridClass += ' lg:grid-cols-4'
  else if (itemsPerRow === 6) gridClass += ' lg:grid-cols-6'

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        {introPosition === 'above' && (
          <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center">
            <IntroText introText={introText} />
          </div>
        )}

        {podItems && podItems.length > 0 && (
          <div className={`grid gap-8 ${gridClass}`}>
            {podItems.map((item: any, idx: number) => {
              const url = item.link?.type === 'custom' 
                ? item.link.url 
                : item.link?.reference?.value?.slug ? `/${item.link.reference.value.slug}` : '#'

              return (
                <div key={idx} className="flex flex-col bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1">
                  {item.image?.url && (
                    <div className="w-full h-48 mb-6 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                      <img src={item.image.url} alt={item.image.alt || item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  {item.content && <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{item.content}</p>}
                  
                  {item.link?.label && (
                    <a href={url} className="mt-auto inline-block font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      {item.link.label} &rarr;
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {introPosition === 'below' && (
          <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mt-16 flex flex-col items-center">
            <IntroText introText={introText} />
          </div>
        )}

        {introLinks && introLinks.length > 0 && (
          <div className="mt-12 flex justify-center">
            <IntroLinks introLinks={introLinks} />
          </div>
        )}
      </div>
    </section>
  )
}
