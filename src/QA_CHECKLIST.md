# Velora Website — Quality Assurance Checklist

## 🎯 Pre-Launch QA — Complete Review

Use this checklist before deploying to production.

---

## ✅ VISUAL DESIGN

### Typography
- [ ] Playfair Display loads correctly for all headings
- [ ] Inter loads correctly for body text
- [ ] Letter-spacing (+0.2px) applied to all headings
- [ ] Font sizes scale correctly on mobile (clamp functions)
- [ ] No orphaned text or awkward line breaks
- [ ] Consistent hierarchy (H1→H2→H3 flow)

### Colors
- [ ] Rose Beige (#EAD5CC) used in hero gradients
- [ ] Blush Cream (#F7EEE8) in section backgrounds
- [ ] Warm Taupe (#D3B8A1) for CTAs and accents
- [ ] Charcoal (#2B2B2B) for text and footer
- [ ] Soft Coral (#E2A79A) for countdown banner
- [ ] All colors meet WCAG AA contrast (test with WebAIM)

### Spacing & Layout
- [ ] Section padding: minimum 96px vertical (py-24)
- [ ] Consistent gap spacing in grids (gap-6, gap-8)
- [ ] Generous whitespace around text blocks
- [ ] No elements touching viewport edges (px-6 minimum)
- [ ] Centered max-width containers (max-w-7xl)

### Micro-Interactions
- [ ] Buttons lift 2px on hover
- [ ] Cards scale to 105% on hover
- [ ] Navigation underlines fade in smoothly
- [ ] Header background blurs on scroll
- [ ] All transitions: 300ms duration
- [ ] Reduced motion disables animations

---

## ♿ ACCESSIBILITY

### Keyboard Navigation
- [ ] Tab order follows logical flow
- [ ] All interactive elements are focusable
- [ ] Focus rings visible (2px solid, 2px offset)
- [ ] No keyboard traps
- [ ] Skip to content link (optional but recommended)
- [ ] Enter/Space activates buttons

### Screen Readers
- [ ] All images have alt text (or aria-hidden for decorative)
- [ ] Form labels properly associated with inputs
- [ ] ARIA labels on navigation elements
- [ ] Heading structure makes sense when read linearly
- [ ] Link text is descriptive (no "click here")
- [ ] Form errors announced to screen readers

### Color & Contrast
- [ ] Text contrast ≥ 4.5:1 (AA standard)
- [ ] Large text ≥ 3:1
- [ ] No information conveyed by color alone
- [ ] Focus indicators have sufficient contrast

### Motion
- [ ] `prefers-reduced-motion` disables animations
- [ ] No auto-playing videos or carousels
- [ ] Animations can be paused if >5 seconds

---

## 📱 RESPONSIVE DESIGN

### Mobile (375px - 767px)
- [ ] Navigation accessible (consider mobile menu if needed)
- [ ] Text remains readable (no tiny fonts)
- [ ] Touch targets ≥ 44×44 px
- [ ] Images don't overflow
- [ ] Forms stack vertically
- [ ] Footer columns stack

### Tablet (768px - 991px)
- [ ] 2-column grids display correctly
- [ ] Navigation shows full menu
- [ ] Cards maintain aspect ratios
- [ ] Images scale appropriately

### Desktop (992px+)
- [ ] 3-4 column grids display
- [ ] Hero text doesn't get too large
- [ ] Max-width containers prevent extreme widths
- [ ] Hover states work on all interactive elements

### Breakpoint Testing
- [ ] 375px (iPhone SE)
- [ ] 414px (iPhone Pro Max)
- [ ] 768px (iPad Portrait)
- [ ] 1024px (iPad Landscape)
- [ ] 1440px (MacBook)
- [ ] 1920px (Full HD Desktop)

---

## 🔗 LINKS & NAVIGATION

### Internal Links
- [ ] Header logo scrolls to top/hero
- [ ] Navigation items scroll to correct sections
- [ ] Footer links work correctly
- [ ] Smooth scroll behavior enabled

### External Links
- [ ] LOI signing link: `https://sign.velorapro.com/pilot-loi`
- [ ] Investor deck: `https://velorapro.com/investor-overview.pdf`
- [ ] Founder email: `mailto:hello@velorapro.com`
- [ ] LinkedIn: `https://linkedin.com/company/velora`
- [ ] All external links have `target="_blank"`
- [ ] All external links have `rel="noopener noreferrer"`

### Multi-Page Navigation
- [ ] `/` → Home page loads
- [ ] `/pilot` → Pilot page loads
- [ ] `/privacy` → Privacy page loads
- [ ] Browser back/forward buttons work
- [ ] 404 page configured (production only)

---

## 📝 FORMS

### Contact Form
- [ ] All fields display correctly
- [ ] Placeholder text is visible
- [ ] Required validation works
- [ ] Email validation works
- [ ] Success message appears after submit
- [x] Form doesn't reload page on submit
- [x] GDPR notice is visible and readable
- [x] Formspree integration active and tested

### LOI Signing
- [ ] Embed placeholder displays correctly
- [ ] External link opens in new tab
- [ ] eIDAS notice is visible
- [ ] Time-stamped confirmation mentioned

---

## 🔐 COMPLIANCE & LEGAL

### UK GDPR
- [ ] Privacy Policy page exists and is linked
- [ ] Contact form has legitimate interest notice
- [ ] Data controller information provided
- [ ] User rights explained
- [ ] No cookies/tracking without consent
- [ ] Privacy email listed: privacy@velorapro.com

### Regulatory Claims
- [ ] Uses "Aligned with" not "Approved by"
- [ ] SEIS advance assurance status clearly stated
- [ ] No false endorsements
- [ ] Imperial support line accurate
- [ ] Company number placeholder visible: [●]

### Content Accuracy
- [ ] No placeholder "Lorem Ipsum" text
- [ ] All dates are current (Q1 2026 pilot)
- [ ] Contact details are correct
- [ ] No broken placeholder images

---

## 🎬 ANIMATIONS & PERFORMANCE

### Animation Quality
- [ ] Hero animated line displays smoothly
- [ ] Pulse animations don't cause layout shift
- [ ] Countdown timer updates correctly
- [ ] No jank or stuttering
- [ ] Animations pause with reduced motion

### Performance
- [ ] Page loads in <3 seconds (3G simulation)
- [ ] Images optimized (WebP when production)
- [ ] Fonts preloaded or optimized
- [ ] No console errors
- [ ] No console warnings
- [ ] Lighthouse Performance score >80

---

## 🌐 SEO & META TAGS (Production)

### Basic SEO
- [ ] `<title>` tag on all pages
- [ ] Meta description on all pages
- [ ] Canonical URL set
- [ ] H1 present and unique per page
- [ ] Alt text on all images
- [ ] robots.txt configured
- [ ] sitemap.xml generated

### Open Graph
- [ ] `og:title`
- [ ] `og:description`
- [ ] `og:image` (social preview)
- [ ] `og:url`
- [ ] `og:type`

### Twitter Cards
- [ ] `twitter:card`
- [ ] `twitter:title`
- [ ] `twitter:description`
- [ ] `twitter:image`

### Structured Data
- [ ] Organization schema (JSON-LD)
- [ ] Website schema
- [ ] FAQPage schema (on pilot page)

---

## 🧪 BROWSER TESTING

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] iOS Safari
- [ ] Chrome Android
- [ ] Samsung Internet

### Features to Test
- [ ] Layout renders correctly
- [ ] Forms submit
- [ ] Navigation works
- [ ] Hover states (desktop)
- [ ] Touch interactions (mobile)
- [ ] Fonts load correctly

---

## 🚨 FINAL CRITICAL CHECKS

### Before Launch
- [ ] Remove all `console.log` statements
- [ ] Remove all "placeholder" notes in UI
- [ ] Update company registration number
- [ ] Replace founder photo placeholder
- [ ] Connect contact form backend
- [ ] Configure LOI signing embed
- [ ] Upload investor deck PDF
- [ ] Set up SSL certificate
- [ ] Configure UK-based hosting
- [ ] Test on real devices (iPhone, Android)

### Post-Launch Monitoring
- [ ] Check Google Search Console
- [ ] Monitor form submissions
- [ ] Track broken links (dead link checker)
- [ ] Monitor Lighthouse scores monthly
- [ ] Review accessibility reports quarterly

---

## 🎓 COMPLIANCE VERIFICATION

### Accessibility Audit Tools
- [ ] WAVE (web accessibility evaluation)
- [ ] axe DevTools (automated testing)
- [ ] Lighthouse Accessibility score >90
- [ ] Manual keyboard navigation test
- [ ] Screen reader test (VoiceOver or NVDA)

### GDPR Compliance
- [ ] Privacy policy reviewed by legal
- [ ] Data processing documented
- [ ] No PII collected without consent
- [ ] UK ICO guidelines followed
- [ ] Data retention policy defined

---

## ✅ SIGN-OFF

### Development Team
- [ ] All code reviewed
- [ ] All components tested
- [ ] Documentation complete
- [ ] Performance optimized

### Design Team
- [ ] Visual design approved
- [ ] Brand consistency verified
- [ ] Responsive design validated
- [ ] Accessibility standards met

### Legal/Compliance Team
- [ ] Privacy policy approved
- [ ] Regulatory claims verified
- [ ] GDPR compliance confirmed
- [ ] Terms of service ready (if needed)

### Stakeholder Approval
- [ ] Founder approval
- [ ] Imperial College Enterprise Lab review (if required)
- [ ] Investor preview completed (if required)

---

**Date**: _____________

**Approved by**: _____________

**Ready for Production**: ☐ Yes ☐ No

---

## 📞 Issue Reporting

If you find any issues during QA:

1. Document the issue with screenshot
2. Note browser/device/viewport size
3. Include steps to reproduce
4. Categorize severity (Critical/High/Medium/Low)
5. Assign to appropriate team member

**Contact**: development@velorapro.com

---

**Velora Website Quality Assurance v1.0**  
© 2025 Velora Ltd
