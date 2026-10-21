import React from 'react'
import { motion } from 'framer-motion'
import { profile } from '../../data/profile'

/**
 * Branded, low-overhead loading state used during lazy route transitions.
 */
export function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page contents"
      className="min-h-[50vh] flex flex-col items-center justify-center gap-4 py-20 select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Ambient Pulsing Aura */}
        <div className="absolute w-16 h-16 rounded-full bg-accent/20 blur-xl animate-pulse" />

        {/* Monogram Badge */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-12 h-12 rounded-xl bg-background-elevated border border-accent/40 flex items-center justify-center shadow-glow"
        >
          <span className="font-heading font-bold text-accent text-sm tracking-wider">
            {profile.monogram || 'SS'}
          </span>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-foreground-muted">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        <span>Initializing module...</span>
      </div>
    </div>
  )
}
