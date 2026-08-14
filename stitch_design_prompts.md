# Stitch Design Prompts & Global Style Guide

*Note: Each prompt below has been updated to include the core global styling rules. This ensures that when you copy and paste a single component prompt into Stitch, it has all the context it needs to perfectly match your theme without needing you to paste a separate style guide.*

---

## 1. Core Layout Components

### Header
> Create a responsive website header using Tailwind CSS. 
> **GLOBAL STYLES TO ENFORCE:** Use `font-black tracking-tight` for logos/major titles, and `text-sm font-semibold uppercase tracking-wide` for nav links. The primary brand color is `blue-600`. Buttons must be `rounded-full shadow-md shadow-blue-500/30 hover:-translate-y-0.5`. 
> **COMPONENT DETAILS:** It should have two parts: a dark top bar (`bg-gray-900`, `text-gray-200`) containing email, phone, and social icons. Below it, a main navigation bar using glassmorphism (`bg-white/70`, `backdrop-blur-xl`, `border-b border-white/20`, `shadow-sm`). Logo is `text-gray-900`. Navigation links should be `text-gray-700` with a blue animated underline effect on hover (`after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 hover:after:w-full`). Include a primary CTA button (`bg-blue-600 text-white`).

### Footer
> Create a modern, dark-themed responsive footer using Tailwind CSS. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight` or `text-sm font-bold uppercase tracking-wider`. Primary brand color is `blue-600` (use `blue-500`/`blue-400` on dark backgrounds). 
> **COMPONENT DETAILS:** Background is `bg-gray-900` with top border `border-gray-800`. Use a 4-column grid. Column 1: Brand name (`font-black text-white text-2xl`), a short description (`text-gray-400`), and contact info with blue icons. Columns 2-4: Link groups with uppercase headers (`text-white`). The links should be `text-gray-400 hover:text-blue-400`, with a small blue arrow icon (`text-blue-500`) that fades in and slides right on hover. The bottom should have a border and display copyright info in `text-gray-500`.

---

## 2. Blocks / Sections

### Hero
> Create a high-converting Hero section. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Primary brand color is `blue-600`. Buttons must be fully rounded (`rounded-full`) with a soft shadow (`shadow-md shadow-blue-500/30`) and a hover lift effect. 
> **COMPONENT DETAILS:** Use a clean, light background with subtle abstract blue floating elements. The main headline should be massive (`text-gray-900`). Include a descriptive subheadline in `text-gray-600`. Include two buttons: a primary pill-shaped button (`bg-blue-600 text-white`) and a secondary ghost button. Add a floating glassmorphic card (`bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl`) overlapping an image on the right.

### CTA (Call to Action)
> Create a sleek Call to Action section. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Buttons must be fully rounded (`rounded-full`) with a soft shadow and a hover lift effect (`hover:-translate-y-0.5`). 
> **COMPONENT DETAILS:** The background should be a deep dark blue or `bg-gray-900` to contrast with the page. Use bold typography (`text-white`) for the heading. Include a primary pill-shaped button that is bright white with blue text (`text-blue-600`), or `bg-blue-600` with white text. Add subtle geometric background patterns for a tech-forward feel.

### Latest Posts / Blog Grid
> Create a Latest Posts section. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight text-gray-900`. Small labels must be `uppercase tracking-wide font-semibold`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** Display 3 blog post cards in a grid. Each card should have a clean white background, a subtle border, and a shadow on hover. The post image should have a zoom-in effect on hover. The category tag should be uppercase, small, and `text-blue-600`. The post title should be bold and hover to `text-blue-600`.

### Portfolio Grid
> Create a Portfolio Grid section. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Buttons must be fully rounded (`rounded-full`). Brand color is `blue-600`. 
> **COMPONENT DETAILS:** Use a masonry or clean 3-column grid. Each portfolio item should be an image with a dark overlay that fades in on hover. When hovered, the project title (`font-black text-white`) and a pill-shaped "View Project" button (`bg-blue-600 text-white`) should slide up into view.

### Text & Content
> Create a rich text content section. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** Center the text on the page (`max-w-prose mx-auto`). Use `text-gray-800` for body text, `font-black text-gray-900` for headings (h2, h3). Links within the text should be `text-blue-600` with an underline that thickens on hover.

### Pullquote
> Create a Pullquote block. 
> **GLOBAL STYLES TO ENFORCE:** Labels must be `uppercase tracking-wide font-bold`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** It should stand out with a left border (`border-l-4 border-blue-600`) and a very subtle `bg-blue-50/50` background. The quote text should be large, italicized, and `text-gray-700`. Include a blue quotation mark icon at the top left. The author's name should be `font-bold text-gray-900 uppercase tracking-wide`.

