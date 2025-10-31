import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#D3B8A1]/90 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B2B2B] rounded"
            style={{ fontFamily: "'Playfair Display', serif" }}
            aria-label="Velora home"
          >
            <span className="text-6xl tracking-wide" style={{ color: scrolled ? '#ffffff' : '#2B2B2B', letterSpacing: '0.2px' }}>
              VELORA
            </span>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {[
              { name: 'About', type: 'scroll' },
              { name: 'Pilot', type: 'scroll' },
              { name: 'Investors', type: 'scroll' },
              { name: 'Founder', type: 'scroll' },
              { name: 'Contact', type: 'scroll' },
            ].map((item) => {
              if (item.type === 'link') {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative group transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B2B2B] rounded px-2 py-1"
                    style={{ color: scrolled ? '#ffffff' : '#2B2B2B' }}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <span className="text-sm tracking-wide">{item.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        scrolled ? 'bg-white' : 'bg-[#2B2B2B]'
                      }`}
                    />
                  </a>
                );
              }
              
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                  className="relative group transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B2B2B] rounded px-2 py-1"
                  style={{ color: scrolled ? '#ffffff' : '#2B2B2B' }}
                  aria-label={`Navigate to ${item.name}`}
                >
                  <span className="text-sm tracking-wide">{item.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      scrolled ? 'bg-white' : 'bg-[#2B2B2B]'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
