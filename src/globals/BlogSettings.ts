import { GlobalConfig } from 'payload'

export const BlogSettings: GlobalConfig = {
  slug: 'blog-settings',
  label: 'Blog Settings',
  admin: {
    group: 'Blogs', // This will place it alongside Posts, Authors, Categories
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Settings',
          fields: [
            {
              name: 'blogItemsPerPage',
              label: 'Blog Items Per Page',
              type: 'number',
              defaultValue: 10,
            },
            {
              name: 'blogListingLayout',
              label: 'Listing Layout',
              type: 'select',
              defaultValue: 'grid',
              options: [
                { label: 'Grid (2 per row)', value: 'grid' },
                { label: 'Column row (1 per row)', value: 'column' },
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
          fields: [
            {
              name: 'hideRecentPost',
              label: 'Hide Recent Post',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideTabs',
              label: 'Hide Tabs',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideCategories',
              label: 'Hide Categories',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
