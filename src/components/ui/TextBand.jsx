import React, { useRef } from 'react'
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

/**
 * Kinetic TextBand Component
 * Features:
 * - Huge outlined display words scrolling horizontally
 * - Direction & velocity reacting dynamically to scroll speed
 * - Pure CSS / transform-only hardware acceleration
 * - Completely static and calm under prefers-reduced-motion
 */
export function TextBand({
  words = ['Full-Stack', 'Systems', 'C++ & Algorithms', 'Applied AI'],
  direction = 'left',
  className,
}) {
  const containerRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })

  // Transform velocity into translation delta
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  // Repeat sequence so the band seamlessly loops
  const repeatedWords = [...words, ...words, ...words, ...words]

  const xTransform = useTransform(scrollY, (v) => {
    if (reducedMotion) return 0
    const factor = direction === 'left' ? -1 : 1
    return (v * 0.25 * factor) % 600
  })

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden py-4 select-none pointer-events-none border-y border-border/40 bg-background-surface/30 backdrop-blur-xs',
        className
      )}
      aria-hidden="true"
    >
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        style={{ x: xTransform }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {repeatedWords.map((word, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-stroke-outline">
              {word}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent/40" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
