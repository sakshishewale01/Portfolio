import React from 'react'
import { motion } from 'framer-motion'
import { Section } from '../components/ui/Section'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import {
  Code2,
  Layout,
  Server,
  Database,
  Cpu,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react'
import { cn } from '../lib/utils'

// Six cleanly organized technical categories
const skillCategories = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    icon: Code2,
    skills: [
      { name: 'C++', status: 'Practising', note: 'Primary language for DSA & algorithmic problem solving' },
      { name: 'Python', status: 'Used in projects', note: 'Backend APIs, data analysis & applied machine learning' },
      { name: 'Java', status: 'Familiar with', note: 'Object-oriented programming coursework & core concepts' },
      { name: 'JavaScript', status: 'Used in projects', note: 'Modern ES6+ syntax for web applications' },
    ],
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    icon: Layout,
    skills: [
      { name: 'React', status: 'Used in projects', note: 'Component architecture, custom hooks & state management' },
      { name: 'HTML5', status: 'Used in projects', note: 'Semantic page structure & accessible elements' },
      { name: 'CSS3', status: 'Used in projects', note: 'Responsive design, Flexbox, Grid & micro-animations' },
      { name: 'Tailwind CSS', status: 'Used in projects', note: 'Utility-first styling & custom design tokens' },
    ],
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    icon: Server,
    skills: [
      { name: 'FastAPI', status: 'Used in projects', note: 'High-performance Python REST APIs & Pydantic validation' },
      { name: 'Flask', status: 'Used in projects', note: 'Lightweight web framework & role-based routing' },
      { name: 'REST APIs', status: 'Used in projects', note: 'Client-server contracts, JSON endpoints & CRUD workflows' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', status: 'Used in projects', note: 'Relational data modeling, queries & schema design' },
      { name: 'MySQL', status: 'Used in projects', note: 'Database management system coursework & SQL queries' },
      { name: 'Supabase', status: 'Used in projects', note: 'Backend-as-a-service, PostgreSQL & real-time tables' },
    ],
  },
  {
    id: 'ai-ml-data',
    title: 'AI/ML and Data',
    icon: Cpu,
    skills: [
      { name: 'Scikit-learn', status: 'Used in projects', note: 'Classification, regression & model evaluation pipelines' },
      { name: 'Streamlit', status: 'Used in projects', note: 'Interactive dashboards & network diagnostic interfaces' },
      { name: 'Data Structures & Algorithms', status: 'Practising', note: 'Daily practice on LeetCode & Striver A2Z sheet' },
      { name: 'Machine Learning', status: 'Currently learning', note: 'Supervised learning principles & predictive modeling' },
    ],
  },
  {
    id: 'tools-cloud',
    title: 'Tools and Cloud',
    icon: Terminal,
    skills: [
      { name: 'Git & GitHub', status: 'Used in projects', note: 'Version control, branch management & collaboration' },
      { name: 'Cisco Packet Tracer', status: 'Used in projects', note: 'Network topology simulation & packet inspection' },
      { name: 'VS Code', status: 'Used in projects', note: 'Primary development environment & debugging tools' },
      { name: 'Docker', status: 'Currently learning', note: 'Containerization basics & local environment setup' },
    ],
  },
]

// Status pill component distinguishing real usage from learning
function StatusBadge({ status }) {
  switch (status) {
    case 'Practising':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Practising</span>
        </span>
      )
    case 'Used in projects':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-accent/15 text-accent border border-accent/25 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Used in projects</span>
        </span>
      )
    case 'Currently learning':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Learning</span>
        </span>
      )
    case 'Familiar with':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span>Familiar</span>
        </span>
      )
  }
}

/**
 * Minimal, Elegant & Recruiter-Friendly Technologies and Skills Section (`id="skills"`)
 * Displays technical stack clearly across 6 distinct categories without visual clutter.
 */
export function Skills() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)

  return (
    <Section
      id="skills"
      label="03 // TECHNOLOGIES & SKILLS"
      title="Technical Stack"
      description="Core programming languages, frameworks, and developer tools I work with daily and use to build practical software."
      className="relative overflow-hidden"
    >
      {/* Background Low-Contrast Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f2312_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2312_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      {/* ============================================================== */}
      {/* SIX-CARD CLEAN BENTO GRID (3 COLS DESKTOP, 2 TABLET, 1 MOBILE) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon

          return (
            <motion.div
              key={category.id}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{
                duration: reducedMotion ? 0.01 : 0.3,
                delay: reducedMotion ? 0 : idx * 0.06,
              }}
              whileHover={reducedMotion ? {} : { y: -3 }}
              className="rounded-2xl border border-border/80 bg-background-surface/80 hover:bg-background-surface backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-card hover:border-accent/40 group"
            >
              <div>
                {/* Category Header: Icon + Title + Count */}
                <div className="flex items-center justify-between pb-3.5 border-b border-border/60 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 group-hover:bg-accent/20 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-semibold text-sm sm:text-base text-foreground group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-foreground-muted">
                    {category.skills.length} skills
                  </span>
                </div>

                {/* Compact Technology Rows */}
                <div className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-background/60 hover:bg-background border border-border/60 hover:border-accent/30 transition-colors flex flex-col justify-between gap-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-heading font-medium text-xs text-foreground">
                          {skill.name}
                        </span>
                        <StatusBadge status={skill.status} />
                      </div>
                      <p className="text-[11px] text-foreground-muted leading-relaxed truncate">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ============================================================== */}
      {/* MINIMAL FOCUS BANNER                                            */}
      {/* ============================================================== */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mt-8 p-4 rounded-xl border border-accent/20 bg-accent/5 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-mono text-xs text-foreground">
            <strong>Current Focus:</strong> C++ Algorithmic Problem Solving (Striver A2Z DSA) &bull; Full-Stack Systems &bull; Applied AI
          </span>
        </div>

        <span className="font-mono text-[11px] text-accent font-medium shrink-0">
          Open to 2027 Internships
        </span>
      </motion.div>
    </Section>
  )
}
