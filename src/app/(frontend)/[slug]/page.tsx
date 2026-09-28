import React from 'react'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import { BlogListing } from '@/components/BlogListing'
import { Banner } from '@/components/Banner'
import { Metadata } from 'next'
import { getPageBySlugCached, getSiteSettingsCached } from '@/utils/cachedData'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlugCached(slug)
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
    description: page.seo?.metaDescription || page.banner?.pageDescription || fallbackDescription,
  }
}

export default async function DynamicPage({ params, searchParams }: Props) {
  const { slug } = await params
  const searchParamsResolved = await searchParams
  const page = await getPageBySlugCached(slug)

  if (!page) {
    return notFound()
  }


  return (
    <div style={{ paddingTop: 'var(--header-height, 72px)' }}>
      {page.banner?.pageTitle || page.banner?.bannerBackground ? (
        <Banner
          page={page}
          pageTitle={page.banner.pageTitle || undefined}
          pageDescription={page.banner.pageDescription || undefined}
          displayBreadcrumb={page.banner.displayBreadcrumb ?? undefined}
          bannerBackground={page.banner.bannerBackground || undefined}
          textAlign={page.banner.textAlign || undefined}
          displayOverlay={page.banner.displayOverlay ?? true}
          overlayOpacity={page.banner.overlayOpacity ?? 50}
        />
      ) : null}

      {page.pageType === 'blog-landing' ? (
        <>
          <BlogListing page={page} searchParams={searchParamsResolved} />
          {page.layout && page.layout.length > 0 && <RenderBlocks blocks={page.layout as any[]} />}
        </>
      ) : (
        <RenderBlocks blocks={page.layout as any[]} />
      )}
    </div>
  )
}
