import type { Block } from 'payload'
import { introText } from '../../fields/introText'
import { introLinks } from '../../fields/introLinks'
import { blockSettings } from '../../fields/blockSettings'

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Content',
    plural: 'Content Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            introText,
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
          ],
        },
      ],
    },
  ],
}
