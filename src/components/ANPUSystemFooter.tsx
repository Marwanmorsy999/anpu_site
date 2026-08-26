import { Link, useLocation } from "react-router-dom";
import { PharaohGuardian } from "./PharaohGuardian";

export function ANPUSystemFooter() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine current module name
  const getCurrentModule = () => {
    if (currentPath === "/") return "> HOME";
    if (currentPath.startsWith("/scan")) return "> SCAN TERMINAL";
    if (currentPath.startsWith("/dashboard")) return "> COMMAND CENTER";
    if (currentPath.startsWith("/reports")) return "> REPORT ARCHIVE";
    if (currentPath.startsWith("/badge")) return "> SECURITY BADGE";
    if (currentPath.startsWith("/docs")) return "> DOCUMENTATION";
    if (currentPath.startsWith("/api")) return "> API INTERFACE";
    if (currentPath.startsWith("/about")) return "> ARCHIVE";
    if (currentPath.startsWith("/github")) return "> SOURCE ARCHIVE";
    return "> HOME";
  };

  return (
    <footer className="w-full border-t border-border/50 bg-background mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* System footer header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PharaohGuardian size={32} state="awake" />
          </div>
          <p className="text-sm font-bold text-foreground tracking-tight">
            ANPU SECURITY INTELLIGENCE SYSTEM
          </p>
          <div className="w-full h-px bg-border/50 my-4" />
        </div>

        {/* System status */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-6 text-xs">
          <div className="text-center">
            <p className="text-muted-foreground uppercase tracking-wide">CORE</p>
            <p className="text-[#7CFF4F] font-semibold">ONLINE</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground uppercase tracking-wide">GUARDIAN</p>
            <p className="text-[#FFB000] font-semibold">AWAKE</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground uppercase tracking-wide">ENGINE</p>
            <p className="text-[#7CFF4F] font-semibold">READY</p>
          </div>
        </div>

        {/* Current module */}
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            CURRENT MODULE
          </p>
          <p className="text-sm text-primary font-mono">{getCurrentModule()}</p>
        </div>

        {/* Version and copyright */}
        <div className="text-center text-xs text-muted-foreground/70 border-t border-border/30 pt-4">
          <p className="mb-1">VERSION: V1.0</p>
          <p className="mb-2">© ANPU // GUARD WHAT YOU BUILD</p>
          <p>
            <Link to="/about" className="hover:text-primary transition-colors">
              ABOUT
            </Link>
            <span className="mx-2">·</span>
            <a 
              href="https://github.com/Marwanmorsy999/anpu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              SOURCE
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default ANPUSystemFooter;
