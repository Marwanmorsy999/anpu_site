import { useState } from "react";
import { Shield, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoReport } from "@/lib/mockData";

export function BadgePage() {
  const [copied, setCopied] = useState(false);
  const embedCode = `<a href="https://anpu.example/report/example">
  <img src="https://anpu.example/badge/example" alt="ANPU Security Scan">
</a>`;
  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">ANPU Security Badge</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Display your security posture with a shareable badge that links to your public ANPU report.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <Card className="p-8 bg-card/60 border-primary/30 gold-glow">
          <div className="text-center min-w-[280px]">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">ANPU Security Scan</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-4xl font-bold text-primary">{demoReport.grade}</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{demoReport.score} / 10</p>
            <p className="text-xs text-muted-foreground mt-2">Last scanned Aug 26, 2026</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">How It Works</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>1. Run an ANPU scan on your website using the CLI or web interface.</p>
          <p>2. ANPU generates a public report with your security score and grade.</p>
          <p>3. Embed the badge in your README, website footer, or project page.</p>
          <p>4. Visitors click the badge to view your full security intelligence report.</p>
        </div>
      </Card>

      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Embed Code</h2>
        <pre className="p-4 rounded-md bg-muted/30 border border-border/50 text-xs text-muted-foreground font-mono overflow-x-auto mb-3">
{embedCode}
        </pre>
        <Button variant="outline" size="sm" onClick={copyCode} className="gap-1.5">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy code"}
        </Button>
      </Card>

      <div className="p-3 rounded-md border border-yellow-500/20 bg-yellow-500/5 flex gap-2.5">
        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 shrink-0">Example</Badge>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Badge generation and public report hosting are planned features. This page demonstrates the intended design and embed format.
        </p>
      </div>
    </div>
  );
}
