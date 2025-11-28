// src/hooks/useEventStream.ts - Hook to consume Server-Sent Events streams
'use client'

import { useState, useEffect, useRef } from 'react'

export interface StreamEvent {
  type: string
  receivedAt?: number
  [key: string]: any
}

interface UseEventStreamResult {
  events: StreamEvent[]
  isConnected: boolean
  error: Error | null
  clearEvents: () => void
}

/**
 * Hook to consume Server-Sent Events (SSE) streams
 * @param streamType - Type of stream to consume (jobs, bids, completions, cancellations, reputation)
 * @param enabled - Whether to connect to the stream (defaults to true)
 */
export function useEventStream(
  streamType: 'jobs' | 'bids' | 'completions' | 'cancellations' | 'reputation',
  enabled: boolean = true
): UseEventStreamResult {
  const [events, setEvents] = useState<StreamEvent[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    // Create EventSource connection
    const eventSource = new EventSource(`/api/streams?type=${streamType}`)
    eventSourceRef.current = eventSource

    eventSource.onopen = () => {
      console.log(`[useEventStream] Connected to ${streamType} stream`)
      setIsConnected(true)
      setError(null)
    }

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        // Handle connection message
        if (data.type === 'connected') {
          console.log(`[useEventStream] Received connection confirmation for ${streamType}`)
          setIsConnected(true)
          return
        }

        console.log(`[useEventStream] Received event for ${streamType}:`, data.type)

        // Add timestamp if not present
        const eventData: StreamEvent = {
          ...data,
          receivedAt: Date.now(),
        }

        setEvents((prev) => [eventData, ...prev].slice(0, 100)) // Keep last 100 events
      } catch (err) {
        console.error(`[useEventStream] Error parsing SSE event for ${streamType}:`, err)
      }
    }

    eventSource.onerror = (err) => {
      console.error(`EventSource error for ${streamType}:`, err)
      // Don't set error immediately - EventSource may reconnect automatically
      // Only set error if connection is closed
      if (eventSource.readyState === EventSource.CLOSED) {
        setError(new Error(`Failed to connect to ${streamType} stream`))
        setIsConnected(false)
      }
    }

    // Cleanup on unmount
    return () => {
      eventSource.close()
      eventSourceRef.current = null
    }
  }, [streamType, enabled])

  const clearEvents = () => {
    setEvents([])
  }

  return {
    events,
    isConnected,
    error,
    clearEvents,
  }
}

