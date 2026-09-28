import React from 'react'
import { RenderBlocks } from '@/components/RenderBlocks'
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

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || fallbackDescription,
  }
}

export default async function HomePage() {
  const page = await getHomePageCached()

  if (!page) return null

  return (
    <div style={{ paddingTop: 'var(--header-height, 73px)' }}>
      {/* Add padding for fixed header */}
      <RenderBlocks blocks={page.layout as any[]} />
    </div>
  )
}

