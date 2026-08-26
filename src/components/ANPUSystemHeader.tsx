import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { PharaohGuardian } from "./PharaohGuardian";

type NavItem = {
  path: string;
  label: string;
};

const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/scan", label: "Scanner" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/reports", label: "Reports" },
  { path: "/badge", label: "Badge" },
  { path: "/docs", label: "Docs" },
  { path: "/api", label: "API" },
];

export function ANPUSystemHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="header sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d6ae54]/25 bg-[#d6ae54]/8">
            <PharaohGuardian size={26} state="awake" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-base font-semibold tracking-wide text-[#f2eee2]">ANPU</div>
            <div className="hidden text-[10px] uppercase tracking-[0.16em] text-[#8d8a82] sm:block">Web Security Intelligence</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(item.path)
                  ? "bg-[#d6ae54]/10 text-[#e7c46a]"
                  : "text-[#aaa79f] hover:bg-white/[0.03] hover:text-[#f2eee2]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-[#73d67a]/15 bg-[#73d67a]/5 px-3 py-1.5 text-xs text-[#9e9b93]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#73d67a] shadow-[0_0_10px_rgba(115,214,122,.65)]" />
            System ready
          </div>
          <a
            href="https://github.com/Marwanmorsy999/anpu"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[#d6ae54]/25 bg-[#d6ae54]/10 px-3.5 py-2 text-sm font-medium text-[#e7c46a] hover:bg-[#d6ae54]/15"
          >
            GitHub
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg border border-[#d6ae54]/20 p-2 text-[#d6ae54] md:block lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#d6ae54]/10 bg-[#080807]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`rounded-lg border px-3 py-2.5 text-sm ${
                  isActive(item.path)
                    ? "border-[#d6ae54]/30 bg-[#d6ae54]/10 text-[#e7c46a]"
                    : "border-white/5 text-[#aaa79f]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/Marwanmorsy999/anpu"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#d6ae54]/20 bg-[#d6ae54]/8 px-3 py-2.5 text-sm text-[#e7c46a]"
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default ANPUSystemHeader;
