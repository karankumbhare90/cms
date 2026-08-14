import React from 'react'
import { TiArrowRight } from 'react-icons/ti'

export const IntroLinks = ({ introLinks }: { introLinks: any[] }) => {
  if (!introLinks || introLinks.length === 0) {
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <a href="#" className="btn button-primary">
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
              ? `/${link.reference.value.slug}`
              : '#'

        const linkClass =
          link.appearance === 'secondary' || link.appearance === 'outline'
            ? 'btn button-secondary'
            : 'btn button-primary'

        return (
          <a key={idx} href={url || '#'} className={linkClass}>
            {link.label}
            <TiArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </a>
        )
      })}
    </div>
  )
}
