import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { headers } from 'next/headers'
import ContextProvider from '../../context'
import { GeminiProvider } from '@/providers/GeminiProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GigStream - Global Real-time Freelance Marketplace on Somnia',
  description: 'Global decentralized marketplace for freelancers with Somnia Data Streams',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersObj = await headers()
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>
          <GeminiProvider>
            {children}
          </GeminiProvider>
        </ContextProvider>
      </body>
    </html>
  )
}

