// src/components/ui/use-toast.tsx - Toast Hook
'use client'

import { useState, useCallback } from 'react'

export interface Toast {
  title?: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = useCallback((toastData: Toast) => {
    setToast(toastData)
    if (toastData.duration !== 0) {
      setTimeout(() => {
        setToast(null)
      }, toastData.duration || 5000)
    }
  }, [])

  return {
    toast,
    showToast,
  }
}

