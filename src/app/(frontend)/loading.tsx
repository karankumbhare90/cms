import React from 'react'
import { RenderBlocksSkeleton } from '@/components/RenderBlocks'

export default function Loading() {
  return (
    <div style={{ paddingTop: 'var(--header-height, 73px)' }}>
      <RenderBlocksSkeleton />
    </div>
  )
}
