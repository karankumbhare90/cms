import React from 'react'
import { Skeleton } from '@/components/ui/Skeleton'
import { BlogCardSkeleton } from '@/components/BlogListing'

export default function CategoryDetailLoading() {
  return (
    <div
      className="container mx-auto px-4 py-24 max-w-5xl"
      style={{ paddingTop: 'calc(var(--header-height, 72px) + 3rem)' }}
    >
      {/* Category Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-16 text-center space-y-3">
        <Skeleton className="w-20 h-4 rounded-full mx-auto" />
        <Skeleton className="w-56 h-10 rounded-lg mx-auto" />
      </div>

      {/* Posts Section */}
      <Skeleton className="w-48 h-7 rounded-lg mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <BlogCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  )
}
