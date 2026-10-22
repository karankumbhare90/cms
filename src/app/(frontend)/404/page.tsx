import React from 'react'
import type { Metadata } from 'next'
import { NotFoundView } from '@/components/ErrorPages/NotFoundView'
import { SITE_NAME } from '@/config/site'

export const metadata: Metadata = {
  title: `404 - Page Not Found | ${SITE_NAME}`,
  description: `The page you are looking for does not exist on ${SITE_NAME}.`,
  robots: {
    index: false,
    follow: true,
  },
}

export default function Page404() {
  return <NotFoundView />
}
