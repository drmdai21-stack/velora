import { Header } from '../components/Header';
import { SectionContainer } from '../components/SectionContainer';
import { Separator } from '../components/ui/separator';
import { Linkedin, ChevronUp, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function PrivacyPage() {
  const scrollToTop = () => {
    window.scrollTo({ 
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      top: 0 
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <SectionContainer id="privacy-hero" background="blush" className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h1)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[#2B2B2B]/60 italic">
            Last updated: October 2025
          </p>
        </div>
      </SectionContainer>

      {/* Content Sections */}
      <SectionContainer id="privacy-content" background="white" className="py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Section 1 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              1. Who we are
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80" style={{ lineHeight: '1.6' }}>
              Velora Intelligence Ltd ("Velora", "we", "us") is a UK-registered company developing digital-health solutions for aesthetic clinics.
            </p>
            <p className="leading-relaxed text-[#2B2B2B]/80 mt-3" style={{ lineHeight: '1.6' }}>
              Company number: 16768922
            </p>
            <p className="leading-relaxed text-[#2B2B2B]/80 mt-3" style={{ lineHeight: '1.6' }}>
              Registered in England & Wales.
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 2 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              2. Our commitment to privacy
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80" style={{ lineHeight: '1.6' }}>
              We handle all personal data lawfully, fairly, and transparently in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 3 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              3. What information we collect
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80 mb-4" style={{ lineHeight: '1.6' }}>
              Professional contact details (name, email, clinic name, role, message content) — when you complete the "Get in touch" form.
            </p>
            <p className="leading-relaxed text-[#2B2B2B]/80" style={{ lineHeight: '1.6' }}>
              Business correspondence if you contact us directly by email.
            </p>
            <p className="leading-relaxed text-[#2B2B2B]/80 mt-4 font-medium" style={{ lineHeight: '1.6' }}>
              We do not collect patient data or use tracking cookies.
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 4 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              4. How we use your information
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80 mb-3" style={{ lineHeight: '1.6' }}>
              We use your details only to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#2B2B2B]/80">
              <li className="leading-relaxed" style={{ lineHeight: '1.6' }}>
                Respond to investor or pilot enquiries.
              </li>
              <li className="leading-relaxed" style={{ lineHeight: '1.6' }}>
                Maintain our contact records under legitimate interest (B2B).
              </li>
            </ul>
            <p className="leading-relaxed text-[#2B2B2B]/80 mt-4 font-medium" style={{ lineHeight: '1.6' }}>
              We do not sell, share, or use your data for marketing without consent.
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 5 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              5. Legal basis
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80" style={{ lineHeight: '1.6' }}>
              Processing is based on legitimate interests (Article 6(1)(f) UK GDPR) — enabling B2B communication with clinics and investors.
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 6 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              6. Data retention
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80" style={{ lineHeight: '1.6' }}>
              We keep professional contact data for up to 24 months, then securely delete or anonymise it.
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 7 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              7. Your rights
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80 mb-3" style={{ lineHeight: '1.6' }}>
              You may request access, correction, or deletion of your data at any time.
            </p>
            <p className="leading-relaxed text-[#2B2B2B]/80" style={{ lineHeight: '1.6' }}>
              Contact:{' '}
              <a 
                href="mailto:privacy@velorapro.com"
                className="text-[#D3B8A1] hover:text-[#D3B8A1]/80 transition-colors underline"
              >
                privacy@velorapro.com
              </a>
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 8 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              8. Security
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80" style={{ lineHeight: '1.6' }}>
              All systems are UK-hosted and encrypted. Access is limited to authorised Velora personnel.
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 9 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              9. Updates
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80" style={{ lineHeight: '1.6' }}>
              This policy may be updated periodically. Any significant changes will be reflected on this page with a new "last updated" date.
            </p>
          </section>

          <Separator className="bg-[#D3B8A1]/20" />

          {/* Section 10 */}
          <section>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h3)',
                lineHeight: '1.3',
                letterSpacing: '0.2px',
              }}
            >
              10. Contact
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80 mb-2" style={{ lineHeight: '1.6' }}>
              Questions or requests:{' '}
              <a 
                href="mailto:privacy@velorapro.com"
                className="text-[#D3B8A1] hover:text-[#D3B8A1]/80 transition-colors underline"
              >
                privacy@velorapro.com
              </a>
            </p>
            <p className="leading-relaxed text-[#2B2B2B]/80 text-sm mt-4" style={{ lineHeight: '1.6' }}>
              Velora Intelligence Ltd, Registered in England & Wales No. 16768922.
            </p>
          </section>

          {/* Back to Top */}
          <div className="text-center pt-12">
            <Button
              variant="outline"
              onClick={scrollToTop}
              className="border-2 border-[#D3B8A1] text-[#2B2B2B] hover:bg-[#D3B8A1]/10 px-6 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-2"
              aria-label="Scroll back to top of page"
            >
              <ChevronUp className="w-4 h-4" />
              Back to Top
            </Button>
          </div>
        </div>
      </SectionContainer>

      {/* Footer */}
      <footer className="bg-[#2B2B2B] text-white py-16 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3
                className="mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', letterSpacing: '0.2px' }}
              >
                Velora
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Safer • Smarter • More Compliant Aesthetic Care
              </p>
              <p className="text-xs text-white/50">
                Supported by Imperial College Enterprise Lab.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm tracking-wide">Quick Links</h4>
              <div className="space-y-2">
                <a 
                  href="/" 
                  className="block text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                >
                  Home
                </a>
                <a 
                  href="/#pilot" 
                  className="block text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                  aria-label="Navigate to homepage Pilot section"
                >
                  Pilot Program
                </a>
                <a 
                  href="/privacy" 
                  className="block text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm tracking-wide">Connect</h4>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.linkedin.com/company/velora-intelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:founder@velorapro.com"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                  aria-label="Email the founder of Velora"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email founder@velorapro.com</span>
                </a>
              </div>
            </div>
          </div>

          <Separator className="bg-white/20 mb-8" />

          <div className="text-center">
            <p className="text-sm text-white/60">
              © 2025 Velora Intelligence Ltd · All rights reserved · Registered in England & Wales No. 16768922
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
