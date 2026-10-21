import React from 'react'
import { profile } from '../../data/profile'
import { useLenis } from './SmoothScroll'
import { Github, Linkedin, Code2, Terminal, ArrowUp } from 'lucide-react'

/**
 * Minimal Footer component
 * Reads metadata and socials from profile.js, includes Lenis "Back to top" trigger.
 * Does NOT contain phone numbers or email addresses.
 */
export function Footer() {
  const { scrollTo } = useLenis()
  const currentYear = new Date().getFullYear()

  const handleBackToTop = () => {
    scrollTo(0, { duration: 1.2 })
  }

  return (
    <footer className="border-t border-border bg-background-surface/60 backdrop-blur-md relative z-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Name and short tagline */}
        <div className="text-center md:text-left">
          <p className="font-heading font-bold text-foreground text-base tracking-tight">
            {profile.fullName}
          </p>
          <p className="text-xs text-foreground-muted mt-1 font-sans">
            {profile.title}
          </p>
        </div>

        {/* Social Icons from profile.js */}
        <div className="flex items-center gap-3">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-colors border border-transparent hover:border-border"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-colors border border-transparent hover:border-border"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={profile.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-colors border border-transparent hover:border-border"
            aria-label="LeetCode Profile"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a
            href={profile.socials.codechef}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-colors border border-transparent hover:border-border"
            aria-label="CodeChef Profile"
          >
            <Terminal className="w-4 h-4" />
          </a>
        </div>

        {/* Built With & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-foreground-muted">
          <span>Built with React, Tailwind and Framer Motion</span>
          
          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-elevated hover:bg-accent/15 hover:text-accent border border-border hover:border-accent/30 text-foreground transition-all duration-200"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
