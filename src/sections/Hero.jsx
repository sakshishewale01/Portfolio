import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { profile } from '../data/profile'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { SplitText } from '../components/ui/SplitText'
import { RotatingText } from '../components/ui/RotatingText'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Marquee } from '../components/ui/Marquee'
import { Photo } from '../components/ui/Photo'
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
  MapPin,
  GraduationCap
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
      className="p-3.5 sm:p-4 rounded-xl bg-background-surface/70 backdrop-blur-md border border-border/80 hover:border-accent/40 transition-all duration-300 shadow-card flex flex-col text-left group"
    >
      <div className="flex items-baseline gap-1 font-heading font-bold text-2xl lg:text-3xl text-foreground">
        <span>{count}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="font-heading font-semibold text-xs text-foreground mt-1 group-hover:text-accent transition-colors">
        {label}
      </p>
      <p className="font-sans text-[11px] text-foreground-muted mt-0.5 leading-snug">
        {description}
      </p>
    </div>
  )
}

/**
 * Hero Section — Premium Editorial First Screen
 */
export function Hero() {
  const containerRef = useRef(null)
  const { scrollTo } = useLenis()
  const reducedMotion = useReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [scrolledPast, setScrolledPast] = useState(false)

  // Parallax exit
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : -40])

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

  // Stagger entrance variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
        delayChildren: reducedMotion ? 0 : 0.04,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-4"
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      {/* Layer 1: Ambient Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-60"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* Layer 2: Drifting Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-accent/15 blur-[120px] animate-orb-1" />
        <div className="absolute top-1/3 -right-20 w-[460px] h-[460px] rounded-full bg-indigo-600/10 blur-[140px] animate-orb-2" />
      </div>

      {/* Layer 3: Soft Cursor Spotlight (Desktop) */}
      {!isTouchDevice && !reducedMotion && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="pointer-events-none absolute z-0 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(142,114,255,0.12)_0%,transparent_70%)] blur-[40px]"
        />
      )}

      {/* Layer 4: Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-noise opacity-25 mix-blend-overlay" />

      {/* ================= HERO MAIN CONTENT ================= */}
      <motion.div
        style={reducedMotion ? {} : { opacity: heroOpacity, y: heroTranslateY }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6 sm:py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ================= LEFT COLUMN: HERO TEXT & ACTIONS ================= */}
          <motion.div
            variants={containerVariants}
            initial={false}
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5"
          >
            {/* 1. Availability Status Indicator */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Badge
                variant="default"
                dot
                dotColor="bg-emerald-400"
                size="md"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 backdrop-blur-md font-mono text-xs shadow-xs"
              >
                {profile.availability}
              </Badge>
            </motion.div>

            {/* 2. Main Name Headline */}
            <motion.div variants={itemVariants} className="w-full">
              <h1 className="font-heading font-black text-fluid-h1 tracking-tight text-foreground">
                <SplitText
                  text={profile.fullName}
                  wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-accent"
                />
              </h1>
            </motion.div>

            {/* 3. Positioning Statement */}
            <motion.div variants={itemVariants}>
              <h2 className="font-heading font-semibold text-lg sm:text-xl lg:text-2xl text-accent/90 tracking-tight">
                {profile.positioningStatement || "Computer Science Student Building Thoughtful Software."}
              </h2>
            </motion.div>

            {/* 4. Terminal / Rotating Role Line */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-sm sm:text-base font-mono text-foreground-muted"
            >
              <span className="text-accent font-bold">&gt;</span>
              <span className="text-foreground-muted">Aspiring</span>
              <RotatingText roles={profile.rotatingRoles} interval={2600} />
            </motion.div>

            {/* 5. Concise Bio / Description */}
            <motion.p
              variants={itemVariants}
              className="text-fluid-body text-foreground-muted max-w-xl leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            {/* 6. CTAs Row: Primary "Explore My Work" + Secondary "View Resume" */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5"
            >
              <MagneticButton>
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowDown}
                  iconPosition="right"
                  onClick={() => scrollTo('#projects', { duration: 1.2 })}
                  className="shadow-glow hover:shadow-glow-lg"
                >
                  Explore My Work
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
                View Resume
              </Button>
            </motion.div>

            {/* 7. Social Links Row */}
            <motion.div
              variants={itemVariants}
              className="pt-1 flex items-center justify-center lg:justify-start gap-2.5"
            >
              <span className="font-mono text-xs text-foreground-muted mr-1">Connect:</span>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg bg-background-surface/80 hover:bg-background-elevated border border-border hover:border-accent/40 text-foreground-muted hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 shadow-subtle"
                title="GitHub @sakshishewale01"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg bg-background-surface/80 hover:bg-background-elevated border border-border hover:border-accent/40 text-foreground-muted hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 shadow-subtle"
                title="LinkedIn @sakshi-shewale05"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="p-2 rounded-lg bg-background-surface/80 hover:bg-background-elevated border border-border hover:border-amber-500/40 text-foreground-muted hover:text-foreground hover:-translate-y-0.5 transition-all duration-200 shadow-subtle"
                title="LeetCode @sakshiiee__06"
              >
                <Code2 className="w-4 h-4 text-amber-400" />
              </a>
            </motion.div>

            {/* 8. Stats Row with Count-Up Animation */}
            <motion.div
              variants={itemVariants}
              className="w-full pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3"
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

          {/* ================= RIGHT COLUMN: EDITORIAL PORTRAIT CARD ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
              {/* Subtle Ambient Violet/Indigo Glow Behind Photo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/20 via-indigo-500/15 to-transparent blur-2xl pointer-events-none opacity-70"
              />

              {/* Framed Card Container */}
              <div className="relative rounded-2xl overflow-hidden border border-accent/30 hover:border-accent/60 bg-background-surface/90 shadow-card transition-all duration-300 group hover:shadow-glow">
                {/* Photo Frame Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-background-elevated">
                  <Photo
                    src={profile.photo.src}
                    alt={profile.photo.alt || "Portrait of Sakshi Shewale"}
                    width={profile.photo.width || 600}
                    height={profile.photo.height || 750}
                    priority={true}
                    fallbackInitials={profile.monogram || "SS"}
                    className="w-full h-full"
                    imageClassName="transition-transform duration-700 ease-out group-hover:scale-102"
                  />

                  {/* Top-Left Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/85 backdrop-blur-md border border-white/10 text-emerald-400 font-mono text-[11px] shadow-subtle">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span className="font-medium text-emerald-300">Available 2027</span>
                    </div>
                  </div>

                  {/* Top-Right Floating Tech Pill */}
                  <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-accent/30 text-accent font-mono text-[10px] shadow-subtle">
                      <Sparkles className="w-3 h-3" />
                      <span>C++ &bull; React &bull; FastAPI</span>
                    </div>
                  </div>

                  {/* Gradient Vignette at Bottom */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background-surface via-background-surface/80 to-transparent pointer-events-none z-10"
                  />

                  {/* Card Bottom Meta */}
                  <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-foreground tracking-tight">
                        {profile.fullName}
                      </h3>
                      <span className="font-mono text-xs text-accent font-semibold shrink-0">
                        Third-Year B.Tech CSE
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-foreground-muted mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>MIT AOE, Pune</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ================= BOTTOM MARQUEE & SCROLL CUE ================= */}
      <div className="relative z-10 w-full pt-4 flex flex-col items-center">
        {/* Scroll Cue */}
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

        {/* Infinite Horizontal Tech Marquee */}
        <div className="w-full border-t border-border/50 bg-background-surface/30 backdrop-blur-sm">
          <Marquee items={profile.techMarquee} />
        </div>
      </div>
    </section>
  )
}
