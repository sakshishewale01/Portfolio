import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

/**
 * RotatingText component that cycles through roles every 2.5s.
 * Pauses when document tab is hidden.
 * Under reduced motion, displays the first role statically.
 * Reserving line-height space prevents layout shift.
 */
export function RotatingText({
  roles = [],
  interval = 2500,
  className,
}) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion || roles.length <= 1) return

    let timerId = null

    const startTimer = () => {
      timerId = setInterval(() => {
        setIndex((prev) => (prev + 1) % roles.length)
      }, interval)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerId) clearInterval(timerId)
      } else {
        startTimer()
      }
    }

    startTimer()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (timerId) clearInterval(timerId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [roles, interval, reducedMotion])

  const currentRole = roles[index] || roles[0] || ''

  if (reducedMotion) {
    return (
      <p
        aria-live="off"
        className={cn("inline-block font-mono text-accent", className)}
      >
        {roles[0] || ''}
      </p>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center relative overflow-hidden align-baseline h-[1.35em]",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentRole}
          initial={{ y: '100%', opacity: 0 }}
          animate={{
            y: '0%',
            opacity: 1,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            y: '-100%',
            opacity: 0,
            transition: { duration: 0.25, ease: 'easeIn' },
          }}
          className="inline-block whitespace-nowrap font-mono text-accent"
        >
          {currentRole}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
