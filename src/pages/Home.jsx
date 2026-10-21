import React from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { experience } from '../data/experience'
import { skillCategories } from '../data/skills'
import { useLenis } from '../components/layout/SmoothScroll'
import { 
  ArrowDown, 
  ArrowUpRight, 
  Palette, 
  Sparkles, 
  Terminal, 
  Briefcase, 
  FolderGit2, 
  User, 
  Mail,
  ExternalLink
} from 'lucide-react'

export function Home() {
  const { scrollTo } = useLenis()

  return (
    <div className="w-full">
      {/* 1. Production Hero Section */}
      <Hero />

      {/* 2. About Placeholder Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center relative border-b border-border/40 bg-background-surface/20"
      >
        <Section
          label="02 // Background"
          title="About Sakshi"
          description={profile.bio}
          align="center"
          badgeVariant="default"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  <span className="font-heading font-semibold text-foreground text-sm">
                    {profile.fullName} &bull; {profile.location}
                  </span>
                </div>
                <Badge variant="outline" size="sm">#about</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {profile.stats.map((stat, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background border border-border">
                    <p className="font-mono text-[11px] text-foreground-muted">{stat.label}</p>
                    <p className="font-heading font-bold text-foreground text-sm mt-0.5">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ArrowDown}
                  iconPosition="right"
                  onClick={() => scrollTo('#skills', { duration: 1.2 })}
                >
                  Next: #skills
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </section>

      {/* 3. Skills Placeholder Section */}
      <section
        id="skills"
        className="min-h-screen flex flex-col justify-center items-center relative border-b border-border/40"
      >
        <Section
          label="03 // Capabilities"
          title="Technical Competencies"
          description="Grouped inventory across AI/ML engineering, systems architecture, and fluid frontend development."
          align="center"
          badgeVariant="accent"
        >
          <div className="max-w-3xl mx-auto w-full">
            <Card className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span className="font-heading font-semibold text-foreground text-sm">
                    Categorized Skills ({skillCategories.length} Domains)
                  </span>
                </div>
                <Badge variant="accent" size="sm">#skills</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories.map((cat) => (
                  <div key={cat.category} className="p-3.5 rounded-lg bg-background-elevated/60 border border-border">
                    <p className="font-heading font-semibold text-xs text-foreground mb-1">
                      {cat.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {cat.skills.slice(0, 4).map((s) => (
                        <span key={s.name} className="font-mono text-[10px] px-2 py-0.5 rounded bg-background text-foreground-muted border border-border/80">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ArrowDown}
                  iconPosition="right"
                  onClick={() => scrollTo('#projects', { duration: 1.2 })}
                >
                  Next: #projects
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </section>

      {/* 4. Projects Placeholder Section */}
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center items-center relative border-b border-border/40 bg-background-surface/20"
      >
        <Section
          label="04 // Engineering"
          title="Featured Projects"
          description="Distributed systems, Web3 social architectures, and AI telemetry platforms."
          align="center"
          badgeVariant="default"
        >
          <div className="max-w-3xl mx-auto w-full space-y-4">
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-accent" />
                  <span className="font-heading font-semibold text-foreground text-sm">
                    {projects.length} Engineered Systems
                  </span>
                </div>
                <Badge variant="accent" size="sm">#projects</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.slice(0, 4).map((proj) => (
                  <div key={proj.slug} className="p-3 rounded-lg bg-background border border-border flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-xs text-foreground">{proj.title}</p>
                      <p className="font-mono text-[10px] text-foreground-muted">{proj.tech.slice(0, 2).join(', ')}</p>
                    </div>
                    <Link
                      to={`/projects/${proj.slug}`}
                      className="text-accent hover:text-accent-hover text-xs font-mono inline-flex items-center gap-1"
                    >
                      <span>Route</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ArrowDown}
                  iconPosition="right"
                  onClick={() => scrollTo('#experience', { duration: 1.2 })}
                >
                  Next: #experience
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </section>

      {/* 5. Experience Placeholder Section */}
      <section
        id="experience"
        className="min-h-screen flex flex-col justify-center items-center relative border-b border-border/40"
      >
        <Section
          label="05 // Trajectory"
          title="Work Experience"
          description="Industrial internships and systems engineering contributions."
          align="center"
          badgeVariant="accent"
        >
          <div className="max-w-2xl mx-auto w-full">
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent" />
                  <span className="font-heading font-semibold text-foreground text-sm">
                    {experience[0]?.role} &bull; {experience[0]?.company}
                  </span>
                </div>
                <Badge variant="accent" size="sm">#experience</Badge>
              </div>

              <p className="text-xs text-foreground-muted font-mono">
                {experience[0]?.period} &bull; {experience[0]?.location}
              </p>

              <p className="text-sm text-foreground-muted leading-relaxed">
                {experience[0]?.description}
              </p>

              <div className="flex justify-end pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ArrowDown}
                  iconPosition="right"
                  onClick={() => scrollTo('#contact', { duration: 1.2 })}
                >
                  Next: #contact
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </section>

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
