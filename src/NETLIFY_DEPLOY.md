# 🚀 Netlify Deployment — Quick Start

**Ready to deploy Velora to `velorapro.com` in under 5 minutes!**

---

## ⚡ Super Quick Deploy (No Configuration Needed!)

### Option 1: Drag & Drop (Fastest — 2 Minutes)

1. **Build the site locally**:
   ```bash
   npm install
   npm run build
   ```

2. **Create ZIP of dist folder**:
   - Right-click on the `dist/` folder
   - Select "Compress" or "Send to → Compressed folder"
   - Name it `velora-build.zip`

3. **Deploy to Netlify**:
   - Go to: https://app.netlify.com/drop
   - Drag and drop `velora-build.zip`
   - Site goes live instantly at a random URL

4. **Add custom domain**:
   - Site settings → Domain management
   - Add custom domain: `velorapro.com`
   - Follow DNS instructions

**Done! ✅**

---

### Option 2: Git Integration (Best for Updates)

1. **Push code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial Velora website"
   git branch -M main
   git remote add origin https://github.com/[your-username]/velora-website.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Login to Netlify: https://app.netlify.com
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your `velora-website` repository

3. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Click "Deploy site"

4. **Wait 2-3 minutes** for first build

5. **Add custom domain**:
   - Site settings → Domain management
   - Add custom domain: `velorapro.com`

**Done! ✅ Future updates deploy automatically on Git push.**

---

### Option 3: Netlify CLI (Developer-Friendly)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Build and deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

4. **Follow prompts**:
   - Create & configure new site? Yes
   - Team: Select your team
   - Site name: velora-pro (or similar)

5. **Site is live!**

**Done! ✅**

---

## 🔧 Build Configuration

### Build Settings (for Git Integration)

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Node version** | 18 or 20 (auto-detected) |

### Environment Variables (Optional)

**Not required!** The site works immediately with zero configuration.

**Optional for flexibility**:
- Variable: `VITE_FORMS_ENDPOINT`
- Value: `https://formspree.io/f/mdkpoqky`

---

## 🌐 Custom Domain Setup

### DNS Configuration for velorapro.com

After adding custom domain in Netlify, configure DNS:

#### Apex Domain (@)
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600
```

#### WWW Subdomain
```
Type: CNAME
Name: www
Value: [your-site-name].netlify.app
TTL: 3600
```

#### Verify DNS Propagation
- Check: https://dnschecker.org
- Search: `velorapro.com`
- Wait for global propagation (5-30 minutes)

---

## ✅ Post-Deploy Checklist

### Immediate Testing
- [ ] Visit deployed URL
- [ ] Check all pages load: `/`, `/pilot`, `/privacy`
- [ ] Test navigation between pages
- [ ] Scroll through all sections

### Contact Form Testing
- [ ] Fill out contact form with test data
- [ ] Submit form
- [ ] Verify success message displays
- [ ] Check founder@velorapro.com inbox
- [ ] Confirm email received within 1 minute

### LOI Testing
- [ ] Click "Review & Sign Pilot LOI" button
- [ ] Verify Adobe Sign iframe loads
- [ ] Check "Already completed?" trigger works
- [ ] Verify confirmation card displays
- [ ] Test "Return to Velora Home" button

### Mobile Testing
- [ ] Open on iPhone/Android
- [ ] Test navigation
- [ ] Test contact form
- [ ] Verify responsive layout
- [ ] Check touch targets (buttons, links)

### Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Edge (desktop)

### Performance
- [ ] Run Lighthouse audit (target 90+)
- [ ] Check page load speed (< 3 seconds)
- [ ] Verify images load correctly
- [ ] Check no console errors

---

## 📊 Monitoring

### Netlify Dashboard
- **Analytics**: Site settings → Analytics
- **Build logs**: Deploys → View logs
- **Bandwidth**: Usage → Bandwidth

### Formspree Dashboard
- **Submissions**: https://formspree.io/forms/mdkpoqky/submissions
- **Check**: Weekly
- **Export**: Monthly CSV backup

### Email Monitoring
- **Inbox**: founder@velorapro.com
- **Response time**: Within 2 business days
- **Check**: Daily

---

## 🔄 Updating the Site

### With Git Integration (Automatic)
```bash
# Make changes to code
# Commit and push
git add .
git commit -m "Update homepage content"
git push

