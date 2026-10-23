import { Tab } from 'payload'
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

export const bannerTab: Tab = {
  name: 'banner',
  label: 'Top Banner',
  fields: [
    {
      name: 'pageTitle',
      label: 'Banner Headline',
      type: 'text',
      admin: {
        description: 'Main headline displayed on top of the page banner (leave blank to use the Page Title).',
      },
    },
    {
      name: 'pageDescription',
      label: 'Banner Subtitle / Description',
      type: 'textarea',
      admin: {
        description: 'Brief introductory sentence shown below the banner headline.',
      },
    },
    {
      name: 'displayBreadcrumb',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Breadcrumb Navigation (e.g. Home > Services > Web Design)',
    },
    {
      name: 'bannerBackground',
      label: 'Banner Background Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Recommended size: 1920 × 600px (or 1920 × 1080px). JPG or WebP under 2MB.',
      },
    },
    {
      name: 'textAlign',
      label: 'Banner Text Alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left Aligned', value: 'left' },
        { label: 'Center Aligned', value: 'center' },
        { label: 'Right Aligned', value: 'right' },
      ],
    },
    {
      name: 'displayOverlay',
      type: 'checkbox',
      defaultValue: true,
      label: 'Dark Overlay (Improves Text Readability)',
      admin: {
        description:
          'Show a dark tint over the background image to make white text crisp and easy to read.',
        condition: (_, siblingData) => Boolean(siblingData?.bannerBackground),
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Dark Overlay Darkness (%)',
      defaultValue: 50,
      min: 0,
      max: 100,
      admin: {
        description: 'Controls how dark the tint is (50% is standard; 100% is solid black).',
        condition: (_, siblingData) =>
          Boolean(siblingData?.bannerBackground) && siblingData?.displayOverlay === true,
      },
    },
  ],
}

export const widgetsTab: Tab = {
  label: 'Page Content (Blocks)',
  fields: [
    {
      name: 'layout',
      label: 'Content Blocks',
      type: 'blocks',
      admin: {
        description:
          'Assemble your page section by section. Click "Add Block" below to insert banners, feature cards, testimonials, FAQ accordions, contact forms, and drag-and-drop to reorder them.',
      },
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
}

export const seoTab: Tab = {
  label: 'SEO (Google & Social)',
  name: 'seo',
  fields: [
    {
      name: 'metaTitle',
      label: 'Search Engine Title (Google Title)',
      type: 'text',
      admin: {
        description: 'Recommended: 50–60 characters. Appears as the clickable blue headline in Google search results.',
      },
    },
    {
      name: 'metaDescription',
      label: 'Search Engine Description (Google Snippet)',
      type: 'textarea',
      admin: {
        description: 'Recommended: 120–160 characters. The preview summary paragraph shown below your headline in search results.',
      },
    },
    {
      name: 'ogImage',
      label: 'Social Share Preview Image (Facebook / LinkedIn / Twitter)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Recommended: 1200 × 630px. Image displayed when this page link is shared on WhatsApp, LinkedIn, or Facebook.',
      },
    },
  ],
}

export const navigationTab: Tab = {
  label: 'Menu & Sitemap',
  name: 'navigation',
  fields: [
    {
      name: 'navTitle',
      label: 'Navigation Menu Label',
      type: 'text',
      admin: {
        description: 'Short label used for menu links (leave blank to use the Page Title).',
      },
    },
    {
      name: 'hideFromNavigation',
      label: 'Hide from Main Header Navigation Menu',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'hideFromSitemap',
      label: 'Hide from On-Page HTML Sitemap',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'hideFromXMLSitemap',
      label: 'Hide from Search Engine XML Sitemap (Google indexing)',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export const listingLayoutTab: Tab = {
  label: 'Preview Card Info',
  name: 'listingLayout',
  fields: [
    {
      name: 'listingTitle',
      label: 'Preview Card Title',
      type: 'text',
      admin: {
        description: 'Title shown when this page is displayed inside service grids or card lists (defaults to Page Title).',
      },
    },
    {
      name: 'listingDescription',
      label: 'Preview Card Summary',
      type: 'richText',
      admin: {
        description: 'Brief 1-2 sentence description shown on teaser cards.',
      },
    },
    {
      name: 'listingImage',
      label: 'Preview Card Thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Recommended: 800 × 600px (JPG/WebP, under 1MB).',
      },
    },
  ],
}

export const scriptsTab: Tab = {
  label: 'Tracking Scripts',
  name: 'scripts',
  fields: [
    {
      name: 'headScript',
      label: 'Header Tracking Script (<head>)',
      type: 'textarea',
      admin: {
        description:
          'Custom code injected into <head> (e.g. Google Analytics, Tag Manager, or verification meta tags).',
        rows: 6,
      },
    },
    {
      name: 'bodyScript',
      label: 'Body Tracking Script (<body>)',
      type: 'textarea',
      admin: {
        description:
          'Custom code injected into <body> (e.g. Google Tag Manager noscript, chat widgets, tracking pixels).',
        rows: 6,
      },
    },
  ],
}

