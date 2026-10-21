import { useState, useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Hook to smoothly count numbers up using requestAnimationFrame.
 * Skips animation and renders target immediately if reduced motion is preferred.
 *
 * @param {number} target - The numeric target value
 * @param {number} [duration=1600] - Animation duration in ms
 * @param {boolean} [start=true] - Whether counting should begin
 * @returns {number} Current count
 */
export function useCountUp(target, duration = 1600, start = true) {
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(() => (reducedMotion ? target : 0))

  useEffect(() => {
    if (reducedMotion || !start) {
      setCount(target)
      return
    }

    let startTime = null
    let animationFrameId = null

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic: fast rise, soft landing
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(easeOut * target)

      setCount(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(animateCount)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [target, duration, start, reducedMotion])

  return count
}
