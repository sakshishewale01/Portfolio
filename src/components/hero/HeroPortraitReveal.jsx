import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { profile } from '../../data/profile'
import { Photo } from '../ui/Photo'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Sparkles, MapPin, GraduationCap, Terminal, Code2 } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Signature "Behind the Scenes" Reveal:
 * - Upper Layer: Authentic portrait image of Sakshi
 * - Under Layer: Stylized "code view" featuring authentic C++ / FastAPI logic
 * - Hover: Feathered circular spotlight reveals the code layer with dynamic trail
 * - Touch: Auto-pulses gentle circular reveals periodically
 * - Accessibility: Static preview when reduced-motion is requested
 */
export function HeroPortraitReveal({ className }) {
  const containerRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [isTouch, setIsTouch] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [inView, setInView] = useState(true)

  // Spring coordinates for smooth spotlight tracking
  const mouseX = useMotionValue(180)
  const mouseY = useMotionValue(220)
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 24 })
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 24 })

  // GPU-accelerated mask template
  const maskImage = useMotionTemplate`radial-gradient(circle 105px at ${smoothX}px ${smoothY}px, transparent 0%, black 96%)`

  // IntersectionObserver to pause rendering when offscreen
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Touch device detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    }
  }, [])

  // Idle drift animation when not hovered or on touch
  useEffect(() => {
    if (reducedMotion || !inView || isHovered) return

    let angle = 0
    let animId

    const loop = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      angle += 0.015
      mouseX.set(centerX + Math.cos(angle) * 60)
      mouseY.set(centerY + Math.sin(angle * 1.3) * 70)

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [reducedMotion, inView, isHovered, mouseX, mouseY])

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
    setIsHovered(true)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative w-full max-w-[340px] sm:max-w-[370px] aspect-[4/5] rounded-2xl overflow-hidden border border-accent/40 bg-[#0A0A0E] shadow-card group select-none transition-all duration-300 hover:border-accent hover:shadow-[0_0_35px_rgba(124,92,255,0.3)]',
        className
      )}
    >
      {/* ============================================================== */}
      {/* UNDER LAYER: STYLIZED CODE VIEW (The "Behind the Scenes")      */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 p-5 bg-[#09090D] flex flex-col justify-between font-mono text-[11px] leading-relaxed z-0"
        aria-hidden="true"
      >
        {/* Terminal Window Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-2 text-foreground-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/70" />
            <span className="w-2 h-2 rounded-full bg-amber-500/70" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
            <span className="text-[10px] text-accent/80 ml-2 font-semibold">
              sakshi_core.cpp
            </span>
          </div>
          <span className="text-[9px] text-accent-secondary">C++20</span>
        </div>

        {/* Monospace Code Stream */}
        <div className="space-y-1 text-[11px] text-zinc-400 select-none py-1">
          <p className="text-zinc-600">// Core Engineering Specifications</p>
          <p>
            <span className="text-purple-400">#include</span>{' '}
            <span className="text-emerald-300">&lt;algorithm&gt;</span>
          </p>
          <p>
            <span className="text-purple-400">#include</span>{' '}
            <span className="text-emerald-300">&lt;fastapi/async&gt;</span>
          </p>
          <p className="pt-1">
            <span className="text-blue-400">class</span>{' '}
            <span className="text-amber-300 font-bold">Engineer</span> &#123;
          </p>
          <p className="pl-3 text-zinc-300">
            <span className="text-blue-400">string</span> name ={' '}
            <span className="text-emerald-300">"Sakshi Shewale"</span>;
          </p>
          <p className="pl-3 text-zinc-300">
            <span className="text-blue-400">string</span> role ={' '}
            <span className="text-emerald-300">"Full-Stack &amp; DSA"</span>;
          </p>
          <p className="pl-3 text-zinc-300">
            <span className="text-blue-400">vector</span>&lt;string&gt; stack = &#123;
          </p>
          <p className="pl-6 text-accent">"C++", "FastAPI", "React", "Postgres"</p>
          <p className="pl-3 text-zinc-300">&#125;;</p>
          <p className="pl-3 text-emerald-400 font-semibold">
            bool openToInternships = <span className="text-amber-300">true</span>;
          </p>
          <p className="pl-3 text-zinc-300">
            <span className="text-blue-400">void</span>{' '}
            <span className="text-accent-secondary font-bold">buildSystems</span>() &#123;
          </p>
          <p className="pl-6 text-zinc-400">solve(Striver_A2Z);</p>
          <p className="pl-6 text-zinc-400">dispatch(FlowGrid, TeamFlow);</p>
          <p className="pl-3 text-zinc-300">&#125;</p>
          <p>&#125;;</p>
        </div>

        {/* Status Cue Bar */}
        <div className="flex items-center justify-between text-[10px] text-accent/80 border-t border-border/50 pt-2">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Telemetry: 0 Bugs</span>
          </span>
          <span className="text-foreground-muted">51+ DSA Solved</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* UPPER LAYER: PORTRAIT IMAGE WITH CANVAS SPOTLIGHT MASK         */}
      {/* ============================================================== */}
      {!reducedMotion ? (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <div className="relative w-full h-full bg-background-elevated">
            <Photo
              src={profile.photo.src}
              alt={profile.photo.alt || 'Portrait of Sakshi Shewale'}
              width={profile.photo.width || 600}
              height={profile.photo.height || 750}
              priority={true}
              fallbackInitials={profile.monogram || 'SS'}
              className="w-full h-full object-cover"
              imageClassName="transition-transform duration-700 ease-out group-hover:scale-102"
            />
          </div>
        </motion.div>
      ) : (
        /* Reduced Motion Fallback: Clean Solid Image without Masking */
        <div className="absolute inset-0 z-10">
          <Photo
            src={profile.photo.src}
            alt={profile.photo.alt || 'Portrait of Sakshi Shewale'}
            width={profile.photo.width || 600}
            height={profile.photo.height || 750}
            priority={true}
            fallbackInitials={profile.monogram || 'SS'}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* OVERLAID FLOATING BADGES & INTERACTION CUES                    */}
      {/* ============================================================== */}
      {/* Top-Left Status Pill */}
      <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-white/10 text-emerald-400 font-mono text-[11px] shadow-subtle">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-medium text-emerald-300">Available 2027</span>
        </div>
      </div>

      {/* Top-Right Interactive Reveal Cue */}
      <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-accent/40 text-accent font-mono text-[10px] shadow-subtle">
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="hidden sm:inline">Hover for Code</span>
          <span className="sm:hidden">Inspect</span>
        </div>
      </div>

      {/* Subtle Gradient Vignette at Bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background-surface via-background-surface/85 to-transparent pointer-events-none z-20"
      />

      {/* Bottom Information Card */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-30 flex flex-col justify-end pointer-events-none">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-heading font-bold text-base sm:text-lg text-foreground tracking-tight drop-shadow-sm">
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
  )
}
