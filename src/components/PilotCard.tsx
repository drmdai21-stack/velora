import { LucideIcon } from 'lucide-react';

interface PilotCardProps {
  icon: LucideIcon;
  label: string;
}

export function PilotCard({ icon: Icon, label }: PilotCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-12 h-12 rounded-full bg-[#E2A79A]/20 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-[#2B2B2B]" strokeWidth={1.5} />
      </div>
      <p className="text-sm">{label}</p>
    </div>
  );
}
