import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BlogListingClient } from './BlogListingClient'

export const BlogListing = async ({
  page,
  searchParams,
}: {
  page: any
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const currentPage = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1

  // Fetch Blog Settings Global
  const blogSettings = await payload.findGlobal({
    slug: 'blog-settings',
  })

  const limit = blogSettings?.blogItemsPerPage || 10
  const postsResult = await payload.find({
    collection: 'posts',
    limit,
    page: currentPage,
    sort: '-createdAt',
  })

  const posts = postsResult.docs
  const totalPages = postsResult.totalPages || 1

  // Fetch Categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  const categories = categoriesResult.docs

  // Extract Tags from Posts
  const allTags = new Set<string>()
  posts.forEach((post) => {
    if (post.tags && typeof post.tags === 'string') {
      const splitTags = post.tags.split(',').map((tag) => tag.trim())
      splitTags.forEach((t) => {
        if (t) allTags.add(t)
      })
    }
  })
  const tags = Array.from(allTags)

  return (
    <BlogListingClient
      initialPosts={posts}
      initialTotalPages={totalPages}
      initialPage={currentPage}
      limit={limit}
      blogSettings={blogSettings}
      categories={categories}
      tags={tags}
      parentSlug={page.slug}
    />
  )
}
