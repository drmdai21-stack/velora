import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
}

export function FeatureCard({ icon: Icon, label, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 border border-[#D3B8A1]/10">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4 shadow-md">
        <Icon className="w-8 h-8 text-[#2B2B2B]" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.2px' }}>
        {label}
      </h3>
      <p className="text-sm text-[#2B2B2B]/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
