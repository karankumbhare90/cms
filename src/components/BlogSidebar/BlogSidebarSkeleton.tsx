import React from 'react'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export const BlogSidebarSkeleton: React.FC = () => {
  return (
    <div className="col-span-1 lg:col-span-4 space-y-8">
      {/* Recent Posts Widget */}
      <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <Skeleton className="w-32 h-6 rounded" />
        <div className="space-y-4 pt-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-20 h-3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <Skeleton className="w-28 h-6 rounded" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex justify-between items-center py-1">
              <Skeleton className="w-28 h-4 rounded" />
              <Skeleton className="w-6 h-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Tags Widget */}
      <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <Skeleton className="w-20 h-6 rounded" />
        <div className="flex flex-wrap gap-2 pt-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="w-16 h-7 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
