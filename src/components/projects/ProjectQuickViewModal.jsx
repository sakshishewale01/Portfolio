import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { ProjectVisual } from './ProjectVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  X,
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FolderGit2,
} from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Accessible Project Quick-View Modal:
 * - Focus trapped inside dialog
 * - Esc key to close, Left/Right arrow keys to cycle projects
 * - Focus returns to opener element upon closing
 * - data-lenis-prevent to prevent background page scroll hijacking
 */
export function ProjectQuickViewModal({
  isOpen,
  onClose,
  projects = [],
  currentIndex = 0,
  onSelectIndex,
  openerRef,
}) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const reducedMotion = useReducedMotion()

  const project = projects[currentIndex]

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (onSelectIndex) {
          onSelectIndex((currentIndex + 1) % projects.length)
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (onSelectIndex) {
          onSelectIndex((currentIndex - 1 + projects.length) % projects.length)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onSelectIndex, currentIndex, projects.length])

  // Focus trap management
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 40)
    } else {
      if (openerRef?.current) {
        openerRef.current.focus()
      }
    }
  }, [isOpen, openerRef])

  if (!project) return null

  const hasLive = Boolean(project.liveUrl && project.liveUrl !== 'TODO')
  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== 'TODO')

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          data-lenis-prevent="true"
          className="fixed inset-0 z-[10002] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-[#111116] shadow-card overflow-hidden flex flex-col max-h-[90vh] z-10"
          >
            {/* Header Chrome */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/80 bg-background-surface/80">
              <div className="flex items-center gap-2">
                <Badge variant="accent" size="sm" className="font-mono text-xs">
                  {project.category}
                </Badge>
                <span className="font-mono text-xs text-foreground-muted">
                  Project {currentIndex + 1} of {projects.length}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Steppers */}
                <button
                  type="button"
                  onClick={() => onSelectIndex((currentIndex - 1 + projects.length) % projects.length)}
                  className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-elevated"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectIndex((currentIndex + 1) % projects.length)}
                  className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-elevated"
                  aria-label="Next project"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="w-[1px] h-4 bg-border mx-1" />

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-elevated"
                  aria-label="Close modal dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Visual Preview */}
              <div className="rounded-xl overflow-hidden border border-border">
                <ProjectVisual
                  slug={project.slug}
                  accent={project.accent}
                  liveUrl={project.liveUrl}
                  className="min-h-[220px]"
                />
              </div>

              {/* Title & Tagline */}
              <div>
                <h3
                  id="quick-view-title"
                  className="font-heading font-black text-2xl sm:text-3xl text-foreground"
                >
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-accent font-medium">
                  {project.tagline}
                </p>
              </div>

              {/* Problem Statement */}
              {project.problem && (
                <div className="p-3.5 rounded-xl bg-background border border-border/80">
                  <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block font-semibold mb-1">
                    Problem Solved
                  </span>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* What It Does */}
              <div>
                <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block font-semibold mb-1.5">
                  Implementation Details
                </span>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {project.whatItDoes || project.description}
                </p>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-background border border-border text-foreground-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-border/80 bg-background-surface/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {hasLive && (
                  <Button
                    as="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="sm"
                    icon={ExternalLink}
                    iconPosition="right"
                  >
                    Launch Live Demo
                  </Button>
                )}

                {hasGithub && (
                  <Button
                    as="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="sm"
                    icon={Github}
                    iconPosition="left"
                  >
                    Source Code
                  </Button>
                )}
              </div>

              <Link
                to={`/projects/${project.slug}`}
                onClick={onClose}
                className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
