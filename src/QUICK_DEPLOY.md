# ⚡ Quick Deploy — Velora to Netlify

**For when you need to deploy RIGHT NOW**

---

## 🚀 30-Second Overview

1. Build locally
2. ZIP the dist folder
3. Drag to Netlify
4. Done!

---

## 📋 Commands (Copy-Paste Ready)

### Build
```bash
npm ci
npm run build
```

### Create Production ZIP (macOS/Linux)
```bash
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..
```

### Create Production ZIP (Windows)
```powershell
Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

### Deploy URL
https://app.netlify.com/drop

---

## ✅ Pre-Deploy Checklist (30 seconds)

- [ ] `npm run build` succeeded
- [ ] `dist/` folder exists
- [ ] ZIP file created (~1-2 MB)

---

## 🎯 Post-Deploy Test (2 minutes)

1. Visit deployed URL
2. Test form submission
3. Check email at founder@velorapro.com
4. Done!

---

## 🔧 If Something Breaks

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Form not working
- Check console (F12)
- Verify endpoint: `https://formspre.io/f/mdkpoqky`
- Check spam folder

### Routes 404
- Verify netlify.toml exists
- Check [[redirects]] section

---

## 📚 Full Documentation

- **Complete Guide**: `NETLIFY_BUILD_GUIDE.md`
- **Verification**: `BUILD_VERIFICATION.md`
- **Troubleshooting**: `TROUBLESHOOTING.md`

---

**Total Time**: 5 minutes build + 2 minutes deploy = **7 minutes to live** 🚀
