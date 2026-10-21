import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Reusable Button primitive with primary & ghost variants.
 * Features keyboard focus rings, accessible states, and micro-interactions.
 */
export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  as: Component = 'button',
  href,
  disabled = false,
  ...props
}, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none group"

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-subtle hover:shadow-glow active:scale-[0.98]",
    ghost: "bg-transparent text-foreground-muted hover:text-foreground border border-border hover:border-border-hover hover:bg-background-elevated active:scale-[0.98]",
  }

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5 tracking-wide",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-2.5 gap-2.5",
  }

  const combinedClassName = cn(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  )

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className={cn(
          "transition-transform duration-200 group-hover:scale-110",
          size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"
        )} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={cn(
          "transition-transform duration-200 group-hover:translate-x-0.5",
          size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"
        )} />
      )}
    </>
  )

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={combinedClassName}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <Component
      ref={ref}
      disabled={disabled}
      className={combinedClassName}
      {...props}
    >
      {content}
    </Component>
  )
})

Button.displayName = 'Button'
