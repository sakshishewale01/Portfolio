import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Card primitive with interactive cursor-following border glow.
 * Tracks mouse position to create a dynamic radial spotlight along the border and surface.
 */
export const Card = React.forwardRef(({
  children,
  className,
  glowColor = 'rgba(124, 92, 255, 0.4)',
  surfaceColor = 'bg-background-surface',
  enableGlow = true,
  onClick,
  ...props
}, ref) => {
  const localRef = useRef(null)
  const cardRef = ref || localRef
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!enableGlow || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    if (enableGlow) setOpacity(1)
  }

  const handleMouseLeave = () => {
    if (enableGlow) setOpacity(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative rounded-xl border border-border p-6 transition-all duration-300",
        surfaceColor,
        "hover:border-border-hover/80 hover:shadow-card group overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor-following border highlight spotlight */}
      {enableGlow && (
        <>
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              opacity,
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 65%)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />
          {/* Subtle ambient inner spotlight on card surface */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              opacity: opacity * 0.4,
              background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(124, 92, 255, 0.08), transparent 70%)`,
            }}
          />
        </>
      )}

      {/* Card Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
})

Card.displayName = 'Card'
