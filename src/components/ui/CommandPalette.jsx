import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { useLenis } from '../layout/SmoothScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  Search,
  ArrowRight,
  FolderGit2,
  FileText,
  Github,
  Linkedin,
  Code2,
  Layers,
  Sparkles,
  Command,
  X,
  Compass,
} from 'lucide-react'
import { cn } from '../../lib/utils'

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const { scrollTo } = useLenis()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  // Command items pool
  const navItems = [
    { id: 'home', label: 'Home', type: 'Section', icon: Compass, action: () => scrollTo('#home') },
    { id: 'about', label: 'About Sakshi', type: 'Section', icon: Sparkles, action: () => scrollTo('#about') },
    { id: 'skills', label: 'Technical Skills', type: 'Section', icon: Layers, action: () => scrollTo('#skills') },
    { id: 'projects', label: 'Featured Projects', type: 'Section', icon: FolderGit2, action: () => scrollTo('#projects') },
    { id: 'experience', label: 'Journey & Experience', type: 'Section', icon: Code2, action: () => scrollTo('#experience') },
    { id: 'contact', label: 'Contact', type: 'Section', icon: ArrowRight, action: () => scrollTo('#contact') },
  ]

  const projectItems = projects.map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    sublabel: p.tagline,
    type: 'Project',
    icon: FolderGit2,
    action: () => navigate(`/projects/${p.slug}`),
  }))

  const linkItems = [
    {
      id: 'resume',
      label: 'View Resume (PDF)',
      type: 'Document',
      icon: FileText,
      action: () => window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      type: 'Social',
      icon: Github,
      action: () => window.open(profile.socials.github, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      type: 'Social',
      icon: Linkedin,
      action: () => window.open(profile.socials.linkedin, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'leetcode',
      label: 'LeetCode Profile',
      type: 'Social',
      icon: Code2,
      action: () => window.open(profile.socials.leetcode, '_blank', 'noopener,noreferrer'),
    },
  ]

  const allItems = [...navItems, ...projectItems, ...linkItems]

  // Filter based on search query
  const filteredItems = allItems.filter((item) => {
    const q = query.toLowerCase().trim()
    if (!q) return true
    return (
      item.label.toLowerCase().includes(q) ||
      (item.sublabel && item.sublabel.toLowerCase().includes(q)) ||
      item.type.toLowerCase().includes(q)
    )
  })

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Arrow key navigation
  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = filteredItems[selectedIndex]
      if (item) {
        item.action()
        setIsOpen(false)
      }
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command Menu"
            className="fixed inset-0 z-[10001] flex items-start justify-center pt-20 sm:pt-28 px-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95, y: reducedMotion ? 0 : -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.95, y: reducedMotion ? 0 : -15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl rounded-2xl border border-border bg-[#111116] shadow-card overflow-hidden flex flex-col max-h-[75vh] z-10"
            >
              {/* Search Bar */}
              <div className="flex items-center px-4 py-3.5 border-b border-border/80 gap-3">
                <Search className="w-4 h-4 text-accent shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  onKeyDown={handleKeyNavigation}
                  placeholder="Type a command, section, or project..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none font-sans"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-foreground-muted hover:text-foreground hover:bg-background-elevated"
                  aria-label="Close command palette"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div
                ref={listRef}
                className="overflow-y-auto p-2 space-y-1 divide-y divide-border/20 text-xs font-mono"
              >
                {filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-foreground-muted text-xs">
                    No matching commands or projects found.
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const Icon = item.icon
                    const isSelected = idx === selectedIndex

                    return (
                      <div
                        key={item.id}
                        data-index={idx}
                        onClick={() => {
                          item.action()
                          setIsOpen(false)
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          'flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors',
                          isSelected
                            ? 'bg-accent/15 text-foreground border border-accent/40 shadow-xs'
                            : 'text-foreground-muted hover:text-foreground border border-transparent'
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={cn(
                              'w-7 h-7 rounded-md flex items-center justify-center shrink-0',
                              isSelected
                                ? 'bg-accent/20 text-accent'
                                : 'bg-background-elevated text-foreground-muted'
                            )}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-medium text-foreground block truncate">
                              {item.label}
                            </span>
                            {item.sublabel && (
                              <span className="text-[10px] text-foreground-muted truncate block">
                                {item.sublabel}
                              </span>
                            )}
                          </div>
                        </div>

                        <span
                          className={cn(
                            'text-[10px] px-2 py-0.5 rounded uppercase font-semibold shrink-0 ml-2',
                            isSelected
                              ? 'bg-accent/20 text-accent'
                              : 'bg-background-elevated text-foreground-muted'
                          )}
                        >
                          {item.type}
                        </span>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Footer Helper */}
              <div className="px-4 py-2 border-t border-border/60 bg-background-surface/80 flex items-center justify-between text-[11px] font-mono text-foreground-muted">
                <span>Navigate &uarr;&darr; &bull; Enter to select</span>
                <span className="flex items-center gap-1">
                  <Command className="w-3 h-3 text-accent" />
                  <span>K to toggle</span>
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
