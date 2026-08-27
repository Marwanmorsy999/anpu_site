import { useMemo, useState } from "react";
import { ArrowRight, FileText, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockScanHistory } from "@/lib/mockData";

const times: Record<string, string> = { "scan-001": "2 hours ago", "scan-002": "1 day ago", "scan-003": "2 days ago", "scan-004": "4 days ago" };

export function ReportsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const reports = useMemo(() => mockScanHistory.filter((r) => r.target.toLowerCase().includes(query.toLowerCase())), [query]);
  const avg = mockScanHistory.reduce((s, r) => s + r.score, 0) / mockScanHistory.length;
  const best = [...mockScanHistory].sort((a, b) => b.score - a.score)[0]?.grade ?? "—";

  return (
    <div className="anpu-v6-shell">
      <header className="anpu-v6-page-head"><div><div className="anpu-v6-kicker">ANPU / REPORT ARCHIVE</div><h1 className="anpu-v6-title">Evidence, not just scores.</h1><p className="anpu-v6-subtitle">Browse the report archive and jump directly into the findings behind each security posture.</p></div><div className="anpu-v6-page-actions"><button className="anpu-v6-btn-primary px-4 py-2" onClick={() => navigate("/scan")}><Plus className="mr-2 inline h-4 w-4" /> NEW SCAN</button></div></header>
      <div className="v6-report-grid mb-4">{[
        ["TOTAL REPORTS", mockScanHistory.length, "Archive size"],
        ["AVERAGE SCORE", avg.toFixed(1), "/ 10 posture"],
        ["BEST GRADE", best, "Current high"],
        ["DEMO REPORTS", mockScanHistory.length, "Visualization data"],
      ].map(([label, value, note]) => <div className="v6-metric" key={label as string}><div className="v6-metric-top"><span>{label}</span><FileText className="h-4 w-4 text-slate-500" /></div><div className="v6-metric-value">{value}</div><div className="v6-metric-note">{note}</div></div>)}</div>
      <section className="anpu-v6-panel mt-4 overflow-hidden"><div className="flex items-center gap-3 border-b border-white/10 p-4"><Search className="h-4 w-4 text-slate-500" /><input className="v6-input h-10 border-0 bg-transparent p-0 shadow-none" placeholder="Search reports by domain..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><div>{reports.map((report) => <div className="v6-report-row" key={report.id}><div className="v6-report-domain"><span className="v6-favicon">{report.target.replace(/^www\./, "").slice(0, 2).toUpperCase()}</span><div className="min-w-0"><b>{report.target}</b><small>{report.url}</small></div></div><span className="v6-status"><span className="v6-status-dot" /> Completed</span><div className="text-right"><span className="v6-score-chip">{report.score} / 10</span><div className="mt-1 text-[9px] font-mono text-slate-500">{times[report.id] ?? "recent"}</div></div><div className={`v6-grade-chip ${report.grade === "F" ? "danger" : ""}`}>{report.grade}</div><button className="v6-action-icon" onClick={() => navigate(`/reports/${report.id}`)} aria-label="View report"><ArrowRight className="h-4 w-4" /></button></div>)}{reports.length === 0 && <div className="p-12 text-center text-sm text-slate-500">No matching reports.</div>}</div></section>
    </div>
  );
}

export default ReportsPage;
