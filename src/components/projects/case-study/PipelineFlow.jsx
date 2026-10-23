import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { Card } from '../../ui/Card'
import { Database, Server, Layers, Globe, Cpu, ArrowRight } from 'lucide-react'

/**
 * Animated request pipeline for FlowGrid.
 * Frontend -> API routes -> Service -> Repository -> ORM -> PostgreSQL
 */
export function PipelineFlow({ accent = '#10B981' }) {
  const reducedMotion = useReducedMotion()

  const stages = [
    { name: 'Frontend', role: 'React SPA & TanStack', icon: Globe },
    { name: 'API Routes', role: 'FastAPI Routers & Schemas', icon: Server },
    { name: 'Service Layer', role: 'Logistics Business Rules', icon: Cpu },
    { name: 'Repository', role: 'Data Access & Transactions', icon: Layers },
    { name: 'SQLAlchemy ORM', role: 'Session & Models', icon: Layers },
    { name: 'PostgreSQL', role: 'ACID Storage & Indexes', icon: Database },
  ]

  return (
    <Card className="p-6 md:p-8 space-y-6 border-border/80 bg-background-surface/80">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            Backend Architecture
          </span>
          <h3 className="font-heading font-bold text-xl text-foreground mt-1">
            Layered Request Execution Pipeline
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs text-emerald-400">
          Strict Separation of Concerns
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {stages.map((stage, idx) => {
          const Icon = stage.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reducedMotion ? 0.01 : 0.35,
                delay: reducedMotion ? 0 : idx * 0.08,
              }}
              className="rounded-xl border border-border/70 bg-background p-3.5 flex flex-col justify-between hover:border-emerald-500/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-foreground-muted">0{idx + 1}</span>
                </div>
                <h4 className="font-heading font-semibold text-xs text-foreground mb-1">
                  {stage.name}
                </h4>
                <p className="text-[11px] text-foreground-muted leading-tight font-mono">
                  {stage.role}
                </p>
              </div>

              {idx < stages.length - 1 && (
                <div className="pt-3 flex justify-end">
                  <ArrowRight className="w-3 h-3 text-emerald-500/50" />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
