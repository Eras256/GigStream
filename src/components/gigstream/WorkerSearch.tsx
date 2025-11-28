// src/components/gigstream/WorkerSearch.tsx - Worker Search Component
'use client'

import { motion } from 'framer-motion'
import { Search, User, CheckCircle, XCircle, Clock, Briefcase, Copy, CopyCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useGigStream } from '@/hooks/useGigStream'
import { useReadContract } from 'wagmi'
import { gigEscrowAbi } from '@/lib/viem'
import { GIGESCROW_ADDRESS } from '@/lib/contracts'
import { formatEther } from 'viem'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useToast } from '@/components/ui/use-toast'

interface WorkerSearchProps {
  onSelectWorker: (address: `0x${string}`) => void
  selectedWorker?: `0x${string}` | null
  availableWorkers?: `0x${string}`[] // Workers from bids or previous jobs
}

export default function WorkerSearch({ onSelectWorker, selectedWorker, availableWorkers = [] }: WorkerSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<`0x${string}`[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showFullAddress, setShowFullAddress] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const { showToast } = useToast()

  const handleSearch = async () => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    const query = searchQuery.toLowerCase()
    
    // Search through available workers first
    const matchingWorkers = availableWorkers.filter(addr => 
      addr.toLowerCase().includes(query) || 
      addr.toLowerCase().startsWith(query)
    )
    
    // If it's a valid full address, add it
    if (searchQuery.startsWith('0x') && searchQuery.length === 42) {
      const fullAddress = searchQuery as `0x${string}`
      if (!matchingWorkers.includes(fullAddress)) {
        matchingWorkers.push(fullAddress)
      }
    }
    
    setSearchResults(matchingWorkers)
    setIsSearching(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, availableWorkers])

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    showToast({
      title: "Address Copied",
      description: "Worker address copied to clipboard",
      duration: 2000
    })
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
        <p className="text-white/80 text-sm mb-2">
          <strong className="text-white">How to assign a worker:</strong>
        </p>
        <ul className="text-white/60 text-xs space-y-1 list-disc list-inside">
          <li>Paste the worker&apos;s full address (0x...42 characters) in the field below</li>
          <li>Or select from available workers who have placed bids</li>
          <li>Or search by typing part of an address</li>
        </ul>
      </div>

      {/* Direct address input */}
      <div className="space-y-2">
        <label className="text-white/80 text-sm font-mono">Worker Address (Paste full address here)</label>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value
              setSearchQuery(value)
              // Auto-select if it's a valid full address
              if (value.startsWith('0x') && value.length === 42) {
                onSelectWorker(value as `0x${string}`)
              }
            }}
            placeholder="0x1234567890abcdef1234567890abcdef12345678"
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 backdrop-blur-xl focus:outline-none focus:border-somnia-cyan/50 font-mono text-sm"
          />
          {searchQuery && searchQuery.startsWith('0x') && searchQuery.length === 42 && (
            <button
              onClick={() => copyToClipboard(searchQuery)}
              className="px-3 py-2 bg-somnia-cyan/20 hover:bg-somnia-cyan/30 border border-somnia-cyan/30 rounded-xl text-somnia-cyan transition-colors"
              title="Copy address"
            >
              {copiedAddress === searchQuery ? (
                <CopyCheck className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        {searchQuery && searchQuery.startsWith('0x') && searchQuery.length !== 42 && (
          <p className="text-yellow-400 text-xs">
            Address must be 42 characters (including 0x). Current: {searchQuery.length} characters
          </p>
        )}
      </div>

      {/* Show selected worker with full address */}
      {selectedWorker && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-somnia-cyan/20 border-2 border-somnia-cyan/50 rounded-2xl p-4 shadow-neural-glow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-somnia-cyan" />
              <span className="text-somnia-cyan font-bold">Worker Selected</span>
            </div>
            <button
              onClick={() => copyToClipboard(selectedWorker)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-somnia-cyan/30 hover:bg-somnia-cyan/40 border border-somnia-cyan/50 rounded-lg text-somnia-cyan transition-colors text-sm"
            >
              {copiedAddress === selectedWorker ? (
                <>
                  <CopyCheck className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="font-mono text-white break-all text-sm bg-black/20 rounded-lg p-3 border border-white/10">
            {selectedWorker}
          </div>
          <p className="text-somnia-cyan/80 text-xs mt-2">
            ✓ Ready to assign. Click &quot;Assign Worker&quot; button below.
          </p>
        </motion.div>
      )}

      {/* Available workers list (if no search query) */}
      {!searchQuery && availableWorkers.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">
              Workers from Bids ({availableWorkers.length})
            </p>
            <p className="text-white/50 text-xs">Click to select</p>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {availableWorkers.map((address) => (
              <WorkerInfo
                key={address}
                address={address}
                onSelect={onSelectWorker}
                isSelected={selectedWorker?.toLowerCase() === address.toLowerCase()}
                showFullAddress={true}
                onCopy={copyToClipboard}
                copiedAddress={copiedAddress}
              />
            ))}
          </div>
        </div>
      )}

      {/* Show message if no workers available and no search */}
      {!searchQuery && availableWorkers.length === 0 && (
        <div className="text-center py-6 text-white/50">
          <User className="w-12 h-12 mx-auto mb-3 text-white/30" />
          <p className="text-sm mb-1">No workers from bids yet</p>
          <p className="text-xs text-white/40">Paste a worker address above to assign directly</p>
        </div>
      )}

      {/* Search results */}
      {searchQuery && searchResults.length > 0 && (
        <div>
          <p className="text-white/70 text-sm mb-2">Search Results ({searchResults.length}):</p>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {searchResults.map((address) => (
              <WorkerInfo
                key={address}
                address={address}
                onSelect={onSelectWorker}
                isSelected={selectedWorker?.toLowerCase() === address.toLowerCase()}
                showFullAddress={true}
                onCopy={copyToClipboard}
                copiedAddress={copiedAddress}
              />
            ))}
          </div>
        </div>
      )}

      {searchQuery && searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-6 text-white/50 bg-white/5 rounded-xl border border-white/10">
          <Search className="w-8 h-8 mx-auto mb-2 text-white/30" />
          <p className="text-sm mb-1">No workers found matching &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-white/40 mb-3">
            Make sure the address starts with 0x and has 42 characters total
          </p>
          {searchQuery.startsWith('0x') && searchQuery.length < 42 && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-2 text-yellow-400 text-xs">
              Address too short: {searchQuery.length}/42 characters
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function WorkerInfo({ 
  address, 
  onSelect, 
  isSelected,
  showFullAddress = false,
  onCopy,
  copiedAddress
}: { 
  address: `0x${string}`
  onSelect: (address: `0x${string}`) => void
  isSelected: boolean
  showFullAddress?: boolean
  onCopy?: (address: string) => void
  copiedAddress?: string | null
}) {
  const { data: reputation } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'reputation',
    args: [address],
  })

  const { data: workerJobs } = useReadContract({
    address: GIGESCROW_ADDRESS,
    abi: gigEscrowAbi,
    functionName: 'getWorkerJobs',
    args: [address],
  })

  const completedJobs = workerJobs?.length || 0
  const repScore = reputation ? Number(reputation) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onSelect(address)}
      className={`backdrop-blur-xl rounded-2xl p-4 border cursor-pointer transition-all ${
        isSelected
          ? 'bg-somnia-cyan/20 border-somnia-cyan/50 shadow-neural-glow'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-4 h-4 text-somnia-cyan flex-shrink-0" />
            {showFullAddress ? (
              <div className="flex-1 min-w-0">
                <div className="font-mono text-white text-sm break-all">
                  {address}
                </div>
              </div>
            ) : (
              <span className="text-white font-mono text-sm">{address.slice(0, 6)}...{address.slice(-4)}</span>
            )}
            {isSelected && <CheckCircle className="w-4 h-4 text-somnia-cyan flex-shrink-0" />}
            {onCopy && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onCopy(address)
                }}
                className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
                title="Copy address"
              >
                {copiedAddress === address ? (
                  <CopyCheck className="w-4 h-4 text-somnia-cyan" />
                ) : (
                  <Copy className="w-4 h-4 text-white/70 hover:text-white" />
                )}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1 text-white/70">
              <Briefcase className="w-3 h-3" />
              <span>{completedJobs} jobs</span>
            </div>
            <div className="flex items-center space-x-1 text-white/70">
              <CheckCircle className="w-3 h-3" />
              <span>{repScore} rep</span>
            </div>
          </div>
        </div>
        {repScore < 10 && (
          <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-xs ml-2 flex-shrink-0">
            New
          </div>
        )}
      </div>
    </motion.div>
  )
}

