import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import { 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  Calendar,
  Building
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Interactive Photo Card with 3D Tilt on Hover & Floating Location Chip
 */
function TiltPhotoCard({ image, name, location }) {
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

    // Clamp rotation angle to ~8 degrees max
    rotateX.set(-y / 18)
    rotateY.set(x / 18)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
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
        className="relative rounded-2xl overflow-hidden border border-border/80 bg-background-surface/80 p-3 shadow-card group transition-shadow duration-300 hover:shadow-glow hover:border-accent/40"
      >
        {/* Aspect-Ratio Frame Container */}
        <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-background-elevated">
          <img
            src={image || '/profile.svg'}
            alt={`${name} portrait illustration`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Gradient Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

          {/* Floating Location Chip */}
          <div className="absolute bottom-3 right-3 z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-border/90 text-foreground text-xs font-mono shadow-subtle hover:border-accent/40 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Bottom Card Footer Details */}
        <div className="pt-3 pb-1 px-2 flex items-center justify-between text-xs text-foreground-muted font-mono">
          <span className="flex items-center gap-1.5 text-foreground">
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
      {/* Top Two-Column Story & Photo */}
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
            image={profile.image}
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

      {/* Highlights Grid (3-4 Small Cards) */}
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
