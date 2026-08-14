import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introText } from '../../fields/introText'
import { introLinks } from '@/fields/introLinks'

export const Text: Block = {
  slug: 'text',
  labels: {
    singular: 'Text',
    plural: 'Text Components',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [introText, introLinks],
        },
        {
          label: 'Settings',
          fields: [blockSettings],
        },
      ],
    },
  ],
}
