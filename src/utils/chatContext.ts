import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

export interface ChatSiteContext {
  siteName: string
  siteDescription: string
  services: { title: string; slug: string; path: string }[]
  pages: { title: string; slug: string; path: string }[]
  posts: { title: string; slug: string; category?: string; excerpt?: string }[]
  totalPosts: number
  blogPrefix: string
}

/**
 * Fallback static knowledge if database query fails
 */
const DEFAULT_SITE_CONTEXT: ChatSiteContext = {
  siteName: 'WebNexa',
  siteDescription:
    'WebNexa is a modern digital design and web development agency crafting high-performance, SEO-optimized, and conversion-focused websites.',
  services: [
    { title: 'Web Design', slug: 'web-design', path: '/web-design' },
    { title: 'Website Development', slug: 'website-development', path: '/website-development' },
    { title: 'CMS Development', slug: 'cms-development', path: '/cms-development' },
    { title: 'Website Redesign', slug: 'website-redesign', path: '/website-redesign' },
    {
      title: 'SEO Friendly Website Development',
      slug: 'seo-friendly-website-development',
      path: '/seo-friendly-website-development',
    },
    {
      title: 'Website Performance Optimisation',
      slug: 'website-performance-optimisation',
      path: '/website-performance-optimisation',
    },
  ],
  pages: [
    { title: 'Home', slug: '', path: '/' },
    { title: 'About Us', slug: 'about-us', path: '/about-us' },
    { title: 'Services', slug: 'services', path: '/services' },
    { title: 'Blogs', slug: 'blogs', path: '/blogs' },
    { title: 'Contact Us', slug: 'contact-us', path: '/contact-us' },
    { title: 'Components', slug: 'components', path: '/components' },
  ],
  posts: [
    {
      title: 'What to Prepare Before Building a New Business Website',
      slug: 'what-to-prepare-before-building-a-new-business-website',
      category: 'Website Planning',
      excerpt: 'Essential checklist and assets to prepare before kicking off web development.',
    },
    {
      title: 'How to Turn Website Visitors Into More Enquiries',
      slug: 'how-to-turn-website-visitors-into-more-enquiries',
      category: 'Conversion & UX',
      excerpt: 'Proven strategies for high-converting landing pages and clear calls to action.',
    },
    {
      title: 'How to Make Your Business Website More SEO-Friendly',
      slug: 'how-to-make-your-business-website-more-seo-friendly',
      category: 'SEO',
      excerpt: 'Key technical and content optimizations for higher organic search rankings.',
    },
    {
      title: 'Website Design vs Website Development: What’s the Difference?',
      slug: 'website-design-vs-website-development-what-s-the-difference',
      category: 'Website Development',
      excerpt: 'Demystifying the design phase vs engineering phase in web creation.',
    },
    {
      title: 'Why Website Speed Matters for Your Business',
      slug: 'why-website-speed-matters-for-your-business',
      category: 'Website Performance',
      excerpt: 'How Core Web Vitals and load times directly impact customer retention and revenue.',
    },
    {
      title: 'What Pages Should a Small Business Website Have?',
      slug: 'what-pages-should-a-small-business-website-have',
      category: 'Website Planning',
      excerpt: 'The fundamental page architecture every local or growing business needs.',
    },
    {
      title: 'How Much Does a Business Website Cost?',
      slug: 'how-much-does-a-business-website-cost',
      category: 'Website Development',
      excerpt: 'A realistic breakdown of pricing factors for custom design and development.',
    },
    {
      title: 'Why Every Local Business Needs a Professional Website',
      slug: 'why-every-local-business-needs-a-professional-website',
      category: 'Business Websites',
      excerpt: 'Why social media alone is not enough to establish digital authority.',
    },
    {
      title: '10 Signs Your Business Website Needs a Redesign',
      slug: '10-signs-your-business-website-needs-a-redesign',
      category: 'Website Design',
      excerpt: 'Indicators that an outdated layout or slow mobile experience is hurting growth.',
    },
  ],
  totalPosts: 9,
  blogPrefix: '/blogs',
}

/**
 * Fetch dynamic site knowledge cached with next/cache
 */
