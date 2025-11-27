// src/hooks/useGigStream.ts - GigStream Hook with Contract Integration
'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWatchContractEvent } from 'wagmi'
import { gigEscrowAbi } from '@/lib/viem'
import { GIGESCROW_ADDRESS } from '@/lib/contracts'
import { formatEther } from 'viem'

export function useGigStream() {
  const { address, isConnected } = useAccount()
  
  // Read reputation from contract
  const { data: reputationScore, refetch: refetchReputation } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'reputation',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && !!GIGESCROW_ADDRESS,
    },
  })

  // Read user jobs
  const { data: userJobIds, refetch: refetchUserJobs } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'getUserJobs',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && !!GIGESCROW_ADDRESS,
    },
  })

  // Read worker jobs
  const { data: workerJobIds, refetch: refetchWorkerJobs } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'getWorkerJobs',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && !!GIGESCROW_ADDRESS,
    },
  })

  // Watch for reputation updates
  useWatchContractEvent({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    eventName: 'ReputationUpdated',
    args: {
      user: address,
    },
    onLogs: () => {
      refetchReputation()
    },
  })

  // Watch for job updates
  useWatchContractEvent({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    eventName: 'JobCompleted',
    args: {
      worker: address,
    },
    onLogs: () => {
      refetchReputation()
      refetchWorkerJobs()
    },
  })

  const [reputation, setReputation] = useState({
    rating: 0,
    jobsCompleted: 0,
    totalEarnings: '0',
    reputationScore: 0,
  })

  useEffect(() => {
    if (address && isConnected) {
      const repScore = reputationScore ? Number(reputationScore) : 0
      const completedJobs = workerJobIds ? workerJobIds.length : 0
      
      // Calculate rating from reputation (simple formula: reputation / 10 = rating, max 5.0)
      const calculatedRating = Math.min(5.0, repScore / 10)
      
      setReputation({
        rating: calculatedRating || 0,
        jobsCompleted: completedJobs,
        totalEarnings: '0', // TODO: Calculate from completed jobs
        reputationScore: repScore,
      })
    } else {
      setReputation({
        rating: 0,
        jobsCompleted: 0,
        totalEarnings: '0',
        reputationScore: 0,
      })
    }
  }, [address, isConnected, reputationScore, workerJobIds])

  return {
    reputation,
    userJobIds: userJobIds || [],
    workerJobIds: workerJobIds || [],
    refetch: () => {
      refetchReputation()
      refetchUserJobs()
      refetchWorkerJobs()
    },
  }
}

