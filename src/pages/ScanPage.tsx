import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, Clock3, Gauge, Network, Volume2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { scanProgressSteps, demoReport } from "@/lib/mockData";
import type { ScanProfile } from "@/lib/types";
import { HorusEye } from "@/components/HorusEye";
import { TerminalLogFeed } from "@/components/TerminalLogFeed";
import { TerminalRadar } from "@/components/TerminalRadar";

const profiles: { value: ScanProfile; title: string; desc: string }[] = [
  { value: "surface", title: "Surface", desc: "Fast public exposure" },
  { value: "standard", title: "Standard", desc: "Recommended balance" },
  { value: "deep", title: "Deep", desc: "Broad analysis" },
];

export function ScanPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [url, setUrl] = useState(params.get("url") ?? "");
  const [profile, setProfile] = useState<ScanProfile>("standard");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const started = useRef(0);

  useEffect(() => {
    if (!running) return;
    const clock = window.setInterval(() => setElapsed(Math.floor((Date.now() - started.current) / 1000)), 250);
    const scan = window.setInterval(() => setStep((current) => {
      const next = Math.min(current + 1, scanProgressSteps.length - 1);
      if (next === scanProgressSteps.length - 1) {
        window.clearInterval(scan);
        window.setTimeout(() => setRunning(false), 3600);
      }
      return next;
    }), 550);
    return () => { window.clearInterval(clock); window.clearInterval(scan); };
  }, [running]);

  const start = () => {
    if (!url.trim() || running) return;
    started.current = Date.now(); setElapsed(0); setStep(0); setRunning(true);
  };
  const progress = running ? Math.min(100, Math.round(((step + 1) / scanProgressSteps.length) * 100)) : step === scanProgressSteps.length - 1 ? 100 : 0;

  return (
    <div className="anpu-v6-shell">
      <header className="anpu-v6-page-head"><div><div className="anpu-v6-kicker">ANPU / EXECUTION CONSOLE</div><h1 className="anpu-v6-title">Scan with context.</h1><p className="anpu-v6-subtitle">Configure the target on the left. Watch the guardian process the public surface on the right.<span className="cursor-blink ml-1">█</span></p></div><span className={`v6-status ${running ? "warn" : ""}`}><span className="v6-status-dot" /> {running ? "Analyzing" : "Demo ready"}<span className="cursor-blink ml-1">█</span></span></header>
      <section className="v6-scan-grid">
        <fieldset className="anpu-v6-panel v6-config v7-fieldset">
          <legend>[ TARGET SELECTION ]</legend>
          <div className="v6-alert"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /><p><strong>Authorization required.</strong> This browser interface is a demo; it does not dispatch a real scan to the Go engine.</p></div>
          <label className="v6-label" htmlFor="scan-url">Target URL <span className="cursor-blink">█</span></label>
          <input id="scan-url" className="v6-input" value={url} onChange={(e) => setUrl(e.target.value)} disabled={running} placeholder="https://example.com" />
          <div className="mt-6"><span className="v6-label">Scan profile</span><div className="v6-pills">{profiles.map((item) => <button type="button" key={item.value} className={`v6-pill ${profile === item.value ? "active" : ""}`} onClick={() => setProfile(item.value)} disabled={running}><b>{item.title}</b><small>{item.desc}</small></button>)}</div></div>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#14421E] pt-3 font-mono text-[10px] text-slate-500"><div><span>PROFILE</span><b className="mt-1 block text-slate-200">{profile.toUpperCase()}</b></div><div><span>DEPTH</span><b className="mt-1 block text-emerald-400">{profile === "surface" ? "LOW" : profile === "standard" ? "MEDIUM" : "HIGH"}</b></div></div>
          <div className="mt-4 flex items-center justify-between border-t border-[#14421E] pt-3"><button type="button" className="v7-audio-toggle" onClick={() => setSoundOn((value) => !value)}><Volume2 className="mr-2 inline h-3.5 w-3.5" /> KEY CLICK: {soundOn ? "ON" : "OFF"}</button><span className="font-mono text-[9px] text-slate-600">AUTH REQUIRED</span></div>
          <button type="button" className="v6-execute v7-ascii-button mt-6" onClick={start} disabled={!url.trim() || running}><span className="v7-button-line">┌──────────────────────────┐</span><span className="v7-button-line">│ [>] {running ? "RUNNING DEMO SCAN" : "RUN DEMO SCAN"} <span className="cursor-blink">█</span> │</span><span className="v7-button-line">└──────────────────────────┘</span></button>
          {running && <TerminalLogFeed running={running} target={url} />}
        </fieldset>

        <section className="anpu-v6-panel v6-live v7-telemetry-panel">
          <div className="v6-live-head"><div><div className="anpu-v6-kicker">GUARDIAN TELEMETRY</div><h2 className="mt-1 text-xl font-semibold text-white">𓁹 ANUBIS // NODE 01</h2></div><div className="font-mono text-xs text-slate-500">CRT LINK / ACTIVE</div></div>
          <div className="v6-terminal-window v7-tomb-window">
            <div className="v7-guardian-screen"><HorusEye className="v7-guardian-eye" /><TerminalRadar /><pre className="v7-ascii-anubis">{`      /\\\\
  ___/  \\\\___
 /   𓁹   \\
|  ANUBIS-01  |
|  𓋹 GUARDIAN |
 \\___  ____/_/
     \\//`}</pre><div className="v7-sweep" /></div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-600"><span>ANPU//RADAR</span><span className="text-right">{progress.toString().padStart(3, "0")}% COMPLETE</span><span>PUBLIC SURFACE</span><span className="text-right text-emerald-400">NOMINAL</span></div>
            <div className="mt-5 font-mono text-[10px] leading-6 text-slate-500">{scanProgressSteps.map((item, i) => <div key={item} className={i <= step ? "text-slate-200" : ""}><span className={i < step || (!running && progress === 100) ? "text-emerald-400" : i === step ? "text-amber-300" : "text-slate-700"}>{i < step || (!running && progress === 100) ? "✓" : i === step ? "›" : "·"}</span> <span className="ml-2">{item}</span></div>)}</div>
          </div>
          <div className="v6-telemetry"><div><small>ENDPOINTS</small><b>{running ? Math.round(progress * 1.7) : progress === 100 ? 168 : 0}</b></div><div><small>REQUEST RATE</small><b>{running ? 18 : 0}<span className="ml-1 text-xs text-slate-500">/s</span></b></div><div><small>ELAPSED</small><b>{elapsed}s</b></div></div>
          {progress === 100 && !running && <button type="button" className="mt-3 w-full rounded-none border border-emerald-500/30 bg-emerald-500/10 py-3 font-mono text-[10px] font-semibold text-emerald-300" onClick={() => navigate("/reports/demo-scan-001")}><Check className="mr-2 inline h-4 w-4" /> VIEW DEMO REPORT / SCORE {demoReport.score}</button>}
          <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-500"><div className="border border-white/5 p-2"><Network className="mb-1 h-3.5 w-3.5 text-emerald-400" />PUBLIC</div><div className="border border-white/5 p-2"><Gauge className="mb-1 h-3.5 w-3.5 text-emerald-400" />SIGNALS</div><div className="border border-white/5 p-2"><Clock3 className="mb-1 h-3.5 w-3.5 text-emerald-400" />REALTIME</div></div>
        </section>
      </section>
    </div>
  );
}

export default ScanPage;
