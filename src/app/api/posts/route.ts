import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SECURITY_HEADERS } from '@/utils/security'
import { checkRateLimit, getClientIP } from '@/utils/rateLimit'

export async function GET(request: Request) {
  const clientIP = getClientIP(request)
  const rateLimit = checkRateLimit(`posts_${clientIP}`, { limit: 60, windowMs: 60 * 1000 })

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded.' },
      { status: 429, headers: SECURITY_HEADERS },
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const whereClause: Record<string, any> = {}

    if (category) {
      whereClause['category.slug'] = { equals: category }
    }

    if (search) {
      whereClause['or'] = [
        { title: { contains: search } },
        { blogTitle: { contains: search } },
        { blogExcerpt: { contains: search } },
      ]
    }

    const postsResult = await payload.find({
      collection: 'posts',
      where: Object.keys(whereClause).length ? whereClause : undefined,
      limit,
      page,
      sort: '-createdAt',
      depth: 2,
    })

    return NextResponse.json(
      {
        posts: postsResult.docs,
        totalPages: postsResult.totalPages,
        page: postsResult.page,
        totalDocs: postsResult.totalDocs,
        hasNextPage: postsResult.hasNextPage,
        hasPrevPage: postsResult.hasPrevPage,
      },
      {
        headers: {
          ...SECURITY_HEADERS,
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      },
    )
  } catch (error) {
    console.error('Error fetching posts in API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts.' },
      { status: 500, headers: SECURITY_HEADERS },
    )
  }
}
