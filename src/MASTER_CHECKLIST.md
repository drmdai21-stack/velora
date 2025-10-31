# ✅ Master Deployment Checklist — Velora Website

**Use this as your single-page deployment reference**

---

## 🎯 Pre-Deployment (5 minutes)

### Step 1: Verify Node Version
```bash
node -v
# Should output: v18.x.x

# If not using Node 18:
nvm use 18
# or install Node 18 LTS
```
- [ ] Node 18 installed and active

---

### Step 2: Clean Install & Build
```bash
# Clean slate
rm -rf node_modules package-lock.json

# Install
npm ci

# Build
npm run build
```

**Expected output**:
```
✓ packages installed successfully
✓ vite build completes
✓ dist/ folder created
```

- [ ] `npm ci` succeeded
- [ ] `npm run build` succeeded with no errors
- [ ] `dist/` folder exists

---

### Step 3: Local Preview Test
```bash
npm run preview
```

**Visit**: http://localhost:4173

**Test (2 minutes)**:
- [ ] Homepage (/) loads
- [ ] Pilot page (/pilot) loads
- [ ] Privacy page (/privacy) loads
- [ ] Click navigation links (all work)
- [ ] Submit contact form (with your email)
- [ ] Check inbox for email from Formspree
- [ ] Check console (F12) — only info log, no errors

**If all tests pass** → Proceed to create ZIPs

---

## 📦 Create Deployment Files (2 minutes)

### Production ZIP (for Netlify drag-drop)

**macOS/Linux**:
```bash
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..
```

**Windows PowerShell**:
```powershell
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

**Verify**:
```bash
# Check file size
ls -lh Velora_Website_Final_Build.zip
# Should be ~1-2 MB

# Verify structure (extract to test folder)
unzip Velora_Website_Final_Build.zip -d test-prod
ls test-prod
# Should show: index.html, assets/ (at root level, NOT in dist/)
```

- [ ] ZIP created successfully
- [ ] File size ~1-2 MB
- [ ] Contains index.html at root
- [ ] Contains assets/ folder

---

### Source ZIP (optional, for GitHub/rebuilding)

**Include**:
```bash
zip -r Velora_Source_Clean.zip \
  package.json \
  .nvmrc \
  netlify.toml \
  .gitignore \
  .env.example \
  vite.config.ts \
  tsconfig.json \
  tsconfig.node.json \
  index.html \
  App.tsx \
  Router.tsx \
  components \
  pages \
  styles \
  guidelines \
  *.md \
  -x "node_modules/*" "dist/*" ".git/*" ".env" "supabase/*" "utils/supabase/*"
```

**Verify**:
```bash
# Extract and test rebuild
unzip Velora_Source_Clean.zip -d test-source
cd test-source
npm ci
npm run build
# Should succeed ✅
cd ..
```

- [ ] Source ZIP created
- [ ] Can be rebuilt successfully

---

## 🚀 Deploy to Netlify (3 minutes)

### Option A: Drag & Drop (Fastest)

1. **Open**: https://app.netlify.com/drop

2. **Drag**: `Velora_Website_Final_Build.zip`

3. **Wait**: ~30 seconds for upload and deployment

4. **Live!**: Site available at `https://[random-name].netlify.app`

5. **Custom Domain** (optional, 5 more minutes):
   - Click site name
   - Site settings → Domain management
   - Add custom domain → `velorapro.com`
   - Update DNS at your registrar:
     ```
     A     @     75.2.60.5
     CNAME www   [your-site].netlify.app
     ```
   - Wait 10-30 minutes for DNS propagation

- [ ] Drag & drop successful
- [ ] Site live at Netlify URL
- [ ] Custom domain configured (if needed)

---

### Option B: Git Integration (Best for Updates)

