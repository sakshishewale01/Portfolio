import React from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import {
  Trophy,
  Award,
  Medal,
  CheckCircle2,
  Calendar,
  Building2,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '../lib/utils'

const badgeColors = {
  '2nd Runner Up': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'Finalist': 'bg-accent/15 text-accent border-accent/30',
  'Internship': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
}

const iconForAchievement = (badge) => {
  switch (badge) {
    case '2nd Runner Up':
      return Trophy
    case 'Finalist':
      return Award
    default:
      return Medal
  }
}

/**
 * Achievements & Recognitions Section (`id="achievements"`)
 * Displays only authentic, verifiable milestones:
 * - Trust AI Ideathon 2026: 2nd Runner Up & Top 20 Finalist
 * - Datathon 2026: National Finalist
 * - Smart India Hackathon 2025: National Finalist
 * - Cisco AI/ML Virtual Internship: Completed
 */
export function Achievements() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)
  const achievements = profile.achievements || []

  return (
    <Section
      id="achievements"
      label="05 // HONORS & RECOGNITION"
      title="Verified Milestones & Hackathons"
      description="Competitive hackathons, algorithmic ideathons, and technical certifications earned through collaborative engineering."
      className="relative overflow-hidden"
    >
      {/* Subtle Low-Contrast Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f2312_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2312_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item, index) => {
          const Icon = iconForAchievement(item.badge)
          const badgeClass = badgeColors[item.badge] || 'bg-background-elevated text-foreground-muted border-border'
          const isTopAward = item.badge === '2nd Runner Up'

          return (
            <motion.div
              key={item.id || index}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{
                duration: reducedMotion ? 0.01 : 0.45,
                delay: reducedMotion ? 0 : index * 0.1,
              }}
              whileHover={reducedMotion ? {} : { y: -4 }}
              className="h-full"
            >
              <div
                className={cn(
                  'relative h-full rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-card group overflow-hidden',
                  isTopAward
                    ? 'bg-gradient-to-br from-amber-500/5 via-background-surface to-background-surface border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                    : 'bg-background-surface/80 hover:bg-background-surface border-border/80 hover:border-accent/50 hover:shadow-glow'
                )}
              >
                {/* Ambient Top Glow for Top Award */}
                {isTopAward && (
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"
                  />
                )}

                <div>
                  {/* Top Header Row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-300',
                          isTopAward
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                            : 'bg-accent/15 border-accent/30 text-accent'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-foreground-muted flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-accent" />
                            {item.year}
                          </span>
                          <span className="text-border">&bull;</span>
                          <span className="font-mono text-[11px] text-foreground-muted flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-foreground-muted" />
                            {item.organization}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-lg text-foreground mt-0.5 group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border shrink-0',
                        badgeClass
                      )}
                    >
                      {item.award}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>

                {/* Footer: Tags and Verified Status */}
                <div className="pt-5 mt-5 border-t border-border/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-background border border-border/70 text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Milestone</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Verification Note Banner */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mt-8 p-4 rounded-xl border border-border/70 bg-background-surface/50 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-foreground-muted"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent shrink-0" />
          <span>All hackathon milestones, final rounds, and certifications represent verifiable student engineering records.</span>
        </div>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline shrink-0"
        >
          <span>LinkedIn Verification</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </Section>
  )
}
