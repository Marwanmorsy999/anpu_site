import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GitBranch, Menu, X, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "SCAN", href: "/scan" },
  { label: "INTEL", href: "/dashboard" },
  { label: "REPORTS", href: "/reports" },
  { label: "DOCS", href: "/docs" },
  { label: "API", href: "/api" },
  { label: "ABOUT", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl header">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center bg-primary/10 ring-1 ring-primary/25 text-primary transition-all group-hover:ring-primary/50">
              <PharaohGuardian size={24} state="dormant" />
            </div>
            <span className="text-lg font-bold tracking-[0.2em] text-foreground">
              ANPU
            </span>
            <span className="hidden sm:inline text-xs text-secondary tracking-wider">
              WEB SECURITY INTELLIGENCE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground border border-primary/30" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent hover:border-primary/30"
                  )}
                  style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace", letterSpacing: '0.05em' }}
                >
                  {isActive ? `> ${link.label}` : link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-primary">SYS: ONLINE</span>
              <span className="text-secondary">CORE: ACTIVE</span>
              <span className="text-gold">GUARDIAN: AWAKE</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-1.5">
                <GitBranch className="h-4 w-4" />
                GITHUB
                <ExternalLink className="h-3 w-3 opacity-40" />
              </a>
            </Button>
            <Button size="sm" asChild className="gap-1.5">
              <Link to="/scan">
                <Zap className="h-3.5 w-3.5" />
                SCAN
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2 text-xs font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                  style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace", letterSpacing: '0.05em' }}
                >
                  {isActive ? `> ${link.label}` : link.label}
                </Link>
              );
            })}
            <div className="mt-2 pt-2 border-t border-border/60 flex flex-col gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-1.5">
                  <GitBranch className="h-4 w-4" />
                  VIEW ON GITHUB
                </a>
              </Button>
              <Button size="sm" asChild className="gap-1.5">
                <Link to="/scan" onClick={() => setMobileOpen(false)}>
                  <Zap className="h-3.5 w-3.5" />
                  SCAN
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
