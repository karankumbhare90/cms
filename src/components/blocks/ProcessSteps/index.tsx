import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const ProcessSteps: React.FC<any> = ({ introText, introLinks, steps, settings, layoutStyle }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const isVertical = layoutStyle === 'vertical'

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {steps && steps.length > 0 && (
          <div className={isVertical ? 'max-w-3xl mx-auto space-y-12' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'}>
            {steps.map((step: any, idx: number) => (
              <div key={idx} className={`relative flex ${isVertical ? 'flex-row items-start gap-6' : 'flex-col items-center text-center'}`}>
                {/* Connector line for horizontal layout */}
                {!isVertical && idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-gray-200 dark:bg-gray-700"></div>
                )}
                
                <div className={`flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold text-xl z-10 ${isVertical ? 'w-16 h-16' : 'w-20 h-20 mb-6'}`}>
                  {step.stepNumberOrIcon}
                </div>
                
                <div className={isVertical ? 'pt-2' : ''}>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  {step.description && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {introLinks && introLinks.length > 0 && (
          <div className="mt-16 flex justify-center">
            <IntroLinks introLinks={introLinks} />
          </div>
        )}
      </div>
    </section>
  )
}
