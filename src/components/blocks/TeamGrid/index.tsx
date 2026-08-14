import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const TeamGrid: React.FC<any> = ({ introText, teamMembers, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const itemsPerRow = parseInt(settings?.itemsPerRow || '4', 10)
  const enableCarousel = settings?.enableCarousel

  let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
  if (itemsPerRow === 4) gridClass += ' lg:grid-cols-4'

  return (
    <section className={`py-16 md:py-24 ${themeClass} ${textAlignment}`}>
      <div className="container mx-auto px-6">
        <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mb-16 flex flex-col items-center text-center">
          <IntroText introText={introText} />
        </div>

        {teamMembers && teamMembers.length > 0 && (
          <div className={`grid gap-8 ${enableCarousel ? 'flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8' : gridClass}`}>
            {teamMembers.map((member: any, idx: number) => (
              <div 
                key={idx} 
                className={`flex flex-col group ${enableCarousel ? 'min-w-[280px] snap-center shrink-0' : ''}`}
              >
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800 shadow-lg">
                  {member.image?.url ? (
                    <img 
                      src={member.image.url} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl text-gray-300">
                      {member.name?.charAt(0)}
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-500 font-semibold mb-2">{member.designation}</p>
                {member.experienceOrJoiningDate && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {member.experienceOrJoiningDate}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {introLinks && introLinks.length > 0 && (
          <div className="mt-16 flex justify-center">
            <IntroLinks introLinks={introLinks} />
          </div>
        )}
      </div>
    </section>
  )
}
