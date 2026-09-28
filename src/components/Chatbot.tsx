'use client'

import { useChat } from '@ai-sdk/react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Chatbot() {
  const { messages, sendMessage, status, error, clearError } = useChat()
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const isLoading = status === 'submitted' || status === 'streaming'

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    if (error) clearError()
    ;(sendMessage as any)({ text: inputValue })
    setInputValue('')
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

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[var(--color-7,#2563EB)] text-white rounded-full p-4 shadow-xl hover:opacity-90 transition-all flex items-center justify-center"
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
            className="fixed bottom-20 right-4 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden text-black"
          >
            <div className="bg-[#0C1E33] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-semibold text-lg">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white text-sm w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close Chatbot"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-6 text-sm">
                  👋 Hi! How can I help you with our project today?
                </div>
              )}
              {messages.map((m: any) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'bg-[#2563EB] text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {getMessageText(m)}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex w-full justify-start mt-2">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none flex space-x-1.5 items-center">
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
                  <div className="max-w-[85%] p-3 rounded-2xl text-sm bg-red-50 text-red-700 border border-red-200">
                    I'm sorry, I encountered an error while processing your request. Please try again.
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="p-3 border-t border-gray-100 bg-gray-50 flex gap-2">
              <input
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-black transition-all"
                value={inputValue}
                placeholder="Ask a question..."
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-[#2563EB] text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 transition-all hover:bg-blue-700 shadow-sm"
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
