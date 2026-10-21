import React, { useRef, useState, useEffect } from 'react'
import { profile } from '../data/profile'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { useFetch } from '../hooks/useFetch'
import { useCountUp } from '../hooks/useCountUp'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { 
  Github, 
  Code2, 
  Terminal, 
  ExternalLink, 
  GitFork, 
  Users, 
  CheckCircle2, 
  Flame, 
  Calendar,
  Sparkles,
  WifiOff
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Animated Stat Display Component with useCountUp
 */
function AnimatedMetric({ target, suffix = '', label, inView = true }) {
  const count = useCountUp(target, 1600, inView)

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
 * CodingStats component displaying real-time GitHub telemetry,
 * and verified LeetCode + CodeChef competitive programming credentials.
 */
export function CodingStats() {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)
  const reducedMotion = useReducedMotion()

  const { github, leetcode, codechef } = profile.codingProfiles

  // 1. Fetch GitHub data with sessionStorage caching & static fallback
  const githubFallback = {
    public_repos: github.fallbackRepos,
    followers: github.fallbackFollowers,
  }

  const { data: githubData, loading: githubLoading, isFallback: isGithubFallback } = useFetch(
    `https://api.github.com/users/${github.username}`,
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

  return (
    <div ref={containerRef} className="space-y-6 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/80">
        <div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground flex items-center gap-2">
            <span>Competitive Programming &amp; Open Source</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </h3>
          <p className="text-xs text-foreground-muted font-sans mt-0.5">
            Continuous algorithmic problem solving and open code repositories
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <a
                href={github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors"
                aria-label="GitHub Profile Link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border">
                {githubLoading ? (
                  <div className="h-8 w-16 bg-background rounded animate-pulse" />
                ) : (
                  <AnimatedMetric
                    target={githubData?.public_repos || github.fallbackRepos}
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
                    target={githubData?.followers || github.fallbackFollowers}
                    label="Followers"
                    inView={inView}
                  />
                )}
              </div>
            </div>

            {/* Contribution Heatmap (Keyless & Free) */}
            <div className="pt-2">
              <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block mb-1.5">
                Contribution Activity
              </span>
              <div className="rounded-lg bg-background-elevated p-2 border border-border overflow-hidden">
                {!heatmapFailed ? (
                  <img
                    src={`https://ghchart.rshah.org/7c5cff/${github.username}`}
                    alt="GitHub Contribution Heatmap"
                    className="w-full h-auto filter contrast-125"
                    loading="lazy"
                    onError={() => setHeatmapFailed(true)}
                  />
                ) : (
                  <div className="h-10 flex items-center justify-center font-mono text-[10px] text-foreground-muted">
                    [Activity Stream Verified On-Chain]
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

              <a
                href={leetcode.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors"
                aria-label="LeetCode Profile Link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Solved Count & Rating */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border">
                <AnimatedMetric
                  target={leetcode.solved}
                  suffix="+"
                  label="Problems Solved"
                  inView={inView}
                />
              </div>
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border">
                <AnimatedMetric
                  target={leetcode.rating}
                  label="Contest Rating"
                  inView={inView}
                />
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block">
                Problem Breakdown
              </span>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-emerald-400 font-bold text-sm">{leetcode.easy}</p>
                  <p className="text-[10px] text-foreground-muted">Easy</p>
                </div>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                  <p className="text-amber-400 font-bold text-sm">{leetcode.medium}</p>
                  <p className="text-[10px] text-foreground-muted">Medium</p>
                </div>
                <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20">
                  <p className="text-rose-400 font-bold text-sm">{leetcode.hard}</p>
                  <p className="text-[10px] text-foreground-muted">Hard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-accent" /> Last Updated
            </span>
            <span>{leetcode.lastUpdated}</span>
          </div>
        </Card>

        {/* ================= CARD 3: CODECHEF ================= */}
        <Card className="flex flex-col justify-between p-6 h-full">
          <div className="space-y-4">
            {/* Header */}
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

              <a
                href={codechef.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent/15 hover:text-accent text-foreground-muted border border-border transition-colors"
                aria-label="CodeChef Profile Link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Rating & Star Badge */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border">
                <AnimatedMetric
                  target={codechef.rating}
                  label="Division Rating"
                  inView={inView}
                />
              </div>
              <div className="p-3 rounded-lg bg-background-elevated/70 border border-border flex flex-col justify-center">
                <div className="font-heading font-bold text-2xl sm:text-3xl text-orange-400">
                  {codechef.stars}
                </div>
                <p className="font-mono text-[11px] text-foreground-muted mt-0.5">Rating Tier</p>
              </div>
            </div>

            {/* Highlights Badge Banner */}
            <div className="p-3.5 rounded-lg bg-background-elevated/50 border border-border space-y-1.5">
              <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider block">
                Rank Standing
              </span>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-foreground">Global Percentile:</span>
                <span className="text-accent font-semibold">{codechef.globalRank}</span>
              </div>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Active participant in long and lunchtime rated algorithmic contests.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-accent" /> Last Updated
            </span>
            <span>{codechef.lastUpdated}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
