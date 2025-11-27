// src/app/api/gemini/route.ts - Google Gemini AI SDK Integration
// Production-ready API route with multi-model fallback and structured responses

import { NextRequest, NextResponse } from 'next/server'
import { callGemini, callGeminiJSON, callGeminiText } from '@/lib/ai/gemini-advanced'

// Force Node.js runtime for Vercel (required for @google/generative-ai)
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, context, expectJSON, options } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt is required and must be a string' },
        { status: 400 }
      )
    }

    // Build structured prompt with context
    const fullPrompt = `
GigStream MX Assistant - Somnia Data Streams Hackathon

USER: ${prompt}
CONTEXT: ${context || 'Mexico freelance marketplace, 56M informal workers. Built on Somnia Network L1 blockchain with real-time Data Streams.'}

INSTRUCTIONS:
- Respond in English
- Be helpful, technical with developers, accessible with users
- Mention Somnia Data Streams (SDS) when relevant
- If JSON is requested, respond ONLY with valid JSON, no markdown or explanations
`

    // Call Gemini with appropriate method based on expectJSON flag
    let result
    if (expectJSON) {
      result = await callGeminiJSON(fullPrompt)
    } else {
      result = await callGemini(fullPrompt, {
        ...options,
        expectJSON: expectJSON || false,
        returnRawText: true
      })
    }

    // Extract text response for compatibility with provider
    const textResponse = result.rawText || (typeof result.data === 'string' ? result.data : JSON.stringify(result.data))
    
    return NextResponse.json({
      success: true,
      data: result.data || result,
      response: textResponse, // Primary field for provider compatibility
      text: textResponse,     // Fallback field for provider compatibility
      modelUsed: result.modelUsed,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('[API] Gemini error:', error)
    
    // Return structured error response
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gemini API error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

