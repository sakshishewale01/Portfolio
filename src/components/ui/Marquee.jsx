import React from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

/**
 * Marquee component for infinite horizontal ticker
 * Pure CSS animation with seamless loop and edge fade masks.
 */
export function Marquee({
  items = [],
  className,
  itemClassName,
}) {
  const reducedMotion = useReducedMotion()

  // Duplicate items twice to ensure unbroken loop
  const loopItems = [...items, ...items]

  if (reducedMotion) {
    return (
      <div className={cn("w-full overflow-x-auto py-2 flex flex-wrap justify-center gap-2", className)}>
        {items.map((item, idx) => (
          <span
            key={idx}
            className="font-mono text-xs px-3 py-1 rounded-full bg-background-elevated border border-border text-foreground-muted"
          >
            {item}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none py-3 group",
        className
      )}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div className="animate-marquee flex items-center gap-3">
        {loopItems.map((item, idx) => (
          <span
            key={idx}
            className={cn(
              "font-mono text-xs px-3.5 py-1.5 rounded-full bg-background-surface/80 hover:bg-accent/10 border border-border/70 hover:border-accent/40 text-foreground-muted hover:text-foreground transition-colors duration-200 whitespace-nowrap cursor-default shadow-subtle",
              itemClassName
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
