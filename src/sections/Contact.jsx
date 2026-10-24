import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import {
  Send,
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Code2,
  ArrowUpRight,
  ChevronDown,
  RotateCcw,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Interactive 3D Floating Cube with CODE, BUILD, GROW faces
 * Pure CSS 3D transforms, lightweight, pauses on hover, respects reduced motion
 */
function Floating3DCube({ reducedMotion }) {
  // Face dimension: 72px width & height -> translateZ = 36px
  const halfSize = 36

  return (
    <div className="flex flex-col items-center justify-center pt-2 select-none">
      <div
        className="w-24 h-24 flex items-center justify-center [perspective:600px]"
        aria-hidden="true"
      >
        <div
          className={cn(
            'relative w-[72px] h-[72px] animate-cube-3d cursor-grab active:cursor-grabbing',
            reducedMotion && '[animation:none] [transform:rotateX(-16deg)_rotateY(32deg)]'
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Face - CODE */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#121218]/95 border border-accent/40 rounded-lg text-accent font-mono font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(142,114,255,0.15)] backdrop-blur-sm"
            style={{ transform: `translateZ(${halfSize}px)` }}
          >
            CODE
          </div>

          {/* Back Face - CODE */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#121218]/95 border border-accent/40 rounded-lg text-accent font-mono font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(142,114,255,0.15)] backdrop-blur-sm"
            style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
          >
            CODE
          </div>

          {/* Right Face - GROW */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#14141C]/95 border border-accent/40 rounded-lg text-accent font-mono font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(142,114,255,0.15)] backdrop-blur-sm"
            style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
          >
            GROW
          </div>

          {/* Left Face - GROW */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#14141C]/95 border border-accent/40 rounded-lg text-accent font-mono font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(142,114,255,0.15)] backdrop-blur-sm"
            style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
          >
            GROW
          </div>

          {/* Top Face - BUILD */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#161622]/95 border border-accent/50 rounded-lg text-foreground font-mono font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(142,114,255,0.2)] backdrop-blur-sm"
            style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
          >
            BUILD
          </div>

          {/* Bottom Face - BUILD */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#161622]/95 border border-accent/50 rounded-lg text-foreground font-mono font-bold text-xs tracking-widest shadow-[0_0_15px_rgba(142,114,255,0.2)] backdrop-blur-sm"
            style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
          >
            BUILD
          </div>
        </div>
      </div>

      {/* Subtle Breathing Shadow */}
      <div className="w-14 h-2 bg-accent/20 rounded-full blur-sm mt-1 pointer-events-none" />
      <span className="font-mono text-[10px] text-foreground-muted/70 tracking-widest uppercase mt-2">
        [ CODE &middot; BUILD &middot; GROW ]
      </span>
    </div>
  )
}

/**
 * Editorial, Interactive Contact Section (`id="contact"`)
 * Features:
 * - Oversized uppercase editorial headline with animated violet underline
 * - Balanced two-column layout (Personal contact panel on left, refined form panel on right)
 * - Prominent email card with working copy action and status feedback
 * - Understated availability indicator and verified social links
 * - Floating 3D rotating cube (CODE, BUILD, GROW)
 * - Technically honest mailto submission with clipboard fallback
 */
export function Contact() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Internship',
    message: '',
  })

  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState(false)
  const [submissionState, setSubmissionState] = useState('idle') // 'idle' | 'opened'

  const contactEmail = profile.email || 'sakshishewale05@gmail.com'

  const reasons = [
    'Internship',
    'Project Collaboration',
    'Technical Discussion',
    'Other',
  ]

  // Copy email to clipboard
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2400)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = contactEmail
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2400)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Construct structured mailto URL
  const constructMailtoUri = () => {
    const subject = encodeURIComponent(`[${formData.reason}] Note from ${formData.name}`)
    const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\nReason: ${formData.reason}\n\nMessage:\n${formData.message}`
    const body = encodeURIComponent(bodyContent)
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    const mailtoUri = constructMailtoUri()
    window.location.href = mailtoUri
    setSubmissionState('opened')
  }

  // Copy structured message fallback
  const handleCopyMessage = async () => {
    const messageDetails = `To: ${contactEmail}\nSubject: [${formData.reason}] Note from ${formData.name}\n\n${formData.message}\n\nSender Email: ${formData.email}`
    try {
      await navigator.clipboard.writeText(messageDetails)
      setCopiedMessage(true)
      setTimeout(() => setCopiedMessage(false), 2400)
    } catch {
      setCopiedMessage(true)
      setTimeout(() => setCopiedMessage(false), 2400)
    }
  }

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full overflow-hidden"
    >
      {/* Subtle Low-Contrast Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f2312_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2312_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      {/* ============================================================== */}
      {/* 1. SECTION HEADER: EDITORIAL OVERSIZED HEADLINE & UNDERLINE     */}
      {/* ============================================================== */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-14 md:mb-18 max-w-4xl"
      >
        {/* Eyebrow Label */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent/10 border border-accent/30 text-accent">
            07 // CONTACT
          </span>
        </div>

        {/* Large Editorial Headline */}
        <div className="relative inline-block">
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight uppercase leading-[1.08]">
            LET'S BUILD SOMETHING MEANINGFUL.
          </h2>

          {/* Thin Violet Underline Reveal */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="h-[2px] w-full bg-gradient-to-r from-accent via-accent/80 to-transparent origin-left mt-3 sm:mt-4"
          />
        </div>

        {/* Supporting Copy */}
        <p className="mt-5 text-foreground-muted text-sm sm:text-base max-w-2xl leading-relaxed">
          I'm a computer science student who enjoys building practical software and exploring new ideas.
          I'm open to software engineering internships, project collaborations, and meaningful technical conversations.
        </p>
      </motion.div>

      {/* ============================================================== */}
      {/* 2. TWO-COLUMN LAYOUT: CONTACT DETAILS & REFINED FORM PANEL     */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ============================================================== */}
        {/* LEFT COLUMN: PERSONAL CONTACT PANEL                            */}
        {/* ============================================================== */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-5 space-y-6"
        >
          {/* Short Introduction */}
          <div className="space-y-2">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Direct Channels
            </h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Drop an email directly or connect across developer platforms. I read all messages from recruiters, engineers, and collaborators.
            </p>
          </div>

          {/* Prominent Email Card */}
          <div className="rounded-xl border border-border/80 bg-background-surface/80 p-5 hover:border-accent/40 transition-colors shadow-xs group">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
                  DIRECT EMAIL
                </span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-mono text-sm sm:text-base font-semibold text-foreground hover:text-accent transition-colors truncate block mt-0.5 focus-visible:outline-none focus-visible:underline"
                  title={`Email ${contactEmail}`}
                >
                  {contactEmail}
                </a>
              </div>

              {/* Functional Copy Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={copiedEmail ? 'Email address copied' : 'Copy email address'}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  copiedEmail
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-background hover:bg-background-elevated border-border text-foreground-muted hover:text-foreground'
                )}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <span className="sr-only" aria-live="polite">
              {copiedEmail ? 'Email address copied to clipboard.' : ''}
            </span>
          </div>

          {/* Compact Availability Indicator */}
          <div className="p-3.5 rounded-xl border border-border/70 bg-background-surface/50 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-mono font-medium text-foreground">
                Open to Software Engineering Internships &middot; 2027
              </p>
              <p className="text-[11px] text-foreground-muted mt-0.5">
                Targeting summer technical roles and collaborative projects.
              </p>
            </div>
          </div>

          {/* Verified Social Links */}
          <div className="space-y-2 pt-1">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
              Profiles &amp; Code
            </span>

            <div className="flex flex-wrap gap-2">
              {profile.socials?.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-background-surface/80 hover:bg-background-surface border border-border/80 hover:border-accent/40 text-xs font-mono text-foreground-muted hover:text-foreground transition-all duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  <Github className="w-3.5 h-3.5 text-accent" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-foreground-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              {profile.socials?.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-background-surface/80 hover:bg-background-surface border border-border/80 hover:border-accent/40 text-xs font-mono text-foreground-muted hover:text-foreground transition-all duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  <Linkedin className="w-3.5 h-3.5 text-accent" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-foreground-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              {profile.socials?.leetcode && (
                <a
                  href={profile.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-background-surface/80 hover:bg-background-surface border border-border/80 hover:border-amber-500/40 text-xs font-mono text-foreground-muted hover:text-foreground transition-all duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>LeetCode</span>
                  <ArrowUpRight className="w-3 h-3 text-foreground-muted group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Floating 3D Cube Feature */}
          <div className="pt-2">
            <Floating3DCube reducedMotion={reducedMotion} />
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: REFINED CONTACT FORM PANEL                       */}
        {/* ============================================================== */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-7"
        >
          <div className="rounded-2xl border border-border/80 bg-[#111116] p-6 sm:p-8 shadow-card relative">
            <div className="mb-6">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                Send a Message
              </h3>
              <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                Tell me a little about what you'd like to discuss.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submissionState === 'opened' ? (
                /* Honest Draft Confirmation View */
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="py-4 space-y-4 text-center sm:text-left"
                >
                  <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-2">
                    <div className="flex items-center gap-2 text-accent font-semibold text-xs font-mono uppercase tracking-wider">
                      <Mail className="w-4 h-4" />
                      <span>Email Client Prompted</span>
                    </div>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      A pre-filled email draft has been generated for{' '}
                      <strong className="text-foreground font-mono">{contactEmail}</strong> with your note.
                    </p>
                    <p className="text-[11px] text-foreground-muted/80">
                      If your default email client didn't open automatically, you can copy the message details below or send an email directly.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href={constructMailtoUri()}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Re-open Email App</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-background-elevated hover:bg-background border border-border text-xs font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Message</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmissionState('idle')}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-mono text-foreground-muted hover:text-foreground transition-colors ml-auto focus-visible:outline-none focus-visible:underline"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Edit details</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Primary Contact Form */
                <form key="form" onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="editorial-contact-name" className="block text-xs font-mono text-foreground-muted">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="editorial-contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border/80 text-foreground text-sm placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="editorial-contact-email" className="block text-xs font-mono text-foreground-muted">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        id="editorial-contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border/80 text-foreground text-sm placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Reason for Reaching Out Select */}
                  <div className="space-y-1.5">
                    <label htmlFor="editorial-contact-reason" className="block text-xs font-mono text-foreground-muted">
                      Reason for reaching out
                    </label>
                    <div className="relative">
                      <select
                        id="editorial-contact-reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors cursor-pointer pr-10"
                      >
                        {reasons.map((r) => (
                          <option key={r} value={r} className="bg-background-surface text-foreground">
                            {r}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-foreground-muted pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="editorial-contact-message" className="block text-xs font-mono text-foreground-muted">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="editorial-contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Sakshi, I wanted to reach out regarding..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border/80 text-foreground text-sm placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Primary Violet Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-accent-foreground text-sm font-semibold transition-all duration-200 shadow-glow hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent w-full sm:w-auto"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </button>

                    <span className="text-[11px] font-mono text-foreground-muted">
                      Opens pre-filled email draft to {contactEmail}
                    </span>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
