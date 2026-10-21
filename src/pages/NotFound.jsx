import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Terminal } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('404 Not Found | Sakshi Shewale', 'The requested page could not be located.')

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center space-y-6 border-border/80 bg-background-surface/80 shadow-card">
          <div className="space-y-2">
            <div className="flex justify-center">
              <Badge variant="accent" dot size="sm">
                404 // Route Desynchronized
              </Badge>
            </div>
            
            <h1 className="font-heading font-extrabold text-6xl sm:text-7xl text-foreground tracking-tighter">
              404
            </h1>

            <h2 className="font-heading font-semibold text-lg text-foreground">
              Endpoint Not Located
            </h2>

            <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
              The target path or asset you requested does not exist in the routing table.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-background-elevated border border-border text-left font-mono text-[11px] text-foreground-muted flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span className="truncate">ERR_ROUTE_NOT_FOUND: {typeof window !== 'undefined' ? window.location.pathname : 'path'}</span>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              as={Link}
              to="/"
              variant="primary"
              size="md"
              icon={ArrowLeft}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
