import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { NotFound } from './NotFound'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useLenis } from '../components/layout/SmoothScroll'
import { useActiveSection } from '../hooks/useActiveSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp } from '../lib/motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  AlertTriangle, 
  Sparkles, 
  Maximize2, 
  X,
  Calendar,
  UserCheck,
  Tag
} from 'lucide-react'
import { cn } from '../lib/utils'

const tocItems = [
  { id: 'problem', label: 'Problem & Context' },
  { id: 'solution-architecture', label: 'Solution & Architecture' },
  { id: 'features', label: 'Key Features' },
  { id: 'challenges', label: 'Challenges & Learnings' },
  { id: 'outcomes', label: 'Outcomes & Metrics' },
  { id: 'gallery', label: 'Screenshots' },
]

export function ProjectDetail() {
  const { slug } = useParams()
  const { scrollTo } = useLenis()
  const reducedMotion = useReducedMotion()
  const fadeUp = createFadeUp(reducedMotion)

  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  const [activeImage, setActiveImage] = useState(null)
  const lightboxCloseBtnRef = useRef(null)

  // Dynamic document title & meta tags
  useDocumentTitle(
    project ? `${project.title} // Case Study` : 'Project Not Found',
    project ? project.tagline : 'Technical engineering case study by Sakshi Shewale.'
  )

  const activeTocSection = useActiveSection(tocItems.map((item) => item.id), {
    rootMargin: '-20% 0px -60% 0px',
  })

  // Lightbox keyboard and scroll management
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveImage(null)
      }
    }

    if (activeImage) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
      setTimeout(() => lightboxCloseBtnRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage])

  if (!project) {
    return <NotFound />
  }

  return (
    <div className="pt-24 pb-20 w-full">
      {/* ================= HERO HEADER ================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-12">
        <div className="mb-6">
          <Link to="/#projects">
            <Button variant="ghost" size="sm" icon={ArrowLeft} iconPosition="left">
              Back to All Projects
            </Button>
          </Link>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="accent" size="sm">{project.category}</Badge>
            <span className="font-mono text-xs text-foreground-muted">&bull; {project.timeline}</span>
          </div>

          <h1 className="font-heading font-bold text-fluid-h1 tracking-tight text-foreground">
            {project.title}
          </h1>

          <p className="text-fluid-body text-foreground-muted max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Metadata Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-background-surface border border-border">
              <span className="font-mono text-[10px] text-foreground-muted flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-accent" /> ROLE
              </span>
              <p className="font-heading font-semibold text-xs text-foreground mt-1">{project.role}</p>
            </div>
            <div className="p-3 rounded-lg bg-background-surface border border-border">
              <span className="font-mono text-[10px] text-foreground-muted flex items-center gap-1">
                <Calendar className="w-3 h-3 text-accent" /> TIMELINE
              </span>
              <p className="font-heading font-semibold text-xs text-foreground mt-1">{project.timeline}</p>
            </div>
            <div className="p-3 rounded-lg bg-background-surface border border-border">
              <span className="font-mono text-[10px] text-foreground-muted flex items-center gap-1">
                <Tag className="w-3 h-3 text-accent" /> DOMAIN
              </span>
              <p className="font-heading font-semibold text-xs text-foreground mt-1">{project.category}</p>
            </div>
            <div className="p-3 rounded-lg bg-background-surface border border-border">
              <span className="font-mono text-[10px] text-foreground-muted flex items-center gap-1">
                <Layers className="w-3 h-3 text-accent" /> STACK
              </span>
              <p className="font-heading font-semibold text-xs text-foreground mt-1">{project.tech.slice(0, 2).join(', ')}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              as="a"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
              icon={ExternalLink}
              iconPosition="right"
            >
              Live Deployment
            </Button>
            <Button
              as="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="md"
              icon={Github}
              iconPosition="left"
            >
              Source Repository
            </Button>
          </div>

          {/* Hero Main Graphic Frame */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border bg-background-surface shadow-card mt-6">
            <img
              src={project.image}
              alt={`${project.title} Interface Overview`}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= MAIN CONTENT + STICKY TOC ================= */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Case Study Sections Column */}
          <div className="lg:col-span-8 space-y-14">
            {/* 1. Problem */}
            <section id="problem" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                  The Problem & Context
                </h2>
              </div>
              <Card className="p-6">
                <p className="text-foreground-muted leading-relaxed text-base sm:text-lg">
                  {project.problem}
                </p>
              </Card>
            </section>

            {/* 2. Solution & Architecture */}
            <section id="solution-architecture" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                  Solution & Architecture
                </h2>
              </div>
              <Card className="p-6 space-y-4">
                <p className="text-foreground-muted leading-relaxed">
                  {project.solution}
                </p>
                <div className="p-4 rounded-xl bg-background border border-border space-y-2">
                  <h4 className="font-heading font-semibold text-xs text-foreground uppercase tracking-wider font-mono">
                    System Architecture Overview
                  </h4>
                  <p className="text-xs text-foreground-muted font-mono leading-relaxed">
                    {project.architecture}
                  </p>
                </div>
              </Card>
            </section>

            {/* 3. Key Features */}
            <section id="features" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                  Key Features & Highlights
                </h2>
              </div>
              <Card className="p-6">
                <ul className="space-y-4">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground-muted leading-relaxed text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* 4. Challenges & Learnings */}
            <section id="challenges" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                  Challenges & Technical Decisions
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {project.challenges.map((c, idx) => (
                  <Card key={idx} className="p-6 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      <h4 className="font-heading font-semibold text-sm text-foreground">
                        {c.title}
                      </h4>
                    </div>
                    <p className="text-xs text-foreground-muted leading-relaxed pl-6">
                      {c.description}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            {/* 5. Outcomes & Metrics */}
            <section id="outcomes" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                  Outcomes & Metrics
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.outcomes.map((o, idx) => (
                  <Card key={idx} className="p-5 flex flex-col justify-between">
                    <div>
                      <p className="font-mono text-xs text-foreground-muted">{o.label}</p>
                      <p className="font-heading font-bold text-xl text-accent mt-1">{o.value}</p>
                    </div>
                    <p className="font-mono text-[11px] text-foreground-muted mt-3 pt-3 border-t border-border">
                      {o.note}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            {/* 6. Screenshots Lightbox Gallery */}
            <section id="gallery" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                  Visual Telemetry Gallery
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(imgSrc)}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border bg-background-surface group cursor-pointer shadow-subtle hover:border-accent/40 transition-colors"
                  >
                    <img
                      src={imgSrc}
                      alt={`${project.title} Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 text-accent font-mono text-xs border border-accent/40 shadow-glow">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Mini Table of Contents (TOC) Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <Card className="p-5 space-y-4 bg-background-surface/80 backdrop-blur-md">
              <p className="font-heading font-semibold text-xs uppercase tracking-wider text-foreground-muted font-mono">
                Table of Contents
              </p>
              <nav className="space-y-1">
                {tocItems.map((item) => {
                  const isActive = activeTocSection === item.id

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollTo(`#${item.id}`, { offset: -40, duration: 1.0 })}
                      className={cn(
                        "block w-full text-left text-xs py-1.5 px-2.5 rounded-md transition-all font-mono",
                        isActive
                          ? "bg-accent/15 text-accent font-medium border-l-2 border-accent"
                          : "text-foreground-muted hover:text-foreground hover:bg-background-elevated"
                      )}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </nav>

              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  icon={Github}
                >
                  GitHub Repository
                </Button>
                <Button
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  className="w-full justify-start text-xs"
                  icon={ExternalLink}
                >
                  Live Deployment
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      {/* ================= NEXT PROJECT CARD ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-20 pt-10 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider">
            Up Next
          </span>
          <span className="font-mono text-xs text-accent">
            {nextProject.category}
          </span>
        </div>

        <Link
          to={`/projects/${nextProject.slug}`}
          className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
        >
          <Card className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-border hover:border-accent/40 transition-colors">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono text-accent">Next Project Case Study</span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground group-hover:text-accent transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-sm text-foreground-muted max-w-xl">
                {nextProject.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-mono text-accent group-hover:translate-x-1 transition-transform">
              <span>Read Case Study</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Card>
        </Link>
      </section>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image Preview Lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-border bg-background-surface p-2 shadow-card"
            >
              <button
                ref={lightboxCloseBtnRef}
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 text-foreground hover:text-accent border border-border"
                aria-label="Close Lightbox Modal"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={activeImage}
                alt="Enlarged Case Study Graphic"
                className="w-full h-auto max-h-[82vh] object-contain rounded-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
