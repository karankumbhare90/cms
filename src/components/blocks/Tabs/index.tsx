'use client'

import React, { useState } from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import { DynamicRichText } from '@/blocks/Shared/DynamicRichText'

export const Tabs: React.FC<any> = ({ introText, tabsList, introLinks, settings }) => {
  const [activeTab, setActiveTab] = useState(0)
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)

  return (
    <section className={`tabs ${themeClass} ${textAlignment}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {tabsList && tabsList.length > 0 && (
            <div className="content-wrap rounded-[12px] border border-[#E0EFFE] bg-[var(--color-1)] overflow-hidden transition-colors duration-300">
              <div className="flex overflow-x-auto border-b border-[#E0EFFE] hide-scrollbar">
                {tabsList.map((tab: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 md:px-8 md:py-5 font-semibold text-[16px] md:text-[18px] whitespace-nowrap transition-colors focus:outline-none border-b-2 -mb-[1px] ${
                      activeTab === idx
                        ? 'text-[var(--color-6)] border-[var(--color-6)]'
                        : 'text-[var(--fonts-color-base)] hover:text-[var(--title-colour-light-bg)] border-transparent'
                    }`}
                  >
                    {tab.tabLabel}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8 text-left text-[15px] text-[var(--fonts-color-base)] leading-[1.8]">
                {tabsList.map((tab: any, idx: number) => (
                  <div key={idx} className={activeTab === idx ? 'block animate-fade-in' : 'hidden'}>
                    <div className="w-full">
                      {tab.tabContent && (
                        <DynamicRichText
                          className="rich-text-content mt-0 !text-[15px] !leading-[1.8]"
                          content={tab.tabContent}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
