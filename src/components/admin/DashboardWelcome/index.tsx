'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface PageTreeNode {
  id: string
  title: string
  slug: string
  pageType?: string
}

export const DashboardWelcome: React.FC = () => {
  const [homePageId, setHomePageId] = useState<string | null>(null)
  const [pageCount, setPageCount] = useState<number>(0)
  const [guideOpen, setGuideOpen] = useState(false)

  useEffect(() => {
    fetch('/api/page-tree')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.tree) {
          setPageCount(data.total || data.tree.length)
          const home = data.tree.find(
            (p: PageTreeNode) => p.pageType === 'home' || p.slug === '/' || p.slug === 'home',
          )
          if (home) {
            setHomePageId(home.id)
          } else if (data.tree[0]) {
            setHomePageId(data.tree[0].id)
          }
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div style={{ marginBottom: '28px', fontFamily: 'inherit' }}>
      <style>{`
        .quick-action-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .quick-action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          border-color: #2563EB !important;
        }
      `}</style>

      {/* ── 1. WELCOME HERO BANNER ─────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(30, 64, 175, 0.05) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.25)',
          borderRadius: '12px',
          padding: '24px 28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '22px' }}>👋</span>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--theme-elevation-900, #fff)',
                margin: 0,
              }}
            >
              Welcome to Your Website Manager
            </h1>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--theme-elevation-600, #94a3b8)',
              margin: 0,
              maxWidth: '650px',
              lineHeight: 1.5,
            }}
          >
            Manage all your pages, services, articles, contact details, and images without touching any code. Everything updates on your live site instantly when published.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#2563EB',
              color: '#fff',
              padding: '9px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            }}
          >
            <span>🌐</span>
            <span>View Live Website</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── 2. QUICK ACTIONS SECTION ───────────────────────────────── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--theme-elevation-500, #94a3b8)',
              margin: 0,
            }}
          >
            QUICK ACTIONS
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--theme-elevation-400, #64748b)' }}>
            1-Click shortcuts for common tasks
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px',
          }}
        >
          {/* Card 1: Edit Homepage */}
          <Link
            href={homePageId ? `/admin/collections/pages/${homePageId}` : '/admin/collections/pages'}
            className="quick-action-card"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: 'var(--theme-elevation-50, rgba(255, 255, 255, 0.03))',
              border: '1px solid var(--theme-elevation-150, rgba(255, 255, 255, 0.08))',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                color: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              }}
            >
              🏠
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--theme-elevation-900, #fff)', marginBottom: '3px' }}>
                Edit Homepage
              </div>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500, #94a3b8)', lineHeight: 1.4 }}>
                Change your hero banner, headlines, and main homepage sections.
              </div>
            </div>
          </Link>

          {/* Card 2: Create New Page */}
          <Link
            href="/admin/collections/pages/create"
            className="quick-action-card"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: 'var(--theme-elevation-50, rgba(255, 255, 255, 0.03))',
              border: '1px solid var(--theme-elevation-150, rgba(255, 255, 255, 0.08))',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              }}
            >
              📄
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--theme-elevation-900, #fff)', marginBottom: '3px' }}>
                Create New Page
              </div>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500, #94a3b8)', lineHeight: 1.4 }}>
                Add a new service page, about page, or subpage to your site tree.
              </div>
            </div>
          </Link>

          {/* Card 3: Write Blog Post */}
          <Link
            href="/admin/collections/posts/create"
            className="quick-action-card"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: 'var(--theme-elevation-50, rgba(255, 255, 255, 0.03))',
              border: '1px solid var(--theme-elevation-150, rgba(255, 255, 255, 0.08))',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                color: '#8B5CF6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              }}
            >
              ✍️
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--theme-elevation-900, #fff)', marginBottom: '3px' }}>
                Write Blog Article
              </div>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500, #94a3b8)', lineHeight: 1.4 }}>
                Publish business updates, tutorials, or industry news to attract leads.
              </div>
            </div>
          </Link>

          {/* Card 4: Business Contact & Logo Settings */}
          <Link
            href="/admin/globals/site-settings"
            className="quick-action-card"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: 'var(--theme-elevation-50, rgba(255, 255, 255, 0.03))',
              border: '1px solid var(--theme-elevation-150, rgba(255, 255, 255, 0.08))',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              }}
            >
              ⚙️
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--theme-elevation-900, #fff)', marginBottom: '3px' }}>
                Business Info & Logo
              </div>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500, #94a3b8)', lineHeight: 1.4 }}>
                Update your phone number, email, address, logo, and social links.
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ── 3. COLLAPSIBLE "HOW TO USE THIS CMS" GUIDE ────────────────── */}
      <div
        style={{
          border: '1px solid var(--theme-elevation-150, rgba(255, 255, 255, 0.08))',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'var(--theme-elevation-50, rgba(255, 255, 255, 0.02))',
        }}
      >
        <div
          onClick={() => setGuideOpen(!guideOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📖</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--theme-elevation-900, #fff)' }}>
              2-Minute Guide: How to Edit Your Website
            </span>
          </div>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--theme-elevation-500, #94a3b8)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{guideOpen ? 'Hide Guide' : 'Show Guide'}</span>
            <span
              style={{
                display: 'inline-block',
                transform: guideOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              ▾
            </span>
          </span>
        </div>

        {guideOpen && (
          <div
            style={{
              padding: '0 18px 18px 18px',
              borderTop: '1px solid var(--theme-elevation-100, rgba(255, 255, 255, 0.05))',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              paddingTop: '14px',
            }}
          >
            <div style={{ backgroundColor: 'var(--theme-elevation-100, rgba(255, 255, 255, 0.03))', padding: '12px', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#3B82F6', marginBottom: '4px' }}>
                1. Edit Any Page
              </div>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-600, #94a3b8)', lineHeight: 1.5 }}>
                Click any page name in the <strong>Content Tree</strong> on the left sidebar. You can edit headlines, paragraph text, buttons, and images directly.
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--theme-elevation-100, rgba(255, 255, 255, 0.03))', padding: '12px', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#10B981', marginBottom: '4px' }}>
                2. Add New Subpages
              </div>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-600, #94a3b8)', lineHeight: 1.5 }}>
                Hover over any parent (like <em>Our Services</em>) and click the small <strong>+</strong> icon to create a subpage under that section automatically.
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--theme-elevation-100, rgba(255, 255, 255, 0.03))', padding: '12px', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#8B5CF6', marginBottom: '4px' }}>
                3. Best Image Sizes
              </div>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-600, #94a3b8)', lineHeight: 1.5 }}>
                • <strong>Hero banners:</strong> 1920 × 1080px<br />
                • <strong>Card images:</strong> 800 × 600px<br />
                • <strong>Logos & Icons:</strong> SVG or transparent PNG<br />
                Keep files under 2MB for ultra-fast loading!
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--theme-elevation-100, rgba(255, 255, 255, 0.03))', padding: '12px', borderRadius: '6px' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#F59E0B', marginBottom: '4px' }}>
                4. Save & Publish
              </div>
              <div style={{ fontSize: '12px', color: 'var(--theme-elevation-600, #94a3b8)', lineHeight: 1.5 }}>
                Click the blue <strong>Publish</strong> button at the top right to make changes live immediately. You can also preview on the live site anytime.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
