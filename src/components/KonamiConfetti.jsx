import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useToast } from '../context/ToastContext'
import { useReducedMotion } from '../hooks/useReducedMotion'

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

const COLORS = [
  '#7C5CFF', // Accent Violet
  '#8D72FF', // Accent Hover
  '#00C2FF', // Electric Cyan
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#FFFFFF', // Bright White
]

export function KonamiConfetti() {
  const [isActive, setIsActive] = useState(false)
  const canvasRef = useRef(null)
  const keysRef = useRef([])
  const { showToast } = useToast()
  const reducedMotion = useReducedMotion()

  const launchConfetti = useCallback(() => {
    setIsActive(true)
    showToast('Konami Code Activated! 🎮 Powered by Sakshi', { type: 'success', duration: 4000 })

    if (reducedMotion) {
      setTimeout(() => setIsActive(false), 2000)
      return
    }

    // Set up canvas particles
    setTimeout(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      const width = (canvas.width = window.innerWidth)
      const height = (canvas.height = window.innerHeight)

      const particleCount = 130
      const particles = []

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: width * 0.5 + (Math.random() - 0.5) * 200,
          y: height * 0.4 + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 18,
          vy: Math.random() * -16 - 6,
          size: Math.random() * 8 + 4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          wobble: Math.random() * 10,
          wobbleSpeed: Math.random() * 0.1 + 0.05,
          alpha: 1,
          decay: Math.random() * 0.008 + 0.006,
        })
      }

      let animationFrameId
      const gravity = 0.42
      const drag = 0.985

      const render = () => {
        ctx.clearRect(0, 0, width, height)

        let activeCount = 0

        particles.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          p.vy += gravity
          p.vx *= drag
          p.vy *= drag
          p.rotation += p.rotationSpeed
          p.wobble += p.wobbleSpeed
          p.alpha -= p.decay

          if (p.alpha > 0) {
            activeCount++
            ctx.save()
            ctx.translate(p.x, p.y)
            ctx.rotate((p.rotation * Math.PI) / 180)
            ctx.globalAlpha = Math.max(0, p.alpha)
            ctx.fillStyle = p.color
            ctx.fillRect(
              -p.size / 2,
              -p.size / 2,
              p.size * Math.cos(p.wobble),
              p.size
            )
            ctx.restore()
          }
        })

        if (activeCount > 0) {
          animationFrameId = requestAnimationFrame(render)
        } else {
          setIsActive(false)
        }
      }

      render()

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
      }
    }, 10)
  }, [showToast, reducedMotion])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        return
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      keysRef.current.push(key)

      if (keysRef.current.length > KONAMI_SEQUENCE.length) {
        keysRef.current.shift()
      }

      const isMatch = keysRef.current.every(
        (k, idx) => k === KONAMI_SEQUENCE[idx]
      )

      if (isMatch && keysRef.current.length === KONAMI_SEQUENCE.length) {
        keysRef.current = []
        launchConfetti()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [launchConfetti])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99999] select-none"
      aria-hidden="true"
    />
  )
}
