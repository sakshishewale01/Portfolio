import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ArrowUpRight, ChevronDown, Github, ExternalLink, Sparkles } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Compact Explore Card with hover lift, accent border glow,
 * sliding arrow, and expanding quick preview drawer.
 * Renders TODO fields as subtle "Details coming soon".
 */
export function ExploreCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const reducedMotion = useReducedMotion()

  const paddedIndex = String(project.order || index + 1).padStart(2, '0')
  const isTaglineTodo = !project.tagline || project.tagline === 'TODO'
  const isTechTodo = !project.tech || project.tech === 'TODO' || (Array.isArray(project.tech) && project.tech.length === 0)
  const hasGithub = project.githubUrl && project.githubUrl !== 'TODO'
  const hasLive = project.liveUrl && project.liveUrl !== 'TODO'

  return (
    <Card
      className="p-5 flex flex-col justify-between border-border/80 hover:border-accent/50 transition-all duration-300 relative group overflow-hidden bg-background-surface/80"
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-accent/80">
              {paddedIndex}
            </span>
            <Badge variant="outline" size="sm" className="text-[10px] py-0 px-2">
              {project.category}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {project.status && project.status !== 'TODO' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {project.status}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-foreground-muted/60">
                In Pipeline
              </span>
            )}

            <Link
              to={`/projects/${project.slug}`}
              aria-label={`View case study for ${project.title}`}
              className="p-1 rounded-md text-foreground-muted hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Title */}
        <Link
          to={`/projects/${project.slug}`}
          className="focus-visible:outline-none focus-visible:underline"
        >
          <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h4>
        </Link>

        {/* Tagline or "Details coming soon" */}
        <p className="mt-2 text-xs text-foreground-muted line-clamp-2 leading-relaxed">
          {isTaglineTodo ? (
            <span className="italic text-foreground-muted/70 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent/60" />
              Details coming soon
            </span>
          ) : (
            project.tagline
          )}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
          {isTechTodo ? (
            <span className="text-[10px] font-mono text-foreground-muted/50 italic">
              Tech stack specs coming soon
            </span>
          ) : (
            (Array.isArray(project.tech) ? project.tech : [project.tech]).map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-background border border-border/60 text-foreground-muted"
              >
                {tool}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Footer Row: Expand Preview button + External Links */}
      <div className="pt-4 mt-3 border-t border-border/50 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <span>{isExpanded ? 'Hide info' : 'Quick preview'}</span>
          <ChevronDown
            className={cn('w-3.5 h-3.5 transition-transform duration-200', isExpanded && 'rotate-180')}
          />
        </button>

        <div className="flex items-center gap-1.5">
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub source for ${project.title}`}
              className="p-1 rounded text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live URL for ${project.title}`}
              className="p-1 rounded text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Expanding Preview Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.25, ease: 'easeInOut' }}
            className="overflow-hidden pt-3 border-t border-border/40 text-xs text-foreground-muted space-y-2 mt-2"
          >
            {project.description && project.description !== 'TODO' ? (
              <p className="leading-relaxed">{project.description}</p>
            ) : (
              <p className="italic text-foreground-muted/70">
                Comprehensive architecture and case study details for {project.title} are currently being documented.
              </p>
            )}
            <div className="pt-1">
              <Link
                to={`/projects/${project.slug}`}
                className="text-accent text-[11px] font-mono hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>Read case study</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
