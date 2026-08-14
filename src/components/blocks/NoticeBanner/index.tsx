import React from 'react'
import { getThemeClass } from '@/utils/theme'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const NoticeBanner: React.FC<any> = ({ message, introLinks, bannerType, settings }) => {
  const themeClass = getThemeClass(settings)

  let bgColorClass = 'bg-blue-50 border-blue-200 text-blue-800'
  let iconClass = 'text-blue-500'
  
  if (bannerType === 'success') {
    bgColorClass = 'bg-green-50 border-green-200 text-green-800'
    iconClass = 'text-green-500'
  } else if (bannerType === 'warning') {
    bgColorClass = 'bg-yellow-50 border-yellow-200 text-yellow-800'
    iconClass = 'text-yellow-600'
  }

  return (
    <div className={`py-4 ${themeClass}`}>
      <div className="container mx-auto px-6">
        <div className={`flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg ${bgColorClass}`}>
          <div className="flex items-center gap-3">
            <span className={iconClass}>
              {bannerType === 'info' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {bannerType === 'success' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {bannerType === 'warning' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </span>
            <div className="prose prose-sm max-w-none text-current">
              {message && <RichText data={message} />}
            </div>
          </div>

          {introLinks && introLinks.length > 0 && (
            <div className="mt-3 sm:mt-0 flex gap-2">
              {introLinks.map((link: any, idx: number) => {
                const url = link.type === 'custom' ? link.url : (typeof link.reference?.value === 'object' ? `/${link.reference.value.slug}` : '#')
                return (
                  <a 
                    key={idx}
                    href={url}
                    className="px-4 py-2 bg-white/50 hover:bg-white border border-current rounded font-medium text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
