import type { CollectionConfig } from 'payload'
import { bannerTab, listingLayoutTab, navigationTab, seoTab, widgetsTab } from '../fields/basePageTabs'

export const Authors: CollectionConfig = {
  slug: 'authors',
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
          label: 'Author Detail',
          fields: [
            {
              name: 'authorName',
              label: 'Author Name',
              type: 'text',
            },
            {
              name: 'authorDesignation',
              label: 'Author Designation',
              type: 'richText',
            },
            {
              name: 'authorImage',
              label: 'Author Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'authorSocialMedia',
              label: 'Author Social Media',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  label: 'Icon (React Icons)',
                  type: 'text',
                  admin: {
                    description: 'Enter the exact name of the React Icon (e.g., FaFacebook, FaInstagram)',
                  },
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                },
              ],
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
