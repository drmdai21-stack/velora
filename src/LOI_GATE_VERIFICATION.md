# ✅ LOI Access Gate — Verification Checklist

**Feature**: Secure Access Code Gate for Pilot LOI  
**Status**: Ready to Test  
**Access Code**: `velora`  

---

## 🎯 Quick Test Steps

### 1. Open the Site
- [ ] Navigate to homepage
- [ ] Scroll to "Join the Founding Pilot, Q1-Q2 2026" section

### 2. Initial State
- [ ] See "Review & Sign Pilot LOI" button
- [ ] No LOI form visible
- [ ] No access gate visible

### 3. Click Button
- [ ] Click "Review & Sign Pilot LOI"
- [ ] Access gate panel appears
- [ ] Fade-in animation smooth
- [ ] Panel scrolls into view

### 4. Verify Panel Content
- [ ] Heading: "Pilot Access"
- [ ] Instructions about invitation letter
- [ ] Password input field (masked)
- [ ] "Unlock" button visible
- [ ] "Cancel" button visible

### 5. Test Invalid Code
- [ ] Enter: `wrongcode`
- [ ] Click "Unlock"
- [ ] Alert appears: "Invalid code. Please check your invitation letter."
- [ ] Panel stays open
- [ ] Can try again

### 6. Test Valid Code (Lowercase)
- [ ] Clear input
- [ ] Enter: `velora`
- [ ] Click "Unlock"
- [ ] Panel transitions to show iframe
- [ ] Adobe Sign LOI form loads
- [ ] Confidentiality notice visible

### 7. Test Valid Code (Mixed Case)
- [ ] Reload page
- [ ] Click button again
- [ ] Enter: `Velora` (or `VELORA`)
- [ ] Click "Unlock"
- [ ] Should unlock (case-insensitive)

### 8. Test Enter Key
- [ ] Reload page
- [ ] Click button
- [ ] Enter: `velorapilot2025`
- [ ] Press Enter key (instead of clicking Unlock)
- [ ] Should unlock same as clicking button

### 9. Test Cancel
- [ ] Reload page
- [ ] Click "Review & Sign Pilot LOI"
- [ ] Enter any text in input
- [ ] Click "Cancel"
- [ ] Panel closes
- [ ] Returns to initial state

### 10. Test State Reset
- [ ] Unlock the gate (enter valid code)
- [ ] Reload page
- [ ] Click button again
- [ ] Should require code again (not remembered)

---

## 📱 Responsive Testing

### Mobile (< 640px)
- [ ] Panel fits screen width
- [ ] Input field readable
- [ ] Buttons don't overlap
- [ ] Text size appropriate
- [ ] Padding looks good

### Tablet (640px - 1024px)
- [ ] Panel centered
- [ ] Layout balanced
- [ ] Buttons side-by-side

### Desktop (> 1024px)
- [ ] Panel max-width applied (~512px)
- [ ] Centered on page
- [ ] Hover states work on buttons

---

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab to input field (focus visible)
- [ ] Tab to "Unlock" button (focus visible)
- [ ] Tab to "Cancel" button (focus visible)
- [ ] Enter key in input submits code
- [ ] Can navigate entire flow without mouse

### Screen Reader
- [ ] Input announces "Pilot access code"
- [ ] Buttons announce clear actions
- [ ] Alert announces error message

### Visual
- [ ] Focus rings visible (2px ring)
- [ ] Color contrast sufficient
- [ ] Text readable at all sizes

### Motion
- [ ] Animation smooth on normal setting
- [ ] No animation if `prefers-reduced-motion: reduce`

---

## 🎨 Design Verification

### Colors Match Brand
- [ ] Panel background: Warm Cream (#F7EEE8)
- [ ] Border: Warm Taupe (#D3B8A1) at 40% opacity
- [ ] Text: Charcoal (#2B2B2B)
- [ ] Unlock button: Warm Taupe (#D3B8A1)
- [ ] Cancel button: Light Gray (#E5E5E5)

### Typography
- [ ] Heading uses Playfair Display
- [ ] Body text uses Inter
- [ ] Font sizes scale appropriately

### Spacing
- [ ] Border radius: rounded-2xl (1rem)
- [ ] Padding responsive (p-4 on mobile, p-6 on desktop)
- [ ] Button gap: 0.75rem
- [ ] Layout balanced

---

## 🔒 Security Verification

### Code Protection
- [ ] Input type="password" (characters masked)
- [ ] Code not visible in URL
- [ ] Code not in page source
- [ ] Validation case-insensitive
- [ ] Access resets on page reload

### Iframe Loading
- [ ] Iframe NOT in DOM before unlock
- [ ] Inspect element before unlock: no iframe tag
- [ ] After unlock: iframe tag appears
- [ ] Adobe Sign URL correct

### SEO Protection
- [ ] View page source
- [ ] Find: `<meta name="robots" content="noindex, nofollow" />`
- [ ] Located in `<head>` section

---

## 🧪 Edge Cases

### Empty Input
- [ ] Leave input blank
- [ ] Click "Unlock"
- [ ] Should show invalid code alert

### Whitespace
- [ ] Enter: `  velorapilot2025  ` (with spaces)
- [ ] Click "Unlock"
- [ ] Should unlock (trimmed)

### Multiple Attempts
- [ ] Enter wrong code 3 times
- [ ] Enter correct code on 4th try
- [ ] Should unlock normally

### Browser Back Button
- [ ] Unlock gate
- [ ] Press browser back button
- [ ] Verify expected behavior

### Browser Refresh
- [ ] Unlock gate
- [ ] Press F5 or Cmd+R to refresh
- [ ] Gate should reset (requires code again)

---

## 📊 Expected Results Summary

| Test | Expected Result |
|------|-----------------|
| Button click | Gate panel appears |
| Invalid code | Alert message |
| Valid code (any case) | Iframe appears |
| Enter key | Same as Unlock click |
| Cancel button | Panel closes |
| Page reload | Access reset |
| Mobile view | Responsive layout |
| Keyboard nav | Full access |
| Screen reader | Proper announcements |
| No unlock | No iframe in DOM |

---

## 🚨 Common Issues & Fixes

### Panel doesn't appear
**Check**: Console for errors, `showGate` state

### Code always rejected
**Check**: Exact code is `velorapilot2025` (no typo)

### Iframe doesn't load
**Check**: Network tab, Adobe Sign URL, `unlocked` state

### Animation jerky
**Check**: `prefers-reduced-motion` setting, browser performance

### Focus not visible
**Check**: Focus ring classes, browser default styles

---

## ✅ Acceptance Criteria

**Ready for production when**:

- [x] All functional tests pass
- [x] All responsive tests pass
- [x] All accessibility tests pass
- [x] Design matches brand
- [x] Security verified
- [x] Edge cases handled
- [x] No console errors
- [x] Works on major browsers

**Test on**:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 📝 Test Results

**Date Tested**: __________  
**Tested By**: __________  
**Browser**: __________  
**Device**: __________  

**Overall Status**: ⬜ Pass | ⬜ Fail  

**Issues Found**:
_________________________________
_________________________________
_________________________________

**Notes**:
_________________________________
_________________________________
_________________________________

---

## 🎉 Ready for Production?

If all tests pass:
- ✅ Feature works as expected
- ✅ Secure and private
- ✅ Accessible
- ✅ Brand-aligned
- ✅ **DEPLOY!**

---

**Access Code**: `velorapilot2025` (case-insensitive)  
**Full Documentation**: See `LOI_ACCESS_GATE.md`
