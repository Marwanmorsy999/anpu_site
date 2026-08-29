import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Shield, Zap, Target, Copy, CheckCheck } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { scanProgressSteps, demoReport } from "@/lib/mockData";
import type { ScanProfile } from "@/lib/types";
import { TerminalRadar } from "@/components/TerminalRadar";

// ── Real scan log lines keyed to actual ANPU modules ──
const LOG_LINES = [
  { tag: "INIT",  color: "#6a8a6a", text: (t: string) => `ANPU_SEC v2.4.1 // TARGET: ${t}` },
  { tag: "RECON", color: "#87CEEB", text: () => "DNS A records resolved → 203.0.113.195" },
  { tag: "RECON", color: "#87CEEB", text: () => "MX: 3 records  NS: 4 records  TXT/SPF: present" },
  { tag: "RECON", color: "#87CEEB", text: () => "robots.txt: fetched  sitemap.xml: fetched" },
  { tag: "TECH",  color: "#87CEEB", text: () => "Technology: nginx/1.24  React 18  Cloudflare CDN" },
  { tag: "TLS",   color: "var(--crt-green-1)", text: () => "TLSv1.3 / ECDHE-RSA-AES256-GCM-SHA384" },
  { tag: "TLS",   color: "var(--crt-green-1)", text: () => "Certificate: valid 247d  Issuer: Let's Encrypt" },
  { tag: "TLS",   color: "var(--crt-green-1)", text: () => "HTTPS redirect: enforced  HSTS: present" },
  { tag: "HDR",   color: "#FF8C00", text: () => "[!] Content-Security-Policy: MISSING  → MEDIUM" },
  { tag: "HDR",   color: "var(--crt-green-1)", text: () => "[+] X-Content-Type-Options: nosniff" },
  { tag: "HDR",   color: "#FF8C00", text: () => "[!] Permissions-Policy: NOT SET  → LOW" },
  { tag: "HDR",   color: "var(--crt-green-1)", text: () => "[+] Referrer-Policy: strict-origin-when-cross-origin" },
  { tag: "CKY",   color: "var(--crt-green-1)", text: () => "Cookies: Secure=true  HttpOnly=true  SameSite=Lax" },
  { tag: "ENDPT", color: "#87CEEB", text: () => "Endpoints discovered: 168  Forms: 4  APIs: 12" },
  { tag: "SCORE", color: "var(--egypt-gold-1)", text: () => "────────────────────────────────────────" },
  { tag: "SCORE", color: "var(--egypt-gold-1)", text: () => `RISK SCORE: ${demoReport.score}/10  GRADE: ${demoReport.grade}  CRITICAL: 0  HIGH: 0  MEDIUM: 2  LOW: 5` },
  { tag: "DONE",  color: "var(--crt-green-1)", text: () => "Report saved → ./reports/example.com-2026-01-01.html" },
];

const PROFILES: { value: ScanProfile; label: string; desc: string; depth: string; modules: string }[] = [
  { value: "surface", label: "SAFE",     desc: "Passive baseline",  depth: "LOW",    modules: "Recon · TLS · Headers · Cookies · Endpoints" },
  { value: "standard", label: "STANDARD", desc: "Recommended",      depth: "MEDIUM", modules: "Safe modules + Subdomains · Secrets · CORS · Nuclei" },
  { value: "deep",     label: "DEEP",     desc: "Full analysis",    depth: "HIGH",   modules: "Standard + PortScan · Dirs · Methods · DNS brute-force" },
];

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#FF4444", high: "#FF8C00", medium: "#FFD700", low: "#87CEEB", info: "#6a6a6a",
};

function useCopyUrl(url: string) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [url]);
  return { copied, copy };
}

