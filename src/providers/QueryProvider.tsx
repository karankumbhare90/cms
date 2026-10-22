'use client'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'

function SafeQueryProvider({ children }: { children: React.ReactNode }) {
  let hasClient = false
  try {
    const client = useQueryClient()
    if (client) hasClient = true
  } catch {
    hasClient = false
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes cache stale time
            gcTime: 1000 * 60 * 30, // 30 minutes garbage collection time
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  )

  if (hasClient) {
    return <>{children}</>
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <SafeQueryProvider>{children}</SafeQueryProvider>
}
