import React from 'react'
import { Skeleton, SkeletonText, SkeletonCircle } from '@/components/ui/Skeleton'

export const FooterSkeleton: React.FC = () => {
  return (
    <footer className="bg-[#0C1E33] border-t border-white/10">
      <div className="container mx-auto pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Logo & Info column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 space-y-4">
            <Skeleton dark className="w-36 h-9 rounded-lg" />
            <SkeletonText dark lines={3} lastLineWidth="80%" />
            <div className="pt-3 space-y-2.5">
              <Skeleton dark className="w-48 h-3.5 rounded" />
              <Skeleton dark className="w-40 h-3.5 rounded" />
              <Skeleton dark className="w-44 h-3.5 rounded" />
            </div>
          </div>

          {/* Link columns */}
          {Array.from({ length: 4 }).map((_, colIdx) => (
            <div key={colIdx} className="space-y-4">
              <Skeleton dark className="w-28 h-5 rounded" />
              <div className="space-y-3 pt-1">
                <Skeleton dark className="w-24 h-3.5 rounded" />
                <Skeleton dark className="w-32 h-3.5 rounded" />
                <Skeleton dark className="w-20 h-3.5 rounded" />
                <Skeleton dark className="w-28 h-3.5 rounded" />
                <Skeleton dark className="w-16 h-3.5 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton dark className="w-56 h-4 rounded" />
          <div className="flex items-center gap-3">
            <SkeletonCircle dark size={32} />
            <SkeletonCircle dark size={32} />
            <SkeletonCircle dark size={32} />
            <SkeletonCircle dark size={32} />
          </div>
        </div>
      </div>
    </footer>
  )
}
