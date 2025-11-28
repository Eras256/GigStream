'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Loader2, ExternalLink, Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SOMNIA_CONFIG } from '@/lib/contracts'

export type TransactionStatus = 'pending' | 'success' | 'error'

export interface TransactionNotificationProps {
  status: TransactionStatus
  title: string
  message: string
  transactionHash?: string
  onClose?: () => void
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export default function TransactionNotification({
  status,
  title,
  message,
  transactionHash,
  onClose,
  duration = 8000,
  className = '',
  style
}: TransactionNotificationProps) {
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0 && status !== 'pending') {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 300) // Wait for exit animation
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, status, onClose])

  const explorerUrl = transactionHash 
    ? `${SOMNIA_CONFIG.explorerUrl}/tx/${transactionHash}`
    : null

  const copyHash = () => {
    if (transactionHash) {
      navigator.clipboard.writeText(transactionHash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle2,
          bgGradient: 'from-mx-green/20 via-emerald-400/10 to-mx-green/20',
          borderColor: 'border-mx-green/40',
          iconColor: 'text-mx-green',
          iconBg: 'bg-mx-green/20',
          glow: 'shadow-[0_0_30px_hsl(var(--mx-green)/0.4)]',
          pulseColor: 'bg-mx-green'
        }
      case 'error':
        return {
          icon: XCircle,
          bgGradient: 'from-red-500/20 via-rose-500/10 to-red-500/20',
          borderColor: 'border-red-500/40',
          iconColor: 'text-red-400',
          iconBg: 'bg-red-500/20',
          glow: 'shadow-[0_0_30px_hsl(0_100%_50%/0.4)]',
          pulseColor: 'bg-red-500'
        }
      case 'pending':
        return {
          icon: Loader2,
          bgGradient: 'from-somnia-purple/20 via-somnia-cyan/10 to-somnia-purple/20',
          borderColor: 'border-somnia-purple/40',
          iconColor: 'text-somnia-cyan',
          iconBg: 'bg-somnia-purple/20',
          glow: 'shadow-[0_0_30px_hsl(var(--somnia-purple)/0.4)]',
          pulseColor: 'bg-somnia-cyan'
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8, rotateX: -15 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0,
            ...(status === 'success' ? {
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            } : {})
          }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            damping: 20, 
            stiffness: 300,
            ...(status === 'success' ? {
              scale: {
                repeat: 1,
                duration: 0.6,
                times: [0, 0.5, 1]
              },
              rotate: {
                repeat: 1,
                duration: 0.6,
                times: [0, 0.25, 0.5, 1]
              }
            } : {})
          }}
          className={`relative w-full max-w-md ${className}`}
          style={style}
        >
          <motion.div
            className={`
              backdrop-blur-2xl rounded-2xl border-2 ${config.borderColor}
              bg-gradient-to-br ${config.bgGradient}
              ${config.glow}
              p-4 md:p-6
              relative overflow-visible
            `}
            animate={status === 'success' ? {
              boxShadow: [
                '0 0 30px hsl(var(--mx-green)/0.4)',
                '0 0 50px hsl(var(--mx-green)/0.6)',
                '0 0 30px hsl(var(--mx-green)/0.4)',
              ],
            } : {}}
            transition={status === 'success' ? {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            } : {}}
          >
            {/* Animated background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'linear'
              }}
            />

            {/* Pulsing glow effect */}
            {status === 'pending' && (
              <motion.div
                className={`absolute inset-0 ${config.pulseColor} opacity-20 rounded-2xl`}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut'
                }}
              />
            )}

            {/* Success celebration particles */}
            {status === 'success' && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-mx-green rounded-full"
                    initial={{
                      x: '50%',
                      y: '50%',
                      opacity: 1,
                      scale: 0,
                    }}
                    animate={{
                      x: `${50 + (Math.cos(i * 60 * Math.PI / 180) * 100)}%`,
                      y: `${50 + (Math.sin(i * 60 * Math.PI / 180) * 100)}%`,
                      opacity: [1, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </>
            )}

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Icon with animation */}
                  <motion.div
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-xl ${config.iconBg}
                      flex items-center justify-center flex-shrink-0
                      ${status === 'success' ? 'shadow-[0_0_20px_hsl(var(--mx-green)/0.6)]' : ''}
                    `}
                    animate={status === 'pending' ? {
                      rotate: 360
                    } : status === 'success' ? {
                      scale: [1, 1.3, 1.1, 1],
                      rotate: [0, 10, -10, 0],
                    } : {
                      scale: [1, 1.1, 1],
                    }}
                    transition={status === 'pending' ? {
                      repeat: Infinity,
                      duration: 1,
                      ease: 'linear'
                    } : status === 'success' ? {
                      duration: 0.8,
                      times: [0, 0.3, 0.6, 1],
                      ease: 'easeOut'
                    } : {
                      duration: 0.5,
                      times: [0, 0.5, 1]
                    }}
                  >
                    <motion.div
                      animate={status === 'success' ? {
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={status === 'success' ? {
                        duration: 0.6,
                        times: [0, 0.5, 1],
                        delay: 0.2
                      } : {}}
                    >
                      <Icon className={`w-6 h-6 md:w-7 md:h-7 ${config.iconColor}`} />
                    </motion.div>
                  </motion.div>

                  {/* Title and message */}
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-white font-bold text-base md:text-lg mb-1 truncate"
                    >
                      {title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/70 text-sm md:text-base line-clamp-2"
                    >
                      {message}
                    </motion.p>
                  </div>
                </div>

                {/* Close button */}
                {onClose && status !== 'pending' && (
                  <motion.button
                    onClick={() => {
                      setIsVisible(false)
                      setTimeout(() => onClose?.(), 300)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/60 hover:text-white transition-colors flex-shrink-0"
                  >
                    <XCircle className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {/* Transaction hash section */}
              {transactionHash && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Hash display */}
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 flex-1 min-w-0">
                      <span className="text-white/50 text-xs font-mono flex-shrink-0">
                        TX:
                      </span>
                      <span className="text-white/80 text-xs md:text-sm font-mono truncate">
                        {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                      </span>
                    </div>

                    {/* Copy button */}
                    <motion.button
                      onClick={copyHash}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        px-3 py-2 rounded-lg transition-colors flex-shrink-0
                        ${copied 
                          ? 'bg-mx-green/20 text-mx-green' 
                          : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                        }
                      `}
                      title={copied ? 'Copied!' : 'Copy hash'}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </motion.button>

                    {/* Explorer link */}
                    {explorerUrl && (
                      <motion.a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(explorerUrl, '_blank', 'noopener,noreferrer')
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="
                          px-4 py-2 rounded-lg bg-gradient-to-r from-somnia-cyan/30 to-somnia-purple/30
                          hover:from-somnia-cyan/40 hover:to-somnia-purple/40
                          border-2 border-somnia-cyan/50 text-white
                          flex items-center gap-2 text-xs md:text-sm font-semibold
                          transition-all flex-shrink-0 cursor-pointer
                          shadow-lg hover:shadow-somnia-cyan/50
                          relative z-10
                        "
                        style={{ pointerEvents: 'auto' }}
                      >
                        <span>View</span>
                        <motion.div
                          animate={status === 'success' ? {
                            rotate: [0, 15, -15, 0],
                          } : {}}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: 'easeInOut'
                          }}
                        >
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                        </motion.div>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Progress bar for pending */}
              {status === 'pending' && (
                <motion.div
                  className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className={`h-full ${config.pulseColor} rounded-full`}
                    animate={{
                      width: ['0%', '100%'],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

