import { Shield, Lock, Server, GitBranch, FileText, Cpu, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { demoReport } from "@/lib/mockData";

export function DemoScan() {
  const categories = [
    { name: "HTTPS", status: "PASS", result: "Secure", icon: Lock },
    { name: "HSTS", status: "PASS", result: "Enabled", icon: Shield },
    { name: "CSP", status: "PASS", result: "Present", icon: Shield },
    { name: "Cookies", status: "WARN", result: "Review flags", icon: Server },
    { name: "Permissions-Policy", status: "WARN", result: "Missing", icon: Shield },
    { name: "DNS", status: "PASS", result: "Valid", icon: GitBranch },
    { name: "robots.txt", status: "INFO", result: "Found", icon: FileText },
    { name: "Technology Detection", status: "PASS", result: "6 detected", icon: Cpu },
    { name: "Attack Surface", status: "WARN", result: "Review", icon: AlertTriangle },
  ];

  const counts = [
    { label: "Critical", count: 0, color: "text-destructive" },
    { label: "High", count: 0, color: "text-orange-400" },
    { label: "Medium", count: 2, color: "text-yellow-400" },
    { label: "Low", count: 4, color: "text-blue-400" },
    { label: "Info", count: 7, color: "text-muted-foreground" },
  ];

  const statusColor = (s: string) =>
    s === "PASS" ? "text-green-400" : s === "WARN" ? "text-yellow-400" : "text-blue-400";

  return (
    <section className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Live Security Scan Demo</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            ANPU produces a clear, actionable security intelligence report for every target.
          </p>
        </div>
        <Card className="mx-auto max-w-4xl p-6 lg:p-10 bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ANPU Security Intelligence</p>
              <p className="text-2xl font-bold text-foreground mt-1">{demoReport.target}</p>
            </div>
            <Badge variant="outline" className="text-primary border-primary/30 self-start">Demo Scan</Badge>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-8">
            {counts.map((f) => (
              <div key={f.label} className="text-center p-4 rounded-lg bg-muted/30">
                <p className={`text-3xl font-bold tabular-nums ${f.color}`}>{f.count}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{f.label}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Check</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Result</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <tr key={c.name} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-sm font-bold ${statusColor(c.status)}`}>{c.status}</span>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-muted-foreground">{c.result}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}
