import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownBannerProps {
  deadline: string;
  placesRemaining: number;
  totalPlaces: number;
}

export function CountdownBanner({ deadline, placesRemaining, totalPlaces }: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(deadline) - +new Date();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        return `${days} days`;
      }
      
      return 'Closed';
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="bg-[#E2A79A] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" strokeWidth={1.5} />
          <span className="tracking-wide">
            Cohort 1 closes {deadline}
          </span>
        </div>
        <div className="h-4 w-px bg-white/30 hidden sm:block" />
        <span>
          <span className="font-medium">{placesRemaining}</span> of {totalPlaces} places remaining
        </span>
      </div>
    </div>
  );
}
