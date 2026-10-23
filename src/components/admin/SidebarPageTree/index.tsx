'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export const SidebarPageTree: React.FC = () => {
  const [tree, setTree] = useState<PageTreeNode[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(true)
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({})
  const pathname = usePathname()

  const fetchTree = async () => {
    try {
      const res = await fetch('/api/page-tree')
      if (res.ok) {
        const data = await res.json()
        setTree(data.tree || [])
        // Default expand top-level nodes that have children
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
      console.error('Failed to load sidebar page tree:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTree()
  }, [])

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const getNodeIcon = (node: PageTreeNode) => {
    if (node.pageType === 'home' || node.slug === '/' || node.slug === 'home') {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.85 }}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    }
    if (node.children && node.children.length > 0) {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.85 }}>
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      )
    }
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.75 }}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }

  const renderTreeNodes = (nodes: PageTreeNode[], depth = 0) => {
    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {nodes.map((node) => {
          const hasChildren = node.children && node.children.length > 0
          const isExpanded = expandedNodes[node.id] ?? false
          const isActive = pathname?.includes(`/admin/collections/pages/${node.id}`)

          return (
            <li key={node.id} style={{ margin: '1px 0' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: `4px 8px 4px ${depth * 14 + 6}px`,
                  borderRadius: '4px',
                  backgroundColor: isActive ? 'var(--theme-elevation-150, rgba(255, 255, 255, 0.08))' : 'transparent',
                  color: isActive ? 'var(--theme-elevation-900, #fff)' : 'inherit',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '13px',
                  transition: 'background-color 0.15s ease',
                  position: 'relative',
                }}
                className="payload-tree-sidebar-item"
              >
                {/* Expand / Collapse Caret */}
                <span
                  onClick={(e) => hasChildren && toggleExpand(node.id, e)}
                  style={{
                    width: '16px',
                    height: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: hasChildren ? 'pointer' : 'default',
                    opacity: hasChildren ? 0.75 : 0,
                    marginRight: '3px',
                    userSelect: 'none',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s ease',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>

                {/* Node Link with Icon */}
                <Link
                  href={`/admin/collections/pages/${node.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'inherit',
                    textDecoration: 'none',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={node.title}
                >
                  {getNodeIcon(node)}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {node.title}
                  </span>
                </Link>

                {/* Quick Add Child Button */}
                <Link
                  href={`/admin/collections/pages/create?parent=${node.id}`}
                  onClick={(e) => e.stopPropagation()}
                  title={`Add subpage under "${node.title}"`}
                  className="payload-tree-add-btn"
                  style={{
                    opacity: 0,
                    padding: '2px 4px',
                    borderRadius: '3px',
                    color: 'inherit',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </Link>
              </div>

              {/* Recursive Children */}
              {hasChildren && isExpanded && (
                <div style={{ position: 'relative' }}>
                  {renderTreeNodes(node.children, depth + 1)}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div
      style={{
        margin: '12px 0 16px 0',
        padding: '0 4px',
        borderTop: '1px solid var(--theme-elevation-100, rgba(255, 255, 255, 0.08))',
        paddingTop: '12px',
      }}
    >
      <style>{`
        .payload-tree-sidebar-item:hover {
          background-color: var(--theme-elevation-100, rgba(255, 255, 255, 0.05));
        }
        .payload-tree-sidebar-item:hover .payload-tree-add-btn {
          opacity: 0.8 !important;
        }
        .payload-tree-sidebar-item:hover .payload-tree-add-btn:hover {
          opacity: 1 !important;
          background-color: var(--theme-elevation-200, rgba(255, 255, 255, 0.15));
        }
      `}</style>

      {/* Header with Umbraco style toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '6px 8px',
          borderRadius: '4px',
          userSelect: 'none',
          marginBottom: isOpen ? '4px' : '0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--theme-elevation-400, #94a3b8)',
            }}
          >
            CONTENT TREE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Link
            href="/admin/collections/pages/create"
            onClick={(e) => e.stopPropagation()}
            title="Create new root page"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px 4px',
              borderRadius: '3px',
              color: 'var(--theme-elevation-500, #94a3b8)',
              textDecoration: 'none',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Link>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
              color: 'var(--theme-elevation-400, #94a3b8)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      {/* Body */}
      {isOpen && (
        <div style={{ maxHeight: '420px', overflowY: 'auto', overflowX: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '8px', fontSize: '12px', color: 'var(--theme-elevation-400, #888)' }}>
              Loading content tree...
            </div>
          ) : tree.length === 0 ? (
            <div style={{ padding: '8px', fontSize: '12px', color: 'var(--theme-elevation-400, #888)' }}>
              No pages found.
            </div>
          ) : (
            renderTreeNodes(tree)
          )}
        </div>
      )}
    </div>
  )
}
