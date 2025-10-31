# ⚡ Quick Guide — Create Both Archives

**Two archives required for production deployment**

---

## 📦 What You'll Create

### 1. Velora_Website_Final_Build.zip (~1-2 MB)
- **Contains**: Compiled files from `dist/`
- **Use**: Drag-and-drop to Netlify (instant deploy)

### 2. Velora_Source_Clean.zip (~500 KB - 2 MB)
- **Contains**: Full source code (no node_modules or dist)
- **Use**: Backup, version control, developer handoff

---

## 🚀 Quick Commands

### macOS/Linux — Complete Process

```bash
# 1. Install & Build
npm install
npm run build

# 2. Test (optional but recommended)
npm run preview
# Open http://localhost:4173, test, then press Ctrl+C

# 3. Create Archive #1 (Production Build)
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..

# 4. Create Archive #2 (Source Code)
zip -r Velora_Source_Clean.zip . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".env" \
  -x "package-lock.json" \
  -x ".git/*" \
  -x "*.zip"

# 5. Verify both archives
ls -lh *.zip
unzip -l Velora_Website_Final_Build.zip | head -10
```

**Time**: ~5 minutes

---

### Windows PowerShell — Complete Process

```powershell
# 1. Install & Build
npm install
npm run build

# 2. Test (optional but recommended)
npm run preview
# Open http://localhost:4173, test, then press Ctrl+C

# 3. Create Archive #1 (Production Build)
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force

# 4. Create Archive #2 (Source Code) - Manual selection
$source = @(
  'App.tsx', 'Router.tsx', 'index.html', 'package.json',
  'vite.config.ts', 'tsconfig.json', 'netlify.toml',
  'components', 'pages', 'styles', 'utils', '*.md'
)
Compress-Archive -Path $source -DestinationPath Velora_Source_Clean.zip -Force

# 5. Verify both archives
Get-ChildItem *.zip
```

**Time**: ~5 minutes

---

## ✅ Verification Checklist

### After Creating Archives

#### Archive #1 — Production Build
```bash
# macOS/Linux
unzip -l Velora_Website_Final_Build.zip | head -10

# Windows
Expand-Archive -Path Velora_Website_Final_Build.zip -DestinationPath test -Force; dir test; Remove-Item -Recurse -Force test
```

**Expected**:
- [ ] File size: ~1-2 MB
- [ ] Contains `index.html` at ROOT level (not in dist/)
- [ ] Contains `assets/` folder at ROOT level

#### Archive #2 — Source Code
```bash
# macOS/Linux
unzip -l Velora_Source_Clean.zip | head -20

# Windows
Expand-Archive -Path Velora_Source_Clean.zip -DestinationPath test-src -Force; dir test-src; Remove-Item -Recurse -Force test-src
```

**Expected**:
- [ ] File size: ~500 KB - 2 MB
- [ ] Contains `package.json`, `vite.config.ts`
- [ ] Contains `components/`, `pages/`, `styles/`
- [ ] Does NOT contain `node_modules/`
- [ ] Does NOT contain `dist/`

---

## 🚀 Deploy Archive #1

1. Open: https://app.netlify.com/drop
2. Drag: `Velora_Website_Final_Build.zip`
3. Wait: ~30 seconds
4. Live: Test at deployed URL
5. Verify: Form works, all pages load

---

## 🆘 Common Issues

### Archive #1 contains `dist/` folder inside

**Fix (macOS/Linux)**:
```bash
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..
```

**Fix (Windows)**:
```powershell
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

Use `dist\*` (contents), not `dist` (folder).

---

### Archive #2 is too large (>10 MB)

**Problem**: Included `node_modules/` or `dist/`

**Fix**: Recreate with exclusions (see commands above)

---

### Build fails

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Expected Results

| Archive | Size | Contains |
|---------|------|----------|
| **#1 Production** | 1-2 MB | dist/ contents (index.html, assets/) |
| **#2 Source** | 500KB-2MB | All source code (no node_modules/dist) |

---

## 🎯 Next Steps

1. ✅ Create both archives using commands above
2. ✅ Verify archive contents
3. ✅ Deploy Archive #1 to Netlify
4. ✅ Store Archive #2 for backup
5. ✅ Test production site

---

**Complete guide**: See `CREATE_BOTH_ZIPS.md`  
**Build details**: See `BUILD_INSTRUCTIONS.md`  
**Netlify deploy**: See `NETLIFY_DEPLOY.md`

---

**Total time: ~5-7 minutes from start to both archives ready! ⚡**
