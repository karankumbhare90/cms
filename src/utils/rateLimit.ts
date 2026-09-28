type RateLimitRecord = {
  count: number
  resetTime: number
}

const tracker = new Map<string, RateLimitRecord>()

// Periodically clean up expired tokens every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of tracker.entries()) {
      if (now > record.resetTime) {
        tracker.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}

export interface RateLimitOptions {
  limit?: number // Maximum requests allowed within the window
  windowMs?: number // Window duration in milliseconds
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {},
): { success: boolean; limit: number; remaining: number; resetTime: number } {
  const limit = options.limit ?? 10
  const windowMs = options.windowMs ?? 60 * 1000
  const now = Date.now()

  const record = tracker.get(identifier)

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    }
    tracker.set(identifier, newRecord)
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime: newRecord.resetTime,
    }
  }

  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  record.count += 1
  return {
    success: true,
    limit,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  }
}

export function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }
  return '127.0.0.1'
}
