import React, { useEffect, Suspense, lazy } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SmoothScroll, useLenis } from './SmoothScroll'
import { ScrollProgress } from './ScrollProgress'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { PageTransition } from './PageTransition'
import { ToastProvider } from '../../context/ToastContext'

// Lazy load progressive enhancement components so they do not impact initial render performance
const CustomCursor = lazy(() =>
  import('../ui/CustomCursor').then((module) => ({ default: module.CustomCursor }))
)
const KonamiConfetti = lazy(() =>
  import('../KonamiConfetti').then((module) => ({ default: module.KonamiConfetti }))
)

/**
 * Handles scroll restoration on route changes, supporting hash targets.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const { scrollTo } = useLenis()

  useEffect(() => {
    if (hash) {
      // Delay slightly to ensure destination DOM element is mounted
      const timer = setTimeout(() => {
        scrollTo(hash, { offset: -20, duration: 1.2 })
      }, 100)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, scrollTo])

  return null
}

/**
 * RootLayout shell wrapping all routes with smooth scrolling, navigation, progress bar, and footer.
 */
export function RootLayout() {
  return (
    <ToastProvider>
      <SmoothScroll>
        <div className="relative min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/30 selection:text-white">
          {/* Accessible Skip to Content Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:shadow-glow focus:outline-none focus:ring-2 focus:ring-white text-xs font-semibold"
          >
            Skip to main content
          </a>

          {/* Ambient Grid and Noise Atmosphere Background */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-grid opacity-70" />
            <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
            {/* Ambient Top Glow Spotlight */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />
          </div>

          {/* Top 2px Scroll Progress Bar */}
          <ScrollProgress />

          {/* Global Scroll and Hash Target Manager */}
          <ScrollManager />

          {/* Floating Navigation Pill */}
          <Navbar />

          {/* Routed Page Outlet with Smooth Transition */}
          <main id="main-content" tabIndex="-1" className="relative z-10 flex-grow flex flex-col focus:outline-none">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>

          {/* Global Minimal Footer */}
          <Footer />

          {/* Progressive Enhancement Layers (Lazy Loaded) */}
          <Suspense fallback={null}>
            <CustomCursor />
            <KonamiConfetti />
          </Suspense>
        </div>
      </SmoothScroll>
    </ToastProvider>
  )
}

