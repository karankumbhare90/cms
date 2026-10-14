'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { SkeletonCircle } from '@/components/ui/Skeleton'

export const ChatbotSkeleton: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <SkeletonCircle size={56} className="shadow-2xl !bg-[#0C1E33]/30" />
    </div>
  )
}

export const DynamicChatbot = dynamic(
  () => import('@/components/Chatbot').then((mod) => mod.Chatbot),
  {
    ssr: false,
    loading: () => <ChatbotSkeleton />,
  },
)
