import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const CountdownTimer: Block = {
  slug: 'countdownTimer',
  labels: {
    singular: 'Countdown Timer',
    plural: 'Countdown Timers'
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
              name: 'targetDate',
              type: 'date',
              // required: true, // removed to prevent immediate validation error
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                }
              }
            },
            {
              name: 'expiredMessage',
              type: 'textarea',
              label: 'Expired Message',
              admin: {
                description: 'Message to display when the countdown has finished.'
              }
            },
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
            {
              name: 'themeColor',
              type: 'select',
              defaultValue: 'primary',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Dark', value: 'dark' },
              ]
            }
          ],
        },
      ],
    },
  ],
}
