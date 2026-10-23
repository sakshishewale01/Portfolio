import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ProjectVisual } from './ProjectVisual'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Github, ExternalLink, Users, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Featured Project Card with direct Live Demo & GitHub actions.
 * No case study links - focused, clean, and directly actionable.
 */
export function FeaturedCard({ project, index, total = 5, className }) {
  const cardRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)

  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)

  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const xFromCenter = (e.clientX - rect.left) / width - 0.5
    const yFromCenter = (e.clientY - rect.top) / height - 0.5

    mouseX.set(xFromCenter)
    mouseY.set(yFromCenter)

    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const paddedIndex = String(index + 1).padStart(2, '0')
  const hasLiveUrl = project.liveUrl && project.liveUrl !== 'TODO'
  const hasGithubUrl = project.githubUrl && project.githubUrl !== 'TODO'
  const isTeam = project.teamSize && project.teamSize !== 'TODO'

  // Get up to 3 clean highlights
  const displayHighlights = Array.isArray(project.highlights)
    ? project.highlights.slice(0, 3)
    : []

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative w-full rounded-2xl border border-border/80 bg-background-surface/95 backdrop-blur-md p-6 sm:p-8 md:p-9 shadow-card transition-colors duration-300 group hover:border-accent/40',
        className
      )}
    >
      {/* Spotlight Radial Glow */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${x}px ${y}px, ${project.accent}15, transparent 80%)`
            ),
          }}
          aria-hidden="true"
        />
      )}

      {/* Outlined Index Number Watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-4 font-mono font-black text-6xl sm:text-7xl select-none opacity-10 text-foreground"
      >
        {paddedIndex}
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Visual Mockup */}
        <div className="lg:col-span-7 w-full">
          <ProjectVisual
            slug={project.slug}
            accent={project.accent}
            liveUrl={project.liveUrl}
          />
        </div>

        {/* Right Column: Project Info & Direct Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" size="sm">
                {project.category}
              </Badge>

              {project.status && project.status !== 'TODO' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-border bg-background-elevated">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      project.status === 'Live' ? 'bg-emerald-400' : 'bg-amber-400'
                    )}
                  />
                  <span>{project.status}</span>
                </span>
              )}

              {isTeam && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono border border-border bg-background-elevated text-foreground-muted">
                  <Users className="w-3 h-3 text-accent" />
                  <span>Team ({project.teamSize})</span>
                </span>
              )}
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight group-hover:text-accent transition-colors duration-200">
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Quick Feature Highlights */}
            {displayHighlights.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {displayHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{hl}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-background border border-border/70 text-foreground-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row: Direct Live Demo & GitHub Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
            {hasLiveUrl ? (
              <Button
                as="a"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                icon={ExternalLink}
                iconPosition="right"
                aria-label={`View live demo of ${project.title}`}
              >
                Live Demo
              </Button>
            ) : (
              <span className="text-xs font-mono text-foreground-muted/60 px-3 py-2 rounded-lg bg-background border border-border/60">
                Demo in development
              </span>
            )}

            {hasGithubUrl ? (
              <Button
                as="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="md"
                icon={Github}
                iconPosition="left"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                GitHub Code
              </Button>
            ) : (
              <span className="text-xs font-mono text-foreground-muted/60 px-3 py-2 rounded-lg bg-background border border-border/60">
                GitHub Repo soon
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