### Before And After
> Create a Before and After image comparison block. 
> **GLOBAL STYLES TO ENFORCE:** Use glassmorphism (`bg-white/70 backdrop-blur-md`) for floating elements. Labels must be `uppercase tracking-wide font-bold text-xs`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** It should feature a clean container with rounded corners and a soft shadow. Include a central draggable slider handle (white with a `text-blue-600` accent). Ensure the labels "Before" and "After" use the glassmorphism effect floating on the top corners of the images.

### Comparison Table
> Create a Comparison Table or pricing matrix. 
> **GLOBAL STYLES TO ENFORCE:** Table headers must be `uppercase tracking-wide font-bold`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** The table should have a clean design with `border-gray-200`. The header row should be `bg-gray-900 text-white`. Use blue checkmarks (`text-blue-600`) for included features and gray dashes for excluded ones. Highlight a "Recommended" column by giving it a subtle blue background (`bg-blue-50`) and a top border of `border-blue-600`.

### Contact Us
> Create a Contact Us section featuring a two-column layout. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Buttons must be fully rounded (`rounded-full shadow-md hover:-translate-y-0.5`). Brand color is `blue-600`. Use glassmorphism where appropriate. 
> **COMPONENT DETAILS:** The left side should contain bold headings (`text-gray-900`), contact details with blue icons, and a glassmorphic card showing office hours. The right side should contain a sleek form. Form inputs should have a light gray background (`bg-gray-50`), rounded corners, and focus states with a blue ring (`focus:ring-2 focus:ring-blue-600`). The submit button must be pill-shaped and `bg-blue-600`.

### Countdown Timer
> Create a Countdown Timer section. 
> **GLOBAL STYLES TO ENFORCE:** Headings/numbers must be `font-black tracking-tight`. Labels must be `uppercase tracking-wide font-semibold text-xs`. Use glassmorphism. 
> **COMPONENT DETAILS:** The background should be dark (`bg-gray-900`). Display the days, hours, minutes, and seconds in separate floating glassmorphic blocks (`bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl`). The numbers should be huge and `font-black`, and the labels below them small, uppercase, and `text-gray-400`.

### Counter
> Create a Statistics Counter block. 
> **GLOBAL STYLES TO ENFORCE:** Numbers must be `font-black tracking-tight`. Labels must be `uppercase tracking-wide font-semibold text-sm`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** Use a 4-column grid. Each counter should have a large, animated number (`text-4xl text-gray-900`), a blue accent icon above it, and a small uppercase label (`text-gray-500`) below it.

### FAQ
> Create an FAQ accordion section. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** The section title should be bold and dark (`text-gray-900`). Each FAQ item should have a bottom border. The question should be `font-bold text-gray-900` with a blue plus/minus icon on the right that rotates on click. The answer text should be `text-gray-600`. When an item is open, give it a subtle left border of `border-l-2 border-blue-600`.

### Form Embed
> Create a generic Form wrapper section. 
> **GLOBAL STYLES TO ENFORCE:** Buttons must be fully rounded (`rounded-full shadow-md shadow-blue-500/30 hover:-translate-y-0.5`). Brand color is `blue-600`. 
> **COMPONENT DETAILS:** The container should be a clean, white card with a soft shadow and rounded corners. Form fields should be modern: floating labels, or clean borders that turn blue on focus (`focus:border-blue-600 focus:ring-1 focus:ring-blue-600`). The submit button should be full-width, pill-shaped, `bg-blue-600 text-white`.

### Logo Grid
> Create a Logo Grid to display client or partner logos. 
> **GLOBAL STYLES TO ENFORCE:** Clean, minimalist presentation. 
> **COMPONENT DETAILS:** The background should be very light (`bg-gray-50`). Logos should be in a flex or grid layout, styled as grayscale with 50% opacity, transitioning to full color and 100% opacity on hover.

### Map
> Create a Map section. 
> **GLOBAL STYLES TO ENFORCE:** Buttons must be fully rounded (`rounded-full`). Brand color is `blue-600`. Use glassmorphism. 
> **COMPONENT DETAILS:** The map itself should have a slight grayscale styling. Below or floating on top of the map, include a glassmorphic card (`bg-white/80 backdrop-blur-xl shadow-lg rounded-xl`) containing the location address (`text-gray-900`), a blue pin icon, and a blue pill-shaped "Get Directions" button.

### Media Gallery
> Create a Media Gallery block (photo grid). 
> **GLOBAL STYLES TO ENFORCE:** Premium, sleek aesthetic with smooth hover animations. 
> **COMPONENT DETAILS:** Use a neat CSS grid. Images should have rounded corners and subtle shadows. On hover, apply a slight scale-up effect to the image and reveal a dark gradient overlay with a white "enlarge" icon in the center.

