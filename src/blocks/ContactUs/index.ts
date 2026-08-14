import { Block } from 'payload'
import { blockSettings } from '../../fields/blockSettings'
import { introText } from '../../fields/introText'

export const ContactUs: Block = {
  slug: 'contactUs',
  labels: {
    singular: 'Contact Us Form',
    plural: 'Contact Us Forms',
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
              name: 'thankYouMessage',
              type: 'richText',
              label: 'Thank You Message',
              admin: {
                description: 'Message to show when the form is successfully submitted.',
              },
            },
            {
              name: 'failureMessage',
              type: 'richText',
              label: 'Failure Message',
              admin: {
                description: 'Message to show if the form submission fails.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'subject',
                  type: 'text',
                  label: 'Email Subject',
                  defaultValue: 'New Contact Form Submission',
                },
                {
                  name: 'recipientEmailAddress',
                  type: 'text',
                  label: 'Recipient Email Address',
                  admin: {
                    description: 'Where should this form be sent?',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'displayContactInfo',
                  type: 'checkbox',
                  label: 'Display Contact Info',
                  defaultValue: true,
                },
                {
                  name: 'contactInfoPosition',
                  type: 'select',
                  label: 'Contact Info Position',
                  defaultValue: 'left',
                  options: [
                    { label: 'Top', value: 'top' },
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' },
                    { label: 'Bottom', value: 'bottom' },
                  ],
                  admin: {
                    condition: (_, siblingData) => siblingData.displayContactInfo,
                  },
                },
              ],
            },
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
