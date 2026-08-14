import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const Timeline: Block = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline',
    plural: 'Timelines'
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
              name: 'events',
              type: 'array',
              label: 'Timeline Events',
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'dateOrYear',
                      type: 'text',
                      required: true,
                      defaultValue: ' ', // Added to prevent immediate validation error
                      label: 'Date or Year',
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
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
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
