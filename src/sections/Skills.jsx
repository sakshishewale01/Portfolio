import React from 'react'
import { motion } from 'framer-motion'
import { skillsBento } from '../data/skills'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import { 
  Cpu, 
  Server, 
  Layout, 
  Terminal, 
  Compass, 
  Boxes, 
  Zap, 
  Flame, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Icon mapper for category titles
 */
const categoryIcons = {
  Cpu: Cpu,
  Server: Server,
  Layout: Layout,
  Terminal: Terminal,
  Compass: Compass,
}

const principleIcons = {
  Boxes: Boxes,
  Zap: Zap,
  Flame: Flame,
}

/**
 * Animated Gradient Border Wrapper for "Currently Exploring" Card
 */
function GradientBorderCard({ children, className }) {
  return (
    <div className={cn("relative p-[1px] rounded-xl overflow-hidden group h-full", className)}>
      {/* Animated gradient ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-indigo-500 to-purple-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-subtle" />
      <div className="relative h-full w-full rounded-xl bg-background-surface">
        {children}
      </div>
    </div>
  )
}

/**
 * Skills Section Bento Grid Component
 */
export function Skills() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
      },
    },
  }

  const chipVariants = {
    hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  }

  const { categories, currentlyLearning, principles } = skillsBento

  return (
    <Section
      id="skills"
      label="03 // Capabilities & Philosophy"
      title="Technical Arsenal & Engineering Principles"
      description="Systems, algorithms, and applied AI categorized by practical comfort level. Zero arbitrary percentage bars."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
        {/* 1. Four Main Category Cards */}
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.iconName] || Layers

          return (
            <Card
              key={category.id}
              className={cn(
                "flex flex-col justify-between p-6 h-full",
                category.colSpan
              )}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-xs text-foreground-muted font-sans line-clamp-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Group 1: Strong Comfort Level */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                      Strong Proficiency
                    </span>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="flex flex-wrap gap-1.5"
                  >
                    {category.strong.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={chipVariants}
                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-accent/10 border border-accent/25 text-foreground hover:bg-accent/20 hover:border-accent/40 transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Group 2: Working Knowledge */}
                <div className="pt-3 border-t border-border/70">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />
                    <span className="font-mono text-[11px] font-medium text-foreground-muted uppercase tracking-wider">
                      Working Knowledge
                    </span>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="flex flex-wrap gap-1.5"
                  >
                    {category.workingKnowledge.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={chipVariants}
                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-background-elevated/80 border border-border text-foreground-muted hover:text-foreground hover:border-border-hover transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </Card>
          )
        })}

        {/* 2. "Currently Exploring" Card with Shifting Gradient Border */}
        <div className="col-span-1 md:col-span-2 h-full">
          <GradientBorderCard>
            <Card
              className="p-6 h-full flex flex-col justify-between bg-transparent border-0"
              enableGlow={true}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-lg text-foreground">
                          {currentlyLearning.title}
                        </h3>
                        <Badge variant="accent" dot size="sm">Active</Badge>
                      </div>
                      <p className="text-xs text-foreground-muted font-sans">
                        {currentlyLearning.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {currentlyLearning.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-background-elevated/70 border border-border flex items-center justify-between"
                    >
                      <span className="font-mono text-xs text-foreground">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/25">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="pt-4 mt-2 border-t border-border/70 text-xs font-mono text-foreground-muted leading-relaxed">
                &gt; {currentlyLearning.note}
              </p>
            </Card>
          </GradientBorderCard>
        </div>

        {/* 3. "What I Care About" Principles Card */}
        <div className="col-span-1 md:col-span-2 h-full">
          <Card className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    What I Care About
                  </h3>
                  <p className="text-xs text-foreground-muted font-sans">
                    Core engineering values that guide my design decisions
                  </p>
                </div>
              </div>

              {/* Principles List */}
              <div className="space-y-3 pt-1">
                {principles.map((principle, idx) => {
                  const PrincipleIcon = principleIcons[principle.icon] || Check

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-background-elevated/50 border border-border/80 flex items-start gap-3 hover:border-accent/30 transition-colors"
                    >
                      <div className="p-1 rounded bg-accent/10 text-accent shrink-0 mt-0.5">
                        <PrincipleIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-xs text-foreground">
                          {principle.title}
                        </h4>
                        <p className="text-[11px] text-foreground-muted leading-relaxed mt-0.5">
                          {principle.summary}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  )
}
