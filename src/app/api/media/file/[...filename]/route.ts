import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string[] }> },
) {
  const { filename } = await params
  const fullFilename = Array.isArray(filename) ? filename.join('/') : filename
  const decodedFilename = decodeURIComponent(fullFilename)

  const token = process.env.BLOB_READ_WRITE_TOKEN
  const storeId = token?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()

  // Production/Preview on Vercel: Instantly redirect to Vercel Blob CDN.
  // This bypasses Payload route overhead, cold starts, and MongoDB calls,
  // preventing 504 Gateway Timeouts and broken image alt text.
  if (storeId) {
    const encodedFilename = encodeURIComponent(decodedFilename)
    const blobUrl = `https://${storeId}.public.blob.vercel-storage.com/${encodedFilename}`

    return NextResponse.redirect(blobUrl, {
      status: 308,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  // Local development fallback: Serve file directly from ./media on disk
  try {
    const localPath = path.resolve(process.cwd(), 'media', decodedFilename)
    if (fs.existsSync(localPath)) {
      const stat = fs.statSync(localPath)
      if (stat.isFile()) {
        const fileBuffer = fs.readFileSync(localPath)
        const ext = path.extname(decodedFilename).toLowerCase()
        const contentType = MIME_TYPES[ext] || 'application/octet-stream'

        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Content-Length': stat.size.toString(),
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
          },
        })
      }
    }
  } catch (err) {
    console.error('Error reading local media file:', err)
  }

  return new NextResponse('Media file not found', { status: 404 })
}

export async function HEAD(
  request: NextRequest,
  context: { params: Promise<{ filename: string[] }> },
) {
  return GET(request, context)
}
