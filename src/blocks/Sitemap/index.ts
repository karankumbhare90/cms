import type { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'

export const Sitemap: Block = {
  slug: 'sitemap',
  labels: {
    singular: 'Sitemap',
    plural: 'Sitemaps',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Settings',
          fields: [blockSettings],
        },
      ],
    },
  ],
}
