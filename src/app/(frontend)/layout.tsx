import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DynamicChatbot } from '@/components/DynamicChatbot'
import { QueryProvider } from '@/providers/QueryProvider'
import { SiteHeadScript, SiteBodyScript } from '@/components/Scripts'
import { getSiteSettingsCached } from '@/utils/cachedData'
import { SITE_NAME, SITE_URL } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-base',
})

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettingsCached()

  const faviconMedia = siteSettings?.siteFavicon || siteSettings?.siteIcon
  const faviconUrl =
    typeof faviconMedia === 'object' && faviconMedia !== null
      ? faviconMedia.url ||
        (faviconMedia.filename ? `/api/media/file/${faviconMedia.filename}` : undefined)
      : typeof faviconMedia === 'string' &&
          (faviconMedia.startsWith('/') ||
            faviconMedia.startsWith('http://') ||
            faviconMedia.startsWith('https://'))
        ? faviconMedia
        : undefined

  const faviconType =
    typeof faviconMedia === 'object' && faviconMedia?.mimeType ? faviconMedia.mimeType : undefined

  const title = siteSettings?.metaTitle || siteSettings?.siteName || SITE_NAME
  const description =
    siteSettings?.metaDescription ||
    siteSettings?.description ||
    'Professional CMS and Web Development Solutions for modern digital experiences.'

  const ogMedia = siteSettings?.ogImage
  const ogImageUrl =
    typeof ogMedia === 'object' && ogMedia !== null
      ? ogMedia.url || (ogMedia.filename ? `/api/media/file/${ogMedia.filename}` : undefined)
      : typeof ogMedia === 'string' && (ogMedia.startsWith('/') || ogMedia.startsWith('http'))
        ? ogMedia
        : undefined

  const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || SITE_URL).replace(/\/+$/, '')

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: './',
    },
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
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: title,
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const siteSettings = await getSiteSettingsCached()

  const faviconMedia = siteSettings?.siteFavicon || siteSettings?.siteIcon
  const faviconUrl =
    typeof faviconMedia === 'object' && faviconMedia !== null
      ? faviconMedia.url ||
        (faviconMedia.filename ? `/api/media/file/${faviconMedia.filename}` : undefined)
      : typeof faviconMedia === 'string' &&
          (faviconMedia.startsWith('/') ||
            faviconMedia.startsWith('http://') ||
            faviconMedia.startsWith('https://'))
        ? faviconMedia
        : undefined

  const faviconType =
    typeof faviconMedia === 'object' && faviconMedia?.mimeType ? faviconMedia.mimeType : undefined

  const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || SITE_URL).replace(/\/+$/, '')
  const siteTitle = siteSettings?.siteName || SITE_NAME
  const siteDesc =
    siteSettings?.metaDescription ||
    siteSettings?.description ||
    'Professional CMS and Web Development Solutions for modern digital experiences.'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: siteTitle,
        url: baseUrl,
        description: siteDesc,
        ...(faviconUrl
          ? {
              logo: faviconUrl.startsWith('http') ? faviconUrl : `${baseUrl}${faviconUrl}`,
            }
          : {}),
        ...(Array.isArray(siteSettings?.socialLinks) && siteSettings.socialLinks.length > 0
          ? {
              sameAs: siteSettings.socialLinks.map((item: any) => item.link).filter(Boolean),
            }
          : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: siteTitle,
        description: siteDesc,
        publisher: { '@id': `${baseUrl}/#organization` },
      },
    ],
  }

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
        <link
          rel="ai-catalog"
          href="/.well-known/ai-catalog.json"
          type="application/ai-catalog+json"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeadScript script={siteSettings?.scripts?.headScript} />
      </head>
      <body suppressHydrationWarning>
        <SiteBodyScript script={siteSettings?.scripts?.bodyScript} />
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <DynamicChatbot siteName={siteSettings?.siteName || SITE_NAME} />
        </QueryProvider>
      </body>
    </html>
  )
}
