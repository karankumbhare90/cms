import { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      admin: {
        description: 'Manage navigation links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'custom',
          options: [
            { label: 'Custom URL', value: 'custom' },
            { label: 'Internal Reference', value: 'reference' },
          ],
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
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        },
        {
          name: 'subLinks',
          type: 'array',
          admin: {
            description: 'Optional sub-links for a dropdown menu',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'custom',
              options: [
                { label: 'Custom URL', value: 'custom' },
                { label: 'Internal Reference', value: 'reference' },
              ],
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
              relationTo: 'pages',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
            },
            {
              name: 'subLinks',
              type: 'array',
              admin: {
                description: 'Optional third-level sub-links',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'type',
                  type: 'radio',
                  defaultValue: 'custom',
                  options: [
                    { label: 'Custom URL', value: 'custom' },
                    { label: 'Internal Reference', value: 'reference' },
                  ],
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
                  relationTo: 'pages',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'reference',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
