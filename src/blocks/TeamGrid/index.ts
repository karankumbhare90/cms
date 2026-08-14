import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const TeamGrid: Block = {
  slug: 'teamGrid',
  labels: {
    singular: 'Team Grid',
    plural: 'Team Grids'
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
              name: 'teamMembers',
              type: 'array',
              label: 'Team Members',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      defaultValue: ' ', // Added to prevent immediate validation error
                    },
                    {
                      name: 'designation',
                      type: 'text',
                      required: true,
                      defaultValue: ' ', // Added to prevent immediate validation error
                    },
                  ]
                },
                {
                  name: 'experienceOrJoiningDate',
                  type: 'text',
                  label: 'Years of Experience / Joining Date',
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
              ],
              admin: {
                condition: (_, siblingData) => !siblingData.enableCarousel,
              }
            }
          ],
        },
      ],
    },
  ],
}
