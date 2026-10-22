import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { QueryProvider } from '@/providers/QueryProvider'
import { BlogListingClient } from './BlogListingClient'
import { BlogListingSkeleton } from './BlogListingSkeleton'

export const BlogListing = async ({
  page,
  searchParams,
  categorySlug,
  categoryId,
  currentCategoryName,
}: {
  page?: any
  searchParams?: { [key: string]: string | string[] | undefined }
  categorySlug?: string
  categoryId?: string
  currentCategoryName?: string
}) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const currentPage = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1

  // Fetch Blog Settings Global
  const blogSettings = await payload.findGlobal({
    slug: 'blog-settings',
  })

  const limit = blogSettings?.blogItemsPerPage || 10

  // Filter by category if categorySlug or categoryId is provided
  const whereClause: Record<string, any> = {}
  if (categorySlug) {
    whereClause['category.slug'] = { equals: categorySlug }
  } else if (categoryId) {
    whereClause['category'] = { equals: categoryId }
  }

  const postsResult = await payload.find({
    collection: 'posts',
    where: Object.keys(whereClause).length ? whereClause : undefined,
    limit,
    page: currentPage,
    sort: '-createdAt',
  })

  const posts = postsResult.docs
  const totalPages = postsResult.totalPages || 1

  // Fetch Categories for Sidebar
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  const categories = categoriesResult.docs

  // Fetch Recent Posts for Sidebar so it's always populated even if category has 0 posts
  const recentPostsResult = await payload.find({
    collection: 'posts',
    limit: 5,
    sort: '-createdAt',
  })
  const recentPosts = recentPostsResult.docs

  // Extract Tags from Posts & Recent Posts
  const allTags = new Set<string>()
  const tagSource = posts.length > 0 ? posts : recentPosts
  tagSource.forEach((post) => {
    if (post.tags && typeof post.tags === 'string') {
      const splitTags = post.tags.split(',').map((tag) => tag.trim())
      splitTags.forEach((t) => {
        if (t) allTags.add(t)
      })
    }
  })
  const tags = Array.from(allTags)

  const parentSlug = page?.slug || 'blogs'

  return (
    <Suspense
      fallback={
        <BlogListingSkeleton
          cardCount={limit}
          isGrid={blogSettings?.blogListingLayout !== 'column'}
        />
      }
    >
      <QueryProvider>
        <BlogListingClient
          initialPosts={posts}
          initialTotalPages={totalPages}
          initialPage={currentPage}
          limit={limit}
          blogSettings={blogSettings}
          categories={categories}
          recentPosts={recentPosts}
          tags={tags}
          parentSlug={parentSlug}
          categorySlug={categorySlug}
          currentCategoryName={currentCategoryName}
        />
      </QueryProvider>
    </Suspense>
  )
}

export { BlogListingSkeleton, BlogCardSkeleton } from './BlogListingSkeleton'

