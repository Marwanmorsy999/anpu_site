import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GitBranch, Menu, X, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnpuMark } from "@/components/AnpuMark";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Scanner", href: "/scan" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reports", href: "/reports" },
  { label: "Docs", href: "/docs" },
  { label: "API", href: "/api" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/25 text-primary transition-all group-hover:ring-primary/50">
              <AnpuMark className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-[0.18em] text-foreground">
              ANPU
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="gap-1.5">
                <GitBranch className="h-4 w-4" />
                GitHub
                <ExternalLink className="h-3 w-3 opacity-40" />
              </a>
            </Button>
            <Button size="sm" asChild className="gap-1.5">
              <Link to="/scan">
                <Zap className="h-3.5 w-3.5" />
                Scan a Website
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-border/60 flex flex-col gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="gap-1.5">
                  <GitBranch className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
              <Button size="sm" asChild className="gap-1.5">
                <Link to="/scan" onClick={() => setMobileOpen(false)}>
                  <Zap className="h-3.5 w-3.5" />
                  Scan a Website
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
