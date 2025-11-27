// src/app/api/test-gemini/route.ts - Gemini AI Connectivity Test Endpoint
// Use this endpoint to validate Gemini API configuration and connectivity

import { NextRequest, NextResponse } from 'next/server'
import { callGemini, callGeminiJSON } from '@/lib/ai/gemini-advanced'

// Force Node.js runtime for Vercel
export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    // Test 1: Simple text generation
    const testPrompt = 'Respond with "OK" if you can read this message. Include your model name.'
    
    const result = await callGemini(testPrompt, { returnRawText: true })
    
    // Test 2: JSON generation (if first test passes)
    let jsonTest = null
    try {
      const jsonPrompt = 'Generate a simple JSON: {"status": "ok", "test": true, "timestamp": "2025-11-01"}'
      jsonTest = await callGeminiJSON(jsonPrompt)
    } catch (jsonError) {
      console.warn('[TEST] JSON test failed:', jsonError)
    }

    return NextResponse.json({
      success: true,
      message: 'Gemini AI is configured correctly',
      tests: {
        textGeneration: {
          passed: true,
          modelUsed: result.modelUsed,
          response: result.data?.substring(0, 100) || result.rawText?.substring(0, 100) || 'No response'
        },
        jsonGeneration: {
          passed: jsonTest !== null,
          result: jsonTest
        }
      },
      configuration: {
        apiKeyConfigured: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY),
        envVarUsed: process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY' : 'GOOGLE_GENERATIVE_AI_API_KEY',
        runtime: 'nodejs'
      },
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('[TEST] Gemini connectivity test failed:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Gemini connectivity test failed',
        configuration: {
          apiKeyConfigured: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY),
          envVarUsed: process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY' : 'GOOGLE_GENERATIVE_AI_API_KEY',
          runtime: 'nodejs'
        },
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

