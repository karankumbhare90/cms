import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introText } from '../../fields/introText'
import { introLinks } from '../../fields/introLinks'

export const Pod: Block = {
  slug: 'pod',
  labels: {
    singular: 'Pod',
    plural: 'Pods',
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
              name: 'podItems',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: ' ', // Added to prevent immediate validation error
                },
                {
                  name: 'content',
                  type: 'textarea',
                },
                {
                  name: 'link',
                  type: 'group',
                  admin: {
                    description: 'Optional link for this pod item',
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
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
                      relationTo: 'pages',
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'reference',
                      },
                    },
                  ],
                },
              ],
            },
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
            {
              name: 'introTextPosition',
              type: 'radio',
              defaultValue: 'above',
              admin: {
                description: 'Position of the Intro Text relative to the pod items',
              },
              options: [
                { label: 'Above', value: 'above' },
                { label: 'Below', value: 'below' },
              ],
            },
            {
              name: 'itemsPerRow',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '6', value: '6' },
              ],
            },
            {
              name: 'iconMode',
              type: 'checkbox',
              defaultValue: false,
              label: 'Icon Mode',
              admin: {
                description:
                  'Display images as small icons (32×32px) with padding and rounded shadow container',
              },
            },
          ],
        },
      ],
    },
  ],
}
