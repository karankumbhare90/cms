import React from 'react'
import { BannerSkeleton } from '@/components/Banner'
import { BlogSidebarSkeleton } from '@/components/BlogSidebar'
import { Skeleton, SkeletonText, SkeletonCircle } from '@/components/ui/Skeleton'

export default function PostDetailLoading() {
  return (
    <div style={{ paddingTop: 'var(--header-height, 72px)' }}>
      <BannerSkeleton />

      <section className="blog-detail-page py-12">
        <div className="inner-wrap">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Side: Post Content */}
              <div className="col-span-1 lg:col-span-8 space-y-8">
                {/* Main Image */}
                <Skeleton className="w-full h-[50vh] rounded-2xl" />

                {/* Metadata */}
                <div className="space-y-4">
                  <Skeleton className="w-24 h-5 rounded-full" />
                  <Skeleton className="w-4/5 h-10 sm:h-12 rounded-xl" />
                  <div className="flex items-center gap-4 pt-2">
                    <SkeletonCircle size={40} />
                    <div className="space-y-1">
                      <Skeleton className="w-28 h-4 rounded" />
                      <Skeleton className="w-20 h-3 rounded" />
                    </div>
                  </div>
                </div>

                {/* Rich text body */}
                <div className="space-y-4 pt-4">
                  <SkeletonText lines={5} lastLineWidth="80%" />
                  <SkeletonText lines={4} lastLineWidth="90%" />
                  <Skeleton className="w-full h-72 rounded-2xl my-6" />
                  <SkeletonText lines={4} lastLineWidth="65%" />
                </div>
              </div>

              {/* Right Side: Sidebar */}
              <BlogSidebarSkeleton />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
