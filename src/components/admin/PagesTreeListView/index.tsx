'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'

interface PageTreeNode {
  id: string
  title: string
  slug: string
  pageType?: string
  parent?: string | null
  updatedAt?: string
  _status?: string
  children: PageTreeNode[]
}

export const PagesTreeListView: React.FC = () => {
  const [tree, setTree] = useState<PageTreeNode[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({})

  const fetchTree = async () => {
    try {
      const res = await fetch('/api/page-tree')
      if (res.ok) {
        const data = await res.json()
        setTree(data.tree || [])
        // Default expand all nodes with children
        const initialExpanded: Record<string, boolean> = {}
        const markExpanded = (nodes: PageTreeNode[]) => {
          nodes.forEach((node) => {
            if (node.children && node.children.length > 0) {
              initialExpanded[node.id] = true
              markExpanded(node.children)
            }
          })
        }
        markExpanded(data.tree || [])
        setExpandedNodes(initialExpanded)
      }
    } catch (err) {
      console.error('Failed to load page tree:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTree()
  }, [])

  // Hide the default flat table and native table controls
  useEffect(() => {
    const tableContainer =
      (document.querySelector('.collection-list__table') as HTMLElement) ||
      (document.querySelector('.table') as HTMLElement) ||
      (document.querySelector('table')?.closest('div') as HTMLElement)

    const listControls =
      (document.querySelector('.collection-list__controls') as HTMLElement) ||
      (document.querySelector('.list-controls') as HTMLElement)

    if (tableContainer) tableContainer.style.display = 'none'
    if (listControls) listControls.style.display = 'none'

    return () => {
      if (tableContainer) tableContainer.style.display = ''
      if (listControls) listControls.style.display = ''
    }
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {}
    const recurse = (nodes: PageTreeNode[]) => {
      nodes.forEach((node) => {
        allExpanded[node.id] = true
        if (node.children) recurse(node.children)
      })
    }
    recurse(tree)
    setExpandedNodes(allExpanded)
  }

  const collapseAll = () => {
    setExpandedNodes({})
  }

  // Filter tree based on search query
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return tree

    const q = searchQuery.toLowerCase()

    const filterNodes = (nodes: PageTreeNode[]): PageTreeNode[] => {
      return nodes
        .map((node) => {
          const matchSelf =
            node.title.toLowerCase().includes(q) || node.slug.toLowerCase().includes(q)
          const filteredChildren = filterNodes(node.children || [])

          if (matchSelf || filteredChildren.length > 0) {
            return {
              ...node,
              children: filteredChildren,
            }
          }
          return null
        })
        .filter(Boolean) as PageTreeNode[]
    }

    return filterNodes(tree)
  }, [tree, searchQuery])

  const getPageTypeBadge = (pageType?: string) => {
    switch (pageType) {
      case 'home':
        return { label: 'Home Page', bg: '#2563EB', color: '#fff' }
      case 'blog-landing':
        return { label: 'Blog Landing', bg: '#7C3AED', color: '#fff' }
      case 'blog-detail':
        return { label: 'Blog Detail', bg: '#059669', color: '#fff' }
      default:
        return {
          label: 'Page',
          bg: 'var(--theme-elevation-200, #334155)',
          color: 'var(--theme-elevation-800, #cbd5e1)',
        }
    }
  }

  const renderTreeRows = (nodes: PageTreeNode[], depth = 0, parentPath = '') => {
    return nodes.map((node) => {
      const hasChildren = node.children && node.children.length > 0
      const isExpanded = expandedNodes[node.id] ?? false
      const fullPath = node.slug === '/' ? '/' : `${parentPath}/${node.slug}`.replace(/\/+/g, '/')
      const badge = getPageTypeBadge(node.pageType)

      return (
        <React.Fragment key={node.id}>
          <div
            className="payload-tree-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              borderBottom: '1px solid var(--theme-elevation-100, rgba(255, 255, 255, 0.06))',
              backgroundColor: 'var(--theme-elevation-50, transparent)',
              transition: 'background-color 0.15s ease',
              gap: '12px',
            }}
          >
            {/* Indentation guide lines & Expand Chevron */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: `${depth * 28}px`,
                position: 'relative',
                minWidth: '24px',
              }}
            >
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggleExpand(node.id)}
                  style={{
                    background: 'var(--theme-elevation-150, rgba(255, 255, 255, 0.08))',
                    border: '1px solid var(--theme-elevation-200, rgba(255, 255, 255, 0.12))',
                    borderRadius: '4px',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'inherit',
                    padding: 0,
                    marginRight: '6px',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s ease',
                  }}
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ) : (
                <div style={{ width: '22px', height: '22px', marginRight: '6px' }} />
              )}
            </div>

            {/* Icon + Title (Click to Edit) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flex: '1 1 280px',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--theme-elevation-150, rgba(255, 255, 255, 0.06))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: node.pageType === 'home' ? '#2563EB' : 'inherit',
                }}
              >
                {node.pageType === 'home' ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ) : hasChildren ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                )}
              </div>

              <div style={{ minWidth: 0 }}>
                <Link
                  href={`/admin/collections/pages/${node.id}`}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  className="payload-tree-title-link"
                >
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {node.title}
                  </span>
                  {hasChildren && (
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '1px 6px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--theme-elevation-200, rgba(255, 255, 255, 0.1))',
                        color: 'var(--theme-elevation-600, #94a3b8)',
                        fontWeight: 500,
                      }}
                    >
                      {node.children.length} {node.children.length === 1 ? 'subpage' : 'subpages'}
                    </span>
                  )}
                </Link>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--theme-elevation-500, #64748b)',
                    marginTop: '2px',
                    fontFamily: 'monospace',
                  }}
                >
                  {fullPath}
                </div>
              </div>
            </div>

            {/* Badges Column */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: badge.bg,
                  color: badge.color,
                }}
              >
                {badge.label}
              </span>
            </div>

            {/* Actions Column */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: 'auto',
                flexShrink: 0,
              }}
            >
              <Link
                href={`/admin/collections/pages/create?parent=${node.id}`}
                title={`Add child page under "${node.title}"`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 9px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'inherit',
                  textDecoration: 'none',
                  backgroundColor: 'var(--theme-elevation-150, rgba(255, 255, 255, 0.06))',
                  border: '1px solid var(--theme-elevation-200, rgba(255, 255, 255, 0.1))',
                  transition: 'background-color 0.15s ease',
                }}
                className="payload-tree-btn"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Subpage
              </Link>

              <Link
                href={`/admin/collections/pages/${node.id}`}
                title="Edit this page"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#fff',
                  textDecoration: 'none',
                  backgroundColor: '#2563EB',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
                Edit
              </Link>

              <a
                href={fullPath}
                target="_blank"
                rel="noopener noreferrer"
                title="View on live website"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '5px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'var(--theme-elevation-500, #94a3b8)',
                  textDecoration: 'none',
                  border: '1px solid var(--theme-elevation-200, rgba(255, 255, 255, 0.1))',
                }}
                className="payload-tree-btn"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Children Rows */}
          {hasChildren && isExpanded && renderTreeRows(node.children, depth + 1, fullPath)}
        </React.Fragment>
      )
    })
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <style>{`
        /* Permanently hide Payload default flat table and search filter inputs */
        .collection-list__table,
        .table,
        .collection-list__controls,
        .list-controls {
          display: none !important;
        }
        .payload-tree-row:hover {
          background-color: var(--theme-elevation-100, rgba(255, 255, 255, 0.04)) !important;
        }
        .payload-tree-title-link:hover span {
          color: #2563EB;
        }
        .payload-tree-btn:hover {
          background-color: var(--theme-elevation-250, rgba(255, 255, 255, 0.15)) !important;
          color: #fff !important;
        }
      `}</style>

      {/* Toolbar without table view option */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '16px',
          padding: '12px 16px',
          backgroundColor: 'var(--theme-elevation-50, rgba(255, 255, 255, 0.03))',
          border: '1px solid var(--theme-elevation-150, rgba(255, 255, 255, 0.08))',
          borderRadius: '8px',
        }}
      >
        {/* Left: Title Badge & Page Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M21 12H3m6 6H3m18-12H3" />
              <polyline points="7 6 10 12 7 18" />
            </svg>
            HIERARCHICAL PAGE TREE
          </span>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: 'var(--theme-elevation-150, rgba(255, 255, 255, 0.08))',
              color: 'var(--theme-elevation-600, #94a3b8)',
            }}
          >
            {tree.length} Root Sections
          </span>
        </div>

        {/* Right: Search + Expand/Collapse Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search pages in tree..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '6px 10px 6px 30px',
                borderRadius: '5px',
                border: '1px solid var(--theme-elevation-200, rgba(255, 255, 255, 0.12))',
                backgroundColor: 'var(--theme-elevation-100, rgba(0, 0, 0, 0.2))',
                color: 'inherit',
                fontSize: '13px',
                width: '210px',
              }}
            />
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.5,
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <button
            type="button"
            onClick={expandAll}
            style={{
              padding: '6px 10px',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: 'var(--theme-elevation-100, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--theme-elevation-200, rgba(255, 255, 255, 0.1))',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            Expand All
          </button>

          <button
            type="button"
            onClick={collapseAll}
            style={{
              padding: '6px 10px',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: 'var(--theme-elevation-100, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--theme-elevation-200, rgba(255, 255, 255, 0.1))',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            Collapse All
          </button>

          <Link
            href="/admin/collections/pages/create"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: '#2563EB',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create New Page
          </Link>
        </div>
      </div>

      {/* Hierarchical Tree Container */}
      <div
        style={{
          border: '1px solid var(--theme-elevation-150, rgba(255, 255, 255, 0.1))',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'var(--theme-elevation-50, rgba(255, 255, 255, 0.02))',
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 16px',
            backgroundColor: 'var(--theme-elevation-100, rgba(255, 255, 255, 0.05))',
            borderBottom: '1px solid var(--theme-elevation-200, rgba(255, 255, 255, 0.1))',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--theme-elevation-500, #94a3b8)',
          }}
        >
          <span style={{ minWidth: '40px' }} />
          <span style={{ flex: '1 1 280px' }}>PAGE HIERARCHY & TITLE</span>
          <span style={{ minWidth: '100px' }}>TYPE</span>
          <span style={{ marginLeft: 'auto' }}>ACTIONS</span>
        </div>

        {/* Tree Rows */}
        {loading ? (
          <div
            style={{
              padding: '36px',
              textAlign: 'center',
              color: 'var(--theme-elevation-400, #94a3b8)',
              fontSize: '14px',
            }}
          >
            Loading hierarchical page tree...
          </div>
        ) : filteredTree.length === 0 ? (
          <div
            style={{
              padding: '36px',
              textAlign: 'center',
              color: 'var(--theme-elevation-400, #94a3b8)',
              fontSize: '14px',
            }}
          >
            {searchQuery ? `No pages found matching "${searchQuery}".` : 'No pages created yet.'}
          </div>
        ) : (
          renderTreeRows(filteredTree)
        )}
      </div>
    </div>
  )
}
