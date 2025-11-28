import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'

// Get projectId from https://dashboard.reown.com
// Trim to remove any whitespace or newlines from environment variables
export const projectId = (process.env.NEXT_PUBLIC_PROJECT_ID || '6fd397eb41ba4744205068f35b888825').trim()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Somnia Shannon Testnet configuration
const somniaShannonTestnet = defineChain({
  id: 50312,
  name: 'Somnia Shannon Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Shannon Test Token',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_SOMNIA_RPC_URL || 'https://dream-rpc.somnia.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Somnia Explorer',
      url: 'https://shannon-explorer.somnia.network',
    },
  },
})

export const networks = [somniaShannonTestnet]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig

