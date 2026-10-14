import React from 'react'
import { BannerSkeleton } from '@/components/Banner'
import { RenderBlocksSkeleton } from '@/components/RenderBlocks'

export default function NestedDynamicPageLoading() {
  return (
    <div style={{ paddingTop: 'var(--header-height, 72px)' }}>
      <BannerSkeleton />
      <RenderBlocksSkeleton />
    </div>
  )
}
