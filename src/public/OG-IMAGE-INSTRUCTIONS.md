# OG Image Replacement Instructions

## Current Status
A placeholder SVG is being used at `/public/og-image.svg`.

## Action Required Before Production
Replace with a proper 1200x630px JPG image:

1. **Create the image:**
   - Size: 1200px × 630px
   - Format: JPG (for best compatibility)
   - File size: < 1MB recommended

2. **Design specifications:**
   - Background: Blush Cream (#F7EEE8)
   - Primary text: Charcoal (#2B2B2B)
   - Accent: Warm Taupe (#D3B8A1), Coral (#E2A79A)
   - Font: Playfair Display for heading, Inter for body

3. **Content:**
   - Main heading: "Velora"
   - Tagline: "Safer, Smarter Aesthetic Care"
   - Subtitle: "Regulated digital-health layer for UK aesthetic clinics"
   - URL: "velorapro.com"

4. **Save as:**
   - `/public/og-image.jpg`

5. **Update references:**
   - The index.html already references `/og-image.jpg`
   - No code changes needed once file is added

## Testing
After adding the real image, test with:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
