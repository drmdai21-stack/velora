# 🧪 LOI Inline Error — Quick Testing Guide

**Feature**: Inline error messages for access code validation  
**Access Code**: `velorapilot2025`  

---

## ⚡ Quick Test (2 minutes)

### 1. Open Access Gate
- Navigate to pilot section
- Click "Review & Sign Pilot LOI"
- ✅ Panel appears
- ✅ Input auto-focuses

### 2. Test Invalid Code
- Type: `wrongcode`
- Click "Unlock" (or press Enter)
- **Expected**:
  - ❌ NO browser alert popup
  - ✅ Inline error appears below input
  - ✅ Error has coral border (#E2A79A)
  - ✅ Error shows ⚠️ icon + message
  - ✅ Input border turns coral
  - ✅ Input background tints blush
  - ✅ Button shows "Checking…" briefly
  - ✅ Button disabled for ~1.5 seconds

### 3. Test Error Clearing
- Start typing in the input field
- **Expected**:
  - ✅ Error disappears immediately
  - ✅ Input border returns to taupe
  - ✅ Input background clears
  - ✅ Ready for new attempt

### 4. Test Valid Code
- Type: `velorapilot2025`
- Click "Unlock" (or press Enter)
- **Expected**:
  - ✅ No error shown
  - ✅ Adobe Sign iframe appears
  - ✅ Access granted

### 5. Test Cancel
- Close gate
- Click button again to reopen
- Type invalid code
- Error appears
- Click "Cancel"
- **Expected**:
  - ✅ Gate closes
  - ✅ Error cleared
  - ✅ All state reset

---

## 🎨 Visual Checklist

### Error Message Appearance

```
┌─────────────────────────────────────┐
│  ⚠️ Invalid code. Please check     │
│     your invitation letter.         │
└─────────────────────────────────────┘
  ↑                                  ↑
Coral                            Blush Cream
Border                           Background
(#E2A79A)                        (#F7EEE8)
```

**Check**:
- [ ] Rounded corners (12px)
- [ ] Warning icon visible
- [ ] Text clear and readable
- [ ] Centered in panel
- [ ] Fades in smoothly (if motion enabled)
- [ ] Max-width prevents stretching

### Input Error State

**Normal**:
```
┌─────────────────────────┐
│                         │  ← Taupe border (#D3B8A1/60)
└─────────────────────────┘
```

**Error**:
```
┌─────────────────────────┐
│                         │  ← Coral border (#E2A79A)
└─────────────────────────┘
   Blush tint (#FEF5F3)
```

**Check**:
- [ ] Border color changes
- [ ] Background color changes
- [ ] Transition smooth (200ms)
- [ ] Returns to normal when typing

### Button States

**Enabled** (has text):
```
┌───────────┐
│  Unlock   │  ← Taupe bg, white text
└───────────┘
```

**Disabled** (empty or checking):
```
┌─────────────┐
│  Checking…  │  ← Faded taupe, gray text
└─────────────┘
  cursor: not-allowed
```

**Check**:
- [ ] Disabled when empty
- [ ] Shows "Checking…" during validation
- [ ] Faded appearance when disabled
- [ ] Cursor changes to not-allowed
- [ ] Re-enables after 1.5s cooldown

---

## ♿ Accessibility Testing

### Keyboard Navigation

**Test sequence**:
1. Click "Review & Sign Pilot LOI"
2. Input should auto-focus ✅
3. Type invalid code
4. Press **Enter** (not clicking button)
5. Error should appear ✅
6. Press **Tab**
7. Focus moves to "Unlock" button ✅
8. Press **Tab** again
9. Focus moves to "Cancel" button ✅
10. Press **Shift+Tab** twice
11. Back to input ✅
12. Start typing
13. Error clears ✅

**Check**:
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] Enter key submits
- [ ] No keyboard traps

### Screen Reader Testing

**With VoiceOver (Mac) or NVDA (Windows)**:

1. Navigate to input
   - Should announce: "Pilot access code, password, edit text"

2. Enter invalid code and submit
   - Should announce: "Invalid code. Please check your invitation letter."
   - Input should announce: "Invalid"

3. Focus input again
   - Should announce: "Described by access error"

4. While checking
   - Button should announce: "Checking, button, busy"

5. After typing to clear error
   - Input should announce: "Valid" (no longer invalid)

**Check**:
- [ ] Error announced politely
- [ ] Input validation state announced
- [ ] Button busy state announced
- [ ] All changes announced

---

## 📱 Responsive Testing

### Mobile (iPhone/Android)

**Test on real device or DevTools**:

1. Width: 375px (iPhone SE)
   - [ ] Error message fits screen
   - [ ] Text readable
   - [ ] Input comfortable size
   - [ ] Buttons don't overlap

2. Width: 390px (iPhone 12/13/14)
   - [ ] Layout balanced
   - [ ] All elements visible

3. Width: 414px (iPhone 12 Pro Max)
   - [ ] No stretching
   - [ ] Centered properly

**Touch Testing**:
- [ ] Input easy to tap
- [ ] Buttons easy to tap
- [ ] No accidental taps
- [ ] Virtual keyboard appears

