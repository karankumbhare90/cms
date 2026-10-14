import React from 'react'
import { Skeleton, SkeletonButton } from '@/components/ui/Skeleton'

export const HeaderSkeleton: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0C1E33] border-b border-white/10">
      {/* Top Header Strip */}
      <div className="bg-white/5 border-b border-white/5 py-2.5">
        <div className="container mx-auto">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton dark className="w-40 h-3.5 rounded" />
              <Skeleton dark className="w-32 h-3.5 rounded hidden sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton dark variant="circular" className="w-5 h-5" />
              <Skeleton dark variant="circular" className="w-5 h-5" />
              <Skeleton dark variant="circular" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-3 sm:py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Skeleton dark className="w-36 h-9 rounded-lg" />
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            <Skeleton dark className="w-16 h-4 rounded" />
            <Skeleton dark className="w-20 h-4 rounded" />
            <Skeleton dark className="w-24 h-4 rounded" />
            <Skeleton dark className="w-16 h-4 rounded" />
            <Skeleton dark className="w-20 h-4 rounded" />
          </nav>

          {/* Header CTA Button */}
          <div className="flex items-center gap-3">
            <SkeletonButton dark width="130px" height="42px" className="hidden sm:block" />
            {/* Mobile Hamburger placeholder */}
            <Skeleton dark className="w-9 h-9 rounded-lg lg:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}
