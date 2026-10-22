'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const ChatbotComponent = dynamic(
  () => import('@/components/Chatbot').then((mod) => mod.Chatbot),
  { ssr: false }
)

export const DynamicChatbot: React.FC<{ siteName?: string }> = ({ siteName }) => {
  const [activated, setActivated] = useState(false)

  if (activated) {
    return <ChatbotComponent initialOpen={true} siteName={siteName} />
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={() => setActivated(true)}
        onMouseEnter={() => setActivated(true)}
        className="w-14 h-14 bg-[var(--color-7,#2563EB)] text-white rounded-full shadow-xl hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 min-w-[48px] min-h-[48px]"
        aria-label="Toggle AI Chatbot"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
    </div>
  )
}

