import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introLinks } from '../../fields/introLinks'

export const NoticeBanner: Block = {
  slug: 'noticeBanner',
  labels: {
    singular: 'Notice Banner',
    plural: 'Notice Banners',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'message',
              type: 'richText',
              required: true,
              admin: {
                description: 'The short message to display in the banner.',
              },
            },
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
            {
              name: 'bannerType',
              type: 'select',
              defaultValue: 'info',
              options: [
                { label: 'Info', value: 'info' },
                { label: 'Success', value: 'success' },
                { label: 'Warning', value: 'warning' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
