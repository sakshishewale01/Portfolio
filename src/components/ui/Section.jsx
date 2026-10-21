import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Badge } from './Badge'
import { createFadeUp, viewportConfig } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Section wrapper primitive with structured label, fluid heading, and description.
 * Ensures semantic HTML structure across all page sections.
 */
export function Section({
  id,
  label,
  title,
  description,
  children,
  className,
  headerClassName,
  align = 'left',
  badgeVariant = 'accent',
  ...props
}) {
  const reduced = useReducedMotion()
  const fadeUpVariant = createFadeUp(reduced)

  return (
    <section
      id={id}
      className={cn("relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full", className)}
      {...props}
    >
      {(label || title || description) && (
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={cn(
            "mb-12 md:mb-16",
            align === 'center' ? "text-center flex flex-col items-center" : "text-left",
            headerClassName
          )}
        >
          {label && (
            <div className="mb-3">
              <Badge variant={badgeVariant} size="sm">
                {label}
              </Badge>
            </div>
          )}

          {title && (
            <h2 className="font-heading font-bold text-fluid-h2 tracking-tight text-foreground">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-3 text-foreground-muted text-fluid-body max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      )}

      {children}
    </section>
  )
}
