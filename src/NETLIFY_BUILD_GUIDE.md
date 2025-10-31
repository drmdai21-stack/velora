# 🚀 Netlify Build & Deployment Guide — Production Ready

**Status**: ✅ Build-Ready for Netlify  
**Node Version**: 18 LTS  
**Build Tool**: Vite 5  
**Deploy Time**: < 5 minutes  

---

## ✅ Pre-Flight Checklist

All Netlify-ready configurations are now in place:

- ✅ **package.json** — Minimal dependencies, Node 18 engines
- ✅ **netlify.toml** — Build config, SPA routing, security headers
- ✅ **.nvmrc** — Node 18 pinned for consistency
- ✅ **vite.config.ts** — Optimized build configuration
- ✅ **tsconfig.json** — TypeScript configuration
- ✅ **.gitignore** — Proper file exclusions
- ✅ **index.html** — Vite entrypoint with SEO meta tags
- ✅ **Formspree only** — Zero Supabase dependencies

---

## 📦 Build Locally (Test First!)

### Step 1: Install Dependencies

```bash
# Use Node 18 (check with: node -v)
# If using nvm:
nvm use 18

# Clean install
npm ci
```

**Expected output**: No errors, all packages installed successfully.

---

### Step 2: Build for Production

```bash
npm run build
```

**Expected output**:
```
vite v5.x.x building for production...
✓ x modules transformed.
dist/index.html                   x.xx kB
dist/assets/index-xxxxx.css      xx.xx kB │ gzip: x.xx kB
dist/assets/index-xxxxx.js      xxx.xx kB │ gzip: xx.xx kB
✓ built in x.xxs
```

---

### Step 3: Preview Locally

```bash
npm run preview
```

Visit: **http://localhost:4173**

**Test checklist**:
- [ ] Homepage loads
- [ ] Navigate to `/pilot` page
- [ ] Navigate to `/privacy` page
- [ ] Contact form submits (test with real email)
- [ ] LOI iframe loads
- [ ] No console errors (F12 → Console)

---

## 📁 Create Production ZIP Files

### ZIP 1: Production Build (Drag & Drop Deploy)

**Name**: `Velora_Website_Final_Build.zip`  
**Contents**: Compiled `dist/` folder contents  
**Purpose**: Netlify drag-and-drop deploy (no build step)

**Steps**:
```bash
# After running npm run build:

# macOS/Linux:
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..

# Windows PowerShell:
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

**Verify**: ZIP should contain `index.html` at root level (NOT inside a `dist/` folder)

---

### ZIP 2: Source Code (Buildable)

**Name**: `Velora_Source_Clean.zip`  
**Contents**: Source files that can be rebuilt  
**Purpose**: GitHub upload or rebuilding from scratch

**Include these files/folders**:
```
✅ package.json
✅ package-lock.json (if exists)
✅ .nvmrc
✅ netlify.toml
✅ .gitignore
✅ .env.example
✅ vite.config.ts
✅ tsconfig.json
✅ tsconfig.node.json
✅ index.html
✅ App.tsx
✅ Router.tsx
✅ /components (entire folder)
✅ /pages (entire folder)
✅ /styles (entire folder)
✅ /guidelines (entire folder)
✅ All .md documentation files
```

**Exclude**:
```
❌ node_modules/
❌ dist/
❌ .git/
❌ .env (keep .env.example only)
❌ .DS_Store
❌ /supabase (not used by app)
❌ /utils/supabase (not used by app)
```

**Steps**:

```bash
# macOS/Linux:
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
  -x "node_modules/*" "dist/*" ".git/*" ".env"

# Windows PowerShell:
# Create a temporary folder first, copy files, then zip
```

**Verify**: Extract and test build:
```bash
unzip Velora_Source_Clean.zip -d test-source
cd test-source
npm ci
npm run build
# Should succeed ✅
```

---

## 🚀 Deploy to Netlify

### Method 1: Drag & Drop (Fastest — No Build)

**Use**: `Velora_Website_Final_Build.zip`

1. **Go to**: https://app.netlify.com/drop

2. **Drag and drop** the production ZIP file

3. **Wait**: ~30 seconds for deployment

4. **Live!** Site available at `https://[random-name].netlify.app`

