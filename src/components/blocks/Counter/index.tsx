'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

const CounterItem = ({ item }: { item: any }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const target = parseFloat(item.text) || 0
  const isNumber = !isNaN(target) && item.text?.trim() !== ''

  useEffect(() => {
    if (!isNumber) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const increment = target / (duration / 16)

          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated, isNumber])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm transition-transform hover:-translate-y-2 gap-2.5"
    >
      {item.image?.url && (
        <Image
          src={item.image.url}
          alt={item.image.alt || 'Icon'}
          width={64}
          height={64}
          quality={80}
          loading="lazy"
          className="w-16 h-16 mb-4 object-contain drop-shadow-md"
        />
      )}
      <div className="text-4xl md:text-5xl font-black text-blue-500 drop-shadow-sm">
        {isNumber ? count : item.text}
        {item.posttext && <span className="ml-1 text-2xl font-bold">{item.posttext}</span>}
      </div>
      {item.description && (
        <p className="mt-0 text-gray-600 dark:text-gray-300 font-medium">{item.description}</p>
      )}
    </div>
  )
}

export const Counter: React.FC<any> = ({
  introText,
  introLinks,
  counterItems,
  settings,
  itemsPerRow: itemsPerRowProp,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(itemsPerRowProp || '4', 10)

  let gridClass = 'grid-cols-1'
  if (itemsPerRow === 1) gridClass += ' lg:grid-cols-1'
  else if (itemsPerRow === 2) gridClass += ' lg:grid-cols-2'
  else if (itemsPerRow === 3) gridClass += ' md:grid-cols-2 lg:grid-cols-3'
  else if (itemsPerRow === 4) gridClass += ' md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  else if (itemsPerRow === 6)
    gridClass += ' md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'

  return (
    <section className={`counter ${themeClass} ${textAlignment}`}>
      <div className="inner-wrap">
        <div className="container mx-auto px-6">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {counterItems && counterItems.length > 0 && (
            <div className={`content-wrap grid gap-8 ${gridClass}`}>
              {counterItems.map((item: any, idx: number) => (
                <CounterItem key={idx} item={item} />
              ))}
            </div>
          )}

          {introLinks && introLinks.length > 0 && (
            <div className="mt-16">
              <IntroLinks introLinks={introLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
