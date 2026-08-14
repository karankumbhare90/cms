import { getPayload } from 'payload'
import config from './src/payload.config'
import path from 'path'
import 'dotenv/config'

async function run() {
  const payload = await getPayload({ config })

  // 1. Upload media files if they don't exist
  let heroMedia, textMedia
  try {
    const existingMedia = await payload.find({ collection: 'media', limit: 10 })
    if (existingMedia.docs.length > 0) {
      heroMedia = existingMedia.docs[0]
      textMedia = existingMedia.docs.length > 1 ? existingMedia.docs[1] : existingMedia.docs[0]
    } else {
      heroMedia = await payload.create({
        collection: 'media',
        data: { alt: 'Hero Background' },
        filePath: path.resolve(process.cwd(), 'media/biodegradable-products.jpg'),
      })
      textMedia = await payload.create({
        collection: 'media',
        data: { alt: 'Section Image' },
        filePath: path.resolve(process.cwd(), 'media/melbourne-quality-roofing.webp'),
      })
    }
  } catch (e) {
    console.error('Error handling media:', e)
  }

  // 2. Check if a home page already exists
  const existingPages = await payload.find({
    collection: 'pages',
    where: {
      pageType: { equals: 'home' }
    }
  })

  const layoutData = [
    {
      blockType: 'hero',
      introText: {
        heading: 'Welcome to Our New Website',
        headingSize: 'h1',
        subheading: 'INNOVATION & EXCELLENCE',
        description: 'We deliver outstanding results for modern forward-thinking companies. Experience the difference with our dedicated team.',
      },
      introLinks: [
        {
          type: 'custom',
          url: '/contact',
          label: 'Get in Touch'
        }
      ],
      backgroundImage: heroMedia ? heroMedia.id : undefined,
    },
    {
      blockType: 'text',
      introText: {
        heading: 'Why Choose Us?',
        headingSize: 'h2',
        subheading: 'OUR APPROACH',
        description: 'We believe in a transparent, collaborative, and results-driven process. Our team works closely with you to understand your goals and deliver a solution that exceeds your expectations.',
      },
    },
    {
      blockType: 'textWithImage',
      introText: {
        heading: 'Modern Solutions',
        headingSize: 'h2',
        subheading: 'TECHNOLOGY',
        description: 'Leveraging the latest technologies to build fast, secure, and scalable digital platforms.',
      },
      image: textMedia ? textMedia.id : undefined,
      textPosition: 'left',
    },
    {
      blockType: 'textWithVideo',
      introText: {
        heading: 'See It In Action',
        headingSize: 'h2',
        subheading: 'DEMO',
        description: 'Watch how our platform can transform your workflow and boost productivity instantly.',
      },
      textPosition: 'right',
    },
  ];

  if (existingPages.docs.length > 0) {
    // Update existing
    await payload.update({
      collection: 'pages',
      id: existingPages.docs[0].id,
      data: {
        layout: layoutData
      }
    })
    console.log('Successfully updated existing Home Page!')
  } else {
    // Create new
    const homePage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        pageType: 'home',
        layout: layoutData,
      }
    })
    
    // Set this page as the home page in site-settings if needed
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        homePage: homePage.id,
      }
    })
    console.log('Successfully created Home Page and set it in Site Settings!')
  }

  process.exit(0)
}

run().catch(console.error)
