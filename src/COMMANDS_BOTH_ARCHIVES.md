# ⚡ Commands — Create Both Archives

**Copy-paste ready commands for both production archives**

---

## 🚀 Complete Process — macOS/Linux

```bash
# Step 1: Install dependencies
npm install

# Step 2: Build for production
npm run build

# Step 3: Test locally (RECOMMENDED)
npm run preview
# Open http://localhost:4173 and test
# Press Ctrl+C to stop when done

# Step 4: Create Archive #1 (Production Build)
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..

# Step 5: Create Archive #2 (Source Code)
zip -r Velora_Source_Clean.zip . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".env" \
  -x "package-lock.json" \
  -x ".git/*" \
  -x "*.zip"

# Step 6: Verify both archives
ls -lh *.zip
echo "=== Archive #1 Contents (first 10 lines) ==="
unzip -l Velora_Website_Final_Build.zip | head -10
echo "=== Archive #2 Contents (first 20 lines) ==="
unzip -l Velora_Source_Clean.zip | head -20

# Done! Upload Velora_Website_Final_Build.zip to:
# https://app.netlify.com/drop
```

**Time**: ~5 minutes ⏱️

---

## 🚀 Complete Process — Windows PowerShell

```powershell
# Step 1: Install dependencies
npm install

# Step 2: Build for production
npm run build

# Step 3: Test locally (RECOMMENDED)
npm run preview
# Open http://localhost:4173 and test
# Press Ctrl+C to stop when done

# Step 4: Create Archive #1 (Production Build)
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force

# Step 5: Create Archive #2 (Source Code)
$sourceFiles = @(
  'App.tsx',
  'Router.tsx',
  'index.html',
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.node.json',
  'netlify.toml',
  'components',
  'pages',
  'styles',
  'utils',
  '*.md'
)
Compress-Archive -Path $sourceFiles -DestinationPath Velora_Source_Clean.zip -Force

# Step 6: Verify both archives
Get-ChildItem *.zip | Format-Table Name, Length

# Done! Upload Velora_Website_Final_Build.zip to:
# https://app.netlify.com/drop
```

**Time**: ~5 minutes ⏱️

---

## 📦 Individual Commands

### Install Dependencies
```bash
npm install
```

### Build for Production
```bash
npm run build
```

### Test Build Locally
```bash
npm run preview
# Open http://localhost:4173
```

### Create Archive #1 (macOS/Linux)
```bash
cd dist && zip -r ../Velora_Website_Final_Build.zip . && cd ..
```

### Create Archive #1 (Windows)
```powershell
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

### Create Archive #2 (macOS/Linux)
```bash
zip -r Velora_Source_Clean.zip . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".env" \
  -x "package-lock.json" \
  -x ".git/*" \
  -x "*.zip"
```

### Create Archive #2 (Windows)
```powershell
$src = @('App.tsx', 'Router.tsx', 'index.html', 'package.json', 'vite.config.ts', 'tsconfig.json', 'netlify.toml', 'components', 'pages', 'styles', 'utils', '*.md')
Compress-Archive -Path $src -DestinationPath Velora_Source_Clean.zip -Force
```

### Verify Archive #1 (macOS/Linux)
```bash
unzip -l Velora_Website_Final_Build.zip | head -10
```

### Verify Archive #1 (Windows)
```powershell
Expand-Archive -Path Velora_Website_Final_Build.zip -DestinationPath test -Force
dir test
Remove-Item -Recurse -Force test
```

### Verify Archive #2 (macOS/Linux)
```bash
unzip -l Velora_Source_Clean.zip | head -20
```

### Verify Archive #2 (Windows)
```powershell
Expand-Archive -Path Velora_Source_Clean.zip -DestinationPath test-src -Force
dir test-src
Remove-Item -Recurse -Force test-src
```

---

## ✅ Quick Verification

### Check dist/ folder exists
```bash
ls dist/                # macOS/Linux
dir dist\               # Windows
```

**Expected**: `index.html` and `assets/` folder

---

### Check both archives created
```bash
ls -lh *.zip            # macOS/Linux
dir *.zip               # Windows
```

**Expected**: Two .zip files (~1-2 MB each)

---

### Verify Archive #1 structure
```bash
unzip -l Velora_Website_Final_Build.zip | grep "index.html"
```

**Expected**: `index.html` at root level (NOT `dist/index.html`)

---

## 🆘 Quick Fixes

### Archive #1 has dist/ folder inside

**Fix (macOS/Linux)**:
```bash
rm Velora_Website_Final_Build.zip
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..
```

**Fix (Windows)**:
```powershell
Remove-Item Velora_Website_Final_Build.zip
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

---

### Build fails

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

### Archive #2 is too large

**Problem**: Included node_modules or dist

**Fix**: Recreate with exclusions (see commands above)

---

## 🎯 One-Liner — Everything (macOS/Linux)

```bash
npm install && npm run build && cd dist && zip -r ../Velora_Website_Final_Build.zip . && cd .. && zip -r Velora_Source_Clean.zip . -x "node_modules/*" -x "dist/*" -x ".env" -x "package-lock.json" -x ".git/*" -x "*.zip" && ls -lh *.zip
```

---

## 📊 Expected Results

| File | Size | Contains |
|------|------|----------|
| **Velora_Website_Final_Build.zip** | 1-2 MB | `index.html`, `assets/` at root |
| **Velora_Source_Clean.zip** | 500KB-2MB | All source (no node_modules/dist) |

---

## 🚀 Deploy

**URL**: https://app.netlify.com/drop

**Upload**: `Velora_Website_Final_Build.zip`

**Store**: `Velora_Source_Clean.zip` (backup/version control)

---

**Complete guides**: `CREATE_BOTH_ZIPS.md` | `QUICK_ZIP_GUIDE.md`
