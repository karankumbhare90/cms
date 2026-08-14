import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Text: React.FC<any> = ({ introText, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const customClass = settings?.customClass || ''

  return (
    <section className={`text generic-text ${themeClass} ${textAlignment} ${customClass}`.trim()}>
      <div className="inner-wrap">
        <div className="container mx-auto">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {introLinks && introLinks.length > 0 && <IntroLinks introLinks={introLinks} />}
        </div>
      </div>
    </section>
  )
}
