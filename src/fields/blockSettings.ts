import type { Field } from 'payload'

export const blockSettings: Field = {
  name: 'settings',
  type: 'group',
  fields: [
    {
      name: 'backgroundColor',
      type: 'select', // Can be replaced with a color picker plugin later if needed
      defaultValue: 'bg-c1',
      options: [
        { label: 'Color 1', value: 'bg-c1' },
        { label: 'Color 2', value: 'bg-c2' },
        { label: 'Color 3', value: 'bg-c3' },
        { label: 'Color 4', value: 'bg-c4' },
        { label: 'Color 5', value: 'bg-c5' },
        { label: 'Color 6', value: 'bg-c6' },
      ],
    },
    {
      name: 'textAlign',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'customClass',
      type: 'text',
      admin: {
        description: 'Add custom CSS classes here (space separated)',
      },
    },
    {
      name: 'hideComponent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check this to completely hide this component from the frontend',
      },
    },
  ],
}
