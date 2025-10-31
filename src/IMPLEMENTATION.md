# Velora Website — Implementation Guide

## Overview

This is the investor-grade, clinic-credible website for **Velora** — the UK's first compliance-led digital-health ecosystem for non-surgical aesthetics.

**Domain**: velorapro.com

## Pages

### 1. Home Page (`/`)
- Hero with animated data integrity motif
- About section with compliance features
- Pilot program invitation
- Investor overview with SEIS/EIS information
- Regulatory alignment badges (JCCP, CPSA, ASA/CAP, ICO, CQC)
- Founder's note
- Contact form with GDPR notice
- Footer with Imperial College Enterprise Lab support

### 2. Pilot Page (`/pilot`)
- Countdown banner for cohort deadline
- Detailed pilot program information
- Timeline visualization (4 steps)
- Benefits section
- LOI signing embed placeholder
- FAQ accordion (5 questions)
- Founder's note

### 3. Privacy Policy (`/privacy`)
- Comprehensive privacy policy placeholder
- UK GDPR compliant framework
- Contact information

## Design System

### Colors (Velora Brand Palette)
- **Rose Beige**: `#EAD5CC` — Hero backgrounds, highlights
- **Blush Cream**: `#F7EEE8` — Light section backgrounds
- **Warm Taupe**: `#D3B8A1` — Primary accent, navigation
- **Charcoal**: `#2B2B2B` — Body text, footer
- **Sage Grey**: `#B8BDB5` — Secondary sections
- **Soft Coral**: `#E2A79A` — CTAs, alerts, countdown

### Typography
- **Headings**: Playfair Display (serif, semi-bold) with +0.2px letter-spacing
- **Body**: Inter (sans-serif, 400-500 weight)
- **Scale**:
  - H1: clamp(3rem, 6vw, 3.5rem)
  - H2: clamp(1.75rem, 4vw, 2.25rem)
  - H3: clamp(1.25rem, 2.5vw, 1.5rem)
  - Body: 1.0625rem (17px)

### Components
- **Header**: Fixed navigation with scroll state
- **FeatureCard**: Icon + label + description cards
- **PilotCard**: Simple icon cards
- **Timeline**: 4-step visual process
- **FAQSection**: Accordion-based questions
- **CountdownBanner**: Dynamic deadline counter
- **AnimatedLine**: Flowing data motif for hero
- **SectionContainer**: Reusable section wrapper

### Design Principles
- **Generous whitespace**: 96px+ section padding
- **Luxury aesthetic**: Soft shadows (0 2px 24px rgba(0,0,0,0.06))
- **Hover micro-motion**: 2px lift on buttons/cards
- **Border radius**: 12px standard, 24px for buttons
- **Accessibility**: WCAG AA contrast, focus rings, reduced motion support

## Key Features

### Accessibility
✅ WCAG AA color contrast
✅ Keyboard focus visible on all interactive elements
✅ Semantic HTML with proper heading hierarchy
✅ `prefers-reduced-motion` support
✅ ARIA labels on navigation and buttons

### Compliance & Trust
✅ UK GDPR notice on contact form
✅ Regulatory alignment badges
✅ No tracking cookies or analytics
✅ Legitimate interest (B2B) data processing notice
✅ eIDAS-compliant signature notice

### Performance
✅ Responsive breakpoints: 480/768/992/1200/1440px
✅ Mobile-first design
✅ Smooth scroll behavior
✅ Optimized animations with reduced motion fallback

## External Links

### Production Links (to be updated)
- **Pilot LOI Signing**: `https://sign.velorapro.com/pilot-loi`
- **Investor Deck**: `https://velorapro.com/investor-overview.pdf`
- **Founder Email**: `hello@velorapro.com`
- **Privacy Email**: `privacy@velorapro.com`
- **LinkedIn**: `https://linkedin.com/company/velora`

## Technical Notes

### Form Submission
The contact form is **production-ready** and integrated with Formspree:
- ✅ **Formspree** endpoint configured (`https://formspree.io/f/mdkpoqky`)
- ✅ Emails delivered to `founder@velorapro.com`
- ✅ UK GDPR compliant
- ✅ Spam protection enabled (honeypot + rate limiting)

### E-Signature Integration
The LOI signing section has a placeholder for embedding:
- **Zoho Sign** iframe
- Or **Dropbox Sign** (formerly HelloSign)
- Must be eIDAS-compliant for UK regulations

### SEO & Meta Tags
Add to production build:
```html
<meta name="description" content="Velora - UK's first regulated digital-health platform for non-surgical aesthetics. Safety, trust, compliance." />
<meta property="og:title" content="Velora - Safer, Smarter, More Compliant Aesthetic Care" />
<meta property="og:description" content="Building the UK's first compliance-led digital-health ecosystem for non-surgical aesthetics." />
<meta property="og:image" content="[social-preview.jpg]" />
<link rel="canonical" href="https://velorapro.com/" />
```

### JSON-LD Schema
Add structured data for search engines (organization, website, FAQ).

## Deployment Checklist

- [ ] Update company registration number in footer
- [ ] Add real founder photograph
- [ ] Link actual investor deck PDF
- [ ] Configure LOI signing embed
- [ ] Connect contact form to backend
- [ ] Add favicon and social preview images
- [ ] Add Google Fonts optimization
- [ ] Set up SSL certificate
- [ ] Configure UK-based hosting
- [ ] Add cookie consent (if needed post-launch)
- [ ] Legal review of Privacy Policy
- [ ] Add meta tags and JSON-LD
- [ ] Test on all breakpoints (375px to 1920px)
- [ ] Accessibility audit (automated + manual)
- [ ] Performance optimization (WebP images, lazy loading)

## File Structure

```
/
├── App.tsx                    # Home page
├── Router.tsx                 # Client-side routing
├── components/
│   ├── Header.tsx            # Fixed navigation
│   ├── FeatureCard.tsx       # Icon feature cards
│   ├── PilotCard.tsx         # Simple icon cards
│   ├── SectionContainer.tsx  # Reusable section wrapper
│   ├── Timeline.tsx          # 4-step process visual
│   ├── FAQSection.tsx        # Accordion FAQ
│   ├── CountdownBanner.tsx   # Deadline countdown
│   ├── AnimatedLine.tsx      # Data integrity motif
│   └── ui/                   # Shadcn components
├── pages/
│   ├── PilotPage.tsx         # /pilot
│   └── PrivacyPage.tsx       # /privacy
└── styles/
    └── globals.css           # Brand tokens & accessibility
```

## Support

For questions about implementation:
- **Technical**: Refer to component documentation
- **Design**: Follow Velora Design System tokens
- **Compliance**: Ensure all GDPR notices remain intact
- **Accessibility**: Maintain WCAG AA standards

---

**Built with care for regulatory excellence, clinical trust, and investor credibility.**

© 2025 Velora Ltd
