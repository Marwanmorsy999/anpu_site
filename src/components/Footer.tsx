import { Link } from "react-router-dom";
import { GitBranch, ExternalLink } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-surface footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand */}
          <div className="flex flex-col items-start gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center bg-primary/10 ring-1 ring-primary/25 text-primary">
                <PharaohGuardian size={20} state="dormant" />
              </div>
              <span className="text-base font-bold tracking-[0.18em] text-foreground">ANPU</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              GUARD WHAT YOU BUILD.
            </p>
            <a
              href="https://github.com/Marwanmorsy999/anpu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <GitBranch className="h-3.5 w-3.5" />
              OPEN SOURCE
              <ExternalLink className="h-3 w-3 opacity-40" />
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary mb-3">SYSTEM</h4>
            <ul className="space-y-2">
              {[
                { label: "SCAN", href: "/scan" },
                { label: "INTEL", href: "/dashboard" },
                { label: "REPORTS", href: "/reports" },
                { label: "DOCS", href: "/docs" },
                { label: "API", href: "/api" },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary mb-3">EXTERNAL</h4>
            <ul className="space-y-2">
              {[
                { label: "GITHUB", href: "https://github.com/Marwanmorsy999/anpu" },
                { label: "BADGE", href: "/badge" },
                { label: "ABOUT", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href.startsWith('http') ? item.href : undefined}
                    target={item.href.startsWith('http') ? "_blank" : undefined}
                    rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {item.label}
                    {item.href.startsWith('http') && <ExternalLink className="h-3 w-3 opacity-50" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} ANPU. OPEN-SOURCE WEB SECURITY INTELLIGENCE SYSTEM.
          </p>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            ONLY SCAN SYSTEMS YOU OWN OR HAVE EXPLICIT PERMISSION TO TEST.
          </p>
        </div>

        {/* Hieroglyphic separator */}
        <div className="mt-4 pt-4 border-t border-border/20">
          <div className="flex items-center justify-center gap-2 text-muted-foreground/50">
            <span className="hieroglyph" style={{ fontSize: '1.2rem' }}>𓂀</span>
            <span className="hieroglyph" style={{ fontSize: '1rem' }}>𓉐</span>
            <span className="hieroglyph" style={{ fontSize: '1.2rem' }}>𓄿</span>
            <span className="hieroglyph" style={{ fontSize: '1rem' }}>𓃀</span>
            <span className="hieroglyph" style={{ fontSize: '1.2rem' }}>𓊪</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
