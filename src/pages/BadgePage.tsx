import { useState } from "react";
import { Check, Copy, ExternalLink, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { demoReport } from "@/lib/mockData";

export function BadgePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"Markdown" | "HTML" | "Dynamic URL">("Markdown");
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("https://example.com");
  const code = tab === "Markdown"
    ? `[![ANPU Security](https://anpu.example/badge.svg?score=${demoReport.score}&grade=${demoReport.grade})](https://anpu.example/report/${demoReport.id})`
    : tab === "HTML"
      ? `<a href="https://anpu.example/report/${demoReport.id}"><img src="https://anpu.example/badge.svg?score=${demoReport.score}&grade=${demoReport.grade}" alt="ANPU Security Score" /></a>`
      : `<a href="${url}"><img src="https://anpu.example/badge.svg?url=${encodeURIComponent(url)}" alt="ANPU Security Badge" /></a>`;

  const copy = async () => { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };

  return (
    <div className="anpu-v6-shell">
      <header className="anpu-v6-page-head"><div><div className="anpu-v6-kicker">ANPU / SECURITY BADGE</div><h1 className="anpu-v6-title">Publish the proof.</h1><p className="anpu-v6-subtitle">Generate a clean ANPU badge for repositories, websites and project documentation.</p></div><button className="anpu-v6-btn-secondary px-4 py-2" onClick={() => navigate("/reports")}>VIEW REPORTS</button></header>
      <section className="anpu-v6-panel p-5 sm:p-6 mb-4"><div className="mb-5 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-400" /><div><h2 className="text-lg font-semibold text-white">Live badge preview</h2><p className="text-xs text-slate-500">Three render treatments using the same score data.</p></div></div><div className="v6-preview-grid">{[
        { name: "LIGHT", className: "light" }, { name: "DARK", className: "dark" }, { name: "MONO", className: "mono" },
      ].map(({ name, className }) => <div key={name} className={`v6-preview ${className}`}><span className="font-mono text-[9px] opacity-60">{name} THEME</span><div className="v6-seal"><span>ANPU</span><span>{demoReport.score} / 10</span><strong>{demoReport.grade}</strong></div><span className="self-center text-[10px] opacity-60">SECURITY VERIFIED</span></div>)}</div></section>
      <section className="anpu-v6-panel p-5 sm:p-6"><div className="mb-4"><div className="anpu-v6-kicker">EXPORT</div><h2 className="mt-1 text-lg font-semibold text-white">Embed your score</h2></div><div className="v6-code-tabs">{(["Markdown", "HTML", "Dynamic URL"] as const).map((item) => <button key={item} className={`v6-code-tab ${tab === item ? "active" : ""}`} onClick={() => setTab(item)}>{item}</button>)}</div>{tab === "Dynamic URL" && <input className="v6-input mb-3" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" /> }<div className="v6-code"><button className="v6-copy v6-code-tab" onClick={copy}>{copied ? <><Check className="mr-1 inline h-3 w-3" /> COPIED</> : <><Copy className="mr-1 inline h-3 w-3" /> COPY</>}</button>{code}</div></section>
      <div className="mt-5 flex flex-wrap gap-2"><button className="anpu-v6-btn-primary px-4 py-2" onClick={() => navigate("/scan")}>RUN A SCAN</button><a className="anpu-v6-btn-secondary px-4 py-2" href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noreferrer"><ExternalLink className="mr-2 inline h-4 w-4" /> GITHUB</a></div>
    </div>
  );
}

export default BadgePage;
