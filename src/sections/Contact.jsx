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
  Terminal,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  Briefcase,
  ChevronDown,
} from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Editorial Closing & Connection Hub (`id="contact"`)
 * Completely redesigned:
 * - Refined editorial typography with sculptural headline & balanced spacing
 * - Two complementary panels: Direct CTAs + Communication Ledger on left, Sleek Message Composer on right
 * - Functional links to GitHub, LinkedIn, LeetCode, CodeChef, and pre-filled email client
 * - Anti-bot honeypot & 60-second client-side rate limiting
 * - STRICT PRIVACY: Zero raw email addresses or phone numbers rendered in visible DOM text.
 */
export function Contact() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Internship Opportunity',
    message: '',
    website_trap: '', // Anti-bot honeypot
  })

  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedDraft, setCopiedDraft] = useState(false)
  const [submissionState, setSubmissionState] = useState('idle') // 'idle' | 'opened' | 'rate-limited'
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0)

  // Internal destination address retrieved without rendering plain string in DOM
  const getDestination = () => {
    return profile.email || 'sakshishewale05' + '@' + 'gmail.com'
  }

  const reasons = [
    'Internship Opportunity',
    'Project Collaboration',
    'Technical Discussion',
    'General Inquiry',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Copy email to clipboard without printing plain text in DOM
  const handleCopyEmail = async () => {
    const emailToCopy = getDestination()
    try {
      await navigator.clipboard.writeText(emailToCopy)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2400)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = emailToCopy
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2400)
    }
  }

  // Construct structured mailto URI
  const constructMailtoUri = () => {
    const destination = getDestination()
    const subject = encodeURIComponent(`[${formData.reason}] Note from ${formData.name}`)
    const bodyContent = `Name: ${formData.name}\nSender Email: ${formData.email}\nTopic: ${formData.reason}\n\nMessage:\n${formData.message}`
    const body = encodeURIComponent(bodyContent)
    return `mailto:${destination}?subject=${subject}&body=${body}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Silent honeypot check
    if (formData.website_trap) {
      setSubmissionState('opened')
      return
    }

    // 2. Client-side 60s rate limit check
    const lastSubmitTime = localStorage.getItem('sakshi_last_contact_ts')
    const now = Date.now()
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 60000) {
      const remainingSec = Math.ceil((60000 - (now - parseInt(lastSubmitTime, 10))) / 1000)
      setRateLimitSeconds(remainingSec)
      setSubmissionState('rate-limited')
      return
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    localStorage.setItem('sakshi_last_contact_ts', now.toString())
    const mailtoUri = constructMailtoUri()
    window.location.href = mailtoUri
    setSubmissionState('opened')
  }

  // Copy structured message fallback
  const handleCopyDraft = async () => {
    const draftContent = `Subject: [${formData.reason}] Message from ${formData.name}\nFrom: ${formData.email}\n\n${formData.message}`
    try {
      await navigator.clipboard.writeText(draftContent)
      setCopiedDraft(true)
      setTimeout(() => setCopiedDraft(false), 2400)
    } catch {
      setCopiedDraft(true)
      setTimeout(() => setCopiedDraft(false), 2400)
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full overflow-hidden"
    >
      {/* Subtle Low-Contrast Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f2312_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2312_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"
      />

      {/* ============================================================== */}
      {/* 1. EDITORIAL HEADER & INVITATION                               */}
      {/* ============================================================== */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-14 md:mb-18 max-w-3xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent/10 border border-accent/30 text-accent">
            06 // GET IN TOUCH
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to 2027 Internships</span>
          </span>
        </div>

        <div className="relative inline-block">
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight uppercase leading-[1.08]">
            LET'S BUILD SOMETHING MEANINGFUL.
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="h-[2px] w-full bg-gradient-to-r from-accent via-accent-secondary to-transparent origin-left mt-3 sm:mt-4"
          />
        </div>

        <p className="mt-5 text-foreground-muted text-sm sm:text-base leading-relaxed">
          I'm a third-year computer science student building practical software systems and practicing algorithmic problem-solving in C++. 
          I am actively preparing for software engineering internships in 2027 and welcome discussions regarding technical roles, collaborative projects, or software architecture.
        </p>
      </motion.div>

      {/* ============================================================== */}
      {/* 2. REFINED TWO-PANEL COMPOSITION                               */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Panel: Direct Channels & Action Hub */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-5 space-y-6"
        >
          {/* Action Card: Direct Primary & Secondary CTAs */}
          <div className="rounded-2xl border border-border/80 bg-background-surface/80 backdrop-blur-md p-6 space-y-4 shadow-card">
            <h3 className="font-heading font-semibold text-base text-foreground">
              Direct Communication
            </h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Reach out directly via your preferred platform. I read and respond promptly to recruiters and collaborators.
            </p>

            {/* Primary Contact CTA: Launch Email Client */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  const mailto = `mailto:${getDestination()}?subject=${encodeURIComponent('[Internship Opportunity] Hello Sakshi')}`
                  window.location.href = mailto
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground text-xs font-semibold font-mono transition-all duration-200 shadow-glow hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="w-4 h-4" />
                <span>Launch Direct Email Draft</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Secondary CTA: GitHub Repositories */}
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background-elevated hover:bg-background border border-border hover:border-accent/40 text-foreground text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Github className="w-4 h-4 text-accent" />
                <span>Explore GitHub Repositories (34+)</span>
              </a>

              {/* Discrete Copy Email Action */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-foreground-muted hover:text-foreground transition-colors hover:bg-background/60"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Email Address Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email Address to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Location & Response Metadata */}
          <div className="p-4 rounded-xl border border-border/70 bg-background-surface/50 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{profile.location || 'Pune, India'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-foreground-muted">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>IST (UTC+5:30)</span>
              </span>
            </div>
            <p className="text-[11px] text-foreground-muted border-t border-border/40 pt-2 leading-relaxed">
              Third-year B.Tech Computer Science student at MIT Academy of Engineering, Pune.
            </p>
          </div>

          {/* Verified Developer Channels */}
          <div className="space-y-2 pt-1">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
              Professional &amp; Problem Solving Profiles
            </span>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between p-2.5 rounded-xl bg-background-surface/80 hover:bg-background border border-border hover:border-accent/40 text-xs font-mono text-foreground-muted hover:text-foreground transition-all duration-200 group"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-accent" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-foreground-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between p-2.5 rounded-xl bg-background-surface/80 hover:bg-background border border-border hover:border-amber-400/40 text-xs font-mono text-foreground-muted hover:text-foreground transition-all duration-200 group"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>LeetCode (51+)</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-foreground-muted group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Panel: Refined Direct Message Composer */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-7"
        >
          <div className="rounded-2xl border border-border/80 bg-[#0E0E14] p-6 sm:p-8 shadow-card relative">
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5 mb-6">
              <div>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground">
                  Send a Message
                </h3>
                <p className="text-xs text-foreground-muted mt-0.5">
                  Direct inquiry form for opportunities and technical collaboration.
                </p>
              </div>

              <span className="font-mono text-[10px] text-accent/80 px-2 py-0.5 rounded bg-accent/10 border border-accent/20 hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-accent" />
                <span>Protected</span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              {submissionState === 'rate-limited' ? (
                <motion.div
                  key="rate-limit"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="py-4 space-y-4"
                >
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                    <p className="text-xs font-semibold font-mono text-amber-400">
                      Message Dispatched Recently
                    </p>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      Please wait {rateLimitSeconds} seconds before sending another message, or connect directly via LinkedIn or GitHub.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmissionState('idle')}
                    className="px-4 py-2 rounded-lg bg-background-elevated border border-border text-xs font-mono text-foreground hover:text-accent transition-colors"
                  >
                    Return to form
                  </button>
                </motion.div>
              ) : submissionState === 'opened' ? (
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
                      Your default mail application has been prompted with your message pre-formatted.
                    </p>
                    <p className="text-[11px] text-foreground-muted/80">
                      If your mail application did not open automatically, copy your message text below to send via your preferred service.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href={constructMailtoUri()}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Re-launch Mail App</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-background-elevated hover:bg-background border border-border text-xs font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Note Draft</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Note Text</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmissionState('idle')}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-mono text-foreground-muted hover:text-foreground transition-colors ml-auto focus-visible:outline-none focus-visible:underline"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Edit message</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-4">
                  {/* Anti-bot Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_trap">Leave this blank</label>
                    <input
                      id="website_trap"
                      name="website_trap"
                      type="text"
                      tabIndex="-1"
                      autoComplete="off"
                      value={formData.website_trap}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-sender-name" className="block text-xs font-mono text-foreground-muted">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-sender-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-sender-email" className="block text-xs font-mono text-foreground-muted">
                        Your Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-sender-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Reason for Reaching Out Select */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-reason" className="block text-xs font-mono text-foreground-muted">
                      Topic / Reason for reaching out
                    </label>
                    <div className="relative">
                      <select
                        id="contact-reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-foreground text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors cursor-pointer pr-10"
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
                    <label htmlFor="contact-message" className="block text-xs font-mono text-foreground-muted">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Sakshi, I'd like to discuss an opportunity / project with you..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-foreground text-sm placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground text-sm font-semibold font-mono transition-all duration-200 shadow-glow hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent w-full sm:w-auto"
                    >
                      <span>Dispatch Message</span>
                      <Send className="w-4 h-4" />
                    </button>

                    <span className="text-[11px] font-mono text-foreground-muted flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                      <span>Zero spam &bull; Protected routing</span>
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
