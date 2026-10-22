'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FaRedo,
  FaHome,
  FaEnvelope,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
  FaLaptopCode,
  FaBookOpen,
  FaArrowRight,
} from 'react-icons/fa'
import { SITE_NAME } from '@/config/site'

interface ErrorViewProps {
  error?: Error & { digest?: string }
  reset?: () => void
}

const quickLinks = [
  {
    title: 'Homepage',
    description: `Return to the ${SITE_NAME} home page and explore our main digital agency services.`,
    href: '/',
    icon: FaHome,
    badge: 'Overview',
  },
  {
    title: 'Our Services',
    description: 'Custom website development, speed optimization, and CMS architecture.',
    href: '/services',
    icon: FaLaptopCode,
    badge: 'Capabilities',
  },
  {
    title: 'Blog & Articles',
    description: 'Discover practical development guides, industry best practices, and redesign tips.',
    href: '/blogs',
    icon: FaBookOpen,
    badge: 'Insights',
  },
  {
    title: 'Contact Support',
    description: 'Report an issue or discuss a problem with our technical support team.',
    href: '/contact-us',
    icon: FaEnvelope,
    badge: 'Support',
  },
]

export const ErrorView: React.FC<ErrorViewProps> = ({ error, reset }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleRetry = () => {
    if (reset) {
      reset()
    } else {
      window.location.reload()
    }
  }

  return (
    <div
      className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden pb-20 px-4"
      style={{ paddingTop: 'calc(var(--header-height, 72px) + 3rem)' }}
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl -z-10"
      />

      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/60 text-red-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs"
        >
          <FaExclamationTriangle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
          <span>Error 500 &bull; Internal Server Error</span>
        </motion.div>

        {/* Big 500 Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative inline-block mb-4"
        >
          <span className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter bg-gradient-to-r from-red-600 via-amber-500 to-orange-500 bg-clip-text text-transparent select-none leading-none drop-shadow-sm">
            500
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-red-600/5 select-none leading-none blur-2xl"
          >
            500
          </span>
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0C1E33] tracking-tight mb-4"
        >
          Something went wrong on our server.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          We encountered an unexpected issue while processing your request. Our technical team has been notified. Please try refreshing or return to the homepage.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
        >
          <button
            onClick={handleRetry}
            className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaRedo className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-sm sm:text-base border border-gray-200 shadow-xs hover:border-gray-300 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaHome className="w-4 h-4 text-gray-600" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-sm sm:text-base border border-gray-200 shadow-xs hover:border-gray-300 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaEnvelope className="w-4 h-4 text-gray-600" />
            <span>Report Issue</span>
          </Link>
        </motion.div>

        {/* Optional Collapsible Technical Details for debugging */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="max-w-2xl mx-auto mb-16 text-left"
          >
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition mx-auto block mb-3"
            >
              <span>{showDetails ? 'Hide technical details' : 'View technical details'}</span>
              {showDetails ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
            </button>

            {showDetails && (
              <div className="bg-gray-900 text-gray-200 text-xs font-mono p-4 rounded-xl border border-gray-800 overflow-x-auto shadow-inner">
                {error.digest && (
                  <p className="text-amber-400 mb-2">
                    <span className="font-bold text-gray-400">Digest:</span> {error.digest}
                  </p>
                )}
                <p className="text-red-400 whitespace-pre-wrap">
                  <span className="font-bold text-gray-400">Error:</span> {error.message || 'Internal server execution error'}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Popular Destinations Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-left pt-10 border-t border-gray-200/70"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 text-center mb-6">
            Helpful Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative p-5 bg-white hover:bg-gray-50 rounded-2xl border border-gray-200/70 hover:border-gray-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#0C1E33] text-gray-700 group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400 group-hover:text-[#0C1E33] transition-colors">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0C1E33] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mt-4 group-hover:translate-x-1 transition-transform">
                    <span>Visit</span>
                    <FaArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
