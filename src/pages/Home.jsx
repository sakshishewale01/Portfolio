import React from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Skills } from '../sections/Skills'
import { Projects } from '../sections/Projects'
import { Experience } from '../sections/Experience'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { profile } from '../data/profile'
import { useLenis } from '../components/layout/SmoothScroll'
import { 
  ArrowDown, 
  Mail
} from 'lucide-react'

export function Home() {
  const { scrollTo } = useLenis()

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

      {/* 6. Contact Placeholder Section */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center relative"
      >
        <Section
          label="06 // Collaboration"
          title="Get In Touch"
          description="Open for software engineering and AI/ML internship / full-time opportunities."
          align="center"
          badgeVariant="default"
        >
          <div className="max-w-xl mx-auto w-full">
            <Card className="space-y-5 text-center">
              <div className="flex items-center justify-center">
                <Badge variant="accent" dot>
                  #contact &bull; Active Terminal
                </Badge>
              </div>

              <p className="text-sm text-foreground-muted leading-relaxed">
                Reach out for software development or AI engineering roles. All section scroll spies and Lenis anchors are verified.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <Button
                  as="a"
                  href={`mailto:${profile.email}`}
                  variant="primary"
                  size="md"
                  icon={Mail}
                >
                  Send Direct Inquiry
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => scrollTo('#home', { duration: 1.5 })}
                >
                  Return to #home
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </section>
    </div>
  )
}
