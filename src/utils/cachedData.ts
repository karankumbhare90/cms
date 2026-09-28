import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Fetch and cache site settings global object
 */
export const getSiteSettingsCached = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    return siteSettings
  },
  ['site-settings-global'],
  {
    revalidate: 600, // Cache for 10 minutes
    tags: ['site-settings', 'globals'],
  },
)

/**
 * Fetch and cache footer global object
 */
export const getFooterCached = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const footer = await payload.findGlobal({ slug: 'footer', depth: 3 })
    return footer
  },
  ['footer-global'],
  {
    revalidate: 600,
    tags: ['footer', 'globals'],
  },
)


/**
 * Fetch and cache full navigation tree with reference auto-linking
 */
export const getNavigationCached = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const navigation = await payload.findGlobal({ slug: 'navigation', depth: 3 })

    const allPagesRes = await payload.find({
      collection: 'pages',
      limit: 1000,
      depth: 2,
    })
    const allPages = allPagesRes.docs

    const attachChildren = (link: any) => {
      if (link.type === 'reference' && link.reference) {
        const pageObj = typeof link.reference === 'object' ? link.reference : null
        const pageId = pageObj ? pageObj.id : link.reference

        if (pageObj && pageObj.navigation?.navTitle) {
          link.label = pageObj.navigation.navTitle
        }

        const childPages = allPages.filter((p: any) => {
          const parentId =
            typeof p.parent === 'object' && p.parent !== null ? p.parent.id : p.parent
          return (
            parentId === pageId &&
            (p._status === 'published' || !p._status) &&
            p.navigation?.hideFromNavigation !== true &&
            p.navigation?.hideFromSitemap !== true
          )
        })

        if (childPages.length > 0) {
          const autoLinks = childPages.map((child: any) => {
            const newLink = {
              label: child.navigation?.navTitle || child.title,
              type: 'reference',
              reference: child,
              subLinks: [],
            }
            attachChildren(newLink)
            return newLink
          })
          link.subLinks = [...(link.subLinks || []), ...autoLinks]
        }
      }

      if (link.subLinks && link.subLinks.length > 0) {
        link.subLinks.forEach((subLink: any) => attachChildren(subLink))
      }
    }

    if (navigation.links) {
      navigation.links.forEach((link: any) => attachChildren(link))
    }

    return navigation
  },
  ['navigation-global'],
  {
    revalidate: 600, // Cache for 10 minutes
    tags: ['navigation', 'globals', 'pages'],
  },
)

/**
 * Fetch and cache home page document
 */
export const getHomePageCached = unstable_cache(
  async () => {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const result = await payload.find({
      collection: 'pages',
      where: {
        pageType: {
          equals: 'home',
        },
      },
      limit: 1,
    })
    return result.docs[0] || null
  },
  ['home-page-doc'],
  {
    revalidate: 600,
    tags: ['pages', 'home-page'],
  },
)

/**
 * Fetch and cache page by slug
 */
export async function getPageBySlugCached(slug: string) {
  return unstable_cache(
    async () => {
      const payloadConfig = await config
      const payload = await getPayload({ config: payloadConfig })
      const result = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: slug,
          },
          pageType: {
            not_equals: 'home',
          },
        },
        depth: 3,
        limit: 1,
      })
      return result.docs[0] || null
    },
    [`page-doc-${slug}`],
    {
      revalidate: 600,
      tags: ['pages', `page-${slug}`],
    },
  )()
}

/**
 * Fetch and cache nested page by slug segments
 */
export async function getNestedPageCached(slugSegments: string[]) {
  const cacheKey = `nested-page-${slugSegments.join('-')}`
  return unstable_cache(
    async () => {
      const payloadConfig = await config
      const payload = await getPayload({ config: payloadConfig })

      const lastSlug = slugSegments[slugSegments.length - 1]
      const parentSlug = slugSegments.length > 1 ? slugSegments[slugSegments.length - 2] : null

      const whereClause: Record<string, any> = {
        slug: { equals: lastSlug },
        pageType: { not_equals: 'home' },
      }

      if (parentSlug) {
        whereClause['parent.slug'] = { equals: parentSlug }
      }

      const result = await payload.find({
        collection: 'pages',
        where: whereClause,
        depth: 3,
        limit: 1,
      })

      return result.docs[0] || null
    },
    [cacheKey],
    {
      revalidate: 600,
      tags: ['pages', cacheKey],
    },
  )()
}
