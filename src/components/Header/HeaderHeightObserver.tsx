'use client'

import React, { useEffect, useRef } from 'react'

export function HeaderHeightObserver() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = ref.current?.closest('header')
    if (!header) return

    const updateHeight = () => {
      const height = header.getBoundingClientRect().height
      document.documentElement.style.setProperty('--header-height', `${height}px`)
    }

    // Initial setup
    updateHeight()

    // Observe changes in header size
    const resizeObserver = new ResizeObserver(() => {
      updateHeight()
    })

    resizeObserver.observe(header)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return <div ref={ref} className="hidden" aria-hidden="true" />
}
