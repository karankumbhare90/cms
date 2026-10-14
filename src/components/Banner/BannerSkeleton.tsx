import React from 'react'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export const BannerSkeleton: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-24 bg-[#0C1E33] border-b border-white/10">
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl space-y-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton dark className="w-12 h-3 rounded" />
            <span className="text-white/20 text-xs">/</span>
            <Skeleton dark className="w-24 h-3 rounded" />
          </div>

          {/* Title */}
          <Skeleton dark className="w-3/4 h-10 sm:h-12 rounded-xl" />

          {/* Description */}
          <SkeletonText dark lines={2} lastLineWidth="70%" className="pt-2 max-w-xl" />
        </div>
      </div>
    </div>
  )
}
