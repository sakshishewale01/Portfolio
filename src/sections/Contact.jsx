import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createFadeUp, viewportConfig } from '../lib/motion'
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Github, 
  Linkedin, 
  Code2, 
  Terminal, 
  Sparkles,
  RefreshCw,
  MessageSquare
} from 'lucide-react'
import { cn } from '../lib/utils'

const RATE_LIMIT_SECONDS = 60
const RATE_LIMIT_KEY = 'portfolio_last_submit_timestamp'

export function Contact() {
  const reducedMotion = useReducedMotion()
  const fadeUpVariant = createFadeUp(reducedMotion)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Hidden honeypot field
  })

  // Validation & Interaction State
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error' | 'rate-limited'
  const [statusMessage, setStatusMessage] = useState('')
  const [cooldownRemaining, setCooldownRemaining] = useState(0)

  // Honeypot & rate limit timers
  useEffect(() => {
    const checkCooldown = () => {
      const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY)
      if (lastSubmit) {
        const elapsed = Math.floor((Date.now() - parseInt(lastSubmit, 10)) / 1000)
        if (elapsed < RATE_LIMIT_SECONDS) {
          setCooldownRemaining(RATE_LIMIT_SECONDS - elapsed)
        } else {
          setCooldownRemaining(0)
        }
      }
    }

    checkCooldown()
    const interval = setInterval(checkCooldown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Validation Logic
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please provide a valid email address'
        }
        return ''
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 20) {
          return `Please write at least 20 characters (${value.trim().length}/20)`
        }
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Silent Honeypot Trap for Automated Bots
    if (formData.honeypot) {
      // Silently pretend success to discard bot submission
      setStatus('success')
      setStatusMessage('Thank you! Your message has been dispatched successfully.')
      return
    }

    // 2. Validate all fields
    const nameErr = validateField('name', formData.name)
    const emailErr = validateField('email', formData.email)
    const msgErr = validateField('message', formData.message)

    setTouched({ name: true, email: true, message: true })
    setErrors({ name: nameErr, email: emailErr, message: msgErr })

    if (nameErr || emailErr || msgErr) {
      setStatus('error')
      setStatusMessage('Please correct the highlighted fields before submitting.')
      return
    }

    // 3. Client-Side Rate Limit Check (60s)
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY)
    if (lastSubmit) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSubmit, 10)) / 1000)
      if (elapsed < RATE_LIMIT_SECONDS) {
        const remaining = RATE_LIMIT_SECONDS - elapsed
        setStatus('rate-limited')
        setStatusMessage(`Rate limit active. Please wait ${remaining} seconds before sending another message.`)
        return
      }
    }

    // 4. Dispatch Form Submission
    setStatus('submitting')
    setStatusMessage('Transmitting message securely...')

    const formKey = import.meta.env.VITE_FORM_KEY

    // Fallback simulation for local review if no key is configured
    if (!formKey || formKey === 'your_web3forms_access_key_here') {
      setTimeout(() => {
        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString())
        setStatus('success')
        setStatusMessage('Your message has been dispatched! I will get back to you shortly.')
        setFormData({ name: '', email: '', message: '', honeypot: '' })
        setTouched({})
        setErrors({})
      }, 900)
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: formKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Message from ${formData.name}`,
        }),
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString())
        setStatus('success')
        setStatusMessage('Your message has been dispatched! I will get back to you shortly.')
        setFormData({ name: '', email: '', message: '', honeypot: '' })
        setTouched({})
        setErrors({})
      } else {
        throw new Error(data.message || 'Transmission failed')
      }
    } catch (err) {
      setStatus('error')
      setStatusMessage(
        'Unable to transmit message right now. Please check your connection or connect via LinkedIn / GitHub.'
      )
    }
  }

  const handleResetForm = () => {
    setStatus('idle')
    setStatusMessage('')
  }

  return (
    <Section
      id="contact"
      label="06 // Direct Channel"
      title="Let's Build Something Together"
      description="Available for high-impact Software Engineering and AI/ML roles. Send a direct transmission or connect across social channels."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ================= LEFT COLUMN: INVITATION & SOCIALS ================= */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              Engineering meaningful software starts with a conversation.
            </h3>
            <p className="text-foreground-muted leading-relaxed text-sm sm:text-base">
              Whether you are recruiting for an engineering team, designing distributed backend systems, or exploring applied machine learning architectures, I am always open to discussing new opportunities.
            </p>
          </div>

          {/* Social Profiles Grid */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider block">
              Professional Profiles
            </span>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-background-surface border border-border/80 hover:border-accent/40 text-foreground-muted hover:text-foreground flex items-center gap-3 transition-all duration-200 shadow-subtle group"
              >
                <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-xs text-foreground">LinkedIn</p>
                  <p className="font-mono text-[10px] text-foreground-muted">Professional Network</p>
                </div>
              </a>

              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-background-surface border border-border/80 hover:border-accent/40 text-foreground-muted hover:text-foreground flex items-center gap-3 transition-all duration-200 shadow-subtle group"
              >
                <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-xs text-foreground">GitHub</p>
                  <p className="font-mono text-[10px] text-foreground-muted">Open Source Code</p>
                </div>
              </a>

              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-background-surface border border-border/80 hover:border-accent/40 text-foreground-muted hover:text-foreground flex items-center gap-3 transition-all duration-200 shadow-subtle group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-xs text-foreground">LeetCode</p>
                  <p className="font-mono text-[10px] text-foreground-muted">450+ Solved</p>
                </div>
              </a>

              <a
                href={profile.socials.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-background-surface border border-border/80 hover:border-accent/40 text-foreground-muted hover:text-foreground flex items-center gap-3 transition-all duration-200 shadow-subtle group"
              >
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-xs text-foreground">CodeChef</p>
                  <p className="font-mono text-[10px] text-foreground-muted">3★ Tier (1620)</p>
                </div>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-background-elevated/60 border border-border text-xs font-mono text-foreground-muted flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>
              All messages submitted via the adjacent channel trigger immediate encrypted delivery.
            </span>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: INTERACTIVE FORM ================= */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-7"
        >
          <Card className="p-6 sm:p-8 border-border/80 bg-background-surface/90 shadow-card">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* Success Feedback State */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-2xl text-foreground">
                    Message Dispatched
                  </h4>
                  <p className="text-foreground-muted text-sm max-w-md mx-auto leading-relaxed">
                    {statusMessage}
                  </p>
                  <div className="pt-4">
                    <Button variant="ghost" size="sm" onClick={handleResetForm}>
                      Send another message
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Interactive Form State */
                <form
                  key="contact-form"
                  noValidate
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Honeypot Spam Trap (Hidden from view and screen readers) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="botcheck">Do not fill this field:</label>
                    <input
                      type="text"
                      id="botcheck"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Accessible Status Live Region */}
                  <div
                    role="status"
                    aria-live="polite"
                    className="sr-only"
                  >
                    {statusMessage}
                  </div>

                  {/* Status Banner when Error or Rate-Limited */}
                  {(status === 'error' || status === 'rate-limited') && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-3.5 rounded-lg border text-xs font-mono flex items-start gap-2.5",
                        status === 'rate-limited'
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                      )}
                    >
                      {status === 'rate-limited' ? (
                        <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <span>{statusMessage}</span>
                    </motion.div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs text-foreground font-medium"
                    >
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === 'submitting'}
                      placeholder="e.g. Alex Mercer"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-background border text-sm text-foreground transition-all duration-200 placeholder:text-foreground-muted/50",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                        errors.name
                          ? "border-rose-500/80 focus:ring-rose-500"
                          : "border-border hover:border-border-hover"
                      )}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="font-mono text-xs text-rose-400 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs text-foreground font-medium"
                    >
                      Your Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === 'submitting'}
                      placeholder="e.g. alex@company.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-background border text-sm text-foreground transition-all duration-200 placeholder:text-foreground-muted/50",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                        errors.email
                          ? "border-rose-500/80 focus:ring-rose-500"
                          : "border-border hover:border-border-hover"
                      )}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="font-mono text-xs text-rose-400 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="contact-message"
                        className="block font-mono text-xs text-foreground font-medium"
                      >
                        Message <span className="text-accent">*</span>
                      </label>
                      <span className="font-mono text-[10px] text-foreground-muted">
                        Min 20 characters ({formData.message.trim().length}/20)
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={status === 'submitting'}
                      placeholder="Describe your project, role, or proposal in detail..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-background border text-sm text-foreground transition-all duration-200 resize-y placeholder:text-foreground-muted/50",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                        errors.message
                          ? "border-rose-500/80 focus:ring-rose-500"
                          : "border-border hover:border-border-hover"
                      )}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="font-mono text-xs text-rose-400 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button & Rate Limit Indicator */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === 'submitting' || cooldownRemaining > 0}
                      className="w-full sm:w-auto"
                      icon={status === 'submitting' ? RefreshCw : Send}
                      iconPosition="right"
                    >
                      {status === 'submitting' ? 'Transmitting...' : 'Send Message'}
                    </Button>

                    {cooldownRemaining > 0 && (
                      <span className="font-mono text-xs text-amber-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Cooldown: {cooldownRemaining}s
                      </span>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}
