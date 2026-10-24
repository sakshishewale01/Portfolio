import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SESSION_STORAGE_KEY = 'sakshi_portfolio_intro_seen'

/**
 * Premium Intro Loader
 * Features:
 * - 000 -> 100 numerical counter with monospace easing
 * - Monogram badge & Sakshi's name
 * - Thin accent progress bar
 * - Curtain slide-up exit (~1.2s total duration)
 * - Session cached (runs once per browser session)
 * - Automatically skipped under prefers-reduced-motion
 * - Strict 1.5s maximum timeout safety guard
 */
export function IntroLoader({ onComplete }) {
  const reducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Skip loader immediately under reduced motion
    if (reducedMotion) {
      if (onComplete) onComplete()
      return
    }

    // Check session storage
    try {
      const hasSeen = sessionStorage.getItem(SESSION_STORAGE_KEY)
      if (hasSeen === 'true') {
        if (onComplete) onComplete()
        return
      }
    } catch {
      // Storage access disabled or iframe sandbox
    }

    // Active intro loader
    setIsVisible(true)

    // Safety timeout cap at 1450ms
    const safetyTimeout = setTimeout(() => {
      finishIntro()
    }, 1450)

    // Smooth numerical count up (0 -> 100)
    let startTimestamp = null
    const duration = 1100

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100))
      setProgress(pct)

      if (elapsed < duration) {
        requestAnimationFrame(step)
      } else {
        setTimeout(() => {
          finishIntro()
        }, 150)
      }
    }

    const rafId = requestAnimationFrame(step)

    function finishIntro() {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
      } catch {}
      setIsVisible(false)
      if (onComplete) {
        // Allow exit animation to start before notifying parent
        setTimeout(onComplete, 300)
      }
    }

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(safetyTimeout)
    }
  }, [reducedMotion, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-curtain"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between p-8 sm:p-12 bg-[#0A0A0B] text-foreground select-none"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading portfolio experience"
        >
          {/* Top Brand Tag */}
          <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>{profile.fullName}</span>
            </span>
            <span className="text-accent/80 font-semibold tracking-wider">
              [ 2026 / 2027 ]
            </span>
          </div>

          {/* Center Monogram & Title */}
          <div className="my-auto flex flex-col items-center justify-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 rounded-2xl bg-background-elevated border border-accent/40 flex items-center justify-center shadow-glow"
            >
              <span className="font-heading font-black text-2xl text-accent">
                {profile.monogram || 'SS'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight"
            >
              {profile.fullName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="font-mono text-xs text-foreground-muted max-w-xs"
            >
              Software Engineering &bull; Systems &bull; Applied AI
            </motion.p>
          </div>

          {/* Bottom Progress Counter & Progress Bar */}
          <div className="w-full space-y-3">
            <div className="flex items-baseline justify-between font-mono text-xs">
              <span className="text-foreground-muted uppercase tracking-wider">
                System Initializing
              </span>
              <span className="text-foreground font-bold tabular-nums text-sm sm:text-base">
                {String(progress).padStart(3, '0')}%
              </span>
            </div>

            <div className="h-[2px] w-full rounded-full bg-background-surface-elevated overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent via-purple-400 to-accent-secondary"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
