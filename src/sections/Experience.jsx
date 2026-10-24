import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '../data/experience'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { CodingStats } from '../components/CodingStats'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { cn } from '../lib/utils'

const iconMap = {
  Briefcase: Briefcase,
  GraduationCap: GraduationCap,
}

export function Experience() {
  const timelineRef = useRef(null)
  const reducedMotion = useReducedMotion()

  // Track scroll progression specifically for the timeline bounds
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section
      id="experience"
      label="06 // JOURNEY & ACTIVITY"
      title="Engineering Journey & Active Practice"
      description="Academic studies at MIT Academy of Engineering, industry internship, and active algorithmic problem-solving."
    >
      {/* ================= VERTICAL TIMELINE ================= */}
      <div ref={timelineRef} className="relative mb-16 pt-4 pb-8">
        {/* Background Inactive Vertical Track */}
        <div
          className="absolute left-4 md:left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-border/60 pointer-events-none"
          aria-hidden="true"
        />

        {/* Scroll-Driven Animated Active Line (ScaleY GPU transform) */}
        {!reducedMotion ? (
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 md:left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent via-purple-400 to-indigo-500 shadow-glow pointer-events-none z-10"
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute left-4 md:left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-accent pointer-events-none z-10"
            aria-hidden="true"
          />
        )}

        {/* Semantic Ordered List */}
        <ol className="relative space-y-12 md:space-y-16 list-none p-0 m-0">
          {experience.map((item, index) => {
            const isEven = index % 2 === 0
            const IconComponent = iconMap[item.icon] || Briefcase

            return (
              <li key={item.id || index} className="relative">
                {/* Center Node Anchor Indicator */}
                <div
                  className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-background-surface border-2 border-accent shadow-glow text-accent"
                  aria-hidden="true"
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                {/* Alternating Row Container */}
                <div
                  className={cn(
                    "flex flex-col md:flex-row items-center w-full",
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  {/* Empty Spacer Column for Desktop Symmetry */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content Column */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: reducedMotion ? 0 : isEven ? 36 : -36,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={viewportConfig}
                    transition={{
                      duration: reducedMotion ? 0.01 : 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "w-full md:w-1/2 pl-12 md:pl-0",
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    )}
                  >
                    <Card
                      className="p-6 md:p-7 border-border/80 bg-background-surface/85 backdrop-blur-md shadow-card hover:border-accent/40"
                      enableGlow={true}
                    >
                      <div className="space-y-4 text-left">
                        {/* Milestone Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 pb-3">
                          <div>
                            <span className="font-heading font-bold text-lg sm:text-xl text-foreground">
                              {item.role}
                            </span>
                            <p className="font-heading font-semibold text-sm text-accent mt-0.5">
                              {item.company}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            <Badge variant={item.type === "Internship" ? "accent" : "outline"} size="sm">
                              {item.type}
                            </Badge>
                            <span className="font-mono text-[11px] text-foreground-muted flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-accent" /> {item.period}
                            </span>
                          </div>
                        </div>

                        {/* Location and Overview */}
                        <div className="flex items-center gap-1.5 text-xs font-mono text-foreground-muted">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span>{item.location}</span>
                        </div>

                        <p className="text-sm text-foreground-muted leading-relaxed">
                          {item.description}
                        </p>

                        {/* Key Achievements */}
                        <div className="space-y-2.5 pt-1">
                          <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block">
                            Key Outcomes &amp; Impact
                          </span>
                          <ul className="space-y-2 list-none p-0 m-0">
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-foreground-muted leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Badges */}
                        <div className="pt-3 border-t border-border/80 flex flex-wrap gap-1.5">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-background-elevated text-foreground-muted border border-border"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Experience Links (e.g. Live Demo | GitHub Repo) */}
                        {item.links && item.links.length > 0 && (
                          <div className="pt-3 border-t border-border/80 flex flex-wrap items-center gap-2">
                            {item.links.map((link, idx) => {
                              const isTodo = !link.url || link.url === 'TODO'
                              if (isTodo) {
                                return (
                                  <span
                                    key={idx}
                                    className="text-[10px] font-mono text-foreground-muted/60 bg-background px-2 py-1 rounded-md border border-border/60"
                                  >
                                    {link.label} (Coming soon)
                                  </span>
                                )
                              }
                              return (
                                <a
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline bg-accent/10 border border-accent/25 hover:border-accent/50 px-2.5 py-1 rounded-md transition-colors"
                                >
                                  <span>{link.label}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </a>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* ================= CODING STATS TELEMETRY ================= */}
      <CodingStats />
    </Section>
  )
}
