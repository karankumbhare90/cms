import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const PortfolioGrid: Block = {
  slug: 'portfolioGrid',
  labels: {
    singular: 'Portfolio Grid',
    plural: 'Portfolio Grids'
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
              name: 'portfolioItems',
              type: 'array',
              label: 'Portfolio Items',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  // required: true, // removed to prevent immediate validation error
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: ' ', // Added to prevent immediate validation error
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'link',
                  type: 'text',
                  admin: {
                    description: 'Optional URL for the portfolio piece.'
                  }
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
              defaultValue: '3',
              options: [
                { label: '2 Items', value: '2' },
                { label: '3 Items', value: '3' },
                { label: '4 Items', value: '4' },
              ]
            }
          ],
        },
      ],
    },
  ],
}
