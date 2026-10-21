import { useState, useEffect } from 'react'

/**
 * Hook to track overall window scroll progress (0 to 1).
 * @returns {{ progress: number, scrollY: number }}
 */
export function useScrollProgress() {
  const [scrollData, setScrollData] = useState({ progress: 0, scrollY: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0
      setScrollData({ progress, scrollY })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollData
}
