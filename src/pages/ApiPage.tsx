import { useState } from "react";
import { AlertTriangle, Copy, Check } from "lucide-react";

const endpoints = [
  { method: "POST", path: "/scan", desc: "Initiate a security scan.", response: `HTTP/1.1 202 Accepted\n{\n  "id": "scan-xxxxxxxx",\n  "status": "queued",\n  "profile": "standard"\n}` },
  { method: "GET", path: "/scan/:id", desc: "Retrieve a completed scan result.", response: `HTTP/1.1 200 OK\n{\n  "status": "completed",\n  "score": 8.7,\n  "grade": "A"\n}` },
  { method: "GET", path: "/scan/:id/status", desc: "Get lightweight progress telemetry.", response: `HTTP/1.1 200 OK\n{\n  "status": "running",\n  "progress": 65\n}` },
  { method: "GET", path: "/scans", desc: "List available scans.", response: `HTTP/1.1 200 OK\n{\n  "total": 42,\n  "scans": []\n}` },
  { method: "DELETE", path: "/scan/:id", desc: "Delete a scan report.", response: `HTTP/1.1 204 No Content` },
];
const curl = `curl -X POST https://anpu.example/api/v1/scan \\\n  -H "Content-Type: application/json" \\\n  -d '{"url":"https://example.com","profile":"standard"}'`;

export function ApiPage() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(curl); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  return (
    <div className="anpu-v6-shell">
      <header className="anpu-v6-page-head"><div><div className="anpu-v6-kicker">ANPU / API REFERENCE</div><h1 className="anpu-v6-title">Build on the intelligence layer.</h1><p className="anpu-v6-subtitle">The planned REST interface for programmatic scan creation, status, reports and automation.</p></div><span className="v6-status warn"><span className="v6-status-dot" /> Planned API</span></header>
      <div className="v6-docs-layout"><aside className="v6-toc"><a className="active" href="#overview">01 / Overview</a><a href="#quickstart">02 / Quick start</a><a href="#endpoints">03 / Endpoints</a><a href="#codes">04 / Status codes</a></aside><main>
        <section id="overview" className="v6-doc-section anpu-v6-panel"><div className="v6-alert"><AlertTriangle className="mt-0.5 h-4 w-4" /><p><strong>API not yet available.</strong> This page documents the intended interface. The current product remains CLI-first.</p></div><div className="anpu-v6-kicker">BASE URL</div><pre className="v6-codeblock">https://anpu.example/api/v1</pre><p>No authentication design is currently implemented in the demo layer.</p></section>
        <section id="quickstart" className="v6-doc-section anpu-v6-panel"><div className="anpu-v6-kicker">02 / QUICK START</div><h2 className="mt-2">Start a scan</h2><div className="v6-code"><button className="v6-copy v6-code-tab" onClick={copy}>{copied ? <><Check className="mr-1 inline h-3 w-3" /> COPIED</> : <><Copy className="mr-1 inline h-3 w-3" /> COPY</>}</button>{curl}</div></section>
        <section id="endpoints" className="v6-doc-section anpu-v6-panel"><div className="anpu-v6-kicker">03 / ENDPOINTS</div><h2 className="mt-2">HTTP interface</h2>{endpoints.map((endpoint) => <div className="v6-endpoint" key={`${endpoint.method}-${endpoint.path}`}><div className="v6-endpoint-head"><span className={`v6-http ${endpoint.method.toLowerCase()}`}>{endpoint.method}</span><span className="v6-endpoint-path">{endpoint.path}</span></div><p className="v6-endpoint-desc">{endpoint.desc}</p><pre className="v6-codeblock">{endpoint.response}</pre></div>)}</section>
        <section id="codes" className="v6-doc-section anpu-v6-panel"><div className="anpu-v6-kicker">04 / STATUS</div><h2 className="mt-2">HTTP status codes</h2><div className="grid gap-2 sm:grid-cols-2">{[[200,"OK"],[202,"Accepted / queued"],[204,"No content"],[400,"Invalid parameters"],[404,"Not found"],[429,"Rate limited"],[500,"Server error"]].map(([code,label])=><div className="v6-endpoint" key={code as number}><span className="font-mono text-sm text-emerald-300">{code}</span><span className="ml-3 text-xs text-slate-400">{label as string}</span></div>)}</div></section>
      </main></div>
    </div>
  );
}

export default ApiPage;