5. **Custom domain**: 
   - Site settings → Domain management
   - Add custom domain: `velorapro.com`
   - Follow DNS instructions

**Time**: ~2 minutes total

---

### Method 2: Git Integration (Recommended)

**Use**: Push source code to GitHub

1. **Create GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial Velora website - Netlify ready"
   git branch -M main
   git remote add origin https://github.com/[username]/velora-website.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Login: https://app.netlify.com
   - New site from Git
   - Choose GitHub, authorize
   - Select `velora-website` repository

3. **Build settings** (auto-detected from netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (from .nvmrc)

4. **Environment variables** (Optional):
   - Key: `VITE_FORMS_ENDPOINT`
   - Value: `https://formspree.io/f/mdkpoqky`
   - (Not required — fallback is hardcoded)

5. **Deploy**: Click "Deploy site"

6. **Auto-deploy**: Future Git pushes auto-deploy

**Time**: ~10 minutes initial setup, then automatic

---

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Follow prompts to create/link site
```

**Time**: ~5 minutes

---

## 🔧 Netlify Configuration Explained

### netlify.toml

```toml
[build]
  command = "npm run build"    # Build command
  publish = "dist"             # Output directory

[build.environment]
  NODE_VERSION = "18"          # Pin Node version
  NPM_FLAGS = "--legacy-peer-deps"  # Handle peer dependencies

# SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Why this matters**:
- `NODE_VERSION = "18"` ensures consistent builds
- `publish = "dist"` tells Netlify where the built files are
- `[[redirects]]` makes `/pilot` and `/privacy` routes work

---

## ✅ Post-Deployment Testing

### Immediate Tests

1. **Visit deployed URL**: `https://[your-site].netlify.app`

2. **Test navigation**:
   - Click "Pilot Programme" → Should load `/pilot`
   - Click "Privacy Policy" → Should load `/privacy`
   - Click "Velora" logo → Should return to homepage
   - Browser back/forward buttons should work

3. **Test contact form**:
   - Fill out the form
   - Submit
   - Should see success card
   - Check `founder@velorapro.com` inbox within 1 minute

4. **Test LOI signing**:
   - Click "Review & Sign Pilot LOI"
   - Adobe Sign iframe should load
   - Click "Already completed?" trigger
   - Confirmation card should display

5. **Check console** (F12 → Console):
   - Should see: `Formspree endpoint: https://formspree.io/f/mdkpoqky`
   - No red errors

6. **Mobile test**:
   - Open on phone
   - Test navigation
   - Test form submission

---

## 🆘 Troubleshooting

### Build Fails: "npm install failed"

**Check Netlify build log**:
1. Deploys → Failed deploy → View log
2. Look for error message

**Common fixes**:

```toml
# In netlify.toml, add:
[build.environment]
  NPM_FLAGS = "--legacy-peer-deps"
```

Or update package.json:
```json
"engines": {
  "node": "18.x"
}
```

---

### Build Fails: TypeScript Errors

**Check**:
- All imports have `.tsx` extension
- No unused variables
- All types are defined

**Quick fix** (if needed):
```json
// In tsconfig.json:
"noUnusedLocals": false,
"noUnusedParameters": false,
```

---

### Routes Return 404

**Check netlify.toml** has:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Or create `public/_redirects`:
```
/*    /index.html   200
```

---

### Form Not Working

**Check**:
1. Console shows correct endpoint
2. Network tab (F12) shows POST to Formspre
3. No CORS errors
4. Formspree dashboard for submissions

**Fix**:
- Verify endpoint is `https://formspree.io/f/mdkpoqky`
- Check `founder@velorapro.com` spam folder

---

### Assets Not Loading

**Check vite.config.ts**:
```ts
export default defineConfig({
  base: '/',  // Must be '/' not '/velora/'
  // ...
});
```

**Rebuild**:
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 📊 Build Output Verification

### Expected dist/ Structure

```
dist/
├── index.html                  (~5 KB)
├── assets/
│   ├── index-[hash].css        (~20-50 KB)
│   ├── index-[hash].js         (~200-400 KB)
│   └── [image-assets].png/jpg  (various)
└── [other assets]
```

### Size Check

```bash
# After build:
du -sh dist
# Should be: ~1-2 MB total
```

### Content Verification

```bash
# Check index.html exists:
cat dist/index.html | grep "root"
# Should show: <div id="root"></div>

# Check assets compiled:
ls dist/assets/
# Should show: index-*.css, index-*.js
```

---

## 🎯 Success Criteria

### Build is Successful When:

- ✅ `npm ci` completes with zero errors
- ✅ `npm run build` completes with zero errors
- ✅ `dist/` folder created with index.html
- ✅ `npm run preview` serves the site locally
- ✅ All pages accessible (/, /pilot, /privacy)
- ✅ No console errors in browser
- ✅ Contact form submits successfully
- ✅ Email delivered to founder@velorapro.com

### Deploy is Successful When:

- ✅ Netlify build completes (green checkmark)
- ✅ Site loads at deployed URL
- ✅ All routes work (/, /pilot, /privacy)
- ✅ Form submission works end-to-end
- ✅ HTTPS enabled (green padlock)
- ✅ Mobile responsive verified
- ✅ No console errors on production

---

## 💰 Cost Summary

### Netlify Free Tier
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Instant cache invalidation
- ✅ Deploy previews
- ✅ Custom domain
- ✅ HTTPS/SSL included

**Cost**: $0/month

### Formspree Free Tier
- ✅ 50 submissions/month
- ✅ Email notifications
- ✅ Spam filtering

**Cost**: $0/month (upgrade $10/month if needed)

**Total**: $0/month operational cost

---

## 🔄 Updating the Site

### With Git Integration

```bash
# Make changes to code
# Test locally:
npm run dev

# Build and test:
npm run build
npm run preview

# Commit and push:
git add .
git commit -m "Update content"
git push

# Netlify auto-deploys in ~2 minutes ✅
```

### With Drag & Drop

```bash
# Make changes
# Build:
npm run build

# Create new ZIP:
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..

# Drag to Netlify (replaces previous deploy)
```

---

## 📞 Support

### Build Issues
- Check: `npm ci && npm run build` locally first
- Netlify docs: https://docs.netlify.com
- Build logs: Deploys → View log

### Deployment Issues  
- Netlify support: support@netlify.com
- Status page: https://www.netlifystatus.com

### Form Issues
- Formspree dashboard: https://formspree.io/forms/mdkpoqky/submissions
- Formspree support: support@formspree.io

---

## ✅ Final Checklist

### Before Creating ZIPs
- [ ] `npm ci` succeeds locally
- [ ] `npm run build` succeeds locally
- [ ] `npm run preview` works locally
- [ ] All pages load in preview
- [ ] Contact form works in preview
- [ ] No console errors in preview

### Production ZIP
- [ ] Contains `dist/` contents only
- [ ] `index.html` at root level (not in dist/ folder)
- [ ] File size ~1-2 MB
- [ ] Can be deployed via drag & drop

### Source ZIP
- [ ] Contains all source files
- [ ] Excludes node_modules/, dist/
- [ ] Includes package.json, netlify.toml, .nvmrc
- [ ] Can be rebuilt with `npm ci && npm run build`

### After Deployment
- [ ] Site loads at production URL
- [ ] All routes work (/, /pilot, /privacy)
- [ ] Form submits and email delivered
- [ ] HTTPS enabled
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Custom domain configured (if needed)

---

## 🎉 Summary

**Build Configuration**: ✅ Complete  
**Dependencies**: ✅ Minimal and clean  
**Netlify Config**: ✅ Optimized  
**Node Version**: ✅ Pinned to 18  
**Supabase**: ✅ Completely removed  
**Formspree**: ✅ Production-ready  

**Ready to deploy!**

---

**Time to Production**:
- Build ZIPs: ~5 minutes
- Deploy (drag & drop): ~2 minutes  
- Deploy (Git): ~10 minutes initial, then automatic
- **Total**: < 15 minutes to live site

---

**The Velora website is Netlify-ready and cleared for deployment! 🚀**
