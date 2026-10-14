'use client'

import { useState, useEffect } from 'react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })

    const onChatToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen?: boolean }>
      setChatOpen(Boolean(customEvent.detail?.isOpen))
    }
    window.addEventListener('chatbot:toggle', onChatToggle)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('chatbot:toggle', onChatToggle)
    }
  }, [])

  const isShown = visible && !chatOpen

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-[84px] right-[22px] sm:bottom-[92px] sm:right-[30px] z-40 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      style={{
        background: 'linear-gradient(135deg,#2563EB,#1E40AF)',
        opacity: isShown ? 1 : 0,
        pointerEvents: isShown ? 'auto' : 'none',
        transform: isShown ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <svg
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
        className="transition-transform duration-200 group-hover:-translate-y-0.5"
      >
        <path
          d="M9 13V5M5 9l4-4 4 4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
