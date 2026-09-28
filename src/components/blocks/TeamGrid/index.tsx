import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import { TeamCard } from './TeamCard'

export const TeamGrid: React.FC<any> = ({ introText, teamMembers, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(settings?.itemsPerRow || '4', 10)
  const enableCarousel = settings?.enableCarousel

  let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
  if (itemsPerRow === 4) gridClass += ' lg:grid-cols-4'

  return (
    <section className={`team-grid-component ${themeClass} ${textAlignment}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {teamMembers && teamMembers.length > 0 && (
            <div
              className={`content-wrap grid gap-8 ${enableCarousel ? 'flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8' : gridClass}`}
            >
              {teamMembers.map((member: any, idx: number) => (
                <TeamCard key={idx} member={member} enableCarousel={enableCarousel} />
              ))}
            </div>
          )}

          {introLinks && introLinks.length > 0 && (
            <div className="w-full">
              <IntroLinks introLinks={introLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