export const getChatSiteContextCached = unstable_cache(
  async (): Promise<ChatSiteContext> => {
    try {
      const payloadConfig = await config
      const payload = await getPayload({ config: payloadConfig })

      // Fetch published posts
      const postsRes = await payload.find({
        collection: 'posts',
        limit: 100,
        sort: '-createdAt',
        depth: 1,
      })

      const publishedPosts = postsRes.docs
        .filter((p: any) => !p._status || p._status === 'published')
        .map((p: any) => ({
          title: p.title || p.blogTitle || 'Untitled Post',
          slug: p.slug,
          category:
            typeof p.category === 'object' && p.category !== null
              ? p.category.title || p.category.name
              : undefined,
          excerpt: p.blogExcerpt || undefined,
        }))

      // Fetch published pages
      const pagesRes = await payload.find({
        collection: 'pages',
        limit: 100,
        depth: 0,
      })

      const publishedPages = pagesRes.docs
        .filter((p: any) => !p._status || p._status === 'published')
        .map((p: any) => {
          const slug = p.slug === 'home' || p.slug === '/' ? '' : p.slug
          return {
            title: p.title || slug || 'Page',
            slug: p.slug,
            path: slug ? `/${slug}` : '/',
          }
        })

      // Find services from pages
      const servicePages = publishedPages.filter((p) =>
        [
          'web-design',
          'website-development',
          'cms-development',
          'website-redesign',
          'seo-friendly-website-development',
          'website-performance-optimisation',
        ].includes(p.slug),
      )

      // Find blog landing page prefix
      const blogLanding = pagesRes.docs.find((p: any) => p.pageType === 'blog-landing')
      const blogPrefix = blogLanding?.slug ? `/${blogLanding.slug}` : '/blogs'

      return {
        siteName: 'WebNexa',
        siteDescription:
          'WebNexa is a digital design and web development agency creating fast, user-friendly, and SEO-friendly websites designed to build trust, showcase services, and generate more enquiries.',
        services: servicePages.length > 0 ? servicePages : DEFAULT_SITE_CONTEXT.services,
        pages: publishedPages.length > 0 ? publishedPages : DEFAULT_SITE_CONTEXT.pages,
        posts: publishedPosts.length > 0 ? publishedPosts : DEFAULT_SITE_CONTEXT.posts,
        totalPosts: postsRes.totalDocs || publishedPosts.length || DEFAULT_SITE_CONTEXT.totalPosts,
        blogPrefix,
      }
    } catch (error) {
      console.warn('Failed to fetch dynamic site context for chatbot, using fallback:', error)
      return DEFAULT_SITE_CONTEXT
    }
  },
  ['chatbot-site-context'],
  {
    revalidate: 60,
    tags: ['posts', 'pages', 'site-settings', 'chat-context'],
  },
)

/**
 * Construct system prompt with rich site context
 */
export function buildChatSystemPrompt(ctx: ChatSiteContext): string {
  const postsList = ctx.posts
    .map(
      (p, idx) =>
        `${idx + 1}. "${p.title}" (Category: ${p.category || 'General'})${
          p.slug ? ` -> Link: ${ctx.blogPrefix}/post/${p.slug}` : ''
        }${p.excerpt ? ` - ${p.excerpt}` : ''}`,
    )
    .join('\n')

  const servicesList = ctx.services
    .map((s) => `- ${s.title}: Link: ${s.path}`)
    .join('\n')

  const pagesList = ctx.pages
    .map((p) => `- ${p.title}: Link: ${p.path}`)
    .join('\n')

  return `You are the official AI Assistant for WebNexa (a premier digital design & web development agency).

### Identity & Purpose
- You represent WebNexa. You are warm, professional, highly knowledgeable, and dedicated to delivering an outstanding user experience.
- WebNexa helps businesses build high-performance, SEO-friendly, mobile-responsive websites that convert visitors into leads and enquiries.
- Your goal is to guide visitors, answer their questions accurately about WebNexa's services, team, process, and published blog articles, and encourage them to get a quote or contact us.

### Live Site Knowledge (Ground Truth)
- **Agency Name**: ${ctx.siteName}
- **Value Proposition**: We create fast, user-friendly, and SEO-friendly websites designed to build trust, showcase services, and generate more enquiries.
- **Total Published Blog Posts**: Exactly ${ctx.totalPosts} blog posts are live on our site right now.
- **Blog Section Link**: ${ctx.blogPrefix}
- **Published Blog Articles (${ctx.totalPosts} total)**:
${postsList}

- **Core Services Offered**:
${servicesList}

- **Key Site Pages**:
${pagesList}
- Contact Page / Free Quote: /contact-us (or click "Get a Free Quote" in the navigation)

### Answering Guidelines
1. **Blog Queries (e.g., "blogs", "total no of blogs", "articles", "what blogs do you have")**:
   - Answer directly and accurately! State that WebNexa has **${ctx.totalPosts} published blog posts**.
   - List key articles or relevant titles by topic, along with clickable markdown links like [Article Title](${ctx.blogPrefix}/post/slug).
   - Never say "I don't have access to the database or post count" because you have the full live list above!
   - Invite the visitor to explore the [Blog](${ctx.blogPrefix}) page or ask about any specific topic.

2. **Services & Pricing Queries**:
   - Explain WebNexa's offerings clearly: Web Design, Custom Website Development, CMS Development (Payload CMS / Next.js), Website Redesign, SEO Optimization, and Performance Speed Optimization.
   - Mention that we offer tailored solutions and encourage them to request a free quote or reach out on our [Contact page](/contact-us).

3. **Tone & Formatting**:
   - Be concise, clear, and structured. Use bullet points and bold highlights for readability.
   - Use standard markdown links like [About Us](/about-us), [Services](/services), [Contact Us](/contact-us), [Blog](${ctx.blogPrefix}).
   - Avoid generic corporate fluff. Sound like a skilled, helpful team member.

4. **Scope & Guardrails**:
   - WebNexa and web/digital agency related topics are your primary domain.
   - If a visitor asks a completely off-topic question (e.g. recipe for pizza, unrelated trivia, coding unrelated algorithms), politely and warmly steer them back:
     "I'm here as WebNexa's assistant to help with questions about our web design, development, SEO services, or blog articles! How can I assist you with your website project today?"
`
}
