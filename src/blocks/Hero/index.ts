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
            {
              name: 'slides',
              type: 'array',
              minRows: 1,
              fields: [
                introText,
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Background Media (Image or Video)',
                },
                {
                  name: 'videoAutoplay',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Autoplay Video (if media is a video)',
                },
                introLinks,
              ],
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
            {
              name: 'bannerWidth',
              type: 'select',
              defaultValue: 'full',
              label: 'Banner Width',
              options: [
                { label: 'Half Width', value: 'half' },
                { label: 'Wide Width', value: 'wide' },
                { label: 'Full Width', value: 'full' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
