import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Custom Cursor with smooth spring lag, interactive hover states,
 * and project card "View" badge.
 * Only rendered on desktop devices with a fine pointer and when reduced motion is disabled.
 */
export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const [cursorState, setCursorState] = useState('default') // 'default' | 'pointer' | 'view' | 'text' | 'hidden'

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for the trailing ring
  const ringSpringConfig = { damping: 24, stiffness: 220, mass: 0.5 }
  const ringX = useSpring(mouseX, ringSpringConfig)
  const ringY = useSpring(mouseY, ringSpringConfig)

  useEffect(() => {
    // Check if device uses a fine pointer (mouse/trackpad, not touch)
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(pointer: fine)')
    setHasFinePointer(mediaQuery.matches)

    const handlePointerChange = (e) => setHasFinePointer(e.matches)
    mediaQuery.addEventListener('change', handlePointerChange)

    return () => mediaQuery.removeEventListener('change', handlePointerChange)
  }, [])

  useEffect(() => {
    if (!hasFinePointer || reducedMotion) return

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target

      // Check for project card or element with view cursor
      if (
        target.closest('[data-cursor="view"]') ||
        target.closest('.project-card') ||
        target.closest('#projects article')
      ) {
        setCursorState('view')
        return
      }

      // Check for text inputs - keep cursor subtle, native text cursor active
      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setCursorState('text')
        return
      }

      // Check for clickable elements
      if (
        target.closest('a, button, [role="button"], [role="tab"], [role="option"], kbd, input[type="submit"]')
      ) {
        setCursorState('pointer')
        return
      }

      setCursorState('default')
    }

    const handleMouseLeave = () => {
      setCursorState('hidden')
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasFinePointer, reducedMotion, mouseX, mouseY])

  // Don't render on touch devices or under reduced motion preferences
  if (!hasFinePointer || reducedMotion || cursorState === 'hidden') {
    return null
  }

  // Ring dimension and style configurations based on hover state
  const getRingVariants = () => {
    switch (cursorState) {
      case 'view':
        return {
          width: 58,
          height: 58,
          backgroundColor: 'rgba(124, 92, 255, 0.25)',
          borderColor: 'rgba(124, 92, 255, 0.8)',
          scale: 1,
          opacity: 1,
        }
      case 'pointer':
        return {
          width: 44,
          height: 44,
          backgroundColor: 'rgba(124, 92, 255, 0.1)',
          borderColor: 'rgba(124, 92, 255, 0.5)',
          scale: 1,
          opacity: 1,
        }
      case 'text':
        return {
          width: 16,
          height: 16,
          backgroundColor: 'transparent',
          borderColor: 'rgba(124, 92, 255, 0.3)',
          scale: 0.8,
          opacity: 0.4,
        }
      default:
        return {
          width: 30,
          height: 30,
          backgroundColor: 'transparent',
          borderColor: 'rgba(124, 92, 255, 0.45)',
          scale: 1,
          opacity: 0.8,
        }
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Center Dot (Strict tracking) */}
      {cursorState !== 'text' && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none shadow-[0_0_8px_rgba(124,92,255,0.8)]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          transition={{ duration: 0 }}
        />
      )}

      {/* 2. Trailing Lag Ring (Spring Physics) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getRingVariants()}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
      >
        {cursorState === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[10px] font-mono font-bold tracking-wider text-white uppercase select-none drop-shadow-sm"
          >
            View
          </motion.span>
        )}
      </motion.div>
    </div>
  )
}
