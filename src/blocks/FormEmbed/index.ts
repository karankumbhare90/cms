import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const FormEmbed: Block = {
  slug: 'formEmbed',
  labels: {
    singular: 'Form Embed',
    plural: 'Form Embeds'
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
              name: 'htmlEmbedCode',
              type: 'textarea',
              label: 'HTML Embed Code',
              required: true,
              defaultValue: ' ', // Added to prevent immediate validation error
              admin: {
                description: 'Paste your form iframe or script tag here (e.g., Mailchimp, Hubspot).'
              }
            },
            introLinks,
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
