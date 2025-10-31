# Velora Contact Form - Deployment Guide

## ✅ Pre-Deployment Status

The contact form is **production-ready** with no additional configuration needed.

---

## Quick Deploy (All Platforms)

### The form works immediately because:
1. ✅ Production Formspree endpoint is built into the code as fallback
2. ✅ No environment variables required (optional but recommended)
3. ✅ No external configuration needed
4. ✅ No API keys to configure

**Just deploy and it works!**

---

## Deployment by Platform

### Vercel (Recommended)

**Quick Deploy**:
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel
```

**Environment Variable (Optional)**:
1. Go to Project Settings → Environment Variables
2. Add variable:
   - Name: `VITE_FORMS_ENDPOINT`
   - Value: `https://formspree.io/f/mdkpoqky`
3. Redeploy

**Custom Domain**:
1. Project Settings → Domains
2. Add: `velorapro.com`
3. Configure DNS (Vercel provides instructions)

---

### Netlify

**Quick Deploy**:
```bash
# Install Netlify CLI (if not already installed)
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**Environment Variable (Optional)**:
1. Site Settings → Environment Variables
2. Add variable:
   - Key: `VITE_FORMS_ENDPOINT`
   - Value: `https://formspree.io/f/mdkpoqky`
3. Redeploy

**Custom Domain**:
1. Domain Settings → Add custom domain
2. Enter: `velorapro.com`
3. Configure DNS (Netlify provides instructions)

---

### Cloudflare Pages

**Deploy via Dashboard**:
1. Connect your Git repository
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Deploy

**Environment Variable (Optional)**:
1. Settings → Environment Variables
2. Add variable:
   - Variable name: `VITE_FORMS_ENDPOINT`
   - Value: `https://formspree.io/f/mdkpoqky`
3. Redeploy

**Custom Domain**:
1. Custom Domains → Set up custom domain
2. Add: `velorapro.com`
3. DNS automatically configured

---

### AWS Amplify

**Deploy**:
1. Connect Git repository
2. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands:
           - npm ci
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
3. Deploy

**Environment Variable (Optional)**:
1. App Settings → Environment Variables
2. Add variable:
   - Key: `VITE_FORMS_ENDPOINT`
   - Value: `https://formspree.io/f/mdkpoqky`

---

### GitHub Pages

**Note**: GitHub Pages doesn't support environment variables at build time, but the form will work with the built-in fallback endpoint.

