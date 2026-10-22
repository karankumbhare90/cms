'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogSidebar } from '@/components/BlogSidebar'
import { BlogCardSkeleton } from './BlogListingSkeleton'

interface BlogListingClientProps {
  initialPosts: any[]
  initialTotalPages: number
  initialPage: number
  limit: number
  blogSettings: any
  categories: any[]
  recentPosts?: any[]
  tags: string[]
  parentSlug: string
  categorySlug?: string
  currentCategoryName?: string
}

async function fetchPosts({
  page,
  limit,
  categorySlug,
}: {
  page: number
  limit: number
  categorySlug?: string
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  if (categorySlug) {
    params.set('category', categorySlug)
  }
  const res = await fetch(`/api/posts?${params.toString()}`)
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

function getPaginationItems(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', total]
  }

  if (current >= total - 3) {
    return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total]
}

export const BlogListingClient: React.FC<BlogListingClientProps> = ({
  initialPosts,
  initialTotalPages,
  initialPage,
  limit,
  blogSettings,
  categories,
  recentPosts,
  tags,
  parentSlug,
  categorySlug,
  currentCategoryName,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [currentPage, setCurrentPage] = useState(initialPage)

  // Sync state if user navigates via browser back/forward buttons
  useEffect(() => {
    const pageParam = searchParams?.get('page')
    const pageFromUrl = pageParam ? parseInt(pageParam, 10) : 1
    if (!isNaN(pageFromUrl) && pageFromUrl >= 1 && pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl)
    }
  }, [searchParams, currentPage])

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return

    setCurrentPage(newPage)

    const params = new URLSearchParams(searchParams ? searchParams.toString() : '')
    if (newPage === 1) {
      params.delete('page')
    } else {
      params.set('page', String(newPage))
    }
    const queryString = params.toString()
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname
    router.push(targetUrl, { scroll: false })

    // Smoothly scroll to the top of the blog listing
    const el = document.getElementById('blog-listing-content') || document.querySelector('.blog-listing-page')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // TanStack Query: only provide initialData when currentPage === initialPage
  // so new pages trigger an actual fetch instead of reusing page 1's initialData
  const isInitialPage = currentPage === initialPage
  const { data, isFetching } = useQuery({
    queryKey: ['blog-posts', currentPage, limit, categorySlug || 'all'],
    queryFn: () => fetchPosts({ page: currentPage, limit, categorySlug }),
    initialData: isInitialPage
      ? {
          posts: initialPosts,
          totalPages: initialTotalPages,
          page: initialPage,
        }
      : undefined,
    staleTime: 1000 * 60 * 5,
  })

  const posts = data?.posts ?? (isInitialPage ? initialPosts : [])
  const totalPages = data?.totalPages ?? initialTotalPages

  const hideRecentPost = blogSettings?.hideRecentPost || false
  const hideCategories = blogSettings?.hideCategories || false
  const hideTabs = blogSettings?.hideTabs || false
  const hideSidebar = hideRecentPost && hideCategories && hideTabs

  const layoutStyle = blogSettings?.blogListingLayout || 'grid'
  const isGrid = layoutStyle === 'grid'

  const paginationItems = getPaginationItems(currentPage, totalPages)

  return (
    <section className="blog-listing-page" id="blog-listing-content">
      <div className="inner-wrap">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Side: Blog Listing */}
            <div className={`col-span-1 ${hideSidebar ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className={`grid gap-8 ${isGrid ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
                >
                  {isFetching ? (
                    Array.from({ length: limit > 6 ? 6 : limit }).map((_, idx) => (
                      <BlogCardSkeleton key={`skeleton-${idx}`} />
                    ))
                  ) : posts.length > 0 ? (
                    posts.map((post: any) => (
                      <motion.div
                        key={post.id}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white flex flex-col h-full"
                      >
                        {post.blogMainImage && (
                          <div className="relative w-full h-56 bg-gray-100">
                            {typeof post.blogMainImage === 'object' && post.blogMainImage.url ? (
                              <Image
                                src={post.blogMainImage.url}
                                alt={post.blogMainImage.alt || post.blogTitle || 'Blog image'}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            ) : null}
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-grow">
                          {post.category && typeof post.category === 'object' && (
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                              {post.category.categoryName || post.category.title}
                            </span>
                          )}
                          <Link href={`/${parentSlug}/post/${post.slug}`}>
                            <h2 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors line-clamp-2 text-[#0C1E33]">
                              {post.blogTitle || post.title}
                            </h2>
                          </Link>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                            {post.blogExcerpt}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto">
                            {post.author && typeof post.author === 'object' && (
                              <span className="font-medium">
                                By {post.author.authorName || post.author.title}
                              </span>
                            )}
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-[#0C1E33] mb-2">
                        {currentCategoryName
                          ? `No articles in ${currentCategoryName} yet`
                          : 'No articles found'}
                      </h3>
                      <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                        We haven&apos;t published any articles in this category yet. Check back soon or explore our other topics.
                      </p>
                      <Link
                        href={`/${parentSlug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition shadow-sm hover:shadow"
                      >
                        <span>Browse All Articles</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <nav id="pagination" aria-label="Blog pagination" className="text-center mt-12">
                  <ul className="inline-flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap">
                    {/* Previous Page Button */}
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || isFetching}
                        aria-label="Previous page"
                        className="flex items-center justify-center gap-1.5 px-3.5 h-10 rounded-xl border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 bg-white shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">Previous</span>
                      </button>
                    </li>

                    {/* Page Numbers & Ellipsis */}
                    {paginationItems.map((item, idx) => {
                      if (item === 'ellipsis') {
                        return (
                          <li key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">
                            &hellip;
                          </li>
                        )
                      }

                      const isCurrent = item === currentPage

                      return (
                        <li key={item}>
                          <button
                            onClick={() => handlePageChange(item)}
                            disabled={isFetching}
                            aria-label={`Page ${item}`}
                            aria-current={isCurrent ? 'page' : undefined}
                            className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all ${
                              isCurrent
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                : 'border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 bg-white hover:shadow-sm'
                            } disabled:opacity-70`}
                          >
                            {item}
                          </button>
                        </li>
                      )
                    })}

                    {/* Next Page Button */}
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || isFetching}
                        aria-label="Next page"
                        className="flex items-center justify-center gap-1.5 px-3.5 h-10 rounded-xl border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 bg-white shadow-sm"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>

            {/* Right Side: Sidebar */}
            <BlogSidebar
              blogSettings={blogSettings}
              posts={recentPosts && recentPosts.length > 0 ? recentPosts : initialPosts}
              categories={categories}
              tags={tags}
              parentSlug={parentSlug}
              activeCategorySlug={categorySlug}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
