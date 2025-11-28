// src/components/gigstream/ContractAddressVerifier.tsx - Verify contract address is correct
'use client'

import { useEffect, useState } from 'react'
import { useReadContract } from 'wagmi'
import { gigEscrowAbi } from '@/lib/viem'
import { GIGESCROW_ADDRESS } from '@/lib/contracts'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const EXPECTED_ADDRESS = '0x8D742671508E1C5BFF77f3d0AE70218C8Cc57Cef'
const OLD_ADDRESSES = [
  '0x7094f1eb1c49Cf89B793844CecE4baE655f3359b',
  '0x7c9Fc11dB4FC9120A0A066077DFF2BF8243F7AE7'
]

export default function ContractAddressVerifier() {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Try to read jobCounter to verify contract is accessible
  const { data: jobCounter, isError, error: readError } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'jobCounter',
  })

  useEffect(() => {
    const currentAddress = GIGESCROW_ADDRESS.toLowerCase()
    const expectedAddress = EXPECTED_ADDRESS.toLowerCase()
    
    if (currentAddress === expectedAddress) {
      setIsCorrect(true)
      setError(null)
    } else if (OLD_ADDRESSES.some(addr => currentAddress === addr.toLowerCase())) {
      setIsCorrect(false)
      setError(`Using old contract address. Expected: ${EXPECTED_ADDRESS}`)
    } else {
      setIsCorrect(false)
      setError(`Unknown contract address: ${GIGESCROW_ADDRESS}`)
    }
  }, [])

  // Only show warning if address is incorrect
  if (isCorrect === null) return null

  if (!isCorrect) {
    return (
      <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
        <div className="flex items-center space-x-2 mb-2">
          <XCircle className="w-5 h-5" />
          <span className="font-bold">⚠️ Contract Address Mismatch</span>
        </div>
        <p className="text-sm mb-2">{error}</p>
        <p className="text-xs text-red-400/80">
          Current: <span className="font-mono">{GIGESCROW_ADDRESS}</span>
        </p>
        <p className="text-xs text-red-400/80">
          Expected: <span className="font-mono">{EXPECTED_ADDRESS}</span>
        </p>
        <p className="text-xs mt-2">
          💡 <strong>Solution:</strong> Update <code className="bg-red-500/20 px-1 rounded">.env.local</code> with:
        </p>
        <pre className="text-xs mt-1 p-2 bg-red-500/10 rounded border border-red-500/20 overflow-x-auto">
{`NEXT_PUBLIC_GIGESCROW_ADDRESS=${EXPECTED_ADDRESS}
NEXT_PUBLIC_REPUTATION_TOKEN_ADDRESS=0x995759f140029e4fEabCE8F555f5536A1b413562
NEXT_PUBLIC_STAKING_POOL_ADDRESS=0x6934126deC72a3Dba22a9C5D5300620E894C72a8`}
        </pre>
        <p className="text-xs mt-2">
          Then restart the development server and clear browser cache.
        </p>
      </div>
    )
  }

  // Show success if contract is accessible
  if (isError) {
    return (
      <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-400">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold">⚠️ Cannot Access Contract</span>
        </div>
        <p className="text-sm">
          Error reading from contract: {readError?.message || 'Unknown error'}
        </p>
        <p className="text-xs mt-2 font-mono">
          Address: {GIGESCROW_ADDRESS}
        </p>
      </div>
    )
  }

  // Show success message
  return (
    <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-5 h-5" />
        <span className="font-bold">✅ Contract Connected</span>
      </div>
      <p className="text-xs mt-1 font-mono">
        {GIGESCROW_ADDRESS} (Jobs: {jobCounter?.toString() || '0'})
      </p>
    </div>
  )
}

