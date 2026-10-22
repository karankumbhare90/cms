import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

const catalogManifest = {
  $schema: 'https://raw.githubusercontent.com/ards-project/ard-spec/main/spec/schemas/ai-catalog.schema.json',
  specVersion: '1.0',
  host: {
    displayName: 'WebNexa CMS',
    identifier: 'urn:air:webnexacms.vercel.app',
    documentationUrl: 'https://webnexacms.vercel.app/llms.txt',
  },
  entries: [
    {
      identifier: 'urn:air:webnexacms.vercel.app:api:chat',
      displayName: 'WebNexa AI Assistant',
      type: 'application/json',
      url: 'https://webnexacms.vercel.app/api/chat',
      description: 'Interactive AI assistant capable of answering questions about WebNexa CMS, technical capabilities, and digital services.',
      tags: ['ai-assistant', 'customer-support', 'chatbot'],
      capabilities: ['Chatbot', 'Assistant', 'QuestionAnswering'],
      representativeQueries: [
        'What services does WebNexa provide?',
        'How do I contact WebNexa for a web project?',
        'Tell me about WebNexa CMS features',
      ],
    },
    {
      identifier: 'urn:air:webnexacms.vercel.app:api:contact',
      displayName: 'WebNexa Contact Inquiries API',
      type: 'application/json',
      url: 'https://webnexacms.vercel.app/api/contact',
      description: 'Inquiry and lead submission API for prospective clients and partners.',
      tags: ['inquiry', 'contact', 'leads'],
      capabilities: ['ContactForm', 'LeadSubmission'],
      representativeQueries: [
        'Submit a project inquiry to WebNexa',
        'Request a quote for digital development services',
      ],
    },
  ],
}

export async function GET() {
  return NextResponse.json(catalogManifest, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
