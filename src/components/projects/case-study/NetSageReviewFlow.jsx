import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../ui/Card'
import { Check, Edit3, X, ShieldAlert, Cpu, Database, CheckCircle2 } from 'lucide-react'
import { cn } from '../../../lib/utils'

/**
 * Interactive Diagnostic Pipeline & Human-in-the-Loop review for NetSage AI.
 * Displays symptom -> rule checker -> AI reasoning -> review step.
 */
export function NetSageReviewFlow({ accent = '#6366F1' }) {
  const [reviewState, setReviewState] = useState('accepted')

  return (
    <Card className="p-6 md:p-8 space-y-6 border-border/80 bg-background-surface/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            Responsible AI Pipeline
          </span>
          <h3 className="font-heading font-bold text-xl text-foreground mt-1">
            Hybrid Diagnostic Pipeline & Human Verification Gate
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 font-mono text-xs text-indigo-400">
          Human-in-the-Loop
        </span>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stage 1 */}
        <div className="p-4 rounded-xl border border-border/70 bg-background space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground-muted">PHASE 01</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <h4 className="font-heading font-semibold text-sm text-foreground">Symptom Ingestion</h4>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Network topology, syslog telemetry, and interface packet captures ingested.
          </p>
        </div>

        {/* Stage 2 */}
        <div className="p-4 rounded-xl border border-border/70 bg-background space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground-muted">PHASE 02</span>
            <Database className="w-4 h-4 text-sky-400" />
          </div>
          <h4 className="font-heading font-semibold text-sm text-foreground">Deterministic Rule Check</h4>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Fast checks for duplicate IPs, subnet mismatches, gateway errors, and downed links.
          </p>
        </div>

        {/* Stage 3 */}
        <div className="p-4 rounded-xl border border-border/70 bg-background space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground-muted">PHASE 03</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <h4 className="font-heading font-semibold text-sm text-foreground">LLM Root-Cause Reasoning</h4>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Generates structured JSON with root cause, OSI layer, confidence score, and remediation.
          </p>
        </div>

        {/* Stage 4 */}
        <div className="p-4 rounded-xl border border-indigo-500/40 bg-indigo-950/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-indigo-400 font-semibold">PHASE 04</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          </div>
          <h4 className="font-heading font-semibold text-sm text-foreground">Human-in-the-Loop Review</h4>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Network engineers verify diagnostic verdict before executing reconfiguration.
          </p>
        </div>
      </div>

      {/* Interactive Review Gate Demonstration */}
      <div className="p-4 rounded-xl border border-border/60 bg-background space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-foreground-muted">Sample Telemetry Verdict: </span>
            <span className="text-xs font-mono font-semibold text-foreground">
              VLAN 20 Missing Trunk encapsulation on GigabitEthernet0/1 (OSI Layer 2)
            </span>
          </div>

          {/* Interactive Review Action Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setReviewState('accepted')}
              className={cn(
                'inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                reviewState === 'accepted'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-background-surface text-foreground-muted hover:text-foreground'
              )}
            >
              <Check className="w-3 h-3" />
              <span>Accept</span>
            </button>

            <button
              type="button"
              onClick={() => setReviewState('edited')}
              className={cn(
                'inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
                reviewState === 'edited'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-background-surface text-foreground-muted hover:text-foreground'
              )}
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => setReviewState('rejected')}
              className={cn(
                'inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400',
                reviewState === 'rejected'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-background-surface text-foreground-muted hover:text-foreground'
              )}
            >
              <X className="w-3 h-3" />
              <span>Reject</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] font-mono text-foreground-muted pt-1 border-t border-border/40">
          Responsible-AI Audit: Action status is logged to permanent feedback storage for continuous rule tuning.
        </p>
      </div>
    </Card>
  )
}
