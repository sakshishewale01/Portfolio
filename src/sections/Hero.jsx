import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { profile } from '../data/profile'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { SplitText } from '../components/ui/SplitText'
import { RotatingText } from '../components/ui/RotatingText'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Marquee } from '../components/ui/Marquee'
import { useLenis } from '../components/layout/SmoothScroll'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useCountUp } from '../hooks/useCountUp'
import { 
  ArrowDown, 
  FileText, 
  Github, 
  Linkedin, 
  Code2, 
  Terminal, 
  Sparkles,
  Mouse
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Individual Stat Card with count-up animation
 */
function StatCard({ label, numericValue, suffix, description, delay = 0 }) {
  const [inView, setInView] = useState(false)
  const cardRef = useRef(null)
  const count = useCountUp(numericValue, 1600, inView)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="p-4 rounded-xl bg-background-surface/70 backdrop-blur-md border border-border/80 hover:border-accent/30 transition-all duration-300 shadow-card flex flex-col text-left"
    >
      <div className="flex items-baseline gap-1 font-heading font-bold text-2xl lg:text-3xl text-foreground">
        <span>{count}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="font-heading font-semibold text-xs text-foreground mt-1">
        {label}
      </p>
      <p className="font-sans text-[11px] text-foreground-muted mt-0.5 leading-snug">
        {description}
      </p>
    </div>
  )
}

/**
 * Hero Section — Premium Product Landing Page Style
 */
export function Hero() {
  const containerRef = useRef(null)
  const { scrollTo } = useLenis()
  const reducedMotion = useReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [scrolledPast, setScrolledPast] = useState(false)

  // Scroll parallax for hero exit
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0])
  const heroTranslateY = useTransform(scrollY, [0, 450], [0, reducedMotion ? 0 : -50])

  // Soft cursor follower spotlight (desktop only)
  const cursorX = useMotionValue(-500)
  const cursorY = useMotionValue(-500)
  const smoothX = useSpring(cursorX, { stiffness: 120, damping: 20 })
  const smoothY = useSpring(cursorY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
    }

    const handleScroll = () => {
      setScrolledPast(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e) => {
    if (reducedMotion || isTouchDevice || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    cursorX.set(e.clientX - rect.left)
    cursorY.set(e.clientY - rect.top)
  }

  // Stagger entrance variants for GPU-accelerated reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-28 pb-4"
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      {/* Layer 1: Faint Grid with Radial Horizon Mask */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-70"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* Layer 2: Drifting Ambient Violet Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-accent/15 blur-[120px] animate-orb-1" />
        <div className="absolute top-1/3 -right-20 w-[460px] h-[460px] rounded-full bg-indigo-600/10 blur-[140px] animate-orb-2" />
      </div>

      {/* Layer 3: Soft Cursor-Following Spotlight (Desktop Only) */}
      {!isTouchDevice && !reducedMotion && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="pointer-events-none absolute z-0 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.12)_0%,transparent_70%)] blur-[40px]"
        />
      )}

      {/* Layer 4: Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-25 mix-blend-overlay" />

      {/* ================= HERO MAIN CONTENT ================= */}
      <motion.div
        style={reducedMotion ? {} : { opacity: heroOpacity, y: heroTranslateY }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 max-w-3xl"
        >
          {/* 1. Availability Badge with Pulsing Green Dot */}
          <motion.div variants={itemVariants}>
            <Badge
              variant="default"
              dot
              dotColor="bg-emerald-400"
              size="md"
              className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300 backdrop-blur-md"
            >
              {profile.availability}
            </Badge>
          </motion.div>

          {/* 2. Single H1 with SplitText & Gradient */}
          <motion.div variants={itemVariants} className="w-full">
            <h1 className="font-heading font-bold text-fluid-h1 tracking-tight text-foreground">
              <SplitText
                text={profile.fullName}
                wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-accent"
              />
            </h1>
          </motion.div>

          {/* 3. Rotating Role Line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-mono text-foreground-muted"
          >
            <span className="text-accent">&gt;</span>
            <span className="text-foreground-muted">Specializing as</span>
            <RotatingText roles={profile.rotatingRoles} interval={2500} />
          </motion.div>

          {/* 4. Outcome-Focused Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-fluid-body text-foreground-muted max-w-2xl leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          {/* 5. CTAs Row with Magnetic Pull on Primary */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <MagneticButton>
              <Button
                variant="primary"
                size="lg"
                icon={ArrowDown}
                iconPosition="right"
                onClick={() => scrollTo('#projects', { duration: 1.2 })}
              >
                View Projects
              </Button>
            </MagneticButton>

            <Button
              as="a"
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
              icon={FileText}
              iconPosition="left"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* 6. Social Links Row with Hover Lift */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex items-center justify-center lg:justify-start gap-3"
          >
            <span className="font-mono text-xs text-foreground-muted mr-1">Find me on:</span>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-background-surface/80 hover:bg-background-elevated border border-border hover:border-accent/40 text-foreground-muted hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 shadow-subtle"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-background-surface/80 hover:bg-background-elevated border border-border hover:border-accent/40 text-foreground-muted hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 shadow-subtle"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              className="p-2 rounded-lg bg-background-surface/80 hover:bg-background-elevated border border-border hover:border-accent/40 text-foreground-muted hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 shadow-subtle"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.codechef}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CodeChef Profile"
              className="p-2 rounded-lg bg-background-surface/80 hover:bg-background-elevated border border-border hover:border-accent/40 text-foreground-muted hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 shadow-subtle"
            >
              <Terminal className="w-4 h-4" />
            </a>
          </motion.div>

          {/* 7. Stats Row with Count-Up Animation */}
          <motion.div
            variants={itemVariants}
            className="w-full pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {profile.stats.map((stat, idx) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                numericValue={stat.numericValue}
                suffix={stat.suffix}
                description={stat.description}
                delay={idx * 0.15}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ================= BOTTOM MARQUEE & SCROLL CUE ================= */}
      <div className="relative z-10 w-full pt-4 flex flex-col items-center">
        {/* Scroll Indicator Mouse Cue */}
        <div
          className={cn(
            "mb-2 transition-opacity duration-300 flex flex-col items-center gap-1",
            scrolledPast ? "opacity-0 pointer-events-none" : "opacity-70 hover:opacity-100"
          )}
        >
          <button
            type="button"
            onClick={() => scrollTo('#about', { duration: 1.2 })}
            className="flex flex-col items-center gap-1 text-[11px] font-mono text-foreground-muted hover:text-accent transition-colors"
            aria-label="Scroll down to about section"
          >
            <span className="relative flex h-7 w-4 rounded-full border border-border-hover/80 p-0.5 justify-center">
              <span className="h-1.5 w-1 rounded-full bg-accent animate-bounce" />
            </span>
            <span className="text-[10px]">SCROLL</span>
          </button>
        </div>

        {/* 8. Infinite Horizontal Tech Marquee */}
        <div className="w-full border-t border-border/50 bg-background-surface/30 backdrop-blur-sm">
          <Marquee items={profile.techMarquee} />
        </div>
      </div>
    </section>
  )
}
