'use client'

import React, { useState } from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const Tabs: React.FC<any> = ({ introText, tabsList, introLinks, settings }) => {
  const [activeTab, setActiveTab] = useState(0)
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-12 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {tabsList && tabsList.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
            <div className="flex overflow-x-auto border-b border-white/10 hide-scrollbar bg-black/10 dark:bg-white/5">
              {tabsList.map((tab: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-8 py-5 font-bold text-lg whitespace-nowrap transition-colors focus:outline-none ${activeTab === idx ? 'text-blue-500 border-b-2 border-blue-500 bg-white/5' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
                >
                  {tab.tabLabel}
                </button>
              ))}
            </div>
            
            <div className="p-8 md:p-12 text-left">
              {tabsList.map((tab: any, idx: number) => (
                <div key={idx} className={activeTab === idx ? 'block animate-fade-in' : 'hidden'}>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {tab.tabContent && <RichText data={tab.tabContent} />}
                  </div>
                </div>
              ))}
            </div>
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
