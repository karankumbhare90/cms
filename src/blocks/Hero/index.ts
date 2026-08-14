import type { Block } from 'payload'
import { introText } from '../../fields/introText'
import { introLinks } from '../../fields/introLinks'
import { blockSettings } from '../../fields/blockSettings'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            introText,
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [blockSettings],
        },
      ],
    },
  ],
}
