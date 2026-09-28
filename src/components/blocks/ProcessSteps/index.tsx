import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const ProcessSteps: React.FC<any> = ({
  introText,
  introLinks,
  steps,
  settings,
  layoutStyle,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const customClass = settings.customClass || ''
  const isVertical = layoutStyle === 'vertical'

  return (
    <section className={`process-steps ${themeClass} ${textAlignment} ${customClass}`}>
      <div className="inner-wrap">
        <div className="container ">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {steps && steps.length > 0 && (
            <div
              className={
                isVertical
                  ? 'max-w-3xl mx-auto space-y-12 content-wrap'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 content-wrap'
              }
            >
              {steps.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className={`relative flex ${isVertical ? 'flex-row items-start gap-6' : 'flex-col items-center text-center'}`}
                >
                  {/* Connector line for horizontal layout */}
                  {!isVertical && idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute z-0 top-10 left-[50%] w-full h-[2px] bg-[#E0EFFE]"></div>
                  )}

                  {/* Connector line for vertical layout */}
                  {isVertical && idx < steps.length - 1 && (
                    <div className="absolute z-0 left-8 top-16 w-[2px] h-[calc(100%+3rem)] bg-[#E0EFFE]"></div>
                  )}

                  <div
                    className={`relative z-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--color-6)] text-[var(--color-1)] border-4 border-[var(--color-1)] shadow-sm font-bold text-xl ${isVertical ? 'w-16 h-16' : 'w-20 h-20 mb-6'}`}
                  >
                    {step.stepNumberOrIcon}
                  </div>

                  <div className={isVertical ? 'pt-2' : ''}>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[var(--title-colour-light-bg)]">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="mt-0 text-[15px] text-[var(--fonts-color-base)] leading-[1.8] !m-0">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {introLinks && introLinks.length > 0 && (
            <div className="w-full">
              <IntroLinks introLinks={introLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
