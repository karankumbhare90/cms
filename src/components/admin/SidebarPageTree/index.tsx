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

interface NavSectionItem {
  label: string
  href: string
  createHref?: string
  icon: React.ReactNode
}

interface NavSection {
  id: string
  title: string
  createHref?: string
  items: NavSectionItem[]
}

export const SidebarPageTree: React.FC = () => {
  const [tree, setTree] = useState<PageTreeNode[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Section collapse states (all default open)
  const [sectionsOpen, setSectionsOpen] = useState<Record<string, boolean>>({
    contentTree: true,
    collections: true,
    blogs: true,
    settings: true,
  })

  // Tree nodes collapse states
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({})

  const toggleSection = (sectionKey: string) => {
    setSectionsOpen((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }))
  }

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

  const getPageIcon = (node: PageTreeNode) => {
    if (node.pageType === 'home' || node.slug === '/' || node.slug === 'home') {
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ flexShrink: 0, opacity: 0.85 }}
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    }
    if (node.children && node.children.length > 0) {
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ flexShrink: 0, opacity: 0.85 }}
        >
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      )
    }
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ flexShrink: 0, opacity: 0.75 }}
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }

  // Define sidebar sections with icons matching Content Tree
  const otherSections: NavSection[] = [
    {
      id: 'collections',
      title: 'COLLECTIONS',
      items: [
        {
          label: 'Media',
          href: '/admin/collections/media',
          createHref: '/admin/collections/media/create',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          ),
        },
        {
          label: 'Users',
          href: '/admin/collections/users',
          createHref: '/admin/collections/users/create',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
        },
      ],
    },
    {
      id: 'blogs',
      title: 'BLOGS',
      createHref: '/admin/collections/posts/create',
      items: [
        {
          label: 'Posts',
          href: '/admin/collections/posts',
          createHref: '/admin/collections/posts/create',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          ),
        },
        {
          label: 'Authors',
          href: '/admin/collections/authors',
          createHref: '/admin/collections/authors/create',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ),
        },
        {
          label: 'Categories',
          href: '/admin/collections/categories',
          createHref: '/admin/collections/categories/create',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          ),
        },
        {
          label: 'Blog Settings',
          href: '/admin/globals/blog-settings',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          ),
        },
      ],
    },
    {
      id: 'settings',
      title: 'SETTINGS',
      items: [
        {
          label: 'Site Settings',
          href: '/admin/globals/site-settings',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          ),
        },
        {
          label: 'Navigation',
          href: '/admin/globals/navigation',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          ),
        },
        {
          label: 'Footer',
          href: '/admin/globals/footer',
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          ),
        },
      ],
    },
  ]

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
                  backgroundColor: isActive
                    ? 'var(--theme-elevation-150, rgba(255, 255, 255, 0.08))'
                    : 'transparent',
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
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                  {getPageIcon(node)}
                  <span
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
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
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
    <div style={{ margin: '8px 0', padding: '0 4px' }}>
      <style>{`
        /* Hide Payload's default unstyled plain nav groups so our unified tree-styled navigation takes over */
        .nav__wrap > .nav-group,
        .nav__wrap > [class*="nav-group"] {
          display: none !important;
        }
        .payload-tree-sidebar-item:hover {
          background-color: var(--theme-elevation-100, rgba(255, 255, 255, 0.05)) !important;
        }
        .payload-tree-sidebar-item:hover .payload-tree-add-btn {
          opacity: 0.8 !important;
        }
        .payload-tree-sidebar-item:hover .payload-tree-add-btn:hover {
          opacity: 1 !important;
          background-color: var(--theme-elevation-200, rgba(255, 255, 255, 0.15)) !important;
        }
      `}</style>

      {/* ── SECTION 1: CONTENT TREE (PAGES HIERARCHY) ───────────────── */}
      <div style={{ marginBottom: '16px' }}>
        <div
          onClick={() => toggleSection('contentTree')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: '4px',
            userSelect: 'none',
            marginBottom: sectionsOpen.contentTree ? '4px' : '0',
          }}
        >
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
            </Link>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: sectionsOpen.contentTree ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.15s ease',
                color: 'var(--theme-elevation-400, #94a3b8)',
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
        </div>

        {sectionsOpen.contentTree && (
          <div>
            {loading ? (
              <div
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: 'var(--theme-elevation-400, #888)',
                }}
              >
                Loading content tree...
              </div>
            ) : tree.length === 0 ? (
              <div
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  color: 'var(--theme-elevation-400, #888)',
                }}
              >
                No pages found.
              </div>
            ) : (
              renderTreeNodes(tree)
            )}
          </div>
        )}
      </div>

      {/* ── SECTIONS 2, 3, 4: COLLECTIONS, BLOGS, SETTINGS (MATCHING CONTENT TREE STYLE) ── */}
      {otherSections.map((section) => {
        const isSectionOpen = sectionsOpen[section.id] ?? true

        return (
          <div
            key={section.id}
            style={{
              marginBottom: '16px',
              borderTop: '1px solid var(--theme-elevation-100, rgba(255, 255, 255, 0.06))',
              paddingTop: '12px',
            }}
          >
            {/* Section Header */}
            <div
              onClick={() => toggleSection(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '6px 8px',
                borderRadius: '4px',
                userSelect: 'none',
                marginBottom: isSectionOpen ? '4px' : '0',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--theme-elevation-400, #94a3b8)',
                }}
              >
                {section.title}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {section.createHref && (
                  <Link
                    href={section.createHref}
                    onClick={(e) => e.stopPropagation()}
                    title={`Create in ${section.title}`}
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
                  </Link>
                )}

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s ease',
                    color: 'var(--theme-elevation-400, #94a3b8)',
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
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Section Items */}
            {isSectionOpen && (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(`${item.href}/`)

                  return (
                    <li key={item.href} style={{ margin: '1px 0' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '5px 8px 5px 12px',
                          borderRadius: '4px',
                          backgroundColor: isActive
                            ? 'var(--theme-elevation-150, rgba(255, 255, 255, 0.08))'
                            : 'transparent',
                          color: isActive ? 'var(--theme-elevation-900, #fff)' : 'inherit',
                          fontWeight: isActive ? 600 : 400,
                          fontSize: '13px',
                          transition: 'background-color 0.15s ease',
                          position: 'relative',
                        }}
                        className="payload-tree-sidebar-item"
                      >
                        <Link
                          href={item.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'inherit',
                            textDecoration: 'none',
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span style={{ opacity: 0.8, display: 'inline-flex', alignItems: 'center' }}>
                            {item.icon}
                          </span>
                          <span
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.label}
                          </span>
                        </Link>

                        {/* Quick Add Button if available */}
                        {item.createHref && (
                          <Link
                            href={item.createHref}
                            onClick={(e) => e.stopPropagation()}
                            title={`Create new ${item.label}`}
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
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
