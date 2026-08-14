import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const Testimonial: Block = {
  slug: 'testimonial',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials'
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
              name: 'testimonials',
              type: 'array',
              label: 'Testimonials',
              minRows: 1,
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                  defaultValue: ' ', // Added to prevent immediate validation error
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'authorName',
                      type: 'text',
                      required: true,
                      defaultValue: ' ', // Added to prevent immediate validation error
                    },
                    {
                      name: 'role',
                      type: 'text',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'rating',
                      type: 'number',
                      min: 1,
                      max: 5,
                      defaultValue: 5,
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
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
            {
              name: 'enableCarousel',
              type: 'checkbox',
              defaultValue: true,
              label: 'Enable Carousel',
            },
            {
              name: 'itemsPerRow',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: '1 Item', value: '1' },
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
