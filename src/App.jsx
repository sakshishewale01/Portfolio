import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { DesignPreview } from './pages/DesignPreview'
import { NotFound } from './pages/NotFound'

/**
 * Main Application Shell configuring React Router routes inside RootLayout
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="design" element={<DesignPreview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
