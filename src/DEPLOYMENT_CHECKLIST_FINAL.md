# 🚀 Velora Website — Final Deployment Checklist

**Date:** January 2025  
**Target:** Netlify deployment at velorapro.com  
**Status:** ✅ Production Ready

---

## ✅ Phase 1 — Forms (Netlify Forms)

- [x] **Removed Formspree** — All references deleted
- [x] **Hidden registration form** — Present in `/index.html` lines 47-54
- [x] **React form attributes** — Added `name`, `method`, `data-netlify`, `netlify-honeypot`
- [x] **Hidden form-name input** — Added to visible form
- [x] **Netlify submission handler** — Implemented with proper encoding
- [x] **Honeypot field** — Named "website", hidden, validation implemented
- [x] **Success card UI** — Preserved (Velora colors, no green)
- [x] **Error handling** — Inline error message preserved

**Test after deploy:**
- [ ] Submit test form on live site
- [ ] Verify submission appears in Netlify → Forms dashboard
- [ ] Verify email notification received at founder@velorapro.com
- [ ] Test honeypot by programmatically filling "website" field

---

## ✅ Phase 2 — SPA & Routing

- [x] **_redirects file** — Created at `/public/_redirects` (plain text)
- [x] **netlify.toml redirects** — Already configured (lines 10-13)
- [x] **Footer links** — Using scroll anchors (not routes)
- [x] **Privacy link** — Disabled with `aria-disabled="true"`

**Test after deploy:**
- [ ] Refresh page at `/` → should work
- [ ] Navigate to `/#pilot` → should work
- [ ] Refresh at `/#pilot` → should NOT 404
- [ ] Navigate to `/#contact` → should work
- [ ] Refresh at `/#contact` → should NOT 404

---

## ✅ Phase 3 — LOI Access Gate

- [x] **Button opens gate first** — Not direct iframe access
- [x] **Access code validation** — Case-insensitive, trimmed
- [x] **Current code** — `velora` (lowercase)
- [x] **Iframe renders only after unlock** — Conditional rendering verified
- [x] **Container sizing:**
  - Locked: `max-w-2xl` ✅
  - Unlocked: `max-w-5xl` ✅
- [x] **Iframe height** — Responsive `clamp(560px, 75vh, 960px)` ✅
- [x] **Confidentiality notice** — Below iframe ✅

**Test after deploy:**
- [ ] Click "Review & Sign Pilot LOI"
- [ ] Verify access gate appears (compact)
- [ ] Try wrong code → inline error
- [ ] Try correct code: `velora` → unlocks
- [ ] Verify iframe loads
- [ ] Verify container expands on unlock
- [ ] Test on mobile (responsive sizing)

---

## ✅ Phase 4 — SEO & Social

### Meta Tags
- [x] **Title** — "Velora — Safer, Smarter Aesthetic Care"
- [x] **Meta description** — Concise, under 160 chars
- [x] **robots** — Changed to `index, follow` ✅
- [x] **Canonical URL** — `https://velorapro.com/`
- [x] **Keywords** — Updated

### Open Graph
- [x] **og:title** — Updated
- [x] **og:description** — Updated
- [x] **og:url** — Correct
- [x] **og:image** — References `/og-image.jpg`
- [x] **og:image:width** — 1200
- [x] **og:image:height** — 630

### Twitter Cards
- [x] **twitter:card** — summary_large_image
- [x] **twitter:title** — Updated
- [x] **twitter:description** — Updated
- [x] **twitter:image** — References `/og-image.jpg`

### Files
- [x] **favicon.svg** — Created ✅
- [x] **robots.txt** — Created ✅
- [x] **sitemap.xml** — Created ✅
- [x] **og-image** — Placeholder SVG created (replace with JPG before launch)

**Action required:**
- [ ] **Replace `/public/og-image.svg` with `/public/og-image.jpg`**
  - See `/public/OG-IMAGE-INSTRUCTIONS.md` for specs
  - 1200×630px JPG recommended

