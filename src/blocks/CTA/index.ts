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
            {
              name: 'contentWidth',
              type: 'select',
              defaultValue: 'wide',
              label: 'Content Width',
              admin: {
                description: 'Controls the width of the CTA content block',
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
