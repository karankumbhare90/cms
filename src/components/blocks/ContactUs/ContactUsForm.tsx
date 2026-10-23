'use client'

import React, { useState } from 'react'
import { getThemeClass } from '@/utils/theme'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { QueryProvider } from '@/providers/QueryProvider'

const inputBase = [
  'w-full px-4 py-3 rounded-[6px]',
  'border bg-white',
  'text-[15px] text-[#111827] placeholder-[#9CA3AF]',
  'outline-none transition-all',
].join(' ')

const inputNormal = `${inputBase} border-[#D1D5DB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15`
const inputError = `${inputBase} border-[#EF4444] ring-2 ring-[#EF4444]/15`

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-[12px] text-[#EF4444] mt-1">{msg}</p>
}

function CircleItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-[1.5px] border-[#BFDBFE] bg-[#F0F7FF]">
        {icon}
      </div>
      <div>
        <p className="mt-0 text-[11px] font-bold tracking-widest uppercase mb-1 text-[#9CA3AF]">
          {label}
        </p>
        {children}
      </div>
    </div>
  )
}

interface FormFields {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(f: FormFields): FormErrors {
  const e: FormErrors = {}
  if (!f.name.trim()) e.name = 'Full name is required.'
  if (!f.email.trim()) e.email = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = 'Please enter a valid email address.'
  if (!f.message.trim()) e.message = 'Please enter your message.'
  return e
}

export const ContactUsFormContent: React.FC<any> = ({ settings, contactDetails }) => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const themeClass = getThemeClass(settings)
  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [globalError, setGlobalError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // TanStack React Query Mutation for Contact Form Submission
  const contactMutation = useMutation({
    mutationFn: async (payloadData: FormFields & { recaptchaToken: string }) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }
      return data
    },
    onSuccess: () => {
      setGlobalError('')
      setSubmitted(true)

      if (typeof window !== 'undefined') {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push({
          event: 'generate_lead',
          lead_type: 'contact_form',
          form_name: 'contact_us_form',
        })
      }
    },
    onError: (err: any) => {
      setGlobalError(err.message || 'Verification or sending failed. Please try again.')
    },
  })

  const set =
    (k: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [k]: e.target.value }))
      if (errors[k as keyof FormErrors]) setErrors((ev) => ({ ...ev, [k]: undefined }))
      if (globalError) setGlobalError('')
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) {
      setErrors(errs)
      setGlobalError('Please fix the errors above before submitting.')
      return
    }

    if (!executeRecaptcha) {
      setGlobalError('reCAPTCHA is still loading. Please try again.')
      return
    }

    try {
      const token = await executeRecaptcha('contact_form')
      contactMutation.mutate({ ...fields, recaptchaToken: token })
    } catch (err: any) {
      setGlobalError(err.message || 'reCAPTCHA token generation failed.')
    }
  }

  const renderSocialIcon = (social: any) => {
    const title = (social.title || social.icon || '').toLowerCase()
    if (title.includes('link') || title.includes('in')) {
      return (
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" className="text-[#2563EB]">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
    if (title.includes('twit') || title.includes('x')) {
      return (
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="text-[#2563EB]">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
    if (title.includes('face')) {
      return (
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" className="text-[#2563EB]">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
        </svg>
      )
    }
    if (title.includes('insta')) {
      return (
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" className="text-[#2563EB]">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
    return (
      <span className="text-[10px] text-[#2563EB] font-bold">
        {social.title?.charAt(0) || '•'}
      </span>
    )
  }

  return (
    <section className={`contact-us ${themeClass}`}>
      <div className="inner-wrap">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            {/* LEFT */}
            <div>
              <h2 className="text-[34px] md:text-[42px] font-extrabold text-[#0C1E33] leading-[1.15] mb-4">
                Let's Talk About
                <br />
                Your Project
              </h2>
              <p className="text-[16px] leading-[1.8] mb-10 text-[#4B5563]">
                Whether you have a quick question or want to discuss a complex monitoring
                requirement, we're here to help. Speak directly with a GEL engineer or send us a
                message.
              </p>

              <div className="flex flex-col gap-5">
                {contactDetails?.phone && (
                  <CircleItem
                    label="Phone"
                    icon={
                      <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                        <path
                          d="M3 3.5h3.5l1.25 3-1.75 1.25A9 9 0 0 0 9.25 11l1.25-1.75 3 1.25V14A1 1 0 0 1 12.5 15C6.25 15 1.5 10.25 1.5 4A1 1 0 0 1 2.5 3H3z"
                          stroke="#2563EB"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  >
                    <a
                      href={`tel:${contactDetails.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-[16px] font-semibold text-[#111827] hover:text-[#2563EB] transition-colors"
                    >
                      {contactDetails.phone}
                    </a>
                  </CircleItem>
                )}

                {contactDetails?.email && (
                  <CircleItem
                    label="Email"
                    icon={
                      <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                        <rect
                          x="1.5"
                          y="3.5"
                          width="15"
                          height="11"
                          rx="1.5"
                          stroke="#2563EB"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M1.5 5.5l7.5 5 7.5-5"
                          stroke="#2563EB"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  >
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="text-[16px] font-semibold text-[#111827] hover:text-[#2563EB] transition-colors"
                    >
                      {contactDetails.email}
                    </a>
                  </CircleItem>
                )}

                {contactDetails?.address && (
                  <CircleItem
                    label="Address"
                    icon={
                      <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                        <circle cx="9" cy="9" r="7.5" stroke="#2563EB" strokeWidth="1.5" />
                        <path
                          d="M9 5v4.5l3 2"
                          stroke="#2563EB"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  >
                    {contactDetails.addressUrl ? (
                      <a
                        href={contactDetails.addressUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[16px] font-semibold text-[#111827] hover:text-[#2563EB] transition-colors whitespace-pre-line"
                      >
                        {contactDetails.address}
                      </a>
                    ) : (
                      <p className="mt-0 text-[16px] font-semibold text-[#111827] whitespace-pre-line">
                        {contactDetails.address}
                      </p>
                    )}
                  </CircleItem>
                )}

                {contactDetails?.socialLinks && contactDetails.socialLinks.length > 0 && (
                  <CircleItem
                    label="Follow Us"
                    icon={
                      <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                        <circle cx="4.5" cy="9" r="2" stroke="#2563EB" strokeWidth="1.5" />
                        <circle cx="13.5" cy="4" r="2" stroke="#2563EB" strokeWidth="1.5" />
                        <circle cx="13.5" cy="14" r="2" stroke="#2563EB" strokeWidth="1.5" />
                        <path
                          d="M6.4 7.9l5.2-2.8M6.4 10.1l5.2 2.8"
                          stroke="#2563EB"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  >
                    <div className="flex items-center gap-3 mt-1">
                      {contactDetails.socialLinks.map((social: any, idx: number) => (
                        <a
                          key={idx}
                          href={social.link || '#'}
                          aria-label={social.title}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 border-[1.5px] border-[#BFDBFE] bg-[#F0F7FF]"
                        >
                          {renderSocialIcon(social)}
                        </a>
                      ))}
                    </div>
                  </CircleItem>
                )}
              </div>
            </div>

            {/* RIGHT: form / success with Framer Motion animations */}
            <div>
              <h2 className="text-[28px] md:text-[34px] font-extrabold text-[#0C1E33] mb-7">
                Send Us a Message
              </h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="thank-you"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-center text-center py-16 px-8 bg-white rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ background: '#E6F4F1' }}
                    >
                      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                        <path
                          d="M6 14l5.5 5.5L22 9"
                          stroke="#0D9488"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[28px] font-extrabold text-[#0C1E33] mb-3">Thank You!</h3>
                    <p className="text-[16px] text-[#4B5563] leading-[1.75] max-w-sm">
                      Your message has been sent. We'll be in touch within one business day.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFields({ name: '', email: '', phone: '', company: '', message: '' })
                        setErrors({})
                      }}
                      className="mt-8 text-[14px] font-semibold text-[#2563EB] hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    {globalError && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 px-4 py-3.5 rounded-[8px] border border-[#FECACA] bg-[#FEE2E2]"
                      >
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                          className="shrink-0 mt-0.5"
                        >
                          <circle cx="9" cy="9" r="8" fill="#DC2626" />
                          <path
                            d="M9 5.5v4M9 12v.5"
                            stroke="white"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                        <p className="text-[13px] font-semibold text-[#DC2626]">{globalError}</p>
                      </motion.div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-semibold text-[#374151]">
                          Full Name <span className="text-[#EF4444]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          value={fields.name}
                          onChange={set('name')}
                          className={errors.name ? inputError : inputNormal}
                        />
                        <FieldError msg={errors.name} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-semibold text-[#374151]">
                          Email Address <span className="text-[#EF4444]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="john@company.com.au"
                          value={fields.email}
                          onChange={set('email')}
                          className={errors.email ? inputError : inputNormal}
                        />
                        <FieldError msg={errors.email} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-semibold text-[#374151]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="04xx xxx xxx"
                          value={fields.phone}
                          onChange={set('phone')}
                          className={inputNormal}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[14px] font-semibold text-[#374151]">Company</label>
                        <input
                          type="text"
                          placeholder="Your company name"
                          value={fields.company}
                          onChange={set('company')}
                          className={inputNormal}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[14px] font-semibold text-[#374151]">
                        Your Message <span className="text-[#EF4444]">*</span>
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us about your project and what you need help with..."
                        value={fields.message}
                        onChange={set('message')}
                        className={`${errors.message ? inputError : inputNormal} resize-none`}
                      />
                      <FieldError msg={errors.message} />
                    </div>

                    <p className="text-[12px] text-[#6B7280] leading-relaxed">
                      This site is protected by reCAPTCHA and the Google{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-[#2563EB] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a
                        href="https://policies.google.com/terms"
                        className="text-[#2563EB] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </a>{' '}
                      apply.
                    </p>

                    <button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full py-4 rounded-[6px] font-semibold text-[16px] text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg,#2563EB,#1E40AF)' }}
                    >
                      {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const ContactUsForm: React.FC<any> = (props) => {
  return (
    <QueryProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY'}
        scriptProps={{ async: true, defer: true, appendTo: 'body' }}
      >
        <ContactUsFormContent {...props} />
      </GoogleReCaptchaProvider>
    </QueryProvider>
  )
}
