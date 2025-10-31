# Navigation Guide

## Current Setup

The Velora website has three main pages:

1. **Home Page** (`/`) - Main landing page in `App.tsx`
2. **Pilot Page** (`/pilot`) - Detailed pilot program in `pages/PilotPage.tsx`
3. **Privacy Page** (`/privacy`) - Privacy policy in `pages/PrivacyPage.tsx`

## Using the Router

To enable multi-page navigation in your application:

### Option 1: Replace App.tsx with Router (Recommended for Production)

If you want true multi-page routing, replace the default export in `App.tsx`:

```tsx
// Instead of current App.tsx content, use:
export { default } from './Router';
```

This will enable:
- `/` → Home page
- `/pilot` → Pilot page
- `/privacy` → Privacy page

### Option 2: Keep as Single-Page Application (Current)

The current setup treats everything as a single page with smooth scrolling. To navigate between conceptual "pages":

1. All sections are on the home page with anchor links
2. The `/pilot` and `/privacy` content can be accessed by:
   - Creating separate deployments
   - Or manually importing and rendering those components

## Adding Navigation Links

To link between pages in the header or footer, use these patterns:

### In Header Component

```tsx
<a href="/pilot" className="...">Pilot Program</a>
<a href="/privacy" className="...">Privacy</a>
```

### In Footer Component

Already implemented:
```tsx
<a href="/" className="...">Home</a>
<a href="/pilot" className="...">Pilot Program</a>
<a href="/privacy" className="...">Privacy Policy</a>
```

## Scroll Behavior

Both approaches support:
- Smooth scrolling to sections within a page
- Browser back/forward navigation
- Keyboard accessibility
- Mobile-friendly navigation

## For Production Deployment

When deploying to a production server:

1. **Single-Page App**: Deploy `App.tsx` as-is
2. **Multi-Page App**: 
   - Use the Router
   - Configure server to handle client-side routing
   - Set up proper redirects for `/pilot` and `/privacy`

## Internal vs External Links

- **Internal sections** (same page): Use `scrollToSection()` function
- **External pages** (/pilot, /privacy): Use `<a href="/path">` with Router
- **External sites**: Use `<a href="https://..." target="_blank" rel="noopener">`
