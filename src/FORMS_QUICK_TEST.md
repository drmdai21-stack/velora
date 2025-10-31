# ⚡ Netlify Forms — Quick Test Guide

**Status:** ✅ All fixes applied — Ready to test

---

## 🎯 Quick Pre-Deploy Verification

Run these commands NOW (before deploying):

```bash
# 1. Verify _redirects is a FILE (not directory)
file public/_redirects
# Expected output: "public/_redirects: ASCII text"

# 2. Verify _headers is a FILE (not directory)
file public/_headers
# Expected output: "public/_headers: ASCII text"

# 3. Check file contents
cat public/_redirects
# Expected: "/*    /index.html   200"

cat public/_headers
# Expected: Security headers listed

# 4. Build test
npm run build

# 5. Verify built files
ls -la dist/ | grep -E '_redirects|_headers'
# Both should appear as files

# 6. Check hidden form in built HTML
grep -A 10 "velora-contact" dist/index.html
# Should show the hidden form template
```

**If all commands succeed:** ✅ Ready to deploy

---

## 🚀 Deploy & Test (5 minutes)

### Step 1: Deploy to Netlify

```bash
netlify deploy --prod
```

**Or via UI:**
1. Push to Git
2. Netlify auto-deploys
3. Wait ~2 minutes

---

### Step 2: Check Netlify Dashboard

**URL:** https://app.netlify.com → Your site → Forms

**Expected:**
- ✅ Form name: `velora-contact`
- ✅ Status: Active
- ✅ Fields: name, email, type, clinic, message, website (6 total)

**If form doesn't appear:**
- Check build log for "Form detected"
- Verify hidden form in deployed HTML source
- Redeploy with cache clear

---

### Step 3: Configure Notifications

**In Netlify:**
1. Click `velora-contact` form
2. Settings → Form notifications
3. Add notification:
   - Type: Email
   - Email: `founder@velorapro.com`
   - Subject: "New Velora enquiry"
4. Save

---

### Step 4: Live Form Test

**Go to:** https://velorapro.com/#contact

**Fill form:**
- Name: `Test User`
- Type: `Investor / Angel`
- Email: `your-real-email@domain.com`
- Clinic: `Test Clinic` (optional)
- Message: `This is a test submission to verify Netlify Forms integration.`

**Submit → Expected:**
- ✅ Success card appears immediately
- ✅ Form fields clear
- ✅ No page reload

---

### Step 5: Verify Submission

**In Netlify:** Forms → velora-contact → Submissions

**Check for:**
- ✅ New entry with timestamp
- ✅ All fields populated:
  - name: "Test User"
  - email: "your-real-email@domain.com"
  - type: "investor"
  - clinic: "Test Clinic"
  - message: "This is a test..."
  - website: (empty)

**Check email:** founder@velorapro.com

**Expected:**
- ✅ Email notification received
- ✅ Subject: "New Velora enquiry"
- ✅ Contains form data

---

## 🛡️ Honeypot Test (30 seconds)

**Purpose:** Verify spam protection works

**Steps:**
1. Fill form normally on live site
2. Open browser console (F12)
3. Run this command:
   ```javascript
   document.querySelector('input[name="website"]').value = 'spam-bot-test';
   ```
4. Submit form

**Expected:**
- ✅ Form appears to submit successfully
- ✅ Success card shows
- ❌ **NO submission appears in Netlify dashboard**
- ❌ **NO email notification sent**

**This confirms honeypot is working!**

---

## ✅ Success Checklist

After testing, all should be ✅:

- [x] `_redirects` is a plain text file
- [x] `_headers` is a plain text file
- [x] Build succeeds without errors
- [x] Form appears in Netlify dashboard
- [x] Test submission received
- [x] Email notification sent
- [x] All fields captured correctly
- [x] Honeypot blocks spam
- [x] Success card displays
- [x] No page reload on submit

**If all ✅:** 🎉 **FORMS ARE LIVE AND WORKING!**

---

## 🚨 Troubleshooting

### Form not detected in Netlify

**Check:**
1. Build log shows "Form detected: velora-contact"
2. View deployed HTML source → search for `velora-contact`
3. Hidden form exists in `<body>` before `</body>`

**Fix:**
- Clear deploy cache
- Redeploy

---

### Submission doesn't appear

**Check:**
1. Network tab shows POST to `/` (not external URL)
2. Status code: 200
3. Honeypot field is empty

**Fix:**
- Verify form name matches: `velora-contact`
- Check all field names match hidden form
- Clear browser cache

---

### Email not received

**Check:**
1. Notifications configured in Netlify
2. Check spam folder
3. Verify email address: founder@velorapro.com

**Fix:**
- Reconfigure notification in dashboard
- Test with different email
- Wait 5 minutes (emails can be delayed)

---

### 404 on page refresh

**Check:**
1. `_redirects` exists in dist/
2. Content: `/*    /index.html   200`

**Fix:**
- Verify file is plain text (not directory)
- Rebuild and redeploy
- Clear Netlify cache

---

## 📊 Test Results Template

Copy this and fill out after testing:

```
NETLIFY FORMS TEST RESULTS
Date: _______________
Site: https://velorapro.com

PRE-DEPLOY:
[ ] _redirects is file: ___
[ ] _headers is file: ___
[ ] Build succeeds: ___

POST-DEPLOY:
[ ] Form detected: ___
[ ] Notifications configured: ___
[ ] Test submission submitted: ___
[ ] Submission appears in dashboard: ___
[ ] Email received: ___
[ ] Honeypot works: ___

FIELD VALUES CAPTURED:
[ ] name: ___
[ ] email: ___
[ ] type: ___
[ ] clinic: ___
[ ] message: ___

STATUS: ✅ PASS / ❌ FAIL

Notes:
_________________________________
_________________________________
```

---

## 🎯 Next Actions

**If all tests pass:**
1. ✅ Mark as production-ready
2. ✅ Monitor submissions for first week
3. ✅ Update documentation if needed

**If any test fails:**
1. See troubleshooting section above
2. Check `/NETLIFY_FORMS_BULLETPROOF_AUDIT.md`
3. Review `/TROUBLESHOOTING.md`

---

**Quick test time:** 5 minutes  
**Full verification:** 15 minutes  
**Confidence level:** High 🟢

🚀 **Ready to test!**
