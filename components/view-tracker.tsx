"use client"

import { useEffect } from "react"

interface ViewTrackerProps {
  postId: string
  slug: string
}

export function ViewTracker({ postId, slug }: ViewTrackerProps) {
  useEffect(() => {
    // Track view with debouncing to prevent multiple calls
    const trackView = async () => {
      try {
        // Check if we already tracked this view in this session
        const sessionKey = `viewed_${postId}`
        const hasViewed = sessionStorage.getItem(sessionKey)
        
        if (!hasViewed) {
          // Use API route to avoid client-side auth issues
          const response = await fetch('/api/track-view', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId }),
          })
          
          if (response.ok) {
            // Mark as viewed in this session
            sessionStorage.setItem(sessionKey, 'true')
            console.log(`View tracked for post: ${slug}`)
          } else {
            console.error('Failed to track view:', await response.text())
          }
        }
      } catch (error) {
        console.error('Error tracking view:', error)
      }
    }

    // Delay tracking to ensure user actually viewed the content
    const timer = setTimeout(trackView, 3000) // 3 seconds delay

    return () => clearTimeout(timer)
  }, [postId, slug])

  // This component doesn't render anything
  return null
}