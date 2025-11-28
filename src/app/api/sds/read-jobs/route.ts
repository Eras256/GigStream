// src/app/api/sds/read-jobs/route.ts - Read Jobs from Somnia Data Streams
// API endpoint to read job data from Somnia Data Streams

import { NextRequest, NextResponse } from 'next/server'
import { createSDSClient, getJobSchemaId, readJobFromDataStream } from '@/lib/somnia-sds'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/sds/read-jobs
 * Reads job data from Somnia Data Streams for a specific publisher
 * 
 * Query params:
 *   publisher: string (0x address) - required
 *   limit?: number - optional, default 50
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const publisher = searchParams.get('publisher') as `0x${string}` | null
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!publisher) {
      return NextResponse.json(
        { error: 'publisher parameter is required' },
        { status: 400 }
      )
    }

    // Validate address format
    if (!publisher.startsWith('0x') || publisher.length !== 42) {
      return NextResponse.json(
        { error: 'Invalid publisher address format' },
        { status: 400 }
      )
    }

    try {
      // Get schema ID
      const schemaId = await getJobSchemaId()

      // Read jobs from Data Streams
      const jobs = await readJobFromDataStream(schemaId, publisher)

      // Limit results
      const limitedJobs = jobs.slice(0, limit)

      return NextResponse.json({
        success: true,
        jobs: limitedJobs,
        total: jobs.length,
        schemaId,
        publisher,
      })
    } catch (sdsError: any) {
      console.error('Error reading jobs from Data Streams:', sdsError)
      
      // Handle NoData error gracefully
      if (sdsError?.message?.includes('NoData') || 
          sdsError?.shortMessage?.includes('NoData') ||
          sdsError?.message?.includes('not found') ||
          sdsError?.message?.includes('No data')) {
        return NextResponse.json({
          success: true,
          jobs: [],
          total: 0,
          message: 'No jobs found in Data Streams for this publisher',
        })
      }

      // Return empty array instead of error for better UX
      // SDS is optional enhancement, so we don't want to break the UI
      return NextResponse.json({
        success: true,
        jobs: [],
        total: 0,
        message: 'Data Streams temporarily unavailable',
      })
    }
  } catch (error: any) {
    console.error('Error in read-jobs API:', error)
    
    // Always return success with empty array to avoid breaking UI
    return NextResponse.json({
      success: true,
      jobs: [],
      total: 0,
      message: 'Unable to fetch jobs from Data Streams',
    })
  }
}

