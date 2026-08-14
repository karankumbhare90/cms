import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const BeforeAndAfter: Block = {
  slug: 'beforeAndAfter',
  labels: {
    singular: 'Before & After Slider',
    plural: 'Before & After Sliders'
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
              type: 'row',
              fields: [
                {
                  name: 'beforeImage',
                  type: 'upload',
                  relationTo: 'media',
                  // required: true, // removed to prevent immediate validation error
                  label: 'Before Image',
                },
                {
                  name: 'beforeLabel',
                  type: 'text',
                  defaultValue: 'Before',
                },
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'afterImage',
                  type: 'upload',
                  relationTo: 'media',
                  // required: true, // removed to prevent immediate validation error
                  label: 'After Image',
                },
                {
                  name: 'afterLabel',
                  type: 'text',
                  defaultValue: 'After',
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
          ],
        },
      ],
    },
  ],
}
