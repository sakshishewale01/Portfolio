import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { skillsBento } from '../data/skills'
import { Section } from '../components/ui/Section'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import {
  Code2,
  Layout,
  Server,
  Cpu,
  Terminal,
  Sparkles,
  Layers,
  ArrowRight,
  GitBranch,
  Network,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '../lib/utils'

const iconMap = {
  Code2: Code2,
  Layout: Layout,
  Server: Server,
  Cpu: Cpu,
}

// Honest status styling badge helper
function StatusBadge({ status }) {
  switch (status) {
    case 'Practising':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Practising</span>
        </span>
      )
    case 'Used in projects':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-accent/15 text-accent border border-accent/30">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Used in projects</span>
        </span>
      )
    case 'Currently learning':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Currently learning</span>
        </span>
      )
    case 'Familiar with':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-blue-500/10 text-blue-300 border border-blue-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span>Familiar with</span>
        </span>
      )
  }
}

/**
 * Interactive Developer Terminal ("CURRENT FOCUS")
 * Types out realistic focus lines once on enter view, with static fallback.
 */
function FocusTerminal({ reducedMotion }) {
  const terminalRef = useRef(null)
  const isInView = useInView(terminalRef, { once: true, margin: '-50px' })

  const focusData = skillsBento?.currentFocus || {}
  const title = focusData.title || 'CURRENT FOCUS'
  const command = focusData.command || 'sakshi --focus'
  const focusFields = Array.isArray(focusData.fields) && focusData.fields.length > 0
    ? focusData.fields
    : [
        { key: 'current_focus', value: 'C++ and DSA' },
        { key: 'practice', value: 'Striver A2Z' },
        { key: 'building', value: 'Full-stack and applied AI projects' },
        { key: 'goal', value: 'Software engineering internships in 2027' },
      ]

  const [visibleCount, setVisibleCount] = useState(reducedMotion ? focusFields.length : 0)

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(focusFields.length)
      return
    }

    if (!isInView) return

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < focusFields.length) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 280)

    return () => clearInterval(interval)
  }, [isInView, reducedMotion, focusFields.length])

  const isTypingDone = visibleCount >= focusFields.length

  return (
    <div
      ref={terminalRef}
      className="rounded-2xl border border-border/80 bg-background-surface/90 shadow-card p-5 overflow-hidden transition-all duration-300 hover:border-accent/40"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-xs text-foreground-muted ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span>{title}</span>
          </span>
        </div>

        <span className="font-mono text-[10px] text-accent/80 px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
          zsh
        </span>
      </div>

      {/* Terminal Body */}
      <div className="font-mono text-xs space-y-2 select-text">
        <div className="text-foreground-muted flex items-center gap-1.5">
          <span className="text-accent">$</span>
          <span className="text-foreground">{command}</span>
        </div>

        <div className="space-y-1.5 pt-1">
          {focusFields.slice(0, visibleCount).map((field, idx) => {
            if (!field) return null
            const fieldKey = field.key || `field-${idx}`
            const fieldValue = field.value || ''

            return (
              <motion.div
                key={fieldKey}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
              >
                <span className="text-foreground-muted text-[11px] min-w-[110px]">
                  {fieldKey}:
                </span>
                <span className="text-foreground font-medium text-xs">
                  {fieldValue}
                </span>
              </motion.div>
            )
          })}

          {!isTypingDone && (
            <span className="inline-block w-2 h-3.5 bg-accent animate-pulse align-middle ml-1" />
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Interactive Tech Constellation Matrix
 * Visualizes interconnected tools (e.g. React ↔ JavaScript, FastAPI ↔ Python)
 */
function TechConstellation({ constellation, reducedMotion }) {
  const [activeLink, setActiveLink] = useState(null)

  return (
    <div className="rounded-2xl border border-border/80 bg-background-surface/80 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-accent" />
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            Interconnected Stack
          </h4>
        </div>
        <span className="font-mono text-[10px] text-foreground-muted">
          Click or hover links
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {constellation.map((link) => {
          const isActive = activeLink === link.id

          return (
            <motion.div
              key={link.id}
              onClick={() => setActiveLink(isActive ? null : link.id)}
              onMouseEnter={() => setActiveLink(link.id)}
              onMouseLeave={() => setActiveLink(null)}
              whileHover={reducedMotion ? {} : { y: -2 }}
              className={cn(
                'cursor-pointer rounded-xl border p-3 transition-all duration-200 select-none',
                isActive
                  ? 'bg-accent/10 border-accent/60 shadow-glow'
                  : 'bg-background hover:bg-background-elevated border-border/70 text-foreground-muted'
              )}
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className={cn('font-semibold', isActive ? 'text-accent' : 'text-foreground')}>
                  {link.source}
                </span>
                <span className="text-accent/60 px-1">&harr;</span>
                <span className={cn('font-semibold', isActive ? 'text-accent' : 'text-foreground')}>
                  {link.target}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-foreground-muted truncate">
                {link.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Upgraded Interactive Developer Skills Dashboard (`id="skills"`)
 */
export function Skills() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)
  const [selectedIdx, setSelectedIdx] = useState(0)

  const { categories, constellation } = skillsBento
  const activeCategory = categories[selectedIdx] || categories[0]
  const ActiveCategoryIcon = iconMap[activeCategory.iconName] || Code2

  return (
    <Section
      id="skills"
      label="03 // SKILLS"
      title="Tools I use. Skills I'm growing."
      description="A hands-on journey through software development and applied AI."
      className="relative overflow-hidden"
    >
      {/* Subtle Low-Contrast Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f2312_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2312_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      {/* ============================================================== */}
      {/* 1. FOUR INTERACTIVE CATEGORY CARDS                             */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        {categories.map((cat, idx) => {
          const isSelected = selectedIdx === idx
          const Icon = iconMap[cat.iconName] || Code2
          const skillCount = cat.skills.length

          return (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              whileHover={reducedMotion ? {} : { y: -3 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'group relative rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                isSelected
                  ? 'bg-background-surface border-accent/60 shadow-card'
                  : 'bg-background-surface/60 hover:bg-background-surface border-border/80 hover:border-accent/40'
              )}
            >
              {/* Highlight Glow for active card */}
              {isSelected && (
                <motion.div
                  layoutId="active-skill-category-indicator"
                  className="absolute inset-0 rounded-xl bg-accent/5 border border-accent/40 -z-10 shadow-glow"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div className="flex items-center justify-between mb-3">
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : 'bg-background text-foreground-muted group-hover:text-accent border border-border'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-background border border-border text-foreground-muted">
                  {skillCount} skills
                </span>
              </div>

              <h3
                className={cn(
                  'font-heading font-semibold text-sm transition-colors',
                  isSelected ? 'text-foreground' : 'text-foreground-muted group-hover:text-foreground'
                )}
              >
                {cat.title}
              </h3>

              <p className="text-[11px] text-foreground-muted line-clamp-2 mt-1 leading-relaxed">
                {cat.description}
              </p>
            </motion.button>
          )
        })}
      </div>

      {/* ============================================================== */}
      {/* 2. DETAIL PANEL & DEVELOPER TERMINAL / CONSTELLATION           */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Category Skill Details */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.25, ease: 'easeOut' }}
              className="rounded-2xl border border-border/80 bg-background-surface/90 backdrop-blur-md p-6 sm:p-7 shadow-card space-y-6"
            >
              {/* Detail Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                    <ActiveCategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-foreground">
                      {activeCategory.title}
                    </h4>
                    <p className="text-xs text-foreground-muted">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs text-accent self-start sm:self-center font-semibold">
                  {activeCategory.skills.length} verified technologies
                </span>
              </div>

              {/* Staggered Skill Items */}
              <div className="space-y-2.5">
                {activeCategory.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reducedMotion ? 0.01 : 0.2,
                      delay: reducedMotion ? 0 : index * 0.04,
                    }}
                    whileHover={reducedMotion ? {} : { x: 3 }}
                    className="p-3.5 rounded-xl bg-background border border-border/70 hover:border-accent/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-sm text-foreground group-hover:text-accent transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted leading-relaxed">
                        {skill.note}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <StatusBadge status={skill.status} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Current Focus Terminal & Tech Constellations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Current Focus Terminal */}
          <FocusTerminal reducedMotion={reducedMotion} />

          {/* Interactive Constellation Matrix */}
          <TechConstellation constellation={constellation} reducedMotion={reducedMotion} />
        </div>
      </div>
    </Section>
  )
}
