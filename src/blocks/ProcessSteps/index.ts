import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const ProcessSteps: Block = {
  slug: 'processSteps',
  labels: {
    singular: 'Process Steps',
    plural: 'Process Steps'
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
              name: 'steps',
              type: 'array',
              label: 'Steps',
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'stepNumberOrIcon',
                      type: 'text',
                      label: 'Step Number / Icon',
                      required: true,
                      defaultValue: ' ', // Added to prevent immediate validation error
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      defaultValue: ' ', // Added to prevent immediate validation error
                    },
                  ]
                },
                {
                  name: 'description',
                  type: 'textarea',
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
              name: 'layoutStyle',
              type: 'select',
              defaultValue: 'horizontal',
              options: [
                { label: 'Horizontal Grid', value: 'horizontal' },
                { label: 'Vertical List', value: 'vertical' },
              ]
            }
          ],
        },
      ],
    },
  ],
}
