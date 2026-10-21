import { useState, useEffect } from 'react'

/**
 * Hook to track which section is currently active in the viewport using IntersectionObserver.
 * @param {string[]} sectionIds - Array of section DOM element IDs to observe
 * @param {Object} [options] - Optional IntersectionObserver configuration
 * @returns {string} The active section ID
 */
export function useActiveSection(sectionIds = [], options = {}) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home')

  useEffect(() => {
    if (!sectionIds.length || typeof window === 'undefined') return

    // Special scroll listener for top and bottom page boundaries
    const handleScrollBoundaries = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      if (scrollY < 80) {
        setActiveSection(sectionIds[0])
      } else if (winHeight + scrollY >= docHeight - 60) {
        setActiveSection(sectionIds[sectionIds.length - 1])
      }
    }

    const observerOptions = {
      root: null,
      rootMargin: options.rootMargin || '-25% 0px -55% 0px',
      threshold: options.threshold || 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })

    window.addEventListener('scroll', handleScrollBoundaries, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScrollBoundaries)
    }
  }, [sectionIds, options.rootMargin, options.threshold])

  return activeSection
}
