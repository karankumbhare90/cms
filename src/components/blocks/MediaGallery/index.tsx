import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const MediaGallery: React.FC<any> = ({ introText, mediaItems, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const enableMasonry = settings?.enableMasonry

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {mediaItems && mediaItems.length > 0 && (
          <div className={enableMasonry ? 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {mediaItems.map((item: any, idx: number) => {
              if (!item.image?.url) return null
              return (
                <div key={idx} className={`relative group overflow-hidden rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800 ${enableMasonry ? 'break-inside-avoid' : 'aspect-square'}`}>
                  <img src={item.image.url} alt={item.image.alt || item.caption || 'Gallery Image'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-medium">{item.caption}</p>
                    </div>
                  )}
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
