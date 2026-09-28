import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'footerLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional logo to display in the footer',
      },
    },
    {
      name: 'footerLinkGroups',
      type: 'array',
      admin: {
        description: 'Create columns/groups of footer links (e.g., Company, Support, Legal)',
      },
      fields: [
        {
          name: 'groupName',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
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
              ]
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
    {
      name: 'copyrightText',
      type: 'text',
      admin: {
        description: 'Optional copyright notice to display at the very bottom (e.g., © 2026 My Company. All rights reserved.)',
      }
    },
    {
      name: 'footerBottomLinks',
      type: 'array',
      admin: {
        description: 'Links to display in the bottom bar next to the copyright (e.g., Privacy Policy, Terms of Service)',
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
          ]
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
    {
      name: 'enableFourColumnLayout',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable to display the footer links in a four-column grid layout',
      }
    },
  ],
}
