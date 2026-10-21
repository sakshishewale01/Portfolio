import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { 
  ArrowRight, 
  Github, 
  ExternalLink, 
  Layers, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react'
import { cn } from '../lib/utils'

const filterCategories = ["All", "Web3", "Full-Stack", "AI"]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const reducedMotion = useReducedMotion()

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true
    return project.category.toLowerCase() === activeFilter.toLowerCase()
  })

  return (
    <Section
      id="projects"
      label="04 // Engineering Systems"
      title="Featured Projects & Case Studies"
      description="Architected with algorithmic rigor, verifiable decentralization, and low-latency distributed telemetry."
    >
      {/* Category Filter Tabs with Sliding Active Pill */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-background-surface border border-border shadow-subtle">
          {filterCategories.map((category) => {
            const isActive = activeFilter === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "relative px-4 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive ? "text-foreground font-semibold" : "text-foreground-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-project-tab"
                    className="absolute inset-0 rounded-full bg-accent/20 border border-accent/40 -z-10 shadow-glow"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span>{category}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Projects Grid with AnimatePresence */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isFlagship = project.featured

            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "h-full",
                  isFlagship ? "lg:col-span-2" : "col-span-1"
                )}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  data-cursor="view"
                  className="project-card block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background group"
                >
                  <Card
                    className="h-full flex flex-col justify-between p-0 overflow-hidden border-border/80 hover:border-accent/40"
                    enableGlow={true}
                  >
                    {isFlagship ? (
                      /* Flagship Two-Column Featured Card */
                      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                        {/* Image Preview Frame */}
                        <div className="lg:col-span-7 relative overflow-hidden bg-background-elevated aspect-[16/10] lg:aspect-auto">
                          <img
                            src={project.image}
                            alt={`${project.title} Preview Mockup`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background-surface lg:from-transparent lg:to-transparent" />
                          <div className="absolute top-4 left-4 z-10">
                            <Badge variant="accent" dot size="sm">
                              Flagship Architecture
                            </Badge>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" size="sm">
                                {project.category}
                              </Badge>
                              <span className="font-mono text-xs text-foreground-muted">
                                {project.timeline}
                              </span>
                            </div>

                            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground group-hover:text-white transition-colors">
                              {project.title}
                            </h3>

                            <p className="text-sm text-foreground-muted leading-relaxed">
                              {project.tagline}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-background text-foreground-muted border border-border"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Footer */}
                          <div className="pt-6 mt-6 border-t border-border/70 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent group-hover:text-accent-hover transition-colors">
                              <span>View Case Study</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                                }}
                                aria-label={`${project.title} Source Code`}
                                className="p-2 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors"
                              >
                                <Github className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                                }}
                                aria-label={`${project.title} Live Application`}
                                className="p-2 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Standard Compact Cards */
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Image Thumbnail Frame */}
                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-background-elevated border-b border-border/80">
                            <img
                              src={project.image}
                              alt={`${project.title} Preview`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge variant="outline" size="sm">
                                {project.category}
                              </Badge>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-white transition-colors">
                                {project.title}
                              </h3>
                              <span className="font-mono text-xs text-foreground-muted">
                                {project.timeline}
                              </span>
                            </div>

                            <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
                              {project.tagline}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {project.tech.slice(0, 4).map((t) => (
                                <span
                                  key={t}
                                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-background text-foreground-muted border border-border"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Card Action Footer */}
                        <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-border/70 pt-4">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent group-hover:text-accent-hover transition-colors">
                            <span>Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                              }}
                              aria-label={`${project.title} GitHub Repository`}
                              className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                              }}
                              aria-label={`${project.title} Live Deployment`}
                              className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
