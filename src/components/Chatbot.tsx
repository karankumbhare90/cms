'use client'

import { useChat } from '@ai-sdk/react'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/**
 * Lightweight, safe markdown formatter for chat responses:
 * Handles bold-links (**[text](url)**), links ([text](url)), bold (**text**), italics (*text*), bullet lists, headings, and paragraphs.
 */
function FormattedMessage({ text, isUser }: { text: string; isUser: boolean }) {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{text}</div>
  }

  const renderInline = (str: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = []
    // Match:
    // 1: **[label](url)** (bold link)
    // 2 & 3: label, url
    // 4: [label](url) (standard link)
    // 5 & 6: label, url
    // 7: **text** (bold)
    // 8: text
    // 9: *text* (italic)
    // 10: text
    const regex =
      /(\*\*\[(.*?)\]\((.*?)\)\*\*|\[(.*?)\]\((.*?)\)|\*\*(.*?)\*\*|\*(.*?)\*)/g

    let lastIndex = 0
    let match: RegExpExecArray | null
    let keyIdx = 0

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(str.slice(lastIndex, match.index))
      }

      const fullMatch = match[1]

      if (fullMatch.startsWith('**[')) {
        const label = match[2]
        const href = match[3]
        const isInternal = href.startsWith('/')
        nodes.push(
          <strong key={`bl-${keyIdx++}`} className="font-semibold">
            {isInternal ? (
              <Link
                href={href}
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                {label}
              </Link>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                {label}
              </a>
            )}
          </strong>,
        )
      } else if (fullMatch.startsWith('[')) {
        const label = match[4]
        const href = match[5]
        const isInternal = href.startsWith('/')
        nodes.push(
          isInternal ? (
            <Link
              key={`l-${keyIdx++}`}
              href={href}
              className="text-blue-600 underline font-medium hover:text-blue-800 transition-colors"
            >
              {label}
            </Link>
          ) : (
            <a
              key={`l-${keyIdx++}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-medium hover:text-blue-800 transition-colors"
            >
              {label}
            </a>
          ),
        )
      } else if (fullMatch.startsWith('**')) {
        nodes.push(
          <strong key={`b-${keyIdx++}`} className="font-semibold text-gray-900">
            {match[6]}
          </strong>,
        )
      } else if (fullMatch.startsWith('*')) {
        nodes.push(
          <em key={`i-${keyIdx++}`} className="italic text-gray-800">
            {match[7]}
          </em>,
        )
      }

      lastIndex = regex.lastIndex
    }

    if (lastIndex < str.length) {
      nodes.push(str.slice(lastIndex))
    }

    return nodes
  }

  // Parse lines
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: React.ReactNode[] = []

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="space-y-1 my-2 ml-4 list-disc text-gray-800">
          {listItems}
        </ul>,
      )
      listItems = []
    }
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim()

    if (!line) {
      flushList(`flush-${index}`)
      return
    }

    // Horizontal rule
    if (line === '---' || line === '***') {
      flushList(`hr-flush-${index}`)
      elements.push(<hr key={`hr-${index}`} className="my-2 border-gray-200" />)
      return
    }

    // Headings (### or ##)
    if (line.startsWith('### ')) {
      flushList(`h3-flush-${index}`)
      elements.push(
        <h4 key={`h3-${index}`} className="font-semibold text-gray-900 text-sm mt-3 mb-1">
          {renderInline(line.replace('### ', ''))}
        </h4>,
      )
      return
    }
    if (line.startsWith('## ')) {
      flushList(`h2-flush-${index}`)
      elements.push(
        <h3 key={`h2-${index}`} className="font-bold text-gray-900 text-sm mt-3 mb-1">
          {renderInline(line.replace('## ', ''))}
        </h3>,
      )
      return
    }

    // Bullet item (* or -)
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const itemContent = line.replace(/^[\*\-]\s+/, '')
      listItems.push(
        <li key={`li-${index}`} className="leading-snug">
          {renderInline(itemContent)}
        </li>,
      )
      return
    }

    // Numbered item (e.g. 1. )
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/)
    if (numberedMatch) {
      flushList(`num-flush-${index}`)
      elements.push(
        <div key={`num-${index}`} className="flex items-start gap-2 my-1">
          <span className="font-semibold text-blue-600 shrink-0">{numberedMatch[1]}.</span>
          <div className="leading-snug">{renderInline(numberedMatch[2])}</div>
        </div>,
      )
      return
    }

    // Normal paragraph line
    flushList(`p-flush-${index}`)
    elements.push(
      <p key={`p-${index}`} className="my-1.5 leading-relaxed">
        {renderInline(line)}
      </p>,
    )
  })

  flushList('final-flush')

  return <div className="space-y-0.5 text-sm">{elements}</div>
}

const STARTER_PROMPTS = [
  'Tell me about your blogs',
  'What services do you offer?',
  'Why does website speed matter?',
  'How do I get a free quote?',
]

export function Chatbot({ initialOpen = false }: { initialOpen?: boolean } = {}) {
  const { messages, sendMessage, status, error, clearError, setMessages } = useChat()
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLoading = status === 'submitted' || status === 'streaming'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, status, isOpen])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    if (error) clearError()
    ;(sendMessage as any)({ text: inputValue.trim() })
    setInputValue('')
  }

  const handleSendPrompt = (promptText: string) => {
    if (isLoading) return
    if (error) clearError()
    ;(sendMessage as any)({ text: promptText })
  }

  const getMessageText = (m: any): string => {
    if (typeof m.content === 'string') return m.content
    if (Array.isArray(m.parts)) {
      return m.parts
        .map((part: any) => (typeof part === 'string' ? part : part.text || part.content || ''))
        .join('')
    }
    return ''
  }

  const handleToggle = (nextOpen: boolean) => {
    setIsOpen(nextOpen)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('chatbot:toggle', { detail: { isOpen: nextOpen } }))
    }
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleToggle(!isOpen)}
          className="w-14 h-14 bg-[var(--color-7,#2563EB)] text-white rounded-full shadow-xl hover:opacity-95 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label="Toggle AI Chatbot"
        >
          {isOpen ? (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
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
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[340px] sm:w-[400px] h-[540px] max-h-[82vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden text-black"
          >
            {/* Header */}
            <div className="bg-[#0C1E33] text-white px-4 py-3.5 flex items-center justify-between border-b border-white/10">
              <div className="flex flex-col items-start gap-2.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold textx-base leading-tight">WebNexa Assistant</h3>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-white/60 mt-0">Fast answers & project guidance</p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={() => {
                      if (typeof setMessages === 'function') setMessages([])
                      if (error) clearError()
                    }}
                    title="Clear Conversation"
                    className="text-white/70 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => handleToggle(false)}
                  className="text-white/80 hover:text-white text-sm w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close Chatbot"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center p-2 mt-4 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-sm border border-blue-100/50">
                    💬
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">Welcome to WebNexa!</h4>
                    <p className="text-sm text-gray-500 mt-1 max-w-[260px] leading-relaxed">
                      Ask about our digital design & development services, browse our 9 blog
                      articles, or get a custom project quote.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 w-full pt-2">
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider text-left pl-1">
                      Suggested questions
                    </p>
                    {STARTER_PROMPTS.map((promptText) => (
                      <button
                        key={promptText}
                        type="button"
                        onClick={() => handleSendPrompt(promptText)}
                        className="text-sm text-left bg-gray-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-gray-200 text-gray-700 rounded-xl px-3 py-2 transition-all flex items-center justify-between group"
                      >
                        <span>{promptText}</span>
                        <span className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m: any) => {
                const isUser = m.role === 'user'
                const text = getMessageText(m)
                if (!text && !isLoading) return null

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-[#2563EB] text-white rounded-br-none text-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none text-sm border border-gray-200/60'
                      }`}
                    >
                      <FormattedMessage text={text} isUser={isUser} />
                    </div>
                  </motion.div>
                )
              })}

              {isLoading && (
                <div className="flex w-full justify-start mt-2">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none flex space-x-1.5 items-center border border-gray-200/60">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex w-full justify-start mt-2">
                  <div className="max-w-[88%] p-3 rounded-2xl text-xs bg-red-50 text-red-700 border border-red-200">
                    {error.message ||
                      "I'm sorry, I encountered an issue connecting. Please try again or reach out to us at /contact-us."}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={onSubmit}
              className="p-3 border-t border-gray-100 bg-gray-50 flex gap-2"
            >
              <input
                className="flex-1 px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-black transition-all"
                value={inputValue}
                placeholder="Ask about services, blogs, pricing..."
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-[#2563EB] text-white px-4 py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 transition-all hover:bg-blue-700 shadow-sm shrink-0"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