### Notice Banner
> Create a thin top Notice Banner. 
> **GLOBAL STYLES TO ENFORCE:** Typography must be `font-semibold`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** It should sit above the main header. Use `bg-blue-600 text-white text-xs sm:text-sm`. It should contain a short announcement and an underlined link. Include a subtle close 'X' button on the far right.

### Pod (Feature Card)
> Create a 'Pod' or Feature Card block. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Links must be `uppercase tracking-wide font-bold text-xs`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** The card should be `bg-white`, rounded-xl, with a subtle border and shadow. Inside, it should have a blue tech-themed icon inside a soft blue circle (`bg-blue-100 text-blue-600`), a `font-black text-gray-900` title, and a small uppercase "Read More" link (`text-blue-600`) that reveals a sliding blue arrow on hover.

### Pricing Table
> Create a Pricing Table with 3 tiers. 
> **GLOBAL STYLES TO ENFORCE:** Headings/Prices must be `font-black tracking-tight`. Buttons must be fully rounded (`rounded-full shadow-md`). Brand color is `blue-600`. 
> **COMPONENT DETAILS:** The middle tier should be highlighted/featured (slightly larger, with a `bg-gray-900 text-white` dark theme, while the others are white with gray borders). The price numbers should be massive and `font-black`. Features should have blue checkmarks. Use pill-shaped buttons at the bottom of each tier (`bg-blue-600 text-white` for the featured tier).

### Process Steps / Timeline
> Create a Process Steps or Timeline section. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Labels must be `uppercase tracking-wide font-bold text-sm`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** Use a vertical line on the left. Each step should have a blue circular node on the line. The step content should be in a clean card with a bold `text-gray-900` title and an uppercase, blue step label (e.g., "STEP 01" in `text-blue-600`).

### Tabs
> Create a Tabs section. 
> **GLOBAL STYLES TO ENFORCE:** Typography must be clean and bold. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** The tab headers should be a horizontal list. Active tabs should have `text-blue-600` and a thick blue bottom border. Inactive tabs should be `text-gray-500 hover:text-gray-900`. The tab content area should fade in smoothly and have a clean, white background.

### Team Grid
> Create a Team / Leadership grid. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Roles must be `uppercase tracking-wide font-bold text-xs`. Brand color is `blue-600`. Use glassmorphism. 
> **COMPONENT DETAILS:** Display team member photos in a grid with rounded corners. On hover, the image should turn slightly grayscale and a glassmorphic panel (`bg-white/80 backdrop-blur-md`) should slide up from the bottom containing their name (`font-black text-gray-900`), role (`text-blue-600`), and social icons.

### Testimonial
> Create a Testimonial section. 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-bold`. Brand color is `blue-600` (use `blue-400` on dark). 
> **COMPONENT DETAILS:** Use a dark background (`bg-gray-900`). The testimonial text should be large, `text-white`, and italicized. Include large, faded blue quote marks in the background. Below the quote, include the person's avatar, their name in `font-bold text-white`, and their company in `text-blue-400`.

### Text With Image
> Create a Text With Image section (split layout, 50/50). 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Kickers must be `uppercase tracking-wide font-bold`. Buttons must be fully rounded (`rounded-full shadow-md`). Brand color is `blue-600`. 
> **COMPONENT DETAILS:** The text side should have an uppercase blue kicker, a `text-gray-900` main heading, and a pill-shaped primary CTA button (`bg-blue-600 text-white hover:-translate-y-0.5`). The image side should have a subtle offset shadow or a decorative blue geometric shape behind the image.

### Text With Video
> Create a Text With Video section (split layout). 
> **GLOBAL STYLES TO ENFORCE:** Headings must be `font-black tracking-tight`. Brand color is `blue-600`. 
> **COMPONENT DETAILS:** Similar to Text with Image, but the media side contains a video thumbnail. The thumbnail should have a dark overlay and a prominent, pulsing blue Play button icon in the center (`bg-blue-600 text-white rounded-full`).

### Video Player
> Create a standalone Video Player block. 
> **GLOBAL STYLES TO ENFORCE:** Use glassmorphism. 
> **COMPONENT DETAILS:** The container should be wide (`max-w-5xl mx-auto`). The video should have rounded corners (`rounded-2xl`) and a deep shadow (`shadow-2xl`). If there is a custom poster image, include a glassmorphic play button (`bg-white/30 backdrop-blur-md border border-white text-white rounded-full`) centered on the video.
