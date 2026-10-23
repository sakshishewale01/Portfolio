import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { Card } from '../../ui/Card'
import { CheckCircle2, ArrowRight } from 'lucide-react'

/**
 * Animated 5-step workflow stepper for ConferenceFlow.
 * Author Submission -> Reviewer Assignment -> Peer Review -> Editorial Decision -> Author Notification
 */
export function WorkflowStepper({ accent = '#8B5CF6' }) {
  const reducedMotion = useReducedMotion()

  const steps = [
    {
      title: 'Author Submission',
      desc: 'PDF paper submission with metadata indexing & encrypted storage',
      tag: 'Step 01',
    },
    {
      title: 'Reviewer Assignment',
      desc: 'Admin allocates domain reviewers balancing load & conflict of interest',
      tag: 'Step 02',
    },
    {
      title: 'Peer Review',
      desc: 'Double-blind evaluation with structured scorecards and comments',
      tag: 'Step 03',
    },
    {
      title: 'Editorial Decision',
      desc: 'Executive chair weighs reviewer recommendations to publish final decision',
      tag: 'Step 04',
    },
    {
      title: 'Author Notification',
      desc: 'Automated milestone broadcast with evaluation synthesis to the author',
      tag: 'Step 05',
    },
  ]

  return (
    <Card className="p-6 md:p-8 space-y-6 border-border/80 bg-background-surface/80">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            Workflow Architecture
          </span>
          <h3 className="font-heading font-bold text-xl text-foreground mt-1">
            End-to-End Conference Review Lifecycle
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 font-mono text-xs text-accent">
          5-Stage Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.4,
              delay: reducedMotion ? 0 : idx * 0.1,
            }}
            className="rounded-xl border border-border/70 bg-background p-4 flex flex-col justify-between relative group hover:border-accent/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-accent font-semibold px-2 py-0.5 rounded bg-accent/10">
                  {step.tag}
                </span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-foreground-muted hidden md:block" />
                )}
              </div>
              <h4 className="font-heading font-semibold text-sm text-foreground mb-1.5">
                {step.title}
              </h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-border/40 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>Automated</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
