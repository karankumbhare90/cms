import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introText } from '../../fields/introText'
import { introLinks } from '../../fields/introLinks'

export const PricingTable: Block = {
  slug: 'pricingTable',
  labels: {
    singular: 'Pricing Table',
    plural: 'Pricing Tables',
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
              name: 'pricingPlans',
              type: 'array',
              label: 'Pricing Plans',
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'planName',
                      type: 'text',
                      required: true,
                      defaultValue: ' ', // Added to prevent immediate validation error
                    },
                    {
                      name: 'price',
                      type: 'text',
                      required: true,
                      defaultValue: ' ', // Added to prevent immediate validation error
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Features List',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                      defaultValue: ' ',
                    }
                  ]
                },
                {
                  name: 'isPopular',
                  type: 'checkbox',
                  label: 'Highlight as Popular Plan',
                  defaultValue: false,
                },
              ],
            },
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [blockSettings],
        },
      ],
    },
  ],
}
