import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________0101'

/**
 * Text component with a short, subtle cyberpunk scramble effect on hover.
 * Resolves to the original string within ~200ms. Respects reduced-motion preferences.
 */
export function ScrambleText({ children, className = '', isHovered = false }) {
  const originalText = String(children || '')
  const [displayText, setDisplayText] = useState(originalText)
  const reducedMotion = useReducedMotion()
  const intervalRef = useRef(null)

  const scramble = useCallback(() => {
    if (reducedMotion) {
      setDisplayText(originalText)
      return
    }

    let iteration = 0
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return originalText[index]
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current)
      }

      iteration += 1 / 2
    }, 25)
  }, [originalText, reducedMotion])

  useEffect(() => {
    if (isHovered) {
      scramble()
    } else {
      clearInterval(intervalRef.current)
      setDisplayText(originalText)
    }

    return () => clearInterval(intervalRef.current)
  }, [isHovered, scramble, originalText])

  return (
    <span
      className={className}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  )
}
