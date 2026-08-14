import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const Hero: React.FC<any> = ({ introText, introLinks, backgroundImage, settings }) => {
  const bgUrl = backgroundImage?.url
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)

  return (
    <section
      className={`relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden ${themeClass} ${textAlignment}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-gray-900/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center">
        {/* We'll render introText if it exists. For now, a placeholder fallback if empty */}
        <div className="text-white prose prose-invert prose-lg md:prose-2xl max-w-3xl drop-shadow-md">
          <IntroText introText={introText} />
        </div>

        {/* Buttons */}
        <IntroLinks introLinks={introLinks} />
      </div>
    </section>
  )
}
