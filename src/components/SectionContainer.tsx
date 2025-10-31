import { ReactNode } from 'react';

interface SectionContainerProps {
  id: string;
  className?: string;
  children: ReactNode;
  background?: 'white' | 'cream' | 'taupe' | 'sage';
}

const backgrounds = {
  white: 'bg-white',
  cream: 'bg-[#F7EEE8]',
  taupe: 'bg-[#D3B8A1]/20',
  sage: 'bg-[#B8BDB5]/10',
};

export function SectionContainer({
  id,
  className = '',
  children,
  background = 'white',
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`py-24 lg:py-32 scroll-mt-24 ${backgrounds[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {children}
      </div>
    </section>
  );
}
