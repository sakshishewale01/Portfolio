import React from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { Photo } from '../components/ui/Photo'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import {
  MapPin,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
  Terminal,
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Premium, Cinematic & Recruiter-Friendly About Section (`id="about"`)
 * Features:
 * - Editorial typography with optimal 540-580px readable text width
 * - Refined portrait card with subtle violet border, restrained glow, and clear metadata
 * - Three compact skill focus tags with micro-accents
 * - Integrated "WHAT I'M BUILDING" project strip featuring genuine projects (FlowGrid & TeamFlow)
 * - Restrained, GPU-accelerated motion with full prefers-reduced-motion support
 */
export function About() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)

  const { paragraphs } = profile.about

  // 3 compact skill tags
  const skillTags = [
    'Full-Stack Development',
    'Data Structures & Algorithms',
    'Applied Machine Learning',
  ]

  // Genuine highlighted projects for the compact strip
  const featuredBuilds = [
    {
      title: 'FlowGrid',
      description: 'Smart logistics and transportation management with shipment-delay prediction.',
      githubUrl: 'https://github.com/sakshishewale01',
      category: 'Full-Stack + ML',
    },
    {
      title: 'TeamFlow',
      description: 'Role-based team and task management application with real-time updates.',
      githubUrl: 'https://github.com/sakshishewale01/TeamFlow',
      category: 'Full-Stack',
    },
  ]

  return (
    <Section
      id="about"
      label="02 // ABOUT ME"
      title="Learning by building. Growing through code."
      description="My journey in computer science, the projects I build, and the problems I am learning to solve."
      className="relative overflow-hidden"
    >
      {/* Subtle Low-Contrast Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f2312_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2312_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ============================================================== */}
        {/* LEFT COLUMN: EDITORIAL BIO, SKILL TAGS & PROJECT STRIP         */}
        {/* ============================================================== */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-7 flex flex-col justify-start space-y-8"
        >
          {/* Main Story Paragraphs (~540-580px readable desktop width) */}
          <div className="max-w-[580px] space-y-4 text-sm sm:text-base leading-relaxed text-foreground-muted">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={cn(
                  idx === 0
                    ? 'text-foreground font-normal sm:text-[17px] leading-relaxed tracking-tight'
                    : 'text-[#A1A1AA] leading-relaxed'
                )}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Three Compact Skill Tags */}
          <div className="space-y-2 pt-1">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
              Core Technical Focus
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {skillTags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-accent/25 bg-accent/5 text-foreground text-xs font-mono transition-colors hover:border-accent/45 hover:bg-accent/10 select-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT I'M BUILDING - Compact Integrated Project Strip */}
          <div className="pt-4 border-t border-border/60 max-w-[580px] space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHAT I'M BUILDING</span>
              </span>
              <span className="text-[11px] font-mono text-foreground-muted">
                Active Projects
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredBuilds.map((item) => (
                <a
                  key={item.title}
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-xl border border-border/80 bg-background-surface/70 hover:bg-background-surface p-4 transition-all duration-200 hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent flex flex-col justify-between gap-3 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-accent transition-colors flex items-center gap-1.5">
                        <span>{item.title}</span>
                      </h4>
                      <ArrowUpRight className="w-3.5 h-3.5 text-foreground-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <span className="font-mono text-[11px] text-accent/80 group-hover:underline flex items-center gap-1">
                    <span>View on GitHub</span>
                    <span>&rarr;</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: REFINED CINEMATIC PORTRAIT CARD                  */}
        {/* ============================================================== */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[380px]">
            {/* Subtle Ambient Violet Glow Behind Photo */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-accent/15 blur-2xl pointer-events-none opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Refined Portrait Container */}
            <div className="relative rounded-2xl overflow-hidden border border-accent/30 hover:border-accent/60 bg-background-surface/90 shadow-card transition-all duration-300 group hover:shadow-glow">
              {/* Photo Frame Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-background-elevated">
                <Photo
                  src={profile.photo.src}
                  alt={profile.photo.alt || "Portrait of Sakshi Shewale"}
                  width={profile.photo.width || 600}
                  height={profile.photo.height || 750}
                  fallbackInitials={profile.monogram || "SS"}
                  className="w-full h-full"
                  imageClassName="transition-transform duration-700 ease-out group-hover:scale-102"
                />

                {/* Availability Badge Overlay (Top-Left) */}
                <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/85 backdrop-blur-md border border-white/10 text-emerald-400 font-mono text-[11px] shadow-subtle">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="font-medium text-emerald-300">Open to opportunities</span>
                  </div>
                </div>

                {/* Subtle Gradient Vignette at Bottom to Protect Overlaid Text */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background-surface via-background-surface/80 to-transparent pointer-events-none z-10"
                />

                {/* Portrait Overlay Footer Info */}
                <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-heading font-bold text-base sm:text-lg text-foreground tracking-tight">
                      {profile.fullName || "Sakshi Shewale"}
                    </h3>
                    <span className="font-mono text-xs text-accent font-semibold shrink-0">
                      B.Tech CSE &bull; MITAOE
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono text-foreground-muted mt-1">
                    <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{profile.location || "Pune, India"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
