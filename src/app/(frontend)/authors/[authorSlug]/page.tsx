import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getSiteSettingsCached } from '@/utils/cachedData'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ authorSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { authorSlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const authorResult = await payload.find({
    collection: 'authors',
    limit: 1,
    where: {
      slug: {
        equals: authorSlug,
      },
    },
  })

  const author = authorResult.docs[0]
  const siteSettings = await getSiteSettingsCached()
  const fallbackDescription =
    siteSettings?.metaDescription ||
    siteSettings?.description ||
    'Professional CMS and Web Development Solutions for modern digital experiences.'

  if (!author) {
    return {
      description: fallbackDescription,
    }
  }

  const name = author.authorName || author.title || 'Author'

  return {
    title: `${name} | Author Profile`,
    description: `Read published articles and insights by ${name}. ${fallbackDescription}`,
  }
}

export default async function AuthorDetailPage({ params }: Props) {
  const { authorSlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch Author
  const authorResult = await payload.find({
    collection: 'authors',
    limit: 1,
    where: {
      slug: {
        equals: authorSlug,
      },
    },
  })

  const author = authorResult.docs[0]
  if (!author) return notFound()

  // Fetch Author's Posts
  const postsResult = await payload.find({
    collection: 'posts',
    limit: 20,
    where: {
      author: {
        equals: author.id,
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
      {/* Author Profile Header */}
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
        {author.authorImage && typeof author.authorImage === 'object' && author.authorImage.url ? (
          <div className="relative w-40 h-40 flex-shrink-0">
            <Image
              src={author.authorImage.url}
              alt={author.authorName || 'Author'}
              fill
              className="object-cover rounded-full shadow-md"
            />
          </div>
        ) : (
          <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-4xl text-gray-400">👤</span>
          </div>
        )}

        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl font-bold mb-4">{author.authorName || author.title}</h1>

          {author.authorDesignation && (
            <div className="text-lg text-gray-600 mb-6 prose max-w-none">
              <RichText data={author.authorDesignation} />
            </div>
          )}

          {(author as any).socialMediaLinks && (author as any).socialMediaLinks.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {(author as any).socialMediaLinks.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.socialMediaUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                >
                  {link.socialMediaPlatform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Author's Posts */}
      <h2 className="text-3xl font-bold mb-8">Posts by {author.authorName || author.title}</h2>

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
          This author hasn't published any posts yet.
        </div>
      )}
    </div>
  )
}
