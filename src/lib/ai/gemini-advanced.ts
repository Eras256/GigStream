// src/lib/ai/gemini-advanced.ts - Google Gemini AI SDK Integration with Multi-Model Fallback
// Production-ready implementation with JSON extraction, error handling, and model fallback chain

import { GoogleGenerativeAI } from '@google/generative-ai'

// Validate API key on module load
if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error('[AI] GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY is not set')
}

// Create singleton instance (supports both env var names for compatibility)
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

// Model fallback chain (ordered by preference)
const modelsToTry = [
  'gemini-2.5-flash',    // Primary - Fastest, latest
  'gemini-2.5-pro',      // Fallback 1 - More capable
  'gemini-2.0-flash',    // Fallback 2 - Previous gen fast
  'gemini-1.5-flash',    // Fallback 3 - Stable fast
  'gemini-1.5-pro'       // Fallback 4 - Most capable
]

// Generation configuration
const defaultGenerationConfig = {
  temperature: 0.7,      // Balanced creativity
  topP: 0.9,             // Nucleus sampling
  topK: 40,              // Top-k sampling
  maxOutputTokens: 2048, // Max response length
}

// Response interface
export interface GeminiResponse {
  data: any
  modelUsed: string
  rawText?: string
}

// Options for generateContent
export interface GeminiOptions {
  temperature?: number
  topP?: number
  topK?: number
  maxOutputTokens?: number
  returnRawText?: boolean
  expectJSON?: boolean
}

/**
 * Call Gemini AI with automatic fallback chain
 * @param prompt - The prompt to send to Gemini
 * @param options - Optional configuration
 * @returns Promise with parsed data and model used
 */
export async function callGemini(
  prompt: string,
  options: GeminiOptions = {}
): Promise<GeminiResponse> {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Set GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY')
  }

  const {
    temperature = defaultGenerationConfig.temperature,
    topP = defaultGenerationConfig.topP,
    topK = defaultGenerationConfig.topK,
    maxOutputTokens = defaultGenerationConfig.maxOutputTokens,
    returnRawText = false,
    expectJSON = false
  } = options

  let result: any = null
  let modelUsed: string = ''
  let lastError: Error | null = null
  let rawText: string = ''

  // Try each model in fallback chain
  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature,
          topP,
          topK,
          maxOutputTokens
        }
      })

      const generationResult = await model.generateContent(prompt)
      const response = generationResult.response
      rawText = response.text()
      
      result = rawText
      modelUsed = modelName
      
      console.log(`[AI] Successfully used model: ${modelName}`)
      break
    } catch (error: any) {
      lastError = error
      console.warn(`[AI] Model ${modelName} failed:`, error.message)
      
      // If it's a quota/rate limit error, don't try other models
      if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        throw new Error(`Quota/Rate limit exceeded: ${error.message}`)
      }
      
      continue
    }
  }

  if (!result) {
    throw new Error(`All Gemini models failed. Last error: ${lastError?.message || 'Unknown error'}`)
  }

  // Extract JSON if expected
  if (expectJSON || returnRawText) {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          data: parsed,
          modelUsed,
          rawText: returnRawText ? rawText : undefined
        }
      } catch (parseError) {
        // If JSON parsing fails but JSON was expected, return raw text
        console.warn('[AI] JSON parsing failed, returning raw text')
        return {
          data: rawText,
          modelUsed,
          rawText: returnRawText ? rawText : undefined
        }
      }
    }
  }

  return {
    data: result,
    modelUsed,
    rawText: returnRawText ? rawText : undefined
  }
}

/**
 * Generate structured JSON response from Gemini
 * @param prompt - Prompt that requests JSON response
 * @param schema - Optional JSON schema description for validation
 * @returns Parsed JSON object
 */
export async function callGeminiJSON(
  prompt: string,
  schema?: string
): Promise<any> {
  const jsonPrompt = schema
    ? `${prompt}\n\nRespond with valid JSON matching this schema: ${schema}\n\nReturn ONLY the JSON object, no markdown, no explanations.`
    : `${prompt}\n\nRespond with valid JSON only. No markdown, no explanations, just the JSON object.`

  const response = await callGemini(jsonPrompt, { expectJSON: true })
  return response.data
}

/**
 * Generate text response (no JSON parsing)
 * @param prompt - The prompt
 * @returns Raw text response
 */
export async function callGeminiText(
  prompt: string
): Promise<string> {
  const response = await callGemini(prompt, { returnRawText: true })
  return typeof response.data === 'string' ? response.data : response.rawText || ''
}

