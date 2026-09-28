import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Map: React.FC<any> = ({ introText, mapData, introLinks, settings, widthType }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const isFullWidth = widthType === 'full'

  return (
    <section className={`map ${themeClass} ${textAlignment}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>
        </div>

        {mapData && (
          <div className={`${isFullWidth ? 'w-full' : 'container'} relative content-wrap`}>
            <div
              className={`w-full h-auto overflow-hidden  [&_iframe]:w-full ${isFullWidth ? 'w-full' : 'rounded-2xl shadow-xl'}`}
              dangerouslySetInnerHTML={{ __html: mapData }}
            />
          </div>
        )}

        {introLinks && introLinks.length > 0 && (
          <div className="container w-full  ">
            <IntroLinks introLinks={introLinks} />
          </div>
        )}
      </div>
    </section>
  )
}
