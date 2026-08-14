import type { Field } from 'payload'

export const introLinks: Field = {
  name: 'introLinks',
  type: 'array',
  maxRows: 2,
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      options: [
        { label: 'Custom URL', value: 'custom' },
        { label: 'Internal Reference', value: 'reference' },
      ],
      defaultValue: 'custom',
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: 'pages', // Assuming pages is the main collection to link to
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'appearance',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary Button', value: 'primary' },
        { label: 'Secondary Button', value: 'secondary' },
        { label: 'Outline Button', value: 'outline' },
      ],
    },
  ],
}
