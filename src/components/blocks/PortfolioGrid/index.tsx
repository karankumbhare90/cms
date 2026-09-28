import React from 'react'
import Image from 'next/image'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'

export const PortfolioGrid: React.FC<any> = ({
  introText,
  introLinks,
  portfolioItems,
  settings,
  itemsPerRow,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)
  const customClass = settings.customClass || ''

  let gridColsClass = 'lg:grid-cols-3'
  if (itemsPerRow === '2') gridColsClass = 'lg:grid-cols-2'
  if (itemsPerRow === '4') gridColsClass = 'lg:grid-cols-4'

  return (
    <section className={`portfolio-grid ${themeClass} ${textAlignment} ${customClass}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="w-full">
            <IntroText introText={introText} />
          </div>

          {portfolioItems && portfolioItems.length > 0 && (
            <div className={`content-wrap grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-8`}>
              {portfolioItems.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="group bg-[var(--color-1)] rounded-[14px] p-6 lg:p-7 border border-[#E0EFFE] flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(37,99,235,0.12)] hover:border-[var(--color-6)]/50"
                >
                  {item.image?.url && (
                    <div className="relative w-full rounded-[12px] overflow-hidden aspect-video bg-gray-100">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.title}
                        width={600}
                        height={400}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={75}
                        loading="lazy"
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-cover"
                      />
                      {item.link && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <a
                            href={item.link}
                            className="btn button-primary no-arrow !py-2 !px-5 !text-sm"
                          >
                            View Project
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex-grow flex flex-col items-start w-full mt-2 gap-4">
                    <div className="flex flex-col gap-2.5 items-start justify-start flex-grow">
                      <h3 className="text-lg  lg:text-xl font-bold text-[var(--title-colour-light-bg)] leading-[1.3]">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm lg:text-base text-[var(--fonts-color-base)] leading-[1.8] !m-0 flex-grow">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.link && !item.image?.url && (
                      <a
                        href={item.link}
                        className="text-xs lg:text-sm !no-underline inline-flex items-center text-[var(--color-6)] font-semibold hover:underline mt-auto"
                      >
                        View Project
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
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
