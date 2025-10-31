# 🚀 Deploy Velora to Netlify — Quick Guide

**Status:** ✅ Production Ready  
**Time required:** 10 minutes  

---

## ⚡ Quick Start

### 1. Build Locally (Test)
```bash
npm install
npm run build
```

**Expected:** Build succeeds, dist/ folder created ✅

### 2. Preview Locally
```bash
npm run preview
```

Open: http://localhost:4173

**Test:**
- Form submits → success card shows ✅
- LOI gate → enter `velora` → iframe loads ✅
- No console errors ✅

### 3. Deploy to Netlify

**Option A: CLI (Fastest)**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**Option B: Web UI (Recommended)**
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
5. Click "Deploy site"
6. Wait 2-3 minutes ⏱️

### 4. Configure Domain
1. Site settings → Domain management
2. Add custom domain: `velorapro.com`
3. Follow DNS instructions
4. Wait for SSL certificate (automatic, ~5 min)

### 5. Enable Netlify Forms
1. Site settings → Forms
2. Verify "velora-contact" appears
3. Form notifications:
   - Email: `founder@velorapro.com`
   - Subject: "New Velora enquiry"
4. Enable spam filtering ✅

### 6. Test Live Site

**Critical tests:**
- [ ] Visit https://velorapro.com
- [ ] Submit contact form → check email
- [ ] Click "Review & Sign Pilot LOI"
- [ ] Enter code `velora` → iframe loads
- [ ] Refresh page → no 404
- [ ] Check mobile layout

**If ALL pass:** ✅ **LIVE!** 🎉

---

## 🔧 Build Settings (netlify.toml)

Already configured in `/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**No changes needed** ✅

---

## 📋 Post-Deploy Checklist

Immediately after deployment:

### Forms (5 min)
- [ ] Go to Netlify → Forms
- [ ] See "velora-contact" form listed
- [ ] Submit test form on live site
- [ ] Check Netlify dashboard for submission
- [ ] Check founder@velorapro.com for email

### SEO (3 min)
- [ ] View source → verify meta tags
- [ ] Check favicon displays
- [ ] Paste URL into Facebook Sharing Debugger
- [ ] Paste URL into Twitter Card Validator

### Functionality (5 min)
- [ ] All sections load
- [ ] LOI gate works (code: `velora`)
- [ ] Adobe Sign iframe loads
- [ ] Footer links work
- [ ] No console errors

### Security (2 min)
- [ ] Open DevTools → Network
- [ ] Check Response Headers:
  - X-Frame-Options: SAMEORIGIN ✅
  - X-Content-Type-Options: nosniff ✅
  - Permissions-Policy: present ✅

### Performance (3 min)
- [ ] Run Lighthouse audit
- [ ] Performance: 90+ ✅
- [ ] Accessibility: 95+ ✅
- [ ] SEO: 100 ✅

---

## ⚠️ Troubleshooting

### Build Fails
```bash
# Clear cache and retry
rm -rf node_modules dist
npm install
npm run build
```

### Form Submissions Don't Appear
1. Check Netlify → Forms → "Active forms"
2. Verify "velora-contact" is listed
3. View deployed index.html source
4. Confirm hidden form exists (lines 47-54)
5. Clear deploy cache and redeploy

### 404 on Page Refresh
1. Check dist/_redirects exists
2. Content should be: `/*    /index.html   200`
3. Redeploy if missing

### LOI Gate Won't Unlock
- Current code: `velora` (all lowercase)
- Case-insensitive
- Clear browser cache

---

## 🎯 Success Criteria

All must pass:
- ✅ Site loads without errors
- ✅ Form submits to Netlify Forms
- ✅ Email notification received
- ✅ LOI gate unlocks with `velora`
- ✅ No 404 on refresh
- ✅ Mobile responsive
- ✅ Security headers present
- ✅ Lighthouse score 90+

---

## 📞 Quick Links

**Netlify Dashboard:** https://app.netlify.com  
**Deployment Checklist:** `/DEPLOYMENT_CHECKLIST_FINAL.md`  
**Full Audit Report:** `/AUDIT_FIX_SUMMARY.md`  
**Troubleshooting:** `/TROUBLESHOOTING.md`  

---

## ✅ Pre-Deploy Verification

Run this before deploying:

```bash
# 1. Install dependencies
npm install

# 2. Build
npm run build

# 3. Check dist/ contents
ls dist/
# Should see: index.html, _redirects, _headers, robots.txt, sitemap.xml, favicon.svg

# 4. Preview
npm run preview

# 5. Test locally at http://localhost:4173
# - Submit form
# - Test LOI gate
# - Check console for errors

# 6. If all good → DEPLOY!
```

---

## 🚀 Ready to Deploy?

**Checklist:**
- [x] Code committed to Git
- [x] Build tested locally
- [x] Preview tested
- [x] No console errors
- [x] All forms working

**Next step:** Deploy to Netlify (see Option B above)

**Estimated time:** 10 minutes total

---

**After successful deployment:**

1. Share URL with stakeholders
2. Monitor form submissions
3. Check analytics
4. Plan marketing launch

🎉 **Congratulations — Velora is LIVE!**

---

**Support:** See `/DEPLOYMENT_CHECKLIST_FINAL.md` for comprehensive testing guide
