import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introText } from '../../fields/introText'
import { introLinks } from '../../fields/introLinks'

export const Map: Block = {
  slug: 'map',
  labels: {
    singular: 'Map',
    plural: 'Maps',
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
              name: 'mapData',
              type: 'textarea',
              label: 'Map Data (iframe embed code)',
              required: true,
              defaultValue: ' ', // Added to prevent immediate validation error
              admin: {
                description: 'Paste the iframe embed code from Google Maps or other map providers.',
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
              name: 'widthType',
              type: 'select',
              defaultValue: 'full',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Wide', value: 'wide' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