### Tablet

**Test**: iPad (768px)
- [ ] Panel centered
- [ ] Error message comfortable width
- [ ] Buttons side-by-side
- [ ] Touch targets adequate

### Desktop

**Test**: 1024px+
- [ ] Panel max-width applied (~512px)
- [ ] Error message centered
- [ ] Hover states work
- [ ] Cursor changes appropriately

---

## 🎬 Animation Testing

### Normal Motion

**Test with animations enabled**:

1. Enter invalid code
2. Error should:
   - [ ] Start invisible (opacity: 0)
   - [ ] Fade in over 0.3s
   - [ ] End visible (opacity: 1)

3. Input border should:
   - [ ] Transition smoothly to coral
   - [ ] Take 200ms
   - [ ] No jarring color changes

### Reduced Motion

**Enable**: System Settings → Accessibility → Reduce Motion

**Test**:
1. Enter invalid code
2. Error should:
   - [ ] Appear immediately (no animation)
   - [ ] Still visible and functional

3. Input border should:
   - [ ] Change color
   - [ ] Still transition smoothly (color transition preserved)

---

## 🔒 Security Testing

### Spam Prevention

**Test rapid attempts**:

1. Enter invalid code
2. Click "Unlock"
3. Immediately click "Unlock" again
   - [ ] Button disabled
   - [ ] "Checking…" shown
   - [ ] Second click ignored

4. Wait 1.5 seconds
   - [ ] Button re-enables
   - [ ] Can try again

**Verify**:
- [ ] Can't spam attempts
- [ ] Cooldown works
- [ ] Visual feedback clear

### Empty Field

**Test**:
1. Open gate (input empty)
   - [ ] "Unlock" button disabled
   - [ ] Faded appearance
   - [ ] cursor: not-allowed

2. Type one character
   - [ ] Button enables
   - [ ] Normal appearance

3. Delete character (empty again)
   - [ ] Button disables
   - [ ] Faded appearance

---

## 🐛 Edge Cases

### Whitespace Handling

**Test**:
1. Type: `   velorapilot2025   ` (spaces before/after)
2. Click Unlock
   - [ ] Should unlock (trimmed) ✅

3. Type: `   ` (only spaces)
   - [ ] Button should be disabled

### Case Sensitivity

**Test**:
1. Type: `VELORAPILOT2025` (all caps)
   - [ ] Should unlock ✅

2. Type: `VeloraPilot2025` (mixed case)
   - [ ] Should unlock ✅

3. Type: `velorapilot2025` (lowercase)
   - [ ] Should unlock ✅

### Multiple Errors

**Test**:
1. Invalid code → error shows
2. Type to clear error
3. Invalid code again → error shows
4. Repeat 3 times
   - [ ] Error appears each time
   - [ ] No accumulation
   - [ ] Clears properly each time

### Browser Back/Forward

**Test**:
1. Unlock gate (valid code)
2. Press browser Back button
   - [ ] Verify state (may vary)

3. Press Forward
   - [ ] Verify state

**Note**: State is client-side, so behavior depends on React Router

---

## ✅ Pass/Fail Criteria

### Must Pass ✅

- [ ] **No alert() popups**
- [ ] Inline error appears for invalid code
- [ ] Error has correct colors (coral border, blush bg)
- [ ] Input border turns coral on error
- [ ] Typing clears error
- [ ] Button disabled when empty
- [ ] Button disabled during checking
- [ ] 1.5s cooldown works
- [ ] Enter key submits
- [ ] Cancel clears error
- [ ] Screen reader announces error
- [ ] Keyboard navigation works
- [ ] Works on mobile

### Nice to Have ✅

- [ ] Smooth fade-in animation
- [ ] Auto-focus on open
- [ ] Hover states on buttons
- [ ] Respects reduced motion

---

## 📊 Test Results Template

**Date**: __________  
**Browser**: __________  
**Device**: __________  

### Functional Tests
- [ ] Invalid code shows inline error (not alert)
- [ ] Error clears when typing
- [ ] Valid code unlocks
- [ ] Button states work correctly
- [ ] Enter key works

### Visual Tests
- [ ] Colors match Velora brand
- [ ] Layout stable (no shifting)
- [ ] Animations smooth (or none)
- [ ] Mobile responsive

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader announces changes
- [ ] Focus indicators visible
- [ ] ARIA attributes correct

### Edge Cases
- [ ] Whitespace trimmed
- [ ] Case-insensitive
- [ ] Spam prevention works
- [ ] Empty field handled

**Overall**: ⬜ Pass | ⬜ Fail

**Issues Found**:
_________________________________
_________________________________

**Notes**:
_________________________________
_________________________________

---

## 🎉 Success Criteria

**Feature ready when**:

✅ All "Must Pass" items checked  
✅ Works on Chrome, Firefox, Safari  
✅ Works on mobile devices  
✅ No console errors  
✅ Accessible to screen readers  

**Then**: ✅ **Deploy!**

---

**Access Code**: `velorapilot2025`  
**Full Docs**: `LOI_INLINE_ERROR_UPDATE.md`  
**Time Required**: ~10 minutes comprehensive testing  
