import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const ComparisonTable: React.FC<any> = ({
  introText,
  competitorName,
  features,
  introLinks,
  settings,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)

  const compName = competitorName || 'Competitor'
  const customClass = settings.customClass || ''

  return (
    <section className={`comparison-table  ${themeClass} ${textAlignment} ${customClass}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {features && features.length > 0 && (
            <div className="content-wrap overflow-x-auto rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm bg-white/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/10 dark:bg-white/5">
                    <th className="p-6 text-xl font-bold border-b border-white/10">Features</th>
                    <th className="p-6 text-xl font-bold text-center border-b border-white/10 text-blue-500">
                      Us
                    </th>
                    <th className="p-6 text-xl font-bold text-center border-b border-white/10 text-gray-500">
                      {compName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 border-b border-white/5 font-medium">
                        {item.featureName}
                      </td>
                      <td className="p-6 border-b border-white/5 text-center">
                        {item.ourProductHasFeature ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="text-gray-400 font-bold">-</span>
                        )}
                      </td>
                      <td className="p-6 border-b border-white/5 text-center">
                        {item.competitorHasFeature ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="text-gray-400 font-bold">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
