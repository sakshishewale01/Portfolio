import React, { useState } from 'react'
import { cn } from '../../lib/utils'

/**
 * Robust, accessible Photo component with blur-up placeholder,
 * zero Cumulative Layout Shift, and a graceful monogram fallback if image fails to load.
 */
export function Photo({
  src,
  alt = "Portrait of Sakshi",
  width = 1200,
  height = 1500,
  className,
  imageClassName,
  priority = false,
  fallbackInitials = "SS",
  aspectRatio = "aspect-[4/5]",
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-background-elevated select-none",
        aspectRatio,
        className
      )}
    >
      {/* Low-Res Shimmer / Ambient Blur Placeholder */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-tr from-background-surface via-background-elevated to-background-surface transition-opacity duration-700",
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="w-full h-full animate-pulse opacity-40 bg-accent/10" />
      </div>

      {!error ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm",
            imageClassName
          )}
        />
      ) : (
        /* Graceful Fallback: Initials Avatar in Gradient Circle */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background-surface via-background-elevated to-background border border-border p-6 text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-accent/30 via-accent/10 to-transparent border-2 border-accent/40 flex items-center justify-center shadow-glow mb-3">
            <span className="font-heading font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
              {fallbackInitials}
            </span>
          </div>
          <span className="font-mono text-xs text-foreground font-semibold">
            Sakshi Shewale
          </span>
          <span className="font-mono text-[10px] text-foreground-muted mt-0.5">
            Software & AI/ML Engineer
          </span>
        </div>
      )}
    </div>
  )
}
