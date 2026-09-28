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
  label: 'Banner',
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
    {
      name: 'displayOverlay',
      type: 'checkbox',
      defaultValue: true,
      label: 'Display Overlay',
      admin: {
        description:
          'Show a dark overlay over the banner background image to improve text readability.',
        condition: (_, siblingData) => Boolean(siblingData?.bannerBackground),
      },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Overlay Opacity (%)',
      defaultValue: 50,
      min: 0,
      max: 100,
      admin: {
        description: 'Controls how dark the overlay is (0 = transparent, 100 = fully opaque).',
        condition: (_, siblingData) =>
          Boolean(siblingData?.bannerBackground) && siblingData?.displayOverlay === true,
      },
    },
  ],
}

export const widgetsTab: Tab = {
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
}

export const seoTab: Tab = {
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
}

export const navigationTab: Tab = {
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
}

export const listingLayoutTab: Tab = {
  label: 'Listing Layout',
  name: 'listingLayout',
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
}
