import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { sanitizeString, SECURITY_HEADERS } from '@/utils/security'
import { checkRateLimit, getClientIP } from '@/utils/rateLimit'

export async function POST(request: Request) {
  // 1. Rate Limiting Check (5 requests per 10 minutes per IP)
  const clientIP = getClientIP(request)
  const rateLimit = checkRateLimit(`contact_${clientIP}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  })

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many submission attempts. Please try again later.' },
      {
        status: 429,
        headers: {
          ...SECURITY_HEADERS,
          'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
        },
      },
    )
  }

  try {
    const body = await request.json()
    const name = sanitizeString(body.name)
    const email = sanitizeString(body.email)
    const phone = sanitizeString(body.phone)
    const company = sanitizeString(body.company)
    const message = sanitizeString(body.message)
    const recaptchaToken = body.recaptchaToken

    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400, headers: SECURITY_HEADERS },
      )
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400, headers: SECURITY_HEADERS },
      )
    }

    // 2. Verify reCAPTCHA token
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not defined in environment variables.')
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500, headers: SECURITY_HEADERS },
      )
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`
    const recaptchaRes = await fetch(verifyUrl, { method: 'POST' })
    const recaptchaData = await recaptchaRes.json()

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error('reCAPTCHA verification failed:', recaptchaData)
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400, headers: SECURITY_HEADERS },
      )
    }

    // 3. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true' || false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const payload = await getPayload({ config: configPromise })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

    const smtpUser = siteSettings.fromEmail || process.env.SMTP_USER
    const adminEmail = siteSettings.adminEmail || process.env.ADMIN_EMAIL || smtpUser

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials are not fully configured.')
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500, headers: SECURITY_HEADERS },
      )
    }

    // 4. Send Email to Admin
    const adminMailOptions = {
      from: `"Contact Form" <${smtpUser}>`,
      to: adminEmail,
      subject: `New Lead: ${name} (${company || 'No Company'})`,
      text: `
You have received a new message from the contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}

Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // 5. Send Confirmation Email to User
    const userMailOptions = {
      from: `"Customer Support" <${smtpUser}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      text: `
Hi ${name},

Thank you for contacting us. We have received your message and will get back to you as soon as possible (usually within 1 business day).

For your records, here is a copy of your message:
${message}

Best regards,
The Team
      `,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible (usually within 1 business day).</p>
        <p>For your records, here is a copy of your message:</p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br/>The Team</p>
      `,
    }

    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(userMailOptions)

    return NextResponse.json(
      { success: true, message: 'Emails sent successfully.' },
      { status: 200, headers: SECURITY_HEADERS },
    )
  } catch (error) {
    console.error('Error in contact route:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500, headers: SECURITY_HEADERS },
    )
  }
}
