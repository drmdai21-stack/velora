# ⚡ LOI Frame Enlargement — Quick Test Guide

**Feature**: Responsive wider container & taller iframe  
**Access Code**: `velorapilot2025`  

---

## 🎯 Quick Test (3 minutes)

### 1. Test Locked State (Compact)
- Navigate to pilot section
- Click "Review & Sign Pilot LOI"
- **Expected**:
  - ✅ Panel appears ~672px wide (compact)
  - ✅ Centered on page
  - ✅ Input field focused
  - ✅ Professional appearance

### 2. Test Unlocked State (Spacious)
- Enter: `velorapilot2025`
- Press Enter (or click Unlock)
- **Expected**:
  - ✅ Panel expands to ~1280px wide
  - ✅ Iframe fills the space
  - ✅ Iframe taller than before (~675-960px depending on screen)
  - ✅ Professional, spacious layout

### 3. Test Responsive Height
- Resize browser window (make shorter)
- **Expected**:
  - ✅ Iframe height adjusts
  - ✅ Never shorter than 560px
  - ✅ Never taller than 960px
  - ✅ Smooth responsive behavior

### 4. Test Mobile View
- Open DevTools (F12)
- Toggle device toolbar
- Select iPhone SE (375px)
- **Expected**:
  - ✅ Locked: Fits screen nicely
  - ✅ Unlocked: Full width
  - ✅ Iframe ~560px tall
  - ✅ No horizontal scroll

---

## 📐 Visual Checklist

### Desktop (≥ 1024px)

**Locked State**:
```
      ┌──────────────┐
      │ Pilot Access │  ← ~672px wide
      │              │    (compact)
      │ [Password]   │
      │              │
      │ [Buttons]    │
      └──────────────┘
```
- [ ] Width: ~672px
- [ ] Centered
- [ ] Compact appearance

**Unlocked State**:
```
┌────────────────────────────────────┐
│                                    │  ← ~1280px wide
│       [Adobe Sign LOI]             │    (spacious)
│                                    │    Height: 75vh or ~960px
│      (generous space)              │
│                                    │
└────────────────────────────────────┘
```
- [ ] Width: ~1280px
- [ ] Centered
- [ ] Iframe taller (~675-960px)
- [ ] Spacious layout

### Mobile (< 640px)

**Locked State**:
```
┌─────────────────────┐
│ Pilot Access        │  ← Full width
│                     │    (minus padding)
│ [Password]          │
│                     │
│ [Buttons]           │
└─────────────────────┘
```
- [ ] Full width (minus padding)
- [ ] Compact
- [ ] Easy to read

**Unlocked State**:
```
┌─────────────────────┐
│                     │  ← Full width
│ [Adobe Sign LOI]    │    
│                     │    Height: 560px min
│ (scrollable)        │
│                     │
└─────────────────────┘
```
- [ ] Full width
- [ ] Iframe ~560px tall
- [ ] No horizontal overflow
- [ ] Scrollable if needed

---

## 📊 Size Expectations

### Container Width

| State | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| Locked | ~100% | ~672px | 672px |
| Unlocked | ~100% | ~768px | 1280px |

### Iframe Height

| Device | Screen Height | Expected Iframe Height |
|--------|---------------|----------------------|
| iPhone SE | 667px | 560px (minimum) |
| iPhone 12 | 844px | ~633px (75vh) |
| iPad | 1024px | ~768px (75vh) |
| MacBook 13" | 900px | ~675px (75vh) |
| MacBook 16" | 1080px | ~810px (75vh) |
| iMac 27" | 1440px | 960px (maximum) |

**Formula**: `clamp(560px, 75vh, 960px)`

---

## ✅ Pass Criteria

### Must Pass ✅

- [ ] **Locked width**: ~672px (max-w-2xl)
- [ ] **Unlocked width**: ~1280px (max-w-5xl) on large screens
- [ ] **Iframe height**: Responsive (560-960px)
- [ ] **Mobile**: No horizontal scroll
- [ ] **Desktop**: Spacious appearance
- [ ] **Transition**: Smooth from locked to unlocked

### Visual Quality ✅

- [ ] Rounded corners intact
- [ ] Shadows visible
- [ ] Brand colors preserved
- [ ] No layout shift outside section
- [ ] Professional appearance

---

## 🧪 Detailed Testing

### Test Sequence 1: Desktop Resize

1. Open on desktop (1440px+)
2. Click "Review & Sign Pilot LOI"
3. Verify locked: ~672px wide
4. Enter code: `velorapilot2025`
5. Verify unlocked: ~1280px wide
6. Verify iframe: ~675-810px tall
7. **Resize window**:
   - Make taller → iframe grows (up to 960px)
   - Make shorter → iframe shrinks (down to 560px)
   - Verify smooth responsive behavior

**Expected**: ✅ All size changes smooth and appropriate

### Test Sequence 2: Device Emulation

**iPhone SE (375px × 667px)**:
1. Open in DevTools device mode
2. Click "Review & Sign Pilot LOI"
3. Locked: Should fit screen
4. Unlock with code
5. Iframe: Should be 560px tall
6. Scroll: Should work if needed
7. Width: No overflow

