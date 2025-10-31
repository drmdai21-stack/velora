# ⚡ Netlify Forms — Test Now (5 Minutes)

**Status:** ✅ All fixes applied — Ready to test

---

## 🎯 Pre-Deploy Verification (2 minutes)

### Step 1: Verify Files Are Plain Text (NOT directories)

```bash
# Check file types
file public/_redirects
# MUST show: "public/_redirects: ASCII text"
# If shows "directory" → FAIL (but we just fixed this)

file public/_headers
# MUST show: "public/_headers: ASCII text"
# If shows "directory" → FAIL (but we just fixed this)
```

**✅ Expected:** Both are plain text files

---

### Step 2: Check File Contents

```bash
# View _redirects
cat public/_redirects
```

**Expected output:**
```
/*    /index.html   200
```

```bash
# View _headers
cat public/_headers
```

**Expected output:**
```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**✅ If both match:** Files are correct

---

### Step 3: Build Test

```bash
# Install dependencies (if needed)
npm install

# Build for production
npm run build
```

**Expected:**
- ✅ Build completes without errors
- ✅ No TypeScript errors
- ✅ `dist/` folder created

---

### Step 4: Verify Built Files

```bash
# Check dist/ structure
ls -la dist/ | grep -E '_redirects|_headers|index.html'
```

**Expected:** All three files present

```bash
# Verify hidden form is in built HTML
grep "velora-contact" dist/index.html
```

**Expected:** Should show the hidden registration form

**✅ If all pass:** Ready to deploy!

---

## 🚀 Deploy to Netlify (3 minutes)

### Option A: CLI Deploy (Fastest)

```bash
# Login to Netlify (if not already)
netlify login

# Deploy to production
netlify deploy --prod --dir=dist
```

### Option B: Git Push (Recommended)

```bash
# Commit changes
git add .
git commit -m "Fix: Convert _redirects and _headers to plain text files"
git push

# Netlify auto-deploys in ~2 minutes
```

### Option C: Manual Upload

1. Go to: https://app.netlify.com
2. Drag & drop `dist/` folder onto site
3. Wait for deployment

---

## ✅ Post-Deploy Tests (3 minutes)

### Test 1: Check Netlify Dashboard (30 seconds)

**URL:** https://app.netlify.com → Your Site → Forms

**Expected:**
- ✅ Form name: `velora-contact`
- ✅ Status: Active
- ✅ 6 fields listed

**If form NOT showing:**
- Check build log for "Form detected"
- View deployed HTML source → search for "velora-contact"
- Clear cache and redeploy

---

### Test 2: Configure Notifications (30 seconds)

1. Click: `velora-contact` form
2. Form notifications → Add notification
3. Type: Email to verify
4. Email: `founder@velorapro.com`
5. Subject: "New Velora enquiry"
6. Save

---

### Test 3: Live Form Submission (2 minutes)

**Go to:** https://velorapro.com/#contact

**Fill form:**
- Name: `Test User`
- Type: `Investor / Angel`
- Email: `your-real-email@example.com`
- Clinic: `Test Clinic`
- Message: `Testing Netlify Forms integration after fixing _redirects and _headers files.`

**Click Submit**

**Expected (immediately):**
- ✅ Success card appears
- ✅ Form fields clear
- ✅ No page reload

---

### Test 4: Verify Submission (1 minute)

**In Netlify Dashboard:**
- Forms → velora-contact → Submissions
- Look for your test entry
- Verify all fields captured

**In Email:**
- Check: founder@velorapro.com
- Subject: "New Velora enquiry"
- Contains: All form data

---

### Test 5: Honeypot (30 seconds)

**On live site:**
1. Fill form normally
2. Press F12 (open console)
3. Run: `document.querySelector('input[name="website"]').value = 'spam-test';`
4. Submit form

**Expected:**
- ✅ Success card may show
- ❌ **NO entry in Netlify dashboard**
- ❌ **NO email notification**

**This proves honeypot works!**

---

## 📊 Quick PASS/FAIL Checklist

Copy and mark as you test:

```
PRE-DEPLOY:
[ ] _redirects is plain text file
[ ] _headers is plain text file
[ ] Build succeeds
[ ] Files in dist/

POST-DEPLOY:
[ ] Form in Netlify dashboard
[ ] Notifications configured
[ ] Test form submitted
[ ] Success card appeared
[ ] Entry in dashboard
[ ] Email received
[ ] Honeypot blocks spam

RESULT: PASS / FAIL
```

---

## 🚨 If Anything Fails

### Form not detected in Netlify

**Check:**
1. Build log → Look for "Form detected"
2. View page source → Search for "velora-contact"
3. Verify hidden form exists in deployed HTML

**Fix:**
- Netlify → Deploys → Clear cache and deploy

---

### Submission doesn't appear

**Check:**
1. Network tab → POST to `/` returns 200
2. Honeypot field is empty
3. Form name matches: `velora-contact`

**Fix:**
- Verify all field names match
- Check browser console for errors

---

### Email not received

**Check:**
1. Spam folder
2. Notification configured correctly
3. Wait 5 minutes (can be delayed)

**Fix:**
- Reconfigure notification in Netlify
- Test with different email address

---

### 404 on page refresh

**Check:**
1. `_redirects` exists in dist/
2. Content: `/*    /index.html   200`

**Fix:**
- Rebuild: `npm run build`
- Verify file copied to dist/
- Redeploy

---

## ⏱️ Time Breakdown

- Pre-deploy verification: 2 min
- Deploy: 2-3 min
- Post-deploy tests: 3 min

**Total:** ~8 minutes

---

## ✅ Success = All Tests Pass

When everything passes:
- ✅ Form detected ✅
- ✅ Submission works ✅
- ✅ Email received ✅
- ✅ Honeypot protects ✅

**Result:** 🎉 **PRODUCTION READY!**

---

**Quick test guide**  
**Time:** 8 minutes  
**Difficulty:** Easy  

🚀 **Start testing now!**
