import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SITE_URL } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  // Ensure robust base URL: prioritize non-localhost NEXT_PUBLIC_SERVER_URL,
  // then Vercel production domain, falling back to SITE_URL, and strip any trailing slash.
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL && !process.env.NEXT_PUBLIC_SERVER_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : process.env.NEXT_PUBLIC_SERVER_URL || SITE_URL

  const baseUrl = rawBaseUrl.replace(/\/+$/, '')

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
    const isHome = page.slug === '/' || page.slug === 'home' || !page.slug
    const slugPath = isHome ? '' : `/${String(page.slug).replace(/^\/+/, '')}`
    return {
      url: `${baseUrl}${slugPath || '/'}`,
      lastModified: new Date(page.updatedAt || page.createdAt),
      changeFrequency: (isHome ? 'daily' : 'weekly') as any,
      priority: isHome ? 1.0 : 0.8,
    }
  })

  // --- 2. Fetch Posts ---
  const postsData = await payload.find({
    collection: 'posts',
    limit: 1000,
  })

  const posts = postsData.docs.filter((post: any) => {
    const isPublished = post._status ? post._status === 'published' : true
    return isPublished && post.navigation?.hideFromXMLSitemap !== true
  })

  // Find the blog landing page to construct the correct URL path for posts
  // According to structure: /[slug]/post/[postSlug]
  const blogLandingPage = pages.find((page: any) => page.pageType === 'blog-landing')
  const blogPrefix = blogLandingPage ? `/${String(blogLandingPage.slug).replace(/^\/+/, '')}` : '/blog'

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}${blogPrefix}/post/${String(post.slug).replace(/^\/+/, '')}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'weekly' as any,
    priority: 0.7,
  }))

  // --- 3. Fetch Categories ---
  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 1000,
  })

  const categories = categoriesData.docs.filter((category: any) => {
    return category.navigation?.hideFromXMLSitemap !== true
  })

  const categoryUrls = categories.map((category: any) => ({
    url: `${baseUrl}/categories/${String(category.slug).replace(/^\/+/, '')}`,
    lastModified: new Date(category.updatedAt || category.createdAt),
    changeFrequency: 'weekly' as any,
    priority: 0.6,
  }))

  // --- 4. Fetch Authors ---
  const authorsData = await payload.find({
    collection: 'authors',
    limit: 1000,
  })

  const authors = authorsData.docs.filter((author: any) => {
    return author.navigation?.hideFromXMLSitemap !== true
  })

  const authorUrls = authors.map((author: any) => ({
    url: `${baseUrl}/authors/${String(author.slug).replace(/^\/+/, '')}`,
    lastModified: new Date(author.updatedAt || author.createdAt),
    changeFrequency: 'monthly' as any,
    priority: 0.5,
  }))

  // Combine and return
  return [...pageUrls, ...postUrls, ...categoryUrls, ...authorUrls]
}

