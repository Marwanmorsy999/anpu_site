import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Shield, Lock, Server, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AnpuMark } from "@/components/AnpuMark";
import { SecurityScore } from "@/components/SecurityScore";
import { demoReport } from "@/lib/mockData";

export function Hero() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleScan = () => {
    if (url.trim()) navigate(`/scan?url=${encodeURIComponent(url)}`);
    else navigate("/scan");
  };

  const checks = [
    { label: "TLS", status: "PASS", icon: Lock },
    { label: "Security Headers", status: "PASS", icon: Shield },
    { label: "Cookies", status: "WARN", icon: Server },
    { label: "DNS", status: "PASS", icon: GitBranch },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.04] blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/25 text-primary">
                <AnpuMark className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-[0.2em] text-foreground">ANPU</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.02]">
              Guard what<br />you build.
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Open-source web security intelligence for developers, security researchers, and teams.
            </p>
            <div className="mt-10 w-full max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Scan a Website</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="text"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  className="flex-1 h-12 text-base bg-card/50"
                  aria-label="Target URL"
                />
                <Button size="lg" onClick={handleScan} className="h-12 px-6 gap-2 text-base">
                  <Zap className="h-4 w-4" />
                  Scan Website
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground/70">
                Only scan systems you own or have explicit permission to test.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ANPU Security Score</span>
                <Badge variant="outline" className="text-primary border-primary/30">Demo</Badge>
              </div>
              <div className="flex justify-center mb-8">
                <SecurityScore score={demoReport.score} grade={demoReport.grade} />
              </div>
              <div className="space-y-2.5">
                {checks.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/30">
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{c.label}</span>
                      </div>
                      <span className={c.status === "PASS" ? "text-sm font-semibold text-green-400" : "text-sm font-semibold text-yellow-400"}>
                        {c.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
