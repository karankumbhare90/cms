import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: {
      pageType: {
        equals: 'home',
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

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: {
      pageType: {
        equals: 'home',
      },
    },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to SilverPoint</h1>
          <p className="text-xl">Please set up a Home Page in the Payload Admin panel.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {' '}
      {/* Add padding for fixed header */}
      <RenderBlocks blocks={page.layout as any[]} />
    </div>
  )
}
