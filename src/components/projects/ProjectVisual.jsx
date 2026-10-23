import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

/**
 * Animated SVG/CSS scene component per project slug.
 * Wrapped inside a realistic browser-window mockup with URL bar.
 * Respects prefers-reduced-motion and avoids heavy canvas/images.
 */
export function ProjectVisual({ slug, accent = '#06B6D4', liveUrl, className }) {
  const reducedMotion = useReducedMotion()

  // Format display domain for the fake browser bar
  let displayDomain = 'https://project.local/' + slug
  if (liveUrl && liveUrl !== 'TODO') {
    try {
      const url = new URL(liveUrl)
      displayDomain = url.hostname + url.pathname
    } catch {
      displayDomain = liveUrl
    }
  }

  return (
    <div
      className={cn(
        'w-full h-full min-h-[260px] sm:min-h-[300px] flex flex-col rounded-xl overflow-hidden border border-border/70 bg-background-surface shadow-subtle group-hover:border-accent/40 transition-colors duration-300 select-none',
        className
      )}
    >
      {/* Browser Window Header Chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-background-elevated/70 border-b border-border/60">
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 border border-rose-500/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 border border-amber-500/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 border border-emerald-500/30" />
        </div>

        {/* Fake URL Bar */}
        <div className="flex-1 max-w-xs mx-auto flex items-center justify-center px-3 py-1 rounded-md bg-background/60 border border-border/40 text-[11px] font-mono text-foreground-muted truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mr-2 shrink-0 animate-pulse" />
          <span className="truncate">{displayDomain}</span>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative flex-1 w-full p-4 overflow-hidden flex items-center justify-center bg-radial-gradient">
        {renderScene(slug, accent, reducedMotion)}
      </div>
    </div>
  )
}

function renderScene(slug, accent, reducedMotion) {
  switch (slug) {
    case 'teamflow':
      return <TeamFlowVisual accent={accent} reducedMotion={reducedMotion} />
    case 'conference-flow':
      return <ConferenceFlowVisual accent={accent} reducedMotion={reducedMotion} />
    case 'flowgrid':
      return <FlowGridVisual accent={accent} reducedMotion={reducedMotion} />
    case 'cineflix':
      return <CineFlixVisual accent={accent} reducedMotion={reducedMotion} />
    case 'netsage-ai':
      return <NetSageAIVisual accent={accent} reducedMotion={reducedMotion} />
    default:
      return <ExploreFallbackVisual slug={slug} accent={accent} />
  }
}

/**
 * 01: TeamFlow Visual - 3 Kanban columns with floating cards & pulsing live status
 */
