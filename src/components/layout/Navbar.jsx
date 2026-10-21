import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/80 py-3.5 shadow-subtle"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-heading font-bold text-lg tracking-tight group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 text-accent group-hover:scale-105 group-hover:bg-accent/25 transition-all">
            S
          </span>
          <span className="text-foreground group-hover:text-white transition-colors">
            {profile.name}
            <span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-foreground-muted font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-foreground transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action button */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            as="a"
            href={`mailto:${profile.email}`}
            variant="ghost"
            size="sm"
            icon={ArrowUpRight}
            iconPosition="right"
          >
            Get in touch
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground-muted hover:text-foreground"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background-surface border-b border-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-foreground-muted hover:text-foreground py-2 text-base font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <Button
              as="a"
              href={`mailto:${profile.email}`}
              variant="primary"
              size="sm"
              className="w-full"
            >
              Get in touch
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
