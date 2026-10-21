import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Compass, 
  FolderGit2, 
  Share2, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  Copy, 
  Check, 
  X,
  Github,
  Linkedin,
  Code2,
  Terminal,
  Command
} from 'lucide-react'
import { profile, navLinks } from '../data/profile'
import { projects } from '../data/projects'
import { useLenis } from './layout/SmoothScroll'
import { useToast } from '../context/ToastContext'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const navigate = useNavigate()
  const location = useLocation()
  const { scrollTo } = useLenis()
  const { showToast } = useToast()
  const reducedMotion = useReducedMotion()

  const inputRef = useRef(null)
  const listRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Open / Close triggers
  const openPalette = useCallback(() => {
    previousFocusRef.current = document.activeElement
    setIsOpen(true)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const closePalette = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
      setTimeout(() => {
        previousFocusRef.current?.focus()
      }, 50)
    }
  }, [])

  // Global Keyboard Shortcuts (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) {
          closePalette()
        } else {
          openPalette()
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        closePalette()
      }
    }

    // Custom event dispatched from Navbar "Search" button
    const handleCustomOpen = () => openPalette()

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleCustomOpen)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleCustomOpen)
    }
  }, [isOpen, openPalette, closePalette])

  // Lock body scroll when palette is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        inputRef.current?.focus()
      }, 30)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Action execution helper
  const executeAction = useCallback((item) => {
    closePalette()
    if (item.action) {
      item.action()
    }
  }, [closePalette])

  // Build searchable index of items
  const allItems = useMemo(() => {
    const items = []

    // 1. Navigation Sections
    navLinks.forEach((link) => {
      items.push({
        id: `nav-${link.id}`,
        title: `Jump to #${link.label}`,
        description: `Navigate to the ${link.label} section on the homepage`,
        category: 'Navigation',
        icon: Compass,
        action: () => {
          if (location.pathname === '/') {
            scrollTo(`#${link.id}`, { offset: -20, duration: 1.2 })
          } else {
            navigate(`/#${link.id}`)
          }
        },
      })
    })

    // 2. Project Case Studies
    projects.forEach((proj) => {
      items.push({
        id: `project-${proj.slug}`,
        title: proj.title,
        description: `${proj.category} • ${proj.tagline}`,
        category: 'Projects',
        icon: FolderGit2,
        action: () => {
          navigate(`/projects/${proj.slug}`)
        },
      })
    })

    // 3. Socials
    if (profile.socials?.github) {
      items.push({
        id: 'social-github',
        title: 'GitHub Profile',
        description: 'Explore open-source repositories and code contributions',
        category: 'Socials',
        icon: Github,
        action: () => window.open(profile.socials.github, '_blank', 'noopener,noreferrer'),
      })
    }
    if (profile.socials?.linkedin) {
      items.push({
        id: 'social-linkedin',
        title: 'LinkedIn Profile',
        description: 'Connect professionally and view career milestones',
        category: 'Socials',
        icon: Linkedin,
        action: () => window.open(profile.socials.linkedin, '_blank', 'noopener,noreferrer'),
      })
    }
    if (profile.socials?.leetcode) {
      items.push({
        id: 'social-leetcode',
        title: 'LeetCode Profile',
        description: 'Review algorithmic solutions and contest ratings',
        category: 'Socials',
        icon: Code2,
        action: () => window.open(profile.socials.leetcode, '_blank', 'noopener,noreferrer'),
      })
    }
    if (profile.socials?.codechef) {
      items.push({
        id: 'social-codechef',
        title: 'CodeChef Profile',
        description: 'Competitive programming track record',
        category: 'Socials',
        icon: Terminal,
        action: () => window.open(profile.socials.codechef, '_blank', 'noopener,noreferrer'),
      })
    }

    // 4. Quick Actions
    items.push({
      id: 'action-resume',
      title: 'Download Resume',
      description: 'Open official PDF resume (65 KB)',
      category: 'Actions',
      icon: FileText,
      action: () => {
        window.open(profile.resumeUrl, '_blank')
        showToast('Opening resume PDF...', { type: 'info' })
      },
    })

    items.push({
      id: 'action-copy-url',
      title: 'Copy Profile Link',
      description: 'Copy portfolio link to clipboard for sharing',
      category: 'Actions',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(window.location.origin)
        showToast('Portfolio link copied to clipboard!', { type: 'success' })
      },
    })

    return items
  }, [location.pathname, navigate, scrollTo, showToast])

  // Filter items by fuzzy search string
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allItems

    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q)
      const matchDesc = item.description.toLowerCase().includes(q)
      const matchCategory = item.category.toLowerCase().includes(q)
      return matchTitle || matchDesc || matchCategory
    })
  }, [query, allItems])

  // Reset activeIndex when query changes
  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current && filteredItems.length > 0) {
      const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`)
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeIndex, filteredItems])

  // Keyboard navigation inside the palette
  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (filteredItems.length === 0 ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[activeIndex]) {
        executeAction(filteredItems[activeIndex])
      }
    } else if (e.key === 'Tab') {
      // Focus trap
      e.preventDefault()
    }
  }

  // Render via React Portal
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto"
        >
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
            onClick={closePalette}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Palette Dialog Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl bg-background-surface border border-border shadow-card overflow-hidden z-10 flex flex-col"
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-background-surface/80">
              <Search className="w-5 h-5 text-accent flex-shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls="command-palette-results"
                aria-activedescendant={
                  filteredItems[activeIndex] ? `palette-item-${filteredItems[activeIndex].id}` : undefined
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command, section, or project..."
                className="flex-1 bg-transparent border-0 text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-0"
              />
              <button
                type="button"
                onClick={closePalette}
                className="p-1 text-foreground-muted hover:text-foreground rounded-md transition-colors"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div
              id="command-palette-results"
              ref={listRef}
              role="listbox"
              aria-label="Command suggestions"
              className="max-h-[380px] overflow-y-auto p-2 divide-y divide-border/30 scroll-py-2"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-foreground-muted">
                  No matching commands found for <span className="text-foreground">"{query}"</span>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === activeIndex
                  const Icon = item.icon

                  return (
                    <div
                      key={item.id}
                      id={`palette-item-${item.id}`}
                      role="option"
                      aria-selected={isSelected}
                      data-index={index}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => executeAction(item)}
                      className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-accent/15 text-foreground border border-accent/30'
                          : 'text-foreground-muted hover:text-foreground hover:bg-background-elevated border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? 'bg-accent text-white'
                              : 'bg-background-elevated text-foreground-muted'
                          } transition-colors`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-semibold truncate ${
                              isSelected ? 'text-foreground' : 'text-foreground'
                            }`}
                          >
                            {item.title}
                          </p>
                          <p className="text-[11px] text-foreground-muted truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-background-elevated text-foreground-muted border border-border">
                          {item.category}
                        </span>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-accent animate-pulse" />
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer with keyboard navigation cues */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-background-elevated/40 text-[11px] text-foreground-muted font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↵</kbd>
                  <span>select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">esc</kbd>
                  <span>close</span>
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-accent">
                <Command className="w-3 h-3" />
                <span>Command Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
