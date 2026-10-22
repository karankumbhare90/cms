import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SITE_NAME } from '@/config/site'

export interface DynamicFAQ {
  question: string
  answer: string
}

export interface DynamicPageInfo {
  title: string
  slug: string
  path: string
  pageType: string
  description?: string
  faqs?: DynamicFAQ[]
  keyHeadings?: string[]
}

export interface DynamicPostInfo {
  title: string
  slug: string
  path: string
  category?: string
  author?: string
  excerpt?: string
  updatedAt?: string
}

export interface DynamicNavigationLink {
  label: string
  path: string
  subLinks?: { label: string; path: string }[]
}

export interface DynamicSiteChatContext {
  siteName: string
  siteDescription: string
  contact: {
    email?: string
    phone?: string
    address?: string
  }
  navigation: DynamicNavigationLink[]
  pages: DynamicPageInfo[]
  posts: DynamicPostInfo[]
  totalPosts: number
  blogPrefix: string
}

/**
 * Recursively extract plain text from Lexical richText nodes or strings
 */
export function extractLexicalText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node.trim()
  if (typeof node.text === 'string') return node.text.trim()
  if (Array.isArray(node.children)) {
    return node.children
      .map(extractLexicalText)
      .filter(Boolean)
      .join(' ')
      .trim()
  }
  if (node.root && node.root.children) {
    return extractLexicalText(node.root)
  }
  return ''
}

/**
 * Extract summary information and FAQs from page widgets/blocks
 */
function extractPageBlockDetails(widgets: any[]): {
  faqs: DynamicFAQ[]
  keyHeadings: string[]
} {
  const faqs: DynamicFAQ[] = []
  const keyHeadings: string[] = []

  if (!Array.isArray(widgets)) {
    return { faqs, keyHeadings }
  }

  for (const block of widgets) {
    if (!block) continue

    // Extract headings from introText or block headers
    if (block.introText?.heading && typeof block.introText.heading === 'string') {
      keyHeadings.push(block.introText.heading.trim())
    } else if (block.heading && typeof block.heading === 'string') {
      keyHeadings.push(block.heading.trim())
    }

    // Extract FAQs if present
    if (block.blockType === 'faq' && Array.isArray(block.faqs)) {
      for (const item of block.faqs) {
        if (item?.question) {
          const ansText = extractLexicalText(item.answer)
          faqs.push({
            question: item.question.trim(),
            answer: ansText || '',
          })
        }
      }
    }
  }

  return { faqs, keyHeadings }
}

/**
 * Fetch 100% dynamic CMS data from Payload (SiteSettings, Navigation, Pages, Posts)
 * Cached with tags: ['posts', 'pages', 'site-settings', 'navigation', 'globals']
 * This automatically purges whenever CMS editors publish or update any page, post, or setting.
 */
