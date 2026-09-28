import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { DynamicRichText } from '@/blocks/Shared/DynamicRichText'
import { buildPagePath } from '@/utils/pageUtils'

export const NoticeBanner: React.FC<any> = ({ message, introLinks, bannerType, settings }) => {
  const themeClass = getThemeClass(settings)
  const customClass = settings.customClass || ''

  let borderLeftColor = 'border-l-blue-500'
  let iconClass = 'text-blue-500'

  if (bannerType === 'success') {
    borderLeftColor = 'border-l-green-500'
    iconClass = 'text-green-500'
  } else if (bannerType === 'warning') {
    borderLeftColor = 'border-l-yellow-500'
    iconClass = 'text-yellow-500'
  }

  return (
    <div className={`notice-banner ${themeClass} ${customClass}`}>
      <div className="inner-wrap">
        <div className="container">
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border border-[#E0EFFE] border-l-[4px] rounded-[12px] bg-[var(--color-1)] shadow-sm ${borderLeftColor}`}
          >
            <div className="flex items-start sm:items-center gap-4">
              <span className={`flex-shrink-0 mt-1 sm:mt-0 ${iconClass}`}>
                {bannerType === 'info' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                {bannerType === 'success' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                {bannerType === 'warning' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                )}
              </span>
              <div className="text-[15px] text-[var(--fonts-color-base)] leading-[1.8]">
                {message && (
                  <DynamicRichText
                    content={message}
                    className="rich-text-content mt-0 !text-[15px] !leading-[1.8]"
                  />
                )}
              </div>
            </div>

            {introLinks && introLinks.length > 0 && (
              <div className="mt-4 sm:mt-0 flex gap-3 sm:ml-6 flex-shrink-0">
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

                  const baseClass = `btn button-secondary`

                  return (
                    <a key={idx} href={url} className={baseClass}>
                      {link.label}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
