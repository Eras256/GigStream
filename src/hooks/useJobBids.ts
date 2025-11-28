// src/hooks/useJobBids.ts - Hook to fetch bids for a job
'use client'

import { useReadContract } from 'wagmi'
import { gigEscrowAbi } from '@/lib/viem'
import { GIGESCROW_ADDRESS } from '@/lib/contracts'

export function useJobBids(jobId: bigint | undefined) {
  const { data: bids, isLoading, error, refetch } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'getJobBids',
    args: jobId ? [jobId] : undefined,
    query: {
      enabled: !!jobId && !!GIGESCROW_ADDRESS,
    },
  })

  return {
    bids: bids || [],
    isLoading,
    error,
    refetch,
  }
}

