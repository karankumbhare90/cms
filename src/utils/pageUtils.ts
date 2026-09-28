export type BreadcrumbItem = {
  label: string
  href: string
}

/**
 * Walks up the populated `parent` chain on a Payload page document
 * and returns the full path, e.g. /services/web-design
 */
export function buildPagePath(page: any): string {
  if (!page || typeof page !== 'object') return '#'

  const pageObj = page.value || page
  if (!pageObj || typeof pageObj !== 'object' || !pageObj.slug) return '#'

  if (pageObj.pageType === 'home') return '/'

  const segments: string[] = []
  let current: any = pageObj
  while (current && typeof current === 'object' && current.slug) {
    if (current.pageType === 'home') break
    segments.unshift(current.slug)
    current = current.parent
  }

  return '/' + segments.join('/')
}

/**
 * Builds breadcrumbs array starting from Home down through parent ancestors to the current page.
 * Format: Home -> Parent Page (if exists) -> Current Page
 */
export function buildBreadcrumbs(page: any, currentTitleOverride?: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

  if (!page || typeof page !== 'object') {
    if (currentTitleOverride) {
      crumbs.push({ label: currentTitleOverride, href: '#' })
    }
    return crumbs
  }

  const pageObj = page.value || page

  // If home page itself
  if (pageObj.pageType === 'home') {
    if (currentTitleOverride && currentTitleOverride !== 'Home') {
      crumbs.push({ label: currentTitleOverride, href: '#' })
    }
    return crumbs
  }

  // Collect parent chain from immediate parent up to root parent
  const ancestors: any[] = []
  let currentParent = pageObj.parent

  while (currentParent && typeof currentParent === 'object' && currentParent.slug) {
    if (currentParent.pageType !== 'home') {
      ancestors.unshift(currentParent)
    }
    currentParent = currentParent.parent
  }

  // Add each parent ancestor to crumbs
  ancestors.forEach((ancestor) => {
    const label = ancestor.banner?.pageTitle || ancestor.title || ancestor.slug
    const href = buildPagePath(ancestor)
    crumbs.push({ label, href })
  })

  // Add current page as final item
  const currentLabel =
    currentTitleOverride ||
    pageObj.banner?.pageTitle ||
    pageObj.title ||
    pageObj.slug ||
    'Current Page'

  crumbs.push({ label: currentLabel, href: '#' })

  return crumbs
}

/**
 * Builds breadcrumbs for a blog post detail page.
 * Format: Home -> [Parent Page Ancestors of landing page] -> Landing Page -> Post Title
 */
export function buildPostBreadcrumbs(
  parentPage: any,
  parentSlugFallback: string,
  postTitle: string
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

  if (parentPage && typeof parentPage === 'object') {
    const ancestors: any[] = []
    let currentParent = parentPage.parent

    while (currentParent && typeof currentParent === 'object' && currentParent.slug) {
      if (currentParent.pageType !== 'home') {
        ancestors.unshift(currentParent)
      }
      currentParent = currentParent.parent
    }

    ancestors.forEach((ancestor) => {
      const label = ancestor.banner?.pageTitle || ancestor.title || ancestor.slug
      const href = buildPagePath(ancestor)
      crumbs.push({ label, href })
    })

    const parentLabel = parentPage.banner?.pageTitle || parentPage.title || parentPage.slug
    const parentHref = buildPagePath(parentPage)
    crumbs.push({ label: parentLabel, href: parentHref })
  } else if (parentSlugFallback) {
    const label = parentSlugFallback.charAt(0).toUpperCase() + parentSlugFallback.slice(1)
    crumbs.push({ label, href: `/${parentSlugFallback}` })
  }

  crumbs.push({ label: postTitle || 'Post', href: '#' })

  return crumbs
}