export const getChatSiteContextCached = unstable_cache(
  async (): Promise<DynamicSiteChatContext> => {
    try {
      const payloadConfig = await config
      const payload = await getPayload({ config: payloadConfig })

      // 1. Fetch SiteSettings Global
      let siteName = SITE_NAME
      let siteDescription = ''
      let contactEmail = ''
      let contactPhone = ''
      let contactAddress = ''

      try {
        const siteSettings: any = await payload.findGlobal({
          slug: 'site-settings',
          depth: 1,
        })
        if (siteSettings) {
          if (siteSettings.siteName) siteName = siteSettings.siteName
          if (siteSettings.description) siteDescription = siteSettings.description
          if (siteSettings.email) contactEmail = siteSettings.email
          if (siteSettings.phone) contactPhone = siteSettings.phone
          if (siteSettings.address) contactAddress = siteSettings.address
        }
      } catch (err) {
        console.warn('[ChatContext] Failed to load site-settings global:', err)
      }

      // 2. Fetch Pages Collection
      const pagesRes = await payload.find({
        collection: 'pages',
        limit: 100,
        depth: 1,
      })

      // Determine dynamic blog landing prefix
      const blogLandingPage = pagesRes.docs.find(
        (p: any) => p.pageType === 'blog-landing' && (!p._status || p._status === 'published'),
      )
      const blogPrefix = blogLandingPage?.slug ? `/${blogLandingPage.slug}` : '/blogs'

      const publishedPages: DynamicPageInfo[] = pagesRes.docs
        .filter((p: any) => !p._status || p._status === 'published')
        .map((p: any) => {
          const slug = p.slug === 'home' || p.slug === '/' ? '' : p.slug
          const path = slug ? `/${slug}` : '/'

          const bannerDesc =
            p.banner?.pageDescription ||
            p.seo?.meta?.description ||
            (p.banner?.pageTitle ? `Page: ${p.banner.pageTitle}` : undefined)

          const { faqs, keyHeadings } = extractPageBlockDetails(p.widgets || [])

          return {
            title: p.title || p.banner?.pageTitle || slug || 'Untitled Page',
            slug: p.slug,
            path,
            pageType: p.pageType || 'page',
            description: bannerDesc,
            faqs: faqs.length > 0 ? faqs : undefined,
            keyHeadings: keyHeadings.length > 0 ? keyHeadings : undefined,
          }
        })

      // 3. Fetch Navigation Global
      const dynamicNav: DynamicNavigationLink[] = []
      try {
        const navGlobal: any = await payload.findGlobal({
          slug: 'navigation',
          depth: 2,
        })

        if (Array.isArray(navGlobal?.links)) {
          for (const link of navGlobal.links) {
            let linkPath = ''
            if (link.type === 'reference' && link.reference) {
              const refSlug = typeof link.reference === 'object' ? link.reference.slug : ''
              linkPath = refSlug === 'home' || refSlug === '/' ? '/' : `/${refSlug}`
            } else if (link.url) {
              linkPath = link.url
            }

            const subLinks: { label: string; path: string }[] = []
            if (Array.isArray(link.subLinks)) {
              for (const sub of link.subLinks) {
                let subPath = ''
                if (sub.type === 'reference' && sub.reference) {
                  const refSlug = typeof sub.reference === 'object' ? sub.reference.slug : ''
                  subPath = refSlug === 'home' || refSlug === '/' ? '/' : `/${refSlug}`
                } else if (sub.url) {
                  subPath = sub.url
                }
                if (sub.label && subPath) {
                  subLinks.push({ label: sub.label, path: subPath })
                }
              }
            }

            if (link.label) {
              dynamicNav.push({
                label: link.label,
                path: linkPath || '#',
                subLinks: subLinks.length > 0 ? subLinks : undefined,
              })
            }
          }
        }
      } catch (err) {
        console.warn('[ChatContext] Failed to load navigation global:', err)
      }

      // 4. Fetch Posts Collection (All Published Blogs)
      const postsRes = await payload.find({
        collection: 'posts',
        limit: 100,
        sort: '-createdAt',
        depth: 1,
      })

      const publishedPosts: DynamicPostInfo[] = postsRes.docs
        .filter((p: any) => !p._status || p._status === 'published')
        .map((p: any) => {
          let categoryName: string | undefined
          if (typeof p.category === 'object' && p.category !== null) {
            categoryName = p.category.title || p.category.name
          }

          let authorName: string | undefined
          if (typeof p.author === 'object' && p.author !== null) {
            authorName = p.author.name || p.author.title
          }

          return {
            title: p.title || p.blogTitle || 'Untitled Blog Post',
            slug: p.slug,
            path: `${blogPrefix}/post/${p.slug}`,
            category: categoryName,
            author: authorName,
            excerpt: p.blogExcerpt || undefined,
            updatedAt: p.updatedAt,
          }
        })

      return {
        siteName,
        siteDescription:
          siteDescription ||
          `${siteName} is a modern digital agency specializing in website design, development, CMS solutions, and SEO optimization.`,
        contact: {
          email: contactEmail || undefined,
          phone: contactPhone || undefined,
          address: contactAddress || undefined,
        },
        navigation: dynamicNav,
        pages: publishedPages,
        posts: publishedPosts,
        totalPosts: publishedPosts.length,
        blogPrefix,
      }
    } catch (error) {
      console.error('[ChatContext] Error loading dynamic CMS info:', error)
      return {
        siteName: SITE_NAME,
        siteDescription:
          `${SITE_NAME} is a digital agency creating fast, user-friendly, and SEO-friendly websites.`,
        contact: {},
        navigation: [],
        pages: [],
        posts: [],
        totalPosts: 0,
        blogPrefix: '/blogs',
      }
    }
  },
  ['dynamic-cms-chat-context'],
  {
    revalidate: 60,
    tags: ['posts', 'pages', 'site-settings', 'navigation', 'globals'],
  },
)

/**
 * Build rich system prompt directly from the dynamic CMS data
 */
