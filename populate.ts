import { getPayload } from 'payload'
import config from './src/payload.config'
import 'dotenv/config'

async function run() {
  const payload = await getPayload({ config })

  // Update Navigation
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      links: [
        { label: 'Home', type: 'custom', url: '/' },
        { label: 'About', type: 'custom', url: '/about' },
        { label: 'Contact', type: 'custom', url: '/contact' },
      ],
    },
  })

  // Update Site Settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'My Awesome Site',
      description: 'Building better digital experiences for modern forward-thinking companies.',
      email: 'karankumbhare90@gmaill.com',
      phone: '+1 234 567 890',
      address: '123 Tech Street, Innovation City, 10001',
      socialLinks: [
        { icon: 'FaGithub', title: 'GitHub', link: 'https://github.com' },
        { icon: 'FaTwitter', title: 'Twitter', link: 'https://twitter.com' },
        { icon: 'FaLinkedin', title: 'LinkedIn', link: 'https://linkedin.com' }
      ],
      displayHeaderCTA: true,
      headerCTA: [
        { label: 'Get Started', type: 'custom', url: '/signup' }
      ]
    },
  })

  // Update Footer
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      enableFourColumnLayout: false,
      copyrightText: '© 2026 My Awesome Site. All rights reserved.',
      footerLinkGroups: [
        {
          groupName: 'Company',
          links: [
            { label: 'About Us', type: 'custom', url: '/about' },
            { label: 'Careers', type: 'custom', url: '/careers' },
            { label: 'Contact', type: 'custom', url: '/contact' }
          ]
        },
        {
          groupName: 'Resources',
          links: [
            { label: 'Blog', type: 'custom', url: '/blog' },
            { label: 'Documentation', type: 'custom', url: '/docs' },
            { label: 'Help Center', type: 'custom', url: '/help' }
          ]
        }
      ]
    }
  })

  console.log('Successfully populated navigation and site settings!')
  process.exit(0)
}

run().catch(console.error)
