import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introText } from '../../fields/introText'
import { introLinks } from '../../fields/introLinks'

export const CTA: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
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
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'imagePosition',
              type: 'select',
              defaultValue: 'left',
              options: [
                {
                  label: 'Left',
                  value: 'left',
                },
                {
                  label: 'Right',
                  value: 'right',
                },
              ],
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.image),
              },
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