# Netlify auto-deploys in 2-3 minutes!
```

### With Drag & Drop (Manual)
```bash
# Make changes
npm run build

# Create new ZIP of dist/
# Drag to Netlify (replaces previous deploy)
```

---

## 🆘 Troubleshooting

### Build Fails on Netlify

**Check build logs**:
1. Deploys → Failed deploy → View log
2. Look for error messages

**Common issues**:
- Node version mismatch → Set Node version to 18 in build settings
- Missing dependencies → Verify package.json is committed
- Build timeout → Contact Netlify support

**Fix**:
```bash
# Test build locally first
npm install
npm run build

# If successful locally, retry Netlify deploy
```

---

### Form Not Working

**Check**:
- Console errors (F12 → Console tab)
- Network tab shows POST to Formspree
- Formspree dashboard for submissions

**Fix**:
- Verify endpoint is `https://formspree.io/f/mdkpoqky`
- Check founder@velorapro.com spam folder
- Test from different browser

---

### Domain Not Connecting

**Check**:
- DNS records correctly set
- DNS propagation (https://dnschecker.org)
- SSL certificate issued (can take 24 hours)

**Fix**:
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records with Netlify's instructions
- Check domain registrar settings

---

### Images Not Loading

**Check**:
- Build includes assets folder
- Network tab shows 200 responses for images
- Console for 404 errors

**Fix**:
```bash
# Rebuild
npm run build

# Check dist/assets/ contains images
ls dist/assets/

# Redeploy
```

---

## 📈 Optimization Tips

### Performance
- ✅ Images already optimized in build
- ✅ CSS/JS minified automatically
- ✅ Lazy loading implemented
- Consider: Enable Netlify image optimization (paid feature)

### SEO
- Add `og:image` meta tag
- Add `favicon.ico`
- Submit sitemap to Google
- Enable Netlify Analytics

### Security
- ✅ HTTPS enabled automatically
- ✅ Netlify edge security active
- Consider: Add Cloudflare for DDoS protection
- Consider: Configure CSP headers

---

## 💰 Cost

### Netlify Free Tier Includes:
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included
- ✅ Custom domain
- ✅ Continuous deployment

**Velora website**: Well within free tier limits!

### Formspree Free Tier:
- ✅ 50 submissions/month
- ✅ Email notifications
- ✅ Spam filtering
- ✅ Submission archive

**Upgrade if needed**: $10/month for unlimited submissions

---

## 🎯 Success Indicators

### Site is Production-Ready When:
- ✅ All pages load in < 3 seconds
- ✅ Contact form delivers email
- ✅ LOI iframe loads and works
- ✅ Mobile responsive verified
- ✅ No console errors
- ✅ HTTPS enabled
- ✅ Custom domain connected

---

## 📞 Support Resources

### Netlify
- **Docs**: https://docs.netlify.com
- **Support**: https://www.netlify.com/support
- **Status**: https://www.netlifystatus.com
- **Community**: https://answers.netlify.com

### Formspree
- **Docs**: https://help.formspree.io
- **Support**: support@formspree.io
- **Status**: https://status.formspree.io

### Domain Registrar
- Check your domain provider's documentation

---

## 🎉 Deployment Complete!

Once deployed and tested, your Velora website will be:

✅ **Live at** `velorapro.com`  
✅ **HTTPS secure**  
✅ **Mobile responsive**  
✅ **Forms working**  
✅ **Auto-deploying** (if Git integration)  
✅ **Production ready**  

**Time to launch**: ~5 minutes with drag & drop, ~10 minutes with Git!

---

**Need help?** Refer to:
- `BUILD_READY.md` — Complete build documentation
- `DEPLOYMENT_GUIDE.md` — Detailed deployment guide
- `CONTACT_FORM.md` — Form integration details

**Ready to deploy! 🚀**
