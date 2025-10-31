import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { SectionContainer } from './components/SectionContainer';
import { FeatureCard } from './components/FeatureCard';
import { PilotCard } from './components/PilotCard';
import { AnimatedLine } from './components/AnimatedLine';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Shield, Lock, Heart, FileText, CheckCircle2, Users, Award, ExternalLink, Linkedin, CheckCircle, ChevronDown, Loader2, AlertCircle, Mail } from 'lucide-react';
import { Separator } from './components/ui/separator';
import { Alert, AlertDescription } from './components/ui/alert';
import founderPhoto from 'figma:asset/35a495014f4924892df9267df71632a09b0a6d5c.png';

// Netlify Forms encoding helper
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    clinicName: '',
    message: '',
    website: '', // honeypot field
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showLOI, setShowLOI] = useState(false);
  const [loiCompleted, setLoiCompleted] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const lastSubmitAt = useRef<number | null>(null);
  const accessCodeInputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: shouldAnimate ? 'smooth' : 'auto' });
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

  // Reset form when navigating away from contact section
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash !== '#contact' && formSubmitted) {
        setFormSubmitted(false);
        setFormData({
          name: '',
          type: '',
          email: '',
          clinicName: '',
          message: '',
          website: '',
        });
        setValidationErrors({});
        setFormError(null);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [formSubmitted]);

  // Scroll to access gate when it opens and auto-focus input
  useEffect(() => {
    if (showGate) {
      // Small delay to allow the animation to start
      setTimeout(() => {
        const gateElement = document.getElementById('pilot-access-gate');
        if (gateElement) {
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          gateElement.scrollIntoView({ 
            behavior: prefersReduced ? 'auto' : 'smooth',
            block: 'start'
          });
        }
        // Auto-focus the input field for better UX
        if (accessCodeInputRef.current) {
          accessCodeInputRef.current.focus();
        }
      }, 100);
    }
  }, [showGate]);

  // Validation functions
  const validateName = (name: string): string | null => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return 'Name must be at least 2 characters';
    if (trimmed.length > 80) return 'Name must be less than 80 characters';
    if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return 'Please enter a valid email address';
    return null;
  };

  const validateMessage = (message: string): string | null => {
    const trimmed = message.trim();
    if (trimmed.length < 20) return 'Message must be at least 20 characters';
    if (trimmed.length > 2000) return 'Message must be less than 2000 characters';
    return null;
  };

  const validateType = (type: string): string | null => {
    const validTypes = ['clinic', 'investor', 'partner', 'other'];
    if (!validTypes.includes(type)) return 'Please select a valid type';
    return null;
  };

  const stripHtml = (text: string): string => {
    return text.replace(/<[^>]*>/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;

    // Rate limiting: 15 seconds between submissions
    const now = Date.now();
    if (lastSubmitAt.current && now - lastSubmitAt.current < 15000) {
      setFormError('Please wait a moment before submitting again.');
      return;
    }

    // Reset errors
    setFormError(null);
    setValidationErrors({});

    // Honeypot check (silent fail)
    if (formData.website.trim()) {
      setIsSubmitting(false);
      return;
    }

    // Validate all fields
    const errors: Record<string, string> = {};
    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const messageError = validateMessage(formData.message);
    if (messageError) errors.message = messageError;

    const typeError = validateType(formData.type);
    if (typeError) errors.type = typeError;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Focus first invalid field
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      if (element) element.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Netlify Forms submission
      const payload = {
        'form-name': 'velora-contact',
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        type: formData.type,
        clinic: formData.clinicName.trim() || '',
        message: stripHtml(formData.message.trim()),
        website: formData.website
      };

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload)
      });

      // Netlify Forms: 200 = success, 3xx = redirect (also success)
      // Only treat 4xx and 5xx as errors
      if (response.status >= 400) {
        throw new Error('Submission failed');
      }

      // Success - show success card
      setFormSubmitted(true);
      lastSubmitAt.current = now;
      // Reset form
      setFormData({
        name: '',
        type: '',
        email: '',
        clinicName: '',
        message: '',
        website: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError('Sorry — something went wrong. Please email founder@velorapro.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle access code unlock with validation
  const handleUnlock = () => {
    if (!accessCode.trim()) return;
    
    setIsChecking(true);
    const isValidCode = accessCode.trim().toLowerCase() === 'velora';
    
    if (isValidCode) {
      setUnlocked(true);
      setErrorMsg(null);
      setIsChecking(false);
    } else {
      setErrorMsg('Invalid code. Please check your invitation letter.');
      // Soft cooldown to prevent spam clicks
      setTimeout(() => setIsChecking(false), 1500);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #EAD5CC 40%, #F7EEE8 100%)',
        }}
      >
        {/* Animated Line Motif */}
        <AnimatedLine />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center pt-20">
          <h1
            className="mb-8 tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              lineHeight: '1.15',
              color: '#2B2B2B',
              letterSpacing: '0.2px',
            }}
          >
            Safer, Smarter, More Compliant
            <br />
            Aesthetic Care.
          </h1>

          <p className="mb-12 max-w-3xl mx-auto leading-relaxed text-[#2B2B2B]/80" style={{ fontSize: 'var(--text-body)' }}>
            VELORA is building the UK's first regulated digital-health platform for non-surgical
            aesthetics, where technology protects patients and empowers professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection('pilot')}
              className="bg-[#D3B8A1] hover:bg-[#D3B8A1]/90 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Join Pilot (Clinics)
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('investors')}
              className="border-2 border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Investor Overview
            </Button>
          </div>

          <p className="text-sm text-[#2B2B2B]/60">
            Supported by Imperial College Enterprise Lab
          </p>
        </div>
      </section>

      {/* About Section */}
      <SectionContainer id="about" background="cream">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              Technology That Safeguards Aesthetic Practice.
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80 mb-8" style={{ fontSize: 'var(--text-body)' }}>
              VELORA bridges clinical excellence and digital safety. Our platform embeds compliance,
              data protection, and transparency into every aesthetic workflow, aligning with UK standards.
            </p>
          </div>

          <div className="grid gap-6">
            <FeatureCard
              icon={Shield}
              label="Compliance by Design"
              description="Built on verified UK frameworks."
            />
            <FeatureCard
              icon={Lock}
              label="Data Integrity"
              description="Secure, encrypted, and UK-hosted."
            />
            <FeatureCard
              icon={Heart}
              label="Transparency & Trust"
              description="Protecting both patients and professionals."
            />
          </div>
        </div>
      </SectionContainer>

      {/* Pilot Section */}
      <SectionContainer id="pilot" background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            Join the Founding Pilot, Q1-Q2 2026
          </h2>

          <p className="leading-relaxed text-[#2B2B2B]/80 mb-12 max-w-2xl mx-auto" style={{ fontSize: 'var(--text-body)' }}>
            We're inviting a select group of London and UK clinics to co-develop VeloraPRO, our
            compliance and patient-safety system. Participation is voluntary, at no cost, and fully
            non-binding.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <PilotCard icon={FileText} label="Streamlined Documentation" />
            <PilotCard icon={CheckCircle2} label="Safer Consent & Record-Keeping" />
            <PilotCard icon={Users} label="Patient Transparency" />
            <PilotCard icon={Award} label="Safety-Verified Recognition" />
          </div>

          <Button
            size="lg"
            onClick={() => {
              setShowGate(true);
              setUnlocked(false);
              setAccessCode('');
              setErrorMsg(null);
              setIsChecking(false);
            }}
            className="bg-[#D3B8A1] hover:bg-[#D3B8A1]/90 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            aria-expanded={showGate}
            aria-controls="pilot-access-gate"
          >
            Review & Sign Pilot LOI
            <ChevronDown className="w-5 h-5 ml-2" />
          </Button>

          <p className="mt-4 text-sm text-[#2B2B2B]/60">
            Voluntary · No cost · Non-binding
          </p>
          
          <p className="mt-2 text-xs text-[#2B2B2B]/50 italic max-w-xl mx-auto">
            Your clinic enters its details before signing; a time-stamped copy is sent automatically.
          </p>

          {/* Secure Access Code Gate */}
          {showGate && (
            <div
              id="pilot-access-gate"
              className={`mt-10 p-4 sm:p-6 border border-[#D3B8A1]/40 rounded-2xl bg-[#F7EEE8] shadow-sm mx-auto text-center opacity-0 animate-[fadeIn_0.4s_ease-in_forwards] ${
                unlocked ? 'max-w-5xl' : 'max-w-2xl'
              }`}
              style={{
                animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'none'
                  : 'fadeIn 0.4s ease-in forwards',
              }}
            >
              {!unlocked ? (
                <>
                  <h3 
                    className="mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                      lineHeight: '1.3',
                      color: '#2B2B2B'
                    }}
                  >
                    Pilot Access
                  </h3>
                  <p className="text-sm text-[#2B2B2B]/70 mb-4 max-w-md mx-auto">
                    Please enter the access code provided in your invitation letter to review and sign the Pilot LOI.
                  </p>
                  <input
                    ref={accessCodeInputRef}
                    type="password"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      // Clear error when user starts typing
                      if (errorMsg) setErrorMsg(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && accessCode.trim() && !isChecking) {
                        handleUnlock();
                      }
                    }}
                    placeholder="Access code"
                    aria-label="Pilot access code"
                    aria-invalid={!!errorMsg}
                    aria-describedby={errorMsg ? 'access-error' : undefined}
                    className={`rounded-lg border px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#D3B8A1] focus:border-transparent max-w-xs w-full transition-colors duration-200 ${
                      errorMsg 
                        ? 'border-[#E2A79A] bg-[#FEF5F3]' 
                        : 'border-[#D3B8A1]/60'
                    }`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'var(--text-body)'
                    }}
                  />
                  
                  {/* Inline Error Message */}
                  <div className="mt-3 min-h-[2rem]" role="status" aria-live="polite">
                    {errorMsg && (
                      <div
                        id="access-error"
                        className="mx-auto max-w-sm rounded-xl border border-[#E2A79A] bg-[#F7EEE8] px-3 py-2.5 text-sm text-[#2B2B2B] flex items-center justify-center gap-2 opacity-0 animate-[fadeIn_0.3s_ease-in_forwards]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                            ? 'none'
                            : 'fadeIn 0.3s ease-in forwards',
                        }}
                      >
                        <span className="text-base" aria-hidden="true">⚠️</span>
                        <span>{errorMsg}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-center gap-3 flex-wrap">
                    <button
                      onClick={handleUnlock}
                      disabled={!accessCode.trim() || isChecking}
                      className={`rounded-2xl px-6 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        !accessCode.trim() || isChecking
                          ? 'bg-[#D3B8A1]/50 text-[#2B2B2B]/60 cursor-not-allowed focus:ring-[#D3B8A1]/50'
                          : 'bg-[#D3B8A1] text-white hover:bg-[#D3B8A1]/80 focus:ring-[#D3B8A1]'
                      }`}
                      aria-busy={isChecking}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'var(--text-body)'
                      }}
                    >
                      {isChecking ? 'Checking…' : 'Unlock'}
                    </button>
                    <button
                      onClick={() => {
                        setShowGate(false);
                        setUnlocked(false);
                        setAccessCode('');
                        setErrorMsg(null);
                        setIsChecking(false);
                      }}
                      className="rounded-2xl bg-[#E5E5E5] text-[#2B2B2B]/70 px-6 py-2 hover:bg-[#E5E5E5]/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2B2B2B]/20 focus:ring-offset-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'var(--text-body)'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {!loiCompleted ? (
                    <div className="rounded-2xl overflow-hidden border border-[#D3B8A1]/40 shadow-lg bg-white w-full">
                      <iframe
                        id="loi-frame"
                        onLoad={handleLoiFrameLoad}
                        src="https://eu1.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhATyOPGy7lwveoMjippRMAt9uT7x4GJCWFcbV33-vDlgt6cjV-JUByQSybWNgRUYL0*&hosted=false"
                        style={{
                          border: '0',
                          borderRadius: '20px',
                          width: '100%',
                          height: 'clamp(560px, 75vh, 960px)'
                        }}
                        title="Velora Pilot LOI"
                        loading="lazy"
                        allowFullScreen
                      />
                      <p className="text-xs text-[#2B2B2B]/60 mt-3 mb-3 px-4">
                        Confidential — for invited clinics only. Do not share this link or code.
                      </p>
                      
                      {/* Manual completion trigger */}
                      <div className="text-center pb-4">
                        <button
                          onClick={() => setLoiCompleted(true)}
                          className="text-sm text-[#2B2B2B]/50 hover:text-[#2B2B2B]/70 underline transition-colors"
                          type="button"
                          style={{ fontSize: 'var(--text-body)' }}
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
                          // Reset the access gate state
                          setTimeout(() => {
                            setShowGate(false);
                            setUnlocked(false);
                            setAccessCode('');
                            setLoiCompleted(false);
                          }, 300);
                        }}
                        className="rounded-2xl px-8 py-4 bg-[#EAD5CC] text-[#2B2B2B] hover:bg-[#D3B8A1]/80 border-0 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Return to Velora Home
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </SectionContainer>

      {/* Investors Section */}
      <SectionContainer id="investors" background="taupe">
        <div className="text-center mb-12">
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            A Regulated Digital-Health Venture — SEIS Ready.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-[#D3B8A1]/10 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4 mx-auto">
              <Award className="w-6 h-6 text-[#2B2B2B]" strokeWidth={1.5} />
            </div>
            <h3 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2px' }}>
              Market
            </h3>
            <p className="text-[#2B2B2B]/80 leading-relaxed">
              The UK’s £3 billion aesthetics market is expanding rapidly yet remains fragmented and under-regulated.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-[#D3B8A1]/10 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-6 h-6 text-[#2B2B2B]" strokeWidth={1.5} />
            </div>
            <h3 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2px' }}>
              Why VELORA
            </h3>
            <p className="text-[#2B2B2B]/80 leading-relaxed">
              Clinician-built • Safety-by-design • Governance-driven • Supported by Imperial College Enterprise Lab
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-[#D3B8A1]/10 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-[#2B2B2B]" strokeWidth={1.5} />
            </div>
            <h3 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2px' }}>
              Mission
            </h3>
            <p className="text-[#2B2B2B]/80 leading-relaxed">
              To make aesthetic care safer, smarter, and more transparent through a trusted, compliant digital-health platform.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                contactSection.scrollIntoView({ 
                  behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  block: 'start'
                });
                // Focus the heading for accessibility
                const heading = contactSection.querySelector('h2');
                if (heading && heading instanceof HTMLElement) {
                  heading.setAttribute('tabindex', '-1');
                  heading.focus();
                }
              }
            }}
            aria-label="Request investor information and open contact form"
            className="border-2 border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            Request Investor Information
            <ChevronDown className="w-4 h-4" />
          </Button>
          <p className="text-sm text-[#2B2B2B]/60 mt-3" style={{ letterSpacing: '0.2px' }}>
            Investor materials are shared confidentially upon request.
          </p>
        </div>
      </SectionContainer>

      {/* Alignment Section */}
      <SectionContainer id="alignment" background="white">
        <Separator className="mb-16 bg-[#D3B8A1]/30" />
        
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            Aligned with Leading UK Standards.
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['JCCP', 'CPSA', 'ASA/CAP', 'ICO', 'CQC'].map((badge) => (
              <div
                key={badge}
                className="w-20 h-20 rounded-full border-2 border-[#D3B8A1] flex items-center justify-center transition-all duration-300 hover:bg-[#D3B8A1]/10 hover:scale-105"
              >
                <span className="text-sm tracking-wide">{badge}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#2B2B2B]/70 leading-relaxed">
            Velora operates within the UK's emerging regulatory framework for aesthetic licensing
            under the Health & Care Act 2022 s.180.
          </p>
        </div>

        <Separator className="mt-16 bg-[#D3B8A1]/30" />
      </SectionContainer>

      {/* Founder Section */}
      <SectionContainer id="founder" background="cream">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] aspect-[3/4] rounded-2xl flex items-center justify-center shadow-lg max-w-[280px] mx-auto lg:mx-0 w-full">
            <img 
              src={founderPhoto} 
              alt="Dr Mohammad Alipanahi, Founder of Velora" 
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
              style={{
                minWidth: '220px'
              }}
            />
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
              Founder's Note
            </h2>
            <p className="leading-relaxed text-[#2B2B2B]/80 mb-6" style={{ fontSize: 'var(--text-body)' }}>
              Velora was founded by Dr Mohammad Alipanahi, an Imperial-trained health innovator, to close
              the compliance gap in aesthetic medicine. Combining clinical insight with
              digital-health governance, Velora's mission is to make safety the new standard in
              aesthetic care.
            </p>
            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#E2A79A] to-transparent rounded-full" />
          </div>
        </div>
      </SectionContainer>

      {/* Contact Section */}
      <SectionContainer id="contact" background="white">
        <div className="max-w-3xl mx-auto">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'var(--text-h2)',
              lineHeight: '1.2',
              letterSpacing: '0.2px',
            }}
          >
            Get in Touch
          </h2>

          {/* Success State */}
          {formSubmitted ? (
            <div 
              className="rounded-2xl border border-[#D3B8A1]/40 bg-[#F7EEE8] p-8 text-center shadow-sm opacity-0 animate-[fadeIn_0.3s_ease-in_forwards]"
              role="status"
              aria-live="polite"
              style={{
                animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                  ? 'none' 
                  : 'fadeIn 0.3s ease-in forwards'
              }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#D3B8A1]/60 text-[#D3B8A1]">
                <CheckCircle className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'var(--text-h3)',
                  lineHeight: '1.3',
                  letterSpacing: '0.2px',
                  color: '#2B2B2B'
                }}
              >
                Thanks — we've received your message
              </h3>
              <p className="text-sm text-[#2B2B2B]/70 mb-6 leading-relaxed">
                We'll respond within 2 business days.
              </p>
              <Button
                type="button"
                aria-label="Back to Home"
                onClick={() => {
                  // Reset form state
                  setFormSubmitted(false);
                  setFormData({
                    name: '',
                    type: '',
                    email: '',
                    clinicName: '',
                    message: '',
                    website: '',
                  });
                  setValidationErrors({});
                  setFormError(null);

                  // Scroll to top (respect reduced motion)
                  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });

                  // Optional: clean hash to default
                  window.history.replaceState(null, '', window.location.pathname);
                }}
                className="rounded-2xl px-6 py-3 bg-[#EAD5CC] text-[#2B2B2B] hover:bg-[#D3B8A1]/80 border-0 transition-all duration-300"
              >
                Back to Home
              </Button>
            </div>
          ) : (
            <>
              {/* Error State */}
              {formError && (
                <div
                  className="mb-6 rounded-2xl border border-[#E2A79A] bg-[#F7EEE8] p-8 shadow-sm opacity-0 animate-[fadeIn_0.3s_ease-in_forwards]"
                  role="alert"
                  aria-live="polite"
                  style={{
                    animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                      ? 'none' 
                      : 'fadeIn 0.3s ease-in forwards'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2A79A]/60 text-[#E2A79A] flex-shrink-0">
                      <AlertCircle className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#2B2B2B]/80 leading-relaxed mb-4">
                        {formError}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="rounded-2xl border border-[#D3B8A1]/60 text-[#2B2B2B] hover:bg-[#EAD5CC]/50 transition-all duration-300"
                      >
                        <a href="mailto:founder@velorapro.com" className="inline-flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email us instead
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <form
                name="velora-contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="website"
                action="/"
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <input type="hidden" name="form-name" value="velora-contact" />
                {/* Name Field */}
                <div>
                  <Input
                    name="name"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (validationErrors.name) {
                        setValidationErrors({ ...validationErrors, name: '' });
                      }
                    }}
                    className={`bg-[#F7EEE8] border-[#D3B8A1]/30 focus:border-[#D3B8A1] rounded-xl px-6 py-6 transition-colors ${
                      validationErrors.name ? 'border-red-400 focus:border-red-500' : ''
                    }`}
                    aria-label="Your name"
                    aria-invalid={!!validationErrors.name}
                    aria-describedby={validationErrors.name ? 'name-error' : undefined}
                    disabled={isSubmitting}
                    required
                  />
                  {validationErrors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-2 ml-2">
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                {/* Type Field */}
                <div>
                  <Select
                    name="type"
                    value={formData.type}
                    onValueChange={(value) => {
                      setFormData({ ...formData, type: value });
                      if (validationErrors.type) {
                        setValidationErrors({ ...validationErrors, type: '' });
                      }
                    }}
                    disabled={isSubmitting}
                    required
                  >
                    <SelectTrigger 
                      className={`bg-[#F7EEE8] border-[#D3B8A1]/30 focus:border-[#D3B8A1] rounded-xl px-6 py-6 ${
                        validationErrors.type ? 'border-red-400' : ''
                      }`}
                      aria-label="Select your type"
                      aria-invalid={!!validationErrors.type}
                    >
                      <SelectValue placeholder="Clinic / Investor Type *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinic">Clinic Director / Practitioner</SelectItem>
                      <SelectItem value="investor">Investor / Angel</SelectItem>
                      <SelectItem value="partner">Partner / Regulator</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.type && (
                    <p className="text-red-600 text-sm mt-2 ml-2">
                      {validationErrors.type}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (validationErrors.email) {
                        setValidationErrors({ ...validationErrors, email: '' });
                      }
                    }}
                    className={`bg-[#F7EEE8] border-[#D3B8A1]/30 focus:border-[#D3B8A1] rounded-xl px-6 py-6 transition-colors ${
                      validationErrors.email ? 'border-red-400 focus:border-red-500' : ''
                    }`}
                    aria-label="Your email address"
                    aria-invalid={!!validationErrors.email}
                    aria-describedby={validationErrors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                    required
                  />
                  {validationErrors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-2 ml-2">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* Clinic Name Field (Optional) */}
                <div>
                  <Input
                    name="clinic"
                    placeholder="Clinic Name (optional)"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    className="bg-[#F7EEE8] border-[#D3B8A1]/30 focus:border-[#D3B8A1] rounded-xl px-6 py-6"
                    aria-label="Clinic name (optional)"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <Textarea
                    name="message"
                    placeholder="Message (minimum 20 characters) *"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (validationErrors.message) {
                        setValidationErrors({ ...validationErrors, message: '' });
                      }
                    }}
                    rows={6}
                    maxLength={2000}
                    className={`bg-[#F7EEE8] border-[#D3B8A1]/30 focus:border-[#D3B8A1] rounded-xl px-6 py-4 resize-none transition-colors ${
                      validationErrors.message ? 'border-red-400 focus:border-red-500' : ''
                    }`}
                    aria-label="Your message"
                    aria-invalid={!!validationErrors.message}
                    aria-describedby={validationErrors.message ? 'message-error' : 'message-help'}
                    disabled={isSubmitting}
                    required
                  />
                  {validationErrors.message ? (
                    <p id="message-error" className="text-red-600 text-sm mt-2 ml-2">
                      {validationErrors.message}
                    </p>
                  ) : (
                    <p id="message-help" className="text-[#2B2B2B]/50 text-xs mt-2 ml-2">
                      {formData.message.length}/2000 characters
                    </p>
                  )}
                </div>

                {/* Honeypot Field (hidden from users) */}
                <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="website">Don't fill this out if you're human:</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Privacy Notice */}
                <p className="text-xs text-[#2B2B2B]/60 leading-relaxed" style={{ lineHeight: '1.5' }}>
                  Your details are processed under legitimate interest (B2B) solely for pilot/investor contact.
                </p>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.type || !formData.message}
                  className="w-full bg-[#D3B8A1] hover:bg-[#D3B8A1]/90 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:translate-y-0"
                  aria-label="Send message to Velora"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </>
          )}
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
                {[
                  { name: 'About', type: 'scroll' },
                  { name: 'Pilot', type: 'scroll' },
                  { name: 'Investors', type: 'scroll' },
                  { name: 'Privacy', type: 'disabled' },
                ].map((link) => {
                  if (link.type === 'disabled') {
                    return (
                      <span
                        key={link.name}
                        className="block text-sm text-white/50 cursor-not-allowed px-1"
                        title="Coming soon — full policy to be published at launch"
                        aria-disabled="true"
                      >
                        {link.name}
                      </span>
                    );
                  }
                  if (link.type === 'link') {
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                      >
                        {link.name}
                      </a>
                    );
                  }
                  return (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.name.toLowerCase())}
                      className="block text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1"
                    >
                      {link.name}
                    </button>
                  );
                })}
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
                  <span>founder@velorapro.com</span>
                </a>
              </div>
            </div>
          </div>

          <Separator className="bg-white/20 mb-8" />

          <div className="text-center space-y-2">
            <p className="text-sm text-white/60">
              © 2025 Velora Intelligence Ltd · All rights reserved · Registered in England & Wales No. 16768922
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
