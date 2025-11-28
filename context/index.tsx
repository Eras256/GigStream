'use client'

import { wagmiAdapter, projectId } from '../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'GigStream MX',
  description: 'Real-time freelance on Somnia Data Streams',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://gigstream-mx.vercel.app',
  icons: ['/logo.png']
}

// Create the modal
// Use networks from wagmiAdapter which are already in the correct format
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: wagmiAdapter.networks as any, // Networks are configured in the adapter
  defaultNetwork: wagmiAdapter.networks[0] as any,
  metadata: metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider

