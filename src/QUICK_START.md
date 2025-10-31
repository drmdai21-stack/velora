# Velora - Quick Start Guide

## 🚀 Get Started in 60 Seconds

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Your Browser
Navigate to: `http://localhost:5173` (or the URL shown in terminal)

### 3. Test the Contact Form
1. Scroll to the bottom of the page (or click "Contact" in navigation)
2. Fill out the form:
   - **Name**: Your Name
   - **Type**: Select from dropdown
   - **Email**: your-email@example.com
   - **Message**: Enter a test message (at least 20 characters)
3. Click "Send Message"
4. You should see a green success card

### 4. Check Email
Open founder@velorapro.com - you should receive the test email within 1 minute.

---

## ✅ What's Already Configured

You don't need to configure anything. The form is production-ready:

- ✅ Formspree endpoint: `https://formspree.io/f/mdkpoqky`
- ✅ Sends to: `founder@velorapro.com`
- ✅ Validation: All client-side validation working
- ✅ Security: Honeypot + rate limiting enabled
- ✅ Accessibility: WCAG AA compliant
- ✅ Privacy: UK GDPR compliant

---

## 📁 Project Structure

```
/App.tsx                    # Main homepage with contact form
/pages/PilotPage.tsx        # Pilot program page
/pages/PrivacyPage.tsx      # Privacy policy page
/Router.tsx                 # Client-side routing
/components/                # Reusable components
/styles/globals.css         # Global styles & design tokens
```

---

## 🧪 Quick Tests

### Test 1: Valid Submission
Fill all fields correctly → Should show success message

### Test 2: Empty Fields
Try to submit with empty name → Button should be disabled

### Test 3: Invalid Email
Enter "notanemail" in email field → Should show validation error

### Test 4: Short Message
Enter less than 20 characters → Should show "Message must be at least 20 characters"

### Test 5: Rate Limiting
Submit form twice quickly → Second submission shows rate limit message

---

## 📄 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/pilot` | Detailed pilot program information |
| `/privacy` | Privacy policy (UK GDPR compliant) |

---

## 🎨 Design System

The design uses these brand colors:
- **Rose Beige** `#EAD5CC` - Hero backgrounds
- **Blush Cream** `#F7EEE8` - Section backgrounds
- **Warm Taupe** `#D3B8A1` - Primary buttons & accents
- **Charcoal** `#2B2B2B` - Body text

Typography:
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

---

## 📧 Contact Form Details

### Form Fields
- **Name** (required): 2-80 characters
- **Type** (required): Clinic / Investor / Partner / Other
- **Email** (required): Valid email format
- **Clinic Name** (optional): No validation
- **Message** (required): 20-2000 characters

### Features
- ✅ Real-time validation
- ✅ Character counter
- ✅ Loading state with spinner
- ✅ Success confirmation
- ✅ Error handling with mailto fallback
- ✅ Keyboard accessible
- ✅ Screen reader friendly

### Security
- ✅ Honeypot spam protection
- ✅ Rate limiting (15 seconds)
- ✅ HTML stripping
- ✅ Input sanitization
- ✅ No cookies or tracking

---

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

---

## 📚 Documentation

Need more details? Check these guides:

| Guide | Use When |
|-------|----------|
| `README.md` | Overview and features |
| `FORM_INTEGRATION_SUMMARY.md` | Contact form details |
| `DEPLOYMENT_GUIDE.md` | Ready to deploy |
| `FORM_TESTING.md` | Testing checklist |
| `CONTACT_FORM.md` | Full form documentation |

---

## 🐛 Troubleshooting

### Form won't submit
1. Check browser console for errors
2. Verify dev server is running
3. Try refreshing the page

### Email not arriving
1. Check spam folder in founder@velorapro.com
2. Check Formspree dashboard: https://formspree.io
3. Verify submission showed success message

### Validation errors
- Name must be at least 2 characters
- Email must be valid format
- Message must be at least 20 characters
- Type must be selected

### Port already in use
```bash
# Kill the process using port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

---

## 🚀 Ready to Deploy?

See `DEPLOYMENT_GUIDE.md` for step-by-step deployment instructions for:
- Vercel (recommended)
- Netlify
- Cloudflare Pages
- AWS Amplify

**The form will work immediately after deployment - no additional configuration needed!**

---

## 📞 Support

### Having Issues?
1. Check the browser console (F12)
2. Review `FORM_TESTING.md` for common issues
3. Check Formspree status: https://status.formspree.io

### Need Help?
- Review documentation in `/docs` folder
- Check inline comments in `/App.tsx`
- Consult `CONTACT_FORM.md` for detailed info

---

## ✅ You're All Set!

The Velora website is production-ready with:
- ✅ Fully functional contact form
- ✅ Beautiful, accessible design
- ✅ WCAG AA compliant
- ✅ UK GDPR compliant
- ✅ Mobile responsive
- ✅ Ready to deploy

**Just test the form and you're ready to go live!**

---

**Last Updated**: October 2025  
**Status**: Production Ready  
**Version**: 1.0
