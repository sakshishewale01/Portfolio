import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FeaturedCard } from './FeaturedCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Creative Animated Featured Projects Showcase.
 * - Project selector tab bar with animated sliding indicator.
 * - Smooth 3D perspective transitions between projects with AnimatePresence.
 * - Prev/Next controls, dot indicators, and optional auto-play with pause-on-hover.
 * - Completely avoids sticky scroll-trapping for 100% reliable 60fps performance.
 */
export function FeaturedCarousel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const reducedMotion = useReducedMotion()
  const total = projects.length

  // Auto-play timer (advances every 7 seconds if not paused)
  useEffect(() => {
    if (reducedMotion || !isAutoPlaying) return

    const timer = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % total)
    }, 7000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, total, reducedMotion])

  const goToNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % total)
  }

  const goToPrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }

  const selectProject = (index) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      goToNext()
    } else if (e.key === 'ArrowLeft') {
      goToPrev()
    }
  }

  const currentProject = projects[activeIndex]

  // Slide transition variants
  const slideVariants = {
    enter: (dir) => ({
      x: reducedMotion ? 0 : dir > 0 ? 50 : -50,
      opacity: 0,
      scale: reducedMotion ? 1 : 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.01 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: reducedMotion ? 0 : dir > 0 ? -50 : 50,
      opacity: 0,
      scale: reducedMotion ? 1 : 0.98,
      transition: {
        duration: reducedMotion ? 0.01 : 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <div
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="w-full space-y-6 focus-visible:outline-none"
      aria-label="Featured Projects Showcase"
    >
      {/* ============================================================== */}
      {/* 1. TOP INTERACTIVE PROJECT SELECTOR TABS                        */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-border/60">
        {/* Project Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-background-surface border border-border shadow-xs w-full sm:w-auto overflow-x-auto">
          {projects.map((proj, idx) => {
            const isActive = activeIndex === idx
            return (
              <button
                key={proj.slug}
                type="button"
                onClick={() => selectProject(idx)}
                className={cn(
                  'relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors duration-200 select-none flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isActive
                    ? 'text-foreground font-semibold'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-featured-pill"
                    className="absolute inset-0 rounded-lg bg-accent/20 border border-accent/40 -z-10 shadow-glow"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="text-[10px] text-accent font-semibold">0{idx + 1}</span>
                <span>{proj.title}</span>
              </button>
            )
          })}
        </div>

        {/* Counter & Navigation Controls */}
        <div className="flex items-center gap-3">
          {/* Slide Indicator */}
          <span className="font-mono text-xs text-foreground-muted">
            <span className="text-accent font-semibold">0{activeIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>0{total}</span>
          </span>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous project"
              className="p-2 rounded-lg border border-border bg-background-surface hover:bg-background-elevated hover:text-accent text-foreground-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next project"
              className="p-2 rounded-lg border border-border bg-background-surface hover:bg-background-elevated hover:text-accent text-foreground-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. ANIMATED PROJECT SHOWCASE CARD                              */}
      {/* ============================================================== */}
      <div className="relative min-h-[460px] w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProject.slug}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <FeaturedCard
              project={currentProject}
              index={activeIndex}
              total={total}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================== */}
      {/* 3. BOTTOM PROGRESS INDICATOR DOTS                              */}
      {/* ============================================================== */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div className="flex items-center gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => selectProject(idx)}
              aria-label={`Jump to project ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                activeIndex === idx
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-border hover:bg-foreground-muted'
              )}
            />
          ))}
        </div>

        <span className="text-[11px] font-mono text-foreground-muted hidden sm:inline-block">
          Use buttons or arrow keys to browse
        </span>
      </div>
    </div>
  )
}
