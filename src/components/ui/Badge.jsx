import React from 'react'
import { cn } from '../../lib/utils'

/**
 * Badge primitive for tags, tech stack badges, and status indicators.
 */
export function Badge({
  children,
  className,
  variant = 'default',
  dot = false,
  dotColor = 'bg-accent',
  size = 'md',
  ...props
}) {
  const baseStyles = "inline-flex items-center gap-1.5 font-mono uppercase tracking-wider rounded-full transition-colors select-none"

  const variants = {
    default: "bg-background-elevated/80 text-foreground-muted border border-border/80 hover:border-border-hover hover:text-foreground",
    accent: "bg-accent/10 text-accent border border-accent/25 hover:bg-accent/15",
    outline: "bg-transparent text-foreground-muted border border-border hover:border-accent/40 hover:text-foreground",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  }

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-medium",
    lg: "text-xs px-3 py-1.5 font-semibold",
  }

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotColor)} />
          <span className={cn("relative inline-flex rounded-full h-2 w-2", dotColor)} />
        </span>
      )}
      {children}
    </span>
  )
}
