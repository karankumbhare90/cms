import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const Counter: Block = {
  slug: 'counter',
  labels: {
    singular: 'Counter',
    plural: 'Counters'
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
              name: 'counterItems',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  defaultValue: ' ', // Added to prevent immediate validation error
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'posttext',
                  type: 'text',
                }
              ]
            },
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
            {
              name: 'itemsPerRow',
              type: 'select',
              defaultValue: '4',
              options: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '6', value: '6' },
              ]
            }
          ],
        },
      ],
    },
  ],
}
