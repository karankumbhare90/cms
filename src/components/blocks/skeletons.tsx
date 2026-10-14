import React from 'react'
import { Skeleton, SkeletonText, SkeletonButton, SkeletonCircle } from '@/components/ui/Skeleton'

/**
 * 1. Hero Skeleton
 */
export const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative flex flex-col justify-center min-h-[450px] md:min-h-[550px] lg:min-h-[650px] bg-[#0C1E33] overflow-hidden py-20 border-b border-white/10">
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl space-y-6">
          <Skeleton dark className="w-24 h-5 rounded-full" />
          <Skeleton dark className="w-full h-12 sm:h-16 rounded-xl" />
          <Skeleton dark className="w-4/5 h-12 sm:h-16 rounded-xl" />
          <SkeletonText dark lines={3} lastLineWidth="65%" className="pt-2 max-w-xl" />
          <div className="flex flex-wrap gap-4 pt-4">
            <SkeletonButton dark width="150px" height="48px" />
            <SkeletonButton dark width="150px" height="48px" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 2. CTA (Call To Action) Skeleton
 */
export const CTASkeleton: React.FC = () => {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden border-y border-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex-1 w-full space-y-4">
            <Skeleton className="w-24 h-4 rounded-full" />
            <Skeleton className="w-3/4 h-9 sm:h-11 rounded-lg" />
            <SkeletonText lines={2} lastLineWidth="80%" />
            <div className="pt-2">
              <SkeletonButton width="160px" height="46px" />
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <Skeleton className="w-full h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 3. Content Block Skeleton
 */
export const ContentSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="w-32 h-4 rounded-full" />
          <Skeleton className="w-2/3 h-10 rounded-lg" />
          <SkeletonText lines={4} lastLineWidth="85%" />
          <Skeleton className="w-full h-72 sm:h-96 rounded-2xl my-6" />
          <SkeletonText lines={3} lastLineWidth="70%" />
        </div>
      </div>
    </section>
  )
}

/**
 * 4. Text Block Skeleton
 */
export const TextSkeleton: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="w-1/2 h-8 rounded-lg" />
          <SkeletonText lines={3} lastLineWidth="90%" />
          <SkeletonText lines={2} lastLineWidth="60%" />
        </div>
      </div>
    </section>
  )
}

/**
 * 5. Text With Image Skeleton
 */
