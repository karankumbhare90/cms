import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  
  const page = result.docs[0]
  if (!page) return {}
  
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || '',
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
      pageType: {
        not_equals: 'home', // 'home' is handled by the root page.tsx
      },
    },
    limit: 1,
  })

  const page = result.docs[0]
  
  if (!page) {
    return notFound()
  }

  return (
    <div className="pt-20"> {/* Add padding for fixed header */}
      {/* If it has a banner, we could render a Banner component here. For now, rely on layout blocks */}
      <RenderBlocks blocks={page.layout as any[]} />
    </div>
  )
}
