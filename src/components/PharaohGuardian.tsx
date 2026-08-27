import { cn } from "@/lib/utils";

interface PharaohGuardianProps {
  className?: string;
  size?: number;
  state?: "dormant" | "active" | "scanning" | "analyzing" | "alert" | "stable" | "awake";
  pulse?: boolean;
}

export function PharaohGuardian({ className, size = 200, state = "dormant", pulse = false }: PharaohGuardianProps) {
  const active = state === "scanning" || state === "analyzing";
  const accent = state === "alert" ? "#ff6058" : active ? "#ffb23e" : state === "dormant" ? "#526153" : "#69e85f";
  const label = state === "scanning" ? "SCANNING" : state === "analyzing" ? "ANALYZING" : state === "alert" ? "ALERT" : state === "awake" ? "AWAKE" : state === "stable" ? "STABLE" : "DORMANT";

  return (
    <div className={cn("anpu-guardian-archival", className, pulse && "is-pulsing")} style={{ width: size, minHeight: size * 1.28 }} aria-label={`ANPU guardian ${label.toLowerCase()}`}>
      <div className="anpu-guardian-frame">
        <div className="anpu-guardian-lines" style={{ borderColor: `${accent}55` }} />
        <svg className="anpu-guardian-inline" viewBox="0 0 200 240" role="img" aria-label="ANPU inline Anubis guardian">
          <g stroke={accent} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 20L65 90L100 70L135 90L160 20L130 100L100 90L70 100L40 20Z" strokeWidth="1.5" />
            <path d="M70 115L85 110L92 118L77 122ZM130 115L115 110L108 118L123 122Z" strokeWidth="1.2" />
            <path d="M100 90V160M100 160L80 175H120L100 160Z" strokeWidth="1.5" />
            <path d="M85 140H115M65 185H135M75 200H125" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M50 170L100 220L150 170" strokeWidth="1.5" />
            <path d="M100 72V215M58 72L100 155L142 72M48 45L100 98L152 45" opacity=".35" />
            <circle cx="100" cy="155" r="28" opacity=".22" />
            <circle cx="100" cy="155" r="46" opacity=".12" />
          </g>
        </svg>
        <div className="anpu-guardian-crosshair" style={{ color: accent }} />
        {active && <div className="anpu-guardian-scanline" style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />}
      </div>
      <div className="anpu-guardian-status" style={{ color: accent }}><span /> {label}</div>
    </div>
  );
}

export default PharaohGuardian;
