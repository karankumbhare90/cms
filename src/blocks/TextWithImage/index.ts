import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introText } from '../../fields/introText'
import { introLinks } from '@/fields/introLinks'

export const TextWithImage: Block = {
  slug: 'textWithImage',
  labels: {
    singular: 'Text With Image',
    plural: 'Text With Images',
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
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
            {
              name: 'textPosition',
              type: 'radio',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
