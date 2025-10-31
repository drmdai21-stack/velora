# Form Diagnostics - Quick Reference

## Error: "TypeError: Failed to fetch"

### Immediate Actions

**1. Open Browser Console (F12)**
Look for this line:
```
Formspree endpoint: https://formspree.io/f/mdkpoqky
```

**2. Check What You See:**

| You See | What It Means | Action |
|---------|--------------|--------|
| `https://formspree.io/f/mdkpoqky` | ✅ Endpoint is correct | Continue to Step 3 |
| Different URL | ❌ Wrong endpoint | Fix .env file |
| `undefined` | ❌ Endpoint not loading | Check import.meta.env |

**3. Test the Endpoint Directly**
Paste this in a new browser tab:
```
https://formspree.io/f/mdkpoqky
```

Expected: Formspree page loads (not 404)

---

## Most Common Causes & Fixes

### 🔴 Cause 1: Development Server Not Restarted

**Symptoms:**
- Just created/edited .env file
- Form was working, now it's not

**Fix:**
```bash
# Press Ctrl+C to stop the server
# Then restart:
npm run dev
```

**Why:** Vite only reads .env files on startup

---

### 🔴 Cause 2: Browser Cache

**Symptoms:**
- Worked before, stopped working
- Other people's machines work fine

**Fix:**
1. Open DevTools (F12)
2. Right-click the refresh button  
3. Select "Empty Cache and Hard Reload"

Or use incognito mode:
- Chrome: Ctrl+Shift+N (Cmd+Shift+N on Mac)
- Firefox: Ctrl+Shift+P (Cmd+Shift+P on Mac)

---

### 🔴 Cause 3: Network/Firewall Issues

**Symptoms:**
- All forms fail to fetch
- Other AJAX requests also fail

**Checks:**
1. Can you access https://formspree.io in your browser?
2. Are you behind a corporate firewall?
3. Is your antivirus blocking requests?

**Fix:**
- Try a different network (mobile hotspot)
- Disable VPN temporarily
- Check firewall settings

---

### 🔴 Cause 4: Formspree Form Not Configured

**Symptoms:**
- Getting 404 errors
- Never worked since setup

**Fix:**
1. Go to https://formspree.io
2. Log in
3. Look for form ID: `mdkpoqky`
4. If not found, create a new form:
   - Set recipient: founder@velorapro.com
   - Copy the new form ID
   - Update .env with new ID
   - Restart server

---

### 🔴 Cause 5: Browser Extension Blocking

**Symptoms:**
- Works in incognito, fails in normal mode
- Console shows blocked requests

**Common culprits:**
- Privacy Badger
- uBlock Origin
- Ghostery
- NoScript

**Fix:**
- Test in incognito mode (extensions disabled)
- If works in incognito, disable extensions one by one
- Add formspree.io to extension whitelist

---

## Network Tab Diagnostics

**Open DevTools → Network Tab → Submit Form**

### ✅ Success Looks Like:
```
Request URL: https://formspree.io/f/mdkpoqky
Status Code: 200 OK
Response: {"ok": true}
```

### ❌ Common Errors:

**404 Not Found**
- Form doesn't exist
- Wrong form ID
- Check Formspree dashboard

**422 Unprocessable Entity**
- Invalid data format
- Missing required fields
- Check request payload

**429 Too Many Requests**
- Rate limited
- Wait 15 seconds and retry
- Or wait 1 hour for Formspree rate limit reset

**Failed to fetch (no status code)**
- Network issue
- CORS blocked
- Firewall blocking
- Browser extension blocking

---

## Quick Test Script

Paste this in the browser console to test the endpoint directly:

```javascript
// Test 1: Check endpoint variable
console.log('Endpoint:', 'https://formspree.io/f/mdkpoqky');

// Test 2: Simple fetch test
fetch('https://formspree.io/f/mdkpoqky', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    type: 'other',
    message: 'This is a test message to verify the endpoint works correctly.',
    _subject: 'Test submission'
  })
})
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response:', data);
  if (data.ok) {
    console.log('✅ SUCCESS! Form is working!');
  }
})
.catch(error => {
  console.error('❌ ERROR:', error);
});
```

