import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, Clock3, Gauge, Loader2, Network, ScanLine, Volume2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { scanProgressSteps, demoReport } from "@/lib/mockData";
import type { ScanProfile } from "@/lib/types";
import { HorusEye } from "@/components/HorusEye";
import { TerminalLogFeed } from "@/components/TerminalLogFeed";
import { TerminalRadar } from "@/components/TerminalRadar";
import { TerminalTitle } from "@/components/TerminalTitle";

const profiles: { value: ScanProfile; title: string; desc: string; requests: string }[] = [
  { value: "surface", title: "Surface", desc: "Fast public exposure", requests: "DNS + TLS + headers" },
  { value: "standard", title: "Standard", desc: "Recommended balance", requests: "Core posture + surface" },
  { value: "deep", title: "Deep", desc: "Broad analysis", requests: "Extended signal mapping" },
];

export function ScanPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [url, setUrl] = useState(params.get("url") ?? "");
  const [profile, setProfile] = useState<ScanProfile>("standard");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const started = useRef(0);

  const playClick = () => {
    if (!audioEnabled) return;
    try {
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "square"; oscillator.frequency.value = 620; gain.gain.value = 0.018;
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.025);
    } catch { /* Optional enhancement. */ }
  };

  useEffect(() => {
    if (!running) return;
    started.current = Date.now();
    const clock = window.setInterval(() => setElapsed(Math.floor((Date.now() - started.current) / 1000)), 250);
    const scan = window.setInterval(() => setStep((current) => {
      const next = Math.min(current + 1, scanProgressSteps.length - 1);
      if (next === scanProgressSteps.length - 1) { window.clearInterval(scan); window.setTimeout(() => setRunning(false), 1000); }
      return next;
    }), 900);
    return () => { window.clearInterval(clock); window.clearInterval(scan); };
  }, [running]);

  const start = () => { if (!url.trim() || running) return; playClick(); setElapsed(0); setStep(-1); setRunning(true); };
  const selected = profiles.find((item) => item.value === profile) ?? profiles[1];
  const progress = running ? Math.min(100, Math.max(3, Math.round(((step + 1) / scanProgressSteps.length) * 100))) : step === scanProgressSteps.length - 1 ? 100 : 0;

  return (
    <div className="anpu-v6-shell scan-v7-shell">
      <header className="anpu-v6-page-head">
        <div><div className="anpu-v6-kicker">ANPU / EXECUTION CONSOLE</div><h1 className="anpu-v6-title"><TerminalTitle text="Scan with context." /></h1><p className="anpu-v6-subtitle">Configure the target. Watch the guardian process the public surface in real time.</p></div>
        <div className="v7-header-status"><span className="v7-live-dot" /> {running ? "ENGINE RUNNING" : "SYSTEM READY"} <span className="cursor-blink">█</span></div>
      </header>
      <section className="v6-scan-grid v7-scan-grid">
        <fieldset className="anpu-v6-panel v6-config v7-fieldset">
          <legend>[ TARGET SELECTION ]</legend>
          <div className="v6-alert"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /><p><strong>AUTHORIZATION REQUIRED.</strong> Browser demo only. The Go engine is not dispatched from this interface.</p></div>
          <label className="v6-label" htmlFor="scan-url">Target URL <span className="cursor-blink">_</span></label>
          <div className="v7-input-wrap"><span>&gt;</span><input id="scan-url" className="v6-input" value={url} onChange={(e) => setUrl(e.target.value)} disabled={running} placeholder="https://example.com" /></div>
          <div className="mt-6"><span className="v6-label">Scan profile</span><div className="v6-pills v7-hardware-pills">{profiles.map((item) => <button type="button" key={item.value} className={`v6-pill ${profile === item.value ? "active" : ""}`} onClick={() => { playClick(); setProfile(item.value); }} disabled={running} aria-pressed={profile === item.value}><span className="v7-toggle-lamp" /><b>{item.title}</b><small>{item.desc}</small></button>)}</div></div>
          <div className="v7-parameter-box"><div><span>PROFILE</span><b>{profile.toUpperCase()}</b></div><div><span>REQUEST SET</span><b>{selected.requests}</b></div><div><span>MODE</span><b>SAFE / DEMO</b></div></div>
          <button type="button" className="v7-ascii-button v6-execute" onClick={start} disabled={!url.trim() || running}><span>┌───────────────────────────────┐</span><span>│ [ &gt; ] {running ? "RUNNING DEMO SCAN" : "RUN DEMO SCAN"} <span className="cursor-blink">█</span> │</span><span>└───────────────────────────────┘</span></button>
          <button type="button" className="v7-audio-toggle" onClick={() => setAudioEnabled((value) => !value)}><Volume2 className="h-3 w-3" /> KEY CLICK: {audioEnabled ? "ON" : "OFF"}</button>
        </fieldset>
        <section className="anpu-v6-panel v6-live v7-telemetry-panel">
          <div className="v6-live-head"><div><div className="anpu-v6-kicker">GUARDIAN TELEMETRY</div><h2 className="mt-1 text-xl font-semibold text-white">𓁹 ANUBIS // NODE 01</h2></div><div className="font-mono text-xs text-slate-500">CRT LINK / ACTIVE</div></div>
          <div className="v7-tomb-window"><div className="v7-guardian-screen"><TerminalRadar active={running || !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches} /><HorusEye className="v7-guardian-eye" /><div className="v7-radar-label top">ANPU // RADAR <span>{progress.toString().padStart(3, "0")}%</span></div><div className="v7-radar-label bottom">NODE 01 · PUBLIC SURFACE · NOMINAL</div><div className="v7-sweep" /><pre className="v7-ascii-anubis" aria-hidden="true">{`      /\\\\
  ___/  \\\\___
 /    𓁹    \\
|   ANUBIS-01  |
|   𓋹 GUARDIAN  |
 \\____    ____/
      \\//`}</pre></div><TerminalLogFeed running={running} target={url} /></div>
          <div className="v6-telemetry"><div><small>ENDPOINTS</small><b>{running ? Math.round(progress * 1.7) : progress === 100 ? 168 : 0}</b></div><div><small>REQUEST RATE</small><b>{running ? 18 : 0}<span className="ml-1 text-xs text-slate-500">/s</span></b></div><div><small>ELAPSED</small><b>{elapsed}s</b></div></div>
          {progress === 100 && !running && <button type="button" className="v7-complete-button" onClick={() => navigate("/reports/demo-scan-001")}><Check className="mr-2 inline h-4 w-4" /> VIEW DEMO REPORT / SCORE {demoReport.score}</button>}
          <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-500"><div className="border border-white/5 p-2"><Network className="mb-1 h-3.5 w-3.5 text-emerald-400" />PUBLIC</div><div className="border border-white/5 p-2"><Gauge className="mb-1 h-3.5 w-3.5 text-emerald-400" />SIGNALS</div><div className="border border-white/5 p-2"><Clock3 className="mb-1 h-3.5 w-3.5 text-emerald-400" />REALTIME</div></div>
        </section>
      </section>
    </div>
  );
}
export default ScanPage;
