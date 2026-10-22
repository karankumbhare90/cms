'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment, getBlockAlignment } from '@/utils/textAlign'

export const Hero: React.FC<any> = ({ slides, settings, bannerWidth }) => {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const enableOverlay = settings?.enableOverlay ?? true
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const marginClass = getBlockAlignment(settings)

  const hasSlides = Array.isArray(slides) && slides.length > 0
  const totalSlides = hasSlides ? slides.length : 0

  useEffect(() => {
    if (totalSlides <= 1) return
    let interval: NodeJS.Timeout | null = null

    // Wait 12 seconds before first auto-advance so initial page load and LCP are not displaced
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setFading(true)
        setTimeout(() => {
          setActive((a) => (a + 1) % totalSlides)
          setFading(false)
        }, 400)
      }, 7000)
    }, 12000)

    return () => {
      clearTimeout(timer)
      if (interval) clearInterval(interval)
    }
  }, [totalSlides])

  // Sync video playing state when active slide changes
  useEffect(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play().catch((e) => console.error('Autoplay failed:', e))
      } else {
        videoRef.current.pause()
      }
    }
  }, [active, videoPlaying])

  const goTo = (i: number) => {
    if (i === active) return
    setFading(true)
    setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 400)
  }

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (videoPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setVideoPlaying(!videoPlaying)
  }

  if (!hasSlides) {
    return (
      <section className="relative overflow-hidden w-full h-[60vh] flex items-center justify-center bg-gray-900 text-white">
        <p>No slides configured in Payload CMS.</p>
      </section>
    )
  }

  const slide = slides[active]
  const mediaUrl = slide.media?.url
  const isVideo = slide.media?.mimeType?.startsWith('video/')
  const autoplay = slide.videoAutoplay !== false // default true

  let widthClass = ''
  if (bannerWidth === 'half') {
    widthClass = 'lg:w-1/2'
  } else if (bannerWidth === 'wide') {
    widthClass = 'lg:w-2/3'
  }

  return (
    <section
      className={`hero-banner relative flex flex-col overflow-hidden min-h-[350px] md:min-h-[450px] lg:min-h-[600px] ${themeClass} ${textAlignment}`}
    >
      {/* Background Media */}
      <div
        className="absolute inset-0 transition-opacity duration-500 will-change-[opacity]"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {mediaUrl &&
          (isVideo ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              autoPlay={autoplay}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
            />
          ) : (
            <Image
              src={mediaUrl}
              alt={slide.media?.alt || 'Hero background'}
              fill
              priority={active === 0}
              fetchPriority={active === 0 ? 'high' : 'auto'}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
              unoptimized={Boolean(mediaUrl?.toLowerCase().includes('.svg'))}
            />
          ))}

        {/* Overlays */}
        {enableOverlay && <div className="glass-overlay-gradient" />}
      </div>

      <div className="relative z-10 container flex-1 flex flex-col justify-center">
        <div className="inner-wrap">
          <div
            className={`transition-[opacity,transform] duration-400 ease-out will-change-[opacity,transform] ${marginClass} ${widthClass || 'max-w-2xl'}`}
            style={{
              opacity: fading ? 0 : 1,
              transform: fading ? 'translate3d(0, 8px, 0)' : 'translate3d(0, 0, 0)',
            }}
          >
            <div
              className="hero-content-wrapper"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {/* Text */}
              <div className="text-[46px] md:text-[60px] font-extrabold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg [&>h1]:text-[46px] [&>h1]:md:text-[60px] [&>h1]:font-extrabold [&>h2]:text-[46px] [&>h2]:md:text-[60px] [&>h2]:font-extrabold">
                <IntroText introText={slide.introText} />
              </div>

              {/* Buttons */}
              <div className="w-full">
                <IntroLinks introLinks={slide.introLinks} />
              </div>
            </div>
          </div>

          {/* Bottom controls: Slider dots & Video play/pause */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center">
              {totalSlides > 1 &&
                slides.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="flex items-center justify-center p-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[44px] min-h-[44px]"
                  >
                    <span
                      className="block rounded-full origin-left transition-[transform,background-color] duration-300"
                      style={{
                        width: 32,
                        height: 10,
                        transform: i === active ? 'scaleX(1)' : 'scaleX(0.3125)',
                        background: i === active ? '#2563EB' : 'rgba(255,255,255,0.35)',
                      }}
                    />
                  </button>
                ))}
            </div>

            {isVideo && !autoplay && (
              <button
                onClick={toggleVideo}
                aria-label={videoPlaying ? 'Pause Video' : 'Play Video'}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all border border-white/20 text-white min-w-[48px] min-h-[48px]"
              >
                {videoPlaying ? (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="ml-1"
                  >
                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroSkeleton } from '../skeletons'

