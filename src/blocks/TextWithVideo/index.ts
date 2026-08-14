import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introText } from '../../fields/introText'
import { introLinks } from '@/fields/introLinks'

export const TextWithVideo: Block = {
  slug: 'textWithVideo',
  labels: {
    singular: 'Text With Video',
    plural: 'Text With Videos',
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
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              // required: true, // removed to prevent immediate validation error
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional thumbnail image for the video',
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
