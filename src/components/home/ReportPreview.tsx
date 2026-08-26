import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText as FileTextIcon, FileJson, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeverityBadge } from "@/components/SeverityBadge";
import { demoReport } from "@/lib/mockData";

export function ReportPreview() {
  const navigate = useNavigate();

  const counts = [
    { label: "Critical", count: 0, color: "text-destructive" },
    { label: "High", count: 0, color: "text-orange-400" },
    { label: "Medium", count: 2, color: "text-yellow-400" },
    { label: "Low", count: 4, color: "text-blue-400" },
    { label: "Info", count: 7, color: "text-muted-foreground" },
  ];

  return (
    <section className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Security Report Preview</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional reports suitable for sending to clients and stakeholders.
          </p>
        </div>
        <Card className="mx-auto max-w-5xl p-6 lg:p-10 bg-card/40">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8 pb-8 border-b border-border/50">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ANPU Security Intelligence Report</p>
              <p className="text-2xl font-bold text-foreground mt-2">{demoReport.target}</p>
              <p className="text-sm text-muted-foreground mt-1">Scan profile: Deep</p>
            </div>
            <div className="flex items-center gap-8 shrink-0">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary tabular-nums">{demoReport.score}</p>
                <p className="text-xs text-muted-foreground mt-0.5">/ 10</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{demoReport.grade}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Grade</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Executive Summary</h3>
            <p className="text-base text-muted-foreground leading-relaxed">{demoReport.executiveSummary}</p>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-8">
            {counts.map((f) => (
              <div key={f.label} className="text-center p-4 rounded-lg bg-muted/30">
                <p className={`text-2xl font-bold tabular-nums ${f.color}`}>{f.count}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{f.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Findings</h3>
            {demoReport.findings.slice(0, 3).map((f) => (
              <div key={f.id} className="p-5 rounded-lg border border-border/50">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <p className="text-base font-semibold text-foreground">{f.title}</p>
                  <SeverityBadge severity={f.severity} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                {f.evidence && (
                  <p className="mt-2 text-xs font-mono text-muted-foreground/70">Evidence: {f.evidence}</p>
                )}
                <p className="mt-2 text-sm text-foreground">
                  <span className="text-muted-foreground">Recommendation: </span>{f.recommendation}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1.5"><FileTextIcon className="h-3.5 w-3.5" /> Export PDF</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><FileJson className="h-3.5 w-3.5" /> Export JSON</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Share2 className="h-3.5 w-3.5" /> Share Report</Button>
            <Button size="sm" className="gap-1.5 ml-auto" onClick={() => navigate("/reports/demo-scan-001")}>
              View Full Report <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
