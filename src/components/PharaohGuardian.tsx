import { cn } from "@/lib/utils";

interface PharaohGuardianProps {
  className?: string;
  size?: number;
  state?: "dormant" | "active" | "scanning" | "analyzing" | "alert" | "stable" | "awake";
  pulse?: boolean;
}

const ANUBIS_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Anubis_standing.svg/640px-Anubis_standing.svg.png";

export function PharaohGuardian({ className, size = 200, state = "dormant", pulse = false }: PharaohGuardianProps) {
  const active = state === "scanning" || state === "analyzing";
  const accent = state === "alert" ? "#ff6058" : active ? "#ffb23e" : state === "dormant" ? "#526153" : "#69e85f";
  const label = state === "scanning" ? "SCANNING" : state === "analyzing" ? "ANALYZING" : state === "alert" ? "ALERT" : state === "awake" ? "AWAKE" : state === "stable" ? "STABLE" : "DORMANT";

  return (
    <div className={cn("anpu-guardian-archival", className, pulse && "is-pulsing")} style={{ width: size, minHeight: size * 1.28 }} aria-label={`ANPU guardian ${label.toLowerCase()}`}>
      <div className="anpu-guardian-frame">
        <div className="anpu-guardian-lines" style={{ borderColor: `${accent}55` }} />
        <img src={ANUBIS_URL} alt="Ancient Egyptian Anubis figure" className="anpu-guardian-photo" loading="eager" decoding="async" />
        <div className="anpu-guardian-crosshair" style={{ color: accent }} />
        {active && <div className="anpu-guardian-scanline" style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />}
      </div>
      <div className="anpu-guardian-status" style={{ color: accent }}><span /> {label}</div>
    </div>
  );
}

export default PharaohGuardian;
