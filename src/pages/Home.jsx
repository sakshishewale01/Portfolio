import React from 'react'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Skills } from '../sections/Skills'
import { Projects } from '../sections/Projects'
import { Experience } from '../sections/Experience'
import { Contact } from '../sections/Contact'

export function Home() {
  return (
    <div className="w-full">
      {/* 1. Production Hero Section */}
      <Hero />

      {/* 2. Production About Section */}
      <About />

      {/* 3. Production Skills Bento Grid Section */}
      <Skills />

      {/* 4. Production Projects Section */}
      <Projects />

      {/* 5. Production Experience & Milestones Section */}
      <Experience />

      {/* 6. Production Contact Section */}
      <Contact />
    </div>
  )
}
