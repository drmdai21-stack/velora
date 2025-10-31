import { LucideIcon } from 'lucide-react';

interface TimelineStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="relative">
      {/* Connection Line */}
      <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-[#EAD5CC] via-[#D3B8A1] to-[#E2A79A] hidden md:block" />
      
      <div className="grid md:grid-cols-4 gap-8 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EAD5CC] to-[#D3B8A1] flex items-center justify-center mb-4 relative z-10 shadow-lg">
                <Icon className="w-8 h-8 text-[#2B2B2B]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#2B2B2B]/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
