import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const LogoGrid: Block = {
  slug: 'logoGrid',
  labels: {
    singular: 'Logo Grid',
    plural: 'Logo Grids'
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
              name: 'logos',
              type: 'array',
              label: 'Logos',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  // required: true, // removed to prevent immediate validation error
                },
                {
                  name: 'linkText',
                  type: 'text',
                  admin: {
                    description: 'Optional URL or text associated with the logo'
                  }
                },
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
              name: 'enableCarousel',
              type: 'checkbox',
              defaultValue: false,
              label: 'Enable Carousel',
            },
            {
              name: 'itemsPerRow',
              type: 'select',
              defaultValue: '4',
              options: [
                { label: '2 Items', value: '2' },
                { label: '3 Items', value: '3' },
                { label: '4 Items', value: '4' },
                { label: '5 Items', value: '5' },
                { label: '6 Items', value: '6' },
              ],
              admin: {
                condition: (_, siblingData) => !siblingData.enableCarousel,
              }
            },
            {
              name: 'enableGridBorder',
              type: 'checkbox',
              defaultValue: false,
              label: 'Enable Grid Border',
            }
          ],
        },
      ],
    },
  ],
}
