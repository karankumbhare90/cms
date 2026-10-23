import { MetadataRoute } from 'next'
import { SITE_URL } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL && !process.env.NEXT_PUBLIC_SERVER_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : SITE_URL

  const baseUrl = rawBaseUrl.replace(/\/+$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
