import React from "react";

export function AnubisGraphic() {
  return (
    <div className="anpu-anubis-graphic">
      <span className="anpu-corner anpu-corner-tl" />
      <span className="anpu-corner anpu-corner-tr" />
      <span className="anpu-corner anpu-corner-bl" />
      <span className="anpu-corner anpu-corner-br" />
      <svg viewBox="0 0 200 240" role="img" aria-label="ANPU Anubis wireframe">
        <defs>
          <filter id="anpu-phosphor-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#anpu-phosphor-glow)" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 20L65 90L100 70L135 90L160 20L130 100L100 90L70 100L40 20Z" strokeWidth="1.5" />
          <path d="M70 115L85 110L92 118L77 122Z" strokeWidth="1.2" />
          <path d="M130 115L115 110L108 118L123 122Z" strokeWidth="1.2" />
          <path d="M100 90V160M100 160L80 175H120L100 160Z" strokeWidth="1.5" />
          <path d="M85 140H115M65 185H135M75 200H125" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M50 170L100 220L150 170" strokeWidth="1.5" />
          <path d="M100 72V215M58 72L100 155L142 72M48 45L100 98L152 45" opacity=".35" />
          <circle cx="100" cy="155" r="28" opacity=".22" />
          <circle cx="100" cy="155" r="46" opacity=".12" />
        </g>
      </svg>
      <div className="anpu-anubis-status">[+] PHARAOH GUARD // LIVE STREAM <span>𓋹</span> <span>𓁹</span></div>
    </div>
  );
}

export default AnubisGraphic;