function TeamFlowVisual({ accent, reducedMotion }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-2 relative">
      {/* Top Header bar inside kanban */}
      <div className="flex items-center justify-between pb-3 border-b border-border/40 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {!reducedMotion && (
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: accent }}
              />
            )}
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: accent }}
            />
          </span>
          <span className="text-foreground-muted text-[11px] font-medium">Sprint Active • Supabase Realtime</span>
        </div>
        <span className="text-[10px] text-foreground-muted/80">3 Workspaces</span>
      </div>

      {/* 3 Kanban Columns */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 flex-1 pt-3">
        {/* Column 1: To Do */}
        <div className="rounded-lg bg-background/50 border border-border/40 p-2 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-foreground-muted px-1">
            <span>TO DO</span>
            <span className="px-1.5 py-0.5 rounded bg-background-elevated text-[9px]">3</span>
          </div>

          <div className="rounded-md bg-background-surface border border-border/60 p-2 shadow-xs space-y-1.5">
            <div className="h-2 w-3/4 rounded bg-border/80" />
            <div className="h-1.5 w-1/2 rounded bg-border/40" />
            <div className="flex justify-between items-center pt-1">
              <span className="w-3 h-3 rounded-full bg-accent/20 text-[8px] flex items-center justify-center text-accent">P1</span>
              <span className="text-[8px] text-foreground-muted font-mono">Oct 26</span>
            </div>
          </div>

          <div className="rounded-md bg-background-surface border border-border/60 p-2 shadow-xs space-y-1.5">
            <div className="h-2 w-4/5 rounded bg-border/80" />
            <div className="h-1.5 w-2/5 rounded bg-border/40" />
          </div>
        </div>

        {/* Column 2: In Progress (Features drifting active card) */}
        <div className="rounded-lg bg-background/50 border border-border/40 p-2 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-foreground-muted px-1">
            <span className="text-accent font-semibold">IN PROGRESS</span>
            <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[9px]">2</span>
          </div>

          {/* Animated Moving Card */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    y: [0, -4, 0],
                    boxShadow: [
                      '0 1px 2px rgba(0,0,0,0.2)',
                      `0 8px 16px -4px ${accent}33`,
                      '0 1px 2px rgba(0,0,0,0.2)',
                    ],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="rounded-md bg-background-surface border p-2 space-y-1.5"
            style={{ borderColor: `${accent}60` }}
          >
            <div className="flex items-center justify-between">
              <div
                className="h-2 w-3/5 rounded"
                style={{ backgroundColor: `${accent}90` }}
              />
              <span
                className="text-[8px] px-1 py-0.2 rounded font-mono"
                style={{ backgroundColor: `${accent}20`, color: accent }}
              >
                Syncing
              </span>
            </div>
            <div className="h-1.5 w-4/5 rounded bg-border/60" />
            <div className="flex items-center gap-1.5 pt-1">
              <div className="w-3 h-3 rounded-full bg-accent/30" />
              <div className="h-1 w-8 rounded bg-border/50" />
            </div>
          </motion.div>

          <div className="rounded-md bg-background-surface border border-border/60 p-2 shadow-xs space-y-1.5">
            <div className="h-2 w-2/3 rounded bg-border/80" />
            <div className="h-1.5 w-1/3 rounded bg-border/40" />
          </div>
        </div>

        {/* Column 3: Done */}
        <div className="rounded-lg bg-background/50 border border-border/40 p-2 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-foreground-muted px-1">
            <span>DONE</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px]">5</span>
          </div>

          <div className="rounded-md bg-background-surface border border-border/60 p-2 shadow-xs space-y-1.5 opacity-75">
            <div className="h-2 w-full rounded bg-emerald-500/40" />
            <div className="h-1.5 w-1/2 rounded bg-border/40" />
          </div>

          <div className="rounded-md bg-background-surface border border-border/60 p-2 shadow-xs space-y-1.5 opacity-60">
            <div className="h-2 w-3/4 rounded bg-emerald-500/30" />
            <div className="h-1.5 w-2/3 rounded bg-border/40" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 02: ConferenceFlow Visual - 5 interconnected workflow nodes with traveling packet
 */
function ConferenceFlowVisual({ accent, reducedMotion }) {
  const steps = [
    { label: 'Submit', short: '01' },
    { label: 'Assign', short: '02' },
    { label: 'Review', short: '03' },
    { label: 'Decision', short: '04' },
    { label: 'Notify', short: '05' },
  ]

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-2 py-4 relative">
      <div className="text-[10px] font-mono text-foreground-muted tracking-wider uppercase mb-5">
        Peer Review Pipeline Telemetry
      </div>

      <div className="relative w-full max-w-md flex items-center justify-between">
        {/* Background Connecting Line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-border/70 -z-0" />

        {/* Animated Pulsing Packet traveling along the line */}
        {!reducedMotion && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-glow -z-0"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 12px ${accent}`,
            }}
            animate={{
              left: ['5%', '92%', '5%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* 5 Stepper Nodes */}
        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={
                reducedMotion
                  ? {}
                  : {
                      scale: [1, 1.08, 1],
                    }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: idx * 0.5,
                ease: 'easeInOut',
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-colors bg-background-surface"
              style={{
                borderColor: idx === 2 ? accent : 'var(--color-border)',
                color: idx === 2 ? accent : 'inherit',
                boxShadow: idx === 2 ? `0 0 10px ${accent}40` : 'none',
              }}
            >
              {step.short}
            </motion.div>
            <span className="text-[9px] font-mono text-foreground-muted mt-2 hidden sm:block">
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Structured Evaluation Sub-panel */}
      <div className="mt-7 w-full max-w-sm rounded-lg border border-border/60 bg-background/60 p-2.5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span className="text-foreground-muted">Role Checks & CSRF:</span>
        </div>
        <span className="text-violet-400 font-semibold">Active & Validated</span>
      </div>
    </div>
  )
}

/**
 * 03: FlowGrid Visual - Logistics node & route map with moving courier dots
 */
function FlowGridVisual({ accent, reducedMotion }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg
        viewBox="0 0 400 200"
        className="w-full h-auto max-h-[190px] overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flowgridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Route Lines */}
        <path
          d="M 50 100 Q 120 30, 200 80 T 350 120"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M 50 100 Q 120 170, 210 130 T 350 120"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M 200 80 L 210 130"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />

        {/* Moving Delivery Dot along Route 1 */}
        {!reducedMotion && (
          <motion.circle
            r="5"
            fill={accent}
            animate={{
              cx: [50, 120, 200, 280, 350, 280, 200, 120, 50],
              cy: [100, 48, 80, 100, 120, 100, 80, 48, 100],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
          />
        )}

        {/* Moving Delivery Dot along Route 2 */}
        {!reducedMotion && (
          <motion.circle
            r="4.5"
            fill="#38BDF8"
            animate={{
              cx: [350, 280, 210, 120, 50, 120, 210, 280, 350],
              cy: [120, 135, 130, 155, 100, 155, 130, 135, 120],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ filter: 'drop-shadow(0 0 5px #38BDF8)' }}
          />
        )}

        {/* Hub 1: Central Origin Warehouse */}
        <g transform="translate(50, 100)">
          <circle r="14" fill="var(--color-surface)" stroke={accent} strokeWidth="2" />
          <circle r="6" fill={accent} />
          <text y="24" textAnchor="middle" fill="var(--color-foreground-muted)" fontSize="9" fontFamily="monospace">
            HUB-ALPHA
          </text>
        </g>

        {/* Hub 2: Intermediate Sort Center */}
        <g transform="translate(200, 80)">
          <circle r="11" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
          <circle r="4" fill="var(--color-foreground-muted)" />
          <text y="-16" textAnchor="middle" fill="var(--color-foreground-muted)" fontSize="8" fontFamily="monospace">
            RELAY-NORTH
          </text>
        </g>

        {/* Hub 3: Intermediate Transit Depot */}
        <g transform="translate(210, 130)">
          <circle r="11" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
          <circle r="4" fill="var(--color-foreground-muted)" />
          <text y="24" textAnchor="middle" fill="var(--color-foreground-muted)" fontSize="8" fontFamily="monospace">
            RELAY-SOUTH
          </text>
        </g>

        {/* Hub 4: Destination Port */}
        <g transform="translate(350, 120)">
          <circle r="14" fill="var(--color-surface)" stroke={accent} strokeWidth="2" />
          <circle r="6" fill="#10B981" />
          <text y="24" textAnchor="middle" fill="var(--color-foreground-muted)" fontSize="9" fontFamily="monospace">
            PORT-OMEGA
          </text>
        </g>
      </svg>
    </div>
  )
}

/**
 * 04: CineFlix Visual - Hero banner block with staggered horizontal scrolling poster cards
 */
function CineFlixVisual({ accent, reducedMotion }) {
  const cards = [
    { title: 'Inception', year: '2010', tag: 'Sci-Fi' },
    { title: 'Interstellar', year: '2014', tag: 'Adventure' },
    { title: 'The Dark Knight', year: '2008', tag: 'Action' },
    { title: 'Oppenheimer', year: '2023', tag: 'History' },
    { title: 'Memento', year: '2000', tag: 'Mystery' },
  ]

  return (
    <div className="w-full h-full flex flex-col justify-between py-1 overflow-hidden">
      {/* Mini Hero Banner */}
      <div className="relative rounded-lg overflow-hidden border border-border/50 bg-gradient-to-r from-red-950/40 via-background-elevated to-background p-3 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold">Featured Premier</span>
          </div>
          <div className="h-3 w-32 rounded bg-foreground/20" />
        </div>
        <div className="px-2.5 py-1 rounded-md bg-red-600/90 text-white font-mono text-[10px] font-semibold shadow-xs">
          ▶ Trailer
        </div>
      </div>

      {/* Row Label */}
      <div className="flex items-center justify-between text-[10px] font-mono text-foreground-muted px-1 pt-2">
        <span>TRENDING DISCOVERIES</span>
        <span className="text-[9px]">TMDB Indexed</span>
      </div>

      {/* Staggered Horizontal Tiles */}
      <div className="relative flex items-center gap-2.5 overflow-hidden py-1">
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  x: [0, -180, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex gap-2.5 shrink-0"
        >
          {[...cards, ...cards].map((card, idx) => (
            <div
              key={idx}
              className="w-20 sm:w-24 h-28 rounded-md bg-background-elevated border border-border/60 p-2 flex flex-col justify-between shrink-0 shadow-xs group/card hover:border-red-500/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-background text-foreground-muted">
                  {card.tag}
                </span>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-border/80" />
                <div className="flex justify-between text-[7px] font-mono text-foreground-muted">
                  <span>{card.year}</span>
                  <span className="text-amber-400">★ 8.8</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/**
 * 05: NetSage AI Visual - Symptom -> Checker -> AI -> Human Review with blinking indicator
 */
function NetSageAIVisual({ accent, reducedMotion }) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-2 px-1 relative">
      <div className="flex items-center justify-between text-[10px] font-mono text-foreground-muted pb-2 border-b border-border/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
          <span>OSI Telemetry & Diagnostic Flow</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[9px] border border-accent/20">
          Human-in-the-Loop
        </span>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 my-auto py-2">
        <div className="rounded-lg bg-background/60 border border-border/50 p-2 flex flex-col items-center text-center gap-1.5">
          <span className="text-[9px] font-mono text-foreground-muted">01 / INPUT</span>
          <div className="w-6 h-6 rounded-full bg-border/40 flex items-center justify-center text-[10px] font-mono text-foreground">
            ⚡
          </div>
          <span className="text-[8px] font-mono text-foreground-muted">Symptom</span>
        </div>

        <div className="rounded-lg bg-background/60 border border-border/50 p-2 flex flex-col items-center text-center gap-1.5">
          <span className="text-[9px] font-mono text-foreground-muted">02 / RULE</span>
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-mono">
            ⚖
          </div>
          <span className="text-[8px] font-mono text-foreground-muted">Deterministic</span>
        </div>

        <div className="rounded-lg bg-background/60 border border-border/50 p-2 flex flex-col items-center text-center gap-1.5">
          <span className="text-[9px] font-mono text-foreground-muted">03 / AI</span>
          <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-mono">
            ✦
          </div>
          <span className="text-[8px] font-mono text-foreground-muted">LLM Reason</span>
        </div>

        <div className="rounded-lg bg-background/60 border border-accent/40 p-2 flex flex-col items-center text-center gap-1.5 shadow-xs">
          <span className="text-[9px] font-mono text-accent font-semibold">04 / AUDIT</span>
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono">
            ✓
          </div>
          <span className="text-[8px] font-mono text-foreground">Human Review</span>
        </div>
      </div>

      {/* Decision Status Bar: Accept / Edit / Reject */}
      <div className="rounded-lg bg-background-elevated/70 border border-border/60 p-2 flex items-center justify-between text-[10px] font-mono">
        <span className="text-foreground-muted text-[9px]">Decision Gate:</span>
        <div className="flex items-center gap-1.5">
          <motion.span
            animate={
              reducedMotion
                ? {}
                : {
                    opacity: [1, 0.4, 1],
                  }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-semibold"
          >
            ACCEPTED
          </motion.span>
          <span className="px-1.5 py-0.5 rounded bg-background text-foreground-muted text-[8px] opacity-60">EDIT</span>
          <span className="px-1.5 py-0.5 rounded bg-background text-foreground-muted text-[8px] opacity-60">REJECT</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Fallback Visual for Explore Tier projects
 */
function ExploreFallbackVisual({ slug, accent }) {
  const monogram = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-4">
      <div
        className="absolute inset-0 opacity-15 rounded-lg"
        style={{
          background: `radial-gradient(circle at center, ${accent} 0%, transparent 70%)`,
        }}
      />
      <div
        className="w-14 h-14 rounded-2xl border flex items-center justify-center font-heading font-bold text-xl relative z-10 shadow-subtle"
        style={{
          backgroundColor: `${accent}15`,
          borderColor: `${accent}40`,
          color: accent,
        }}
      >
        {monogram}
      </div>
      <span className="font-mono text-[10px] text-foreground-muted mt-3 uppercase tracking-wider relative z-10">
        Architecture Blueprint
      </span>
    </div>
  )
}
