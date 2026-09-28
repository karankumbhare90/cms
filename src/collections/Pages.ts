import type { CollectionConfig } from 'payload'
import { bannerTab, listingLayoutTab, navigationTab, seoTab, widgetsTab } from '../fields/basePageTabs'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pageType',
      type: 'select',
      defaultValue: 'page',
      options: [
        { label: 'Home Page', value: 'home' },
        { label: 'Page', value: 'page' },
        { label: 'Blog Landing Page', value: 'blog-landing' },
        { label: 'Blog Detail Page', value: 'blog-detail' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
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
      ],
    },
  ],
}
