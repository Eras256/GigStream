// src/hooks/useHistoricalEvents.ts - Hook to fetch recent historical events from contract
'use client'

import { useState, useEffect } from 'react'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { GIGESCROW_ADDRESS, SOMNIA_CONFIG } from '@/lib/contracts'
import { StreamEvent } from './useEventStream'

const publicClient = createPublicClient({
  chain: {
    id: SOMNIA_CONFIG.chainId,
    name: SOMNIA_CONFIG.name,
    nativeCurrency: SOMNIA_CONFIG.nativeCurrency,
    rpcUrls: {
      default: {
        http: [SOMNIA_CONFIG.rpcUrl],
      },
    },
  },
  transport: http(SOMNIA_CONFIG.rpcUrl),
})

interface UseHistoricalEventsResult {
  events: StreamEvent[]
  isLoading: boolean
  error: Error | null
}

/**
 * Hook to fetch recent historical events from the contract
 * Fetches events from the last 1000 blocks (approximately last hour on Somnia)
 */
export function useHistoricalEvents(): UseHistoricalEventsResult {
  const [events, setEvents] = useState<StreamEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchHistoricalEvents() {
      if (!GIGESCROW_ADDRESS || GIGESCROW_ADDRESS === '0x0000000000000000000000000000000000000000') {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        console.log('[useHistoricalEvents] Starting to fetch historical events...')

        // Get current block number
        const currentBlock = await publicClient.getBlockNumber()
        console.log('[useHistoricalEvents] Current block:', currentBlock.toString())
        
        // Somnia RPC has a limit of 1000 blocks per request
        // Fetch events in chunks of 1000 blocks
        const CHUNK_SIZE = 1000n
        const MAX_BLOCKS_TO_SEARCH = 5000n // Last ~5000 blocks (approximately last few hours)
        const fromBlock = currentBlock > MAX_BLOCKS_TO_SEARCH ? currentBlock - MAX_BLOCKS_TO_SEARCH : 0n
        
        console.log('[useHistoricalEvents] Fetching events from block', fromBlock.toString(), 'to', currentBlock.toString(), 'in chunks of', CHUNK_SIZE.toString())

        // Helper function to fetch logs in chunks
        async function fetchLogsInChunks(eventAbi: string, eventName: string) {
          const allLogs: any[] = []
          let startBlock = fromBlock
          
          while (startBlock < currentBlock) {
            const endBlock = startBlock + CHUNK_SIZE > currentBlock ? currentBlock : startBlock + CHUNK_SIZE
            
            try {
              const eventAbiParsed = parseAbiItem(eventAbi) as any
              const logs = await publicClient.getLogs({
                address: GIGESCROW_ADDRESS,
                event: eventAbiParsed,
                fromBlock: startBlock,
                toBlock: endBlock,
              })
              allLogs.push(...logs)
              console.log(`[useHistoricalEvents] Fetched ${logs.length} ${eventName} events from block ${startBlock.toString()} to ${endBlock.toString()}`)
            } catch (err) {
              console.error(`[useHistoricalEvents] Error fetching ${eventName} logs from ${startBlock.toString()} to ${endBlock.toString()}:`, err)
            }
            
            startBlock = endBlock + 1n
          }
          
          return allLogs
        }

        // Fetch all event types in chunks
        const [jobPostedLogs, bidPlacedLogs, jobCompletedLogs, jobCancelledLogs, reputationLogs] = await Promise.all([
          fetchLogsInChunks('event JobPosted(uint256 indexed jobId, address indexed employer, string title, uint256 reward, uint256 deadline)', 'JobPosted'),
          fetchLogsInChunks('event BidPlaced(uint256 indexed jobId, address indexed worker, uint256 bid, uint256 timestamp)', 'BidPlaced'),
          fetchLogsInChunks('event JobCompleted(uint256 indexed jobId, address indexed worker, uint256 reward)', 'JobCompleted'),
          fetchLogsInChunks('event JobCancelled(uint256 indexed jobId, address indexed employer, uint256 refundAmount)', 'JobCancelled'),
          fetchLogsInChunks('event ReputationUpdated(address indexed user, uint256 newReputation)', 'ReputationUpdated'),
        ])

        const allEvents: StreamEvent[] = []

        // Process JobPosted events
        jobPostedLogs.forEach((log) => {
          allEvents.push({
            type: 'JobPosted',
            jobId: log.args.jobId?.toString() || '',
            employer: log.args.employer || '',
            title: log.args.title || '',
            reward: log.args.reward?.toString() || '0',
            deadline: log.args.deadline?.toString() || '0',
            blockNumber: log.blockNumber?.toString(),
            transactionHash: log.transactionHash,
            receivedAt: Date.now() - (Number(currentBlock - log.blockNumber!) * 2000), // Approximate timestamp
          })
        })

        // Process BidPlaced events
        bidPlacedLogs.forEach((log) => {
          allEvents.push({
            type: 'BidPlaced',
            jobId: log.args.jobId?.toString() || '',
            worker: log.args.worker || '',
            bid: log.args.bid?.toString() || '0',
            timestamp: log.args.timestamp?.toString() || '0',
            blockNumber: log.blockNumber?.toString(),
            transactionHash: log.transactionHash,
            receivedAt: Date.now() - (Number(currentBlock - log.blockNumber!) * 2000),
          })
        })

        // Process JobCompleted events
        jobCompletedLogs.forEach((log) => {
          allEvents.push({
            type: 'JobCompleted',
            jobId: log.args.jobId?.toString() || '',
            worker: log.args.worker || '',
            reward: log.args.reward?.toString() || '0',
            blockNumber: log.blockNumber?.toString(),
            transactionHash: log.transactionHash,
            receivedAt: Date.now() - (Number(currentBlock - log.blockNumber!) * 2000),
          })
        })

        // Process JobCancelled events
        jobCancelledLogs.forEach((log) => {
          allEvents.push({
            type: 'JobCancelled',
            jobId: log.args.jobId?.toString() || '',
            employer: log.args.employer || '',
            refundAmount: log.args.refundAmount?.toString() || '0',
            blockNumber: log.blockNumber?.toString(),
            transactionHash: log.transactionHash,
            receivedAt: Date.now() - (Number(currentBlock - log.blockNumber!) * 2000),
          })
        })

        // Process ReputationUpdated events
        reputationLogs.forEach((log) => {
          allEvents.push({
            type: 'ReputationUpdated',
            user: log.args.user || '',
            reputation: log.args.newReputation?.toString() || '0',
            blockNumber: log.blockNumber?.toString(),
            transactionHash: log.transactionHash,
            receivedAt: Date.now() - (Number(currentBlock - log.blockNumber!) * 2000),
          })
        })

        // Sort by receivedAt (most recent first)
        allEvents.sort((a, b) => (b.receivedAt || 0) - (a.receivedAt || 0))

        console.log('[useHistoricalEvents] Found', allEvents.length, 'historical events')
        console.log('[useHistoricalEvents] Event breakdown:', {
          jobs: jobPostedLogs.length,
          bids: bidPlacedLogs.length,
          completions: jobCompletedLogs.length,
          cancellations: jobCancelledLogs.length,
          reputation: reputationLogs.length,
        })

        setEvents(allEvents)
      } catch (err) {
        console.error('Error fetching historical events:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch historical events'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistoricalEvents()
  }, [])

  return {
    events,
    isLoading,
    error,
  }
}

