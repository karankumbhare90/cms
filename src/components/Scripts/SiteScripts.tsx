import React from 'react'
import parse from 'html-react-parser'

interface ScriptProps {
  script?: string | null
}

/**
 * Renders global site head script inside <head>.
 * Supports raw JavaScript code or HTML tags (<script>, <meta>, <link>, etc.).
 */
export const SiteHeadScript: React.FC<ScriptProps> = ({ script }) => {
  if (!script || !script.trim()) return null
  const trimmed = script.trim()

  if (!trimmed.startsWith('<')) {
    return (
      <script
        id="cms-global-head-script"
        dangerouslySetInnerHTML={{ __html: trimmed }}
        suppressHydrationWarning
      />
    )
  }

  return (
    <React.Fragment key="cms-global-head-scripts">
      {parse(trimmed)}
    </React.Fragment>
  )
}

/**
 * Renders global site body script inside <body>.
 * Supports raw JavaScript code or HTML tags (e.g. GTM noscript iframe, tracking pixels).
 */
export const SiteBodyScript: React.FC<ScriptProps> = ({ script }) => {
  if (!script || !script.trim()) return null
  const trimmed = script.trim()

  if (!trimmed.startsWith('<')) {
    return (
      <script
        id="cms-global-body-script"
        dangerouslySetInnerHTML={{ __html: trimmed }}
        suppressHydrationWarning
      />
    )
  }

  return (
    <div
      id="cms-global-body-scripts"
      style={{ display: 'contents' }}
      aria-hidden="true"
      suppressHydrationWarning
    >
      {parse(trimmed)}
    </div>
  )
}
