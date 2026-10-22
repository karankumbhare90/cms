'use client'

import React, { useEffect } from 'react'
import { ErrorView } from '@/components/ErrorPages/ErrorView'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error('Frontend Runtime Error:', error)
  }, [error])

  return <ErrorView error={error} reset={reset} />
}
