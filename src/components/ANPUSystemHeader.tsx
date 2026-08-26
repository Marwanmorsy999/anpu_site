import { Link, useLocation } from "react-router-dom";
import { PharaohGuardian } from "./PharaohGuardian";

type NavItem = {
  path: string;
  label: string;
  shortLabel?: string;
};

const navItems: NavItem[] = [
  { path: "/", label: "HOME", shortLabel: "HOME" },
  { path: "/scan", label: "SCAN TERMINAL", shortLabel: "SCAN" },
  { path: "/dashboard", label: "COMMAND CENTER", shortLabel: "INTEL" },
  { path: "/reports", label: "REPORT ARCHIVE", shortLabel: "REPORTS" },
  { path: "/badge", label: "SECURITY BADGE", shortLabel: "BADGE" },
  { path: "/docs", label: "DOCUMENTATION", shortLabel: "DOCS" },
  { path: "/api", label: "API INTERFACE", shortLabel: "API" },
  { path: "/about", label: "ARCHIVE", shortLabel: "ABOUT" },
  { path: "/github", label: "SOURCE ARCHIVE", shortLabel: "GITHUB" },
];

export function ANPUSystemHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine active nav item
  const getActiveLabel = () => {
    const activeItem = navItems.find((item) => 
      currentPath === item.path || 
      (item.path !== "/" && currentPath.startsWith(item.path))
    );
    return activeItem ? activeItem.shortLabel || activeItem.label : "HOME";
  };

  const activeLabel = getActiveLabel();

  return (
    <header className="w-full border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      {/* Main system header */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo and system name */}
        <div className="flex items-center gap-3">
          <div className="text-2xl hieroglyph text-primary">𓂀</div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground tracking-tight">
              ANPU // SECURITY INTELLIGENCE SYSTEM
            </span>
            <span className="text-xs text-muted-foreground tracking-widest">
              V1.0
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || 
              (item.path !== "/" && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all ${
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {isActive ? `> ${item.shortLabel || item.label}` : item.shortLabel || item.label}
              </Link>
            );
          })}
        </nav>

        {/* System status */}
        <div className="hidden lg:flex items-center gap-4 text-xs">
          <span className="text-muted-foreground">
            SYS: <span className="text-[#7CFF4F]">ONLINE</span>
          </span>
          <span className="text-muted-foreground">
            CORE: <span className="text-[#7CFF4F]">ACTIVE</span>
          </span>
          <span className="text-muted-foreground">
            GUARDIAN: <span className="text-[#FFB000]">AWAKE</span>
          </span>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t border-border/50">
        <div className="px-4 py-2 flex flex-wrap gap-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || 
              (item.path !== "/" && currentPath.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md flex-1 text-center ${
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onClick={() => {
                  // Close mobile menu (if implemented)
                }}
              >
                {isActive ? `> ${item.shortLabel || item.label}` : item.shortLabel || item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Active module indicator */}
      <div className="border-t border-border/50 bg-muted/20">
        <div className="px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-2 text-sm">
            <PharaohGuardian size={20} state="awake" />
            <span className="text-muted-foreground">
              CURRENT MODULE: <span className="text-primary">{activeLabel}</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ANPUSystemHeader;
