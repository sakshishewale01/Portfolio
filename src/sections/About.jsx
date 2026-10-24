import React from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import {
  GraduationCap,
  Layers,
  Code2,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Calendar,
  CheckCircle2,
  Terminal,
} from 'lucide-react'
import { cn } from '../lib/utils'

const iconMap = {
  GraduationCap: GraduationCap,
  Layers: Layers,
  Code2: Code2,
  Sparkles: Sparkles,
}

/**
 * Editorial About Section (`id="about"`)
 * Presents Sakshi's genuine engineering student narrative and core focus blocks.
 */
export function About() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)

  const { paragraphs, focusAreas } = profile.about

  const skillTags = [
    'Full-Stack Systems',
    'C++ & Data Structures',
    'Applied Machine Learning',
    'Relational Databases',
    'REST APIs',
  ]

  const featuredBuilds = [
    {
      title: 'FlowGrid',
      tagline: 'Logistics platform with ML delay prediction',
      tech: 'FastAPI • PostgreSQL • React • Scikit-learn',
      githubUrl: 'https://github.com/sakshishewale01',
    },
    {
      title: 'TeamFlow',
      tagline: 'Real-time collaborative task workspace',
      tech: 'React • Supabase • Tailwind CSS',
      githubUrl: 'https://github.com/sakshishewale01/TeamFlow',
    },
  ]

  return (
    <Section
      id="about"
      label="02 // ABOUT ME"
      title="Learning by building. Growing through code."
      description="Computer Science student passionate about full-stack systems, algorithmic problem-solving, and building dependable software."
      className="relative overflow-hidden"
    >
      {/* Subtle Low-Contrast Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f2312_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2312_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ================= LEFT COLUMN: STORY & FOCUS STRIP ================= */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-7 flex flex-col justify-start space-y-6"
        >
          {/* Main Editorial Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-foreground-muted max-w-xl">
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

          {/* Skill Focus Pills */}
          <div className="space-y-2 pt-1">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
              Core Technical Focus
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {skillTags.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/25 bg-accent/5 text-foreground text-xs font-mono transition-colors hover:border-accent/45 hover:bg-accent/10 select-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What I'm Building Spotlight Strip */}
          <div className="pt-4 border-t border-border/60 max-w-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHAT I'M CURRENTLY BUILDING</span>
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
                      {item.tagline}
                    </p>
                  </div>

                  <span className="font-mono text-[10px] text-accent/80 group-hover:underline flex items-center gap-1">
                    <span>{item.tech}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: 4 COMPACT INFORMATION BLOCKS ================= */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-5 grid grid-cols-1 gap-3.5"
        >
          {focusAreas.map((block, idx) => {
            const Icon = iconMap[block.icon] || Code2

            return (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.4,
                  delay: reducedMotion ? 0 : idx * 0.08,
                }}
                className="p-4 rounded-xl border border-border/80 bg-background-surface/80 hover:bg-background-surface hover:border-accent/40 transition-all duration-300 shadow-card group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                        {block.title}
                      </span>
                    </div>

                    <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-accent transition-colors truncate">
                      {block.subtitle}
                    </h4>

                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {block.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </Section>
  )
}
