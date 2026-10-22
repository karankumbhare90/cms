import { NextResponse } from 'next/server'
import { SITE_NAME, SITE_URL } from '@/config/site'

export const dynamic = 'force-dynamic'

export async function GET() {
  const hostDomain = SITE_URL.replace(/^https?:\/\//, '')
  const catalogManifest = {
    specVersion: '1.0',
    host: {
      displayName: `${SITE_NAME} CMS`,
      identifier: `urn:air:${hostDomain}`,
      documentationUrl: `${SITE_URL}/llms.txt`,
    },
    entries: [
      {
        identifier: `urn:air:${hostDomain}:api:chat`,
        displayName: `${SITE_NAME} AI Assistant`,
        type: 'application/json',
        url: `${SITE_URL}/api/chat`,
        description: `Interactive AI assistant capable of answering questions about ${SITE_NAME} CMS, technical capabilities, and digital services.`,
        tags: ['ai-assistant', 'customer-support', 'chatbot'],
        capabilities: ['Chatbot', 'Assistant', 'QuestionAnswering'],
        representativeQueries: [
          `What services does ${SITE_NAME} provide?`,
          `How do I contact ${SITE_NAME} for a web project?`,
          `Tell me about ${SITE_NAME} CMS features`,
        ],
      },
      {
        identifier: `urn:air:${hostDomain}:api:contact`,
        displayName: `${SITE_NAME} Contact Inquiries API`,
        type: 'application/json',
        url: `${SITE_URL}/api/contact`,
        description: 'Inquiry and lead submission API for prospective clients and partners.',
        tags: ['inquiry', 'contact', 'leads'],
        capabilities: ['ContactForm', 'LeadSubmission'],
        representativeQueries: [
          `Submit a project inquiry to ${SITE_NAME}`,
          'Request a quote for digital development services',
        ],
      },
    ],
  }

  return new NextResponse(JSON.stringify(catalogManifest, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
