import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const LogoGrid: React.FC<any> = ({ introText, logos, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(settings?.itemsPerRow || '4', 10)
  const enableCarousel = settings?.enableCarousel

  let gridClass = 'grid-cols-2 md:grid-cols-3'
  if (itemsPerRow === 4) gridClass += ' lg:grid-cols-4'
  else if (itemsPerRow === 5) gridClass += ' lg:grid-cols-5'
  else if (itemsPerRow === 6) gridClass += ' lg:grid-cols-6'

  return (
    <section className={`py-12 md:py-16 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-10 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {logos && logos.length > 0 && (
          <div className={`grid gap-8 items-center justify-items-center ${enableCarousel ? 'flex overflow-x-auto snap-x snap-mandatory gap-10 pb-4' : gridClass}`}>
            {logos.map((logo: any, idx: number) => {
              const inner = (
                <div className={`w-40 h-20 relative flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 ${enableCarousel ? 'shrink-0 snap-center' : ''}`}>
                  {logo.image?.url && (
                    <img src={logo.image.url} alt={logo.linkText || 'Client Logo'} className="max-w-full max-h-full object-contain" />
                  )}
                </div>
              )
              
              if (logo.linkText && (logo.linkText.startsWith('http') || logo.linkText.startsWith('/'))) {
                return <a key={idx} href={logo.linkText} target="_blank" rel="noopener noreferrer">{inner}</a>
              }
              
              return <React.Fragment key={idx}>{inner}</React.Fragment>
            })}
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
