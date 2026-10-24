import React from 'react'
import { motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLenis } from './SmoothScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

const railSections = [
  { id: 'about', index: '01', label: 'ABOUT' },
  { id: 'skills', index: '02', label: 'SKILLS' },
  { id: 'projects', index: '03', label: 'PROJECTS' },
  { id: 'experience', index: '04', label: 'JOURNEY' },
  { id: 'contact', index: '05', label: 'CONTACT' },
]

/**
 * Left-Edge Minimalist Section Rail
 * Visual indicator tracking active scroll section for recruiters and engineering viewers.
 * Displayed exclusively on xl screens (1280px+) to avoid cluttering viewports.
 */
export function SectionRail() {
  const activeSection = useActiveSection(railSections.map((s) => s.id))
  const { scrollTo } = useLenis()
  const reducedMotion = useReducedMotion()

  return (
    <aside
      aria-label="Section navigation rail"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-5 select-none pointer-events-auto"
    >
      <div className="flex flex-col gap-4 font-mono text-[10px]">
        {railSections.map((sec) => {
          const isActive = activeSection === sec.id

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollTo(`#${sec.id}`, { offset: -20, duration: 1.2 })}
              className={cn(
                'group flex items-center gap-3 transition-colors duration-200 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded p-1',
                isActive
                  ? 'text-accent font-semibold'
                  : 'text-foreground-muted/50 hover:text-foreground-muted'
              )}
            >
              {/* Dynamic Indicator Line */}
              <span
                className={cn(
                  'h-[2px] transition-all duration-300 rounded-full',
                  isActive
                    ? 'w-6 bg-accent shadow-[0_0_8px_rgba(124,92,255,0.6)]'
                    : 'w-2 bg-border-hover group-hover:w-3.5 group-hover:bg-foreground-muted'
                )}
              />

              {/* Number and Label */}
              <span className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 xl:opacity-80">
                <span className={cn('text-[9px]', isActive ? 'text-accent' : 'text-foreground-muted/60')}>
                  {sec.index}
                </span>
                <span className="tracking-wider">{sec.label}</span>
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
