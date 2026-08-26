import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/types";

const config: Record<Severity, { label: string; className: string }> = {
  critical: { label: "Critical", className: "bg-destructive/20 text-destructive border-destructive/30" },
  high: { label: "High", className: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  medium: { label: "Medium", className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  low: { label: "Low", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  info: { label: "Info", className: "bg-muted text-muted-foreground border-border" },
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const { label, className } = config[severity];
  return (
    <span className={cn("inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium", className)}>
      {label}
    </span>
  );
}

export function SeverityDot({ severity }: { severity: Severity }) {
  const colors: Record<Severity, string> = {
    critical: "bg-destructive",
    high: "bg-orange-500",
    medium: "bg-yellow-500",
    low: "bg-blue-500",
    info: "bg-muted-foreground",
  };
  return <span className={cn("inline-block h-2 w-2 rounded-full", colors[severity])} />;
}
