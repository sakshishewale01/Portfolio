import { useState, useEffect } from 'react'

const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

/**
 * Custom hook to fetch JSON with sessionStorage caching and graceful fallback.
 * Survives network outages, rate-limits, and offline mode.
 *
 * @param {string} url - API endpoint to query
 * @param {Object} [fallbackData=null] - Static data fallback if fetch fails
 * @param {Object} [options={}] - Optional RequestInit config
 * @returns {{ data: any, loading: boolean, error: string|null, isFallback: boolean }}
 */
export function useFetch(url, fallbackData = null, options = {}) {
  const [data, setData] = useState(fallbackData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    if (!url) {
      setLoading(false)
      return
    }

    let isMounted = true
    const cacheKey = `portfolio_fetch_${url}`

    // 1. Check SessionStorage Cache
    try {
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        const { timestamp, payload } = JSON.parse(cached)
        const age = Date.now() - timestamp

        if (age < CACHE_TTL_MS && payload) {
          if (isMounted) {
            setData(payload)
            setLoading(false)
            setError(null)
            setIsFallback(false)
          }
          return
        }
      }
    } catch {
      // Ignore sessionStorage exceptions (e.g. private browsing quota)
    }

    // 2. Perform Network Fetch with Timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    fetch(url, { ...options, signal: controller.signal })
      .then(async (response) => {
        clearTimeout(timeoutId)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return response.json()
      })
      .then((json) => {
        if (!isMounted) return

        // Save fresh payload to cache
        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), payload: json })
          )
        } catch {
          // Ignore cache write errors
        }

        setData(json)
        setLoading(false)
        setError(null)
        setIsFallback(false)
      })
      .catch((err) => {
        if (!isMounted) return
        clearTimeout(timeoutId)

        // Seamless fallback to static profile data
        setData(fallbackData)
        setLoading(false)
        setError(err.name === 'AbortError' ? 'Request timed out' : err.message)
        setIsFallback(true)
      })

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [url])

  return { data, loading, error, isFallback }
}
