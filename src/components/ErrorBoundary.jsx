import React, { Component } from 'react'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled exception:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <Card className="p-8 text-center space-y-6 border-rose-500/30 bg-background-surface shadow-card">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-2">
                <Badge variant="outline" size="sm" className="border-rose-500/40 text-rose-400">
                  Exception Caught &bull; Safe Recovery
                </Badge>
                <h1 className="font-heading font-bold text-2xl text-foreground">
                  Application Encountered an Error
                </h1>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  A client-side execution fault occurred. The state has been isolated to prevent corruption.
                </p>
              </div>

              {this.state.error?.message && (
                <div className="p-3 rounded-lg bg-background-elevated border border-border text-left font-mono text-xs text-rose-300 overflow-x-auto">
                  {this.state.error.message}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  onClick={this.handleReload}
                  variant="primary"
                  size="md"
                  icon={RotateCcw}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Reload Page
                </Button>
                <Button
                  onClick={this.handleReset}
                  variant="secondary"
                  size="md"
                  icon={Home}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Return to Home
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
