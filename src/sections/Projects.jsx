import React from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { SplitText } from '../components/ui/SplitText'
import { FeaturedCarousel } from '../components/projects/FeaturedCarousel'
import { ExploreGrid } from '../components/projects/ExploreGrid'
import { useCountUp } from '../hooks/useCountUp'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import { Sparkles, Layers, GitBranch } from 'lucide-react'

/**
 * Projects Section (`id="projects"`)
 * Two-tier animated showcase:
 * 1. Tier 1: Featured Projects (Desktop sticky pinned horizontal scroll, mobile scroll-snap)
 * 2. Tier 2: Explore Projects (Filterable grid with expanding preview panels)
 */
export function Projects() {
  const reducedMotion = useReducedMotion()
  const fadeUp = createFadeUp(reducedMotion)

  const featuredProjects = projects.filter((p) => p.tier === 'featured')
  const exploreProjects = projects.filter((p) => p.tier === 'explore')

  // Animated stat chips counting up
  const featuredCount = useCountUp(profile.projectStats?.featured || 5, 1200)
  const totalCount = useCountUp(profile.projectStats?.total || 11, 1400)
  const reposCount = useCountUp(profile.repoCount || 34, 1600)

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-x-clip"
    >
      {/* ============================================================== */}
      {/* 2. SECTION HEADER WITH STAT CHIPS                              */}
      {/* ============================================================== */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-14 md:mb-20 max-w-4xl"
      >
        {/* Label */}
        <div className="mb-3">
          <Badge variant="accent" size="sm">
            Selected Work
          </Badge>
        </div>

        {/* Heading using SplitText */}
        <h2 className="font-heading font-bold text-fluid-h2 tracking-tight text-foreground">
          <SplitText text="Things I've built" />
        </h2>

        {/* One-line subtext */}
        <p className="mt-3 text-foreground-muted text-fluid-body leading-relaxed max-w-2xl">
          Production systems, distributed backend infrastructure, and intelligent full-stack applications.
        </p>

        {/* Stat Chips Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6">
          {/* Chip 1 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background-surface border border-border text-xs font-mono shadow-xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold text-foreground">{featuredCount}</span>
            <span className="text-foreground-muted">featured</span>
          </div>

          {/* Chip 2 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background-surface border border-border text-xs font-mono shadow-xs">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span className="font-semibold text-foreground">{totalCount}</span>
            <span className="text-foreground-muted">projects</span>
          </div>

          {/* Chip 3 */}
          <a
            href="https://github.com/sakshishewale01?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background-surface border border-border text-xs font-mono shadow-xs hover:border-accent/50 text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <GitBranch className="w-3.5 h-3.5 text-accent" />
            <span className="font-semibold text-foreground">{reposCount}</span>
            <span>repos on GitHub</span>
          </a>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* 4. TIER 1: FEATURED SHOWCASE                                    */}
      {/* ============================================================== */}
      <div className="mb-24 md:mb-32">
        <FeaturedCarousel projects={featuredProjects} />
      </div>

      {/* ============================================================== */}
      {/* 5. TIER 2: MORE TO EXPLORE                                     */}
      {/* ============================================================== */}
      <div className="w-full">
        <ExploreGrid
          projects={exploreProjects}
          repoCount={profile.repoCount || 34}
        />
      </div>
    </section>
  )
}
