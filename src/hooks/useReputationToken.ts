// src/hooks/useReputationToken.ts - Reputation Token Hook
'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { reputationTokenAbi } from '@/lib/abis'
import { REPUTATION_TOKEN_ADDRESS } from '@/lib/contracts'
import { formatEther, parseEther } from 'viem'

export function useReputationToken() {
  const { address, isConnected } = useAccount()
  
  // Read balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: REPUTATION_TOKEN_ADDRESS,
    abi: reputationTokenAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  })

  // Read reputation
  const { data: reputation, refetch: refetchReputation } = useReadContract({
    address: REPUTATION_TOKEN_ADDRESS,
    abi: reputationTokenAbi,
    functionName: 'getReputation',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  })

  // Read token info
  const { data: name } = useReadContract({
    address: REPUTATION_TOKEN_ADDRESS,
    abi: reputationTokenAbi,
    functionName: 'name',
  })

  const { data: symbol } = useReadContract({
    address: REPUTATION_TOKEN_ADDRESS,
    abi: reputationTokenAbi,
    functionName: 'symbol',
  })

  const { data: decimals } = useReadContract({
    address: REPUTATION_TOKEN_ADDRESS,
    abi: reputationTokenAbi,
    functionName: 'decimals',
  })

  const { data: totalSupply } = useReadContract({
    address: REPUTATION_TOKEN_ADDRESS,
    abi: reputationTokenAbi,
    functionName: 'totalSupply',
  })

  // Write contract functions
  const { writeContract: transfer, data: transferHash, isPending: isTransferring } = useWriteContract()
  const { writeContract: approve, data: approveHash, isPending: isApproving } = useWriteContract()
  const { writeContract: burn, data: burnHash, isPending: isBurning } = useWriteContract()

  // Wait for transactions
  const { isLoading: isTransferConfirming } = useWaitForTransactionReceipt({
    hash: transferHash,
  })
  const { isLoading: isApproveConfirming } = useWaitForTransactionReceipt({
    hash: approveHash,
  })
  const { isLoading: isBurnConfirming } = useWaitForTransactionReceipt({
    hash: burnHash,
  })

  const handleTransfer = async (to: `0x${string}`, amount: string) => {
    if (!address || !isConnected) return
    
    try {
      await transfer({
        address: REPUTATION_TOKEN_ADDRESS,
        abi: reputationTokenAbi,
        functionName: 'transfer',
        args: [to, parseEther(amount)],
      })
    } catch (error) {
      console.error('Error transferring:', error)
      throw error
    }
  }

  const handleApprove = async (spender: `0x${string}`, amount: string) => {
    if (!address || !isConnected) return
    
    try {
      await approve({
        address: REPUTATION_TOKEN_ADDRESS,
        abi: reputationTokenAbi,
        functionName: 'approve',
        args: [spender, parseEther(amount)],
      })
    } catch (error) {
      console.error('Error approving:', error)
      throw error
    }
  }

  const handleBurn = async (amount: string, reason: string) => {
    if (!address || !isConnected) return
    
    try {
      await burn({
        address: REPUTATION_TOKEN_ADDRESS,
        abi: reputationTokenAbi,
        functionName: 'burn',
        args: [address, parseEther(amount), reason],
      })
    } catch (error) {
      console.error('Error burning:', error)
      throw error
    }
  }

  return {
    balance: balance ? formatEther(balance) : '0',
    reputation: reputation ? Number(reputation) : 0,
    name: name || 'GigStream Reputation Token',
    symbol: symbol || 'GST',
    decimals: decimals || 18,
    totalSupply: totalSupply ? formatEther(totalSupply) : '0',
    transfer: handleTransfer,
    approve: handleApprove,
    burn: handleBurn,
    isTransferring: isTransferring || isTransferConfirming,
    isApproving: isApproving || isApproveConfirming,
    isBurning: isBurning || isBurnConfirming,
    refetch: () => {
      refetchBalance()
      refetchReputation()
    },
  }
}

