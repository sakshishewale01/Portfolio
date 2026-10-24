import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import {
  ExternalLink,
  Github,
  CheckCircle2,
  FolderGit2,
  ArrowUpRight,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { cn } from '../lib/utils'

export function Projects() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Full-Stack', 'AI/ML', 'Web']

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory) || p.category === activeCategory)

  // Split out flagship featured projects (FlowGrid & TeamFlow) when on "All" filter
  const isAll = activeCategory === 'All'
  const featuredProjects = isAll ? projects.filter((p) => p.featured) : []
  const standardProjects = isAll ? projects.filter((p) => !p.featured) : filteredProjects

  return (
    <Section
      id="projects"
      label="04 // FEATURED WORK"
      title="Real Projects. Working Systems."
      description="Full-stack web applications, backend APIs, and applied machine learning tools built with practical architectures and clean code."
      className="relative overflow-hidden"
    >
      {/* Subtle Low-Contrast Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f2312_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2312_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      {/* ================= 1. FILTER TABS & GITHUB STAT HEADER ================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-border/60">
        {/* Category Filter Pills */}
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

        {/* GitHub Repositories Link */}
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

      {/* ================= 2. FLAGSHIP SHOWCASE: FLOWGRID & TEAMFLOW ================= */}
      {isAll && (
        <div className="space-y-10 mb-14">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              Flagship Implementations
            </span>
          </div>

          <div className="space-y-8">
            {featuredProjects.map((project, index) => {
              const hasLive = Boolean(project.liveUrl && project.liveUrl !== 'TODO')
              const hasGithub = Boolean(project.githubUrl && project.githubUrl !== 'TODO')
              const isEven = index % 2 === 0

              return (
                <motion.article
                  key={project.slug}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl border border-border/80 bg-background-surface/90 hover:border-accent/50 transition-all duration-300 shadow-card overflow-hidden group hover:shadow-glow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
                    {/* Visual Preview Frame */}
                    <div className={cn("w-full lg:col-span-6", isEven ? "lg:order-1" : "lg:order-2")}>
                      <div className="overflow-hidden rounded-xl border border-border/70 group-hover:border-accent/40 transition-colors">
                        <ProjectVisual
                          slug={project.slug}
                          accent={project.accent}
                          liveUrl={project.liveUrl}
                        />
                      </div>
                    </div>

                    {/* Information Column */}
                    <div className={cn("w-full lg:col-span-6 flex flex-col justify-between space-y-4", isEven ? "lg:order-2" : "lg:order-1")}>
                      <div>
                        {/* Header Badge Row */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="accent" size="sm" className="font-mono text-[11px]">
                              {project.category}
                            </Badge>
                            <span className="font-mono text-[11px] text-accent font-semibold">
                              Featured #0{index + 1}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-mono">
                            <span
                              className={cn(
                                'w-2 h-2 rounded-full',
                                project.status === 'Live'
                                  ? 'bg-emerald-400 animate-pulse'
                                  : 'bg-amber-400'
                              )}
                            />
                            <span className="text-foreground-muted text-[11px]">{project.status}</span>
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="font-heading font-black text-2xl sm:text-3xl text-foreground group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-accent/80 font-medium mt-1">
                          {project.tagline}
                        </p>

                        {/* Problem Statement Block */}
                        <div className="mt-3 p-3 rounded-lg bg-background/60 border border-border/60">
                          <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block font-semibold mb-0.5">
                            Problem Addressed:
                          </span>
                          <p className="text-xs text-foreground-muted leading-relaxed">
                            {project.problem}
                          </p>
                        </div>

                        {/* What It Actually Does */}
                        <p className="mt-3 text-xs sm:text-sm text-foreground-muted leading-relaxed">
                          {project.whatItDoes || project.description}
                        </p>

                        {/* Implementation Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                          <div className="mt-3.5 space-y-1.5">
                            <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block font-semibold">
                              Implementation Highlights:
                            </span>
                            {project.highlights.slice(0, 3).map((hl, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
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

                      {/* Action Links */}
                      <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-3">
                        {hasLive ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent-hover transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Application</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-mono text-amber-300/80 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 select-none">
                            Under active build
                          </span>
                        )}

                        {hasGithub && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-background-elevated hover:bg-background border border-border hover:border-accent/40 text-foreground text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            <Github className="w-3.5 h-3.5 text-accent" />
                            <span>GitHub Code</span>
                          </a>
                        )}

                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-foreground-muted hover:text-accent transition-colors ml-auto group/btn"
                        >
                          <span>System Architecture</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      )}

      {/* ================= 3. SECONDARY PROJECT GRID ================= */}
      <div>
        {isAll && (
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              Additional Engineering Work
            </span>
          </div>
        )}

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {standardProjects.map((project, index) => {
              const hasLive = Boolean(project.liveUrl && project.liveUrl !== 'TODO')
              const hasGithub = Boolean(project.githubUrl && project.githubUrl !== 'TODO')

              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: reducedMotion ? 0.01 : 0.35,
                    delay: reducedMotion ? 0 : index * 0.06,
                  }}
                  whileHover={reducedMotion ? {} : { y: -4 }}
                  className="h-full"
                >
                  <div className="relative h-full rounded-2xl border border-border/80 bg-background-surface/80 hover:bg-background-surface backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-card hover:shadow-glow group hover:border-accent/50 overflow-hidden">
                    {/* Top ambient glow */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-15 blur-3xl transition-opacity duration-500"
                      style={{ backgroundColor: project.accent }}
                    />

                    <div>
                      {/* Header Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
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
                                : 'bg-accent'
                            )}
                          />
                          <span className="text-foreground-muted text-[11px]">{project.status}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-accent transition-colors duration-200">
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <p className="mt-1 text-xs font-mono text-accent/80 font-medium">
                        {project.tagline}
                      </p>

                      {/* Problem Statement */}
                      {project.problem && (
                        <p className="mt-2 text-xs text-foreground-muted/90 italic">
                          "{project.problem}"
                        </p>
                      )}

                      {/* Description */}
                      <p className="mt-2 text-xs text-foreground-muted leading-relaxed line-clamp-3">
                        {project.whatItDoes || project.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
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

                    {/* Action Row */}
                    <div className="pt-4 mt-5 border-t border-border/60 flex items-center gap-3">
                      {hasLive ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent-hover transition-colors shadow-xs flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center text-[11px] font-mono text-foreground-muted/60 px-3 py-1.5 rounded-lg bg-background/50 border border-border/50 flex-1 select-none">
                          Demo in build
                        </span>
                      )}

                      {hasGithub && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-background-elevated hover:bg-background border border-border hover:border-accent/40 text-foreground text-xs font-medium transition-colors flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <Github className="w-3.5 h-3.5 text-accent" />
                          <span>GitHub</span>
                        </a>
                      )}

                      <Link
                        to={`/projects/${project.slug}`}
                        className="p-1.5 rounded-lg text-foreground-muted hover:text-accent hover:bg-background-elevated transition-colors"
                        title="View Architecture Details"
                        aria-label={`View architecture details for ${project.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ================= 4. BOTTOM GITHUB PROFILE CTA ================= */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mt-14 p-6 rounded-2xl border border-border/80 bg-background-surface/60 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        <div className="space-y-1">
          <h4 className="font-heading font-semibold text-sm text-foreground">
            Explore All 34 Repositories & Open Source Work
          </h4>
          <p className="text-xs text-foreground-muted">
            Includes coursework data structures, C++ algorithms, hackathon prototypes, and utility scripts on GitHub.
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
