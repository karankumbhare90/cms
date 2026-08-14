'use client'

import React, { useState, useEffect } from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const CountdownTimer: React.FC<any> = ({ introText, targetDate, expiredMessage, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const themeColor = settings?.themeColor || 'primary'

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (!targetDate) return

    const target = new Date(targetDate).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setIsExpired(false)
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  let boxClass = 'bg-white/10 border-white/20'
  let textClass = 'text-white'
  if (themeColor === 'primary') {
    boxClass = 'bg-blue-600 border-blue-500 shadow-blue-500/40 text-white'
    textClass = 'text-blue-100'
  } else if (themeColor === 'secondary') {
    boxClass = 'bg-gray-800 border-gray-700 text-white'
    textClass = 'text-gray-300'
  } else if (themeColor === 'dark') {
    boxClass = 'bg-black border-gray-800 text-white'
    textClass = 'text-gray-400'
  }

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center">
          <IntroText introText={introText} />
        </div>

        {isMounted && targetDate && (
          <div className="mb-16">
            {isExpired ? (
              <div className="text-3xl font-bold text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-400 p-8 rounded-2xl shadow-lg border border-red-200 dark:border-red-800">
                {expiredMessage || 'The countdown has finished!'}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className={`flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-3xl border shadow-xl backdrop-blur-md ${boxClass}`}>
                    <span className="text-4xl md:text-6xl font-black">{item.value.toString().padStart(2, '0')}</span>
                    <span className={`text-sm md:text-base font-bold uppercase tracking-wider mt-1 md:mt-2 ${textClass}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {introLinks && introLinks.length > 0 && (
          <div className="flex justify-center">
            <IntroLinks introLinks={introLinks} />
          </div>
        )}
      </div>
    </section>
  )
}
