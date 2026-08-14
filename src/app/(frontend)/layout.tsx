import React from 'react'
import { Poppins } from 'next/font/google'
import './styles.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-family-base',
})

export const metadata = {
  description: 'Payload Next.js App',
  title: 'SilverPoint',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
