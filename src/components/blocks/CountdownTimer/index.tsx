'use client'

import React, { useState, useEffect } from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const CountdownTimer: React.FC<any> = ({
  introText,
  targetDate,
  expiredMessage,
  introLinks,
  settings,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const themeColor = settings?.themeColor || 'primary'
  const customClass = settings.customClass || ''

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

  return (
    <section className={`countdown-timer ${themeClass} ${textAlignment} ${customClass}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {isMounted && targetDate && (
            <div className="w-full content-wrap">
              {isExpired ? (
                <div className="text-xl md:text-2xl font-bold text-[var(--title-colour-light-bg)] bg-[var(--color-1)] p-6 md:p-8 rounded-[12px] shadow-sm border border-[#E0EFFE] text-center">
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
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-[12px] border border-[#E0EFFE] bg-[var(--color-1)] shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <span className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--title-colour-light-bg)]">
                        {item.value.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[13px] md:text-[15px] font-medium uppercase tracking-wider mt-1 md:mt-2 text-[var(--fonts-color-base)]">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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
