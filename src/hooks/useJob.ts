// src/hooks/useJob.ts - Hook to fetch a single job
'use client'

import { useReadContract } from 'wagmi'
import { gigEscrowAbi } from '@/lib/viem'
import { GIGESCROW_ADDRESS } from '@/lib/contracts'

export function useJob(jobId: bigint | undefined) {
  const { data: job, isLoading, error, refetch } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'getJob',
    args: jobId ? [jobId] : undefined,
    query: {
      enabled: !!jobId && !!GIGESCROW_ADDRESS,
    },
  })

  return {
    job,
    isLoading,
    error,
    refetch,
  }
}

