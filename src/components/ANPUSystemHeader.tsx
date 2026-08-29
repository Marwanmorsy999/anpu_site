import { Menu, X, GitBranch, ScanLine, LayoutDashboard, FileText, BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const NAV = [
  { path: "/",          label: "Home",      icon: <Home size={13} /> },
  { path: "/scan",      label: "Scanner",   icon: <ScanLine size={13} /> },
  { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={13} /> },
  { path: "/reports",   label: "Reports",   icon: <FileText size={13} /> },
  { path: "/docs",      label: "Docs",      icon: <BookOpen size={13} /> },
];

export function ANPUSystemHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="anpu-header">
      <div className="anpu-nav-shell">

        {/* Brand */}
        <Link to="/" className="anpu-brand" onClick={() => setOpen(false)}>
          <span className="anpu-brand-mark anpu-brand-mark--img">
            <img src="/anubis-logo.jpg" alt="ANPU" className="anpu-brand-logo-img" />
          </span>
          <span className="anpu-brand-text">
            <strong>ANPU</strong>
            <small>Security Intelligence</small>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="anpu-desktop-nav" aria-label="Primary">
          {NAV.map(({ path, label }) => (
            <Link key={path} to={path} className={`anpu-nav-link ${isActive(path) ? "is-active" : ""}`}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="anpu-nav-actions">
          <span className="anpu-ready"><i />ONLINE</span>
          <a
            className="anpu-github-link"
            href="https://github.com/Marwanmorsy999/anpu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitBranch size={12} /> GitHub
          </a>
          <Link className="anpu-nav-cta" to="/scan">
            <ScanLine size={13} /> Scan
          </Link>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="anpu-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="anpu-mobile-panel">
          <nav>
            {NAV.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={`anpu-mobile-link ${isActive(path) ? "is-active" : ""}`}
              >
                {icon} {label}
              </Link>
            ))}
            <a
              href="https://github.com/Marwanmorsy999/anpu"
              target="_blank"
              rel="noopener noreferrer"
              className="anpu-mobile-link"
              onClick={() => setOpen(false)}
            >
              <GitBranch size={13} /> GitHub
            </a>
          </nav>
          <Link to="/scan" className="anpu-mobile-cta" onClick={() => setOpen(false)}>
            <ScanLine size={14} /> Run Scanner
          </Link>
        </div>
      )}
    </header>
  );
}

export default ANPUSystemHeader;
