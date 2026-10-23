import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ArrowUpRight,
  Code2,
  FolderGit2,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Clean, Animated Projects Showcase (`id="projects"`)
 * Features:
 * - Direct Live Demo and GitHub Repository action buttons
 * - Category filter tabs with smooth animated spring indicators
 * - Glowing accent borders on hover with spring scale physics
 * - Honest, uncluttered project descriptions for an aspiring software engineer
 * - Zero case study fluff or redundant navigation
 */
export function Projects() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Full-Stack', 'AI/ML', 'Web']

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <Section
      id="projects"
      label="04 // Projects"
      title="Featured Projects"
      description="Full-stack web applications and software engineering projects built with modern frameworks and practical architectures."
    >
      {/* ============================================================== */}
      {/* 1. FILTER TABS & GITHUB STAT HEADER                            */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-border/60">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-background-surface border border-border shadow-xs">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'relative px-4 py-1.5 rounded-lg text-xs font-mono transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isActive
                    ? 'text-foreground font-semibold'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-project-filter"
                    className="absolute inset-0 rounded-lg bg-accent/20 border border-accent/40 -z-10 shadow-glow"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span>{cat}</span>
              </button>
            )
          })}
        </div>

        {/* GitHub Repos Pill */}
        <a
          href="https://github.com/sakshishewale01?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background-surface border border-border text-xs font-mono text-foreground-muted hover:text-foreground hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-xs group"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
          <span>34+ Repositories on GitHub</span>
          <ArrowUpRight className="w-3 h-3 text-foreground-muted group-hover:text-accent transition-colors" />
        </a>
      </div>

      {/* ============================================================== */}
      {/* 2. ANIMATED PROJECT CARDS GRID                                  */}
      {/* ============================================================== */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const hasLive = Boolean(project.liveUrl && project.liveUrl !== 'TODO')
            const hasGithub = Boolean(project.githubUrl && project.githubUrl !== 'TODO')

            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.35,
                  delay: reducedMotion ? 0 : index * 0.07,
                }}
                whileHover={reducedMotion ? {} : { y: -5 }}
                className="h-full"
              >
                <div
                  className="relative h-full rounded-2xl border border-border/80 bg-background-surface/80 hover:bg-background-surface backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 shadow-card hover:shadow-glow group hover:border-accent/50 overflow-hidden"
                  style={{
                    '--project-accent': project.accent,
                  }}
                >
                  {/* Top Ambient Glow on Hover */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500"
                    style={{ backgroundColor: project.accent }}
                  />

                  {/* Card Content */}
                  <div>
                    {/* Header Row: Category Badge & Status */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <Badge variant="outline" size="sm" className="font-mono text-[11px] py-0.5 px-2.5">
                        {project.category}
                      </Badge>

                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full',
                            project.status === 'Live'
                              ? 'bg-emerald-400 animate-pulse'
                              : project.status === 'Completed'
                              ? 'bg-indigo-400'
                              : project.status === 'In Progress'
                              ? 'bg-amber-400'
                              : 'bg-accent'
                          )}
                        />
                        <span className="text-foreground-muted text-[11px]">{project.status}</span>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="mt-1 text-xs font-mono text-accent/80 font-medium line-clamp-1">
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-xs text-foreground-muted leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {project.tech.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-background border border-border/70 text-foreground-muted"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Row: Direct Live Demo & GitHub Links */}
                  <div className="pt-5 mt-5 border-t border-border/60 flex items-center gap-3">
                    {hasLive ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent-hover transition-colors shadow-xs flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center text-[11px] font-mono text-foreground-muted/60 px-3 py-2 rounded-lg bg-background/50 border border-border/50 flex-1 select-none">
                        Demo in build
                      </span>
                    )}

                    {hasGithub ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-background-elevated hover:bg-background border border-border hover:border-accent/40 text-foreground text-xs font-medium transition-colors flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Github className="w-3.5 h-3.5 text-accent" />
                        <span>GitHub</span>
                      </a>
                    ) : (
                      <a
                        href="https://github.com/sakshishewale01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-background-elevated hover:bg-background border border-border text-foreground-muted text-xs font-medium transition-colors flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* ============================================================== */}
      {/* 3. BOTTOM GITHUB PROFILE CTA                                    */}
      {/* ============================================================== */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mt-14 p-6 rounded-2xl border border-border/80 bg-background-surface/60 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        <div className="space-y-1">
          <h4 className="font-heading font-semibold text-sm text-foreground">
            Explore All Repositories & Open Source Work
          </h4>
          <p className="text-xs text-foreground-muted">
            Includes coursework algorithms, hackathon prototypes, and utility scripts on GitHub.
          </p>
        </div>

        <Button
          as="a"
          href="https://github.com/sakshishewale01"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
          icon={Github}
          iconPosition="left"
        >
          View GitHub Profile
        </Button>
      </motion.div>
    </Section>
  )
}
