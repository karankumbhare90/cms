import type { Field } from 'payload'

export const introText: Field = {
  name: 'introText',
  type: 'group',
  fields: [
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'headingSize',
      type: 'select',
      defaultValue: 'h2',
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
