import xss from 'xss'

/**
 * Clean user string input to prevent Cross-Site Scripting (XSS) attacks.
 */
export function sanitizeString(input?: string | null): string {
  if (!input || typeof input !== 'string') return ''
  return xss(input.trim(), {
    whiteList: {}, // Strip all HTML tags
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style'],
  })
}

/**
 * Recursively sanitize all string properties of an object or array.
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj
  if (typeof obj === 'string') {
    return sanitizeString(obj) as unknown as T
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T
  }
  if (typeof obj === 'object') {
    const sanitizedObj: Record<string, any> = {}
    for (const [key, value] of Object.entries(obj)) {
      sanitizedObj[key] = sanitizeObject(value)
    }
    return sanitizedObj as T
  }
  return obj
}

/**
 * Standard Security Response Headers to add to Next.js responses.
 */
export const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
}
