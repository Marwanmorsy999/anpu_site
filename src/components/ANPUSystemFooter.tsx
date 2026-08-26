import { Github } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PharaohGuardian } from "./PharaohGuardian";

export function ANPUSystemFooter() {
  const location = useLocation();
  const currentPath = location.pathname;

  const moduleName =
    currentPath === "/" ? "Home" :
    currentPath.startsWith("/scan") ? "Scanner" :
    currentPath.startsWith("/dashboard") ? "Dashboard" :
    currentPath.startsWith("/reports") ? "Reports" :
    currentPath.startsWith("/badge") ? "Badge" :
    currentPath.startsWith("/docs") ? "Docs" :
    currentPath.startsWith("/api") ? "API" :
    currentPath.startsWith("/about") ? "About" :
    currentPath.startsWith("/github") ? "Source" : "Home";

  return (
    <footer className="footer mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6ae54]/20 bg-[#d6ae54]/5">
                <PharaohGuardian size={28} state="awake" />
              </div>
              <div>
                <p className="text-base font-semibold tracking-wide text-[#f2eee2]">ANPU</p>
                <p className="text-xs text-[#77736b]">Web Security Intelligence</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#858178]">
              Open-source web security tooling built around a Go scanning engine and a clear reporting workflow.
            </p>
          </div>

          <div>
            <p className="anpu-kicker">Explore</p>
            <div className="mt-3 grid gap-2 text-sm text-[#a8a39a]">
              <Link to="/scan">Scanner</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/reports">Reports</Link>
              <Link to="/docs">Documentation</Link>
            </div>
          </div>

          <div>
            <p className="anpu-kicker">Project</p>
            <div className="mt-3 grid gap-2 text-sm text-[#a8a39a]">
              <Link to="/about">About ANPU</Link>
              <Link to="/github">Source Archive</Link>
              <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"><Github className="h-4 w-4" /> Original ANPU repository</a>
              <span className="text-xs text-[#66625b]">Current module: {moduleName}</span>
            </div>
          </div>
        </div>

        <div className="anpu-rule mt-8" />
        <div className="flex flex-col gap-2 pt-5 text-xs text-[#68645d] sm:flex-row sm:items-center sm:justify-between">
          <span>© ANPU · Guard what you build.</span>
          <span>Open-source security intelligence</span>
        </div>
      </div>
    </footer>
  );
}

export default ANPUSystemFooter;
