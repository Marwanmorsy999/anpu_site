import { Terminal, GitBranch, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ApiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-10">
        <Badge variant="outline" className="text-primary border-primary/30 mb-3">Planned</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">API &amp; CI/CD Integration</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          ANPU is designed to integrate into your development pipeline — from CLI to CI/CD.
        </p>
      </div>

      {/* Integration model */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Integration Model</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["CLI", "Web", "API", "CI/CD", "GitHub"].map((i) => (
            <Badge key={i} variant="outline" className="text-sm px-4 py-1.5">{i}</Badge>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {["GitHub Actions", "ANPU Scan", "Security Report", "Pull Request / Build Result"].map((step, i, arr) => (
            <div key={step} className="flex flex-col items-center">
              <div className="px-5 py-2.5 rounded-md border border-border/50 bg-muted/20 text-sm font-medium text-foreground">
                {step}
              </div>
              {i < arr.length - 1 && <ChevronDown className="h-4 w-4 text-muted-foreground/50 my-1" />}
            </div>
          ))}
        </div>
      </Card>

      {/* GitHub Actions example */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">GitHub Actions Example</h2>
        <div className="rounded-lg border border-border/60 bg-black/40 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border/50 bg-muted/20 flex items-center gap-2">
            <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">.github/workflows/anpu.yml</span>
          </div>
          <div className="p-4 font-mono text-xs space-y-1 text-muted-foreground">
            <p><span className="text-primary">name:</span> ANPU Security Scan</p>
            <p><span className="text-primary">on:</span> [push, pull_request]</p>
            <p><span className="text-primary">jobs:</span></p>
            <p className="pl-4"><span className="text-primary">scan:</span></p>
            <p className="pl-8"><span className="text-primary">runs-on:</span> ubuntu-latest</p>
            <p className="pl-8"><span className="text-primary">steps:</span></p>
            <p className="pl-12">- <span className="text-primary">uses:</span> actions/checkout@v4</p>
            <p className="pl-12">- <span className="text-primary">name:</span> Run ANPU scan</p>
            <p className="pl-16"><span className="text-primary">run:</span> anpu scan --format json -o report.json {"${{ github.event.repository.html_url }}"}</p>
            <p className="pl-12">- <span className="text-primary">name:</span> Upload report</p>
            <p className="pl-16"><span className="text-primary">uses:</span> actions/upload-artifact@v4</p>
            <p className="pl-20"><span className="text-primary">with:</span></p>
            <p className="pl-24"><span className="text-primary">name:</span> anpu-report</p>
            <p className="pl-24"><span className="text-primary">path:</span> report.json</p>
          </div>
        </div>
      </Card>

      {/* API concept */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">API Concept</h2>
        <div className="rounded-lg border border-border/60 bg-black/40 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border/50 bg-muted/20 flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">api</span>
          </div>
          <div className="p-4 font-mono text-xs space-y-1 text-muted-foreground">
            <p><span className="text-green-400"># Trigger a scan</span></p>
            <p><span className="text-primary">POST</span> /api/v1/scans</p>
            <p className="pl-4">{"{"} "target": "https://example.com", "profile": "standard" {"}"}</p>
            <p className="mt-2"><span className="text-green-400"># Retrieve report</span></p>
            <p><span className="text-primary">GET</span> /api/v1/scans/{"{id}"}/report</p>
            <p className="mt-2"><span className="text-green-400"># List scans</span></p>
            <p><span className="text-primary">GET</span> /api/v1/scans</p>
          </div>
        </div>
      </Card>

      <div className="p-3 rounded-md border border-yellow-500/20 bg-yellow-500/5 flex gap-2.5">
        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 shrink-0">Planned</Badge>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The API and GitHub Actions integration are planned features. The CLI is the primary interface today.
        </p>
      </div>
    </div>
  );
}
