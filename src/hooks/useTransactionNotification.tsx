'use client'

import { useState, useCallback } from 'react'
import TransactionNotification, { TransactionStatus } from '@/components/gigstream/TransactionNotification'

export interface TransactionNotificationData {
  id: string
  status: TransactionStatus
  title: string
  message: string
  transactionHash?: string
  duration?: number
}

export function useTransactionNotification() {
  const [notifications, setNotifications] = useState<TransactionNotificationData[]>([])

  const showSuccess = useCallback((
    title: string,
    message: string,
    transactionHash?: string,
    duration?: number
  ) => {
    const id = `success-${Date.now()}-${Math.random()}`
    setNotifications(prev => [...prev, {
      id,
      status: 'success',
      title,
      message,
      transactionHash,
      duration: duration || 8000
    }])
    return id
  }, [])

  const showError = useCallback((
    title: string,
    message: string,
    transactionHash?: string,
    duration?: number
  ) => {
    const id = `error-${Date.now()}-${Math.random()}`
    setNotifications(prev => [...prev, {
      id,
      status: 'error',
      title,
      message,
      transactionHash,
      duration: duration || 10000
    }])
    return id
  }, [])

  const showPending = useCallback((
    title: string,
    message: string,
    transactionHash?: string
  ) => {
    const id = `pending-${Date.now()}-${Math.random()}`
    setNotifications(prev => [...prev, {
      id,
      status: 'pending',
      title,
      message,
      transactionHash,
      duration: 0 // Don't auto-close pending notifications
    }])
    return id
  }, [])

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const updateNotification = useCallback((
    id: string,
    updates: Partial<Omit<TransactionNotificationData, 'id'>>
  ) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, ...updates } : n
    ))
  }, [])

  const NotificationComponents = notifications.length > 0 ? (
    <div className="fixed top-4 right-4 left-4 md:left-auto z-[10000] flex flex-col gap-3 max-w-md pointer-events-none">
      {notifications.map((notification, index) => (
        <div key={notification.id} className="pointer-events-auto relative z-[10000]" style={{ zIndex: 10000 + index }}>
          <TransactionNotification
            status={notification.status}
            title={notification.title}
            message={notification.message}
            transactionHash={notification.transactionHash}
            duration={notification.duration}
            onClose={() => clearNotification(notification.id)}
            className="relative"
          />
        </div>
      ))}
    </div>
  ) : null

  return {
    notifications,
    showSuccess,
    showError,
    showPending,
    clearNotification,
    updateNotification,
    NotificationComponents
  }
}

