import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { Banner } from '@/components/Banner'
import { BlogListing } from '@/components/BlogListing'
import { RenderBlocks } from '@/components/RenderBlocks'
import { PageScripts } from '@/components/Scripts'
import { getSiteSettingsCached } from '@/utils/cachedData'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ categorySlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const categoryResult = await payload.find({
    collection: 'categories',
    limit: 1,
    where: {
      slug: {
        equals: categorySlug,
      },
    },
  })

  const category = categoryResult.docs[0]
  const siteSettings = await getSiteSettingsCached()
  const fallbackDescription =
    siteSettings?.metaDescription ||
    siteSettings?.description ||
    'Professional CMS and Web Development Solutions for modern digital experiences.'

  if (!category) {
    return {
      description: fallbackDescription,
    }
  }

  const name = category.categoryName || category.title || 'Category'
  const title = category.seo?.metaTitle || `${name} | Category`
  const description =
    category.seo?.metaDescription ||
    category.banner?.pageDescription ||
    `Explore all latest posts, guides, and articles in ${name}. ${fallbackDescription}`

  return {
    title,
    description,
  }
}

export default async function CategoryDetailPage({ params, searchParams }: Props) {
  const { categorySlug } = await params
  const searchParamsResolved = await searchParams
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 1. Fetch Category
  const categoryResult = await payload.find({
    collection: 'categories',
    limit: 1,
    where: {
      slug: {
        equals: categorySlug,
      },
    },
  })

  const category = categoryResult.docs[0]
  if (!category) return notFound()

  // 2. Fetch Blog Landing Page to get the base blog slug (e.g. 'blogs')
  const pagesResult = await payload.find({
    collection: 'pages',
    limit: 10,
    where: {
      pageType: {
        equals: 'blog-landing',
      },
    },
  })
  const blogLandingPage = pagesResult.docs[0]
  const blogPrefix = blogLandingPage?.slug || 'blogs'

  const categoryName = category.categoryName || category.title

  // Breadcrumbs: Home -> Blogs -> [Category Name]
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: blogLandingPage?.title || 'Blogs', href: `/${blogPrefix}` },
    { label: categoryName, href: `/categories/${category.slug}` },
  ]

  const bannerTitle = category.banner?.pageTitle || categoryName
  const bannerDescription =
    category.banner?.pageDescription ||
    `Browse all guides, tutorials, and insights in ${categoryName}.`

  return (
    <div style={{ paddingTop: 'var(--header-height, 72px)' }}>
      <PageScripts scripts={category.scripts} />
      <Banner
        pageTitle={bannerTitle}
        pageDescription={bannerDescription}
        displayBreadcrumb={category.banner?.displayBreadcrumb ?? true}
        bannerBackground={
          category.banner?.bannerBackground || blogLandingPage?.banner?.bannerBackground
        }
        textAlign={category.banner?.textAlign || 'left'}
        displayOverlay={category.banner?.displayOverlay ?? true}
        overlayOpacity={category.banner?.overlayOpacity ?? 50}
        breadcrumbs={breadcrumbs}
      />

      <BlogListing
        page={blogLandingPage || { slug: blogPrefix }}
        searchParams={searchParamsResolved}
        categorySlug={category.slug}
        categoryId={category.id}
        currentCategoryName={categoryName}
      />

      {category.layout && category.layout.length > 0 && (
        <RenderBlocks blocks={category.layout as any[]} />
      )}
    </div>
  )
}
