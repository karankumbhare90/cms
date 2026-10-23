import type { Field } from 'payload'

export const introText: Field = {
  name: 'introText',
  label: 'Section Headlines & Introductory Text',
  type: 'group',
  fields: [
    {
      name: 'subheading',
      label: 'Eyebrow / Small Subheading',
      type: 'text',
      admin: {
        description: 'Small category tag or badge shown above the main heading (e.g. "OUR SERVICES", "ABOUT US").',
      },
    },
    {
      name: 'heading',
      label: 'Main Section Heading',
      type: 'text',
      admin: {
        description: 'The prominent headline for this section (e.g. "Transforming Ideas into Digital Realities").',
      },
    },
    {
      name: 'headingSize',
      label: 'Heading Size (HTML Tag)',
      type: 'select',
      defaultValue: 'h2',
      options: [
        { label: 'H1 (Main Page Title - use once per page)', value: 'h1' },
        { label: 'H2 (Standard Section Headline)', value: 'h2' },
        { label: 'H3 (Sub-section / Card Headline)', value: 'h3' },
        { label: 'H4 (Small Heading)', value: 'h4' },
        { label: 'H5 (Minor Heading)', value: 'h5' },
        { label: 'H6 (Smallest Heading)', value: 'h6' },
      ],
      admin: {
        description: 'H2 is recommended for standard page sections. Keep H1 for the top page banner.',
      },
    },
    {
      name: 'description',
      label: 'Short Subtitle / Lead Paragraph',
      type: 'textarea',
      admin: {
        description: 'A 1-2 sentence introductory paragraph shown right below the heading.',
      },
    },
    {
      name: 'content',
      label: 'Detailed Content (Rich Text)',
      type: 'richText',
      admin: {
        description: 'Optional extra paragraphs, formatted text, bullet points, or links.',
      },
    },
  ],
}
