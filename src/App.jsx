import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PageLoader } from './components/ui/PageLoader'

// Code-split routes with React.lazy for high-performance chunking
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(m => ({ default: m.ProjectDetail })))
const DesignPreview = lazy(() => import('./pages/DesignPreview').then(m => ({ default: m.DesignPreview })))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))

/**
 * Main Application Shell configuring React Router routes inside RootLayout and ErrorBoundary
 */
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="projects/:slug" element={<ProjectDetail />} />
              <Route path="design" element={<DesignPreview />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
