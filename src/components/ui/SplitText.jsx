import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

/**
 * SplitText component that splits strings into words with staggered slide-up reveals.
 * Fully accessible with aria-label on parent and aria-hidden on animated spans.
 */
export function SplitText({
  text = '',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.07,
}) {
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) {
    return <span className={className}>{text}</span>
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: {
      y: '105%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <span
      role="text"
      aria-label={text}
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="inline-flex flex-wrap gap-x-[0.25em]"
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden pb-1 -mb-1"
          >
            <motion.span
              variants={wordVariants}
              className={cn("inline-block", wordClassName)}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  )
}
