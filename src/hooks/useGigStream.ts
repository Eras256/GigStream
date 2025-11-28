// src/hooks/useGigStream.ts - GigStream Hook with Contract Integration
'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi'
import { gigEscrowAbi } from '@/lib/viem'
import { GIGESCROW_ADDRESS } from '@/lib/contracts'
import { formatEther, parseEther, getAddress } from 'viem'

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

  // Watch for new jobs
  useWatchContractEvent({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    eventName: 'JobPosted',
    onLogs: (logs) => {
      // Check if the job was posted by the current user
      const userPosted = logs.some((log: any) => 
        log.args?.employer?.toLowerCase() === address?.toLowerCase()
      )
      if (userPosted) {
        refetchUserJobs()
      }
    },
  })

  // Watch for job acceptance
  useWatchContractEvent({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    eventName: 'JobAccepted',
    onLogs: (logs) => {
      // Check if the job was accepted for the current user
      const userInvolved = logs.some((log: any) => 
        log.args?.worker?.toLowerCase() === address?.toLowerCase() ||
        log.args?.employer?.toLowerCase() === address?.toLowerCase()
      )
      if (userInvolved) {
        refetchUserJobs()
        refetchWorkerJobs()
      }
    },
  })

  // Watch for job cancellation
  useWatchContractEvent({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    eventName: 'JobCancelled',
    onLogs: (logs) => {
      // Check if the job was cancelled by the current user
      const userInvolved = logs.some((log: any) => 
        log.args?.employer?.toLowerCase() === address?.toLowerCase()
      )
      if (userInvolved) {
        refetchUserJobs()
      }
    },
  })

  // Watch for bids
  useWatchContractEvent({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    eventName: 'BidPlaced',
    onLogs: () => {
      // Refetch job data when bids are placed (for employers to see new bids)
      refetchUserJobs()
    },
  })

  // Watch for job acceptance (both from acceptBid and assignWorkerDirectly)
  useWatchContractEvent({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    eventName: 'JobAccepted',
    onLogs: (logs) => {
      // Check if current user was assigned as worker
      const userAssigned = logs.some((log: any) => 
        log.args?.worker?.toLowerCase() === address?.toLowerCase()
      )
      if (userAssigned) {
        // Trigger custom event for notifications
        window.dispatchEvent(new CustomEvent('worker-assigned', {
          detail: { logs }
        }))
        refetchWorkerJobs()
        refetchReputation()
      }
      
      // Also refetch if current user is the employer who assigned the worker
      const employerAssigned = logs.some((log: any) => 
        log.args?.employer?.toLowerCase() === address?.toLowerCase()
      )
      if (employerAssigned) {
        refetchUserJobs()
      }
    },
  })

  // Write contract functions
  const { writeContract: writePlaceBid, data: placeBidHash, isPending: isPlacingBid } = useWriteContract()
  const { writeContract: writeAcceptBid, data: acceptBidHash, isPending: isAcceptingBid } = useWriteContract()
  const { writeContract: writeCompleteJob, data: completeJobHash, isPending: isCompletingJob } = useWriteContract()
  const { writeContract: writeCancelJob, data: cancelJobHash, isPending: isCancellingJob } = useWriteContract()
  const { writeContract: writeAssignWorkerDirectly, data: assignWorkerHash, isPending: isAssigningWorker } = useWriteContract()

  // Wait for transactions
  const { isLoading: isPlaceBidConfirming } = useWaitForTransactionReceipt({ hash: placeBidHash })
  const { isLoading: isAcceptBidConfirming } = useWaitForTransactionReceipt({ hash: acceptBidHash })
  const { isLoading: isCompleteJobConfirming } = useWaitForTransactionReceipt({ hash: completeJobHash })
  const { isLoading: isCancelJobConfirming } = useWaitForTransactionReceipt({ hash: cancelJobHash })
  const { isLoading: isAssigningWorkerConfirming } = useWaitForTransactionReceipt({ hash: assignWorkerHash })

  // Get job counter
  const { data: jobCounter, refetch: refetchJobCounter } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'jobCounter',
    query: {
      enabled: !!GIGESCROW_ADDRESS,
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


  // Handler functions
  const handlePlaceBid = async (jobId: bigint, bidAmount: string = '0'): Promise<void> => {
    if (!address || !isConnected) throw new Error('Wallet not connected')
    
    // Log for debugging
    console.log('Placing bid:', {
      jobId: jobId.toString(),
      bidAmount,
      contractAddress: GIGESCROW_ADDRESS,
      caller: address
    })
    
    try {
      const result = await writePlaceBid({
        address: GIGESCROW_ADDRESS,
        abi: gigEscrowAbi,
        functionName: 'placeBid',
        args: [jobId, parseEther(bidAmount)],
      })
      
      console.log('Bid transaction submitted:', result)
      return result
    } catch (error: any) {
      console.error('Error placing bid:', {
        error,
        message: error?.message,
        shortMessage: error?.shortMessage,
        data: error?.data,
        cause: error?.cause,
        stack: error?.stack
      })
      
      // Parse and improve error messages
      const errorMessage = error?.message || error?.toString() || error?.shortMessage || 'Unknown error'
      const errorData = error?.data || error?.cause?.data
      
      // Check for common contract errors
      if (errorMessage.includes('JobNotFound') || errorMessage.includes('not found')) {
        throw new Error('JobNotFound: The specified job does not exist')
      } else if (errorMessage.includes('JobAlreadyAssigned') || errorMessage.includes('already assigned')) {
        throw new Error('JobAlreadyAssigned: This job already has an assigned worker')
      } else if (errorMessage.includes('JobAlreadyCancelled') || errorMessage.includes('cancelled')) {
        throw new Error('JobAlreadyCancelled: Cannot place bid on a cancelled job')
      } else if (errorMessage.includes('User rejected') || errorMessage.includes('user rejected') || errorMessage.includes('rejected the request')) {
        throw new Error('User rejected: Transaction was cancelled')
      } else if (errorMessage.includes('execution reverted') || errorMessage.includes('revert')) {
        // Try to extract revert reason
        const revertMatch = errorMessage.match(/revert\s+(\w+)/i) || errorMessage.match(/reverted\s+with\s+reason\s+string\s+['"]?(\w+)/i)
        if (revertMatch && revertMatch[1]) {
          const revertReason = revertMatch[1]
          throw new Error(`Contract Error: ${revertReason}`)
        }
        throw new Error('Transaction failed: Contract execution reverted. Please check job status.')
      } else if (errorMessage.includes('insufficient funds') || errorMessage.includes('balance')) {
        throw new Error('Insufficient balance. Please check your STT balance for gas fees.')
      } else if (errorMessage.includes('Internal JSON-RPC error') || errorMessage.includes('network')) {
        throw new Error('Network error. Please check your connection and try again.')
      }
      
      throw error
    }
  }

  const handleAcceptBid = async (jobId: bigint, workerAddress: `0x${string}`): Promise<void> => {
    if (!address || !isConnected) throw new Error('Wallet not connected')
    
    try {
      await writeAcceptBid({
        address: GIGESCROW_ADDRESS,
        abi: gigEscrowAbi,
        functionName: 'acceptBid',
        args: [jobId, workerAddress],
      })
    } catch (error) {
      console.error('Error accepting bid:', error)
      throw error
    }
  }

  const handleCompleteJob = async (jobId: bigint): Promise<void> => {
    if (!address || !isConnected) throw new Error('Wallet not connected')
    
    try {
      await writeCompleteJob({
        address: GIGESCROW_ADDRESS,
        abi: gigEscrowAbi,
        functionName: 'completeJob',
        args: [jobId],
      })
    } catch (error) {
      console.error('Error completing job:', error)
      throw error
    }
  }

  const handleCancelJob = async (jobId: bigint): Promise<void> => {
    if (!address || !isConnected) throw new Error('Wallet not connected')
    
    try {
      await writeCancelJob({
        address: GIGESCROW_ADDRESS,
        abi: gigEscrowAbi,
        functionName: 'cancelJob',
        args: [jobId],
      })
    } catch (error) {
      console.error('Error cancelling job:', error)
      throw error
    }
  }

  const handleAssignWorkerDirectly = async (jobId: bigint, workerAddress: `0x${string}`): Promise<void> => {
    if (!address || !isConnected) throw new Error('Wallet not connected')
    
    // Validate worker address format
    if (!workerAddress || !workerAddress.startsWith('0x') || workerAddress.length !== 42) {
      throw new Error('InvalidAddress: Worker address must be a valid Ethereum address (0x...42 characters)')
    }
    
    // Normalize address to checksum format using viem's getAddress
    let normalizedAddress: `0x${string}`
    try {
      normalizedAddress = getAddress(workerAddress)
    } catch (error) {
      throw new Error('InvalidAddress: Invalid Ethereum address format')
    }
    
    try {
      // Log for debugging
      console.log('Assigning worker directly:', {
        jobId: jobId.toString(),
        workerAddress: normalizedAddress,
        contractAddress: GIGESCROW_ADDRESS,
        caller: address
      })
      
      const result = await writeAssignWorkerDirectly({
        address: GIGESCROW_ADDRESS,
        abi: gigEscrowAbi,
        functionName: 'assignWorkerDirectly',
        args: [jobId, normalizedAddress],
      })
      
      console.log('Transaction submitted:', result)
      
      // Return the transaction hash
      return result
    } catch (error: any) {
      console.error('Error assigning worker directly:', {
        error,
        message: error?.message,
        shortMessage: error?.shortMessage,
        data: error?.data,
        cause: error?.cause,
        stack: error?.stack
      })
      
      // Parse and improve error messages
      const errorMessage = error?.message || error?.toString() || error?.shortMessage || 'Unknown error'
      const errorData = error?.data || error?.cause?.data
      
      // Check for common contract errors from revert reasons
      if (errorData) {
        // Try to decode error data
        if (errorData.includes('NotAuthorized') || errorMessage.includes('NotAuthorized')) {
          throw new Error('NotAuthorized: You are not the employer of this job')
        } else if (errorData.includes('JobAlreadyAssigned') || errorMessage.includes('JobAlreadyAssigned')) {
          throw new Error('JobAlreadyAssigned: This job already has an assigned worker')
        } else if (errorData.includes('JobNotFound') || errorMessage.includes('JobNotFound')) {
          throw new Error('JobNotFound: The specified job does not exist')
        } else if (errorData.includes('JobAlreadyCancelled') || errorMessage.includes('JobAlreadyCancelled')) {
          throw new Error('JobAlreadyCancelled: Cannot assign worker to a cancelled job')
        } else if (errorData.includes('InvalidAddress') || errorMessage.includes('InvalidAddress')) {
          throw new Error('InvalidAddress: The worker address is invalid')
        }
      }
      
      // Check error message patterns
      if (errorMessage.includes('NotAuthorized') || errorMessage.includes('not authorized') || errorMessage.includes('Unauthorized')) {
        throw new Error('NotAuthorized: You are not the employer of this job')
      } else if (errorMessage.includes('JobAlreadyAssigned') || errorMessage.includes('already assigned')) {
        throw new Error('JobAlreadyAssigned: This job already has an assigned worker')
      } else if (errorMessage.includes('JobNotFound') || errorMessage.includes('not found')) {
        throw new Error('JobNotFound: The specified job does not exist')
      } else if (errorMessage.includes('JobAlreadyCancelled') || errorMessage.includes('cancelled')) {
        throw new Error('JobAlreadyCancelled: Cannot assign worker to a cancelled job')
      } else if (errorMessage.includes('InvalidAddress') || errorMessage.includes('invalid address')) {
        throw new Error('InvalidAddress: The worker address is invalid')
      } else if (errorMessage.includes('User rejected') || errorMessage.includes('user rejected') || errorMessage.includes('rejected the request')) {
        throw new Error('User rejected: Transaction was cancelled')
      } else if (errorMessage.includes('execution reverted') || errorMessage.includes('revert')) {
        // Try to extract revert reason
        const revertMatch = errorMessage.match(/revert\s+(\w+)/i)
        if (revertMatch) {
          throw new Error(`Contract Error: ${revertMatch[1]}`)
        }
        throw new Error('Transaction failed: Contract execution reverted. Please check job status and permissions.')
      } else if (errorMessage.includes('function') && errorMessage.includes('not found')) {
        throw new Error('Contract Error: Function not found. The contract may need to be redeployed with the latest version.')
      }
      
      throw error
    }
  }

  return {
    reputation,
    userJobIds: userJobIds || [],
    workerJobIds: workerJobIds || [],
    jobCounter: jobCounter || 0n,
    // Write functions
    placeBid: handlePlaceBid,
    acceptBid: handleAcceptBid,
    completeJob: handleCompleteJob,
    cancelJob: handleCancelJob,
    assignWorkerDirectly: handleAssignWorkerDirectly,
    // Loading states
    isPlacingBid: isPlacingBid || isPlaceBidConfirming,
    isAcceptingBid: isAcceptingBid || isAcceptBidConfirming,
    isCompletingJob: isCompletingJob || isCompleteJobConfirming,
    isCancellingJob: isCancellingJob || isCancelJobConfirming,
    isAssigningWorker: isAssigningWorker || isAssigningWorkerConfirming,
    assignWorkerHash,
    // Refetch function
    refetch: () => {
      refetchReputation()
      refetchUserJobs()
      refetchWorkerJobs()
      refetchJobCounter()
    },
  }
}

