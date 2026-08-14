import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Map: React.FC<any> = ({ introText, mapData, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const isFullWidth = settings?.widthType === 'full'

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>
      </div>
      
      {mapData && (
        <div className={`${isFullWidth ? 'w-full' : 'container mx-auto px-6 max-w-6xl'} h-[400px] md:h-[600px] relative`}>
          <div 
            className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0 rounded-2xl overflow-hidden shadow-xl" 
            dangerouslySetInnerHTML={{ __html: mapData }} 
          />
        </div>
      )}

      {introLinks && introLinks.length > 0 && (
        <div className="container mx-auto px-6 mt-16 flex justify-center">
          <IntroLinks introLinks={introLinks} />
        </div>
      )}
    </section>
  )
}
