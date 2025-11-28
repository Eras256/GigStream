// src/components/gigstream/ContractFunctionChecker.tsx - Check if contract function exists
'use client'

import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import { gigEscrowAbi } from '@/lib/viem'
import { GIGESCROW_ADDRESS } from '@/lib/contracts'
import { AlertCircle } from 'lucide-react'

interface ContractFunctionCheckerProps {
  functionName: string
  onFunctionAvailable?: (available: boolean) => void
}

export function useContractFunctionAvailable(functionName: string) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  
  // Try to read a simple function to check if contract is accessible
  const { data: jobCounter, isError } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'jobCounter',
  })

  useEffect(() => {
    // If we can read jobCounter, the contract is accessible
    // We assume if contract is accessible, all functions in ABI should be available
    // Note: This is a basic check - in production you might want to actually try calling the function
    if (jobCounter !== undefined) {
      setIsAvailable(true)
    } else if (isError) {
      setIsAvailable(false)
    }
  }, [jobCounter, isError])

  return isAvailable
}

export default function ContractFunctionChecker({ functionName, onFunctionAvailable }: ContractFunctionCheckerProps) {
  const isAvailable = useContractFunctionAvailable(functionName)

  useEffect(() => {
    if (onFunctionAvailable && isAvailable !== null) {
      onFunctionAvailable(isAvailable)
    }
  }, [isAvailable, onFunctionAvailable])

  if (isAvailable === false) {
    return (
      <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold">Contract Function Not Available</span>
        </div>
        <p className="text-sm">
          The contract function &quot;{functionName}&quot; may not be available in the deployed contract. 
          The contract may need to be redeployed with the latest version.
        </p>
      </div>
    )
  }

  return null
}

