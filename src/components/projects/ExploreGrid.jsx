import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExploreCard } from './ExploreCard'
import { Card } from '../ui/Card'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Github, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

const filterCategories = ['All', 'AI', 'Web', 'Full-Stack']

/**
 * Filterable Explore Tier Grid with sliding pill tabs and GitHub repo CTA card.
 */
export function ExploreGrid({ projects, repoCount = 34 }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const reducedMotion = useReducedMotion()

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true
    return project.category.toLowerCase() === activeFilter.toLowerCase()
  })

  return (
    <div className="space-y-8 w-full">
      {/* Category Filter Tabs with Sliding Active Pill */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h3 className="font-heading font-bold text-xl text-foreground">
            More to Explore
          </h3>
          <p className="text-xs text-foreground-muted mt-1">
            Additional systems, web utilities, and experimental architectures
          </p>
        </div>

        {/* Sliding Pill Tabs */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-background-surface border border-border shadow-xs">
          {filterCategories.map((category) => {
            const isActive = activeFilter === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={cn(
                  'relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isActive
                    ? 'text-foreground font-semibold'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-explore-tab"
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

      {/* Grid of Compact Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <ExploreCard project={project} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Final Card: Link to all 34 repositories on GitHub */}
        <motion.div
          layout
          className="col-span-1 md:col-span-2 lg:col-span-1 h-full"
        >
          <a
            href="https://github.com/sakshishewale01?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
          >
            <Card className="h-full p-6 flex flex-col justify-between border-dashed border-border/80 hover:border-accent/60 bg-background/50 hover:bg-background-surface/80 transition-all duration-300">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                  View all {repoCount} repositories
                </h4>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Explore open source contributions, system utilities, experimental algorithms, and coursework on GitHub.
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-mono text-accent font-medium group-hover:translate-x-1 transition-transform">
                <span>Browse repositories</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