**Expected output:**
```
Endpoint: https://formspree.io/f/mdkpoqky
Status: 200
Response: {ok: true}
✅ SUCCESS! Form is working!
```

---

## Environment Variable Check

**Create this file to test env vars:**

**File: `env-test.ts`**
```typescript
// Add this temporarily to App.tsx at the top

const debugEnv = () => {
  console.group('🔍 Environment Debug');
  console.log('import.meta exists:', typeof import.meta !== 'undefined');
  console.log('import.meta.env exists:', typeof import.meta !== 'undefined' && !!import.meta.env);
  console.log('VITE_FORMS_ENDPOINT:', import.meta.env?.VITE_FORMS_ENDPOINT);
  console.log('All env vars:', import.meta.env);
  console.groupEnd();
};

debugEnv();
```

Run this and check the console output.

---

## .env File Checklist

**File: `.env` (in project root)**

✅ **Correct:**
```env
VITE_FORMS_ENDPOINT=https://formspree.io/f/mdkpoqky
```

❌ **Wrong:**
```env
# No quotes
VITE_FORMS_ENDPOINT="https://formspree.io/f/mdkpoqky"

# Wrong variable name
FORMS_ENDPOINT=https://formspree.io/f/mdkpoqky

# Typo in URL
VITE_FORMS_ENDPOINT=https://formspree.io/f/mdkpoqky/

# Wrong protocol
VITE_FORMS_ENDPOINT=http://formspree.io/f/mdkpoqky
```

**After editing .env:**
1. Save file
2. Stop dev server (Ctrl+C)
3. Restart: `npm run dev`
4. Hard refresh browser

---

## Form Field Requirements

Make sure you're testing with valid data:

| Field | Requirement | Example |
|-------|------------|---------|
| Name | 2-80 chars, letters/spaces | "John Smith" |
| Email | Valid email | "test@example.com" |
| Type | Must select | "clinic" |
| Message | 20-2000 chars | "This is a test message..." |

**Invalid test data will prevent submission!**

---

## Response Format

### Formspree Success Response:
```json
{
  "ok": true,
  "next": "https://formspree.io/thanks"
}
```

### Formspree Error Response:
```json
{
  "error": "Error message",
  "errors": ["Detailed errors"]
}
```

---

## Fallback Testing

If fetch keeps failing, test with traditional form submission:

### Temporary Change in App.tsx:

Find this line:
```tsx
<form onSubmit={handleSubmit} className="space-y-6" noValidate>
```

Change to:
```tsx
<form action="https://formspree.io/f/mdkpoqky" method="POST" className="space-y-6">
```

This will bypass JavaScript and submit via traditional form POST.

**Note:** Page will redirect after submission, no fancy success message.

---

## When All Else Fails

### Option 1: Create New Formspree Form
1. Go to https://formspree.io
2. Create a new form
3. Set recipient: founder@velorapro.com
4. Copy the new form ID
5. Update .env:
   ```env
   VITE_FORMS_ENDPOINT=https://formspree.io/f/NEW_FORM_ID
   ```
6. Restart server

### Option 2: Test with Different Service

Temporarily test with a different service to isolate the issue:

**Use Formsubmit.co:**
```typescript
const FORMS_ENDPOINT = 'https://formsubmit.co/founder@velorapro.com';
```

**Use GetForm.io:**
```typescript
const FORMS_ENDPOINT = 'https://getform.io/f/YOUR_FORM_ID';
```

If these work, the issue is specific to Formspree.

### Option 3: Server-Side Submission

Implement a server endpoint to handle form submission (more complex).

---

## Success Checklist

✅ Form appears on page  
✅ All fields can be filled  
✅ Submit button enables when form valid  
✅ Console shows correct endpoint  
✅ Network tab shows POST request  
✅ Response status is 200  
✅ Success message appears  
✅ Email arrives at founder@velorapro.com  

---

## Get Help

**If still stuck after trying everything above:**

1. **Capture diagnostic info:**
   - Screenshot of console errors
   - Screenshot of Network tab
   - Your .env file contents
   - Browser version

2. **Check Formspree:**
   - https://status.formspree.io
   - https://help.formspree.io

3. **Share details:**
   - What you tried
   - What error you see
   - What browser you're using

---

**Last Updated**: October 2025  
**Version**: 1.0
