import type { Block } from 'payload'
import { introText } from '../../fields/introText'
import { introLinks } from '../../fields/introLinks'
import { blockSettings } from '../../fields/blockSettings'

export const FAQ: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
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
              name: 'faqs',
              type: 'array',
              label: 'FAQ Items',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'richText',
                  required: true,
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
