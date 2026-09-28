import React from 'react'
import Image from 'next/image'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const TextWithImage: React.FC<any> = ({
  introText,
  image,
  introLinks,
  settings,
  textPosition = 'left',
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const customClass = settings?.customClass || ''

  const isTextRight = textPosition === 'right'

  return (
    <section
      className={`text-with-image overflow-hidden ${themeClass} ${textAlignment} ${customClass}`}
    >
      <div className="inner-wrap">
        <div className="w-full container mx-auto">
          <div
            className={`flex flex-col lg:flex-row items-center gap-6 md:gap-7 lg:gap-8 xl:gap-10 2xl:gap-12 ${isTextRight ? 'lg:flex-row-reverse' : ''}`}
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
                <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.alt || 'Content block image'}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    loading="lazy"
                    className="object-cover"
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
