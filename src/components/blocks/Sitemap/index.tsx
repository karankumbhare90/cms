import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { getThemeClass } from '@/utils/theme'

const F = 'Inter, sans-serif'

function NodeRow({ node, depth }: { node: any; depth: number }) {
  const indent = depth * 32
  const to = node.slug === '/' || node.slug === 'home' ? '/' : `/${node.slug}`
  const label = node.navigation?.navTitle || node.title

  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <div className="relative flex items-center" style={{ paddingLeft: indent }}>
        {depth > 0 && (
          <>
            {/* Vertical connector from parent */}
            <div
              className="absolute"
              style={{
                left: indent - 20,
                top: 0,
                bottom: hasChildren ? '50%' : 0,
                width: 1,
                background: '#BFDBFE',
              }}
            />
            {/* Horizontal connector to dot */}
            <div
              className="absolute"
              style={{
                left: indent - 20,
                top: '50%',
                width: 14,
                height: 1,
                background: '#BFDBFE',
              }}
            />
          </>
        )}
        {/* Dot */}
        <div
          className="shrink-0 rounded-full border-2 border-white z-10"
          style={{
            width: depth === 0 ? 12 : depth === 1 ? 10 : 8,
            height: depth === 0 ? 12 : depth === 1 ? 10 : 8,
            background: depth === 0 ? '#1E40AF' : depth === 1 ? '#2563EB' : '#60a5fa',
            marginRight: 10,
            boxShadow: '0 0 0 2px white',
          }}
        />
        <Link
          href={to}
          className="transition-colors hover:text-[#2563EB]"
          style={{
            fontSize: depth === 0 ? 18 : depth === 1 ? 15 : 13,
            fontWeight: depth === 0 ? 800 : depth === 1 ? 600 : 500,
            color: depth === 0 ? '#0C1E33' : depth === 1 ? '#1E3A5F' : '#374151',
            fontFamily: F,
          }}
        >
          {label}
        </Link>
      </div>

      {hasChildren && (
        <div className="relative" style={{ paddingLeft: indent + 6 }}>
          {/* Vertical line connecting children */}
          <div
            className="absolute"
            style={{
              left: indent + 6,
              top: 0,
              bottom: 0,
              width: 1,
              background: '#BFDBFE',
            }}
          />
          <div className="flex flex-col" style={{ gap: 14, paddingTop: 14, paddingBottom: 4 }}>
            {node.children.map((child: any) => (
              <NodeRow key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const Sitemap: React.FC<any> = async ({ settings }) => {
  const themeClass = getThemeClass(settings)
  const payload = await getPayload({ config })

  const pagesData = await payload.find({
    collection: 'pages',
    limit: 1000,
    depth: 1, // to get parent references if needed
  })

  // Optionally filter published pages if draft mode is off
  const pages = pagesData.docs.filter((page: any) => {
    const isPublished = page._status ? page._status === 'published' : true
    return isPublished && page.navigation?.hideFromSitemap !== true
  })

  // A helper function to build a tree out of a flat list of pages
  const buildTree = (items: any[], parentId: string | null = null): any[] => {
    return items
      .filter((item) => {
        const itemParentId =
          typeof item.parent === 'object' && item.parent !== null ? item.parent.id : item.parent
        return itemParentId === parentId || (!parentId && !itemParentId)
      })
      .map((item) => ({
        ...item,
        children: buildTree(items, item.id),
      }))
  }

  const pageTree = buildTree(pages)

  return (
    <section className={`sitemap ${themeClass}`}>
      <div className="inner-wrap" style={{ fontFamily: F }}>
        <div className="container">
          <div className="w-full">
            <div className="flex flex-col" style={{ gap: 0 }}>
              {pageTree.map((node) => (
                <NodeRow key={node.id} node={node} depth={0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
