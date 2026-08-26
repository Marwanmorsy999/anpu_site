import { Link } from "react-router-dom";
import { GitBranch, ExternalLink } from "lucide-react";
import { AnpuMark } from "@/components/AnpuMark";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/25 text-primary">
                <AnpuMark className="h-4.5 w-4.5" />
              </div>
              <span className="text-base font-bold tracking-[0.18em] text-foreground">ANPU</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Guard what you build.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <GitBranch className="h-3.5 w-3.5" />
              Open Source
              <ExternalLink className="h-3 w-3 opacity-40" />
            </a>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Product</h4>
            <ul className="space-y-2">
              {[
                { label: "Scanner", href: "/scan" },
                { label: "Reports", href: "/reports" },
                { label: "Dashboard", href: "/dashboard" },
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

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Developers</h4>
            <ul className="space-y-2">
              {[
                { label: "Documentation", href: "/docs" },
                { label: "GitHub", href: "/github" },
                { label: "Badge", href: "/badge" },
                { label: "About", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Security</h4>
            <ul className="space-y-2">
              {[
                { label: "Responsible Scanning", href: "/about" },
                { label: "Privacy", href: "/about" },
                { label: "Terms", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ANPU. Open-source web security intelligence.
          </p>
          <p className="text-xs text-muted-foreground">
            Only scan systems you own or have explicit permission to test.
          </p>
        </div>
      </div>
    </footer>
  );
}
