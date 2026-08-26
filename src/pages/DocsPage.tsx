import { Terminal, BookOpen, Code2, Zap, FileText, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-10">
        <Badge variant="outline" className="text-primary border-primary/30 mb-3">Documentation</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">ANPU Documentation</h1>
        <p className="mt-3 text-muted-foreground">Guides, references, and examples for using ANPU.</p>
      </div>

      {/* Quick nav */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {[
          { icon: Terminal, title: "CLI Reference", desc: "Commands and flags" },
          { icon: Code2, title: "Configuration", desc: "Profiles and options" },
          { icon: Zap, title: "Quick Start", desc: "Get scanning in minutes" },
          { icon: FileText, title: "Report Formats", desc: "JSON, Markdown, PDF" },
          { icon: Download, title: "Installation", desc: "Build from source or download" },
          { icon: BookOpen, title: "Findings Reference", desc: "Severity definitions" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-4 bg-card/40 hover:bg-card/70 hover:border-primary/30 transition-all">
              <Icon className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </Card>
          );
        })}
      </div>

      {/* Installation */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Installation</h2>
        <div className="rounded-lg border border-border/60 bg-black/40 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border/50 bg-muted/20">
            <span className="text-xs text-muted-foreground font-mono">install</span>
          </div>
          <div className="p-4 font-mono text-sm space-y-1">
            <p className="text-muted-foreground"># Build from source (requires Go 1.21+)</p>
            <p className="text-foreground">go install github.com/anpu/anpu/cmd/anpu@latest</p>
            <p className="text-muted-foreground mt-2"># Or download a pre-built binary</p>
            <p className="text-foreground">curl -sSL https://anpu.example/install | sh</p>
          </div>
        </div>
      </Card>

      {/* Quick start */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Start</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>Run a basic scan against a target:</p>
          <div className="rounded-lg border border-border/60 bg-black/40 overflow-hidden">
            <div className="p-4 font-mono text-sm">
              <span className="text-muted-foreground">$ </span><span className="text-primary">anpu</span> scan https://example.com
            </div>
          </div>
          <p>Use a deep profile for thorough analysis:</p>
          <div className="rounded-lg border border-border/60 bg-black/40 overflow-hidden">
            <div className="p-4 font-mono text-sm">
              <span className="text-muted-foreground">$ </span><span className="text-primary">anpu</span> scan --profile deep https://example.com
            </div>
          </div>
          <p>Export results as JSON:</p>
          <div className="rounded-lg border border-border/60 bg-black/40 overflow-hidden">
            <div className="p-4 font-mono text-sm">
              <span className="text-muted-foreground">$ </span><span className="text-primary">anpu</span> scan --format json -o report.json https://example.com
            </div>
          </div>
        </div>
      </Card>

      {/* Scan profiles */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Scan Profiles</h2>
        <div className="space-y-3">
          {[
            { name: "surface", desc: "Quick reconnaissance — DNS, TLS, headers. Fastest." },
            { name: "standard", desc: "Balanced scan — adds cookies, redirects, robots/sitemap. Recommended." },
            { name: "deep", desc: "Thorough analysis — adds technology detection and attack surface indicators." },
          ].map((p) => (
            <div key={p.name} className="p-3 rounded-md border border-border/50">
              <p className="text-sm font-semibold text-primary font-mono">{p.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Separator className="my-8" />
      <p className="text-xs text-muted-foreground text-center">
        ANPU is open-source software. Documentation is a work in progress.
      </p>
    </div>
  );
}
