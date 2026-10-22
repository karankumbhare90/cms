'use client'

import React from 'react'
import { SITE_NAME } from '@/config/site'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#F8FAFC', color: '#0C1E33' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '520px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', fontSize: '12px', fontWeight: 600, marginBottom: '20px' }}>
              <span>Fatal System Error</span>
            </div>
            <h1 style={{ fontSize: '72px', margin: '0 0 12px', fontWeight: 900, color: '#DC2626', lineHeight: 1 }}>500</h1>
            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px' }}>Something went critically wrong</h2>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, margin: '0 0 28px' }}>
              We encountered an unrecoverable application error. Please try reloading the page or returning home.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => reset()}
                style={{ cursor: 'pointer', padding: '12px 24px', backgroundColor: '#DC2626', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, transition: 'background-color 0.2s' }}
              >
                Reload Application
              </button>
              <a
                href="/"
                style={{ display: 'inline-block', textDecoration: 'none', padding: '12px 24px', backgroundColor: '#F1F5F9', color: '#0F172A', borderRadius: '10px', fontSize: '14px', fontWeight: 600 }}
              >
                Return to {SITE_NAME}
              </a>
            </div>
            {error?.digest && (
              <p style={{ marginTop: '24px', fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>
                Error Digest: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
