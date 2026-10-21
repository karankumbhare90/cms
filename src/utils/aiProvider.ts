import { createGoogle } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'
import type {
  LanguageModelV4,
  LanguageModelV4CallOptions,
  LanguageModelV4GenerateResult,
  LanguageModelV4StreamResult,
} from '@ai-sdk/provider'

export interface AICandidate {
  id: string
  name: string
  provider: string
  model: LanguageModelV4
}

// Cooldown tracking for rate-limited / failed keys (key ID -> timestamp until which it is on cooldown)
const cooldownMap = new Map<string, number>()

export function isCoolingDown(id: string): boolean {
  const until = cooldownMap.get(id)
  if (!until) return false
  if (Date.now() > until) {
    cooldownMap.delete(id)
    return false
  }
  return true
}

export function setCooldown(id: string, durationMs: number = 60 * 1000): void {
  cooldownMap.set(id, Date.now() + durationMs)
}

export function isRateLimitOrQuotaError(error: unknown): boolean {
  if (!error) return false
  const err = error as any

  if (
    err.statusCode === 429 ||
    err.status === 429 ||
    err.statusCode === 503 ||
    err.status === 503
  ) {
    return true
  }

  const message = (err.message || String(error)).toLowerCase()
  return (
    message.includes('429') ||
    message.includes('rate limit') ||
    message.includes('quota') ||
    message.includes('resource_exhausted') ||
    message.includes('resource has been exhausted') ||
    message.includes('too many requests') ||
    message.includes('overloaded') ||
    message.includes('capacity') ||
    message.includes('service unavailable')
  )
}

function parseKeyList(singleKey?: string, commaSeparated?: string, prefix?: string): string[] {
  const keys = new Set<string>()

  if (singleKey && singleKey.trim()) {
    keys.add(singleKey.trim())
  }

  if (commaSeparated) {
    commaSeparated
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)
      .forEach((k) => keys.add(k))
  }

  if (prefix) {
    for (let i = 1; i <= 20; i++) {
      const val = process.env[`${prefix}_${i}`]?.trim()
      if (val) keys.add(val)
    }
  }

  return Array.from(keys)
}

/**
 * Builds all configured AI candidates based on available environment variables.
 * Supports:
 * - Google Gemini (multiple keys supported via GEMINI_API_KEYS or GEMINI_API_KEY_1..N)
 * - OpenAI / ChatGPT (multiple keys supported via OPENAI_API_KEYS or OPENAI_API_KEY_1..N)
 * - DeepSeek (OpenAI-compatible)
 * - OmniRoute (OpenAI-compatible gateway supporting multi-model routing)
 * - OpenRouter (OpenAI-compatible)
 */
export function getAvailableCandidates(): AICandidate[] {
  const candidates: AICandidate[] = []

  // 1. Google Gemini
  const geminiKeys = parseKeyList(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEYS,
    'GEMINI_API_KEY',
  )
  const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash'

  geminiKeys.forEach((key, index) => {
    try {
      const googleProvider = createGoogle({ apiKey: key })
      candidates.push({
        id: `gemini-key-${index + 1}`,
        name: `Google Gemini (${geminiModel}) [Key ${index + 1}]`,
        provider: 'gemini',
        model: googleProvider(geminiModel),
      })
    } catch (err) {
      console.error(`[AI Provider] Failed to initialize Gemini candidate ${index + 1}:`, err)
    }
  })

  // 2. OpenAI / ChatGPT
  const openaiKeys = parseKeyList(
    process.env.OPENAI_API_KEY,
    process.env.OPENAI_API_KEYS,
    'OPENAI_API_KEY',
  )
  const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  openaiKeys.forEach((key, index) => {
    try {
      const openaiProvider = createOpenAI({ apiKey: key })
      candidates.push({
        id: `openai-key-${index + 1}`,
        name: `OpenAI ChatGPT (${openaiModel}) [Key ${index + 1}]`,
        provider: 'openai',
        model: openaiProvider(openaiModel),
      })
    } catch (err) {
      console.error(`[AI Provider] Failed to initialize OpenAI candidate ${index + 1}:`, err)
    }
  })

  // 3. DeepSeek (OpenAI compatible)
  const deepseekKeys = parseKeyList(
    process.env.DEEPSEEK_API_KEY,
    process.env.DEEPSEEK_API_KEYS,
    'DEEPSEEK_API_KEY',
  )
  const deepseekBaseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'
  const deepseekModel = process.env.DEEPSEEK_MODEL || 'deepseek-chat'

  deepseekKeys.forEach((key, index) => {
    try {
      const deepseekProvider = createOpenAI({
        apiKey: key,
        baseURL: deepseekBaseUrl,
      })
      candidates.push({
        id: `deepseek-key-${index + 1}`,
        name: `DeepSeek (${deepseekModel}) [Key ${index + 1}]`,
        provider: 'deepseek',
        model: deepseekProvider(deepseekModel),
      })
    } catch (err) {
      console.error(`[AI Provider] Failed to initialize DeepSeek candidate ${index + 1}:`, err)
    }
  })

  // 4. OmniRoute (OpenAI compatible AI Gateway / Router)
  const omnirouteKey = process.env.OMNIROUTE_API_KEY
  const omnirouteBaseUrl = process.env.OMNIROUTE_BASE_URL || 'http://localhost:20128/v1'
  const omnirouteModel = process.env.OMNIROUTE_MODEL || 'auto'

  if (omnirouteKey || process.env.OMNIROUTE_BASE_URL) {
    try {
      const omnirouteProvider = createOpenAI({
        apiKey: omnirouteKey || 'omniroute',
        baseURL: omnirouteBaseUrl,
      })
      candidates.push({
        id: 'omniroute',
        name: `OmniRoute Gateway (${omnirouteModel})`,
        provider: 'omniroute',
        model: omnirouteProvider(omnirouteModel),
      })
    } catch (err) {
      console.error('[AI Provider] Failed to initialize OmniRoute candidate:', err)
    }
  }

  // 5. OpenRouter (OpenAI compatible fallback option)
  const openrouterKey = process.env.OPENROUTER_API_KEY
  const openrouterModel = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-chat'

  if (openrouterKey) {
    try {
      const openrouterProvider = createOpenAI({
        apiKey: openrouterKey,
        baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      })
      candidates.push({
        id: 'openrouter',
        name: `OpenRouter (${openrouterModel})`,
        provider: 'openrouter',
        model: openrouterProvider(openrouterModel),
      })
    } catch (err) {
      console.error('[AI Provider] Failed to initialize OpenRouter candidate:', err)
    }
  }

  // Optional ordering preference by provider (e.g. AI_PROVIDER_ORDER="gemini,openai,deepseek,omniroute")
  const preferredOrder = process.env.AI_PROVIDER_ORDER
    ? process.env.AI_PROVIDER_ORDER.split(',').map((p) => p.trim().toLowerCase())
    : ['gemini', 'openai', 'deepseek', 'omniroute', 'openrouter']

  candidates.sort((a, b) => {
    const orderA = preferredOrder.indexOf(a.provider)
    const orderB = preferredOrder.indexOf(b.provider)
    const rankA = orderA === -1 ? 999 : orderA
    const rankB = orderB === -1 ? 999 : orderB
    return rankA - rankB
  })

  return candidates
}

