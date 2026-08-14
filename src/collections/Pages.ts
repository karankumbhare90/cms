import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { Content } from '../blocks/Content'
import { Text } from '@/blocks/Text'
import { CTA } from '../blocks/CTA'
import { TextWithImage } from '../blocks/TextWithImage'
import { TextWithVideo } from '../blocks/TextWithVideo'
import { Counter } from '../blocks/Counter'
import { Pod } from '../blocks/Pod'
import { FAQ } from '../blocks/FAQ'
import { Testimonial } from '../blocks/Testimonial'
import { LogoGrid } from '../blocks/LogoGrid'
import { PricingTable } from '../blocks/PricingTable'
import { TeamGrid } from '../blocks/TeamGrid'
import { LatestPosts } from '../blocks/LatestPosts'
import { MediaGallery } from '../blocks/MediaGallery'
import { Map } from '../blocks/Map'
import { Tabs } from '../blocks/Tabs'
import { ComparisonTable } from '../blocks/ComparisonTable'
import { CountdownTimer } from '../blocks/CountdownTimer'
import { FormEmbed } from '../blocks/FormEmbed'
import { NoticeBanner } from '../blocks/NoticeBanner'
import { Timeline } from '../blocks/Timeline'
import { ProcessSteps } from '../blocks/ProcessSteps'
import { PortfolioGrid } from '../blocks/PortfolioGrid'
import { BeforeAndAfter } from '../blocks/BeforeAndAfter'
import { VideoPlayer } from '../blocks/VideoPlayer'
import { Pullquote } from '../blocks/Pullquote'
import { ContactUs } from '../blocks/ContactUs'
import { Sitemap } from '../blocks/Sitemap'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pageType',
      type: 'select',
      defaultValue: 'page',
      options: [
        { label: 'Home Page', value: 'home' },
        { label: 'Page', value: 'page' },
        { label: 'Blog Landing Page', value: 'blog-landing' },
        { label: 'Blog Detail Page', value: 'blog-detail' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ id, data }) => {
        const filters: any[] = []
        if (id) {
          filters.push({ id: { not_equals: id } })
        }
        if (data?.pageType === 'blog-detail') {
          filters.push({ pageType: { equals: 'blog-landing' } })
        }
        if (data?.pageType === 'blog-landing') {
          filters.push({ pageType: { not_equals: 'blog-landing' } })
        }
        if (filters.length > 0) {
          return { and: filters }
        }
        return {}
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Listing Layout',
          fields: [
            {
              name: 'listingTitle',
              label: 'Listing Title',
              type: 'text',
            },
            {
              name: 'listingDescription',
              label: 'Listing Description',
              type: 'richText',
            },
            {
              name: 'listingImage',
              label: 'Listing Image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'banner',
          label: 'Banner',
          admin: {
            condition: (data) => data?.pageType !== 'home',
          },
          fields: [
            {
              name: 'pageTitle',
              type: 'text',
            },
            {
              name: 'pageDescription',
              type: 'textarea',
            },
            {
              name: 'displayBreadcrumb',
              type: 'checkbox',
              defaultValue: false,
              label: 'Display Breadcrumb',
            },
            {
              name: 'bannerBackground',
              type: 'upload',
              relationTo: 'media',
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
          ],
        },
        {
          label: 'Blog Detail Content',
          admin: {
            condition: (data) => data?.pageType === 'blog-detail',
          },
          fields: [
            {
              name: 'blogPageTitle',
              label: 'Page Title',
              type: 'text',
            },
            {
              name: 'mainImage',
              label: 'Main Image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'mainContent',
              label: 'Main Content',
              type: 'richText',
            },
            {
              name: 'summary',
              label: 'Summary',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Blog Settings',
          admin: {
            condition: (data) => data?.pageType === 'blog-landing',
          },
          fields: [
            {
              name: 'blogItemsPerPage',
              label: 'Blog Items Per Page',
              type: 'number',
              defaultValue: 10,
            },
            {
              name: 'blogListingLayout',
              label: 'Blog Listing Layout',
              type: 'select',
              defaultValue: 'single',
              options: [
                { label: 'Vertical', value: 'vertical' },
                { label: 'Grid', value: 'grid' },
                { label: 'Single', value: 'single' },
              ],
            },
            {
              name: 'noPostContent',
              label: 'No Post Content',
              type: 'richText',
              admin: {
                description: 'Content to display when there are no posts.',
              },
            },
          ],
        },
        {
          label: 'Sidebar Settings',
          admin: {
            condition: (data) => data?.pageType === 'blog-landing',
          },
          fields: [
            {
              name: 'hideSidebar',
              label: 'Hide Sidebar',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideTagSidebar',
              label: 'Hide Tag Sidebar',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideRecentPostSidebar',
              label: 'Hide Recent Post Sidebar',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideCategorySidebar',
              label: 'Hide Category Sidebar',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Widgets',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Hero,
                Content,
                Text,
                CTA,
                TextWithImage,
                TextWithVideo,
                Counter,
                Pod,
                FAQ,
                Testimonial,
                LogoGrid,
                PricingTable,
                TeamGrid,
                LatestPosts,
                MediaGallery,
                Map,
                Tabs,
                ComparisonTable,
                CountdownTimer,
                FormEmbed,
                NoticeBanner,
                Timeline,
                ProcessSteps,
                PortfolioGrid,
                BeforeAndAfter,
                VideoPlayer,
                Pullquote,
                ContactUs,
                Sitemap,
              ],
            },
          ],
        },
        {
          label: 'SEO',
          name: 'seo',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: {
                description: 'Title for search engines',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: {
                description: 'Description for search engines',
              },
            },
            {
              name: 'ogImage',
              label: 'Open Graph Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Image for social sharing',
              },
            },
          ],
        },
        {
          label: 'Navigation',
          name: 'navigation',
          fields: [
            {
              name: 'navTitle',
              label: 'Navigation Title',
              type: 'text',
              admin: {
                description: 'Used for menu links (defaults to page title)',
              },
            },
            {
              name: 'hideFromNavigation',
              label: 'Hide From Navigation',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideFromSitemap',
              label: 'Hide From HTML Sitemap',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideFromXMLSitemap',
              label: 'Hide From XML Sitemap',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
