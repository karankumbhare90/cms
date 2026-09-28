import React from 'react'
import { TiArrowRight } from 'react-icons/ti'
import { buildPagePath } from '@/utils/pageUtils'

export const IntroLinks = ({
  introLinks,
  className,
}: {
  introLinks: any[]
  className?: string
}) => {
  if (!introLinks || introLinks.length === 0) {
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <a href="#" className={`btn button-primary ${className || ''}`.trim()}>
          Get Started
        </a>
        <a href="#" className="btn button-secondary">
          Learn More
        </a>
      </div>
    )
  }

  return (
    <div className="button-group">
      {introLinks.map((link: any, idx: number) => {
        if (!link) return null

        const url =
          link.type === 'custom'
            ? link.url
            : typeof link.reference?.value === 'object'
              ? buildPagePath(link.reference.value)
              : typeof link.reference === 'object' && link.reference?.slug
                ? buildPagePath(link.reference)
                : '#'

        const baseClass =
          link.appearance === 'secondary' || link.appearance === 'outline'
            ? 'btn button-secondary'
            : 'btn button-primary'

        const linkClass = className ? `${baseClass} ${className}` : baseClass

        return (
          <a key={idx} href={url || '#'} className={linkClass}>
            {link.label}
          </a>
        )
      })}
    </div>
  )
}
