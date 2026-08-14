import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const TextWithImage: React.FC<any> = ({
  introText,
  image,
  introLinks,
  settings,
  imagePosition = 'right',
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const customClass = settings.customClass || ''

  const isImageRight = imagePosition === 'right'

  return (
    <section
      className={`text-with-image overflow-hidden ${themeClass} ${textAlignment} ${customClass}`}
    >
      <div className="inner-wrap">
        <div className="w-full container mx-auto">
          <div
            className={`flex flex-col lg:flex-row items-center gap-6 md:gap-7 lg:gap-8 xl:gap-10 2xl:gap-12 ${isImageRight ? '' : 'lg:flex-row-reverse'}`}
          >
            {/* Text Content */}
            <div className="flex-1 w-full">
              <div className="w-full">
                <IntroText introText={introText} />
              </div>

              {introLinks && introLinks.length > 0 && <IntroLinks introLinks={introLinks} />}
            </div>

            {/* Image */}
            <div className="flex-1 w-full">
              {image && image.url && (
                <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={image.url}
                    alt={image.alt || 'Content block image'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
