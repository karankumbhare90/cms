import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Banner } from '@/components/Banner'
import { BlogSidebar } from '@/components/BlogSidebar'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { RenderBlocks } from '@/components/RenderBlocks'
import { buildPostBreadcrumbs } from '@/utils/pageUtils'
import { getSiteSettingsCached } from '@/utils/cachedData'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string; postSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postSlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: postSlug,
      },
    },
  })

  const post = result.docs[0]
  const siteSettings = await getSiteSettingsCached()
  const fallbackDescription =
    siteSettings?.metaDescription ||
    siteSettings?.description ||
    'Professional CMS and Web Development Solutions for modern digital experiences.'

  if (!post) {
    return {
      description: fallbackDescription,
    }
  }

  return {
    title: post.seo?.metaTitle || post.blogTitle || post.title,
    description:
      post.seo?.metaDescription || post.blogExcerpt || post.banner?.pageDescription || fallbackDescription,
  }
}

export default async function PostDetailPage({ params }: Props) {
  const { slug, postSlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: postSlug,
      },
    },
  })

  const post = result.docs[0]
  if (!post) {
    return notFound()
  }

  // Fetch parent page to build complete ancestor breadcrumbs
  const parentPageRes = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 3,
    limit: 1,
  })
  const parentPage = parentPageRes.docs[0] || null

  const breadcrumbs = buildPostBreadcrumbs(
    parentPage,
    slug,
    post.banner?.pageTitle || post.title || post.blogTitle || 'Blog Detail',
  )

  // Fetch Blog Settings Global
  const blogSettings = await payload.findGlobal({
    slug: 'blog-settings',
  })

  // Fetch Posts for recent posts and tags
  const postsResult = await payload.find({
    collection: 'posts',
    limit: 100,
    sort: '-createdAt', // Newest first
  })
  const posts = postsResult.docs

  // Fetch Categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  const categories = categoriesResult.docs

  // Extract Tags from Posts
  const allTags = new Set<string>()
  posts.forEach((p) => {
    if (p.tags && typeof p.tags === 'string') {
      const splitTags = p.tags.split(',').map((tag) => tag.trim())
      splitTags.forEach((t) => {
        if (t) allTags.add(t)
      })
    }
  })
  const tags = Array.from(allTags)

  const hideRecentPost = blogSettings?.hideRecentPost || false
  const hideCategories = blogSettings?.hideCategories || false
  const hideTabs = blogSettings?.hideTabs || false
  const hideSidebar = hideRecentPost && hideCategories && hideTabs

  return (
    <div style={{ paddingTop: 'var(--header-height, 72px)' }}>
      {post.banner?.pageTitle || post.banner?.bannerBackground ? (
        <Banner
          pageTitle={post.banner?.pageTitle ?? undefined}
          pageDescription={post.banner?.pageDescription ?? undefined}
          displayBreadcrumb={post.banner?.displayBreadcrumb ?? undefined}
          bannerBackground={post.banner?.bannerBackground ?? undefined}
          textAlign={post.banner?.textAlign ?? undefined}
          displayOverlay={post.banner?.displayOverlay ?? true}
          overlayOpacity={post.banner?.overlayOpacity ?? 50}
          breadcrumbs={breadcrumbs}
        />
      ) : null}

      <section className="blog-detail-page">
        <div className="inner-wrap">
          <div className="container mx-auto ">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Side: Post Content (8 or 12 columns) */}
              <div className={`col-span-1 ${hideSidebar ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
                {/* Main Image */}
                {post.blogMainImage &&
                  typeof post.blogMainImage === 'object' &&
                  post.blogMainImage.url && (
                    <div className="relative w-full h-[60vh] rounded-xl overflow-hidden mb-12 shadow-md">
                      <Image
                        src={post.blogMainImage.url}
                        alt={post.blogMainImage.alt || post.blogTitle || 'Blog image'}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                {/* Header Metadata */}
                <div className="mb-10 text-left">
                  {post.category && typeof post.category === 'object' && (
                    <Link href={`/categories/${post.category.slug}`}>
                      <span className="text-sm font-bold tracking-wider uppercase text-blue-600 mb-4 inline-block hover:underline">
                        {post.category.categoryName || post.category.title}
                      </span>
                    </Link>
                  )}

                  <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    {post.blogTitle || post.title}
                  </h1>

                  <div className="flex justify-start items-center text-gray-500 space-x-4">
                    {post.author && typeof post.author === 'object' && (
                      <Link
                        href={`/authors/${post.author.slug}`}
                        className="flex items-center hover:text-blue-600 transition"
                      >
                        <span className="font-medium">
                          By {post.author.authorName || post.author.title}
                        </span>
                      </Link>
                    )}
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Excerpt */}
                {post.blogExcerpt && (
                  <p className="text-xl md:text-2xl text-gray-600 font-light mb-12 leading-relaxed border-l-4 border-blue-500 pl-6 py-2">
                    {post.blogExcerpt}
                  </p>
                )}

                {/* Rich Text Content */}
                <div className="w-full">
                  {post.blogDetail && (
                    <RichText className="rich-text-content" data={post.blogDetail} />
                  )}
                </div>

                {/* Tags */}
                {post.tags && (
                  <div className="border-t pt-8 mt-12">
                    <div className="flex flex-wrap gap-2">
                      <span className="font-bold mr-2 text-gray-700">Tags:</span>
                      {post.tags.split(',').map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Sidebar */}
              {!hideSidebar && (
                <div className="col-span-1 lg:col-span-4">
                  <BlogSidebar
                    blogSettings={blogSettings}
                    posts={posts}
                    categories={categories}
                    tags={tags}
                    parentSlug={slug}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {post.layout && post.layout.length > 0 && <RenderBlocks blocks={post.layout as any[]} />}
    </div>
  )
}
