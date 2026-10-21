import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const LenisContext = createContext({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
})

/**
 * Hook to access Lenis instance and control methods
 */
export function useLenis() {
  return useContext(LenisContext)
}

/**
 * SmoothScroll component initializing Lenis with RAF loop
 * Disables Lenis completely when prefers-reduced-motion is true.
 */
export function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef(null)
  const [lenisInstance, setLenisInstance] = useState(null)

  useEffect(() => {
    if (reducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        setLenisInstance(null)
      }
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [reducedMotion])

  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options)
    } else {
      // Fallback for reduced motion or SSR
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (typeof target === 'string') {
        const el = document.querySelector(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }, [])

  const stop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop()
    }
  }, [])

  const start = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start()
    }
  }, [])

  const contextValue = {
    lenis: lenisInstance,
    scrollTo,
    stop,
    start,
  }

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  )
}