/**
 * Returns candidates sorted with healthy/ready candidates first,
 * followed by cooling-down candidates as a last resort.
 */
export function getCandidateQueue(): AICandidate[] {
  const all = getAvailableCandidates()
  if (all.length === 0) return []

  const ready: AICandidate[] = []
  const cooling: AICandidate[] = []

  for (const c of all) {
    if (isCoolingDown(c.id)) {
      cooling.push(c)
    } else {
      ready.push(c)
    }
  }

  return [...ready, ...cooling]
}

/**
 * A LanguageModelV4 that automatically tries the primary provider, and if rate-limited
 * (429 / Quota Exceeded) or unavailable, immediately fails over to the next configured
 * provider/key in the queue without interrupting or breaking the user experience.
 */
export class FallbackLanguageModel implements LanguageModelV4 {
  readonly specificationVersion = 'v4' as const

  get provider(): string {
    const first = getCandidateQueue()[0]
    return first?.model.provider ?? 'multi-provider-fallback'
  }

  get modelId(): string {
    const first = getCandidateQueue()[0]
    return first?.model.modelId ?? 'auto-failover'
  }

  get supportedUrls(): Record<string, RegExp[]> {
    return {}
  }

  async doGenerate(options: LanguageModelV4CallOptions): Promise<LanguageModelV4GenerateResult> {
    const queue = getCandidateQueue()
    if (queue.length === 0) {
      throw new Error(
        'No AI providers configured. Please add at least one API key (e.g. GOOGLE_GENERATIVE_AI_API_KEY, OPENAI_API_KEY, DEEPSEEK_API_KEY, or OMNIROUTE_API_KEY) in .env.',
      )
    }

    const errors: Array<{ name: string; error: any }> = []

    for (let i = 0; i < queue.length; i++) {
      const candidate = queue[i]
      try {
        return await candidate.model.doGenerate(options)
      } catch (err: any) {
        const isQuota = isRateLimitOrQuotaError(err)
        console.warn(
          `[AI Fallback] ${candidate.name} failed (${isQuota ? 'Rate Limit / Quota reached' : 'Error'}): ${err?.message || err}. Attempting failover...`,
        )
        setCooldown(candidate.id, isQuota ? 60 * 1000 : 30 * 1000)
        errors.push({ name: candidate.name, error: err })
      }
    }

    console.error('[AI Fallback] All providers failed:', errors)
    throw new Error(
      `All configured AI providers failed or reached their rate limits: ${errors.map((e) => e.name).join(', ')}`,
    )
  }

  async doStream(options: LanguageModelV4CallOptions): Promise<LanguageModelV4StreamResult> {
    const queue = getCandidateQueue()
    if (queue.length === 0) {
      throw new Error(
        'No AI providers configured. Please add at least one API key (e.g. GOOGLE_GENERATIVE_AI_API_KEY, OPENAI_API_KEY, DEEPSEEK_API_KEY, or OMNIROUTE_API_KEY) in .env.',
      )
    }

    const errors: Array<{ name: string; error: any }> = []

    for (let i = 0; i < queue.length; i++) {
      const candidate = queue[i]
      try {
        return await candidate.model.doStream(options)
      } catch (err: any) {
        const isQuota = isRateLimitOrQuotaError(err)
        console.warn(
          `[AI Fallback] ${candidate.name} failed (${isQuota ? 'Rate Limit / Quota reached' : 'Error'}): ${err?.message || err}. Attempting failover...`,
        )
        setCooldown(candidate.id, isQuota ? 60 * 1000 : 30 * 1000)
        errors.push({ name: candidate.name, error: err })
      }
    }

    console.error('[AI Fallback] All providers failed:', errors)
    throw new Error(
      `All configured AI providers failed or reached their rate limits: ${errors.map((e) => e.name).join(', ')}`,
    )
  }
}

/**
 * Singleton multi-provider fallback model instance to pass into streamText or generateText.
 */
export const fallbackModel = new FallbackLanguageModel()
