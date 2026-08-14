import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const FAQ: React.FC<any> = ({ introText, faqs, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const customClass = settings.customClass || ''

  return (
    <section className={`faq ${themeClass} ${textAlignment} ${customClass}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full lg:w-2/3 mx-auto">
            <div className="w-full">
              <IntroText introText={introText} />
            </div>

            {faqs && faqs.length > 0 && (
              <div className="w-full flex flex-col gap-3 text-left content-wrap">
                {faqs.map((faq: any, idx: number) => (
                  <details
                    key={idx}
                    name="faq-accordion"
                    className="group rounded-2xl border border-[rgba(0,113,206,0.12)] open:border-[#0071CE] shadow-sm overflow-hidden transition-colors duration-300 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="accordion-header w-full flex items-center justify-between gap-4 px-7 py-5 text-left cursor-pointer">
                      <h6 className="font-semibold text-base lg:text-lg xl:text-xl">
                        {faq.question}
                      </h6>
                      <span className="acc_icon_expand flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 bg-[#F7F8FA] text-[#0071CE] group-open:bg-[#0071CE] group-open:text-white">
                        <svg
                          className="chevron-down w-3.5 h-3.5 group-open:hidden"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        <svg
                          className="chevron-up w-3.5 h-3.5 hidden group-open:block"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </span>
                    </summary>
                    <div className="accordion-body px-7 pb-5">
                      {faq.answer && (
                        <RichText className="rich-text-content mt-0" data={faq.answer} />
                      )}
                    </div>
                  </details>
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
      </div>
    </section>
  )
}