export const TextWithImageSkeleton: React.FC<{ isImageRight?: boolean }> = ({
  isImageRight = false,
}) => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto">
        <div
          className={`flex flex-col lg:flex-row items-center gap-10 md:gap-14 ${
            isImageRight ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text */}
          <div className="flex-1 w-full space-y-4">
            <Skeleton className="w-28 h-4 rounded-full" />
            <Skeleton className="w-4/5 h-10 sm:h-12 rounded-lg" />
            <SkeletonText lines={4} lastLineWidth="75%" className="pt-2" />
            <div className="pt-4">
              <SkeletonButton width="150px" height="46px" />
            </div>
          </div>
          {/* Image */}
          <div className="flex-1 w-full">
            <Skeleton className="w-full aspect-[4/3] rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 6. Text With Video Skeleton
 */
export const TextWithVideoSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 w-full space-y-4">
            <Skeleton className="w-24 h-4 rounded-full" />
            <Skeleton className="w-3/4 h-10 rounded-lg" />
            <SkeletonText lines={3} lastLineWidth="80%" />
            <div className="pt-3">
              <SkeletonButton width="140px" height="44px" />
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <Skeleton className="w-full aspect-video rounded-3xl" />
            {/* Play button circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <SkeletonCircle size={64} className="shadow-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 7. Counter Skeleton
 */
export const CounterSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto">
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <Skeleton className="w-24 h-4 rounded-full mx-auto" />
          <Skeleton className="w-3/4 h-9 rounded-lg mx-auto" />
          <Skeleton className="w-1/2 h-4 rounded mx-auto" />
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-3"
            >
              <SkeletonCircle size={56} />
              <Skeleton className="w-24 h-10 rounded-lg" />
              <Skeleton className="w-32 h-4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 8. Pod (Feature Cards) Skeleton
 */
export const PodSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <Skeleton className="w-24 h-4 rounded-full mx-auto" />
          <Skeleton className="w-3/4 h-9 rounded-lg mx-auto" />
          <SkeletonText lines={2} lastLineWidth="80%" className="max-w-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-4"
            >
              <SkeletonCircle size={48} />
              <Skeleton className="w-2/3 h-6 rounded-lg" />
              <SkeletonText lines={3} lastLineWidth="75%" />
              <Skeleton className="w-24 h-4 rounded pt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 9. FAQ Skeleton
 */
export const FAQSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-3 mb-12">
          <Skeleton className="w-20 h-4 rounded-full mx-auto" />
          <Skeleton className="w-2/3 h-9 rounded-lg mx-auto" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-between"
            >
              <Skeleton className="w-3/4 h-5 rounded" />
              <SkeletonCircle size={28} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 10. Testimonial Skeleton
 */
export const TestimonialSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto max-w-4xl text-center space-y-6">
        <SkeletonCircle size={44} className="mx-auto" />
        <SkeletonText lines={3} lastLineWidth="70%" className="max-w-2xl mx-auto" />
        <div className="flex flex-col items-center gap-2 pt-2">
          <SkeletonCircle size={60} />
          <Skeleton className="w-36 h-5 rounded mt-1" />
          <Skeleton className="w-24 h-3.5 rounded" />
          {/* Star rating placeholders */}
          <div className="flex gap-1 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 11. Logo Grid Skeleton
 */
export const LogoGridSkeleton: React.FC = () => {
  return (
    <section className="py-12 md:py-16 border-y border-gray-100">
      <div className="container mx-auto">
        <Skeleton className="w-40 h-4 rounded-full mx-auto mb-10" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-16 flex items-center justify-center p-3">
              <Skeleton className="w-full h-10 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 12. Pricing Table Skeleton
 */
export const PricingTableSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <Skeleton className="w-24 h-4 rounded-full mx-auto" />
          <Skeleton className="w-2/3 h-10 rounded-lg mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={`rounded-2xl bg-white border ${
                idx === 1 ? 'border-blue-500 shadow-xl md:scale-105' : 'border-gray-100 shadow-sm'
              } p-8 flex flex-col space-y-6`}
            >
              <Skeleton className="w-28 h-6 rounded-lg" />
              <div className="space-y-1">
                <Skeleton className="w-32 h-10 rounded-lg" />
                <Skeleton className="w-20 h-3.5 rounded" />
              </div>
              <div className="space-y-3 border-t border-gray-100 pt-6 flex-grow">
                {Array.from({ length: 4 }).map((_, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <SkeletonCircle size={18} />
                    <Skeleton className="w-3/4 h-3.5 rounded" />
                  </div>
                ))}
              </div>
              <SkeletonButton width="100%" height="46px" className="mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 13. Team Grid Skeleton
 */
export const TeamGridSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <Skeleton className="w-20 h-4 rounded-full mx-auto" />
          <Skeleton className="w-2/3 h-9 rounded-lg mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-4">
              <Skeleton className="w-full aspect-square rounded-xl" />
              <div className="space-y-2 text-center pt-2">
                <Skeleton className="w-32 h-5 rounded mx-auto" />
                <Skeleton className="w-24 h-3.5 rounded mx-auto" />
              </div>
              <div className="flex justify-center gap-2 pt-2">
                <SkeletonCircle size={28} />
                <SkeletonCircle size={28} />
                <SkeletonCircle size={28} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 14. Media Gallery Skeleton
 */
export const MediaGallerySkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <Skeleton className="w-24 h-4 rounded-full mx-auto" />
          <Skeleton className="w-2/3 h-9 rounded-lg mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="w-full aspect-[4/3] rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 15. Map Skeleton
 */
export const MapSkeleton: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto space-y-6">
        <Skeleton className="w-48 h-8 rounded-lg" />
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden">
          <Skeleton className="w-full h-full rounded-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <SkeletonCircle size={48} />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 16. Tabs Skeleton
 */
export const TabsSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl">
        {/* Tab buttons */}
        <div className="flex gap-3 justify-center mb-10 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="w-28 h-10 rounded-full flex-shrink-0" />
          ))}
        </div>

        {/* Tab content panel */}
        <div className="p-8 rounded-3xl bg-gray-50/80 border border-gray-100 shadow-sm space-y-6">
          <Skeleton className="w-1/2 h-7 rounded" />
          <SkeletonText lines={4} lastLineWidth="80%" />
          <Skeleton className="w-full h-64 rounded-2xl" />
        </div>
      </div>
    </section>
  )
}

/**
 * 17. Comparison Table Skeleton
 */
export const ComparisonTableSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-5xl space-y-8">
        <div className="text-center space-y-3 mb-10">
          <Skeleton className="w-24 h-4 rounded-full mx-auto" />
          <Skeleton className="w-2/3 h-9 rounded-lg mx-auto" />
        </div>

        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-4 p-5 bg-gray-50 border-b border-gray-100 gap-4">
            <Skeleton className="w-32 h-5 rounded" />
            <Skeleton className="w-20 h-5 rounded mx-auto" />
            <Skeleton className="w-20 h-5 rounded mx-auto" />
            <Skeleton className="w-20 h-5 rounded mx-auto" />
          </div>
          {/* Table Rows */}
          {Array.from({ length: 5 }).map((_, rIdx) => (
            <div key={rIdx} className="grid grid-cols-4 p-4 border-b border-gray-100 items-center gap-4">
              <Skeleton className="w-40 h-4 rounded" />
              <SkeletonCircle size={18} className="mx-auto" />
              <SkeletonCircle size={18} className="mx-auto" />
              <SkeletonCircle size={18} className="mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 18. Countdown Timer Skeleton
 */
export const CountdownTimerSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#0C1E33] border-y border-white/10">
      <div className="container mx-auto text-center space-y-8">
        <Skeleton dark className="w-2/3 h-10 rounded-lg mx-auto" />
        <div className="flex justify-center gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="w-20 sm:w-28 h-24 sm:h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2"
            >
              <Skeleton dark className="w-12 h-10 rounded" />
              <Skeleton dark className="w-10 h-3 rounded" />
            </div>
          ))}
        </div>
        <SkeletonButton dark width="160px" height="46px" className="mx-auto mt-4" />
      </div>
    </section>
  )
}

/**
 * 19. Notice Banner Skeleton
 */
export const NoticeBannerSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-blue-50/50 border-y border-blue-100">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <SkeletonCircle size={24} />
          <Skeleton className="w-2/3 h-4 rounded" />
        </div>
        <Skeleton className="w-20 h-8 rounded-lg hidden sm:block" />
      </div>
    </div>
  )
}

/**
 * 20. Timeline Skeleton
 */
export const TimelineSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-3 mb-10">
          <Skeleton className="w-24 h-4 rounded-full mx-auto" />
          <Skeleton className="w-1/2 h-9 rounded-lg mx-auto" />
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:w-0.5 before:bg-gray-100">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between gap-8">
              <div className="w-5/12 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-2">
                <Skeleton className="w-20 h-4 rounded-full" />
                <Skeleton className="w-3/4 h-5 rounded" />
                <SkeletonText lines={2} lastLineWidth="70%" />
              </div>
              <SkeletonCircle size={20} className="z-10" />
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 21. Process Steps Skeleton
 */
export const ProcessStepsSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
          <Skeleton className="w-20 h-4 rounded-full mx-auto" />
          <Skeleton className="w-2/3 h-9 rounded-lg mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-4 relative"
            >
              <Skeleton className="w-12 h-10 rounded-lg" />
              <Skeleton className="w-2/3 h-6 rounded" />
              <SkeletonText lines={3} lastLineWidth="80%" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 22. Portfolio Grid Skeleton
 */
export const PortfolioGridSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
          <Skeleton className="w-24 h-4 rounded-full mx-auto" />
          <Skeleton className="w-2/3 h-9 rounded-lg mx-auto" />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 justify-center mb-10">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="w-20 h-8 rounded-full" />
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm p-4 space-y-4"
            >
              <Skeleton className="w-full aspect-video rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="w-2/3 h-5 rounded" />
                <Skeleton className="w-24 h-3.5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 23. Sitemap Skeleton
 */
export const SitemapSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-5xl space-y-10">
        <Skeleton className="w-48 h-8 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-3">
              <Skeleton className="w-36 h-5 rounded" />
              <div className="space-y-2 pt-2">
                <Skeleton className="w-24 h-3.5 rounded" />
                <Skeleton className="w-32 h-3.5 rounded" />
                <Skeleton className="w-28 h-3.5 rounded" />
                <Skeleton className="w-20 h-3.5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 24. Contact Us Skeleton
 */
export const ContactUsSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <Skeleton className="w-24 h-4 rounded-full" />
            <Skeleton className="w-3/4 h-10 rounded-lg" />
            <SkeletonText lines={3} lastLineWidth="80%" />
            <div className="space-y-4 pt-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex gap-4 items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <SkeletonCircle size={40} />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="w-20 h-3.5 rounded" />
                    <Skeleton className="w-40 h-4 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-6">
            <Skeleton className="w-48 h-7 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Skeleton className="w-full h-12 rounded-xl" />
              <Skeleton className="w-full h-12 rounded-xl" />
            </div>
            <Skeleton className="w-full h-12 rounded-xl" />
            <Skeleton className="w-full h-32 rounded-xl" />
            <SkeletonButton width="160px" height="48px" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Composite RenderBlocksSkeleton for entire page loading
 */
export const RenderBlocksSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSkeleton />
      <TextWithImageSkeleton />
      <CounterSkeleton />
      <PodSkeleton />
      <CTASkeleton />
    </div>
  )
}
