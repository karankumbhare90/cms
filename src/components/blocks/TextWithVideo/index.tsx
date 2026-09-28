import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const TextWithVideo: React.FC<any> = ({
  introText,
  video,
  thumbnail,
  introLinks,
  settings,
  textPosition,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const actualTextPosition = textPosition || settings?.textPosition || 'left'
  const isTextRight = actualTextPosition === 'right'

  return (
    <section className={`py-16 md:py-24 overflow-hidden ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isTextRight ? 'lg:flex-row-reverse' : ''}`}
        >
          {/* Text Content */}
          <div className="flex-1 w-full">
            <div className="w-full">
              <IntroText introText={introText} />
            </div>

            {introLinks && introLinks.length > 0 && <IntroLinks introLinks={introLinks} />}
          </div>

          {/* Video */}
          <div className="flex-1 w-full">
            {video && video.url && (
              <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-black/10 dark:bg-white/5">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  poster={thumbnail?.url || undefined}
                  className="absolute inset-0 w-full h-full object-cover aspect-video lg:aspect-[4/3]"
                >
                  <source src={video.url} type={video.mimeType || 'video/mp4'} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
