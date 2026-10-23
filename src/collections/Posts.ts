import type { CollectionConfig } from 'payload'
import { bannerTab, listingLayoutTab, navigationTab, scriptsTab, seoTab, widgetsTab } from '../fields/basePageTabs'
import { revalidatePost } from '../utils/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'updatedAt'],
    group: 'Blogs',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = (
          process.env.NEXT_PUBLIC_SERVER_URL || 'https://webnexacms.vercel.app'
        ).replace(/\/+$/, '')
        const slug = data?.slug ? String(data.slug).replace(/^\/+/, '') : ''
        return `${baseUrl}/blog/post/${slug}`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        revalidatePost(doc, previousDoc)
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidatePost(doc)
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Article Internal Name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal reference title shown in the CMS list (e.g. "10 Best Web Design Practices 2026").',
      },
    },
    {
      name: 'slug',
      label: 'Web Address (URL Slug)',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The link for this article (e.g. "web-design-practices" becomes yoursite.com/blog/post/web-design-practices).',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article Content',
          fields: [
            {
              name: 'blogTitle',
              label: 'Public Headline (H1)',
              type: 'text',
              admin: {
                description: 'The main prominent headline visitors see at the top of the article.',
              },
            },
            {
              name: 'blogExcerpt',
              label: 'Short Summary (Snippet)',
              type: 'text',
              admin: {
                description: 'A 1-2 sentence preview displayed on blog cards and search engine listings.',
              },
            },
            {
              name: 'blogDetail',
              label: 'Article Body Content',
              type: 'richText',
              admin: {
                description: 'Write your full story here. You can add formatting, headings, bullet lists, links, and quotes.',
              },
            },
            {
              name: 'blogMainImage',
              label: 'Featured Cover Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main image displayed at the top of the post and in social previews. Recommended: 1200 × 630px (JPG/WebP, under 2MB).',
              },
            },
            {
              name: 'author',
              label: 'Article Author',
              type: 'relationship',
              relationTo: 'authors',
              admin: {
                description: 'Choose the team member or writer who wrote this article.',
              },
            },
            {
              name: 'category',
              label: 'Topic Category',
              type: 'relationship',
              relationTo: 'categories',
              admin: {
                description: 'Select which blog category or topic this article belongs to.',
              },
            },
            {
              name: 'tags',
              label: 'Search Tags / Keywords',
              type: 'text',
              admin: {
                description: 'Comma separated keywords to help visitors search (e.g. "business, website, tips").',
              },
            },
          ],
        },
        listingLayoutTab,
        bannerTab,
        widgetsTab,
        seoTab,
        navigationTab,
        scriptsTab,
      ],
    },
  ],
}
