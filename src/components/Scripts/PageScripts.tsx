'use client'

import React, { useEffect } from 'react'
import parse from 'html-react-parser'

export interface PageScriptsProps {
  scripts?: {
    headScript?: string | null
    bodyScript?: string | null
  } | null
}

/**
 * Binds page-specific head and body scripts.
 * Injects and executes scripts on client-side navigation, cleans up on unmount,
 * and renders SSR HTML for search engine crawlers and initial load.
 */
export const PageScripts: React.FC<PageScriptsProps> = ({ scripts }) => {
  const headScript = scripts?.headScript?.trim()
  const bodyScript = scripts?.bodyScript?.trim()

  useEffect(() => {
    // Clean up any previously injected page scripts
    document.querySelectorAll('[data-cms-page-script="true"]').forEach((el) => el.remove())

    const injectScripts = (content: string, target: HTMLElement, location: 'head' | 'body') => {
      if (!content) return

      if (!content.startsWith('<')) {
        // Raw JavaScript
        const script = document.createElement('script')
        script.setAttribute('data-cms-page-script', 'true')
        script.setAttribute('data-cms-location', location)
        script.textContent = content
        target.appendChild(script)
        return
      }

      // Parse HTML string to find scripts and elements
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')

      // Re-create script elements so the browser executes them dynamically
      doc.querySelectorAll('script').forEach((oldScript) => {
        const newScript = document.createElement('script')
        newScript.setAttribute('data-cms-page-script', 'true')
        newScript.setAttribute('data-cms-location', location)
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value)
        })
        newScript.textContent = oldScript.textContent
        target.appendChild(newScript)
      })

      // Append any non-script elements (meta tags, noscript, tracking pixels, styles)
      const allElements = Array.from(doc.head.children).concat(Array.from(doc.body.children))
      allElements.forEach((el) => {
        if (el.tagName.toLowerCase() !== 'script') {
          el.setAttribute('data-cms-page-script', 'true')
          el.setAttribute('data-cms-location', location)
          target.appendChild(el)
        }
      })
    }

    if (headScript) {
      injectScripts(headScript, document.head, 'head')
    }

    if (bodyScript) {
      injectScripts(bodyScript, document.body, 'body')
    }

    return () => {
      document.querySelectorAll('[data-cms-page-script="true"]').forEach((el) => el.remove())
    }
  }, [headScript, bodyScript])

  if (!headScript && !bodyScript) return null

  // Server-side rendering (SSR) fallback for initial HTML crawlers
  return (
    <div
      className="cms-page-scripts"
      style={{ display: 'none' }}
      aria-hidden="true"
      suppressHydrationWarning
    >
      {headScript && (
        !headScript.startsWith('<') ? (
          <script dangerouslySetInnerHTML={{ __html: headScript }} />
        ) : (
          parse(headScript)
        )
      )}
      {bodyScript && (
        !bodyScript.startsWith('<') ? (
          <script dangerouslySetInnerHTML={{ __html: bodyScript }} />
        ) : (
          parse(bodyScript)
        )
      )}
    </div>
  )
}
