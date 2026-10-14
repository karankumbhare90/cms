import React from 'react'
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonButton } from '@/components/ui/Skeleton'
import { BlogCardSkeleton } from '@/components/BlogListing'

export default function AuthorDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-16" style={{ paddingTop: 'calc(var(--header-height, 72px) + 2rem)' }}>
      {/* Author Profile Skeleton */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16 p-8 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
        <SkeletonCircle size={160} />
        <div className="text-center md:text-left flex-1 space-y-3 w-full">
          <Skeleton className="w-56 h-10 rounded-lg mx-auto md:mx-0" />
          <SkeletonText lines={2} lastLineWidth="80%" />
          <div className="flex justify-center md:justify-start gap-3 pt-3">
            <SkeletonButton width="90px" height="36px" className="rounded-lg" />
            <SkeletonButton width="90px" height="36px" className="rounded-lg" />
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <Skeleton className="w-64 h-8 rounded-lg mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, idx) => (
          <BlogCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  )
}
