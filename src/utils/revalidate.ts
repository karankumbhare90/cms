import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Safely purge a Next.js cache tag immediately.
 * Gracefully ignores errors when executed outside Next.js request context (e.g. CLI, scripts).
 */
export function revalidateTagSafe(tag: string) {
  try {
    revalidateTag(tag, { expire: 0 })
  } catch {
    // Expected when running outside Next.js request context
  }
}

/**
 * Safely purge a Next.js path or layout immediately.
 */
export function revalidatePathSafe(path: string, type?: 'layout' | 'page') {
  try {
    revalidatePath(path, type)
  } catch {
    // Expected when running outside Next.js request context
  }
}

/**
 * Revalidates cache when a Page document is created, updated, or deleted in backoffice.
 */
export function revalidatePage(doc: any, previousDoc?: any) {
  try {
    // Invalidate general pages cache
    revalidateTagSafe('pages')

    // If home page was updated
    if (doc?.pageType === 'home' || previousDoc?.pageType === 'home') {
      revalidateTagSafe('home-page')
      revalidatePathSafe('/')
    }

    // Invalidate specific page slug
    if (doc?.slug) {
      revalidateTagSafe(`page-${doc.slug}`)
      revalidatePathSafe(`/${doc.slug}`)
    }

    // If slug changed, invalidate previous slug as well
    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
      revalidateTagSafe(`page-${previousDoc.slug}`)
      revalidatePathSafe(`/${previousDoc.slug}`)
    }

    // Navigation links dynamic pages, invalidate navigation & globals
    revalidateTagSafe('navigation')
    revalidateTagSafe('globals')

    // Purge the root layout so all pages regenerate with fresh layout & blocks
    revalidatePathSafe('/', 'layout')
  } catch {
    // Ignore
  }
}

/**
 * Revalidates cache when Media is uploaded, changed, or deleted in backoffice.
 */
export function revalidateMedia() {
  try {
    revalidateTagSafe('pages')
    revalidateTagSafe('home-page')
    revalidateTagSafe('globals')
    revalidateTagSafe('site-settings')
    revalidateTagSafe('navigation')
    revalidateTagSafe('footer')
    revalidateTagSafe('posts')
    revalidatePathSafe('/', 'layout')
  } catch {
    // Ignore
  }
}

/**
 * Revalidates cache when a Post document is changed or deleted.
 */
export function revalidatePost(doc?: any, previousDoc?: any) {
  try {
    revalidateTagSafe('posts')
    revalidateTagSafe('pages')
    if (doc?.slug) {
      revalidatePathSafe(`/[slug]/post/${doc.slug}`, 'page')
    }
    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
      revalidatePathSafe(`/[slug]/post/${previousDoc.slug}`, 'page')
    }
    revalidatePathSafe('/', 'layout')
  } catch {
    // Ignore
  }
}

/**
 * Revalidates cache when Global settings (Navigation, Footer, SiteSettings, BlogSettings) are updated.
 */
export function revalidateGlobal(slug: string) {
  try {
    revalidateTagSafe(slug)
    revalidateTagSafe('globals')

    if (slug === 'site-settings') {
      revalidateTagSafe('site-settings')
      revalidateTagSafe('home-page')
      revalidateTagSafe('pages')
    }

    if (slug === 'navigation') {
      revalidateTagSafe('navigation')
      revalidateTagSafe('pages')
    }

    if (slug === 'footer') {
      revalidateTagSafe('footer')
    }

    if (slug === 'blog-settings') {
      revalidateTagSafe('blog-settings')
      revalidateTagSafe('posts')
    }

    revalidatePathSafe('/', 'layout')
  } catch {
    // Ignore
  }
}

/**
 * Revalidates cache when Author is changed or deleted.
 */
export function revalidateAuthor(doc?: any) {
  try {
    revalidateTagSafe('posts')
    revalidateTagSafe('pages')
    if (doc?.slug) {
      revalidatePathSafe(`/authors/${doc.slug}`, 'page')
    }
    revalidatePathSafe('/', 'layout')
  } catch {
    // Ignore
  }
}

/**
 * Revalidates cache when Category is changed or deleted.
 */
export function revalidateCategory(doc?: any) {
  try {
    revalidateTagSafe('posts')
    revalidateTagSafe('pages')
    if (doc?.slug) {
      revalidatePathSafe(`/categories/${doc.slug}`, 'page')
    }
    revalidatePathSafe('/', 'layout')
  } catch {
    // Ignore
  }
}
