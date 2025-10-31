export function AnimatedLine() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D3B8A1', stopOpacity: 0.3 }} />
          <stop offset="50%" style={{ stopColor: '#E2A79A', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#D3B8A1', stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      
      {/* Flowing data line motif */}
      <path
        d="M 0 50 Q 200 30, 400 50 T 800 50 T 1200 50 T 1600 50"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      
      <path
        d="M 100 150 Q 300 130, 500 150 T 900 150 T 1300 150 T 1700 150"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="animate-pulse"
        style={{ animationDuration: '5s', animationDelay: '1s' }}
      />
      
      {/* Data points */}
      <circle cx="200" cy="50" r="3" fill="#D3B8A1" className="animate-pulse" />
      <circle cx="600" cy="50" r="3" fill="#E2A79A" className="animate-pulse" style={{ animationDelay: '2s' }} />
      <circle cx="300" cy="150" r="3" fill="#D3B8A1" className="animate-pulse" style={{ animationDelay: '1s' }} />
    </svg>
  );
}
