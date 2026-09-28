import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  // Ensure you have NEXT_PUBLIC_SERVER_URL set in your .env for production
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // --- 1. Fetch Pages ---
  const pagesData = await payload.find({
    collection: 'pages',
    limit: 1000,
  })

  const pages = pagesData.docs.filter((page: any) => {
    const isPublished = page._status ? page._status === 'published' : true
    return isPublished && page.navigation?.hideFromXMLSitemap !== true
  })

  const pageUrls = pages.map((page: any) => {
    const slugPath = page.slug === '/' || page.slug === 'home' ? '' : `/${page.slug}`
    return {
      url: `${baseUrl}${slugPath}`,
      lastModified: new Date(page.updatedAt || page.createdAt),
      changeFrequency: (page.slug === '/' || page.slug === 'home' ? 'daily' : 'weekly') as any,
      priority: page.slug === '/' || page.slug === 'home' ? 1.0 : 0.8,
    }
  })

  // --- 2. Fetch Posts ---
  const postsData = await payload.find({
    collection: 'posts',
    limit: 1000,
  })

  const posts = postsData.docs.filter((post: any) => {
    const isPublished = post._status ? post._status === 'published' : true
    return isPublished
  })

  // Find the blog landing page to construct the correct URL path for posts
  // According to your structure: /[slug]/post/[postSlug]
  const blogLandingPage = pages.find((page: any) => page.pageType === 'blog-landing')
  const blogPrefix = blogLandingPage ? `/${blogLandingPage.slug}` : '/blog'

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}${blogPrefix}/post/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'weekly' as any,
    priority: 0.6,
  }))

  // Combine and return
  return [...pageUrls, ...postUrls]
}
