import React from 'react'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'
import { BlogSidebarSkeleton } from '@/components/BlogSidebar'

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col h-full">
      {/* Featured Image */}
      <Skeleton className="w-full h-56 rounded-none" />

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-3">
        {/* Category badge */}
        <Skeleton className="w-20 h-4 rounded-full" />

        {/* Title */}
        <Skeleton className="w-4/5 h-6 rounded" />

        {/* Excerpt */}
        <SkeletonText lines={3} lastLineWidth="70%" className="pt-1" />

        {/* Author / Date footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <Skeleton className="w-24 h-3.5 rounded" />
          <Skeleton className="w-20 h-3.5 rounded" />
        </div>
      </div>
    </div>
  )
}

export const BlogListingSkeleton: React.FC<{
  cardCount?: number
  showSidebar?: boolean
  isGrid?: boolean
}> = ({ cardCount = 6, showSidebar = true, isGrid = true }) => {
  return (
    <section className="blog-listing-page py-12">
      <div className="inner-wrap">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Blog Cards Grid */}
            <div className={`col-span-1 ${showSidebar ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
              <div className={`grid gap-8 ${isGrid ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {Array.from({ length: cardCount }).map((_, idx) => (
                  <BlogCardSkeleton key={idx} />
                ))}
              </div>

              {/* Pagination Skeleton */}
              <div className="flex justify-center items-center gap-2 mt-12 pt-6">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="w-10 h-10 rounded-xl" />
              </div>
            </div>

            {/* Sidebar */}
            {showSidebar && <BlogSidebarSkeleton />}
          </div>
        </div>
      </div>
    </section>
  )
}
