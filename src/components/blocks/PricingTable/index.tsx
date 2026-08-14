import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const PricingTable: React.FC<any> = ({ introText, pricingPlans, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {pricingPlans && pricingPlans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {pricingPlans.map((plan: any, idx: number) => (
              <div 
                key={idx} 
                className={`relative flex flex-col p-8 rounded-3xl backdrop-blur-sm transition-transform hover:-translate-y-2 ${
                  plan.isPopular 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 ring-2 ring-blue-400' 
                    : 'bg-white/5 border border-white/10 shadow-lg'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-4">{plan.planName}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-black">{plan.price}</span>
                </div>
                
                {plan.description && (
                  <p className={`mb-8 font-medium ${plan.isPopular ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'}`}>
                    {plan.description}
                  </p>
                )}

                {plan.features && plan.features.length > 0 && (
                  <ul className="flex-1 space-y-4 mb-8 text-left">
                    {plan.features.map((featureObj: any, fIdx: number) => (
                      <li key={fIdx} className="flex items-start">
                        <svg className={`w-6 h-6 mr-3 shrink-0 ${plan.isPopular ? 'text-white' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">{featureObj.feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
