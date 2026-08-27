export function AnubisWireframe() {
  return (
    <svg viewBox="0 0 260 340" className="anpu-anubis-wireframe" role="img" aria-label="Anubis wireframe guardian">
      <defs>
        <filter id="anpu-neon" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="anpu-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22FF66" stopOpacity="0" />
          <stop offset="0.5" stopColor="#22FF66" stopOpacity="0.65" />
          <stop offset="1" stopColor="#FFC83B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#22FF66" strokeWidth="1.2" strokeLinejoin="round" filter="url(#anpu-neon)" opacity=".92">
        <path d="M91 74L72 39l33 20 24-30 8 36 39-16-18 34 29 23-36 3 7 31-35-11-18 28-13-30-34 10 5-31-35-4 30-22-17-35 37 18z" opacity=".7" />
        <path d="M95 86Q130 61 165 86L177 151Q171 191 130 207Q89 191 83 151Z" />
        <path d="M84 120L64 112M176 120l21-8M88 151l-27 6M172 151l27 6" />
        <path d="M106 111l18-7 18 7 11 22-17 19-24 0-17-19z" />
        <path d="M111 117l10 7 9-7 10 7M103 133l14-7 14 7 13-7" />
        <path d="M130 143v23M117 154h26" stroke="#FFC83B" />
        <path d="M96 186L71 226l12 52h94l12-52-25-40" />
        <path d="M90 222l40 22 40-22M84 278l22-38M176 278l-22-38M98 239l-8 39M162 239l8 39" />
        <path d="M72 226h116M60 289h140" opacity=".65" />
      </g>
      <g stroke="url(#anpu-scan)" strokeWidth="1">
        <path d="M48 104H212M54 176H206M62 248H198" opacity=".65" />
      </g>
      <g fill="#FFC83B" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1">
        <text x="8" y="40">𓁹 ANUBIS_NODE</text>
        <text x="158" y="322">𓋹 GUARDIAN</text>
      </g>
    </svg>
  );
}

export default AnubisWireframe;