export function ScanPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [url, setUrl] = useState(params.get("url") ?? "");
  const [profile, setProfile] = useState<ScanProfile>("standard");
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [logLines, setLogLines] = useState<{ tag: string; color: string; text: string; ts: string }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const started = useRef(0);
  const { copied, copy } = useCopyUrl(url);

  const progress = running
    ? Math.min(97, Math.round(((step + 1) / scanProgressSteps.length) * 100))
    : done ? 100 : 0;

  // Timer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - started.current) / 1000)), 250);
    return () => clearInterval(id);
  }, [running]);

  // Step ticker
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setStep(s => {
        const next = Math.min(s + 1, scanProgressSteps.length - 1);
        if (next === scanProgressSteps.length - 1) {
          clearInterval(id);
          setTimeout(() => { setRunning(false); setDone(true); }, 800);
        }
        return next;
      });
    }, 520);
    return () => clearInterval(id);
  }, [running]);

  // Log feed
  useEffect(() => {
    if (!running) return;
    setLogLines([]);
    const host = url.replace(/^https?:\/\//, "").split("/")[0] || "target";
    const timers: ReturnType<typeof setTimeout>[] = [];
    LOG_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        const now = new Date();
        const ts = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
        setLogLines(prev => [...prev, { tag: line.tag, color: line.color, text: line.text(host), ts }]);
      }, i * 380));
    });
    return () => timers.forEach(clearTimeout);
  }, [running, url]);

  // Auto-scroll log
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logLines]);

  const start = () => {
    if (!url.trim() || running) return;
    started.current = Date.now();
    setElapsed(0);
    setStep(0);
    setDone(false);
    setRunning(true);
  };

  const selectedProfile = PROFILES.find(p => p.value === profile)!;

  return (
    <div className="scan-shell">

      {/* ── PAGE HEADER ── */}
      <div className="scan-page-header">
        <div className="scan-page-header-inner">
          <div className="anpu-eyebrow" style={{ marginBottom: "0.5rem" }}>
            𓁹 ANPU / EXECUTION CONSOLE
          </div>
          <h1 className="scan-h1">
            Initialize scanner.<span className="anpu-cursor-blink" style={{ fontSize: "0.5em", marginLeft: "0.25em" }}>█</span>
          </h1>
          <p className="scan-subtitle">
            Configure target and profile. Watch ANPU analyze the attack surface in real time.
          </p>
        </div>
        <div className="scan-status-chip" data-running={running} data-done={done}>
          <span className="anpu-live-dot" style={{ background: running ? "var(--egypt-gold-1)" : done ? "var(--crt-green-1)" : "#444" }} />
          <span>{running ? "SCANNING" : done ? "COMPLETE" : "STANDBY"}</span>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="scan-main-grid">

        {/* ── LEFT: CONFIG PANEL ── */}
        <div className="scan-config-panel">

          {/* Target input */}
          <div className="scan-field-group">
            <label className="scan-field-label" htmlFor="scan-url">
              <Target size={12} /> TARGET URL
            </label>
            <div className="scan-input-wrap">
              <span className="scan-input-prefix">https://</span>
              <input
                id="scan-url"
                className="scan-input"
                value={url.replace(/^https?:\/\//, "")}
                onChange={e => setUrl("https://" + e.target.value)}
                disabled={running}
                placeholder="example.com"
                spellCheck={false}
                autoComplete="off"
              />
              {url && (
                <button className="scan-input-copy" onClick={copy} title="Copy URL">
                  {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
                </button>
              )}
            </div>
            <div className="scan-field-hint">Only scan systems you own or are authorized to test.</div>
          </div>

          {/* Profile selector */}
          <div className="scan-field-group">
            <div className="scan-field-label"><Shield size={12} /> SCAN PROFILE</div>
            <div className="scan-profiles">
              {PROFILES.map(p => (
                <button
                  key={p.value}
                  type="button"
                  className={`scan-profile-btn ${profile === p.value ? "is-active" : ""}`}
                  onClick={() => setProfile(p.value)}
                  disabled={running}
                >
                  <div className="scan-profile-label">{p.label}</div>
                  <div className="scan-profile-desc">{p.desc}</div>
                  <div className="scan-profile-depth" data-depth={p.depth}>{p.depth}</div>
                </button>
              ))}
            </div>
            <div className="scan-profile-modules">
              <span className="scan-modules-label">MODULES //</span>
              <span className="scan-modules-list">{selectedProfile.modules}</span>
            </div>
          </div>

          {/* Execute button */}
          <button
            type="button"
            className="scan-execute-btn"
            onClick={start}
            disabled={!url.trim() || running}
          >
            {running ? (
              <><span className="scan-spinner" /> ANALYZING…</>
            ) : (
              <><Zap size={14} /> EXECUTE SCAN <ArrowRight size={14} /></>
            )}
          </button>

          {/* Quick stats while idle / done */}
          {!running && (
            <div className="scan-idle-stats">
              {[
                { label: "PROFILE", val: selectedProfile.label },
                { label: "DEPTH", val: selectedProfile.depth },
                { label: "ELAPSED", val: elapsed > 0 ? `${elapsed}s` : "—" },
                { label: "STATUS", val: done ? "COMPLETE" : "STANDBY" },
              ].map(({ label, val }) => (
                <div key={label} className="scan-idle-stat">
                  <div className="scan-idle-stat-label">{label}</div>
                  <div className="scan-idle-stat-val">{val}</div>
                </div>
              ))}
            </div>
          )}

          {/* Log feed */}
          <div className="scan-log-panel">
            <div className="scan-log-header">
              <span>ANPU://ENGINE/STDOUT</span>
              <span className="scan-log-status">
                {running ? "STREAMING" : done ? "COMPLETE" : "STANDBY"}
              </span>
            </div>
            <div className="scan-log-body" ref={logRef}>
              {logLines.length === 0 && !running && (
                <div className="scan-log-idle">
                  <span style={{ color: "#333" }}>[{new Date().toLocaleTimeString("en-GB", { hour12: false })}]</span>
                  <span style={{ color: "#3a5a3a" }}> STANDBY — AWAITING RUN COMMAND...</span>
                  <span className="anpu-cursor-blink" style={{ color: "#2a4a2a" }}>█</span>
                </div>
              )}
              {logLines.map((line, i) => (
                <div key={i} className="scan-log-line">
                  <span className="scan-log-ts">[{line.ts}]</span>
                  <span className="scan-log-tag" style={{ color: line.color }}>[{line.tag}]</span>
                  <span className="scan-log-text" style={{ color: line.color === "var(--crt-green-1)" ? "var(--crt-green-2)" : line.color === "#87CEEB" ? "#94a3b8" : line.color }}>{line.text}</span>
                </div>
              ))}
              {running && logLines.length > 0 && (
                <div className="scan-log-line">
                  <span className="scan-log-ts">[{new Date().toLocaleTimeString("en-GB", { hour12: false })}]</span>
                  <span style={{ color: "#2a5a2a" }}><span className="anpu-cursor-blink">█</span></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: TELEMETRY PANEL ── */}
        <div className="scan-telemetry-panel">

          {/* Radar + node display */}
          <div className="scan-node-display">
            <div className="scan-node-header">
              <div>
                <div className="anpu-eyebrow" style={{ fontSize: "0.58rem" }}>GUARDIAN TELEMETRY</div>
                <div className="scan-node-title">𓁹 ANPU // NODE 01</div>
              </div>
              <div className="scan-node-link">CRT LINK / {running ? <span style={{ color: "var(--egypt-gold-1)" }}>ACTIVE</span> : done ? <span style={{ color: "var(--crt-green-1)" }}>DONE</span> : "IDLE"}</div>
            </div>

            <div className="scan-radar-wrap">
              <TerminalRadar active={running} />
              {/* Corner brackets */}
              <div className="scan-radar-corner tl" /><div className="scan-radar-corner tr" />
              <div className="scan-radar-corner bl" /><div className="scan-radar-corner br" />
              {/* Overlay label */}
              <div className="scan-radar-overlay-label">
                <span>{progress.toString().padStart(3, "0")}% COMPLETE</span>
                <span>PUBLIC SURFACE</span>
              </div>
            </div>

            {/* Live metric chips */}
            <div className="scan-live-chips">
              {[
                { label: "ENDPOINTS", val: running ? Math.round(progress * 1.68) : done ? 168 : 0 },
                { label: "REQ/s", val: running ? 18 : 0 },
                { label: "ELAPSED", val: `${elapsed}s` },
                { label: "PROGRESS", val: `${progress}%` },
              ].map(({ label, val }) => (
                <div key={label} className="scan-chip">
                  <div className="scan-chip-label">{label}</div>
                  <div className="scan-chip-val">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress steps */}
          <div className="scan-steps-panel">
            <div className="scan-steps-header">// PIPELINE STAGES</div>
            <div className="scan-steps-list">
              {scanProgressSteps.map((item, i) => {
                const isComplete = i < step || (!running && done);
                const isCurrent = running && i === step;
                return (
                  <div key={item} className={`scan-step ${isComplete ? "is-done" : isCurrent ? "is-current" : ""}`}>
                    <span className="scan-step-icon">
                      {isComplete ? "✓" : isCurrent ? "›" : "·"}
                    </span>
                    <span className="scan-step-label">{item}</span>
                    {isCurrent && <span className="scan-step-spinner" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results panel — shown when done */}
          {done && (
            <div className="scan-results-panel">
              <div className="scan-results-header">
                <div className="anpu-eyebrow" style={{ fontSize: "0.58rem" }}>// SCAN COMPLETE</div>
                <div className="scan-results-score">
                  <span className="scan-score-num">{demoReport.score}</span>
                  <span className="scan-score-denom">/10</span>
                  <span className="scan-score-grade">{demoReport.grade}</span>
                </div>
              </div>
              <div className="scan-finding-counts">
                {(["critical","high","medium","low","info"] as const).map(sev => (
                  <div key={sev} className="scan-finding-chip">
                    <div className="scan-finding-count" style={{ color: SEVERITY_COLORS[sev] }}>
                      {demoReport.findingCounts[sev]}
                    </div>
                    <div className="scan-finding-label">{sev.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="scan-report-btn"
                onClick={() => navigate("/reports/demo-scan-001")}
              >
                VIEW FULL REPORT <ArrowRight size={13} />
              </button>
            </div>
          )}

          {/* Module grid — shown when idle */}
          {!running && !done && (
            <div className="scan-module-grid">
              {[
                { icon: "𓁹", label: "RECON", active: true },
                { icon: "𓋹", label: "TLS", active: true },
                { icon: "𓂀", label: "HEADERS", active: true },
                { icon: "𓃒", label: "COOKIES", active: true },
                { icon: "𓁹", label: "ENDPOINTS", active: true },
                { icon: "𓋹", label: "NUCLEI", active: profile !== "surface" },
              ].map(({ icon, label, active }) => (
                <div key={label} className={`scan-module-chip ${active ? "is-active" : ""}`}>
                  <span className="scan-module-icon">{icon}</span>
                  <span className="scan-module-label">{label}</span>
                  <span className="scan-module-dot" style={{ background: active ? "var(--crt-green-1)" : "#333" }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScanPage;
