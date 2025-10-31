# Contact Form Troubleshooting Guide

## Error: "TypeError: Failed to fetch"

This error typically indicates a network or CORS issue. Follow these steps to diagnose and fix:

---

## Step 1: Check the Endpoint

Open your browser's console (F12 → Console tab) and look for:
```
Formspree endpoint: https://formspree.io/f/mdkpoqky
```

**If you see a different URL:**
- Check your `.env` file
- Make sure it contains: `VITE_FORMS_ENDPOINT=https://formspree.io/f/mdkpoqky`
- Restart your development server

---

## Step 2: Test Direct API Access

Open a new browser tab and visit:
```
https://formspree.io/f/mdkpoqky
```

**Expected result:** You should see a Formspree page (not a 404)

**If you get a 404:**
- The endpoint might not exist or be inactive
- Verify the endpoint ID: `mdkpoqky`
- Check the Formspree dashboard at https://formspree.io

---

## Step 3: Check Network Tab

1. Open DevTools (F12)
2. Go to the **Network** tab
3. Try submitting the form
4. Look for a request to `formspree.io`

**What to check:**

### Request Details
- **URL**: Should be `https://formspree.io/f/mdkpoqky`
- **Method**: POST
- **Status**: Should be 200 (success) or see error code

### Common Status Codes
| Code | Meaning | Solution |
|------|---------|----------|
| 200 | Success | Form working! Check email |
| 404 | Not Found | Wrong endpoint or form doesn't exist |
| 422 | Validation Error | Formspree rejected the data format |
| 429 | Too Many Requests | Rate limited - wait and retry |
| 500 | Server Error | Formspree issue - try again later |

### CORS Errors
If you see: `CORS policy: No 'Access-Control-Allow-Origin' header`

**This shouldn't happen with Formspree**, but if it does:
1. Make sure you're using `https://formspree.io` (not http)
2. Check that no browser extensions are blocking requests
3. Try in an incognito/private window

---

## Step 4: Check Request Payload

In the Network tab, click on the formspree.io request and check the **Payload** tab.

**Expected format:**
```json
{
  "name": "Test User",
  "type": "clinic",
  "email": "test@example.com",
  "clinicName": "Test Clinic",
  "message": "This is a test message with more than 20 characters",
  "_subject": "Velora — New website enquiry from Test User",
  "_replyto": "test@example.com",
  "_page": "/",
  "_timestamp": "2025-10-26T14:30:00.000Z"
}
```

**If the format is different:**
- The code might have been modified
- Check `/App.tsx` line 124-137

---

## Step 5: Common Fixes

### Fix 1: Restart Development Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Fix 2: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Fix 3: Check .env File
Create or edit `.env` in the project root:
```env
VITE_FORMS_ENDPOINT=https://formspree.io/f/mdkpoqky
```

Then restart the dev server.

### Fix 4: Disable Browser Extensions
Try in an incognito/private window to rule out extension interference.

### Fix 5: Check Internet Connection
Simple but important - make sure you're online!

---

## Step 6: Verify Formspree Account

1. Go to https://formspree.io
2. Log in to your account
3. Find the form with ID `mdkpoqky`

**Check:**
- [ ] Form is active (not paused)
- [ ] Email recipient is set to `founder@velorapro.com`
- [ ] Form is verified
- [ ] Not over monthly submission limit (50 on free tier)

---

## Alternative: Use Form Action Method

If fetch continues to fail, you can use the traditional form action method:

### In App.tsx, replace the form tag:

**Change from:**
```tsx
<form onSubmit={handleSubmit} className="space-y-6" noValidate>
```

**To:**
```tsx
<form 
  action="https://formspree.io/f/mdkpoqky" 
  method="POST"
  className="space-y-6"
>
```

**Note:** This will cause a page redirect after submission, but it will work even if fetch fails.

---

## Testing Checklist

Use this to systematically test the form:

### Browser Console
- [ ] No JavaScript errors
- [ ] Formspree endpoint logs correctly
- [ ] No CORS errors

