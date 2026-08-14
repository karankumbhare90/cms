import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const CTA: React.FC<any> = ({
  introText,
  introLinks,
  settings,
  backgroundImage,
  image,
  imagePosition = 'left',
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const bgUrl = backgroundImage?.url
  const imgUrl = image?.url
  const customClass = settings.customClass || ''

  const isImageRight = imagePosition === 'right'

  return (
    <section
      className={`call-to-action relative ${themeClass} ${textAlignment} ${customClass} ${imgUrl ? 'image-present' : ''}`}
    >
      {/* Background Image */}
      {bgUrl && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      )}
      {/* Overlay if there's a background image */}
      {bgUrl && <div className="absolute inset-0 z-0 bg-gray-900/70 backdrop-blur-sm" />}

      <div className="inner-wrap relative">
        {imgUrl && (
          <div
            className={`w-full lg:w-1/2 relative lg:absolute ${isImageRight ? 'right-0' : 'left-0'} top-0 h-[400px] lg:h-full`}
          >
            <img
              src={imgUrl}
              alt={image?.alt || 'Call to action image'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative z-10 container mx-auto">
          <div
            className={`flex flex-wrap items-center ${imgUrl ? (isImageRight ? 'lg:justify-start' : 'lg:justify-end') : 'items-center'}`}
          >
            {/* Content */}
            <div
              className={`w-full flex flex-col justify-center ${imgUrl ? `lg:w-1/2 pt-8 sm:pt-10 ${isImageRight ? 'lg:pr-8 xl:pr-10' : 'lg:pl-8 xl:pl-10'}` : 'items-center'}`}
            >
              <div className="w-full">
                <IntroText introText={introText} />
              </div>

              {introLinks && introLinks.length > 0 && (
                <div className="w-full">
                  <IntroLinks introLinks={introLinks} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
