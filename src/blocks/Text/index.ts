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
          fields: [
            blockSettings,
            {
              name: 'contentWidth',
              type: 'select',
              defaultValue: 'wide',
              label: 'Content Width',
              admin: {
                description: 'Controls the width of the text content block',
              },
              options: [
                { label: 'Full (12/12)', value: 'full' },
                { label: 'Wide (8/12)', value: 'wide' },
                { label: 'Half (6/12)', value: 'half' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
