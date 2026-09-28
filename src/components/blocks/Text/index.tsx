import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Text: React.FC<any> = ({ introText, introLinks, settings, contentWidth = 'wide' }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const customClass = settings?.customClass || ''
  const textAlign = settings?.textAlign || 'left'

  // Width class: full=12/12, wide=8/12, half=6/12
  const widthClass =
    contentWidth === 'full'
      ? 'w-full'
      : contentWidth === 'half'
        ? 'w-full lg:w-6/12'
        : 'w-full lg:w-8/12' // wide (default)

  // Margin alignment — only applies when not full width
  const marginClass =
    contentWidth === 'full'
      ? ''
      : textAlign === 'center'
        ? 'mx-auto'
        : textAlign === 'right'
          ? 'ml-auto'
          : 'mr-auto' // left (default)

  return (
    <section className={`text generic-text ${themeClass} ${textAlignment} ${customClass}`.trim()}>
      <div className="inner-wrap">
        <div className="container mx-auto">
          <div className={`${widthClass} ${marginClass}`}>
            <IntroText introText={introText} />
          </div>

          {introLinks && introLinks.length > 0 && (
            <div className={`${widthClass} ${marginClass}`}>
              <IntroLinks introLinks={introLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
