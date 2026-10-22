/**
 * Global Site Configuration & Dynamic Branding
 * Single Source of Truth for site/brand name and metadata defaults.
 * Can be overridden via NEXT_PUBLIC_SITE_NAME environment variable
 * or dynamically in Payload CMS (Site Settings -> Site Name).
 */
export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ||
  process.env.SITE_NAME ||
  'WebNexa'

export const SITE_TAGLINE =
  process.env.NEXT_PUBLIC_SITE_TAGLINE ||
  'Digital Design & Development Agency'

export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  'We create fast, user-friendly, and SEO-friendly websites designed to build trust, showcase services, and generate more enquiries.'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  'https://webnexacms.vercel.app'

export const siteConfig = {
  name: SITE_NAME,
  tagline: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
}
