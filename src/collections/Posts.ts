import type { CollectionConfig } from 'payload'
import { bannerTab, listingLayoutTab, navigationTab, seoTab, widgetsTab } from '../fields/basePageTabs'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Blogs',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
      type: 'tabs',
      tabs: [
        {
          label: 'Blog Detail Contain',
          fields: [
            {
              name: 'blogTitle',
              label: 'Blog Title',
              type: 'text',
            },
            {
              name: 'blogExcerpt',
              label: 'Blog Excerpt',
              type: 'text',
            },
            {
              name: 'blogDetail',
              label: 'Blog Detail',
              type: 'richText',
            },
            {
              name: 'blogMainImage',
              label: 'Blog Main Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'author',
              label: 'Author',
              type: 'relationship',
              relationTo: 'authors',
            },
            {
              name: 'category',
              label: 'Category',
              type: 'relationship',
              relationTo: 'categories',
            },
            {
              name: 'tags',
              label: 'Tags',
              type: 'text',
              admin: {
                description: 'Comma separated values',
              },
            },
          ],
        },
        listingLayoutTab,
        bannerTab,
        widgetsTab,
        seoTab,
        navigationTab,
      ],
    },
  ],
}
