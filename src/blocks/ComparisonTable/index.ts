import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const ComparisonTable: Block = {
  slug: 'comparisonTable',
  labels: {
    singular: 'Comparison Table',
    plural: 'Comparison Tables'
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
              name: 'competitorName',
              type: 'text',
              required: true,
              defaultValue: ' ', // Added to prevent immediate validation error
              admin: {
                description: 'The name of the competitor or alternative you are comparing against.'
              }
            },
            {
              name: 'features',
              type: 'array',
              label: 'Features Comparison',
              minRows: 1,
              fields: [
                {
                  name: 'featureName',
                  type: 'text',
                  required: true,
                  defaultValue: ' ', // Added to prevent immediate validation error
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ourProductHasFeature',
                      type: 'checkbox',
                      label: 'We Have This',
                      defaultValue: true,
                    },
                    {
                      name: 'competitorHasFeature',
                      type: 'checkbox',
                      label: 'Competitor Has This',
                      defaultValue: false,
                    },
                  ]
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
          ],
        },
      ],
    },
  ],
}
