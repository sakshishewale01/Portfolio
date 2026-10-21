import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { experience } from '../data/experience'
import { skillCategories } from '../data/skills'
import { 
  Sparkles, 
  ArrowRight, 
  Code, 
  Layers, 
  Cpu, 
  ExternalLink, 
  CheckCircle, 
  MousePointer,
  Briefcase,
  Terminal,
  Palette
} from 'lucide-react'
import { createFadeUp } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Home() {
  const reduced = useReducedMotion()
  const fadeUpVariant = createFadeUp(reduced)

  return (
    <div className="pt-24 pb-20 space-y-8">
      {/* Design System Header / Intro */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-8 pb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/15 blur-[120px] pointer-events-none rounded-full" />
        
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="relative text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="flex justify-center">
            <Badge variant="accent" dot size="md">
              Step 1 Complete &bull; Foundation & Design System
            </Badge>
          </div>

          <h1 className="font-heading font-bold text-fluid-h1 tracking-tight text-foreground">
            {profile.name}&apos;s Portfolio <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-300 to-indigo-400">
              Design System Preview
            </span>
          </h1>

          <p className="text-fluid-body text-foreground-muted leading-relaxed">
            Dark-first architecture built with React 18, Tailwind CSS v3, Framer Motion, Lenis, and Lucide React. Review the design tokens, fluid typography, motion primitives, and reactive data schemas below.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Button
              as="a"
              href="#ui-primitives"
              variant="primary"
              size="md"
              icon={MousePointer}
            >
              Test UI Primitives
            </Button>
            <Button
              as="a"
              href="#data-verification"
              variant="ghost"
              size="md"
              icon={Code}
            >
              Verify Data Schemas
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 1. Color Palette Tokens */}
      <Section
        id="color-tokens"
        label="Design Tokens"
        title="Curated Dark-First Palette"
        description="Obsidian dark tones engineered for high contrast and visual depth, anchored by Electric Violet (#7C5CFF) as the sole focal accent."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4" enableGlow={false}>
            <div className="h-14 rounded-md bg-background border border-border mb-3" />
            <p className="font-mono text-xs font-semibold text-foreground">Background</p>
            <p className="font-mono text-[11px] text-foreground-muted">#0A0A0B</p>
          </Card>

          <Card className="p-4" enableGlow={false}>
            <div className="h-14 rounded-md bg-background-surface border border-border mb-3" />
            <p className="font-mono text-xs font-semibold text-foreground">Surface</p>
            <p className="font-mono text-[11px] text-foreground-muted">#111113</p>
          </Card>

          <Card className="p-4" enableGlow={false}>
            <div className="h-14 rounded-md bg-background-elevated border border-border mb-3" />
            <p className="font-mono text-xs font-semibold text-foreground">Elevated</p>
            <p className="font-mono text-[11px] text-foreground-muted">#17171B</p>
          </Card>

          <Card className="p-4" enableGlow={false}>
            <div className="h-14 rounded-md bg-border mb-3" />
            <p className="font-mono text-xs font-semibold text-foreground">Border Subtle</p>
            <p className="font-mono text-[11px] text-foreground-muted">#1F1F23</p>
          </Card>

          <Card className="p-4" enableGlow={false}>
            <div className="h-14 rounded-md bg-accent shadow-glow mb-3" />
            <p className="font-mono text-xs font-semibold text-foreground">Accent</p>
            <p className="font-mono text-[11px] text-accent">#7C5CFF</p>
          </Card>

          <Card className="p-4" enableGlow={false}>
            <div className="h-14 rounded-md bg-accent/20 border border-accent/40 mb-3 flex items-center justify-center">
              <span className="font-mono text-[10px] text-accent">Glow Variant</span>
            </div>
            <p className="font-mono text-xs font-semibold text-foreground">Accent Glow</p>
            <p className="font-mono text-[11px] text-foreground-muted">rgba(124,92,255)</p>
          </Card>
        </div>
      </Section>

      {/* 2. Fluid Typography Scale */}
      <Section
        id="typography"
        label="Typography System"
        title="Scale & Hierarchies via clamp()"
        description="Three dedicated typefaces loaded from Google Fonts: Space Grotesk for architectural headings, Inter for body legibility, and JetBrains Mono for telemetry."
      >
        <Card className="space-y-6">
          <div className="pb-4 border-b border-border">
            <span className="font-mono text-xs text-accent">Font: Space Grotesk / clamp(2.25rem, 4.5vw, 4.25rem)</span>
            <h1 className="font-heading font-bold text-fluid-h1 text-foreground mt-1">
              Heading 1 Fluid Display
            </h1>
          </div>

          <div className="pb-4 border-b border-border">
            <span className="font-mono text-xs text-accent">Font: Space Grotesk / clamp(1.75rem, 3vw, 2.75rem)</span>
            <h2 className="font-heading font-bold text-fluid-h2 text-foreground mt-1">
              Heading 2 Section Header
            </h2>
          </div>

          <div className="pb-4 border-b border-border">
            <span className="font-mono text-xs text-accent">Font: Space Grotesk / clamp(1.35rem, 2vw, 1.85rem)</span>
            <h3 className="font-heading font-semibold text-fluid-h3 text-foreground mt-1">
              Heading 3 Component Title
            </h3>
          </div>

          <div className="pb-4 border-b border-border">
            <span className="font-mono text-xs text-accent">Font: Inter / clamp(0.95rem, 0.4vw, 1.075rem)</span>
            <p className="text-fluid-body text-foreground-muted mt-1 leading-relaxed">
              Body Text: Computer Engineering undergraduate specializing in AI/ML systems, distributed backends, and low-latency user interfaces.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs text-accent">Font: JetBrains Mono</span>
            <p className="font-mono text-xs text-foreground-muted mt-1">
              const stack = [&apos;React 18&apos;, &apos;TailwindCSS&apos;, &apos;Framer Motion&apos;, &apos;Lenis&apos;];
            </p>
          </div>
        </Card>
      </Section>

      {/* 3. UI Primitives */}
      <Section
        id="ui-primitives"
        label="UI Primitives"
        title="Interactive Components with Cursor Glow"
        description="Atomic primitives built with focus accessibility, keyboard navigation, and cursor-following spotlights. Hover over the cards below to see the border highlight track your cursor."
      >
        {/* Buttons and Badges Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h4 className="font-heading font-semibold text-foreground text-sm mb-4">
              Button Primitives & States
            </h4>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">Primary Small</Button>
                <Button variant="primary" size="md">Primary Medium</Button>
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Primary Large
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="ghost" size="sm">Ghost Small</Button>
                <Button variant="ghost" size="md" icon={Code}>Ghost Medium</Button>
                <Button variant="ghost" size="lg">Ghost Large</Button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button variant="primary" size="sm" disabled>Disabled Primary</Button>
                <Button variant="ghost" size="sm" disabled>Disabled Ghost</Button>
              </div>
            </div>
          </Card>

          <Card>
            <h4 className="font-heading font-semibold text-foreground text-sm mb-4">
              Badge Primitives & Tags
            </h4>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Default Pill</Badge>
                <Badge variant="accent">Electric Accent</Badge>
                <Badge variant="outline">Subtle Outline</Badge>
                <Badge variant="success">Production Ready</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent" dot>
                  Available for Roles
                </Badge>
                <Badge variant="default" dot dotColor="bg-emerald-400">
                  Online
                </Badge>
                <Badge variant="outline" dot dotColor="bg-amber-400">
                  Sprint Active
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm" variant="accent">Python</Badge>
                <Badge size="sm" variant="default">PyTorch</Badge>
                <Badge size="sm" variant="outline">React 18</Badge>
                <Badge size="sm" variant="default">Docker</Badge>
                <Badge size="sm" variant="accent">Solidity</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Dynamic Cursor-Following Cards Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-foreground-muted font-mono">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Interactive Cursor-Following Border Glow Cards (Hover & Move Cursor):</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground">
                  AI & Intelligent Systems
                </h4>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Deep learning pipelines, network telemetry anomaly detection, and predictive models trained on enterprise datasets.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-accent">
                <span>Model Latency</span>
                <span>Sub-50ms</span>
              </div>
            </Card>

            <Card className="flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground">
                  Distributed Backends
                </h4>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  High-throughput microservices, ACID storage engines with B+ tree indexing, and WebSocket concurrency.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-accent">
                <span>Concurrency</span>
                <span>10k+ Req/s</span>
              </div>
            </Card>

            <Card className="flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground">
                  Fluid Frontend Systems
                </h4>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Modern interfaces with 60fps animations, accessible interaction states, and dark-mode aesthetic precision.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-accent">
                <span>Performance</span>
                <span>100 Lighthouse</span>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* 4. Data-Driven Schemas Verification */}
      <Section
        id="data-verification"
        label="Data Schemas"
        title="Zero-Hardcoded Data Verification"
        description="Components read cleanly from centralized data files in src/data/. Click any project card below to test the dynamic React Router route (/projects/:slug)."
      >
        <div className="space-y-8">
          {/* Projects Data */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading font-semibold text-foreground text-base">
                Projects Dataset ({projects.length} Entries)
              </h4>
              <Badge variant="accent" size="sm">Flagship: Socio3</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <Card key={proj.slug} className="flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={proj.featured ? "accent" : "outline"} size="sm">
                        {proj.featured ? "Featured Flagship" : "Core Project"}
                      </Badge>
                      <span className="font-mono text-xs text-foreground-muted">{proj.role}</span>
                    </div>

                    <h5 className="font-heading font-bold text-xl text-foreground">
                      {proj.title}
                    </h5>

                    <p className="text-foreground-muted text-xs leading-relaxed line-clamp-2">
                      {proj.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-background-elevated text-foreground-muted border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-border flex items-center justify-between">
                    <Link
                      to={`/projects/${proj.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      <span>Case Study Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-muted hover:text-foreground text-xs"
                      aria-label="GitHub Repository"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience Data */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-base mb-4">
              Experience Dataset ({experience.length} Entry)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experience.map((exp, idx) => (
                <Card key={idx}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h5 className="font-heading font-bold text-lg text-foreground">
                        {exp.role} &bull; <span className="text-accent">{exp.company}</span>
                      </h5>
                      <p className="text-xs text-foreground-muted font-mono mt-0.5">
                        {exp.period} &bull; {exp.location}
                      </p>
                    </div>
                    <Badge variant="accent" size="sm">{exp.type}</Badge>
                  </div>

                  <p className="text-foreground-muted text-sm mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    {exp.achievements.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}

              {/* Skills summary card */}
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-heading font-bold text-lg text-foreground">
                    Skills Inventory Overview
                  </h5>
                  <Badge variant="outline" size="sm">
                    {skillCategories.length} Categories
                  </Badge>
                </div>
                <div className="space-y-3">
                  {skillCategories.map((cat) => (
                    <div key={cat.category} className="space-y-1">
                      <p className="text-xs font-semibold text-foreground flex items-center justify-between">
                        <span>{cat.category}</span>
                        <span className="text-foreground-muted font-mono font-normal text-[11px]">
                          {cat.skills.length} skills
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.slice(0, 4).map((s) => (
                          <span
                            key={s.name}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-background text-foreground-muted border border-border/80"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
