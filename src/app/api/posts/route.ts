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
    const rawPage = parseInt(searchParams.get('page') || '1', 10)
    const rawLimit = parseInt(searchParams.get('limit') || '10', 10)
    const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage
    const limit = isNaN(rawLimit) || rawLimit < 1 ? 10 : Math.min(rawLimit, 100)
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
        totalPages: postsResult.totalPages || 1,
        page: postsResult.page || page,
        totalDocs: postsResult.totalDocs || 0,
        hasNextPage: postsResult.hasNextPage ?? false,
        hasPrevPage: postsResult.hasPrevPage ?? false,
      },
      {
        headers: {
          ...SECURITY_HEADERS,
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
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
