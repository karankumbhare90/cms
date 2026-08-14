import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const MediaGallery: Block = {
  slug: 'mediaGallery',
  labels: {
    singular: 'Media Gallery',
    plural: 'Media Galleries'
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
              name: 'mediaItems',
              type: 'array',
              label: 'Media Items',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  // required: true, // removed to prevent immediate validation error
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ]
            },
            introLinks,
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings,
            {
              name: 'enableMasonry',
              type: 'checkbox',
              defaultValue: false,
              label: 'Enable Masonry View',
            }
          ],
        },
      ],
    },
  ],
}
