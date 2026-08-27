export function AnubisHero() {
  return (
    <section className="anpu-exact-hero crt-terminal">
      <div className="anpu-exact-scanlines" aria-hidden="true" />
      <div className="anpu-exact-grid">
        <div className="anpu-exact-copy">
          <div className="anpu-exact-kicker"><span>𓋹</span><span>ANPU_SEC_TERMINAL // SESSION_01</span></div>
          <h1>Guard what <br /><span>you build.</span><i className="cursor-blink" aria-hidden="true">█</i></h1>
          <p>Continuously scan your web surface infrastructure. Uncover exposed endpoints, TLS misconfigurations, and attack vectors in real time.</p>
          <div className="anpu-exact-actions">
            <a href="/scan">[&gt;] INITIALIZE SCANNER</a>
            <a href="/docs">[?] DOCUMENTATION</a>
          </div>
        </div>
        <div className="anpu-exact-visual">
          <div className="anpu-exact-frame">
            <span className="anpu-exact-corner tl" aria-hidden="true" />
            <span className="anpu-exact-corner tr" aria-hidden="true" />
            <span className="anpu-exact-corner bl" aria-hidden="true" />
            <span className="anpu-exact-corner br" aria-hidden="true" />
            <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ANPU Anubis wireframe">
              <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M40 20L65 90L100 70L135 90L160 20L130 100L100 90L70 100L40 20Z" strokeWidth="1.5" />
                <path d="M70 115L85 110L92 118L77 122Z" strokeWidth="1.2" />
                <path d="M130 115L115 110L108 118L123 122Z" strokeWidth="1.2" />
                <path d="M100 90V160M100 160L80 175H120L100 160Z" strokeWidth="1.5" />
                <path d="M85 140H115" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M50 170L100 220L150 170" strokeWidth="1.5" />
                <path d="M65 185H135" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M75 200H125" strokeWidth="1" strokeDasharray="3 3" />
              </g>
            </svg>
            <div className="anpu-exact-status">[+] PHARAOH GUARD // LIVE STREAM 𓋹 𓁹</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnubisHero;