1. **Create GitHub repo**:
   ```bash
   git init
   git add .
   git commit -m "Velora website - Netlify ready"
   git branch -M main
   git remote add origin https://github.com/[username]/velora-website.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Login: https://app.netlify.com
   - New site from Git
   - Choose GitHub → Authorize
   - Select `velora-website` repository

3. **Build settings** (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 (from .nvmrc)

4. **Deploy**: Click "Deploy site"

5. **Auto-deploy**: Future Git pushes auto-deploy ✅

- [ ] Git repo created and pushed
- [ ] Connected to Netlify
- [ ] First build succeeded
- [ ] Auto-deploy enabled

---

## ✅ Post-Deployment Verification (3 minutes)

### Production Site Tests

**Visit**: Your Netlify URL or velorapro.com

**Critical Tests**:
- [ ] Homepage loads (no errors)
- [ ] Click "Pilot Programme" → /pilot loads
- [ ] Click "Privacy Policy" → /privacy loads
- [ ] Click Velora logo → returns to homepage
- [ ] Browser back/forward buttons work
- [ ] HTTPS enabled (green padlock in browser)

**Form Test**:
- [ ] Fill out contact form with YOUR email
- [ ] Submit form
- [ ] Success card displays
- [ ] Check YOUR inbox within 1 minute
- [ ] Email from Formspree received
- [ ] Reply-to is founder@velorapro.com

**LOI Test**:
- [ ] Click "Review & Sign Pilot LOI"
- [ ] Adobe Sign iframe loads
- [ ] Click "Already completed?" trigger
- [ ] Confirmation card displays
- [ ] "Return to Velora Home" button works

**Mobile Test**:
- [ ] Open site on phone
- [ ] Navigation works
- [ ] Forms work
- [ ] Responsive layout looks good

**Console Check** (F12 → Console):
- [ ] Info log: "Formspree endpoint: https://formspree.io/f/mdkpoqky"
- [ ] No red error messages
- [ ] No 404 errors in Network tab

---

## 🎯 Success Criteria

### All Must Pass ✅

| Check | Status | Notes |
|-------|--------|-------|
| Build succeeds locally | ☐ | `npm run build` |
| Preview works locally | ☐ | `npm run preview` |
| Production ZIP created | ☐ | ~1-2 MB |
| Deployed to Netlify | ☐ | Live URL |
| All pages load | ☐ | /, /pilot, /privacy |
| Form submits | ☐ | Email received |
| LOI iframe works | ☐ | Loads correctly |
| HTTPS enabled | ☐ | Green padlock |
| Mobile responsive | ☐ | Tested on device |
| No console errors | ☐ | F12 clean |

**When all pass** → ✅ **DEPLOYMENT SUCCESSFUL**

---

## 🆘 Quick Troubleshooting

### Build fails: "npm install failed"
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Routes return 404 on Netlify
**Check**: `netlify.toml` exists with redirects  
**Fix**: Redeploy (should auto-detect netlify.toml)

### Form not working
**Check**: Console for endpoint  
**Verify**: `https://formspree.io/f/mdkpoqky`  
**Test**: Submit from production URL (not localhost)

### Images not loading
**Check**: `vite.config.ts` has `base: '/'`  
**Fix**: Rebuild and redeploy

### TypeScript errors prevent build
**Quick fix**: In `tsconfig.json`:
```json
"noUnusedLocals": false,
"noUnusedParameters": false
```

---

## 📚 Documentation Quick Reference

| Need | Document |
|------|----------|
| Full build guide | `NETLIFY_BUILD_GUIDE.md` |
| Acceptance checklist | `BUILD_VERIFICATION.md` |
| Complete status | `DEPLOYMENT_COMPLETE.md` |
| Quick commands | `QUICK_DEPLOY.md` |
| Form details | `CONTACT_FORM.md` |
| General issues | `TROUBLESHOOTING.md` |

---

## 🎉 Final Verification

### Before You Call It Done

- [ ] ✅ Site deployed and live
- [ ] ✅ All pages accessible
- [ ] ✅ Contact form works end-to-end
- [ ] ✅ Email delivered to founder@velorapro.com
- [ ] ✅ LOI iframe functional
- [ ] ✅ Mobile responsive verified
- [ ] ✅ HTTPS enabled
- [ ] ✅ No console errors
- [ ] ✅ Custom domain configured (if applicable)
- [ ] ✅ DNS propagated (if custom domain)

**All checked?** → 🎉 **DEPLOYMENT COMPLETE!**

---

## 📞 Emergency Contacts

**Netlify Issues**: support@netlify.com  
**Formspree Issues**: support@formspree.io  
**DNS Issues**: Your domain registrar support  

---

## 📊 Timeline Summary

| Task | Time |
|------|------|
| Local build & test | 5 min |
| Create production ZIP | 2 min |
| Deploy to Netlify | 2 min |
| Post-deploy tests | 3 min |
| Configure domain (optional) | 10 min |
| **Total** | **12-22 min** |

---

## ✅ Sign-Off

**Build Status**: Production Ready  
**Configuration**: Complete  
**Documentation**: Comprehensive  
**Deployment**: Cleared  

**GO/NO-GO**: **GO! 🚀**

---

**Everything you need to deploy Velora to production in < 15 minutes!**

**Start at Step 1 and work through systematically. Check boxes as you go. When all boxes are checked, you're LIVE! 🎉**
