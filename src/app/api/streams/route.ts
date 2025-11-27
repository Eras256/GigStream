// src/app/api/streams/route.ts - Somnia Data Streams Integration
// Optimized for Somnia Network's high-throughput real-time data streams
import { NextRequest } from 'next/server'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { gigEscrowAbi } from '@/lib/viem'
import { GIGESCROW_ADDRESS, SOMNIA_CONFIG } from '@/lib/contracts'

// Somnia Testnet configuration
const somniaTestnet = {
  id: 50312,
  name: 'Somnia Shannon Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Shannon Test Token',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: [SOMNIA_CONFIG.rpcUrl],
    },
  },
} as const

const publicClient = createPublicClient({
  chain: somniaTestnet,
  transport: http(somniaTestnet.rpcUrls.default.http[0])
})

const CONTRACT_ADDRESS = GIGESCROW_ADDRESS

/**
 * Server-Sent Events (SSE) stream for Somnia Data Streams
 * Streams real-time contract events (JobPosted, BidPlaced, JobCompleted, etc.)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const streamType = searchParams.get('type') || 'jobs'
  
  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
    return new Response(
      JSON.stringify({ error: 'Contract address not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        // Send initial connection message
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'connected', 
            streamType,
            contractAddress: CONTRACT_ADDRESS,
            network: 'Somnia Testnet',
            chainId: 50312
          })}\n\n`)
        )

        // Set up event listeners based on stream type
        let unwatch: (() => void) | null = null

        if (streamType === 'jobs') {
          // Watch for JobPosted events
          unwatch = publicClient.watchEvent({
            address: CONTRACT_ADDRESS,
            event: parseAbiItem('event JobPosted(uint256 indexed jobId, address indexed employer, string title, uint256 reward, uint256 deadline)'),
            onLogs: (logs) => {
              logs.forEach((log) => {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: 'JobPosted',
                      jobId: log.args.jobId?.toString(),
                      employer: log.args.employer,
                      title: log.args.title,
                      reward: log.args.reward?.toString(),
                      deadline: log.args.deadline?.toString(),
                      blockNumber: log.blockNumber?.toString(),
                      transactionHash: log.transactionHash,
                      timestamp: Date.now()
                    })}\n\n`
                  )
                )
              })
            }
          })
        } else if (streamType === 'bids') {
          // Watch for BidPlaced events
          unwatch = publicClient.watchEvent({
            address: CONTRACT_ADDRESS,
            event: parseAbiItem('event BidPlaced(uint256 indexed jobId, address indexed worker, uint256 bid, uint256 timestamp)'),
            onLogs: (logs) => {
              logs.forEach((log) => {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: 'BidPlaced',
                      jobId: log.args.jobId?.toString(),
                      worker: log.args.worker,
                      bid: log.args.bid?.toString(),
                      timestamp: log.args.timestamp?.toString(),
                      blockNumber: log.blockNumber?.toString(),
                      transactionHash: log.transactionHash
                    })}\n\n`
                  )
                )
              })
            }
          })
        } else if (streamType === 'completions') {
          // Watch for JobCompleted events
          unwatch = publicClient.watchEvent({
            address: CONTRACT_ADDRESS,
            event: parseAbiItem('event JobCompleted(uint256 indexed jobId, address indexed worker, uint256 reward)'),
            onLogs: (logs) => {
              logs.forEach((log) => {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: 'JobCompleted',
                      jobId: log.args.jobId?.toString(),
                      worker: log.args.worker,
                      reward: log.args.reward?.toString(),
                      blockNumber: log.blockNumber?.toString(),
                      transactionHash: log.transactionHash
                    })}\n\n`
                  )
                )
              })
            }
          })
        } else {
          // Fallback: mock stream for development
          const interval = setInterval(() => {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ 
                  type: 'update', 
                  streamType,
                  data: { id: Date.now(), message: 'Mock stream data (contract not deployed)' }
                })}\n\n`
              )
            )
          }, 5000)

          req.signal.addEventListener('abort', () => {
            clearInterval(interval)
            controller.close()
          })
          return
        }

        // Cleanup on abort
        req.signal.addEventListener('abort', () => {
          if (unwatch) unwatch()
          controller.close()
        })
      }
    })
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable buffering for nginx
      }
    })
  } catch (error: any) {
    console.error('Stream error:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Stream error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

