import { useState, useEffect } from 'react'

/**
 * Hook to detect scroll direction (up / down) and whether user is near the top of the page.
 * Used to intelligently show/hide floating navigation bars.
 */
export function useScrollDirection({ threshold = 10 } = {}) {
  const [scrollDirection, setScrollDirection] = useState('up')
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      setIsAtTop(scrollY < 50)

      const diff = scrollY - lastScrollY

      if (Math.abs(diff) < threshold) {
        return
      }

      if (diff > 0 && scrollY > 80) {
        setScrollDirection('down')
      } else if (diff < 0) {
        setScrollDirection('up')
      }

      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [threshold])

  return {
    scrollDirection,
    isAtTop,
    isVisible: isAtTop || scrollDirection === 'up',
  }
}
