import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ContactUsForm } from './ContactUsForm'

export const ContactUs: React.FC<any> = async (props) => {
  const payload = await getPayload({ config: configPromise })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Extract the necessary fields from site-settings to pass them to the client component
  const contactDetails = {
    email: siteSettings.email,
    phone: siteSettings.phone,
    address: siteSettings.address,
    addressUrl: siteSettings.addressUrl,
    socialLinks: siteSettings.socialLinks,
  }

  return <ContactUsForm {...props} contactDetails={contactDetails} />
}
