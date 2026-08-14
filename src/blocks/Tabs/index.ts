import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";
import { Content } from "../Content";

export const Tabs: Block = {
  slug: 'tabs',
  labels: {
    singular: 'Tabs',
    plural: 'Tabs'
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
              name: 'tabsList',
              type: 'array',
              label: 'Tabs',
              minRows: 1,
              fields: [
                {
                  name: 'tabLabel',
                  type: 'text',
                  required: true,
                  defaultValue: ' ', // Added to prevent immediate validation error
                },
                {
                  name: 'tabContent',
                  type: 'richText',
                  label: 'Tab Content',
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
