import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export interface PageTreeNode {
  id: string
  title: string
  slug: string
  pageType?: string
  parent?: string | null
  updatedAt?: string
  _status?: string
  children: PageTreeNode[]
}

export async function GET() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const pagesRes = await payload.find({
      collection: 'pages',
      limit: 500,
      depth: 1,
      sort: 'title',
    })

    const allPages = pagesRes.docs

    const pageMap = new Map<string, PageTreeNode>()

    allPages.forEach((p: any) => {
      const parentId =
        typeof p.parent === 'object' && p.parent !== null
          ? p.parent.id
          : typeof p.parent === 'string'
            ? p.parent
            : null

      pageMap.set(p.id, {
        id: p.id,
        title: p.title || 'Untitled',
        slug: p.slug || '',
        pageType: p.pageType || 'page',
        parent: parentId,
        updatedAt: p.updatedAt,
        _status: p._status || 'published',
        children: [],
      })
    })

    const rootNodes: PageTreeNode[] = []

    pageMap.forEach((node) => {
      if (node.parent && pageMap.has(node.parent)) {
        pageMap.get(node.parent)!.children.push(node)
      } else {
        rootNodes.push(node)
      }
    })

    // Sort function: Home page first, then alphabetical, children sorted alphabetical
    const sortTree = (nodes: PageTreeNode[]) => {
      nodes.sort((a, b) => {
        if (a.pageType === 'home' || a.slug === '/' || a.slug === 'home') return -1
        if (b.pageType === 'home' || b.slug === '/' || b.slug === 'home') return 1
        return (a.title || '').localeCompare(b.title || '')
      })
      nodes.forEach((n) => {
        if (n.children && n.children.length > 0) {
          sortTree(n.children)
        }
      })
    }

    sortTree(rootNodes)

    return NextResponse.json({
      tree: rootNodes,
      total: allPages.length,
    })
  } catch (error: any) {
    console.error('Error fetching page tree:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch page tree' },
      { status: 500 },
    )
  }
}
