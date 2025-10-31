# 🏗️ Build Instructions — Create Production ZIP

**Objective**: Generate `Velora_Website_Final_Build.zip` for Netlify drag-and-drop deployment

---

## ✅ Pre-Flight Verification

All required files are in place:
- ✅ `package.json` — Scripts configured correctly
- ✅ `vite.config.ts` — Build outputs to `dist/`
- ✅ `index.html` — Entry point configured
- ✅ `Router.tsx` — Application entry point
- ✅ `tsconfig.json` — TypeScript configured

**Status**: Ready to build ✅

---

## 🛠️ Step 1: Install Dependencies

Open your terminal in the project root and run:

```bash
npm install
```

**Expected output**:
```
added XXX packages in Xs
```

**Verify**: No errors during installation

---

## 🏗️ Step 2: Build for Production

Run the build command:

```bash
npm run build
```

**Expected output**:
```
vite v5.3.3 building for production...
✓ XXX modules transformed.
dist/index.html                   X.XX kB │ gzip: X.XX kB
dist/assets/index-XXXXXX.css     XX.XX kB │ gzip: X.XX kB
dist/assets/index-XXXXXX.js     XXX.XX kB │ gzip: XX.XX kB
✓ built in X.XXs
```

**Verify**: 
- ✅ Build completes with no errors
- ✅ `dist/` folder created in project root
- ✅ No red error messages

---

## 📁 Step 3: Verify Build Output

Check that the `dist/` folder contains the correct files:

```bash
# macOS/Linux
ls -la dist/

# Windows
dir dist\
```

**Expected structure**:
```
dist/
├── index.html               (~5-10 KB)
├── assets/
│   ├── index-[hash].css     (~20-50 KB)
│   ├── index-[hash].js      (~200-500 KB)
│   └── [image-files].png    (various sizes)
└── [other assets]
```

**Critical checks**:
- ✅ `index.html` exists at `dist/index.html`
- ✅ `assets/` folder exists at `dist/assets/`
- ✅ CSS and JS bundles are in `assets/`
- ✅ Image assets are included

---

## 🧪 Step 4: Test Build Locally

Before creating the ZIP, test the build locally:

```bash
npm run preview
```

**Expected output**:
```
➜  Local:   http://localhost:4173/
➜  press h + enter to show help
```

**Open browser**: http://localhost:4173

**Test checklist**:
- [ ] Homepage loads without errors
- [ ] Navigate to `/pilot` page
- [ ] Navigate to `/privacy` page
- [ ] Click Velora logo (returns to homepage)
- [ ] All images load correctly
- [ ] No console errors (F12 → Console tab)
- [ ] Contact form displays correctly
- [ ] Page styling looks correct

**Open Console (F12)**:
- ✅ Should only see: `Formspree endpoint: https://formspree.io/f/mdkpoqky`
- ✅ No red error messages
- ✅ No 404 errors

**If all tests pass** → Proceed to create ZIP

**If tests fail** → See troubleshooting section below

---

## 📦 Step 5: Create Production ZIP

### macOS/Linux

```bash
# Navigate into dist folder
cd dist

# Create ZIP of all contents
zip -r ../Velora_Website_Final_Build.zip .

# Return to project root
cd ..

# Verify ZIP was created
ls -lh Velora_Website_Final_Build.zip
```

**Expected output**:
```
-rw-r--r--  1 user  staff   1.5M Dec XX XX:XX Velora_Website_Final_Build.zip
```

---

### Windows Command Prompt

```cmd
cd dist
tar -a -c -f ..\Velora_Website_Final_Build.zip *
cd ..
dir Velora_Website_Final_Build.zip
```

---

### Windows PowerShell

```powershell
# Create ZIP from dist contents
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force

# Verify ZIP was created
Get-Item Velora_Website_Final_Build.zip
```

**Expected output**:
```
Mode          LastWriteTime        Length Name
----          -------------        ------ ----
-a----   XX/XX/XXXX  XX:XX AM    XXXXXX Velora_Website_Final_Build.zip
```

---

## ✅ Step 6: Verify ZIP Contents

**CRITICAL**: The ZIP must contain `index.html` and `assets/` at the ROOT level, NOT inside a `dist/` folder.

### Verify on macOS/Linux:

```bash
# List contents of ZIP
unzip -l Velora_Website_Final_Build.zip | head -20
```

**Expected output** (first few lines):
```
Archive:  Velora_Website_Final_Build.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
     XXXX  XX-XX-XXXX XX:XX   index.html
     XXXX  XX-XX-XXXX XX:XX   assets/index-XXXXXX.css
     XXXX  XX-XX-XXXX XX:XX   assets/index-XXXXXX.js
```

**✅ CORRECT**: `index.html` is at root level  
**❌ WRONG**: `dist/index.html` (has dist/ folder inside)

---

### Verify on Windows:

```powershell
# Extract to test folder
Expand-Archive -Path Velora_Website_Final_Build.zip -DestinationPath test-extract -Force

# List contents
dir test-extract

# Clean up
Remove-Item -Recurse -Force test-extract
```

