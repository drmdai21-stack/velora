# ⚡ Quick Commands — Build Production ZIP

**Copy-paste ready commands for fast deployment**

---

## 🚀 Complete Build Process (macOS/Linux)

```bash
# Step 1: Install dependencies
npm install

# Step 2: Build for production
npm run build

# Step 3: Test locally
npm run preview
# Open http://localhost:4173 and test
# Press Ctrl+C to stop when done

# Step 4: Create ZIP
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..

# Step 5: Verify
ls -lh Velora_Website_Final_Build.zip
unzip -l Velora_Website_Final_Build.zip | head -10

# Done! Upload to https://app.netlify.com/drop
```

**Time**: ~5 minutes ⏱️

---

## 🚀 Complete Build Process (Windows PowerShell)

```powershell
# Step 1: Install dependencies
npm install

# Step 2: Build for production
npm run build

# Step 3: Test locally
npm run preview
# Open http://localhost:4173 and test
# Press Ctrl+C to stop when done

# Step 4: Create ZIP
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force

# Step 5: Verify
Get-Item Velora_Website_Final_Build.zip

# Done! Upload to https://app.netlify.com/drop
```

**Time**: ~5 minutes ⏱️

---

## 🔧 Individual Commands

### Install
```bash
npm install
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```
Then open: http://localhost:4173

### Create ZIP (macOS/Linux)
```bash
cd dist && zip -r ../Velora_Website_Final_Build.zip . && cd ..
```

### Create ZIP (Windows)
```powershell
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

### Verify ZIP (macOS/Linux)
```bash
unzip -l Velora_Website_Final_Build.zip | head -20
```

### Verify ZIP (Windows)
```powershell
Expand-Archive -Path Velora_Website_Final_Build.zip -DestinationPath test -Force; dir test; Remove-Item -Recurse -Force test
```

---

## 🆘 Troubleshooting Commands

### Clean reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Vite cache
```bash
rm -rf node_modules/.vite dist
npm run build
```

### Check Node version
```bash
node -v
# Should be v18.x.x
```

### Force rebuild
```bash
npm run build -- --force
```

---

## ✅ Verification Commands

### Check dist/ exists
```bash
ls dist/
# Should show: index.html, assets/
```

### Check dist/ size
```bash
du -sh dist
# Should be ~1-3 MB
```

### Check ZIP size
```bash
ls -lh Velora_Website_Final_Build.zip
# Should be ~1-2 MB
```

---

## 🎯 One-Liner (Build + ZIP)

### macOS/Linux
```bash
npm install && npm run build && cd dist && zip -r ../Velora_Website_Final_Build.zip . && cd .. && echo "✅ ZIP ready: Velora_Website_Final_Build.zip"
```

### Windows PowerShell
```powershell
npm install; npm run build; Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force; Write-Host "✅ ZIP ready: Velora_Website_Final_Build.zip"
```

---

## 🚀 Deploy

**URL**: https://app.netlify.com/drop

**Action**: Drag `Velora_Website_Final_Build.zip` to the page

**Time**: ~30 seconds to deploy

---

**Total time from start to deployed**: ~7 minutes ⚡
