import { useEffect, useRef, useState } from "react";
import { ArrowRight, GitBranch, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const BOOT_LINES = [
  "> ANPU_SEC v2.4.1 // GUARDIAN PROTOCOL INITIALIZED",
  "> LOADING PHARAOH INTELLIGENCE MODULES...",
  "> [OK] DNS RECON ENGINE    ████████████ 100%",
  "> [OK] TLS INSPECTOR       ████████████ 100%",
  "> [OK] HEADER ANALYZER     ████████████ 100%",
  "> [OK] SURFACE MAPPER      ████████████ 100%",
  "> ANUBIS CORE ONLINE — GUARDIAN READY",
  "> AWAITING TARGET COORDINATES...",
];

const SCRIPT_LINES = [
  "$ anpu scan --deep --target https://example.com",
  "  [*] Initiating DNS reconnaissance...",
  "  [+] A records: 93.184.216.34",
  "  [+] MX records: 3 found",
  "  [+] TXT/SPF: verified",
  "  [*] TLS handshake analysis...",
  "  [+] TLSv1.3 / ECDHE-RSA-AES256-GCM",
  "  [+] Certificate: valid 247d",
  "  [+] HSTS: enabled max-age=31536000",
  "  [*] Security headers scan...",
  "  [!] CSP: missing — SEVERITY: MEDIUM",
  "  [!] Permissions-Policy: not set",
  "  [+] X-Frame-Options: SAMEORIGIN",
  "  [+] Referrer-Policy: strict-origin",
  "  [*] Surface exposure analysis...",
  "  [+] No open redirects detected",
  "  [+] Robots.txt: standard",
  "  ─────────────────────────────────────",
  "  RISK SCORE: 8.7/10   GRADE: A",
  "  REPORT GENERATED: 2024-01-15T03:47:22Z",
];

function BootSequence({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (idx.current < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[idx.current]]);
        idx.current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          onDone();
        }, 600);
      }
    }, 180);
    return () => clearInterval(interval);
  }, [onDone]);

  if (done) return null;

  return (
    <div className="anpu-boot-overlay">
      <div className="anpu-boot-terminal">
        <div className="anpu-boot-header">
          <span className="anpu-boot-dot" />
          <span className="anpu-boot-dot amber" />
          <span className="anpu-boot-dot green" />
          <span style={{ marginLeft: "auto", fontSize: "0.65rem", color: "var(--crt-green-2)", letterSpacing: "0.08em" }}>
            ANPU_SEC // PHARAOH TERMINAL
          </span>
        </div>
        <div className="anpu-boot-body">
          {lines.map((line, i) => (
            <div key={i} className="anpu-boot-line">{line}</div>
          ))}
          <span className="anpu-cursor-blink">█</span>
        </div>
      </div>
    </div>
  );
}

function LiveScript() {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [charPos, setCharPos] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIdx >= SCRIPT_LINES.length) {
      setTimeout(() => {
        setDisplayed([]);
        setCharPos(0);
        setLineIdx(0);
      }, 3000);
      return;
    }
    const currentLine = SCRIPT_LINES[lineIdx];
    if (charPos < currentLine.length) {
      const t = setTimeout(() => {
        setCharPos((p) => p + 1);
      }, 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((prev) => [...prev, currentLine]);
        setCharPos(0);
        setLineIdx((l) => l + 1);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charPos]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayed, charPos]);

  const currentPartial = lineIdx < SCRIPT_LINES.length ? SCRIPT_LINES[lineIdx].slice(0, charPos) : "";

  const colorLine = (line: string, i: number) => {
    if (line.startsWith("$ ")) return <div key={i} style={{ color: "#FFD700" }}>{line}</div>;
    if (line.includes("[+]")) return <div key={i} style={{ color: "var(--crt-green-1)" }}>{line}</div>;
    if (line.includes("[!]")) return <div key={i} style={{ color: "#FF8C00" }}>{line}</div>;
    if (line.includes("[*]")) return <div key={i} style={{ color: "#87CEEB" }}>{line}</div>;
    if (line.includes("RISK SCORE")) return <div key={i} style={{ color: "var(--egypt-gold-1)", fontWeight: "bold" }}>{line}</div>;
    if (line.includes("───")) return <div key={i} style={{ color: "#333" }}>{line}</div>;
    return <div key={i} style={{ color: "#888" }}>{line}</div>;
  };

  return (
    <div className="anpu-live-script" ref={containerRef}>
      {displayed.map((line, i) => colorLine(line, i))}
      {lineIdx < SCRIPT_LINES.length && (
        <div style={{ color: lineIdx === 0 ? "#FFD700" : currentPartial.includes("[!]") ? "#FF8C00" : currentPartial.includes("[+]") ? "var(--crt-green-1)" : currentPartial.includes("[*]") ? "#87CEEB" : "#aaa" }}>
          {currentPartial}<span className="anpu-cursor-blink" style={{ fontSize: "0.85em" }}>█</span>
        </div>
      )}
    </div>
  );
}

