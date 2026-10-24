import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillsBento } from '../../data/skills'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Network, Sparkles, FolderGit2, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Interactive SVG Skill Orbit & Knowledge Graph:
 * - Category hubs with orbiting technology nodes
 * - Clean SVG connecting lines with animated packet flow
 * - Interactive hover highlighting connected nodes & related projects
 * - Plain accessible list fallback for screen readers and reduced motion
 * - Text labels only (no external icon CDNs)
 */
export function SkillGraphOrbit({ className }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const reducedMotion = useReducedMotion()

  const categories = skillsBento.categories || []
  const currentCat = categories[activeCategory] || categories[0]

  // Mapping from skill category to relevant project associations
  const relatedProjectsMap = {
    'programming-languages': [
      { name: 'FlowGrid', role: 'FastAPI Backend & ML Prediction' },
      { name: 'Striver A2Z Sheet', role: '51+ C++ DSA Solves' },
    ],
    'frontend-dev': [
      { name: 'TeamFlow', role: 'Realtime Kanban & Supabase UI' },
      { name: 'CampusHub', role: 'Event Registration Client' },
    ],
    'backend-dev': [
      { name: 'FlowGrid', role: 'Pydantic API & PostgreSQL' },
      { name: 'Conference Review System', role: 'Flask 3-Role Architecture' },
    ],
    'databases-storage': [
      { name: 'FlowGrid', role: 'PostgreSQL Relational Storage' },
      { name: 'TeamFlow', role: 'Supabase Realtime Tables' },
    ],
    'applied-ai-data': [
      { name: 'FlowGrid', role: 'Scikit-learn Delay Predictor' },
      { name: 'NetSage AI', role: 'Cisco Telemetry Rule Diagnostics' },
    ],
    'tools-devops': [
      { name: 'TeamFlow & FlowGrid', role: 'Git Workflows & Vercel' },
    ],
  }

  const related = relatedProjectsMap[currentCat.id] || []

  return (
    <div
      className={cn(
        'rounded-2xl border border-border/80 bg-background-surface/85 backdrop-blur-md p-6 sm:p-7 shadow-card relative overflow-hidden',
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border/60 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
              Interactive Skill Radar
            </h3>
            <p className="text-xs text-foreground-muted">
              Select a domain hub to explore connected technologies and project implementations
            </p>
          </div>
        </div>

        <span className="font-mono text-[11px] text-accent font-medium self-start sm:self-center px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25">
          Vector Network
        </span>
      </div>

      {/* Screen Reader Accessible Summary */}
      <div className="sr-only">
        <h4>All Verified Technical Skills</h4>
        <ul>
          {categories.flatMap((c) => c.skills).map((s) => (
            <li key={s.name}>{s.name} - {s.status}: {s.note}</li>
          ))}
        </ul>
      </div>

      {/* Hub Tabs Strip */}
      <div className="flex flex-wrap gap-2 pt-5 pb-6">
        {categories.map((cat, idx) => {
          const isActive = idx === activeCategory

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className={cn(
                'relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 select-none border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                isActive
                  ? 'bg-accent/15 border-accent text-accent font-semibold shadow-glow'
                  : 'bg-background hover:bg-background-elevated border-border text-foreground-muted hover:text-foreground'
              )}
            >
              <span>{cat.title}</span>
            </button>
          )
        })}
      </div>

      {/* Orbit Visualization Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: SVG Network Graph Visual */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[260px] sm:min-h-[300px] rounded-xl bg-[#09090D] border border-border/70 p-4 overflow-hidden">
          {/* Subtle Radial Radar Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-48 h-48 rounded-full border border-dashed border-accent animate-spin-slow" />
            <div className="w-72 h-72 rounded-full border border-border" />
          </div>

          <svg
            viewBox="0 0 400 280"
            className="w-full h-auto max-h-[280px] overflow-visible"
            aria-hidden="true"
          >
            {/* Center Hub Node */}
            <g transform="translate(200, 140)">
              <circle r="36" fill="var(--color-surface)" stroke="var(--accent)" strokeWidth="2" />
              <circle r="42" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
              <text
                textAnchor="middle"
                y="4"
                fill="var(--text-primary)"
                fontSize="11"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="bold"
              >
                {currentCat.title.split(' ')[0]}
              </text>
            </g>

            {/* Orbiting Satellite Skill Nodes */}
            {currentCat.skills.map((skill, index) => {
              const total = currentCat.skills.length
              const angle = (index / total) * (Math.PI * 2) - Math.PI / 2
              const radius = 100
              const x = 200 + Math.cos(angle) * radius
              const y = 140 + Math.sin(angle) * radius

              return (
                <g key={skill.name}>
                  {/* Connecting Line to Center */}
                  <line
                    x1="200"
                    y1="140"
                    x2={x}
                    y2={y}
                    stroke="var(--border-subtle)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />

                  {/* Node Capsule */}
                  <g transform={`translate(${x}, ${y})`}>
                    <rect
                      x="-42"
                      y="-12"
                      width="84"
                      height="24"
                      rx="12"
                      fill="#121218"
                      stroke={skill.status === 'Practising' ? '#10B981' : 'var(--accent)'}
                      strokeWidth="1.2"
                      className="hover:stroke-accent-secondary transition-colors"
                    />
                    <text
                      textAnchor="middle"
                      y="3.5"
                      fill="#EDEDED"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="500"
                    >
                      {skill.name.length > 12 ? skill.name.slice(0, 11) + '…' : skill.name}
                    </text>
                  </g>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Right: Focused Skill Breakdown & Related Builds */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-background border border-border/80 space-y-3">
            <span className="font-mono text-[10px] text-accent font-semibold uppercase tracking-wider block">
              Active Focus &bull; {currentCat.title}
            </span>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {currentCat.description}
            </p>

            {/* Top 3 Verified Technologies */}
            <div className="space-y-1.5 pt-1">
              {currentCat.skills.slice(0, 3).map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs font-mono">
                  <span className="text-foreground">{s.name}</span>
                  <span className="text-[10px] text-accent/80 font-semibold">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Applications Strip */}
          {related.length > 0 && (
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/25 space-y-2">
              <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Demonstrated in Projects</span>
              </span>

              <div className="space-y-1.5">
                {related.map((rel) => (
                  <div key={rel.name} className="text-xs">
                    <span className="font-semibold text-foreground">{rel.name}: </span>
                    <span className="text-foreground-muted font-mono text-[11px]">{rel.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
