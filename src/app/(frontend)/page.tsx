import React from 'react'
import { RenderBlocks } from '@/components/RenderBlocks'
import { PageScripts } from '@/components/Scripts'
import { getHomePageCached, getSiteSettingsCached } from '@/utils/cachedData'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePageCached()
  const siteSettings = await getSiteSettingsCached()
  const fallbackDescription =
    siteSettings?.metaDescription ||
    siteSettings?.description ||
    'Professional CMS and Web Development Solutions for modern digital experiences.'

  if (!page) {
    return {
      description: fallbackDescription,
    }
  }

  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || fallbackDescription

  const ogMedia = page.seo?.ogImage as any
  const ogImageUrl =
    typeof ogMedia === 'object' && ogMedia !== null
      ? ogMedia.url || (ogMedia.filename ? `/api/media/file/${ogMedia.filename}` : undefined)
      : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }
}

export default async function HomePage() {
  const page = await getHomePageCached()

  if (!page) return null

  return (
    <div style={{ paddingTop: 'var(--header-height, 73px)' }}>
      <PageScripts scripts={page.scripts} />
      {/* Add padding for fixed header */}
      <RenderBlocks blocks={page.layout as any[]} />
    </div>
  )
}

