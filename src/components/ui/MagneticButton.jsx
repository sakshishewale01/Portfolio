import React, { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * MagneticButton wrapper pulling the wrapped button toward the cursor when within ~80px.
 * Automatically disabled on touch screens and under reduced motion.
 */
export function MagneticButton({
  children,
  className,
  radius = 85,
  strength = 0.35,
}) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 220, damping: 18, mass: 0.1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (reducedMotion || isTouchDevice || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.hypot(distanceX, distanceY)

    if (distance < radius) {
      mouseX.set(distanceX * strength)
      mouseY.set(distanceY * strength)
    } else {
      mouseX.set(0)
      mouseY.set(0)
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  if (reducedMotion || isTouchDevice) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}
