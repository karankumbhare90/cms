import { GlobalConfig } from 'payload'
import { introLinks } from '../fields/introLinks'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings', // This groups it nicely in the left sidebar
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
              }
            },
            {
              name: 'siteFavicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Used for the browser tab icon (.ico or .png)',
              }
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
              name: 'phone',
              type: 'text',
            },
            {
              name: 'addressUrl',
              label: 'Address URL',
              type: 'text',
              admin: {
                description: 'Link to Google Maps or similar',
              }
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
                  type: 'select',
                  label: 'Icon (React Icons)',
                  options: [
                    { label: 'Facebook (FaFacebook)', value: 'FaFacebook' },
                    { label: 'Twitter / X (FaTwitter)', value: 'FaTwitter' },
                    { label: 'Instagram (FaInstagram)', value: 'FaInstagram' },
                    { label: 'LinkedIn (FaLinkedin)', value: 'FaLinkedin' },
                    { label: 'YouTube (FaYoutube)', value: 'FaYoutube' },
                    { label: 'GitHub (FaGithub)', value: 'FaGithub' },
                    { label: 'TikTok (FaTiktok)', value: 'FaTiktok' },
                    { label: 'Pinterest (FaPinterest)', value: 'FaPinterest' },
                    { label: 'Discord (FaDiscord)', value: 'FaDiscord' },
                    { label: 'Twitch (FaTwitch)', value: 'FaTwitch' },
                  ]
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
              }
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: {
                description: 'Default Meta Description for the entire site',
              }
            },
            {
              name: 'ogImage',
              label: 'Open Graph Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Default image shown when sharing the site on social media',
              }
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'displayHeaderCTA',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Toggle this on to display a Call to Action button in the site header',
              }
            },
            {
              ...introLinks,
              name: 'headerCTA',
              admin: {
                condition: (_, siblingData) => siblingData?.displayHeaderCTA === true,
              },
            },
          ],
        },
      ],
    },
  ],
}
