'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHome, FaCompass, FaEnvelope, FaBookOpen, FaLaptopCode, FaArrowRight } from 'react-icons/fa'
import { SITE_NAME } from '@/config/site'

const quickLinks = [
  {
    title: 'Homepage',
    description: `Explore ${SITE_NAME}'s modern digital solutions, portfolio, and agency overview.`,
    href: '/',
    icon: FaHome,
    badge: 'Overview',
  },
  {
    title: 'Our Services',
    description: 'Website design, custom development, CMS solutions, SEO, and speed optimization.',
    href: '/services',
    icon: FaLaptopCode,
    badge: 'Capabilities',
  },
  {
    title: 'Blog & Articles',
    description: 'Read practical guides, industry insights, and website redesign strategies.',
    href: '/blogs',
    icon: FaBookOpen,
    badge: 'Insights',
  },
  {
    title: 'Contact Us',
    description: 'Have a project in mind or need assistance? Reach out directly to our team.',
    href: '/contact-us',
    icon: FaEnvelope,
    badge: 'Get in Touch',
  },
]

export const NotFoundView: React.FC = () => {
  return (
    <div
      className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden pb-20 px-4"
      style={{ paddingTop: 'calc(var(--header-height, 72px) + 3rem)' }}
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -z-10"
      />

      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs"
        >
          <FaCompass className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '12s' }} />
          <span>Error 404 &bull; Page Not Found</span>
        </motion.div>

        {/* Big 404 Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative inline-block mb-4"
        >
          <span className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 bg-clip-text text-transparent select-none leading-none drop-shadow-sm">
            404
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-blue-600/5 select-none leading-none blur-2xl"
          >
            404
          </span>
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0C1E33] tracking-tight mb-4"
        >
          Oops! Looks like you&apos;ve wandered off track.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          The page you requested doesn&apos;t exist, was removed, or may have had its address changed. Let&apos;s get you back on course.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaHome className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-sm sm:text-base border border-gray-200 shadow-xs hover:border-gray-300 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaBookOpen className="w-4 h-4 text-blue-600" />
            <span>Browse All Blogs</span>
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-sm sm:text-base border border-gray-200 shadow-xs hover:border-gray-300 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaEnvelope className="w-4 h-4 text-blue-600" />
            <span>Contact Support</span>
          </Link>
        </motion.div>

        {/* Popular Destinations Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-left pt-10 border-t border-gray-200/70"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 text-center mb-6">
            Popular Destinations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative p-5 bg-white hover:bg-blue-50/40 rounded-2xl border border-gray-200/70 hover:border-blue-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400 group-hover:text-blue-600 transition-colors">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0C1E33] group-hover:text-blue-600 transition-colors mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mt-4 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
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
