'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const LexicalRichText = dynamic(
  async () => {
    const mod = await import('@payloadcms/richtext-lexical/react')
    const RichTextComponent = mod.RichText
    const LinkJSXConverter = mod.LinkJSXConverter

    return function WrappedRichText({ content, className }: { content: any; className?: string }) {
      return (
        <RichTextComponent
          className={className || 'rich-text-content'}
          data={content}
          converters={({ defaultConverters }) => ({
            ...defaultConverters,
            ...LinkJSXConverter({
              internalDocToHref: ({ linkNode }: any) => {
                const doc = linkNode.fields?.doc
                if (!doc) return '#'
                const { relationTo, value } = doc
                if (typeof value !== 'object') {
                  return `/${relationTo}/${value}`
                }
                if (relationTo === 'pages') {
                  return value.slug === 'home' ? '/' : `/${value.slug}`
                }
                return `/${relationTo}/${value.slug || value.id}`
              },
            }),
          })}
        />
      )
    }
  },
  { ssr: true }
)

export const DynamicRichText: React.FC<{ content: any; className?: string }> = ({
  content,
  className,
}) => {
  if (!content) return null
  return <LexicalRichText content={content} className={className} />
}
