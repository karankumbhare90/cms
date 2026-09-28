import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettingsCached } from '@/utils/cachedData'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ categorySlug: string }>
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

  return {
    title: `${name} | Category`,
    description: `Explore all latest posts and articles in ${name}. ${fallbackDescription}`,
  }
}

export default async function CategoryDetailPage({ params }: Props) {
  const { categorySlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch Category
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

  // Fetch Category's Posts
  const postsResult = await payload.find({
    collection: 'posts',
    limit: 20,
    where: {
      category: {
        equals: category.id,
      },
    },
    sort: '-createdAt',
  })
  const posts = postsResult.docs

  return (
    <div
      className="container mx-auto px-4 py-24 max-w-5xl"
      style={{ paddingTop: 'calc(var(--header-height, 72px) + 3rem)' }}
    >
      {/* Category Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border mb-16 text-center">
        <span className="text-sm font-bold tracking-wider uppercase text-blue-600 mb-2 block">
          Category
        </span>
        <h1 className="text-4xl font-bold">{category.categoryName || category.title}</h1>
      </div>

      {/* Category's Posts */}
      <h2 className="text-2xl font-bold mb-8 border-b pb-4">
        Latest in {category.categoryName || category.title}
      </h2>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col"
            >
              {post.blogMainImage &&
                typeof post.blogMainImage === 'object' &&
                post.blogMainImage.url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={post.blogMainImage.url}
                      alt={post.blogTitle || 'Blog image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              <div className="p-6 flex-1 flex flex-col">
                <Link href={`/blog/post/${post.slug}`}>
                  <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition">
                    {post.blogTitle || post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{post.blogExcerpt}</p>
                <div className="text-xs text-gray-400 mt-auto">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 py-12 text-center bg-gray-50 rounded-xl border">
          No posts have been published in this category yet.
        </div>
      )}
    </div>
  )
}