**iPad (768px × 1024px)**:
1. Same steps
2. Locked: 672px wide, centered
3. Unlocked: ~768px wide (full width)
4. Iframe: ~768px tall (75vh)
5. Comfortable layout

**Desktop (1440px × 900px)**:
1. Same steps
2. Locked: 672px centered
3. Unlocked: 1280px centered
4. Iframe: ~675px tall (75vh)
5. Generous space

### Test Sequence 3: Edge Cases

**Very small phone (320px wide)**:
- [ ] Locked: Fits screen
- [ ] Unlocked: No overflow
- [ ] Iframe: 560px tall (min)
- [ ] Text readable

**Very large screen (2560px wide)**:
- [ ] Locked: 672px centered
- [ ] Unlocked: 1280px centered (capped)
- [ ] Iframe: 960px tall (capped)
- [ ] Lots of whitespace (expected)

**Very short viewport (600px tall)**:
- [ ] Iframe: 560px tall (minimum enforced)
- [ ] Scrollable content

**Very tall viewport (2000px tall)**:
- [ ] Iframe: 960px tall (maximum enforced)
- [ ] Not excessive

---

## 🐛 Common Issues

### Issue: Container doesn't expand

**Check**:
- Conditional class applied: `${unlocked ? 'max-w-5xl' : 'max-w-2xl'}`
- `unlocked` state is true
- No CSS overrides

**Fix**: Verify state management, check class application

---

### Issue: Iframe still 750px tall

**Check**:
- `height` attribute removed
- Inline style with `height: 'clamp(560px, 75vh, 960px)'`
- Browser supports clamp() (97%+ do)

**Fix**: Verify style object, check browser version

---

### Issue: Horizontal scroll on mobile

**Check**:
- `w-full` on white card
- `width: '100%'` in iframe style
- No fixed widths exceeding screen

**Fix**: Add/verify width classes

---

### Issue: Iframe too short on desktop

**Check**:
- Viewport height (75vh calculation)
- Maximum 960px enforced
- Screen tall enough

**Expected**: On 900px tall screen, iframe should be ~675px

---

## 📱 Device-Specific Tests

### iPhone Tests

**iPhone SE** (375×667):
- Locked: ~340px wide (with padding)
- Unlocked: ~340px wide
- Iframe: 560px tall
- Pass: ✅

**iPhone 12 Pro** (390×844):
- Locked: ~355px wide
- Unlocked: ~355px wide
- Iframe: ~633px tall
- Pass: ✅

**iPhone 12 Pro Max** (428×926):
- Locked: ~393px wide
- Unlocked: ~393px wide
- Iframe: ~695px tall
- Pass: ✅

### iPad Tests

**iPad** (768×1024):
- Locked: 672px wide
- Unlocked: 732px wide (with padding)
- Iframe: ~768px tall
- Pass: ✅

**iPad Pro 11"** (834×1194):
- Locked: 672px wide
- Unlocked: 798px wide
- Iframe: ~896px tall
- Pass: ✅

**iPad Pro 12.9"** (1024×1366):
- Locked: 672px wide
- Unlocked: 988px wide
- Iframe: 960px tall (capped)
- Pass: ✅

### Desktop Tests

**MacBook Air** (1280×800):
- Locked: 672px centered
- Unlocked: 1244px wide (with padding)
- Iframe: ~600px tall
- Pass: ✅

**MacBook Pro 16"** (1728×1117):
- Locked: 672px centered
- Unlocked: 1280px centered
- Iframe: ~838px tall
- Pass: ✅

**iMac 27"** (2560×1440):
- Locked: 672px centered
- Unlocked: 1280px centered
- Iframe: 960px tall (capped)
- Pass: ✅

---

## ✅ Final Checklist

### Functional
- [ ] Conditional width works
- [ ] Responsive height works
- [ ] Smooth transition
- [ ] No JavaScript errors
- [ ] Form loads correctly

### Visual
- [ ] Professional appearance
- [ ] Brand colors intact
- [ ] Shadows visible
- [ ] Rounded corners preserved
- [ ] No layout shifts

### Responsive
- [ ] Mobile: Fits screen, no overflow
- [ ] Tablet: Comfortable layout
- [ ] Desktop: Spacious, centered
- [ ] All sizes: Appropriate dimensions

### Cross-Browser
- [ ] Chrome: Works
- [ ] Firefox: Works
- [ ] Safari: Works
- [ ] Edge: Works
- [ ] Mobile browsers: Work

---

## 🎯 Expected Results Summary

| Test | Expected Result |
|------|-----------------|
| Locked width | ~672px (max-w-2xl) |
| Unlocked width | ~1280px (max-w-5xl) |
| Iframe height (mobile) | 560px minimum |
| Iframe height (desktop) | 675-960px adaptive |
| Responsive | Smooth resize |
| No overflow | All devices |
| Professional look | Yes ✅ |

---

## 🚀 Quick Commands

```bash
# Build
npm run build

# Test
npm run preview
# Open http://localhost:4173

# Deploy
cd dist && zip -r ../Velora_Website_Final_Build.zip . && cd ..
# Upload to Netlify
```

---

**Access Code**: `velorapilot2025`  
**Time**: 3 minutes comprehensive test  
**Status**: Ready to verify! 📐✨
