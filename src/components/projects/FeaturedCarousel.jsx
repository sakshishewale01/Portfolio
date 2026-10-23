import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { FeaturedCard } from './FeaturedCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Tier 1 Featured Showcase Container.
 * - Desktop (lg+): Sticky pinned container with useScroll + useTransform on X.
 * - Mobile/Tablet (< lg): Smooth touch scroll-snap carousel with arrows & dots.
 * - Reduced motion: Vertical stack with subtle fadeUp.
 */
export function FeaturedCarousel({ projects }) {
  const reducedMotion = useReducedMotion()
  const targetRef = useRef(null)
  const mobileScrollRef = useRef(null)

  // Track active slide index for desktop counter & mobile dots
  const [activeSlide, setActiveSlide] = useState(0)

  // Desktop sticky scroll physics
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress (0 -> 1) to horizontal translation percentage
  // 5 items with spacing: translateX moves from 0% to -80%
  const totalCards = projects.length
  const maxShiftPercent = (totalCards - 1) * 20.5 // adjusted for ~75vw cards
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${maxShiftPercent}%`])

  // Track active index based on scroll position for "01 / 05" counter
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const rawIndex = Math.round(latest * (totalCards - 1))
    const clamped = Math.min(Math.max(rawIndex, 0), totalCards - 1)
    setActiveSlide(clamped)
  })

  // Mobile carousel scroll listener
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return
    const el = mobileScrollRef.current
    const scrollLeft = el.scrollLeft
    const cardWidth = el.offsetWidth * 0.85
    const index = Math.round(scrollLeft / cardWidth)
    setActiveSlide(Math.min(Math.max(index, 0), totalCards - 1))
  }

  const scrollMobileTo = (index) => {
    if (!mobileScrollRef.current) return
    const el = mobileScrollRef.current
    const cardWidth = el.offsetWidth * 0.85
    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    })
    setActiveSlide(index)
  }

  // If user prefers reduced motion, render clean vertical stack
  if (reducedMotion) {
    return (
      <div className="space-y-8 w-full">
        {projects.map((project, idx) => (
          <FeaturedCard
            key={project.slug}
            project={project}
            index={idx}
            total={totalCards}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* DESKTOP (lg+): PINNED HORIZONTAL SCROLL                        */}
      {/* ============================================================== */}
      <div
        ref={targetRef}
        className="hidden lg:block relative"
        style={{ height: `${totalCards * 75}vh` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Top Progress & Index Counter Bar */}
          <div className="max-w-6xl mx-auto w-full px-6 mb-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                Featured Case Studies
              </span>
              <span className="text-foreground-muted font-mono text-xs">•</span>
              <span className="font-mono text-xs text-foreground-muted">
                Scroll to explore
              </span>
            </div>

            {/* Counter: "01 / 05" */}
            <div className="flex items-center gap-4">
              <div className="font-mono text-sm font-semibold tracking-wider text-foreground">
                <span className="text-accent">{String(activeSlide + 1).padStart(2, '0')}</span>
                <span className="text-foreground-muted mx-1">/</span>
                <span className="text-foreground-muted">{String(totalCards).padStart(2, '0')}</span>
              </div>

              {/* Progress Bar Line */}
              <div className="w-28 h-1 rounded-full bg-border overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
                />
              </div>
            </div>
          </div>

          {/* Horizontally translating cards track */}
          <div className="w-full overflow-visible">
            <motion.div
              style={{ x }}
              className="flex items-center gap-8 pl-[max(1.5rem,calc((100vw-1152px)/2))]"
            >
              {projects.map((project, idx) => (
                <div
                  key={project.slug}
                  className="w-[72vw] max-w-[920px] shrink-0"
                >
                  <FeaturedCard
                    project={project}
                    index={idx}
                    total={totalCards}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE / TABLET (< lg): SCROLL-SNAP CAROUSEL                   */}
      {/* ============================================================== */}
      <div className="block lg:hidden w-full">
        {/* Scroll Track with CSS Scroll-Snap */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 px-4 no-scrollbar -mx-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, idx) => (
            <div
              key={project.slug}
              className="w-[85vw] max-w-[480px] shrink-0 snap-center"
            >
              <FeaturedCard
                project={project}
                index={idx}
                total={totalCards}
              />
            </div>
          ))}
        </div>

        {/* Carousel Controls: Navigation Arrows + Pagination Dots */}
        <div className="flex items-center justify-between pt-2 px-2">
          {/* Slide Indicator */}
          <span className="font-mono text-xs text-foreground-muted">
            <span className="text-accent font-semibold">{String(activeSlide + 1).padStart(2, '0')}</span>
            {' / '}
            {String(totalCards).padStart(2, '0')}
          </span>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollMobileTo(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  activeSlide === idx ? 'w-6 bg-accent' : 'w-1.5 bg-border hover:bg-foreground-muted'
                )}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.max(0, activeSlide - 1))}
              disabled={activeSlide === 0}
              aria-label="Previous project"
              className="p-2 rounded-lg border border-border bg-background-surface text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.min(totalCards - 1, activeSlide + 1))}
              disabled={activeSlide === totalCards - 1}
              aria-label="Next project"
              className="p-2 rounded-lg border border-border bg-background-surface text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
