import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { profile, navLinks } from '../../data/profile'
import { useLenis } from './SmoothScroll'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Button } from '../ui/Button'
import { Menu, X, FileText, ArrowRight, Search, Command } from 'lucide-react'
import { cn } from '../../lib/utils'
import { ScrambleText } from '../ui/ScrambleText'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo, stop, start } = useLenis()
  const { isVisible } = useScrollDirection()
  const reducedMotion = useReducedMotion()

  const sectionIds = navLinks.map((l) => l.id)
  const activeSection = useActiveSection(sectionIds)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleButtonRef = useRef(null)

  // Trigger Command Palette open event
  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  // Handle navigation click (scroll if on home, navigate otherwise)
  const handleNavClick = (e, link) => {
    e.preventDefault()
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }

    if (location.pathname === '/') {
      scrollTo(`#${link.id}`, { offset: -20, duration: 1.2 })
    } else {
      navigate(`/#${link.id}`)
    }
  }

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        toggleButtonRef.current?.focus()
      }
    }

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Lock body scroll and pause Lenis when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      stop()
      // Move focus into the menu
      setTimeout(() => {
        const firstFocusable = menuRef.current?.querySelector('a, button')
        firstFocusable?.focus()
      }, 50)
    } else {
      document.body.style.overflow = ''
      start()
    }

    return () => {
      document.body.style.overflow = ''
      start()
    }
  }, [mobileMenuOpen, stop, start])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Desktop Floating Pill Navigation */}
      <motion.nav
        aria-label="Primary desktop navigation"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -90 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-background-surface/80 backdrop-blur-lg border border-border/80 shadow-card"
      >
        {/* Monogram Logo */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, { id: 'home' })}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/15 border border-accent/30 text-accent font-heading font-bold text-xs hover:scale-105 hover:bg-accent/25 transition-all mr-1"
          aria-label={`${profile.name} - Home`}
        >
          {profile.monogram || 'SS'}
        </Link>

        {/* Links with Sliding Active Pill and Subtle Scramble on Hover */}
        <div className="flex items-center gap-1 text-xs font-medium text-foreground-muted">
          {navLinks.map((link) => {
            const isActive = location.pathname === '/' && activeSection === link.id

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full transition-colors duration-200 select-none group",
                  isActive ? "text-foreground font-semibold" : "hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-accent/15 border border-accent/35 -z-10 shadow-[0_0_12px_rgba(124,92,255,0.2)]"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
                <ScrambleText>{link.label}</ScrambleText>
              </a>
            )
          })}
        </div>

        {/* Search / Command Palette Hint Button */}
        <button
          type="button"
          onClick={handleOpenSearch}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-foreground-muted hover:text-foreground bg-background-elevated/70 hover:bg-background-elevated rounded-full border border-border/70 hover:border-accent/40 transition-all ml-1"
          aria-label="Open command palette (Ctrl+K or Cmd+K)"
        >
          <Search className="w-3 h-3 text-accent" />
          <span className="hidden lg:inline text-[11px]">Search</span>
          <kbd className="px-1.5 py-0.5 rounded bg-background text-[10px] font-mono border border-border text-foreground-muted">
            ⌘K
          </kbd>
        </button>

        {/* Primary Resume Action Button */}
        <div className="ml-1 pl-2 border-l border-border/80">
          <Button
            as="a"
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            icon={FileText}
            iconPosition="left"
            className="rounded-full !px-3.5 !py-1 text-xs"
          >
            Resume
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -80 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 md:hidden flex items-center justify-between px-4 py-3.5 bg-background/85 backdrop-blur-md border-b border-border/80"
      >
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, { id: 'home' })}
          className="flex items-center gap-2 font-heading font-bold text-base text-foreground"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 text-accent text-xs">
            {profile.monogram || 'SS'}
          </span>
          <span>{profile.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile Search Trigger */}
          <button
            type="button"
            onClick={handleOpenSearch}
            className="p-2 rounded-lg bg-background-elevated border border-border text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Open command palette"
          >
            <Search className="w-4 h-4 text-accent" />
          </button>

          <Button
            as="a"
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            className="text-xs !py-1 !px-2.5"
          >
            Resume
          </Button>

          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-background-elevated border border-border text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Full-Screen Accessible Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
            className="fixed inset-0 z-50 md:hidden bg-background/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24"
          >
            {/* Close button in top corner */}
            <div className="absolute top-4 right-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  toggleButtonRef.current?.focus()
                }}
                className="p-2.5 rounded-full bg-background-elevated border border-border text-foreground hover:text-accent"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Staggered Navigation Links */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reducedMotion ? 0 : 0.07,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col gap-4 my-auto"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === '/' && activeSection === link.id

                return (
                  <motion.div
                    key={link.id}
                    variants={{
                      hidden: { opacity: 0, y: reducedMotion ? 0 : 18 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={cn(
                        "flex items-center justify-between text-2xl font-heading font-semibold py-2 transition-colors",
                        isActive ? "text-accent" : "text-foreground-muted hover:text-foreground"
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className={cn("w-5 h-5", isActive ? "text-accent" : "opacity-30")} />
                    </a>
                  </motion.div>
                )
              })}
            </motion.nav>

            {/* Mobile Menu Footer */}
            <div className="pt-6 border-t border-border flex flex-col gap-4">
              <Button
                as="a"
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                icon={FileText}
                className="w-full justify-center"
              >
                Download Resume PDF
              </Button>

              <p className="text-center text-xs font-mono text-foreground-muted">
                {profile.fullName} &bull; {profile.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