**Deploy**:
```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

---

## Post-Deployment Checklist

### Immediate Testing (Do This First!)
- [ ] Visit deployed site
- [ ] Navigate to contact section
- [ ] Submit test message with your email
- [ ] Verify success message appears
- [ ] Check founder@velorapro.com inbox
- [ ] Verify email arrives within 1 minute
- [ ] Reply to test email (check reply-to works)

### SSL/HTTPS
- [ ] HTTPS enabled (most platforms auto-configure)
- [ ] Force HTTPS redirect enabled
- [ ] SSL certificate valid

### DNS Configuration
- [ ] A/CNAME records pointing to hosting provider
- [ ] www redirect configured (if desired)
- [ ] DNS propagation complete (check dnschecker.org)

### Performance
- [ ] Test page load speed (< 3 seconds on 3G)
- [ ] Lighthouse score > 90
- [ ] Forms endpoint responding quickly

### Accessibility
- [ ] Test with keyboard only
- [ ] Test with screen reader
- [ ] Check color contrast (WCAG AA)
- [ ] Verify focus indicators visible

### Cross-Browser Testing
- [ ] Chrome/Edge (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & mobile)

---

## Monitoring Setup

### Email Monitoring
1. **Check founder@velorapro.com regularly**
2. Set up email forwarding (optional):
   - Forward to backup email
   - Set up mobile notifications
3. Add to safe senders list (prevent spam filtering)

### Formspree Dashboard
1. Visit: https://formspree.io/forms/mdkpoqky/submissions
2. Review submissions weekly
3. Monitor spam blocks
4. Check submission volume vs. free tier limit (50/month)

### Error Monitoring (Optional)
Consider adding error tracking:
- Sentry (sentry.io)
- LogRocket (logrocket.com)
- Rollbar (rollbar.com)

---

## Backup & Recovery

### Email Backup
**Formspree stores all submissions** - access anytime at:
https://formspree.io/forms/mdkpoqky/submissions

**Export submissions**:
1. Formspree dashboard → Export to CSV
2. Save backup monthly

### Code Backup
- Git repository (primary backup)
- Download production build
- Keep local copy of environment variables

---

## Scaling Considerations

### Formspree Free Tier
- **Limit**: 50 submissions/month
- **Current**: Production ready for initial launch
- **Monitor**: Check dashboard for volume

### Upgrade Path (If Needed)
**Formspree Pro** ($10/month):
- Unlimited submissions
- Remove Formspree branding
- Custom redirect pages
- Advanced spam filtering
- File uploads
- Webhook integrations

**When to upgrade**:
- Exceeding 50 submissions/month
- Need advanced features
- Want white-label solution

---

## Custom Domain Setup

### DNS Configuration

**For Apex Domain (velorapro.com)**:
```
Type: A
Name: @
Value: [Your hosting provider's IP]
```

**For WWW Subdomain**:
```
Type: CNAME
Name: www
Value: [Your hosting provider's domain]
```

### Vercel Example
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

### Netlify Example
```
A     @     75.2.60.5
CNAME www   [your-site].netlify.app
```

---

## Troubleshooting

### Form submitting but no email received

**Check**:
1. Spam folder in founder@velorapro.com
2. Formspree dashboard → Submissions tab
3. Email address verified in Formspree
4. No email service outages

**Fix**:
1. Add formspree.io to safe senders
2. Check Formspree email settings
3. Contact Formspree support if needed

### Environment variable not working

**Check**:
1. Variable name is exactly: `VITE_FORMS_ENDPOINT`
2. Value is: `https://formspree.io/f/mdkpoqky`
3. Redeployed after adding variable
4. Build logs show variable being set

**Fix**:
- Redeploy application
- Check hosting platform docs
- Form will work anyway with built-in fallback

### CORS errors

**Issue**: Cross-origin request blocked  
**Status**: Should not occur with Formspree  
**Fix**: Check network tab, contact Formspree support

### SSL/HTTPS issues

**Check**:
1. Certificate installed
2. HTTPS redirect enabled
3. Mixed content warnings

**Fix**: Most platforms auto-configure SSL

---

## Production URLs

After deployment, your site will be available at:

- **Primary**: https://velorapro.com
- **WWW**: https://www.velorapro.com (if configured)
- **Platform subdomain**: https://[your-site].vercel.app (or similar)

---

## Security Checklist

- [x] No API keys in code
- [x] Environment variables not committed to Git
- [x] HTTPS enabled
- [x] No cookies without consent
- [x] GDPR compliance notice
- [x] Honeypot spam protection
- [x] Rate limiting enabled
- [x] Input sanitization active
- [ ] Security headers configured (CSP, etc.)
- [ ] DDoS protection enabled (Cloudflare)

---

## Final Steps

### Before Public Launch
1. [ ] Test form submission from production URL
2. [ ] Verify email delivery to founder@velorapro.com
3. [ ] Test on mobile devices
4. [ ] Check all links work
5. [ ] Verify analytics (if any)
6. [ ] Review privacy policy
7. [ ] Check contact information accurate
8. [ ] Test in multiple browsers
9. [ ] Verify page speed acceptable
10. [ ] Screenshot for records

### After Launch
1. [ ] Monitor first few submissions closely
2. [ ] Respond promptly to test submissions
3. [ ] Set up regular monitoring schedule
4. [ ] Review Formspree dashboard weekly
5. [ ] Export submissions monthly
6. [ ] Monitor submission volume

---

## Support Contacts

### Hosting Platform
- **Vercel**: support@vercel.com
- **Netlify**: support@netlify.com
- **Cloudflare**: Support via dashboard

### Formspree
- **Email**: support@formspree.io
- **Help**: https://help.formspree.io
- **Status**: https://status.formspree.io

### Domain Registrar
- Check your domain provider's support

---

## Summary

✅ **Deployment is simple**:
1. Push code to Git
2. Connect to hosting platform
3. Deploy
4. Test form submission
5. Done!

The form will work immediately with no additional configuration needed.

---

**Last Updated**: October 2025  
**Status**: Ready for Production Deployment  
**Version**: 1.0