**Test after deploy:**
- [ ] View page source → verify meta tags
- [ ] Test favicon displays in browser tab
- [ ] Paste URL into Facebook → verify OG preview
- [ ] Paste URL into Twitter → verify card preview
- [ ] Paste URL into LinkedIn → verify preview
- [ ] Check robots.txt accessible at `https://velorapro.com/robots.txt`
- [ ] Check sitemap accessible at `https://velorapro.com/sitemap.xml`

---

## ✅ Phase 5 — Accessibility

- [x] **All images have alt text** — Founder photo: "Dr Mohammad Alipanahi, Founder of Velora"
- [x] **Form inputs have aria-label** — All inputs labeled
- [x] **Validation errors** — Have `aria-invalid` and `aria-describedby`
- [x] **Status messages** — Have `role="status"` or `role="alert"`
- [x] **Live regions** — Use `aria-live="polite"`
- [x] **Focus styles** — Using `focus:ring` utilities
- [x] **Email link** — Has `aria-label="Email the founder of Velora"`
- [x] **Button labels** — All buttons have clear text or aria-labels

**Test after deploy:**
- [ ] Tab through entire page → verify focus visible
- [ ] Submit empty form → verify errors announced
- [ ] Use screen reader → verify all content accessible
- [ ] Test keyboard navigation (no mouse)
- [ ] Verify reduced motion preferences respected

---

## ✅ Phase 6 — Performance

- [x] **Founder image** — `loading="lazy"` added
- [x] **LOI iframe** — `loading="lazy"` present
- [x] **Font preconnect** — Google Fonts preconnected
- [x] **Console.log removed** — No debug statements in production
- [x] **JS bundles** — Using Vite optimization

**Test after deploy:**
- [ ] Run Lighthouse audit → target 90+ performance
- [ ] Check Network tab → verify lazy loading
- [ ] Test on 3G connection → acceptable load time

---

## ✅ Phase 7 — Security

### Headers (netlify.toml)
- [x] **X-Frame-Options** — SAMEORIGIN
- [x] **X-Content-Type-Options** — nosniff
- [x] **Referrer-Policy** — strict-origin-when-cross-origin
- [x] **Permissions-Policy** — camera=(), microphone=(), geolocation=()

### Backup (_headers file)
- [x] **_headers file** — Created at `/public/_headers`

**Test after deploy:**
- [ ] Open DevTools → Network → Select any file
- [ ] Check Response Headers → verify all security headers present
- [ ] Verify headers using securityheaders.com

---

## 🔍 Pre-Deployment Verification

### Build Test (Local)
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] dist/ folder created
- [ ] dist/index.html contains hidden Netlify form
- [ ] dist/_redirects file exists
- [ ] dist/_headers file exists
- [ ] dist/robots.txt exists
- [ ] dist/sitemap.xml exists
- [ ] dist/favicon.svg exists

### Preview Test (Local)
```bash
npm run preview
```
- [ ] Site loads at http://localhost:4173
- [ ] All sections visible
- [ ] Form submission works (network tab shows POST to /)
- [ ] LOI gate functions correctly
- [ ] No console errors

---

## 🚀 Netlify Deployment Steps

### 1. Connect Repository
- [ ] Log in to Netlify
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Connect to Git repository
- [ ] Select the Velora repository

### 2. Configure Build Settings
**Build command:** `npm run build`  
**Publish directory:** `dist`  
**Node version:** 18 (set in netlify.toml)

- [ ] Verify settings match netlify.toml
- [ ] No environment variables needed (using native Netlify Forms)

### 3. Deploy
- [ ] Click "Deploy site"
- [ ] Wait for build to complete (~2-3 minutes)
- [ ] Check build log for errors

### 4. Configure Domain
- [ ] Add custom domain: `velorapro.com`
- [ ] Configure DNS records (provided by Netlify)
- [ ] Enable HTTPS (automatic)
- [ ] Wait for SSL certificate (a few minutes)

### 5. Verify Netlify Forms
- [ ] Navigate to site Settings → Forms
- [ ] Verify "velora-contact" form appears in list
- [ ] Enable form notifications:
  - Email: `founder@velorapro.com`
  - Subject: "New Velora enquiry"
- [ ] (Optional) Enable spam filtering

---

## ✅ Post-Deployment Testing

