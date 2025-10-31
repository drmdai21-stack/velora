# Contact Form Testing Guide

## Quick Test (2 minutes)

### Prerequisites
- [ ] Formspree account created
- [ ] Form created with recipient: founder@velorapro.com
- [ ] `.env` file configured with `VITE_FORMS_ENDPOINT`
- [ ] Development server running

### Basic Test Flow

1. **Navigate to contact section**
   - Scroll to bottom of homepage
   - Or use header navigation → "Contact"

2. **Fill out form with valid data**
   ```
   Name: Test User
   Type: Investor / Angel
   Email: your-test-email@example.com
   Message: This is a test submission to verify the contact form is working correctly.
   ```

3. **Submit form**
   - Click "Send Message"
   - Button should show "Sending..." with spinner
   - Wait 1-3 seconds

4. **Verify success**
   - Success card appears (green with checkmark)
   - Message: "Thank you — we've received your message"

5. **Check email**
   - Open founder@velorapro.com inbox
   - Email should arrive within 1 minute
   - Subject: "Velora — New website enquiry from Test User (Investor)"

---

## Validation Testing

### Test 1: Empty Name
- Leave name field empty
- Try to submit
- **Expected**: Submit button disabled

### Test 2: Short Name
- Enter: "A"
- Click outside field
- **Expected**: Error "Name must be at least 2 characters"

### Test 3: Invalid Name
- Enter: "Test123"
- Click outside field
- **Expected**: Error "Name can only contain letters, spaces, hyphens, and apostrophes"

### Test 4: Invalid Email
- Enter: "notanemail"
- Click outside field
- **Expected**: Error "Please enter a valid email address"

### Test 5: Short Message
- Enter: "Hi"
- Click outside field
- **Expected**: Error "Message must be at least 20 characters"

### Test 6: Long Message
- Try to type more than 2000 characters
- **Expected**: Input stops at 2000 characters

### Test 7: No Type Selected
- Fill all other fields
- Don't select type
- **Expected**: Submit button disabled

---

## Spam Protection Testing

### Test 1: Honeypot Field
1. Open browser DevTools → Console
2. Run:
   ```javascript
   document.querySelector('input[name="website"]').value = 'spam-bot-filled-this'
   ```
3. Submit form
4. **Expected**: Form appears to submit but no email sent

### Test 2: Rate Limiting
1. Submit form successfully
2. Immediately try to submit again
3. **Expected**: Error message "Please wait a moment before submitting again"

---

## Accessibility Testing

### Keyboard Navigation
1. Press Tab repeatedly
2. **Expected**: Focus moves through all fields in order:
   - Name
   - Type
   - Email
   - Clinic Name
   - Message
   - Submit Button

### Screen Reader Test
1. Enable screen reader (macOS: VoiceOver, Windows: NVDA)
2. Navigate through form
3. **Expected**: All labels announced correctly

### Focus Visible Test
1. Tab through form
2. **Expected**: Blue focus ring visible on each field

### Error Focus Test
1. Leave name empty
2. Submit form
3. **Expected**: Focus automatically moves to name field

---

## Visual Testing

### Desktop (1440px)
- [ ] Form centered, max-width applied
- [ ] All fields visible and well-spaced
- [ ] Button full width
- [ ] Success card displays correctly

### Tablet (768px)
- [ ] Form responsive
- [ ] Fields stack properly
- [ ] Character counter visible

### Mobile (375px)
- [ ] All fields accessible
- [ ] Text inputs not zooming on focus (iOS)
- [ ] Button easily tappable
- [ ] Success/error states readable

---

## States Testing

### Loading State
1. Throttle network (DevTools → Network → Slow 3G)
2. Submit form
3. **Check**:
   - Button text changes to "Sending..."
   - Spinner icon appears
   - Button disabled
   - Form inputs disabled

### Success State
1. Submit valid form
2. **Check**:
   - Green success card appears
   - Checkmark icon visible
   - "Thank you" message shown
   - "Back to Home" button works

### Error State
1. Set invalid Formspree endpoint in .env
2. Submit form
3. **Check**:
   - Red error alert appears
   - Error icon visible
   - Error message shown
   - "Email us instead" button has mailto link

