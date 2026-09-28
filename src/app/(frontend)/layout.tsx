import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DynamicChatbot } from '@/components/DynamicChatbot'
import { QueryProvider } from '@/providers/QueryProvider'
import { getSiteSettingsCached } from '@/utils/cachedData'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-base',
})

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettingsCached()

  const faviconMedia = siteSettings?.siteFavicon || siteSettings?.siteIcon
  const faviconUrl =
    typeof faviconMedia === 'object' && faviconMedia?.url
      ? faviconMedia.url
      : typeof faviconMedia === 'string'
        ? faviconMedia
        : undefined

  const faviconType =
    typeof faviconMedia === 'object' && faviconMedia?.mimeType ? faviconMedia.mimeType : undefined

  const title = siteSettings?.metaTitle || siteSettings?.siteName || 'CMS'
  const description =
    siteSettings?.metaDescription ||
    siteSettings?.description ||
    'Professional CMS and Web Development Solutions for modern digital experiences.'

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: faviconUrl
      ? [
          {
            rel: 'icon',
            url: faviconUrl,
            type: faviconType,
          },
          {
            rel: 'shortcut icon',
            url: faviconUrl,
          },
          {
            rel: 'apple-touch-icon',
            url: faviconUrl,
          },
        ]
      : undefined,
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const siteSettings = await getSiteSettingsCached()

  const faviconMedia = siteSettings?.siteFavicon || siteSettings?.siteIcon
  const faviconUrl =
    typeof faviconMedia === 'object' && faviconMedia?.url
      ? faviconMedia.url
      : typeof faviconMedia === 'string'
        ? faviconMedia
        : undefined

  const faviconType =
    typeof faviconMedia === 'object' && faviconMedia?.mimeType ? faviconMedia.mimeType : undefined

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {faviconUrl && (
          <>
            <link rel="icon" href={faviconUrl} type={faviconType || undefined} />
            <link rel="shortcut icon" href={faviconUrl} />
            <link rel="apple-touch-icon" href={faviconUrl} />
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <DynamicChatbot />
        </QueryProvider>
      </body>
    </html>
  )
}
