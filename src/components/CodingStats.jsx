import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { useFetch } from '../hooks/useFetch'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  Github,
  Code2,
  Terminal,
  ExternalLink,
  WifiOff,
  Sparkles,
  Calendar,
  Trophy,
} from 'lucide-react'
import { cn } from '../lib/utils'

function AnimatedMetric({ target = 0, suffix = '', label, inView }) {
  const [count, setCount] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || !target) {
      setCount(target || 0)
      return
    }

    if (reducedMotion) {
      setCount(target)
      return
    }

    let start = 0
    const duration = 1200
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, target, reducedMotion])

  return (
    <div>
      <div className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
        <span>{count}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="font-mono text-[11px] text-foreground-muted mt-0.5">{label}</p>
    </div>
  )
}

/**
 * CodingStats component displaying real-time GitHub telemetry
 * and LeetCode problem-solving progress.
 * Built defensively to support aspiring engineers without runtime exceptions.
 */
export function CodingStats() {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)
  const reducedMotion = useReducedMotion()

  const codingProfiles = profile.codingProfiles || {}
  const github = codingProfiles.github || {
    username: 'sakshishewale01',
    profileUrl: 'https://github.com/sakshishewale01',
    fallbackRepos: profile.repoCount || 34,
    fallbackFollowers: 5,
  }

  const leetcode = codingProfiles.leetcode || {
    username: 'sakshishewale',
    profileUrl: 'https://leetcode.com/u/sakshishewale',
    solved: 50,
    easy: 30,
    medium: 20,
    hard: 0,
    rating: 1400,
    lastUpdated: 'Ongoing',
  }

  const codechef = codingProfiles.codechef

  // Fetch GitHub data with sessionStorage caching & static fallback
  const githubFallback = {
    public_repos: github.fallbackRepos || profile.repoCount || 34,
    followers: github.fallbackFollowers || 5,
  }

  const { data: githubData, loading: githubLoading, isFallback: isGithubFallback } = useFetch(
    github.username ? `https://api.github.com/users/${github.username}` : null,
    githubFallback
  )

  const [heatmapFailed, setHeatmapFailed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const hasCodeChef = Boolean(codechef && codechef.username)

  return (
    <div ref={containerRef} className="space-y-6 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/80">
        <div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground flex items-center gap-2">
            <span>Problem Solving &amp; Open Source</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </h3>
          <p className="text-xs text-foreground-muted font-sans mt-0.5">
            Consistent algorithmic practice, project repositories, and technical growth
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isGithubFallback && (
            <Badge variant="outline" size="sm" className="text-amber-400 border-amber-500/30">
              <WifiOff className="w-3 h-3 mr-1" /> Offline Cached
            </Badge>
          )}
          <Badge variant="accent" size="sm">
            Telemetry Synced
          </Badge>
        </div>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          hasCodeChef ? 'md:grid-cols-3' : 'md:grid-cols-2'
        )}
      >
        {/* ================= CARD 1: GITHUB ================= */}
        <Card className="flex flex-col justify-between p-6 h-full">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-foreground">
                    GitHub Profile
                  </h4>
                  <p className="font-mono text-xs text-foreground-muted">
                    @{github.username}
                  </p>
                </div>
              </div>

              {github.profileUrl && (
                <a
                  href={github.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="GitHub Profile Link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border">
                {githubLoading ? (
                  <div className="h-8 w-16 bg-background rounded animate-pulse" />
                ) : (
                  <AnimatedMetric
                    target={githubData?.public_repos || githubFallback.public_repos}
                    label="Public Repos"
                    inView={inView}
                  />
                )}
              </div>
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border">
                {githubLoading ? (
                  <div className="h-8 w-16 bg-background rounded animate-pulse" />
                ) : (
                  <AnimatedMetric
                    target={githubData?.followers || githubFallback.followers}
                    label="Followers"
                    inView={inView}
                  />
                )}
              </div>
            </div>

            {/* Contribution Heatmap */}
            <div className="pt-2">
              <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block mb-1.5">
                Contribution Activity
              </span>
              <div className="rounded-lg bg-background-elevated p-2 border border-border overflow-hidden">
                {!heatmapFailed && github.username ? (
                  <img
                    src={`https://ghchart.rshah.org/7c5cff/${github.username}`}
                    alt="GitHub Contribution Heatmap"
                    className="w-full h-auto filter contrast-125"
                    loading="lazy"
                    onError={() => setHeatmapFailed(true)}
                  />
                ) : (
                  <div className="h-10 flex items-center justify-center font-mono text-[10px] text-foreground-muted">
                    [Activity Stream Active on GitHub]
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
            <span>Source Repositories</span>
            <span className="text-accent">Active Commits</span>
          </div>
        </Card>

        {/* ================= CARD 2: LEETCODE ================= */}
        <Card className="flex flex-col justify-between p-6 h-full">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-foreground">
                    LeetCode
                  </h4>
                  <p className="font-mono text-xs text-foreground-muted">
                    @{leetcode.username}
                  </p>
                </div>
              </div>

              {leetcode.profileUrl && (
                <a
                  href={leetcode.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="LeetCode Profile Link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Solved Count & Learning Focus */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border">
                <AnimatedMetric
                  target={leetcode.solved || 50}
                  suffix="+"
                  label="Problems Solved"
                  inView={inView}
                />
              </div>
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border flex flex-col justify-center">
                <div className="font-heading font-bold text-lg sm:text-xl text-amber-400">
                  C++ &amp; Striver A2Z
                </div>
                <p className="font-mono text-[11px] text-foreground-muted mt-0.5">Primary Focus</p>
              </div>
            </div>

            {/* Difficulty Breakdown / Pattern Mastery */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block">
                Problem Breakdown
              </span>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-emerald-400 font-bold text-sm">{leetcode.easy || 30}</p>
                  <p className="text-[10px] text-foreground-muted">Easy</p>
                </div>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                  <p className="text-amber-400 font-bold text-sm">{leetcode.medium || 20}</p>
                  <p className="text-[10px] text-foreground-muted">Medium</p>
                </div>
                <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20">
                  <p className="text-rose-400 font-bold text-sm">{leetcode.hard || 0}</p>
                  <p className="text-[10px] text-foreground-muted">Hard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-accent" /> Status
            </span>
            <span>{leetcode.lastUpdated || 'Consistent Practice'}</span>
          </div>
        </Card>

        {/* ================= OPTIONAL CARD 3: CODECHEF (if configured) ================= */}
        {hasCodeChef && (
          <Card className="flex flex-col justify-between p-6 h-full">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-foreground">
                      CodeChef
                    </h4>
                    <p className="font-mono text-xs text-foreground-muted">
                      @{codechef.username}
                    </p>
                  </div>
                </div>

                {codechef.profileUrl && (
                  <a
                    href={codechef.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors"
                    aria-label="CodeChef Profile Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-background-elevated/70 border border-border">
                  <AnimatedMetric
                    target={codechef.rating || 0}
                    label="Division Rating"
                    inView={inView}
                  />
                </div>
                <div className="p-3 rounded-lg bg-background-elevated/70 border border-border flex flex-col justify-center">
                  <div className="font-heading font-bold text-2xl text-orange-400">
                    {codechef.stars || '1★'}
                  </div>
                  <p className="font-mono text-[11px] text-foreground-muted mt-0.5">Rating Tier</p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-accent" /> Last Updated
              </span>
              <span>{codechef.lastUpdated || 'Ongoing'}</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