**Expected**: Should see `index.html` and `assets/` folder directly, NOT a `dist/` folder.

---

## 🎯 Final Checklist

Before deploying, verify:

- [ ] `npm install` completed successfully
- [ ] `npm run build` completed with no errors
- [ ] `dist/` folder exists with `index.html` and `assets/`
- [ ] `npm run preview` shows working site at localhost:4173
- [ ] No console errors in preview
- [ ] All pages load (/, /pilot, /privacy)
- [ ] `Velora_Website_Final_Build.zip` created
- [ ] ZIP is ~1-3 MB in size
- [ ] ZIP contains `index.html` at root (verified above)
- [ ] ZIP contains `assets/` folder at root

**All checked?** → ✅ **Ready to deploy!**

---

## 🚀 Deploy to Netlify

1. **Open Netlify Drop**: https://app.netlify.com/drop

2. **Drag and drop**: `Velora_Website_Final_Build.zip`

3. **Wait**: ~30 seconds for deployment

4. **Live**: Site will be available at `https://[random-name].netlify.app`

5. **Test**: 
   - Visit deployed URL
   - Test all pages
   - Submit contact form (with real email)
   - Verify email delivery

6. **Custom domain** (optional):
   - Site settings → Domain management
   - Add custom domain: `velorapro.com`
   - Follow DNS instructions

---

## 🆘 Troubleshooting

### Build fails: "Cannot find module"

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

### Build fails: TypeScript errors

Check the error message. If it's about unused variables:

**Temporary fix** (in `tsconfig.json`):
```json
{
  "compilerOptions": {
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    // ... other options
  }
}
```

Then rebuild:
```bash
npm run build
```

---

### Preview shows errors in console

**Check**:
1. Are there 404 errors for assets? 
   - Rebuild: `npm run build`
   
2. Are there import errors?
   - Check that all files are in correct locations
   
3. Is Formspree endpoint showing?
   - Should see: `Formspree endpoint: https://formspree.io/f/mdkpoqky`

---

### ZIP contains `dist/` folder inside

**Problem**: You zipped the folder itself, not its contents.

**Fix (macOS/Linux)**:
```bash
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..
```

**Fix (Windows PowerShell)**:
```powershell
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

Note the `dist\*` (contents) not `dist` (folder).

---

### "npm: command not found"

**Problem**: Node.js/npm not installed.

**Fix**: 
1. Install Node.js 18 from https://nodejs.org/
2. Verify: `node -v` (should show v18.x.x)
3. Verify: `npm -v` (should show a version)
4. Retry build steps

---

### Build is very slow

**Normal**: First build can take 30-60 seconds depending on your machine.

**If hanging**:
- Check CPU usage (should be high during build)
- Try: `npm run build -- --force`
- Clear cache: `rm -rf node_modules/.vite`

---

## 📊 Expected File Sizes

| File | Size Range |
|------|------------|
| `dist/index.html` | 5-10 KB |
| `dist/assets/index-[hash].css` | 20-50 KB |
| `dist/assets/index-[hash].js` | 200-500 KB |
| Image assets | Varies |
| **Total dist/ size** | 1-3 MB |
| **ZIP file size** | 1-2 MB (compressed) |

If significantly different, verify all assets are included.

---

## ✅ Success Criteria

### Build is successful when:

1. ✅ `npm run build` completes with "✓ built in X.XXs"
2. ✅ `dist/` folder created
3. ✅ `dist/index.html` exists
4. ✅ `dist/assets/` folder exists with CSS and JS bundles
5. ✅ `npm run preview` serves site correctly
6. ✅ No console errors at http://localhost:4173
7. ✅ All pages accessible (/, /pilot, /privacy)

### ZIP is correct when:

1. ✅ File size ~1-2 MB
2. ✅ Contains `index.html` at root level (not in dist/)
3. ✅ Contains `assets/` folder at root level
4. ✅ Named `Velora_Website_Final_Build.zip`

### Deploy is successful when:

1. ✅ Netlify accepts the ZIP
2. ✅ Site loads at deployed URL
3. ✅ All pages work
4. ✅ Form submission works
5. ✅ Email delivered to founder@velorapro.com

---

## 🎉 You're Done!

Once you have `Velora_Website_Final_Build.zip` and all checks pass:

1. **Upload to Netlify** (drag & drop)
2. **Test on production URL**
3. **Configure custom domain** (if needed)
4. **Monitor form submissions** via Formspree dashboard

**Deployment complete! 🚀**

---

## 📞 Need Help?

**Build issues**: Check error message against troubleshooting section  
**Netlify issues**: https://docs.netlify.com  
**Formspree issues**: https://help.formspree.io  

**Documentation**:
- Complete guide: `NETLIFY_BUILD_GUIDE.md`
- Quick reference: `QUICK_DEPLOY.md`
- Verification: `BUILD_VERIFICATION.md`

---

**Time estimate**: 5-10 minutes from start to ZIP ready ⏱️