export function buildChatSystemPrompt(ctx: DynamicSiteChatContext): string {
  // Navigation structure
  const navTree =
    ctx.navigation.length > 0
      ? ctx.navigation
          .map((n) => {
            if (n.subLinks && n.subLinks.length > 0) {
              const subs = n.subLinks.map((s) => `  * ${s.label}: [${s.label}](${s.path})`).join('\n')
              return `- **${n.label}**:\n${subs}`
            }
            return `- [${n.label}](${n.path})`
          })
          .join('\n')
      : 'Navigation loaded dynamically from CMS.'

  // Dynamic Pages List with descriptions & FAQs
  const pagesList =
    ctx.pages.length > 0
      ? ctx.pages
          .map((p) => {
            let details = `- [${p.title}](${p.path}) (Slug: /${p.slug || ''})`
            if (p.description) details += `\n  Summary: ${p.description}`
            if (p.keyHeadings && p.keyHeadings.length > 0) {
              details += `\n  Key Topics: ${p.keyHeadings.slice(0, 3).join(', ')}`
            }
            if (p.faqs && p.faqs.length > 0) {
              const faqSnippet = p.faqs
                .slice(0, 2)
                .map((f) => `    * Q: ${f.question} -> A: ${f.answer}`)
                .join('\n')
              details += `\n  Page FAQs:\n${faqSnippet}`
            }
            return details
          })
          .join('\n')
      : 'Pages loaded dynamically from CMS.'

  // Dynamic Blog Posts Catalog
  const postsList =
    ctx.posts.length > 0
      ? ctx.posts
          .map(
            (p, idx) =>
              `${idx + 1}. [${p.title}](${p.path})${
                p.category ? ` (Category: ${p.category})` : ''
              }${p.author ? ` (Author: ${p.author})` : ''}${
                p.excerpt ? `\n   Summary: ${p.excerpt}` : ''
              }`,
          )
          .join('\n')
      : 'No published blog posts found currently in the CMS.'

  // Contact details if provided in CMS
  const contactLines: string[] = []
  if (ctx.contact.email) contactLines.push(`- Email: ${ctx.contact.email}`)
  if (ctx.contact.phone) contactLines.push(`- Phone: ${ctx.contact.phone}`)
  if (ctx.contact.address) contactLines.push(`- Address: ${ctx.contact.address}`)

  const contactSection =
    contactLines.length > 0
      ? `### CMS Contact Information\n${contactLines.join('\n')}\n`
      : ''

  return `You are the official AI Assistant for ${ctx.siteName}.

### Live Ground Truth from CMS (Updated dynamically from Database)
- **Website/Agency**: ${ctx.siteName}
- **Description**: ${ctx.siteDescription}
- **Total Published Blog Posts in CMS**: Exactly ${ctx.totalPosts} published articles.
- **Blog Section Path**: ${ctx.blogPrefix}
${contactSection}
### Dynamic Navigation & Services Menu (from CMS):
${navTree}

### Published Pages in CMS (${ctx.pages.length} pages):
${pagesList}

### Published Blog Articles in CMS (${ctx.totalPosts} posts):
${postsList}

### Core Answering Instructions
1. **Dynamic Knowledge First**:
   - Always rely on the live CMS information above. You know the exact number of published blog posts (${ctx.totalPosts}), all page URLs, services, and summaries directly from the database.
   - When asked "blogs", "total no of blogs", "how many blogs", or "articles", state that there are currently **${ctx.totalPosts} published blog posts**, list relevant articles by topic, and provide clickable markdown links like [Article Title](${ctx.blogPrefix}/post/slug).
   - Never say you don't have access to the database or post counts.

2. **Services & Navigation Queries**:
   - Use the dynamic navigation menu and published pages to present ${ctx.siteName}'s actual services and pages.
   - For services or custom projects, recommend visiting the [Contact page](/contact-us) or requesting a free quote.

3. **Tone & Formatting**:
   - Speak as an enthusiastic, knowledgeable, professional member of the ${ctx.siteName} team.
   - Use clear bullet points and bold highlights for readability.
   - Format all links as standard markdown: [Label](url) so the chat interface can render them as clickable links.

4. **Scope**:
   - Keep answers centered around ${ctx.siteName}, our services, web design, CMS, SEO, performance, and published blog topics.
   - If a question is off-topic, warmly guide the visitor back to how we can help with their website.
`
}
