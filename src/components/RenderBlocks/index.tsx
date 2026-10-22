import React from 'react'
import dynamic from 'next/dynamic'
import { AnimateOnScroll } from '../AnimateOnScroll'
import { Hero } from '../blocks/Hero'

const blockComponents = {
  hero: Hero,
  content: dynamic(() => import('../blocks/Content').then((m) => m.Content)),
  text: dynamic(() => import('../blocks/Text').then((m) => m.Text)),
  textWithImage: dynamic(() => import('../blocks/TextWithImage').then((m) => m.TextWithImage)),
  cta: dynamic(() => import('../blocks/CTA').then((m) => m.CTA)),
  counter: dynamic(() => import('../blocks/Counter').then((m) => m.Counter)),
  textWithVideo: dynamic(() => import('../blocks/TextWithVideo').then((m) => m.TextWithVideo)),
  pod: dynamic(() => import('../blocks/Pod').then((m) => m.Pod)),
  faq: dynamic(() => import('../blocks/FAQ').then((m) => m.FAQ)),
  testimonial: dynamic(() => import('../blocks/Testimonial').then((m) => m.Testimonial)),
  logoGrid: dynamic(() => import('../blocks/LogoGrid').then((m) => m.LogoGrid)),
  pricingTable: dynamic(() => import('../blocks/PricingTable').then((m) => m.PricingTable)),
  teamGrid: dynamic(() => import('../blocks/TeamGrid').then((m) => m.TeamGrid)),
  mediaGallery: dynamic(() => import('../blocks/MediaGallery').then((m) => m.MediaGallery)),
  map: dynamic(() => import('../blocks/Map').then((m) => m.Map)),
  tabs: dynamic(() => import('../blocks/Tabs').then((m) => m.Tabs)),
  comparisonTable: dynamic(() => import('../blocks/ComparisonTable').then((m) => m.ComparisonTable)),
  countdownTimer: dynamic(() => import('../blocks/CountdownTimer').then((m) => m.CountdownTimer)),
  noticeBanner: dynamic(() => import('../blocks/NoticeBanner').then((m) => m.NoticeBanner)),
  timeline: dynamic(() => import('../blocks/Timeline').then((m) => m.Timeline)),
  processSteps: dynamic(() => import('../blocks/ProcessSteps').then((m) => m.ProcessSteps)),
  portfolioGrid: dynamic(() => import('../blocks/PortfolioGrid').then((m) => m.PortfolioGrid)),
  sitemap: dynamic(() => import('../blocks/Sitemap').then((m) => m.Sitemap)),
  contactUs: dynamic(() => import('../blocks/ContactUs').then((m) => m.ContactUs)),
}

export const RenderBlocks: React.FC<{ blocks: any[] }> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const { blockType } = block

        if (block?.settings?.hideComponent) {
          return null
        }

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents]

          if (Block) {
            if (blockType === 'hero') {
              return <Block key={index} id={`block-${index}`} {...block} />
            }
            return (
              <AnimateOnScroll key={index}>
                <Block id={`block-${index}`} {...block} />
              </AnimateOnScroll>
            )
          }
        }

        return null
      })}
    </div>
  )
}

export { RenderBlocksSkeleton } from '../blocks/skeletons'

