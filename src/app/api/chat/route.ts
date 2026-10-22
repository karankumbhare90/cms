import { streamText } from 'ai'
import { NextResponse } from 'next/server'
import { sanitizeString, SECURITY_HEADERS } from '@/utils/security'
import { checkRateLimit, getClientIP } from '@/utils/rateLimit'
import { fallbackModel } from '@/utils/aiProvider'
import { getChatSiteContextCached, buildChatSystemPrompt } from '@/utils/chatContext'

export const maxDuration = 45

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

    // Extract and sanitize message text from UI messages (which may contain `parts` instead of `content`)
    const sanitizedMessages = Array.isArray(messages)
      ? messages.map((m: any) => {
          let text = ''
          if (typeof m.content === 'string') {
            text = m.content
          } else if (Array.isArray(m.parts)) {
            text = m.parts
              .map((p: any) => (typeof p === 'string' ? p : p.text || p.content || ''))
              .join('')
          }

          return {
            role: m.role || 'user',
            content: sanitizeString(text),
          }
        })
      : []

    // Fetch live, cached site context (blogs, services, pages) to provide accurate answers
    const siteContext = await getChatSiteContextCached()
    const systemPrompt = buildChatSystemPrompt(siteContext)

    const result = await streamText({
      model: fallbackModel,
      messages: sanitizedMessages,
      system: systemPrompt,
    })

    return result.toUIMessageStreamResponse()
  } catch (error: any) {
    console.error('Error in chat route:', error)
    const errorMessage =
      error?.message || 'An error occurred while processing your request.'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: SECURITY_HEADERS },
    )
  }
}
