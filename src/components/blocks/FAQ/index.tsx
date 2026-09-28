import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment, getBlockAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import { DynamicRichText } from '@/blocks/Shared/DynamicRichText'

export const FAQ: React.FC<any> = ({ introText, faqs, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const blockAlignment = getBlockAlignment(settings)
  const customClass = settings.customClass || ''

  return (
    <section className={`faq ${themeClass} ${textAlignment} ${customClass}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className={`w-full lg:w-2/3 ${blockAlignment}`}>
            <div className="w-full">
              <IntroText introText={introText} />
            </div>

            {faqs && faqs.length > 0 && (
              <div className="w-full flex flex-col gap-3 text-left content-wrap">
                {faqs.map((faq: any, idx: number) => (
                  <details
                    key={idx}
                    name="faq-accordion"
                    className="group rounded-[12px] border border-[#E0EFFE] bg-[var(--color-1)] overflow-hidden transition-colors duration-300 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="accordion-header w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer outline-none">
                      <p className="text-[16px] md:text-[18px] font-semibold text-[var(--title-colour-light-bg)] leading-[1.4] m-0">
                        {faq.question}
                      </p>
                      <svg
                        className="shrink-0 transition-transform duration-200 group-open:rotate-180"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          d="M4 7l5 5 5-5"
                          stroke="var(--color-6)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </summary>
                    <div className="accordion-body px-6 pb-6 pt-4 border-t border-[#E0EFFE] text-[15px] text-[var(--fonts-color-base)] leading-[1.8]">
                      {faq.answer && (
                        <DynamicRichText
                          className="rich-text-content mt-0 !text-[15px] !leading-[1.8]"
                          content={faq.answer}
                        />
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
