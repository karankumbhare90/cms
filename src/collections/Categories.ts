import type { CollectionConfig } from 'payload'
import { bannerTab, listingLayoutTab, navigationTab, scriptsTab, seoTab, widgetsTab } from '../fields/basePageTabs'
import { revalidateCategory } from '../utils/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Blogs',
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCategory(doc)
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCategory(doc)
      },
    ],
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
          label: 'Category Detail',
          fields: [
            {
              name: 'categoryName',
              label: 'Category Name',
              type: 'text',
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
