import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { PageTransition } from './components/layout/PageTransition'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { NotFound } from './pages/NotFound'
import { useReducedMotion } from './hooks/useReducedMotion'

/**
 * ScrollToTop helper on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppContent() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    // Disable smooth scroll interception if reduced motion is preferred
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [reducedMotion])

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/30 selection:text-white">
      {/* Subtle Grid and Noise Atmosphere Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        {/* Ambient Top Glow Spotlight */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <ScrollToTop />
      
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Page Routing with Transition Shell */}
      <main className="relative z-10 flex-grow">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
