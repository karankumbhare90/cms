import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const VideoPlayer: Block = {
  slug: 'videoPlayer',
  labels: {
    singular: 'Video Player',
    plural: 'Video Players'
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
              name: 'videoUrl',
              type: 'text',
              required: true,
              defaultValue: ' ', // Added to prevent immediate validation error
              label: 'Video URL',
              admin: {
                description: 'Enter the YouTube, Vimeo, or direct MP4 URL.'
              }
            },
            {
              name: 'posterImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Custom Poster Image',
              admin: {
                description: 'Optional image to show before the video starts playing.'
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
              name: 'autoPlay',
              type: 'checkbox',
              defaultValue: false,
              label: 'Autoplay Video',
            }
          ],
        },
      ],
    },
  ],
}
