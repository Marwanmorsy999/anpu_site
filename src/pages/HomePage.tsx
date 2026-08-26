import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, GitBranch, FileText, ArrowRight, Lock, Terminal,
  CheckCircle2, AlertTriangle, ChevronDown, Zap,
  BookOpen, Code2, Server, Cpu,
  ExternalLink, Copy, FileJson, FileText as FileTextIcon, Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { demoReport, mockScanHistory, scanProgressSteps } from "@/lib/mockData";
import { SeverityBadge } from "@/components/SeverityBadge";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return value;
}

function ScoreRing({ score, grade, size = 180 }: { score: number; grade: string; size?: number }) {
  const animatedScore = useCountUp(score);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 10) * circumference;
  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--border)" strokeWidth="6" />
        <circle
          cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--gold)" strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.1s linear", filter: "drop-shadow(0 0 6px oklch(0.75 0.12 70 / 0.4))" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold tabular-nums text-foreground">
          {animatedScore.toFixed(1)}
        </span>
        <span className="text-xs text-muted-foreground mt-0.5">/ 10</span>
        <span className="mt-1 text-sm font-semibold text-primary">Grade {grade}</span>
      </div>
    </div>
  );
}

function Hero() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const handleScan = () => {
    if (url.trim()) navigate(`/scan?url=${encodeURIComponent(url)}`);
    else navigate("/scan");
  };
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 anpu-geo-pattern opacity-[0.03]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/30 gold-glow">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-2xl font-bold tracking-[0.2em] text-foreground">ANPU</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
              Guard what<br />you build.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-md leading-relaxed">
              Open-source web security intelligence for developers and security researchers.
            </p>
            <div className="mt-8 w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="text"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  className="flex-1 h-11 bg-card/50"
                  aria-label="Target URL"
                />
                <Button size="lg" onClick={handleScan} className="h-11 gap-2">
                  <Zap className="h-4 w-4" />
                  SCAN
                </Button>
              </div>
              <p className="mt-2.5 text-xs text-muted-foreground/80">
                Only scan systems you own or have explicit permission to test.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <GitBranch className="h-4 w-4" />
                  View GitHub
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="#docs" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Docs
                </a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-primary" /> Open Source</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-primary" /> Developer First</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-primary" /> No API Key</span>
            </div>
          </div>
          {/* Score visualization */}
          <div className="flex justify-center lg:justify-end">
            <Card className="p-8 bg-card/60 backdrop-blur-sm border-border/60 w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Security Score</span>
                <Badge variant="outline" className="text-primary border-primary/30">Demo Data</Badge>
              </div>
              <div className="flex justify-center mb-6">
                <ScoreRing score={demoReport.score} grade={demoReport.grade} />
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                {[
                  { label: "Critical", count: demoReport.findingCounts.critical, color: "text-destructive" },
                  { label: "High", count: demoReport.findingCounts.high, color: "text-orange-400" },
                  { label: "Medium", count: demoReport.findingCounts.medium, color: "text-yellow-400" },
                  { label: "Low", count: demoReport.findingCounts.low, color: "text-blue-400" },
                  { label: "Info", count: demoReport.findingCounts.info, color: "text-muted-foreground" },
                ].map((f) => (
                  <div key={f.label}>
                    <div className={`text-lg font-bold tabular-nums ${f.color}`}>{f.count}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{f.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveScanPreview() {
  const categories = [
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
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Live Scan Preview</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            ANPU produces a clear, actionable security intelligence report for every target.
          </p>
        </div>
        <Card className="mx-auto max-w-3xl p-6 lg:p-8 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">ANPU Security Intelligence</p>
              <p className="text-lg font-semibold text-foreground mt-1">{demoReport.target}</p>
            </div>
            <Badge variant="outline" className="text-primary border-primary/30">Demo</Badge>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 rounded-md bg-muted/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Score</p>
              <p className="text-2xl font-bold text-primary mt-1">{demoReport.score} / 10</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Grade</p>
              <p className="text-2xl font-bold text-foreground mt-1">{demoReport.grade}</p>
            </div>
            <div className="text-center p-3 rounded-md bg-muted/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Findings</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {Object.values(demoReport.findingCounts).reduce((a, b) => a + b, 0)}
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.name} className="flex items-center justify-between p-3 rounded-md border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{c.name}</span>
                  </div>
                  <span className={`text-xs font-bold ${statusColor(c.status)}`}>{c.status}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}

function WhyAnpu() {
  const features = [
    { icon: GitBranch, title: "Open Source", desc: "Auditable security tooling built in Go. Inspect every line of the scanning engine." },
    { icon: Code2, title: "Developer First", desc: "CLI, automation, reports, and integrations designed for developer workflows." },
    { icon: FileText, title: "Actionable Reports", desc: "Turn technical findings into understandable remediation guidance." },
    { icon: Zap, title: "Fast Reconnaissance", desc: "Collect useful public security intelligence without complicated setup." },
  ];
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Why ANPU</h2>
          <p className="mt-3 text-muted-foreground">Built for developers who care about security.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="p-6 bg-card/40 hover:bg-card/70 hover:border-primary/30 transition-all duration-200">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/20 mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = ["Target", "Reconnaissance", "Security Analysis", "Risk Scoring", "ANPU Report"];
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">How It Works</h2>
          <p className="mt-3 text-muted-foreground">From target to report in five steps.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <div className="flex items-center gap-3 px-6 py-3 rounded-md border border-border/50 bg-card/40">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold ring-1 ring-primary/20">
                  {i + 1}
                </span>
                <span className="text-base font-medium text-foreground">{step}</span>
              </div>
              {i < steps.length - 1 && <ChevronDown className="h-5 w-5 text-muted-foreground/50 my-0.5" />}
            </div>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { t: "Target", d: "Enter the URL you want to analyze." },
            { t: "Reconnaissance", d: "ANPU collects DNS, TLS, headers, and public surface data." },
            { t: "Security Analysis", d: "Each signal is evaluated against security best practices." },
            { t: "Risk Scoring", d: "Findings are weighted into an understandable score." },
            { t: "ANPU Report", d: "Receive a clear, shareable security intelligence report." },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-md bg-muted/20">
              <p className="text-sm font-semibold text-primary mb-1">{s.t}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportPreview() {
  const navigate = useNavigate();
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Report Preview</h2>
          <p className="mt-3 text-muted-foreground">Professional reports suitable for sending to clients.</p>
        </div>
        <Card className="mx-auto max-w-5xl p-6 lg:p-8 bg-card/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/50">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">ANPU Security Intelligence Report</p>
              <p className="text-xl font-bold text-foreground mt-1">{demoReport.target}</p>
              <p className="text-xs text-muted-foreground mt-1">Scanned Aug 26, 2026 · Profile: Standard · Demo Data</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{demoReport.score}</p>
                <p className="text-xs text-muted-foreground">/ 10</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">A</p>
                <p className="text-xs text-muted-foreground">Grade</p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-5 gap-3 mb-6">
            {[
              { label: "Critical", count: 0, color: "text-destructive" },
              { label: "High", count: 0, color: "text-orange-400" },
              { label: "Medium", count: 2, color: "text-yellow-400" },
              { label: "Low", count: 4, color: "text-blue-400" },
              { label: "Info", count: 7, color: "text-muted-foreground" },
            ].map((f) => (
              <div key={f.label} className="text-center p-3 rounded-md bg-muted/20">
                <p className={`text-2xl font-bold ${f.color}`}>{f.count}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">{f.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 mb-6">
            {demoReport.findings.slice(0, 3).map((f) => (
              <div key={f.id} className="p-4 rounded-md border border-border/50">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <SeverityBadge severity={f.severity} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1.5"><FileTextIcon className="h-3.5 w-3.5" /> Export PDF</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><FileJson className="h-3.5 w-3.5" /> Export JSON</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><FileTextIcon className="h-3.5 w-3.5" /> Export Markdown</Button>
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

function ScanHistory() {
  const navigate = useNavigate();
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Scan History</h2>
            <p className="mt-2 text-muted-foreground">Track and compare previous scans.</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="gap-2">
            View Dashboard <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockScanHistory.map((scan) => (
            <Card
              key={scan.id}
              className="p-5 bg-card/40 hover:bg-card/70 hover:border-primary/30 transition-all cursor-pointer"
              onClick={() => navigate(`/reports/${scan.id}`)}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground truncate">{scan.target}</p>
                <Badge variant="outline" className="text-primary border-primary/30 text-xs">{scan.grade}</Badge>
              </div>
              <p className="text-2xl font-bold text-primary mb-1">{scan.score} <span className="text-sm text-muted-foreground font-normal">/ 10</span></p>
              <p className="text-xs text-muted-foreground">
                {scan.id === "scan-001" ? "2 hours ago" : scan.id === "scan-002" ? "Yesterday" : scan.id === "scan-003" ? "Aug 24" : "Aug 23"}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecurityScoreSection() {
  const tiers = [
    { score: "10", label: "Excellent", color: "text-green-400" },
    { score: "8", label: "Good", color: "text-primary" },
    { score: "6", label: "Needs Attention", color: "text-yellow-400" },
    { score: "4", label: "Poor", color: "text-orange-400" },
    { score: "2", label: "High Risk", color: "text-red-400" },
    { score: "0", label: "Critical", color: "text-destructive" },
  ];
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Security Score</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            ANPU converts individual findings into an understandable security posture score.
          </p>
        </div>
        <Card className="mx-auto max-w-2xl p-6 lg:p-8 bg-card/40">
          <div className="space-y-1">
            {tiers.map((t) => (
              <div key={t.score} className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/20 transition-colors">
                <span className={`text-2xl font-bold tabular-nums w-12 ${t.color}`}>{t.score}</span>
                <Separator orientation="vertical" className="h-8" />
                <span className="text-sm font-medium text-foreground">{t.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground leading-relaxed">
              The ANPU score is an ANPU-generated assessment, not an industry-standard certification.
              It reflects the presence and severity of findings relative to security best practices.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

function BadgeSection() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const embedCode = `<a href="https://anpu.example/report/example">
  <img src="https://anpu.example/badge/example">
</a>`;
  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">ANPU Security Badge</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Websites and GitHub repositories can display the ANPU security badge, linking to a public ANPU report.
            </p>
            <p className="mt-3 text-xs text-muted-foreground/80">
              Example only — badge generation is not yet implemented.
            </p>
            <div className="mt-6">
              <pre className="p-4 rounded-md bg-muted/30 border border-border/50 text-xs text-muted-foreground font-mono overflow-x-auto">
{embedCode}
              </pre>
              <Button variant="outline" size="sm" onClick={copyCode} className="mt-2 gap-1.5">
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy code"}
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/badge")} className="mt-4 gap-1.5">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex justify-center">
            <Card className="p-6 bg-card/60 border-primary/30 gold-glow">
              <div className="text-center min-w-[260px]">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">ANPU Security Scan</p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold text-primary">A</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{demoReport.score} / 10</p>
                <p className="text-xs text-muted-foreground mt-2">Last scanned Aug 26, 2026</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function CliSection() {
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="text-primary border-primary/30 mb-4">Developer Experience</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">CLI + Developer Experience</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              ANPU is not only a website. The Go-based CLI runs the same scanning engine locally, in CI, or in automation.
            </p>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <a href="#docs" className="gap-2">
                  <Terminal className="h-4 w-4" />
                  View CLI Documentation
                </a>
              </Button>
            </div>
          </div>
          <div>
            <div className="rounded-lg border border-border/60 bg-black/40 overflow-hidden shadow-lg">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-muted/20">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">terminal</span>
              </div>
              <div className="p-4 font-mono text-sm space-y-1">
                <p className="text-muted-foreground">$ <span className="text-primary">anpu</span> scan https://example.com</p>
                <p className="text-muted-foreground/60 mt-3">ANPU Web Security Intelligence</p>
                <p className="text-muted-foreground/60">Target: <span className="text-foreground">example.com</span></p>
                <p className="text-muted-foreground/60">Profile: <span className="text-foreground">deep</span></p>
                <div className="mt-3 space-y-0.5">
                  {scanProgressSteps.slice(0, 6).map((s) => (
                    <p key={s} className="text-green-400">[+] {s}</p>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-foreground">Risk Score: <span className="text-primary font-bold">8.7/10</span></p>
                  <p className="text-foreground">Grade: <span className="text-primary font-bold">A</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApiSection() {
  const integrations = ["CLI", "Web", "API", "CI/CD", "GitHub"];
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">API / CI/CD Integration</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            ANPU is designed to integrate into your development pipeline.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {integrations.map((i) => (
            <Badge key={i} variant="outline" className="text-sm px-4 py-1.5 border-border/60">{i}</Badge>
          ))}
        </div>
        <Card className="mx-auto max-w-2xl p-6 lg:p-8 bg-card/40">
          <div className="flex flex-col items-center gap-3">
            {["GitHub Actions", "ANPU Scan", "Security Report", "Pull Request / Build Result"].map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className="px-5 py-2.5 rounded-md border border-border/50 bg-muted/20 text-sm font-medium text-foreground">
                  {step}
                </div>
                {i < 3 && <ChevronDown className="h-4 w-4 text-muted-foreground/50 my-1" />}
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground/80">
            API and GitHub integrations are planned. Not yet live.
          </p>
        </Card>
      </div>
    </section>
  );
}

function OpenSourceSection() {
  return (
    <section className="border-b border-border/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="p-8 lg:p-12 bg-card/40 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 gold-glow">
              <GitBranch className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Open Source</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            ANPU is open-source, built in Go, and developed in the open. Contribute, audit, or self-host.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Go", "Open Source", "Documentation", "Contributing", "MIT License"].map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
            ))}
          </div>
          <div className="mt-8">
            <Button size="lg" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                <GitBranch className="h-4 w-4" />
                View ANPU on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <LiveScanPreview />
      <WhyAnpu />
      <HowItWorks />
      <ReportPreview />
      <ScanHistory />
      <SecurityScoreSection />
      <BadgeSection />
      <CliSection />
      <ApiSection />
      <OpenSourceSection />
    </>
  );
}
