// src/hooks/useStaking.ts - Staking Pool Hook
'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { stakingPoolAbi } from '@/lib/abis'
import { STAKING_POOL_ADDRESS } from '@/lib/contracts'
import { formatEther, parseEther } from 'viem'

export function useStaking() {
  const { address, isConnected } = useAccount()
  
  // Read stake information
  const { data: stakeInfo, refetch: refetchStake } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: stakingPoolAbi,
    functionName: 'getStake',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  })

  // Check if user has active stake
  const { data: hasActiveStake } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: stakingPoolAbi,
    functionName: 'hasActiveStake',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  })

  // Calculate reward
  const { data: reward } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: stakingPoolAbi,
    functionName: 'calculateReward',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && hasActiveStake,
    },
  })

  // Get minimum stake
  const { data: minStake } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: stakingPoolAbi,
    functionName: 'MIN_STAKE',
  })

  // Get staking duration
  const { data: stakingDuration } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: stakingPoolAbi,
    functionName: 'STAKING_DURATION',
  })

  // Write contract functions
  const { writeContract: stake, data: stakeHash, isPending: isStaking } = useWriteContract()
  const { writeContract: unstake, data: unstakeHash, isPending: isUnstaking } = useWriteContract()

  // Wait for transactions
  const { isLoading: isStakeConfirming } = useWaitForTransactionReceipt({
    hash: stakeHash,
  })
  const { isLoading: isUnstakeConfirming } = useWaitForTransactionReceipt({
    hash: unstakeHash,
  })

  const handleStake = async (amount: string) => {
    if (!address || !isConnected) return
    
    try {
      await stake({
        address: STAKING_POOL_ADDRESS,
        abi: stakingPoolAbi,
        functionName: 'stake',
        value: parseEther(amount),
      })
    } catch (error) {
      console.error('Error staking:', error)
      throw error
    }
  }

  const handleUnstake = async () => {
    if (!address || !isConnected) return
    
    try {
      await unstake({
        address: STAKING_POOL_ADDRESS,
        abi: stakingPoolAbi,
        functionName: 'unstake',
      })
    } catch (error) {
      console.error('Error unstaking:', error)
      throw error
    }
  }

  return {
    stakeInfo: stakeInfo ? {
      amount: formatEther(stakeInfo.amount),
      timestamp: Number(stakeInfo.timestamp),
      unlockTime: Number(stakeInfo.unlockTime),
      active: stakeInfo.active,
      isLocked: stakeInfo.active && Date.now() / 1000 < Number(stakeInfo.unlockTime),
    } : null,
    hasActiveStake: hasActiveStake || false,
    reward: reward ? formatEther(reward) : '0',
    minStake: minStake ? formatEther(minStake) : '0.1',
    stakingDuration: stakingDuration ? Number(stakingDuration) : 2592000, // 30 days in seconds
    stake: handleStake,
    unstake: handleUnstake,
    isStaking: isStaking || isStakeConfirming,
    isUnstaking: isUnstaking || isUnstakeConfirming,
    refetch: refetchStake,
  }
}

