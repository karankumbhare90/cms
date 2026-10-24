import type { CollectionConfig } from 'payload'
import { bannerTab, listingLayoutTab, navigationTab, scriptsTab, seoTab, widgetsTab } from '../fields/basePageTabs'
import { revalidatePage } from '../utils/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder', 'updatedAt'],
    components: {
      beforeListTable: ['@/components/admin/PagesTreeListView#PagesTreeListView'],
    },
    livePreview: {
      url: ({ data }) => {
        const baseUrl = (
          process.env.NEXT_PUBLIC_SERVER_URL || 'https://webnexacms.vercel.app'
        ).replace(/\/+$/, '')
        if (data?.pageType === 'home' || data?.slug === '/' || data?.slug === 'home') {
          return baseUrl
        }
        return `${baseUrl}/${data?.slug || ''}`
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
        revalidatePage(doc, previousDoc)
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidatePage(doc)
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      admin: {
        description: 'The main name of this page (e.g. About Us, Web Design, Commercial Services).',
      },
    },
    {
      name: 'pageType',
      label: 'Page Purpose',
      type: 'select',
      defaultValue: 'page',
      options: [
        { label: 'Home Page', value: 'home' },
        { label: 'Standard Page', value: 'page' },
        { label: 'Blog Landing Page', value: 'blog-landing' },
        { label: 'Blog Detail Page', value: 'blog-detail' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Choose whether this is the Homepage, a Standard Page, or Blog Landing.',
      },
    },

    {
      name: 'slug',
      label: 'Web Address (URL Slug)',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The link after your domain (e.g. "about-us" becomes yoursite.com/about-us). Use lowercase letters and hyphens.',
      },
    },
    {
      name: 'parent',
      label: 'Parent Section (Subpage of)',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
        description: 'Place this page under a parent in your site tree (e.g. place under Our Services).',
      },
      defaultValue: ({ req }: any) => {
        try {
          if (req?.url) {
            const url = new URL(req.url, 'http://localhost')
            return url.searchParams.get('parent') || undefined
          }
        } catch {
          // ignore
        }
        return undefined
      },
      filterOptions: ({ id, data }) => {
        const filters: any[] = []
        if (id) {
          filters.push({ id: { not_equals: id } })
        }
        if (data?.pageType === 'blog-detail') {
          filters.push({ pageType: { equals: 'blog-landing' } })
        }
        if (data?.pageType === 'blog-landing') {
          filters.push({ pageType: { not_equals: 'blog-landing' } })
        }
        if (filters.length > 0) {
          return { and: filters }
        }
        return true
      },
    },
    {
      name: 'sortOrder',
      label: 'Sort Order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Set numerical display order (e.g. 1, 2, 3). Lower numbers appear first in the Content Tree and website menus.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        listingLayoutTab,
        bannerTab,
        {
          label: 'Blog Detail Content',
          admin: {
            condition: (data) => data?.pageType === 'blog-detail',
          },
          fields: [
            {
              name: 'blogPageTitle',
              label: 'Page Title',
              type: 'text',
            },
            {
              name: 'mainImage',
              label: 'Main Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'mainContent',
              label: 'Main Content',
              type: 'richText',
            },
            {
              name: 'summary',
              label: 'Summary',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Blog Settings',
          admin: {
            condition: (data) => data?.pageType === 'blog-landing',
          },
          fields: [
            {
              name: 'blogItemsPerPage',
              label: 'Blog Items Per Page',
              type: 'number',
              defaultValue: 10,
            },
            {
              name: 'blogListingLayout',
              label: 'Blog Listing Layout',
              type: 'select',
              defaultValue: 'single',
              options: [
                { label: 'Vertical', value: 'vertical' },
                { label: 'Grid', value: 'grid' },
                { label: 'Single', value: 'single' },
              ],
            },
            {
              name: 'noPostContent',
              label: 'No Post Content',
              type: 'richText',
              admin: {
                description: 'Content to display when there are no posts.',
              },
            },
          ],
        },
        {
          label: 'Sidebar Settings',
          admin: {
            condition: (data) => data?.pageType === 'blog-landing',
          },
          fields: [
            {
              name: 'hideSidebar',
              label: 'Hide Sidebar',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideTagSidebar',
              label: 'Hide Tag Sidebar',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideRecentPostSidebar',
              label: 'Hide Recent Post Sidebar',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideCategorySidebar',
              label: 'Hide Category Sidebar',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        widgetsTab,
        seoTab,
        navigationTab,
        scriptsTab,
      ],
    },
  ],
}
