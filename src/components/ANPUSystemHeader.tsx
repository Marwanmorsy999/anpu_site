import { Menu, X, ChevronDown, GitBranch, ScanLine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

type NavItem = { path: string; label: string };
const primaryNav: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/scan", label: "Scanner" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/reports", label: "Reports" },
  { path: "/badge", label: "Badge" },
];
const moreNav: NavItem[] = [
  { path: "/docs", label: "Documentation" },
  { path: "/api", label: "API" },
  { path: "/about", label: "About ANPU" },
  { path: "/github", label: "Source Archive" },
];

export function ANPUSystemHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const isActive = (path: string) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
  const moreActive = moreNav.some((item) => isActive(item.path));

  return (
    <header className="header anpu-header">
      <div className="anpu-nav-shell">
        <Link to="/" className="anpu-brand" onClick={() => { setOpen(false); setMoreOpen(false); }}>
          <span className="anpu-brand-mark anpu-brand-mark--img">
            <img src="/anubis-logo.jpg" alt="ANPU" className="anpu-brand-logo-img" />
          </span>
          <span><strong>ANPU</strong><small>Web Security Intelligence</small></span>
        </Link>

        <nav className="anpu-desktop-nav" aria-label="Primary navigation">
          {primaryNav.map((item) => <Link key={item.path} to={item.path} className={isActive(item.path) ? "is-active" : ""}>{item.label}</Link>)}
          <div className="anpu-more-wrap">
            <button type="button" className={moreActive ? "is-active" : ""} onClick={() => setMoreOpen((value) => !value)} aria-expanded={moreOpen}>More <ChevronDown className={moreOpen ? "rotate" : ""} /></button>
            {moreOpen && (
              <div className="anpu-more-menu">
                {moreNav.map((item) => <Link key={item.path} to={item.path} onClick={() => setMoreOpen(false)} className={isActive(item.path) ? "is-active" : ""}>{item.label}</Link>)}
              </div>
            )}
          </div>
        </nav>

        <div className="anpu-nav-actions">
          <span className="anpu-ready"><i /> System ready</span>
          <a className="anpu-github-link" href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer"><GitBranch /> GitHub</a>
          <Link className="anpu-nav-cta" to="/scan"><ScanLine /> Scan a website</Link>
        </div>

        <button type="button" className="anpu-mobile-menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      </div>

      {open && (
        <div className="anpu-mobile-panel">
          <nav aria-label="Mobile navigation">
            {[...primaryNav, ...moreNav].map((item) => <Link key={item.path} to={item.path} onClick={() => setOpen(false)} className={isActive(item.path) ? "is-active" : ""}>{item.label}</Link>)}
            <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><GitBranch /> GitHub</a>
          </nav>
          <Link to="/scan" className="anpu-nav-cta anpu-mobile-cta" onClick={() => setOpen(false)}><ScanLine /> Scan a website</Link>
        </div>
      )}
    </header>
  );
}

export default ANPUSystemHeader;
