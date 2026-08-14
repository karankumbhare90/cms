import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";

export const Pullquote: Block = {
  slug: 'pullquote',
  labels: {
    singular: 'Pullquote',
    plural: 'Pullquotes'
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true,
              defaultValue: ' ', // Added to prevent immediate validation error
              admin: {
                description: 'The main quote text to highlight.'
              }
            },
            {
              name: 'author',
              type: 'text',
              admin: {
                description: 'Optional author or source of the quote.'
              }
            }
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
