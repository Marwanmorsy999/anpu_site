import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, Clock, FileJson, FileText as FileTextIcon, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { demoReport, mockScanHistory } from "@/lib/mockData";
import type { Severity } from "@/lib/types";
import { SeverityBadge } from "@/components/SeverityBadge";
import { cn } from "@/lib/utils";

export function ReportPage() {
  const { id } = useParams();
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const report = mockScanHistory.find((r) => r.id === id) ?? demoReport;

  const filteredFindings = severityFilter === "all"
    ? report.findings
    : report.findings.filter((f) => f.severity === severityFilter);

  const headerChecks = [
    { name: "HTTPS / TLS", status: "PASS" },
    { name: "Security Headers", status: "WARN" },
    { name: "Cookies", status: "PASS" },
    { name: "DNS", status: "PASS" },
    { name: "Redirects", status: "PASS" },
    { name: "robots.txt", status: "INFO" },
    { name: "sitemap.xml", status: "INFO" },
    { name: "Technology Detection", status: "PASS" },
    { name: "Attack Surface", status: "WARN" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back link */}
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> BACK TO DASHBOARD
      </Link>

      {/* Report header */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6 pb-6 border-b border-border/50">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              ANPU SECURITY INTELLIGENCE REPORT
            </p>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-2">
              {report.target}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" /> {report.url}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Scanned Aug 26, 2026
              </span>
              <span>Profile: {report.profile.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{report.score}</p>
              <p className="text-xs text-muted-foreground">/ 10</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">{report.grade}</p>
              <p className="text-xs text-muted-foreground">GRADE</p>
            </div>
          </div>
        </div>

        {/* Finding counts */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {[
            { label: "CRITICAL", count: report.findingCounts.critical, color: "text-[#FF2A2A]" },
            { label: "HIGH", count: report.findingCounts.high, color: "text-[#FF8C00]" },
            { label: "MEDIUM", count: report.findingCounts.medium, color: "text-[#FFD200]" },
            { label: "LOW", count: report.findingCounts.low, color: "text-[#7CFF4F]" },
            { label: "INFO", count: report.findingCounts.info, color: "text-muted-foreground" },
          ].map((f) => (
            <div key={f.label} className="text-center p-2 rounded-md bg-muted/20 border border-border/30">
              <p className={`text-2xl font-bold ${f.color}`}>{f.count}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">
                {f.label}
              </p>
            </div>
          ))}
        </div>

        {/* Export actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileTextIcon className="h-3.5 w-3.5" /> EXPORT PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileJson className="h-3.5 w-3.5" /> EXPORT JSON
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileTextIcon className="h-3.5 w-3.5" /> EXPORT MARKDOWN
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-3.5 w-3.5" /> SHARE REPORT
          </Button>
          {report.isDemoData && (
            <Badge variant="outline" className="ml-auto text-yellow-400 border-yellow-500/30">
              DEMO DATA
            </Badge>
          )}
        </div>
      </Card>

      {/* Executive Summary */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
        <div className="flex items-center gap-2 mb-3">
          <PharaohGuardian size={24} state="stable" />
          <h2 className="text-lg font-semibold text-foreground">EXECUTIVE SUMMARY</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {report.executiveSummary}
        </p>
      </Card>

      {/* Category checks */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">SECURITY CATEGORIES</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {headerChecks.map((c) => (
            <div 
              key={c.name} 
              className="flex items-center justify-between p-3 rounded-md border border-border/50 hover:bg-muted/20 transition-colors"
            >
              <span className="text-sm text-foreground">{c.name}</span>
              <Badge 
                variant={c.status === "PASS" ? "default" : c.status === "WARN" ? "secondary" : "outline"}
                className="text-xs"
              >
                {c.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs for detailed sections */}
      <div className="mb-6">
        <Card className="p-2 mb-4 border-border">
          <div className="flex flex-wrap gap-1">
            {[
              { value: "findings", label: "FINDINGS" },
              { value: "headers", label: "HEADERS" },
              { value: "tls", label: "TLS" },
              { value: "dns", label: "DNS" },
              { value: "tech", label: "TECHNOLOGIES" },
              { value: "recon", label: "RECON" },
              { value: "recs", label: "RECOMMENDATIONS" },
            ].map((tab) => (
              <Button
                key={tab.value}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Findings section */}
        <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <h2 className="text-lg font-semibold text-foreground">FINDINGS</h2>
            <div className="flex flex-wrap gap-1.5">
              {(["all", "critical", "high", "medium", "low", "info"] as const).map((s) => (
                <Button
                  key={s}
                  variant={severityFilter === s ? "default" : "outline"}
                  size="xs"
                  onClick={() => setSeverityFilter(s)}
                  className="text-xs"
                >
                  {s.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filteredFindings.map((f) => (
              <Card key={f.id} className="p-4 bg-muted/20 border-border/30">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <SeverityBadge severity={f.severity} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{f.description}</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  {f.evidence && (
                    <div>
                      <p className="text-muted-foreground/60 uppercase tracking-wide text-xs mb-1">
                        EVIDENCE
                      </p>
                      <p className="text-foreground font-mono text-xs">{f.evidence}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground/60 uppercase tracking-wide text-xs mb-1">
                      IMPACT
                    </p>
                    <p className="text-muted-foreground text-xs">{f.impact}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-muted-foreground/60 uppercase tracking-wide text-xs mb-1">
                      RECOMMENDATION
                    </p>
                    <p className="text-primary text-xs">{f.recommendation}</p>
                  </div>
                </div>
              </Card>
            ))}
            {filteredFindings.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                NO FINDINGS AT THIS SEVERITY LEVEL
              </p>
            )}
          </div>
        </Card>

        {/* Headers section */}
        <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">SECURITY HEADERS</h2>
          <div className="space-y-2">
            {report.securityHeaders.map((h) => (
              <Card key={h.name} className="p-3 bg-muted/20 border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{h.name}</p>
                    {h.value && (
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">{h.value}</p>
                    )}
                  </div>
                  <Badge 
                    variant={h.status === "pass" ? "default" : h.status === "fail" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {h.status.toUpperCase()}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* TLS section */}
        <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">TLS CONFIGURATION</h2>
          {report.tls ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "VERSION", value: report.tls.version },
                { label: "CIPHER", value: report.tls.cipher },
                { label: "GRADE", value: report.tls.grade },
                { label: "VALID UNTIL", value: report.tls.validUntil },
                { label: "ISSUER", value: report.tls.issuer },
                { label: "SUBJECT ALT NAMES", value: report.tls.subjectAltNames.join(", ") },
              ].map((item) => (
                <Card key={item.label} className="p-3 bg-muted/20 border-border/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground font-mono">{item.value}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">NO TLS DATA AVAILABLE</p>
          )}
        </Card>

        {/* DNS section */}
        <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">DNS INFORMATION</h2>
          {report.dns ? (
            <div className="space-y-4">
              {[
                { label: "A RECORDS", value: report.dns.a.join(", ") },
                { label: "MX RECORDS", value: report.dns.mx.join(", ") },
                { label: "NS RECORDS", value: report.dns.ns.join(", ") },
                { label: "TXT RECORDS", value: report.dns.txt.join(", ") },
              ].map((item) => (
                <Card key={item.label} className="p-3 bg-muted/20 border-border/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground font-mono">{item.value}</p>
                </Card>
              ))}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "DNSSEC", value: report.dns.hasDnssec },
                  { label: "DMARC", value: report.dns.hasDmarc },
                  { label: "SPF", value: report.dns.hasSpf },
                ].map((item) => (
                  <Card key={item.label} className="p-3 bg-muted/20 border-border/30 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p 
                      className={cn(
                        "text-sm font-bold",
                        item.value ? "text-[#7CFF4F]" : "text-[#FF2A2A]"
                      )}
                    >
                      {item.value ? "YES" : "NO"}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">NO DNS DATA AVAILABLE</p>
          )}
        </Card>

        {/* Tech section */}
        <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">DETECTED TECHNOLOGIES</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {report.technologies.map((t) => (
              <Card key={t.name} className="p-3 bg-muted/20 border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.category}{t.version ? ` · ${t.version}` : ""}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    {t.confidence}%
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Recon section */}
        <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">RECONNAISSANCE</h2>
          <div className="space-y-3">
            <Card className="p-3 bg-muted/20 border-border/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                REDIRECT CHAIN
              </p>
              <div className="flex flex-col gap-1">
                {report.redirectChain.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm text-foreground font-mono">{r}</span>
                  </div>
                ))}
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-2">
              <Card className="p-3 bg-muted/20 border-border/30 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  ROBOTS.TXT
                </p>
                <p 
                  className={cn(
                    "text-sm font-bold",
                    report.robotsTxt ? "text-[#7CFF4F]" : "text-[#FF2A2A]"
                  )}
                >
                  {report.robotsTxt ? "FOUND" : "NOT FOUND"}
                </p>
              </Card>
              <Card className="p-3 bg-muted/20 border-border/30 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  SITEMAP.XML
                </p>
                <p 
                  className={cn(
                    "text-sm font-bold",
                    report.sitemapXml ? "text-[#7CFF4F]" : "text-[#FF2A2A]"
                  )}
                >
                  {report.sitemapXml ? "FOUND" : "NOT FOUND"}
                </p>
              </Card>
            </div>
          </div>
        </Card>

        {/* Recommendations section */}
        <Card className="p-6 lg:p-8 bg-card/40 border-border">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-secondary text-2xl">💡</span>
            <h2 className="text-lg font-semibold text-foreground">RECOMMENDATIONS</h2>
          </div>
          <div className="space-y-3">
            {report.findings.filter((f) => f.severity !== "info").map((f) => (
              <Card key={f.id} className="p-4 bg-muted/20 border-border/30">
                <div className="flex items-start gap-3 mb-2">
                  <SeverityBadge severity={f.severity} />
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{f.recommendation}</p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ReportPage;
