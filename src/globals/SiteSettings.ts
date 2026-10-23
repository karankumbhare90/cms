import { GlobalConfig } from 'payload'
import { introLinks } from '../fields/introLinks'
import { revalidateGlobal } from '../utils/revalidate'
import { scriptsTab } from '../fields/basePageTabs'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings', // This groups it nicely in the left sidebar
  },
  hooks: {
    afterChange: [
      () => {
        revalidateGlobal('site-settings')
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
              label: 'Business / Website Name',
              type: 'text',
              required: true,
              admin: {
                description: 'The official name of your business (e.g. "WebNexa Digital").',
              },
            },
            {
              name: 'homePage',
              label: 'Designated Homepage',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                description: 'Select which page from your Content Tree serves as the main homepage (/).',
              },
            },
            {
              name: 'description',
              label: 'Company Tagline / Mission',
              type: 'textarea',
              admin: {
                description: 'A short sentence summarizing your company or value proposition.',
              },
            },
            {
              name: 'siteIcon',
              label: 'Primary Business Logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main logo shown in the website header. Recommended: Transparent SVG or PNG under 1MB.',
              },
            },
            {
              name: 'siteFavicon',
              label: 'Browser Tab Icon (Favicon)',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Small square icon shown on the browser tab (Recommended: 32 × 32px PNG or ICO).',
              },
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'address',
              label: 'Physical Street Address',
              type: 'textarea',
              admin: {
                description: 'Displayed in the website footer, contact section, and Google Local SEO.',
              },
            },
            {
              name: 'email',
              label: 'Public Contact Email',
              type: 'text',
              admin: {
                description: 'The general customer support or contact email displayed on the site.',
              },
            },
            {
              name: 'fromEmail',
              label: 'From Email (SMTP Sender)',
              type: 'text',
              admin: {
                description:
                  'The sender email address configured with your email server (e.g. no-reply@yoursite.com).',
              },
            },
            {
              name: 'adminEmail',
              label: 'Lead Notification Email(s)',
              type: 'text',
              admin: {
                description: 'Where website form inquiries and leads are delivered (separate multiple emails with commas).',
              },
            },
            {
              name: 'phone',
              label: 'Main Phone Number',
              type: 'text',
              admin: {
                description: 'Click-to-call phone number displayed in header and footer (e.g. "+1 (555) 000-1234").',
              },
            },
            {
              name: 'addressUrl',
              label: 'Google Maps Directions Link',
              type: 'text',
              admin: {
                description: 'Direct link to Google Maps for directions (e.g. https://maps.google.com/...).',
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
                description:
                  'Toggle this on to display the top header bar with contact information',
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
        scriptsTab,
      ],
    },
  ],
}
