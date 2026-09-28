'use client'

import dynamic from 'next/dynamic'

export const DynamicChatbot = dynamic(
  () => import('@/components/Chatbot').then((mod) => mod.Chatbot),
  { ssr: false },
)
