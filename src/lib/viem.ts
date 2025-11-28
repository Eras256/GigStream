// src/lib/viem.ts - Somnia Testnet Viem Client
import { createPublicClient, http } from 'viem'
import { SOMNIA_CONFIG } from './contracts'

// Somnia Shannon Testnet configuration
const somniaShannonTestnet = {
  id: SOMNIA_CONFIG.chainId,
  name: SOMNIA_CONFIG.name,
  nativeCurrency: SOMNIA_CONFIG.nativeCurrency,
  rpcUrls: {
    default: {
      http: [SOMNIA_CONFIG.rpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: 'Somnia Explorer',
      url: SOMNIA_CONFIG.explorerUrl,
    },
  },
} as const

export const publicClient = createPublicClient({
  chain: somniaShannonTestnet,
  transport: http(SOMNIA_CONFIG.rpcUrl)
})

// GigEscrow ABI - Complete contract interface for Somnia Network
export const gigEscrowAbi = [
  {
    name: 'postJob',
    type: 'function',
    inputs: [
      { name: '_title', type: 'string' },
      { name: '_location', type: 'string' },
      { name: '_reward', type: 'uint256' },
      { name: '_deadline', type: 'uint256' }
    ],
    stateMutability: 'payable',
    outputs: []
  },
  {
    name: 'placeBid',
    type: 'function',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: '_bid', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    outputs: []
  },
  {
    name: 'acceptBid',
    type: 'function',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: '_worker', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    outputs: []
  },
  {
    name: 'completeJob',
    type: 'function',
    inputs: [
      { name: '_jobId', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    outputs: []
  },
  {
    name: 'cancelJob',
    type: 'function',
    inputs: [
      { name: '_jobId', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    outputs: []
  },
  {
    name: 'assignWorkerDirectly',
    type: 'function',
    inputs: [
      { name: '_jobId', type: 'uint256' },
      { name: '_worker', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    outputs: []
  },
  {
    name: 'grantInitialReputation',
    type: 'function',
    inputs: [
      { name: '_user', type: 'address' },
      { name: '_amount', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    outputs: []
  },
  {
    name: 'owner',
    type: 'function',
    inputs: [],
    stateMutability: 'view',
    outputs: [
      { name: '', type: 'address' }
    ]
  },
  {
    name: 'getJob',
    type: 'function',
    inputs: [
      { name: '_jobId', type: 'uint256' }
    ],
    stateMutability: 'view',
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'employer', type: 'address' },
          { name: 'title', type: 'string' },
          { name: 'location', type: 'string' },
          { name: 'reward', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
          { name: 'worker', type: 'address' },
          { name: 'completed', type: 'bool' },
          { name: 'cancelled', type: 'bool' },
          { name: 'createdAt', type: 'uint256' }
        ]
      }
    ]
  },
  {
    name: 'getJobBids',
    type: 'function',
    inputs: [
      { name: '_jobId', type: 'uint256' }
    ],
    stateMutability: 'view',
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'worker', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'accepted', type: 'bool' }
        ]
      }
    ]
  },
  {
    name: 'getUserJobs',
    type: 'function',
    inputs: [
      { name: '_user', type: 'address' }
    ],
    stateMutability: 'view',
    outputs: [
      { name: '', type: 'uint256[]' }
    ]
  },
  {
    name: 'getWorkerJobs',
    type: 'function',
    inputs: [
      { name: '_worker', type: 'address' }
    ],
    stateMutability: 'view',
    outputs: [
      { name: '', type: 'uint256[]' }
    ]
  },
  {
    name: 'reputation',
    type: 'function',
    inputs: [
      { name: '', type: 'address' }
    ],
    stateMutability: 'view',
    outputs: [
      { name: '', type: 'uint256' }
    ]
  },
  {
    name: 'jobCounter',
    type: 'function',
    inputs: [],
    stateMutability: 'view',
    outputs: [
      { name: '', type: 'uint256' }
    ]
  },
  {
    name: 'jobs',
    type: 'function',
    inputs: [
      { name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    outputs: [
      { name: 'id', type: 'uint256' },
      { name: 'employer', type: 'address' },
      { name: 'title', type: 'string' },
      { name: 'location', type: 'string' },
      { name: 'reward', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
      { name: 'worker', type: 'address' },
      { name: 'completed', type: 'bool' },
      { name: 'cancelled', type: 'bool' },
      { name: 'createdAt', type: 'uint256' }
    ]
  },
  {
    name: 'JobPosted',
    type: 'event',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'employer', type: 'address', indexed: true },
      { name: 'title', type: 'string', indexed: false },
      { name: 'reward', type: 'uint256', indexed: false },
      { name: 'deadline', type: 'uint256', indexed: false }
    ]
  },
  {
    name: 'BidPlaced',
    type: 'event',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'worker', type: 'address', indexed: true },
      { name: 'bid', type: 'uint256', indexed: false },
      { name: 'timestamp', type: 'uint256', indexed: false }
    ]
  },
  {
    name: 'JobAccepted',
    type: 'event',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'worker', type: 'address', indexed: true },
      { name: 'employer', type: 'address', indexed: true }
    ]
  },
  {
    name: 'JobCompleted',
    type: 'event',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'worker', type: 'address', indexed: true },
      { name: 'reward', type: 'uint256', indexed: false }
    ]
  },
  {
    name: 'JobCancelled',
    type: 'event',
    inputs: [
      { name: 'jobId', type: 'uint256', indexed: true },
      { name: 'employer', type: 'address', indexed: true },
      { name: 'refundAmount', type: 'uint256', indexed: false }
    ]
  },
  {
    name: 'ReputationUpdated',
    type: 'event',
    inputs: [
      { name: 'user', type: 'address', indexed: true },
      { name: 'newReputation', type: 'uint256', indexed: false }
    ]
  }
] as const

