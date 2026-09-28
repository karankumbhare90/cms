import Image from 'next/image'
import React from 'react'

interface TeamCardProps {
  member?: any
  enableCarousel?: boolean
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, enableCarousel }) => {
  if (!member) return null

  return (
    <div
      className={`group bg-[var(--color-1)] rounded-xl border border-[#E0EFFE] overflow-hidden hover:border-[var(--color-6)]/40 hover:shadow-lg transition-all duration-200 flex flex-col !text-left cursor-pointer ${
        enableCarousel ? 'min-w-[280px] snap-center shrink-0' : ''
      }`}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-[var(--title-colour-light-bg)]">
        {member?.image?.url ? (
          <Image
            src={member.image.url}
            alt={member?.name || 'Team Member'}
            fill
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl text-[var(--color-5)] font-bold">
            {member?.name?.charAt(0) || 'T'}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-1 flex-1">
        {member?.name && (
          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-[var(--title-colour-light-bg)] group-hover:text-[var(--color-6)] transition-colors m-0">
            {member.name}
          </h3>
        )}
        {member?.designation && (
          <p className="text-sm lg:text-base text-[var(--fonts-color-base)] leading-[1.65] m-0">
            {member.designation}
          </p>
        )}
        {member?.experienceOrJoiningDate && (
          <p className="text-xs lg:text-sm text-[var(--fonts-color-base)] opacity-80 leading-[1.65] m-0">
            {member.experienceOrJoiningDate} Year's of Experience
          </p>
        )}
      </div>
    </div>
  )
}
