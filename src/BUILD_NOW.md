# ⚡ BUILD NOW — Production ZIP in 3 Commands

---

## 🚀 macOS/Linux

```bash
npm install && npm run build && cd dist && zip -r ../Velora_Website_Final_Build.zip . && cd ..
```

**Time**: 2 minutes ⏱️

---

## 🚀 Windows PowerShell

```powershell
npm install; npm run build; Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

**Time**: 2 minutes ⏱️

---

## ✅ Test First (Recommended)

```bash
# Build
npm install
npm run build

# Test
npm run preview
# Open http://localhost:4173
# Verify all pages work
# Press Ctrl+C when done

# Create ZIP
cd dist
zip -r ../Velora_Website_Final_Build.zip .
cd ..

# Or Windows:
# Compress-Archive -Path dist\* -DestinationPath Velora_Website_Final_Build.zip -Force
```

**Time**: 5 minutes ⏱️

---

## 🎯 What You Get

`Velora_Website_Final_Build.zip` (~1-2 MB)

**Contains**:
- index.html (at root)
- assets/ folder (at root)

---

## 🚀 Deploy

1. Open: https://app.netlify.com/drop
2. Drag: `Velora_Website_Final_Build.zip`
3. Done! Site live in 30 seconds

---

## 📚 Need Help?

- **Commands**: `COMMANDS.md`
- **Full guide**: `BUILD_INSTRUCTIONS.md`
- **Troubleshooting**: See docs

---

**That's it! Build → ZIP → Deploy → Live! 🎉**
