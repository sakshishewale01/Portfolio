import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * PageTransition wrapper using AnimatePresence with mode="wait".
 * Provides clean route transitions under 400ms while skipping movement under reduced motion.
 */
export function PageTransition({ children }) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  const variants = {
    initial: {
      opacity: 0,
      y: reducedMotion ? 0 : 12,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.01 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: reducedMotion ? 0 : -12,
      transition: {
        duration: reducedMotion ? 0.01 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial={false}
        animate="enter"
        exit="exit"
        className="w-full flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
