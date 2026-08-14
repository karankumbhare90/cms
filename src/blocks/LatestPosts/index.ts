import { Block } from "payload";
import { blockSettings } from "../../fields/blockSettings";
import { introText } from "../../fields/introText";
import { introLinks } from "../../fields/introLinks";

export const LatestPosts: Block = {
  slug: 'latestPosts',
  labels: {
    singular: 'Latest Posts',
    plural: 'Latest Posts'
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
              name: 'category',
              type: 'text',
              admin: {
                description: 'Enter a category name to filter posts. Leave blank to fetch the latest posts from all categories.',
              }
            },
            {
              name: 'numberOfPosts',
              type: 'number',
              defaultValue: 3,
              min: 1,
              max: 12,
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
