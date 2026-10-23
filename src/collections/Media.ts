import type { CollectionConfig } from 'payload'
import { revalidateMedia } from '../utils/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media Asset / Image',
    plural: 'Media Library',
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    description:
      'Upload and manage images, PDFs, and media assets. Recommended dimensions: Hero banners (1920 × 1080px), Cards/Services (800 × 600px), Icons/Logos (SVG or transparent PNG). Keep images under 2MB for fast loading.',
  },
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
      label: 'Alternative Text (Description for SEO & Accessibility)',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe this image in a few words for Google SEO ranking and visually impaired visitors (e.g. "Modern corporate office building in Melbourne").',
      },
    },
  ],
  upload: true,
}
