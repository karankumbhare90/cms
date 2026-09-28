import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getBlockAlignment, getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const PricingTable: React.FC<any> = ({ introText, pricingPlans, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)

  return (
    <section className={`pricing-table ${themeClass} ${textAlignment}`}>
      <div className="inner-wrap">
        <div className="container mx-auto">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {pricingPlans && pricingPlans.length > 0 && (
            <div className="content-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left max-w-6xl mx-auto">
              {pricingPlans.map((plan: any, idx: number) => (
                <div
                  key={idx}
                  className={`relative flex flex-col rounded-[12px] bg-[var(--color-1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    plan.isPopular
                      ? 'border-2 border-[var(--color-7)] shadow-md md:scale-[1.02] z-10 mt-4 md:mt-0'
                      : 'border border-[#E0EFFE] hover:border-[var(--color-4)]'
                  }`}
                >
                  <div
                    className={`w-full p-8 rounded-t-[10px] ${
                      plan.isPopular
                        ? 'bg-[var(--color-7)] text-[var(--color-1)]'
                        : 'bg-[var(--color-4)] border-b border-[#E0EFFE]'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient text-[var(--color-1)] px-5 py-1.5 rounded-full text-[13px] font-bold shadow-md uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}

                    <h3
                      className={`text-[18px] lg:text-[20px] font-semibold m-0 ${
                        plan.isPopular
                          ? '!text-[var(--color-1)]'
                          : 'text-[var(--title-colour-light-bg)]'
                      }`}
                    >
                      {plan.planName}
                    </h3>

                    <div className="mt-4 mb-3">
                      <span
                        className={`text-4xl lg:text-5xl font-extrabold tracking-tight ${
                          plan.isPopular
                            ? '!text-[var(--color-1)]'
                            : 'text-[var(--title-colour-light-bg)]'
                        }`}
                      >
                        {plan.price}
                      </span>
                    </div>

                    {plan.description && (
                      <p
                        className={`!m-0 text-[15px] leading-[1.65] ${
                          plan.isPopular
                            ? '!text-[var(--color-1)] opacity-90'
                            : 'text-[var(--fonts-color-base)]'
                        }`}
                      >
                        {plan.description}
                      </p>
                    )}
                  </div>

                  {plan.features && plan.features.length > 0 && (
                    <ul className="flex-1 flex flex-col items-start justify-start p-8 m-0 list-none gap-4">
                      {plan.features.map((featureObj: any, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-3 !m-0 !p-0">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              plan.isPopular ? 'bg-[var(--color-6)]' : 'bg-[#E0EFFE]'
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={plan.isPopular ? '#ffffff' : 'var(--color-6)'}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                          </div>
                          <span className="font-medium text-[15px] text-[var(--fonts-color-base)] leading-tight">
                            {featureObj.feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
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
