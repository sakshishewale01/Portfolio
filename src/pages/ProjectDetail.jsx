import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { NotFound } from './NotFound'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { WorkflowStepper } from '../components/projects/case-study/WorkflowStepper'
import { PipelineFlow } from '../components/projects/case-study/PipelineFlow'
import { NetSageReviewFlow } from '../components/projects/case-study/NetSageReviewFlow'
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
  AlertTriangle,
  Info,
  Calendar,
  UserCheck,
  Tag,
  Users,
  Compass,
  Sparkles,
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Case Study Detail Page (`/projects/:slug`)
 * Dynamically computes sections and TOC items based on non-TODO data.
 * Features specialized architecture steppers and pipelines.
 */
export function ProjectDetail() {
  const { slug } = useParams()
  const { scrollTo } = useLenis()
  const reducedMotion = useReducedMotion()
  const fadeUp = createFadeUp(reducedMotion)

  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  // Dynamic document title & meta tags
  useDocumentTitle(
    project ? `${project.title} // Case Study` : 'Project Not Found',
    project ? project.tagline : 'Technical engineering case study by Sakshi Shewale.'
  )

  // Compute available sections dynamically - Skip any section whose data is "TODO"
  const availableSections = useMemo(() => {
    if (!project) return []

    const sections = [
      { id: 'overview', label: 'Overview' },
    ]

    if (project.problem && project.problem !== 'TODO') {
      sections.push({ id: 'problem', label: 'The Problem' })
    }

    if (project.solution && project.solution !== 'TODO') {
      sections.push({ id: 'solution', label: 'The Solution' })
    }

    if (project.highlights && project.highlights !== 'TODO' && Array.isArray(project.highlights) && project.highlights.length > 0) {
      sections.push({ id: 'features', label: 'Key Features' })
    }

    // Architecture or Specialized Workflow
    if (
      project.workflow ||
      project.pipeline ||
      project.slug === 'netsage-ai' ||
      (project.architecture && project.architecture !== 'TODO')
    ) {
      sections.push({ id: 'architecture', label: 'Workflow & Architecture' })
    }

    if (project.tech && project.tech !== 'TODO' && Array.isArray(project.tech) && project.tech.length > 0) {
      sections.push({ id: 'tech-stack', label: 'Tech Stack' })
    }

    if (project.challenges && project.challenges !== 'TODO' && Array.isArray(project.challenges) && project.challenges.length > 0) {
      sections.push({ id: 'challenges', label: 'Challenges & Decisions' })
    }

    if (project.outcomes && project.outcomes !== 'TODO' && Array.isArray(project.outcomes) && project.outcomes.length > 0) {
      sections.push({ id: 'outcomes', label: 'Outcomes & Metrics' })
    }

    if (project.roadmap && project.roadmap !== 'TODO' && Array.isArray(project.roadmap) && project.roadmap.length > 0) {
      sections.push({ id: 'roadmap', label: 'Roadmap (Planned)' })
    }

    return sections
  }, [project])

  const activeTocSection = useActiveSection(
    availableSections.map((item) => item.id),
    { rootMargin: '-20% 0px -60% 0px' }
  )

  if (!project) {
    return <NotFound />
  }

  const hasLiveUrl = project.liveUrl && project.liveUrl !== 'TODO'
  const hasGithubUrl = project.githubUrl && project.githubUrl !== 'TODO'
  const isTeam = project.teamSize && project.teamSize !== 'TODO'

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
          {/* Category & Status Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="accent" size="sm">
              {project.category}
            </Badge>

            {project.status && project.status !== 'TODO' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border border-border bg-background-elevated">
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    project.status === 'Live' ? 'bg-emerald-400' : 'bg-amber-400'
                  )}
                />
                <span>{project.status}</span>
              </span>
            ) : (
              <span className="font-mono text-xs text-foreground-muted">
                • In Development
              </span>
            )}

            {isTeam && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono border border-border bg-background-elevated text-foreground-muted">
                <Users className="w-3 h-3 text-accent" />
                <span>Team Project ({project.teamSize} members)</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-heading font-bold text-fluid-h1 tracking-tight text-foreground">
            {project.title}
          </h1>

          {/* Tagline */}
          <p className="text-fluid-body text-foreground-muted max-w-3xl leading-relaxed">
            {project.tagline && project.tagline !== 'TODO' ? (
              project.tagline
            ) : (
              <span className="italic">Details coming soon</span>
            )}
          </p>

          {/* Metadata Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-background-surface border border-border">
              <span className="font-mono text-[10px] text-foreground-muted flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-accent" /> ROLE
              </span>
              <p className="font-heading font-semibold text-xs text-foreground mt-1">
                {project.myRole && project.myRole !== 'TODO' ? project.myRole : 'Details coming soon'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-background-surface border border-border">
              <span className="font-mono text-[10px] text-foreground-muted flex items-center gap-1">
                <Users className="w-3 h-3 text-accent" /> TEAM
              </span>
              <p className="font-heading font-semibold text-xs text-foreground mt-1">
                {isTeam ? `${project.teamSize} Engineers` : 'Independent Project'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-background-surface border border-border">
              <span className="font-mono text-[10px] text-foreground-muted flex items-center gap-1">
                <Tag className="w-3 h-3 text-accent" /> DOMAIN
              </span>
              <p className="font-heading font-semibold text-xs text-foreground mt-1">
                {project.category}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-background-surface border border-border">
              <span className="font-mono text-[10px] text-foreground-muted flex items-center gap-1">
                <Layers className="w-3 h-3 text-accent" /> PRIMARY STACK
              </span>
              <p className="font-heading font-semibold text-xs text-foreground mt-1 truncate">
                {Array.isArray(project.tech) ? project.tech.slice(0, 2).join(', ') : 'Details coming soon'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {hasLiveUrl && (
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
                {project.slug === 'teamflow' ? 'Launch Live TeamFlow Workspace' : 'Live Deployment'}
              </Button>
            )}

            {hasGithubUrl && (
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
            )}
          </div>

          {/* Educational Disclaimer Note (e.g. for CineFlix) */}
          {project.note && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{project.note}</p>
            </div>
          )}

          {/* Hero Visual Mockup Frame (Using Reusable ProjectVisual instead of screenshots) */}
          <div className="w-full rounded-2xl overflow-hidden border border-border bg-background-surface shadow-card mt-6">
            <ProjectVisual
              slug={project.slug}
              accent={project.accent}
              liveUrl={project.liveUrl}
              className="min-h-[340px] sm:min-h-[420px]"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= MAIN CONTENT + STICKY TOC ================= */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Case Study Sections Column */}
          <div className="lg:col-span-8 space-y-14">
            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                  Overview
                </h2>
              </div>
              <Card className="p-6">
                <p className="text-foreground-muted leading-relaxed text-base sm:text-lg">
                  {project.description && project.description !== 'TODO' ? (
                    project.description
                  ) : (
                    <span className="italic text-foreground-muted/70 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-accent" />
                      Detailed project overview is currently being documented.
                    </span>
                  )}
                </p>
              </Card>
            </section>

            {/* 2. Problem (rendered only if not TODO) */}
            {project.problem && project.problem !== 'TODO' && (
              <section id="problem" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                    The Problem & Context
                  </h2>
                </div>
                <Card className="p-6">
                  <p className="text-foreground-muted leading-relaxed text-base">
                    {project.problem}
                  </p>
                </Card>
              </section>
            )}

            {/* 3. Solution (rendered only if not TODO) */}
            {project.solution && project.solution !== 'TODO' && (
              <section id="solution" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                    The Engineering Solution
                  </h2>
                </div>
                <Card className="p-6">
                  <p className="text-foreground-muted leading-relaxed text-base">
                    {project.solution}
                  </p>
                </Card>
              </section>
            )}

            {/* 4. Key Features & Highlights */}
            {project.highlights && project.highlights !== 'TODO' && Array.isArray(project.highlights) && project.highlights.length > 0 && (
              <section id="features" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                    Key Features & Technical Capabilities
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
            )}

            {/* 5. Workflow or Architecture */}
            <section id="architecture" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                  System Architecture & Process Flow
                </h2>
              </div>

              {/* Specialized Interactive Views */}
              {project.slug === 'conference-flow' && (
                <WorkflowStepper accent={project.accent} />
              )}

              {project.slug === 'flowgrid' && (
                <PipelineFlow accent={project.accent} />
              )}

              {project.slug === 'netsage-ai' && (
                <NetSageReviewFlow accent={project.accent} />
              )}

              {/* Textual Architecture Description if provided */}
              {project.architecture && project.architecture !== 'TODO' && (
                <Card className="p-6 space-y-3">
                  <h4 className="font-heading font-semibold text-xs text-foreground uppercase tracking-wider font-mono">
                    Architectural Blueprint & Data Flow
                  </h4>
                  <p className="text-sm text-foreground-muted font-mono leading-relaxed">
                    {project.architecture}
                  </p>
                </Card>
              )}
            </section>

            {/* 6. Tech Stack */}
            {project.tech && project.tech !== 'TODO' && Array.isArray(project.tech) && project.tech.length > 0 && (
              <section id="tech-stack" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                    Technology Stack & Tooling
                  </h2>
                </div>
                <Card className="p-6">
                  <div className="flex flex-wrap gap-2.5">
                    {project.tech.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-background border border-border text-foreground hover:border-accent/40 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </Card>
              </section>
            )}

            {/* 7. Challenges & Learnings */}
            {project.challenges && project.challenges !== 'TODO' && Array.isArray(project.challenges) && project.challenges.length > 0 && (
              <section id="challenges" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                    Challenges & Engineering Trade-offs
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {project.challenges.map((c, idx) => (
                    <Card key={idx} className="p-6 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
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
            )}

            {/* 8. Outcomes & Metrics */}
            {project.outcomes && project.outcomes !== 'TODO' && Array.isArray(project.outcomes) && project.outcomes.length > 0 && (
              <section id="outcomes" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                    Outcomes & System Metrics
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.outcomes.map((o, idx) => (
                    <Card key={idx} className="p-5 flex flex-col justify-between">
                      <div>
                        <p className="font-mono text-xs text-foreground-muted">{o.label}</p>
                        <p className="font-heading font-bold text-xl text-accent mt-1">{o.value}</p>
                      </div>
                      {o.note && (
                        <p className="font-mono text-[11px] text-foreground-muted mt-3 pt-3 border-t border-border">
                          {o.note}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* 9. Roadmap (Planned Features) */}
            {project.roadmap && project.roadmap !== 'TODO' && Array.isArray(project.roadmap) && project.roadmap.length > 0 && (
              <section id="roadmap" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <h2 className="font-heading font-bold text-fluid-h2 text-foreground">
                    Roadmap & Future Capabilities
                  </h2>
                </div>
                <Card className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent">
                    <Compass className="w-4 h-4" />
                    <span>Planned Architectural Extensions</span>
                  </div>
                  <ul className="space-y-2.5 pt-2">
                    {project.roadmap.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground-muted font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
            )}
          </div>

          {/* Sticky Mini Table of Contents (TOC) Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <Card className="p-5 space-y-4 bg-background-surface/80 backdrop-blur-md">
              <p className="font-heading font-semibold text-xs uppercase tracking-wider text-foreground-muted font-mono">
                Table of Contents
              </p>
              <nav className="space-y-1">
                {availableSections.map((item) => {
                  const isActive = activeTocSection === item.id

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollTo(`#${item.id}`, { offset: -40, duration: 1.0 })}
                      className={cn(
                        'block w-full text-left text-xs py-1.5 px-2.5 rounded-md transition-all font-mono',
                        isActive
                          ? 'bg-accent/15 text-accent font-medium border-l-2 border-accent'
                          : 'text-foreground-muted hover:text-foreground hover:bg-background-elevated'
                      )}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </nav>

              <div className="pt-4 border-t border-border space-y-2">
                {hasGithubUrl && (
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
                )}
                {hasLiveUrl && (
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
                )}
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
                {nextProject.tagline && nextProject.tagline !== 'TODO'
                  ? nextProject.tagline
                  : 'Details coming soon'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-mono text-accent group-hover:translate-x-1 transition-transform">
              <span>Read Case Study</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Card>
        </Link>
      </section>
    </div>
  )
}