export function AnubisHero() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <section className={`anpu-hero-v2 ${booted ? "is-live" : ""}`}>
        {/* Scanline overlay */}
        <div className="anpu-hero-scanlines" aria-hidden="true" />

        {/* Binary rain in hero bg */}
        <div className="anpu-hero-matrix" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="anpu-matrix-col"
              style={{
                left: `${i * 5.8}%`,
                animationDelay: `${(i * 0.43) % 4}s`,
                animationDuration: `${8 + (i % 5) * 1.4}s`,
                opacity: 0.06 + (i % 4) * 0.02,
              }}
            >
              {Array.from({ length: 30 }).map((_, j) => (
                <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
              )).reduce((acc, el, j) => j % 8 === 7 ? [...acc, el, <br key={`br${j}`} />] : [...acc, el], [] as React.ReactNode[])}
            </span>
          ))}
        </div>

        <div className="anpu-hero-v2-inner">
          {/* LEFT: Copy */}
          <div className="anpu-hero-v2-copy">
            <div className="anpu-hero-kicker">
              <span className="anpu-hier">𓋹</span>
              <span>ANPU_SEC // GUARDIAN PROTOCOL ACTIVE</span>
              <span className="anpu-live-dot" />
              <span style={{ color: "var(--crt-green-2)", fontSize: "0.65rem" }}>LIVE</span>
            </div>

            <h1 className="anpu-hero-v2-h1">
              GUARD WHAT<br />
              <span className="anpu-h1-accent">YOU BUILD.</span>
              <i className="anpu-cursor-blink" aria-hidden="true">█</i>
            </h1>

            <p className="anpu-hero-v2-desc">
              Open-source CLI security scanner. Uncover exposed endpoints,
              TLS misconfigurations, and attack vectors before your enemies do.
              Built in Go. Guided by the Pharaoh.
            </p>

            <div className="anpu-hero-v2-stats">
              <div className="anpu-stat-item">
                <span className="anpu-stat-val">6</span>
                <span className="anpu-stat-label">SCAN MODULES</span>
              </div>
              <div className="anpu-stat-div" />
              <div className="anpu-stat-item">
                <span className="anpu-stat-val">GO</span>
                <span className="anpu-stat-label">CORE ENGINE</span>
              </div>
              <div className="anpu-stat-div" />
              <div className="anpu-stat-item">
                <span className="anpu-stat-val">OSS</span>
                <span className="anpu-stat-label">OPEN SOURCE</span>
              </div>
            </div>

            <div className="anpu-hero-v2-actions">
              <Link to="/scan" className="anpu-btn-primary">
                <span>[&gt;]</span> INITIALIZE SCANNER <ArrowRight size={14} />
              </Link>
              <a
                href="https://github.com/Marwanmorsy999/anpu"
                target="_blank"
                rel="noopener noreferrer"
                className="anpu-btn-secondary"
              >
                <GitBranch size={14} /> OPEN REPOSITORY
              </a>
              <Link to="/docs" className="anpu-btn-ghost">
                <Terminal size={14} /> DOCS
              </Link>
            </div>

            <div className="anpu-hero-v2-cmd">
              <span className="anpu-cmd-prompt">$</span>
              <span className="anpu-cmd-text">anpu scan https://your-target.com</span>
              <span className="anpu-cmd-copy" title="Copy command">⎘</span>
            </div>
          </div>

          {/* CENTER: Anubis Logo */}
          <div className="anpu-hero-v2-logo">
            <div className="anpu-logo-frame">
              <div className="anpu-logo-corner tl" />
              <div className="anpu-logo-corner tr" />
              <div className="anpu-logo-corner bl" />
              <div className="anpu-logo-corner br" />
              <div className="anpu-logo-scanbar" aria-hidden="true" />
              <img
                src="/anubis-logo.jpg"
                alt="ANPU — Anubis Cyber Security"
                className="anpu-logo-img"
              />
              <div className="anpu-logo-glitch" aria-hidden="true" />
              <div className="anpu-logo-status">
                <span className="anpu-live-dot" />
                PHARAOH GUARDIAN // ONLINE
              </div>
              <div className="anpu-logo-coords">
                <span>LAT: 30.0444° N</span>
                <span>LON: 31.2357° E</span>
              </div>
            </div>
            <div className="anpu-logo-hieroglyphs" aria-hidden="true">
              𓂀 𓃒 𓁹 𓋹 𓂀 𓃒 𓁹 𓋹 𓂀 𓃒 𓁹 𓋹
            </div>
          </div>

          {/* RIGHT: Live terminal */}
          <div className="anpu-hero-v2-terminal">
            <div className="anpu-terminal-frame">
              <div className="anpu-terminal-titlebar">
                <div className="anpu-terminal-dots">
                  <span />
                  <span className="amber" />
                  <span className="green" />
                </div>
                <span className="anpu-terminal-title">ANPU // LIVE SCAN</span>
                <span className="anpu-terminal-tag">&lt;/&gt;</span>
              </div>
              <LiveScript />
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="anpu-hero-ticker" aria-hidden="true">
          <div className="anpu-ticker-track">
            {["𓁹 DNS RECON ACTIVE", "𓋹 TLS INSPECTION ONLINE", "𓂀 HEADER ANALYSIS RUNNING", "𓃒 SURFACE MAPPING ENGAGED", "𓁹 COOKIE AUDIT COMPLETE", "𓋹 RISK SCORE COMPUTED", "𓂀 REPORT GENERATED", "𓃒 GUARDIAN PROTOCOL v2.4"].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
            {["𓁹 DNS RECON ACTIVE", "𓋹 TLS INSPECTION ONLINE", "𓂀 HEADER ANALYSIS RUNNING", "𓃒 SURFACE MAPPING ENGAGED", "𓁹 COOKIE AUDIT COMPLETE", "𓋹 RISK SCORE COMPUTED", "𓂀 REPORT GENERATED", "𓃒 GUARDIAN PROTOCOL v2.4"].map((t, i) => (
              <span key={`dup-${i}`}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AnubisHero;
