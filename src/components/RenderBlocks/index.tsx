import React from 'react'
import { Hero } from '../blocks/Hero'
import { Content } from '../blocks/Content'
import { Text } from '../blocks/Text'
import { TextWithImage } from '../blocks/TextWithImage'
import { CTA } from '../blocks/CTA'
import { Counter } from '../blocks/Counter'
import { TextWithVideo } from '../blocks/TextWithVideo'
import { Pod } from '../blocks/Pod'
import { FAQ } from '../blocks/FAQ'
import { Testimonial } from '../blocks/Testimonial'
import { LogoGrid } from '../blocks/LogoGrid'
import { PricingTable } from '../blocks/PricingTable'
import { TeamGrid } from '../blocks/TeamGrid'
import { MediaGallery } from '../blocks/MediaGallery'
import { Map } from '../blocks/Map'
import { Tabs } from '../blocks/Tabs'
import { ComparisonTable } from '../blocks/ComparisonTable'
import { CountdownTimer } from '../blocks/CountdownTimer'
import { NoticeBanner } from '../blocks/NoticeBanner'
import { Timeline } from '../blocks/Timeline'
import { ProcessSteps } from '../blocks/ProcessSteps'
import { PortfolioGrid } from '../blocks/PortfolioGrid'
import { Sitemap } from '../blocks/Sitemap'

const blockComponents = {
  hero: Hero,
  content: Content,
  text: Text,
  textWithImage: TextWithImage,
  cta: CTA,
  counter: Counter,
  textWithVideo: TextWithVideo,
  pod: Pod,
  faq: FAQ,
  testimonial: Testimonial,
  logoGrid: LogoGrid,
  pricingTable: PricingTable,
  teamGrid: TeamGrid,
  mediaGallery: MediaGallery,
  map: Map,
  tabs: Tabs,
  comparisonTable: ComparisonTable,
  countdownTimer: CountdownTimer,
  noticeBanner: NoticeBanner,
  timeline: Timeline,
  processSteps: ProcessSteps,
  portfolioGrid: PortfolioGrid,
  sitemap: Sitemap,
  // we will add more as we build them
}

export const RenderBlocks: React.FC<{ blocks: any[] }> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const { blockType } = block
        
        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents]

          if (Block) {
            return <Block key={index} id={`block-${index}`} {...block} />
          }
        }
        
        return null
      })}
    </div>
  )
}