---

## Cross-Browser Testing

### Chrome/Edge
- [ ] Form submits successfully
- [ ] Validation works
- [ ] Styles render correctly

### Firefox
- [ ] Form submits successfully
- [ ] Select dropdown works
- [ ] Focus styles visible

### Safari
- [ ] Form submits successfully
- [ ] iOS: Inputs don't zoom
- [ ] macOS: All styles correct

---

## Production Testing

Before launch, test on production URL:

### Pre-flight Checks
- [ ] Production .env has correct endpoint
- [ ] Formspree verified sender email
- [ ] SSL certificate active (https://)
- [ ] Form accessible on live site

### Live Test
1. Submit test from production site
2. Verify email received at founder@velorapro.com
3. Check Formspree dashboard for submission
4. Verify all metadata included in email

### Monitoring Setup
- [ ] Formspree notification email configured
- [ ] Backup email forwarding active
- [ ] Auto-reply configured (optional)
- [ ] Monthly submission limit monitored

---

## Common Issues & Fixes

### Issue: "Form not submitting"
**Check**:
- Browser console for errors
- Network tab for failed requests
- .env file exists and loaded
- Formspree endpoint correct

**Fix**:
```bash
# Verify environment variable
echo $VITE_FORMS_ENDPOINT

# Restart dev server
npm run dev
```

### Issue: "Emails not arriving"
**Check**:
- Spam folder
- Formspree dashboard → Submissions
- Email verified in Formspree

**Fix**:
- Re-verify email in Formspree
- Check form settings → recipient email
- Add to safe senders list

### Issue: "Validation errors stuck"
**Check**:
- Browser console for React errors
- onChange handlers firing

**Fix**: Refresh page, try again

### Issue: "Rate limit too sensitive"
**Fix**: Edit App.tsx line ~82:
```typescript
if (lastSubmitAt.current && now - lastSubmitAt.current < 30000) {
  // Increased to 30 seconds
```

---

## Test Data Sets

### Valid Submission (Clinic)
```
Name: Dr. Sarah Williams
Type: Clinic Director / Practitioner
Email: sarah.williams@example.com
Clinic Name: London Aesthetics Clinic
Message: We are interested in learning more about the Velora pilot program and how it can help our clinic maintain compliance with UK regulations.
```

### Valid Submission (Investor)
```
Name: James Chen
Type: Investor / Angel
Email: james.chen@example.com
Clinic Name: (leave empty)
Message: I am an angel investor focused on health-tech ventures in the UK. I would like to request access to the investor deck and discuss the SEIS/EIS opportunity.
```

### Invalid Submission (Multiple Errors)
```
Name: J
Type: (not selected)
Email: not-an-email
Clinic Name: (leave empty)
Message: Hi
```
**Expected**: 3 errors shown (name too short, no type, invalid email, message too short)

---

## Automated Testing (Future)

Consider adding automated tests with:

```typescript
// Example test with Testing Library
test('submits form with valid data', async () => {
  render(<App />);
  
  const nameInput = screen.getByPlaceholderText('Name *');
  const emailInput = screen.getByPlaceholderText('Email *');
  const messageInput = screen.getByPlaceholderText(/Message/);
  const submitButton = screen.getByRole('button', { name: /send message/i });
  
  await userEvent.type(nameInput, 'Test User');
  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.selectOptions(screen.getByRole('combobox'), 'investor');
  await userEvent.type(messageInput, 'This is a test message that meets the minimum character requirement.');
  
  await userEvent.click(submitButton);
  
  await waitFor(() => {
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  });
});
```

---

## Performance Testing

### Load Time
- [ ] Form renders in < 1 second
- [ ] No layout shift when loading

### Interaction
- [ ] Typing feels responsive
- [ ] Submit button responds immediately
- [ ] No lag when showing errors

### Network
- [ ] Submission completes in < 3 seconds on 3G
- [ ] Only 1 POST request sent
- [ ] Payload size < 5KB

---

**Last Updated**: October 2025  
**Status**: ✅ Ready for Testing
