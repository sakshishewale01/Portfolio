import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { Hero } from '../sections/Hero'

// Lazy-load below-the-fold sections for maximum performance, minimal DOM footprint, and low TBT
const About = lazy(() => import('../sections/About').then(m => ({ default: m.About })))
const Skills = lazy(() => import('../sections/Skills').then(m => ({ default: m.Skills })))
const Projects = lazy(() => import('../sections/Projects').then(m => ({ default: m.Projects })))
const Experience = lazy(() => import('../sections/Experience').then(m => ({ default: m.Experience })))
const Contact = lazy(() => import('../sections/Contact').then(m => ({ default: m.Contact })))

function LazySection({ id, children, minHeight = '500px' }) {
  const [shouldRender, setShouldRender] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    // If navigating directly to a section anchor, render immediately
    if (typeof window !== 'undefined' && window.location.hash === `#${id}`) {
      setShouldRender(true)
      return
    }

    if (!containerRef.current || shouldRender) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '450px 0px' }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [id, shouldRender])

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <Suspense fallback={<div style={{ minHeight }} className="w-full" />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight }} className="w-full" />
      )}
    </div>
  )
}

export function Home() {
  return (
    <div className="w-full">
      {/* 1. Critical LCP Hero Section (Synchronous) */}
      <Hero />

      {/* 2. Below-the-fold sections progressively rendered on scroll */}
      <LazySection id="about" minHeight="600px">
        <About />
      </LazySection>

      <LazySection id="skills" minHeight="550px">
        <Skills />
      </LazySection>

      <LazySection id="projects" minHeight="700px">
        <Projects />
      </LazySection>

      <LazySection id="experience" minHeight="650px">
        <Experience />
      </LazySection>

      <LazySection id="contact" minHeight="550px">
        <Contact />
      </LazySection>
    </div>
  )
}
