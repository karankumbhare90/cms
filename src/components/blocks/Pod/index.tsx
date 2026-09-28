import React from 'react'
import Image from 'next/image'
import { getThemeClass } from '@/utils/theme'
import { getTextAlignment } from '@/utils/textAlign'
import { buildPagePath } from '@/utils/pageUtils'
import { IntroText } from '@/blocks/Shared/_IntroText'
import { IntroLinks } from '@/blocks/Shared/_IntroLinks'
import { TiArrowRight } from 'react-icons/ti'

export const Pod: React.FC<any> = ({
  introText,
  podItems,
  introLinks,
  settings,
  introTextPosition,
  itemsPerRow: itemsPerRowRaw,
  iconMode: iconModeRaw,
}) => {
  const themeClass = getThemeClass(settings)
  const textAlignment = getTextAlignment(settings)

  // introTextPosition, itemsPerRow and iconMode are top-level block fields,
  // NOT nested inside the `settings` group — so read them from direct props
  const introPosition = introTextPosition || 'above'
  const itemsPerRow = parseInt(itemsPerRowRaw || '3', 10)
  const iconMode = iconModeRaw === true

  let gridClass = 'grid-cols-1 md:grid-cols-2'
  if (itemsPerRow === 3) gridClass += ' lg:grid-cols-3'
  else if (itemsPerRow === 4) gridClass += ' lg:grid-cols-4'
  else if (itemsPerRow === 6) gridClass += ' lg:grid-cols-6'

  return (
    <section className={`pods ${themeClass} ${textAlignment}`} aria-label="Pod section">
      <div className="inner-wrap">
        <div className="container mx-auto">
          {introPosition === 'above' && (
            <div className="w-full">
              <IntroText introText={introText} />
            </div>
          )}

          {podItems && podItems.length > 0 && (
            <ul
              role="list"
              aria-label="Pod items"
              className={`w-full content-wrap grid gap-5 md:gap-6 lg:gap-8 ${gridClass} list-none`}
            >
              {podItems.map((item: any, idx: number) => {
                const url =
                  item.link?.type === 'custom'
                    ? item.link.url || null
                    : typeof item.link?.reference === 'object' && item.link.reference?.slug
                      ? buildPagePath(item.link.reference)
                      : null

                const CardWrapper = url
                  ? ({ children }: { children: React.ReactNode }) => (
                      <a
                        href={url}
                        aria-label={item.title || `Pod item ${idx + 1}`}
                        className="h-full group bg-[var(--color-1)] rounded-[12px] border border-[#E0EFFE] overflow-hidden hover:border-[var(--color-6)]/40 hover:shadow-lg transition-all duration-200 flex flex-col w-full !text-left no-underline"
                      >
                        {children}
                      </a>
                    )
                  : ({ children }: { children: React.ReactNode }) => (
                      <div className="h-full group bg-[var(--color-1)] rounded-[12px] border border-[#E0EFFE] overflow-hidden hover:border-[var(--color-6)]/40 hover:shadow-lg transition-all duration-200 flex flex-col w-full !text-left">
                        {children}
                      </div>
                    )

                return (
                  <li
                    key={idx}
                    role="listitem"
                    aria-label={item.title || `Pod item ${idx + 1}`}
                    className="w-full"
                  >
                    <CardWrapper>
                      {/* Full hero image — outside the content div, above it (normal mode only) */}
                      {item.image?.url && !iconMode && (
                        <div
                          className="relative w-full h-[200px] overflow-hidden bg-[var(--title-colour-light-bg)]"
                          aria-hidden="true"
                        >
                          <Image
                            src={item.image.url}
                            alt={item.image.alt || item.title || ''}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={75}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          />
                        </div>
                      )}

                      <div className="p-6 flex flex-col gap-3 flex-1">
                        {/* Icon — inside the content div, shares same padding as heading/description (icon mode only) */}
                        {item.image?.url && iconMode && (
                          <div
                            aria-hidden="true"
                            style={{
                              display: 'inline-flex',
                              width: 'fit-content',
                            }}
                          >
                            <Image
                              src={item.image.url}
                              alt={item.image.alt || item.title || ''}
                              width={32}
                              height={32}
                              quality={80}
                              loading="lazy"
                              style={{
                                width: 32,
                                height: 32,
                                objectFit: 'contain',
                                display: 'block',
                              }}
                            />
                          </div>
                        )}

                        {item.title && (
                          <h3 className="text-[18px] lg:text-[20px] font-semibold text-[var(--title-colour-light-bg)] group-hover:text-[var(--color-6)] transition-colors m-0">
                            {item.title}
                          </h3>
                        )}
                        {item.content && (
                          <p className="text-[15px] lg:text-[16px] text-[var(--fonts-color-base)] leading-[1.65] m-0 flex-grow">
                            {item.content}
                          </p>
                        )}

                        {item.link?.label && url && (
                          <span className="mt-auto pt-2 flex items-center gap-1 text-[14px] font-semibold text-[var(--color-6)] group-hover:gap-2 transition-all">
                            {item.link.label}
                            <TiArrowRight className="w-5 h-5" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    </CardWrapper>
                  </li>
                )
              })}
            </ul>
          )}

          {introPosition === 'below' && (
            <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto mt-16 flex flex-col items-center">
              <IntroText introText={introText} />
            </div>
          )}

          {introLinks && introLinks.length > 0 && (
            <div className="mt-12 flex justify-center">
              <IntroLinks introLinks={introLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
