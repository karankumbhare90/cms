import type { CollectionConfig } from 'payload'
import { revalidateMedia } from '../utils/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        revalidateMedia()
      },
    ],
    afterDelete: [
      () => {
        revalidateMedia()
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
