import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { Section } from '../components/ui/Section'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Section label="404" title="Project Not Found" description="The requested project case study does not exist.">
        <Link to="/">
          <Button variant="ghost" icon={ArrowLeft} iconPosition="left">
            Back to Home
          </Button>
        </Link>
      </Section>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <Section
        label={project.role}
        title={project.title}
        description={project.tagline}
      >
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" icon={ArrowLeft} iconPosition="left">
              Back to Overview
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-fluid-h3 font-heading font-semibold text-foreground mb-3">
                Overview
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                {project.description}
              </p>
            </Card>

            <Card>
              <h3 className="text-fluid-h3 font-heading font-semibold text-foreground mb-4">
                Key Technical Highlights
              </h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-foreground-muted">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge key={t} variant="outline" size="sm">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <Button
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  className="w-full justify-start"
                  icon={Github}
                >
                  Source Repository
                </Button>
                <Button
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full justify-start"
                  icon={ExternalLink}
                >
                  Live Deployment
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  )
}
