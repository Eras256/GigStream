// src/lib/contracts.ts - Contract Configuration for Somnia Network
// Centralized contract addresses and configuration
import { getAddress } from 'viem'

/**
 * GigEscrow Contract Address
 * Deployed on Somnia Testnet (Shannon) - Chain ID: 50312
 * Latest deployment: 0x8D742671508E1C5BFF77f3d0AE70218C8Cc57Cef (No reputation requirement for bids)
 * Explorer: https://shannon-explorer.somnia.network/address/0x8D742671508E1C5BFF77f3d0AE70218C8Cc57Cef
 */
const rawGigEscrowAddress = (process.env.NEXT_PUBLIC_GIGESCROW_ADDRESS || 
  '0x8D742671508E1C5BFF77f3d0AE70218C8Cc57Cef').trim()

export const GIGESCROW_ADDRESS = getAddress(rawGigEscrowAddress) as `0x${string}`

/**
 * ReputationToken Contract Address
 * ERC-20 token for reputation points
 * Deployed at: 0x995759f140029e4fEabCE8F555f5536A1b413562
 * Explorer: https://shannon-explorer.somnia.network/address/0x995759f140029e4fEabCE8F555f5536A1b413562
 */
const rawReputationAddress = (process.env.NEXT_PUBLIC_REPUTATION_TOKEN_ADDRESS || 
  '0x995759f140029e4fEabCE8F555f5536A1b413562').trim()

export const REPUTATION_TOKEN_ADDRESS = getAddress(rawReputationAddress) as `0x${string}`

/**
 * StakingPool Contract Address
 * Staking contract for workers to increase trust
 * Deployed at: 0x6934126deC72a3Dba22a9C5D5300620E894C72a8
 * Explorer: https://shannon-explorer.somnia.network/address/0x6934126deC72a3Dba22a9C5D5300620E894C72a8
 */
const rawStakingAddress = (process.env.NEXT_PUBLIC_STAKING_POOL_ADDRESS || 
  '0x6934126deC72a3Dba22a9C5D5300620E894C72a8').trim()

export const STAKING_POOL_ADDRESS = getAddress(rawStakingAddress) as `0x${string}`

/**
 * Somnia Network Configuration
 */
export const SOMNIA_CONFIG = {
  chainId: 50312,
  name: 'Somnia Shannon Testnet',
  rpcUrl: process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || 'https://dream-rpc.somnia.network',
  explorerUrl: 'https://shannon-explorer.somnia.network',
  nativeCurrency: {
    name: 'Shannon Test Token',
    symbol: 'STT',
    decimals: 18,
  },
} as const

/**
 * Verify contract address is valid
 */
export function isValidContractAddress(address: string): boolean {
  return address !== '0x0000000000000000000000000000000000000000' && 
         address.startsWith('0x') && 
         address.length === 42
}

