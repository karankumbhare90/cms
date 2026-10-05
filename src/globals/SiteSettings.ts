import { GlobalConfig } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import { introLinks } from '../fields/introLinks'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings', // This groups it nicely in the left sidebar
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidateTag('site-settings')
          revalidateTag('globals')
          revalidatePath('/', 'layout')
        } catch {
          // Ignore when outside Next request context
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Settings',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
            },
            {
              name: 'homePage',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                description: 'Select the page to serve as the Home page of the site.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Short description about the site',
              },
            },
            {
              name: 'siteIcon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Used for main site logos',
              },
            },
            {
              name: 'siteFavicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Used for the browser tab icon (.ico or .png)',
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'address',
              type: 'textarea',
            },
            {
              name: 'email',
              type: 'text',
            },
            {
              name: 'fromEmail',
              label: 'From Email (SMTP User)',
              type: 'text',
              admin: {
                description:
                  'The email address used to send the emails (e.g. no-reply@gelinst.com.au)',
              },
            },
            {
              name: 'adminEmail',
              label: 'Admin Email (Lead Receiver)',
              type: 'text',
              admin: {
                description: 'The email address that will receive the contact form submissions',
              },
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'addressUrl',
              label: 'Address URL',
              type: 'text',
              admin: {
                description: 'Link to Google Maps or similar',
              },
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socialLinks',
              label: 'Social Links',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon (React Icons)',
                  admin: {
                    description:
                      'Enter the exact name of the React Icon (e.g., FaFacebook, FaInstagram, RiTwitterXFill)',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                    },
                    {
                      name: 'link',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: {
                description: 'Default Meta Title for the entire site',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: {
                description: 'Default Meta Description for the entire site',
              },
            },
            {
              name: 'ogImage',
              label: 'Open Graph Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Default image shown when sharing the site on social media',
              },
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'displayTopHeader',
              label: 'Display Top Header',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Toggle this on to display the top header bar with contact information',
              },
            },
            {
              name: 'displayHeaderCTA',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Toggle this on to display a Call to Action button in the site header',
              },
            },
            {
              ...introLinks,
              name: 'headerCTA',
              admin: {
                condition: (_: any, siblingData: any) => siblingData?.displayHeaderCTA === true,
              },
            } as any,
          ],
        },
      ],
    },
  ],
}
