import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Photo } from '../components/ui/Photo'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import { 
  MapPin, 
  GraduationCap, 
  Sparkles,
  Calendar,
  Building,
  Briefcase
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Interactive Photo Card with 3D Tilt on Hover, Soft Accent Glow & Floating Chips
 */
function TiltPhotoCard({ photo, name, location }) {
  const cardRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 180, damping: 20 }
  const rotateX = useSpring(mouseY, springConfig)
  const rotateY = useSpring(mouseX, springConfig)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (reducedMotion || isTouchDevice || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Gentle rotation max ~7 degrees
    rotateX.set(-y / 18)
    rotateY.set(x / 18)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  // Clip-path and scale reveal variant
  const imageRevealVariants = {
    hidden: {
      opacity: 0,
      scale: reducedMotion ? 1 : 1.05,
      clipPath: reducedMotion ? 'inset(0% 0% 0% 0%)' : 'inset(10% 0% 10% 0%)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: reducedMotion ? 0.01 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      {/* Soft Ambient Violet Glow Behind Photo Frame */}
      <div className="absolute -inset-2 rounded-3xl bg-accent/20 blur-2xl opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          reducedMotion || isTouchDevice
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative rounded-2xl overflow-hidden border border-border/90 bg-background-surface/90 p-3 shadow-card group transition-all duration-300 hover:shadow-glow hover:border-accent/40"
      >
        {/* Aspect-Ratio Frame Container with Reveal Animation */}
        <motion.div
          variants={imageRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-background-elevated"
        >
          <Photo
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            fallbackInitials={profile.monogram || "SS"}
            className="w-full h-full rounded-xl"
            imageClassName="transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Vignette Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

          {/* Floating Chip 1: "Open to work" (Top-Left, Floating Animation) */}
          <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
            <div className="animate-float-slow inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-border/90 text-foreground text-xs font-mono shadow-subtle">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-300">Open to work</span>
            </div>
          </div>

          {/* Floating Chip 2: "Pune, India" (Bottom-Right, Floating Animation) */}
          <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none">
            <div className="animate-float-slow-delayed inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-border/90 text-foreground text-xs font-mono shadow-subtle">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] font-medium text-foreground">{location}</span>
            </div>
          </div>
        </motion.div>

        {/* Card Footer Details */}
        <div className="pt-3 pb-1 px-2 flex items-center justify-between text-xs text-foreground-muted font-mono">
          <span className="flex items-center gap-1.5 text-foreground font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {name}
          </span>
          <span>B.Tech CSE &bull; AI/ML</span>
        </div>
      </motion.div>
    </div>
  )
}

/**
 * About Section Component
 */
export function About() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)

  const { paragraphs, education, highlights } = profile.about

  return (
    <Section
      id="about"
      label="02 // Profile & Trajectory"
      title="Engineering with Depth, Rigor & Purpose"
      description="From algorithmic foundations to distributed telemetry and applied intelligence."
    >
      {/* Top Two-Column Story & Photo Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
        {/* Left Column: 3 Narrative Paragraphs */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-7 space-y-5 text-foreground-muted leading-relaxed"
        >
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className={cn(
                "text-base sm:text-lg",
                idx === 0 ? "text-foreground font-normal leading-relaxed" : ""
              )}
            >
              {paragraph}
            </p>
          ))}

          {/* Quick Technical Values Banner */}
          <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-accent">
            <Badge variant="outline" size="sm">&bull; Low-Latency Systems</Badge>
            <Badge variant="outline" size="sm">&bull; Applied AI Pipelines</Badge>
            <Badge variant="outline" size="sm">&bull; Deterministic Concurrency</Badge>
          </div>
        </motion.div>

        {/* Right Column: Interactive Tilt Photo Card */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-5"
        >
          <TiltPhotoCard
            photo={profile.photo}
            name={profile.fullName}
            location={profile.location}
          />
        </motion.div>
      </div>

      {/* Education Mini-Card */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-8"
      >
        <Card className="p-6 border-border/80 bg-background-surface/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/80">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                  {education.degree}
                </h3>
                <p className="text-sm font-medium text-foreground-muted flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-accent" />
                  <span>{education.institution}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-foreground-muted">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>{education.period}</span>
              <Badge variant="accent" size="sm" className="ml-2">Undergraduate</Badge>
            </div>
          </div>

          <div className="pt-4 text-xs font-mono text-foreground-muted">
            <span className="text-foreground font-semibold">Core Coursework: </span>
            <span>{education.coursework}</span>
          </div>
        </Card>
      </motion.div>

      {/* Highlights Grid */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {highlights.map((item, idx) => (
          <Card key={idx} className="flex flex-col justify-between p-5 h-full">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent tracking-wider uppercase">
                  {item.metric}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-accent/60" />
              </div>

              <h4 className="font-heading font-semibold text-base text-foreground leading-snug">
                {item.title}
              </h4>

              <p className="font-mono text-xs text-foreground-muted">
                {item.subtitle}
              </p>

              <p className="text-xs text-foreground-muted leading-relaxed pt-1">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </motion.div>
    </Section>
  )
}
