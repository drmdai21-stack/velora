import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { SectionContainer } from '../components/SectionContainer';
import { Timeline } from '../components/Timeline';
import { FAQSection } from '../components/FAQSection';
import { CountdownBanner } from '../components/CountdownBanner';
import { AnimatedLine } from '../components/AnimatedLine';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { FileText, CheckCircle2, Users, Award, FileSignature, Mail, ClipboardList, MessageSquare, ExternalLink, Linkedin, ChevronDown, CheckCircle } from 'lucide-react';

export default function PilotPage() {
  const [showLOI, setShowLOI] = useState(false);
  const [loiCompleted, setLoiCompleted] = useState(false);

  const timelineSteps = [
    {
      icon: FileSignature,
      title: 'Sign LOI',
      description: 'Complete the Letter of Intent with your clinic details.',
    },
    {
      icon: ClipboardList,
      title: 'Onboarding',
      description: 'Brief introduction to VeloraPRO and setup.',
    },
    {
      icon: Users,
      title: 'Pilot Testing',
      description: 'Use the platform in real clinic workflows.',
    },
    {
      icon: MessageSquare,
      title: 'Feedback & Recognition',
      description: 'Share insights; receive safety-verified recognition.',
    },
  ];

  const faqItems = [
    {
      question: 'Is there any cost or obligation?',
      answer: 'No. Pilot participation is entirely voluntary, at no cost, and fully non-binding. You may withdraw at any time without penalty or explanation.',
    },
    {
      question: 'How is my clinic data handled?',
      answer: 'All data is processed in accordance with UK GDPR (ICO standards), encrypted at rest and in transit, and hosted on UK-based servers. No patient data is shared with third parties.',
    },
    {
      question: 'How long does the pilot last?',
      answer: 'The pilot runs for approximately 8–12 weeks during Q1 2026. Exact dates will be confirmed with participating clinics.',
    },
    {
      question: 'What are the eligibility criteria?',
      answer: 'We're looking for UK-based aesthetic clinics (preferably in London) offering non-surgical treatments, with an interest in improving compliance and patient safety.',
    },
    {
      question: 'How will results be used?',
      answer: 'Anonymised feedback will inform VeloraPRO's development. No clinic names or identifiable data will be published without explicit consent. Participants receive recognition as founding pilot clinics.',
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Adobe Sign iframe completion
  const handleLoiFrameLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const iframe = e.currentTarget;
      const url = iframe.contentWindow?.location.href;
      if (url && (url.includes('WAIT_FOR_EMAIL_VERIFICATION') || url.includes('esignWidget'))) {
        // Optionally detect completion - for now we can add a timeout or manual trigger
        // Since cross-origin restrictions prevent direct URL checking, we'll rely on user experience
      }
    } catch (error) {
      // Cross-origin restrictions prevent access - this is expected
      // We could implement a message listener if Adobe Sign supported it
    }
  };

  // Scroll to LOI form when it opens
  useEffect(() => {
    if (showLOI) {
      setTimeout(() => {
        const loiElement = document.getElementById('loi-signing-form');
        if (loiElement) {
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          loiElement.scrollIntoView({ 
            behavior: prefersReduced ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [showLOI]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <CountdownBanner
        deadline="15 Nov 2025"
        placesRemaining={5}
        totalPlaces={7}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(180deg, #EAD5CC 40%, #F7EEE8 100%)',
        }}
      >
        <AnimatedLine />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="mb-8 tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: '1.15',
              color: '#2B2B2B',
              letterSpacing: '0.2px',
            }}
          >
            Invitation to Join the Velora
            <br />
            Safety & Compliance Pilot — Q1 2026
          </h1>

          <p className="mb-12 max-w-3xl mx-auto leading-relaxed text-[#2B2B2B]/80" style={{ fontSize: 'var(--text-body)' }}>
            Be part of a select group of UK clinics co-developing the future of aesthetic
            compliance and patient safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowLOI(!showLOI)}
              className="bg-[#D3B8A1] hover:bg-[#D3B8A1]/90 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              aria-expanded={showLOI}
              aria-controls="loi-signing-form"
            >
              {showLOI ? 'Hide LOI Form' : 'Review & Sign LOI'}
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-300 ${showLOI ? 'rotate-180' : ''}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <a
                href="mailto:hello@velorapro.com"
                className="inline-flex items-center gap-2"
              >
                Talk to Founder
                <Mail className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Adobe Sign LOI Embed */}
          {showLOI && (
            <div
              id="loi-signing-form"
              className="mt-16 opacity-0 animate-[fadeIn_0.4s_ease-in_forwards] max-w-5xl mx-auto"
              style={{
                animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'none'
                  : 'fadeIn 0.4s ease-in forwards',
              }}
              role="region"
              aria-label="Pilot Letter of Intent Signing Form"
            >
              {!loiCompleted ? (
                <div className="rounded-2xl overflow-hidden border border-[#D3B8A1]/40 shadow-lg bg-[#F7EEE8] p-2">
                  <iframe
                    onLoad={handleLoiFrameLoad}
                    src="https://eu1.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBu6S7IPk2oztdDce9H9ftxY5rsCFGIq7bk0S6gODJiKGXvyzuLhiliBC8l0Paky2I*&hosted=false"
                    width="100%"
                    height="800"
                    style={{
                      border: '0',
                      overflow: 'hidden',
                      minHeight: '600px',
                      borderRadius: '16px',
                      backgroundColor: '#ffffff',
                    }}
                    title="Velora Pilot LOI Signing Form"
                    allowFullScreen
                    loading="lazy"
                  />
                  
                  {/* Manual completion trigger - temporary solution */}
                  <div className="text-center mt-4 pb-2">
                    <button
                      onClick={() => setLoiCompleted(true)}
                      className="text-sm text-[#2B2B2B]/50 hover:text-[#2B2B2B]/70 underline transition-colors"
                      type="button"
                    >
                      Already completed? Click here
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl border border-[#D3B8A1]/40 bg-[#F7EEE8] p-10 md:p-12 text-center shadow-lg"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D3B8A1]/60 text-[#D3B8A1] bg-white">
                    <CheckCircle className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  
                  <h3
                    className="mb-6"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      lineHeight: '1.3',
                      letterSpacing: '0.2px',
                      color: '#2B2B2B'
                    }}
                  >
                    Thank you — your LOI submission is almost complete.
                  </h3>
                  
                  <div className="max-w-2xl mx-auto mb-6 space-y-4">
                    <p className="leading-relaxed text-[#2B2B2B]/80" style={{ fontSize: 'var(--text-body)' }}>
                      We've sent a short confirmation email from <strong>Adobe Sign</strong> to verify your address.
                      Please open that email and click the link inside to confirm your identity.
                    </p>
                    
                    <p className="leading-relaxed text-[#2B2B2B]/80" style={{ fontSize: 'var(--text-body)' }}>
                      Once verified, your signed Letter of Intent (Clinic Pilot) will be finalised and automatically delivered to your inbox.
                    </p>
                    
                    <p className="text-sm text-[#2B2B2B]/70 italic bg-white/50 rounded-lg p-4 border border-[#D3B8A1]/20">
                      <strong>Note:</strong> You'll need to complete this quick confirmation before your LOI is officially recorded.
                    </p>
                  </div>
                  
                  <p className="text-xs text-[#2B2B2B]/60 mb-8 leading-relaxed">
                    Didn't receive the email? Check your spam or junk folder — it's sent from Adobe Sign (<span className="font-mono">echosign@adobesign.com</span>).
                  </p>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
                      // Optionally reset the LOI form state
                      setTimeout(() => {
                        setShowLOI(false);
                        setLoiCompleted(false);
                      }, 300);
                    }}
                    className="rounded-2xl px-8 py-4 bg-[#EAD5CC] text-[#2B2B2B] hover:bg-[#D3B8A1]/80 border-0 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Return to Velora Home
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Overview Section */}
      <SectionContainer id="overview" background="white">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            What is VeloraPRO?
          </h2>
          <p className="leading-relaxed text-[#2B2B2B]/80 mb-12" style={{ fontSize: 'var(--text-body)' }}>
            VeloraPRO is a compliance and patient-safety platform designed specifically for
            non-surgical aesthetic practices. It streamlines documentation, consent, and regulatory
            alignment — making safety the default, not the exception.
          </p>

          {/* Regulatory Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['JCCP', 'CPSA', 'ASA/CAP', 'ICO', 'CQC'].map((badge) => (
              <div
                key={badge}
                className="w-16 h-16 rounded-full border-2 border-[#D3B8A1] flex items-center justify-center text-xs tracking-wide transition-all duration-300 hover:bg-[#D3B8A1]/10 hover:scale-105"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Benefits Section */}
      <SectionContainer id="benefits" background="cream">
        <div className="max-w-5xl mx-auto">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            Benefits for Pilot Clinics
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-[#D3B8A1]/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-[#2B2B2B]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2px' }}>
                Streamlined Documentation
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-[#D3B8A1]/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-[#2B2B2B]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2px' }}>
                Safer Consent & Record-Keeping
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-[#D3B8A1]/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-[#2B2B2B]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2px' }}>
                Patient Transparency
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-[#D3B8A1]/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-[#2B2B2B]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2px' }}>
                Safety-Verified Recognition
              </h3>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="bg-[#D3B8A1] hover:bg-[#D3B8A1]/90 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <a
                href="https://sign.velorapro.com/pilot-loi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reserve Pilot Place
              </a>
            </Button>
          </div>
        </div>
      </SectionContainer>

      {/* How It Works Timeline */}
      <SectionContainer id="timeline" background="white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            How It Works
          </h2>

          <Timeline steps={timelineSteps} />
        </div>
      </SectionContainer>

      {/* LOI Signing Section */}
      <SectionContainer id="loi" background="cream">
        <div className="max-w-5xl mx-auto">
          <h2
            className="mb-6 text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            Sign Letter of Intent
          </h2>
          <p className="text-center leading-relaxed text-[#2B2B2B]/80 mb-12 max-w-2xl mx-auto">
            Review and sign the pilot agreement. All signatures are securely recorded and
            time-stamped in accordance with UK eIDAS regulations.
          </p>

          {/* Embed Placeholder */}
          <div className="bg-gradient-to-br from-[#EAD5CC]/30 to-[#D3B8A1]/30 rounded-2xl p-16 border-2 border-dashed border-[#D3B8A1] flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <FileSignature className="w-16 h-16 text-[#2B2B2B]/40 mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-[#2B2B2B]/60 mb-6">
                E-Sign LOI Form Embed — Zoho Sign or Dropbox Sign iframe
              </p>
              <Button
                size="lg"
                asChild
                className="bg-[#D3B8A1] hover:bg-[#D3B8A1]/90 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <a
                  href="https://sign.velorapro.com/pilot-loi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Open Signing Form
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-sm text-[#2B2B2B]/60 text-center italic">
            All signatures are securely recorded and time-stamped in accordance with UK eIDAS regulations.
          </p>
        </div>
      </SectionContainer>

      {/* Founder Note */}
      <SectionContainer id="founder" background="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] aspect-[3/4] rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <Users className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center text-white/60 text-xs">
              Founder Photo – neutral light background
            </div>
          </div>

          <div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'var(--text-h2)',
                lineHeight: '1.2',
                letterSpacing: '0.2px',
              }}
            >
              Founder's Note.
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80 mb-6" style={{ fontSize: 'var(--text-body)' }}>
              Velora was founded by Mohammad Ali P., an Imperial-trained health innovator, to close
              the compliance gap in aesthetic medicine. Combining clinical insight with
              digital-health governance, Velora's mission is to make safety the new standard in
              aesthetic care.
            </p>
            <p className="text-sm text-[#2B2B2B]/60">
              Supported by Imperial College Enterprise Lab.
            </p>
            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#E2A79A] to-transparent rounded-full" />
          </div>
        </div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer id="faq" background="cream">
        <div className="max-w-4xl mx-auto">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            Frequently Asked Questions
          </h2>

          <FAQSection items={faqItems} />
        </div>
      </SectionContainer>

      {/* Footer */}
      <footer className="bg-[#2B2B2B] text-white py-16">
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
                {['Overview', 'Benefits', 'Timeline', 'FAQ'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm tracking-wide">Connect</h4>
              <div className="flex flex-col gap-2">
                <a
                  href="https://linkedin.com/company/velora"
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

          <div className="text-center space-y-2">
            <p className="text-sm text-white/60">
              © 2025 Velora Ltd · All rights reserved · Registered in England & Wales No. [●]
            </p>
            <span
              className="text-sm text-white/50 cursor-not-allowed inline-block"
              title="Coming soon — full policy to be published at launch"
              aria-disabled="true"
            >
              Privacy Policy
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
