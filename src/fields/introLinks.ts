import type { Field } from 'payload'

export const introLinks: Field = {
  name: 'introLinks',
  label: 'Action Buttons (Clickable Links)',
  labels: {
    singular: 'Action Button',
    plural: 'Action Buttons',
  },
  type: 'array',
  maxRows: 2,
  fields: [
    {
      name: 'label',
      label: 'Button Text',
      type: 'text',
      required: true,
      admin: {
        description: 'Text written on the button (e.g. "Get a Quote", "Contact Us", "Learn More").',
      },
    },
    {
      name: 'type',
      label: 'Where does this button go?',
      type: 'radio',
      options: [
        { label: 'External Website URL (or custom path)', value: 'custom' },
        { label: 'Internal Website Page (choose from list)', value: 'reference' },
      ],
      defaultValue: 'custom',
    },
    {
      name: 'url',
      label: 'Website Address (URL)',
      type: 'text',
      admin: {
        description: 'Enter a full link (e.g. https://google.com) or relative path (e.g. /contact).',
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
    {
      name: 'reference',
      label: 'Select Internal Page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description: 'Pick an existing page from your website to link to.',
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'appearance',
      label: 'Button Visual Style',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (Solid Brand Color)', value: 'primary' },
        { label: 'Secondary (Subtle Background)', value: 'secondary' },
        { label: 'Outline (Transparent with Border)', value: 'outline' },
      ],
    },
  ],
}
