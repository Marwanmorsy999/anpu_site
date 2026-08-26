import { useNavigate } from "react-router-dom";
import { Shield, Copy, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnpuMark } from "@/components/AnpuMark";

export function SecurityBadge() {
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
    <section className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">ANPU Security Badge</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Websites and GitHub repositories can display the ANPU security badge, linking to a public ANPU report.
            </p>
            <p className="mt-3 text-sm text-muted-foreground/60">
              Example only — badge generation is a planned feature.
            </p>
            <div className="mt-6">
              <pre className="p-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-muted-foreground font-mono overflow-x-auto">
{embedCode}
              </pre>
              <Button variant="outline" size="sm" onClick={copyCode} className="mt-3 gap-1.5">
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy code"}
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/badge")} className="mt-4 gap-1.5">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex justify-center">
            <Card className="p-8 bg-card/60 border-primary/25 gold-glow">
              <div className="text-center min-w-[280px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <AnpuMark className="h-5 w-5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ANPU Security</span>
                </div>
                <div className="flex items-center justify-center gap-3 my-4">
                  <span className="text-5xl font-bold text-primary">A</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{demoScore} / 10</p>
                <p className="text-xs text-muted-foreground mt-3">Scanned Aug 26, 2026</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

const demoScore = 8.9;