### Network Tab
- [ ] Request appears when form submitted
- [ ] Request URL is correct
- [ ] Request method is POST
- [ ] Response status is 200
- [ ] Response body contains `{"ok": true}`

### Form Behavior
- [ ] Submit button disabled until all fields filled
- [ ] Validation errors show for invalid input
- [ ] Loading state shows when submitting
- [ ] Success message appears on success
- [ ] Error message appears on failure

### Email Delivery
- [ ] Email arrives at founder@velorapro.com
- [ ] Subject line is correct
- [ ] Reply-to is set to sender's email
- [ ] All form fields included in email

---

## Still Not Working?

### Option 1: Use Mailto Fallback
The form already has a mailto fallback in the error state:
1. Try to submit the form
2. When error appears, click "Email us instead"
3. This opens your email client with a pre-filled message

### Option 2: Test with a Different Endpoint

Create a test form:
1. Go to https://formspree.io
2. Create a new form
3. Copy the endpoint URL
4. Update `.env`:
   ```env
   VITE_FORMS_ENDPOINT=https://formspree.io/f/YOUR_NEW_ID
   ```
5. Restart dev server and test

### Option 3: Check Formspree Status
Visit https://status.formspree.io to see if there are any service issues.

---

## Debugging Output

### Check Console Logs

Look for these messages:

**On page load:**
```
Formspree endpoint: https://formspree.io/f/mdkpoqky
```

**On submission error:**
```
Form submission error: TypeError: Failed to fetch
```

**On response error:**
```
Response error: 404 Not Found
```

### Enable Verbose Logging

Add this temporarily to App.tsx (around line 123):

```tsx
setIsSubmitting(true);

// ADD THIS:
console.log('Submitting to:', FORMS_ENDPOINT);
console.log('Form data:', {
  name: formData.name.trim(),
  type: formData.type,
  email: formData.email.trim().toLowerCase(),
});

try {
  const response = await fetch(FORMS_ENDPOINT, {
    // ... rest of code
```

---

## Environment Variable Debug

Create this test file to verify environment variables:

**File: `/test-env.html`**
```html
<!DOCTYPE html>
<html>
<head><title>Env Test</title></head>
<body>
  <h1>Environment Variable Test</h1>
  <pre id="output"></pre>
  <script type="module">
    const endpoint = import.meta.env?.VITE_FORMS_ENDPOINT ?? 'NOT SET';
    document.getElementById('output').textContent = `VITE_FORMS_ENDPOINT: ${endpoint}`;
  </script>
</body>
</html>
```

Visit this file in your browser to see if the env var is loaded.

---

## Contact Support

If none of these steps work:

### Formspree Support
- Email: support@formspree.io
- Help Center: https://help.formspree.io
- Status Page: https://status.formspree.io

### Provide This Info
When asking for help, include:
- Browser and version (e.g., Chrome 120)
- Error message from console
- Network tab screenshot
- Formspree form ID: `mdkpoqky`
- Whether using environment variable or fallback

---

## Quick Fix Summary

**Most common fixes:**

1. **Restart dev server** - Fixes 80% of issues
   ```bash
   npm run dev
   ```

2. **Check .env file** - Make sure it exists and has the right endpoint
   ```env
   VITE_FORMS_ENDPOINT=https://formspree.io/f/mdkpoqky
   ```

3. **Hard refresh browser** - Clear cache
   - DevTools → Right-click refresh → Empty cache and hard reload

4. **Check Formspree dashboard** - Verify form is active
   - https://formspree.io

5. **Try incognito mode** - Rules out browser extensions

---

## Success Indicators

You'll know it's working when:

✅ **Console shows:** `Formspree endpoint: https://formspree.io/f/mdkpoqky`  
✅ **Network tab shows:** POST request with 200 status  
✅ **Success message appears:** Green card with checkmark  
✅ **Email arrives:** At founder@velorapro.com within 1 minute  

---

**Last Updated**: October 2025  
**Version**: 1.0
