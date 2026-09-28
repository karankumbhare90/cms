'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogSidebar } from '@/components/BlogSidebar'

interface BlogListingClientProps {
  initialPosts: any[]
  initialTotalPages: number
  initialPage: number
  limit: number
  blogSettings: any
  categories: any[]
  tags: string[]
  parentSlug: string
}

async function fetchPosts({ page, limit }: { page: number; limit: number }) {
  const res = await fetch(`/api/posts?page=${page}&limit=${limit}`)
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export const BlogListingClient: React.FC<BlogListingClientProps> = ({
  initialPosts,
  initialTotalPages,
  initialPage,
  limit,
  blogSettings,
  categories,
  tags,
  parentSlug,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const { data, isFetching } = useQuery({
    queryKey: ['blog-posts', currentPage, limit],
    queryFn: () => fetchPosts({ page: currentPage, limit }),
    initialData: {
      posts: initialPosts,
      totalPages: initialTotalPages,
      page: initialPage,
    },
    staleTime: 1000 * 60 * 5,
  })

  const posts = data?.posts || initialPosts
  const totalPages = data?.totalPages || initialTotalPages

  const hideRecentPost = blogSettings?.hideRecentPost || false
  const hideCategories = blogSettings?.hideCategories || false
  const hideTabs = blogSettings?.hideTabs || false
  const hideSidebar = hideRecentPost && hideCategories && hideTabs

  const layoutStyle = blogSettings?.blogListingLayout || 'grid'
  const isGrid = layoutStyle === 'grid'

  const pagesPerGroup = 5
  const pageNumbers: number[] = []
  const startPage = Math.max(1, Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1)
  for (let i = startPage; i < startPage + pagesPerGroup && i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <section className="blog-listing-page">
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
                  {posts.length > 0 ? (
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
                    <div className="text-gray-500 py-8">No posts found.</div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination Controls using React Query */}
              {totalPages > 1 && (
                <nav id="pagination" className="text-center mt-10">
                  <ul className="flex justify-center items-center gap-2">
                    {currentPage > 1 && (
                      <li>
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={isFetching}
                          className="flex items-center justify-center gap-1.5 px-3.5 h-10 rounded-xl border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                          Previous
                        </button>
                      </li>
                    )}

                    {pageNumbers.map((num) => (
                      <li key={num}>
                        <button
                          onClick={() => setCurrentPage(num)}
                          disabled={isFetching}
                          className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all ${
                            num === currentPage
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                              : 'border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                          }`}
                        >
                          {num}
                        </button>
                      </li>
                    ))}

                    {currentPage < totalPages && (
                      <li>
                        <button
                          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                          disabled={isFetching}
                          className="flex items-center justify-center gap-1.5 px-3.5 h-10 rounded-xl border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                          Next
                        </button>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>

            {/* Right Side: Sidebar */}
            <BlogSidebar
              blogSettings={blogSettings}
              posts={posts}
              categories={categories}
              tags={tags}
              parentSlug={parentSlug}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
