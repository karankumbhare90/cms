import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { getThemeClass } from '@/utils/theme'

export const Sitemap: React.FC<any> = async ({ settings }) => {
  const themeClass = getThemeClass(settings)
  const payload = await getPayload({ config })
  
  const pagesData = await payload.find({
    collection: 'pages',
    limit: 1000,
    depth: 1, // to get parent references if needed
  })

  // Optionally filter published pages if draft mode is off
  const pages = pagesData.docs.filter(
    (page: any) =>
      page._status === 'published' &&
      page.navigation?.hideFromSitemap !== true
  )

  // A helper function to build a tree out of a flat list of pages
  const buildTree = (items: any[], parentId: string | null = null) => {
    return items
      .filter((item) => {
        const itemParentId = typeof item.parent === 'object' && item.parent !== null ? item.parent.id : item.parent
        return itemParentId === parentId || (!parentId && !itemParentId)
      })
      .map((item) => ({
        ...item,
        children: buildTree(items, item.id),
      }))
  }

  const pageTree = buildTree(pages)

  const renderPages = (tree: any[]) => {
    if (!tree || tree.length === 0) return null
    return (
      <ul className="pl-6 mt-2 space-y-2 border-l border-gray-300 dark:border-gray-700">
        {tree.map((page) => (
          <li key={page.id} className="pt-2">
            <Link
              href={page.slug === '/' ? '/' : `/${page.slug}`}
              className="text-lg font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              {page.title}
            </Link>
            {page.children && page.children.length > 0 && renderPages(page.children)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className={`w-full py-16 md:py-24 ${themeClass}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Sitemap</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 dark:border-gray-700">
          {renderPages(pageTree)}
        </div>
      </div>
    </section>
  )
}
