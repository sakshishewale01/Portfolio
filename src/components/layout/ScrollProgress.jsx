import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * ScrollProgress bar rendering a thin 2px accent indicator at the top of the viewport.
 * Uses Framer Motion's useScroll and useSpring for smooth physics.
 * Automatically disabled under reduced motion.
 */
export function ScrollProgress() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  })

  if (reducedMotion) {
    return null
  }

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-50 origin-left pointer-events-none shadow-[0_0_8px_rgba(124,92,255,0.7)]"
      aria-hidden="true"
    />
  )
}
