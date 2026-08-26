import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Shield, Lock, Server, GitBranch, FileText, Cpu, AlertTriangle,
  FileJson, FileText as FileTextIcon, Share2, ArrowLeft, Globe, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { demoReport, mockScanHistory } from "@/lib/mockData";
import { SeverityBadge } from "@/components/SeverityBadge";
import type { Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ReportPage() {
  const { id } = useParams();
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const report = mockScanHistory.find((r) => r.id === id) ?? demoReport;

  const filteredFindings = severityFilter === "all"
    ? report.findings
    : report.findings.filter((f) => f.severity === severityFilter);

  const headerChecks = [
    { name: "HTTPS / TLS", status: "PASS", icon: Lock },
    { name: "Security Headers", status: "WARN", icon: Shield },
    { name: "Cookies", status: "PASS", icon: Server },
    { name: "DNS", status: "PASS", icon: Server },
    { name: "Redirects", status: "PASS", icon: GitBranch },
    { name: "robots.txt", status: "INFO", icon: FileText },
    { name: "sitemap.xml", status: "INFO", icon: FileText },
    { name: "Technology Detection", status: "PASS", icon: Cpu },
    { name: "Attack Surface", status: "WARN", icon: AlertTriangle },
  ];

  const statusColor = (s: string) =>
    s === "PASS" ? "text-green-400" : s === "WARN" ? "text-yellow-400" : "text-blue-400";

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back link */}
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      {/* Report header */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6 pb-6 border-b border-border/50">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">ANPU Security Intelligence Report</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-2">{report.target}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> {report.url}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Scanned Aug 26, 2026</span>
              <span>Profile: {report.profile}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{report.score}</p>
              <p className="text-xs text-muted-foreground">/ 10</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{report.grade}</p>
              <p className="text-xs text-muted-foreground">Grade</p>
            </div>
          </div>
        </div>

        {/* Finding counts */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {[
            { label: "Critical", count: report.findingCounts.critical, color: "text-destructive" },
            { label: "High", count: report.findingCounts.high, color: "text-orange-400" },
            { label: "Medium", count: report.findingCounts.medium, color: "text-yellow-400" },
            { label: "Low", count: report.findingCounts.low, color: "text-blue-400" },
            { label: "Info", count: report.findingCounts.info, color: "text-muted-foreground" },
          ].map((f) => (
            <div key={f.label} className="text-center p-3 rounded-md bg-muted/20">
              <p className={cn("text-2xl font-bold", f.color)}>{f.count}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Export actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><FileTextIcon className="h-3.5 w-3.5" /> Export PDF</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><FileJson className="h-3.5 w-3.5" /> Export JSON</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><FileTextIcon className="h-3.5 w-3.5" /> Export Markdown</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Share2 className="h-3.5 w-3.5" /> Share Report</Button>
          {report.isDemoData && (
            <Badge variant="outline" className="ml-auto text-yellow-400 border-yellow-500/30">Demo Data</Badge>
          )}
        </div>
      </Card>

      {/* Executive Summary */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Executive Summary</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{report.executiveSummary}</p>
      </Card>

      {/* Category checks */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Security Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {headerChecks.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.name} className="flex items-center justify-between p-3 rounded-md border border-border/50">
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{c.name}</span>
                </div>
                <span className={cn("text-xs font-bold", statusColor(c.status))}>{c.status}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tabs for detailed sections */}
      <Tabs defaultValue="findings" className="mb-6">
        <TabsList className="w-full justify-start flex-wrap h-auto p-1">
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="tls">TLS</TabsTrigger>
          <TabsTrigger value="dns">DNS</TabsTrigger>
          <TabsTrigger value="tech">Technologies</TabsTrigger>
          <TabsTrigger value="recon">Recon</TabsTrigger>
          <TabsTrigger value="recs">Recommendations</TabsTrigger>
        </TabsList>

        {/* Findings tab */}
        <TabsContent value="findings">
          <Card className="p-6 lg:p-8 bg-card/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <h2 className="text-lg font-semibold text-foreground">Findings</h2>
              <div className="flex flex-wrap gap-1.5">
                {(["all", "critical", "high", "medium", "low", "info"] as const).map((s) => (
                  <Button
                    key={s}
                    variant={severityFilter === s ? "default" : "outline"}
                    size="xs"
                    onClick={() => setSeverityFilter(s)}
                    className="capitalize"
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredFindings.map((f) => (
                <div key={f.id} className="p-4 rounded-md border border-border/50">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm font-semibold text-foreground">{f.title}</p>
                    <SeverityBadge severity={f.severity} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{f.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    {f.evidence && (
                      <div>
                        <p className="text-muted-foreground/60 uppercase tracking-wide text-[10px] mb-1">Evidence</p>
                        <p className="text-muted-foreground font-mono">{f.evidence}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground/60 uppercase tracking-wide text-[10px] mb-1">Impact</p>
                      <p className="text-muted-foreground">{f.impact}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-muted-foreground/60 uppercase tracking-wide text-[10px] mb-1">Recommendation</p>
                      <p className="text-foreground">{f.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredFindings.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">No findings at this severity level.</p>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Headers tab */}
        <TabsContent value="headers">
          <Card className="p-6 lg:p-8 bg-card/40">
            <h2 className="text-lg font-semibold text-foreground mb-4">Security Headers</h2>
            <div className="space-y-2">
              {report.securityHeaders.map((h) => (
                <div key={h.name} className="flex items-center justify-between p-3 rounded-md border border-border/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{h.name}</p>
                    {h.value && <p className="text-xs text-muted-foreground font-mono mt-0.5">{h.value}</p>}
                  </div>
                  <span className={cn(
                    "text-xs font-bold",
                    h.status === "pass" ? "text-green-400" : h.status === "fail" ? "text-destructive" : h.status === "warn" ? "text-yellow-400" : "text-blue-400"
                  )}>{h.status.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* TLS tab */}
        <TabsContent value="tls">
          <Card className="p-6 lg:p-8 bg-card/40">
            <h2 className="text-lg font-semibold text-foreground mb-4">TLS Configuration</h2>
            {report.tls ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Version", value: report.tls.version },
                  { label: "Cipher", value: report.tls.cipher },
                  { label: "Grade", value: report.tls.grade },
                  { label: "Valid Until", value: report.tls.validUntil },
                  { label: "Issuer", value: report.tls.issuer },
                  { label: "SANs", value: report.tls.subjectAltNames.join(", ") },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-md bg-muted/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="text-sm text-foreground font-mono">{item.value}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-muted-foreground">No TLS data available.</p>}
          </Card>
        </TabsContent>

        {/* DNS tab */}
        <TabsContent value="dns">
          <Card className="p-6 lg:p-8 bg-card/40">
            <h2 className="text-lg font-semibold text-foreground mb-4">DNS Information</h2>
            {report.dns ? (
              <div className="space-y-4">
                {[
                  { label: "A Records", value: report.dns.a.join(", ") },
                  { label: "MX Records", value: report.dns.mx.join(", ") },
                  { label: "NS Records", value: report.dns.ns.join(", ") },
                  { label: "TXT Records", value: report.dns.txt.join(", ") },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-md bg-muted/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="text-sm text-foreground font-mono">{item.value}</p>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "DNSSEC", value: report.dns.hasDnssec },
                    { label: "DMARC", value: report.dns.hasDmarc },
                    { label: "SPF", value: report.dns.hasSpf },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-md bg-muted/20 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                      <p className={cn("text-sm font-bold", item.value ? "text-green-400" : "text-destructive")}>
                        {item.value ? "Yes" : "No"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : <p className="text-sm text-muted-foreground">No DNS data available.</p>}
          </Card>
        </TabsContent>

        {/* Tech tab */}
        <TabsContent value="tech">
          <Card className="p-6 lg:p-8 bg-card/40">
            <h2 className="text-lg font-semibold text-foreground mb-4">Detected Technologies</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {report.technologies.map((t) => (
                <div key={t.name} className="flex items-center justify-between p-3 rounded-md border border-border/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.category}{t.version ? ` · ${t.version}` : ""}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{t.confidence}%</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Recon tab */}
        <TabsContent value="recon">
          <Card className="p-6 lg:p-8 bg-card/40">
            <h2 className="text-lg font-semibold text-foreground mb-4">Reconnaissance</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-muted/20">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Redirect Chain</p>
                <div className="flex flex-col gap-1">
                  {report.redirectChain.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm text-foreground font-mono">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-md bg-muted/20 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">robots.txt</p>
                  <p className={cn("text-sm font-bold", report.robotsTxt ? "text-green-400" : "text-destructive")}>
                    {report.robotsTxt ? "Found" : "Not Found"}
                  </p>
                </div>
                <div className="p-3 rounded-md bg-muted/20 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">sitemap.xml</p>
                  <p className={cn("text-sm font-bold", report.sitemapXml ? "text-green-400" : "text-destructive")}>
                    {report.sitemapXml ? "Found" : "Not Found"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Recommendations tab */}
        <TabsContent value="recs">
          <Card className="p-6 lg:p-8 bg-card/40">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recommendations</h2>
            <div className="space-y-3">
              {report.findings.filter((f) => f.severity !== "info").map((f) => (
                <div key={f.id} className="p-4 rounded-md border border-border/50">
                  <div className="flex items-start gap-3 mb-2">
                    <SeverityBadge severity={f.severity} />
                    <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{f.recommendation}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
