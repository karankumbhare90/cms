import type { Field } from 'payload'

export const blockSettings: Field = {
  name: 'settings',
  label: 'Section Styling & Visibility Settings',
  type: 'group',
  fields: [
    {
      name: 'backgroundColor',
      label: 'Background Theme Color',
      type: 'select',
      defaultValue: 'bg-c1',
      options: [
        { label: 'Theme 1 (Default / White)', value: 'bg-c1' },
        { label: 'Theme 2 (Subtle Light Gray)', value: 'bg-c2' },
        { label: 'Theme 3 (Brand Tint / Accent)', value: 'bg-c3' },
        { label: 'Theme 4 (Dark Contrast)', value: 'bg-c4' },
        { label: 'Theme 5 (Secondary Dark)', value: 'bg-c5' },
        { label: 'Theme 6 (Card Background)', value: 'bg-c6' },
        { label: 'Theme 7 (Muted Neutral)', value: 'bg-c7' },
        { label: 'Theme 8 (Transparent)', value: 'bg-c8' },
      ],
      admin: {
        description: 'Choose the background color palette for this section.',
      },
    },
    {
      name: 'textAlign',
      label: 'Content Text Alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left Aligned', value: 'left' },
        { label: 'Center Aligned', value: 'center' },
        { label: 'Right Aligned', value: 'right' },
      ],
    },
    {
      name: 'enableOverlay',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Dark Contrast Overlay (for background images)',
    },
    {
      name: 'hideComponent',
      type: 'checkbox',
      defaultValue: false,
      label: 'Temporarily Hide This Section on Live Site',
      admin: {
        description: 'Check this to turn off this section without deleting it (great for seasonal promotions or draft sections).',
      },
    },
    {
      name: 'customClass',
      label: 'Custom CSS Class (For Developers)',
      type: 'text',
      admin: {
        description: 'Optional advanced CSS class name for custom styling. Can be safely left blank.',
      },
    },
  ],
}
