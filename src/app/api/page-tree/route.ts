import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePage } from '@/utils/revalidate'

export const dynamic = 'force-dynamic'

export interface PageTreeNode {
  id: string
  title: string
  slug: string
  pageType?: string
  parent?: string | null
  sortOrder?: number
  updatedAt?: string
  _status?: string
  children: PageTreeNode[]
}

export async function GET(req: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const { searchParams } = new URL(req.url)
    const sortBy = searchParams.get('sortBy') || 'sortOrder' // 'sortOrder' | 'title' | 'updatedAt'

    const pagesRes = await payload.find({
      collection: 'pages',
      limit: 1000,
      depth: 1,
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
        sortOrder: typeof p.sortOrder === 'number' ? p.sortOrder : 0,
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

    // Tree sorting
    const sortTree = (nodes: PageTreeNode[]) => {
      nodes.sort((a, b) => {
        // Home page always first
        if (a.pageType === 'home' || a.slug === '/' || a.slug === 'home') return -1
        if (b.pageType === 'home' || b.slug === '/' || b.slug === 'home') return 1

        if (sortBy === 'title') {
          return (a.title || '').localeCompare(b.title || '')
        }

        if (sortBy === 'updatedAt') {
          return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
        }

        // Default 'sortOrder': numerical ascending, then alphabetical fallback
        const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : 9999
        const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : 9999
        if (orderA !== orderB) {
          return orderA - orderB
        }

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
      sortBy,
    })
  } catch (error: any) {
    console.error('Error fetching page tree:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch page tree' },
      { status: 500 },
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, sortOrder, moveDirection } = body

    if (!id) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 })
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const currentPage = await payload.findByID({
      collection: 'pages',
      id,
    })

    if (!currentPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    // Direct manual sortOrder assignment
    if (typeof sortOrder === 'number') {
      const updated = await payload.update({
        collection: 'pages',
        id,
        data: { sortOrder },
      })
      revalidatePage(updated, currentPage)
      return NextResponse.json({ success: true, updated })
    }

    // Relative Move Up / Move Down
    if (moveDirection === 'up' || moveDirection === 'down') {
      const parentId =
        typeof currentPage.parent === 'object' && currentPage.parent !== null
          ? currentPage.parent.id
          : currentPage.parent || null

      const siblingsRes = await payload.find({
        collection: 'pages',
        limit: 1000,
        where: parentId
          ? { parent: { equals: parentId } }
          : { or: [{ parent: { exists: false } }, { parent: { equals: null } }] },
      })

      // Exclude homepage from shifting
      const siblings = siblingsRes.docs.filter(
        (p: any) => p.pageType !== 'home' && p.slug !== '/' && p.slug !== 'home',
      )

      siblings.sort((a: any, b: any) => {
        const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : 9999
        const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : 9999
        if (orderA !== orderB) return orderA - orderB
        return (a.title || '').localeCompare(b.title || '')
      })

      const currentIndex = siblings.findIndex((p: any) => p.id === id)

      if (currentIndex !== -1) {
        const targetIndex = moveDirection === 'up' ? currentIndex - 1 : currentIndex + 1

        if (targetIndex >= 0 && targetIndex < siblings.length) {
          const targetSibling = siblings[targetIndex]

          // Re-index siblings with clean consecutive integers so swapping is deterministic
          for (let i = 0; i < siblings.length; i++) {
            let assignOrder = (i + 1) * 10
            if (i === currentIndex) {
              assignOrder = (targetIndex + 1) * 10 + (moveDirection === 'up' ? -5 : 5)
            }
            await payload.update({
              collection: 'pages',
              id: siblings[i].id,
              data: { sortOrder: assignOrder },
            })
          }

          revalidatePage(currentPage)
          return NextResponse.json({ success: true })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error reordering page tree:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to reorder page tree' },
      { status: 500 },
    )
  }
}
