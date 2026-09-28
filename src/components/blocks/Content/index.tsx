import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { buildPagePath } from '@/utils/pageUtils'

export const Content: React.FC<any> = ({ introText, introLinks, settings }) => {
  const themeClass = getThemeClass(settings)

  return (
    <section className={`py-24 bg-white ${themeClass}`}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="w-full">
          {introText ? (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  typeof introText === 'string'
                    ? introText
                    : '<h2>Content goes here</h2><p>Provide content in the CMS.</p>',
              }}
            />
          ) : (
            <>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="mb-6">
                At SilverPoint, we believe in the power of digital transformation. Our team of
                experts works tirelessly to deliver solutions that not only look beautiful but also
                perform exceptionally well under the hood.
              </p>
              <p>
                Whether you need a simple landing page or a complex web application, we have the
                skills and experience to bring your ideas to life.
              </p>
            </>
          )}
        </div>

        {introLinks && introLinks.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-4">
            {introLinks.map((link: any, idx: number) => {
              const pageObj =
                typeof link.reference === 'object' && link.reference !== null && 'value' in link.reference
                  ? link.reference.value
                  : link.reference
              const url =
                link.type === 'custom'
                  ? link.url
                  : typeof pageObj === 'object' && pageObj !== null
                    ? buildPagePath(pageObj)
                    : '#'
              return (
                <a
                  key={idx}
                  href={url}
                  className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-md font-semibold transition-colors"
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