### Critical Path
- [ ] **Homepage loads** — https://velorapro.com/
- [ ] **All sections render** — Hero, Mission, Features, Pilot, Investors, Alignment, Founder, Contact
- [ ] **Contact form submits** — Fill and submit → success card appears
- [ ] **Netlify receives submission** — Check Netlify dashboard
- [ ] **Email notification sent** — Check founder@velorapro.com inbox

### LOI Gate Flow
- [ ] Click "Review & Sign Pilot LOI"
- [ ] Access gate appears
- [ ] Enter invalid code → error shown
- [ ] Enter `velora` → iframe loads
- [ ] Adobe Sign form renders
- [ ] Test signing process

### SEO & Social
- [ ] View source → all meta tags present
- [ ] Favicon displays in browser
- [ ] Share on Facebook → preview correct
- [ ] Share on Twitter → card displays
- [ ] Share on LinkedIn → preview correct

### Responsive Design
- [ ] Mobile (375px) — all content readable
- [ ] Tablet (768px) — layout adapts
- [ ] Desktop (1440px) — full layout
- [ ] Test on real iPhone/Android device

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader announces content
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible

### Performance
- [ ] Lighthouse score → 90+ recommended
- [ ] PageSpeed Insights → good scores
- [ ] Load time < 3 seconds on 4G

---

## 📊 Success Criteria

All items below must pass:

- ✅ Site loads without errors
- ✅ All sections render correctly
- ✅ Contact form submits to Netlify Forms
- ✅ Email notifications received
- ✅ LOI access gate functions
- ✅ No 404 errors on page refresh
- ✅ Security headers present
- ✅ SEO meta tags complete
- ✅ Social sharing previews work
- ✅ Responsive on all devices
- ✅ Accessible (keyboard + screen reader)
- ✅ Performance score 90+

---

## ⚠️ Known Issues / Limitations

### OG Image
**Status:** Placeholder SVG in use  
**Action:** Replace with professional 1200×630px JPG before major marketing push  
**Reference:** See `/public/OG-IMAGE-INSTRUCTIONS.md`

### Privacy Policy
**Status:** Link disabled in footer  
**Reason:** Full policy to be published at official launch  
**Code:** Uses `aria-disabled="true"` and non-clickable `<span>`

### Apple Touch Icon
**Status:** Referenced but not created  
**Action:** Create 180×180px PNG icon at `/public/apple-touch-icon.png`  
**Fallback:** Browsers will use favicon.svg

---

## 🔒 Security Notes

- **Honeypot spam protection** — Implemented (field: "website")
- **Rate limiting** — 15 seconds between form submissions (client-side)
- **Input sanitization** — HTML stripped from message field
- **Email validation** — RegEx pattern validation
- **HTTPS enforced** — Netlify automatic
- **Security headers** — Set via netlify.toml + _headers

---

## 📧 Contact Form Fields

**Netlify form name:** `velora-contact`

**Fields:**
1. `name` (text, required)
2. `email` (email, required)
3. `type` (select, required) — Clinic / Investor / Partner / Other
4. `clinic` (text, optional) — Clinic name
5. `message` (textarea, required, 20-2000 chars)
6. `website` (honeypot, hidden)

**Notification email:** founder@velorapro.com

---

## 📈 Post-Launch Monitoring

### Week 1
- [ ] Check Netlify Forms daily for submissions
- [ ] Monitor email delivery
- [ ] Check for broken links
- [ ] Review analytics (if integrated)

### Week 2-4
- [ ] Review form submissions
- [ ] Test LOI conversion rate
- [ ] Gather user feedback
- [ ] Fix any reported issues

---

## 🎯 Final Sign-Off

**Completed by:** [Your Name]  
**Date:** _____________  
**Deployed to:** https://velorapro.com  
**Netlify site ID:** _____________

**Status:**
- [ ] All QA items passing
- [ ] Stakeholder approval received
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Forms tested and working
- [ ] **LIVE AND READY FOR TRAFFIC** 🚀

---

**Next steps after launch:**
1. Replace OG image placeholder with professional design
2. Add apple-touch-icon.png
3. Publish Privacy Policy when ready
4. Monitor form submissions
5. Iterate based on user feedback

**Documentation:** See project root for complete build docs and guides.
