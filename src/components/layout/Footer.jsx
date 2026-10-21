import React from 'react'
import { profile } from '../../data/profile'
import { Github, Linkedin, Code2, Terminal } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background-surface/50 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-heading font-semibold text-foreground text-sm">
            {profile.fullName} <span className="text-accent">/</span> Portfolio
          </p>
          <p className="text-xs text-foreground-muted mt-1 font-mono">
            Designed & Engineered for High-Impact Software Engineering
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={profile.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-colors"
            aria-label="LeetCode"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a
            href={profile.socials.codechef}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-colors"
            aria-label="CodeChef"
          >
            <Terminal className="w-4 h-4" />
          </a>
        </div>

        <div className="text-xs font-mono text-foreground-muted">
          &copy; {currentYear} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
