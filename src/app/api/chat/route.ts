import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { NextResponse } from 'next/server'
import { sanitizeString, SECURITY_HEADERS } from '@/utils/security'
import { checkRateLimit, getClientIP } from '@/utils/rateLimit'

export const maxDuration = 30

export async function POST(req: Request) {
  // Rate limiting (15 requests per minute per IP)
  const clientIP = getClientIP(req)
  const rateLimit = checkRateLimit(`chat_${clientIP}`, {
    limit: 15,
    windowMs: 60 * 1000,
  })

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait a moment before sending more messages.' },
      {
        status: 429,
        headers: {
          ...SECURITY_HEADERS,
          'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
        },
      },
    )
  }

  try {
    const { messages } = await req.json()

    // Sanitize message content to prevent prompt injection / XSS payloads
    const sanitizedMessages = Array.isArray(messages)
      ? messages.map((m: any) => ({
          ...m,
          content: typeof m.content === 'string' ? sanitizeString(m.content) : m.content,
        }))
      : []

    const result = await streamText({
      model: google('gemini-3.8-flash'),
      messages: sanitizedMessages,
      system:
        'You are an AI assistant exclusively for this website. You must only answer questions that are directly related to this project and its content. If a user asks a question about anything outside the scope of this project, you must politely refuse to answer and state that you are only programmed to discuss topics related to this project.',
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error in chat route:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500, headers: SECURITY_HEADERS },
    )
  }
}
