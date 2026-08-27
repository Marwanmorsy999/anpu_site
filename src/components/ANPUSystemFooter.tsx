import { GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  { title: "Product", links: [["Scanner", "/scan"], ["Dashboard", "/dashboard"], ["Reports", "/reports"], ["Badge", "/badge"]] },
  { title: "Docs", links: [["Documentation", "/docs"], ["API Reference", "/api"], ["About ANPU", "/about"]] },
  { title: "Resources", links: [["Source Archive", "/github"], ["GitHub", "https://github.com/Marwanmorsy999/anpu"], ["ANPU CLI", "https://github.com/Marwanmorsy999/anpu"]] },
  { title: "Status", links: [["System status", "/dashboard"], ["Demo mode", "/scan"], ["Open source", "/github"]] },
];

export function ANPUSystemFooter() {
  return (
    <footer className="footer">
      <div className="anpu-v6-footer">
        <div className="anpu-v6-footer-grid">
          <div><div className="anpu-v6-footer-brand"><img src="/anpu-icon.svg" alt="ANPU" /><div><strong className="block font-mono text-sm tracking-[.18em] text-white">ANPU</strong><span className="font-mono text-[8px] uppercase tracking-[.13em] text-slate-600">Web Security Intelligence</span></div></div><p className="anpu-v6-footer-note">Open-source security tooling built around a Go scanning engine and an evidence-first reporting workflow.</p></div>
          {columns.map((column) => <div key={column.title}><h3>{column.title}</h3><div className="grid gap-1">{column.links.map(([label, href]) => href.startsWith("http") ? <a key={label} href={href} target="_blank" rel="noreferrer"><GitBranch className="mr-1 inline h-3 w-3" />{label}</a> : <Link key={label} to={href}>{label}</Link>)}</div></div>)}
        </div>
        <div className="anpu-v6-footer-bottom"><span>© ANPU · Guard what you build.</span><span>AUTHORIZED TESTING ONLY · CLI-FIRST · OPEN SOURCE</span></div>
      </div>
    </footer>
  );
}

export default ANPUSystemFooter;
