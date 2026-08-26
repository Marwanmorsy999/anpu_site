import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield, Zap, AlertTriangle, CheckCircle2, Loader2, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { scanProgressSteps, demoReport } from "@/lib/mockData";
import type { ScanProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ScanPage() {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState(searchParams.get("url") ?? "");
  const [profile, setProfile] = useState<ScanProfile>("standard");
  const [scanning, setScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScan = () => {
    setScanning(true);
    setCompleted(false);
    setCurrentStep(0);
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= scanProgressSteps.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setScanning(false);
          setCompleted(true);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("url")) startScan();
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 mb-4 gold-glow">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Scanner</h1>
        <p className="mt-3 text-muted-foreground">Analyze a website's publicly exposed security posture.</p>
      </div>

      {/* Scan form */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <div className="space-y-5">
          <div>
            <Label htmlFor="url" className="text-sm font-medium mb-2 block">Target URL</Label>
            <Input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={scanning}
              className="h-11"
            />
          </div>
          <div>
            <Label className="text-sm font-medium mb-3 block">Scan Profile</Label>
            <RadioGroup
              value={profile}
              onValueChange={(v) => setProfile(v as ScanProfile)}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { value: "surface", label: "Surface", desc: "Quick check" },
                { value: "standard", label: "Standard", desc: "Recommended" },
                { value: "deep", label: "Deep", desc: "Thorough" },
              ].map((p) => (
                <div key={p.value}>
                  <Label
                    htmlFor={p.value}
                    className={cn(
                      "flex flex-col items-center gap-1 p-4 rounded-md border cursor-pointer transition-all",
                      profile === p.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border/50 hover:border-primary/30"
                    )}
                  >
                    <RadioGroupItem value={p.value} id={p.value} className="sr-only" />
                    <span className="text-sm font-semibold text-foreground">{p.label}</span>
                    <span className="text-xs text-muted-foreground">{p.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="p-3 rounded-md border border-yellow-500/20 bg-yellow-500/5 flex gap-2.5">
            <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-yellow-400 font-medium">Authorization required.</span> Only scan systems you own or have explicit written permission to test. Unauthorized scanning may be illegal.
            </p>
          </div>
          <Button
            size="lg"
            className="w-full h-11 gap-2"
            onClick={startScan}
            disabled={scanning || !url.trim()}
          >
            {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
            {scanning ? "Scanning..." : "Start Scan"}
          </Button>
        </div>
      </Card>

      {/* Progress / Results */}
      {(scanning || completed) && (
        <Card className="p-6 lg:p-8 bg-card/40">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">ANPU Scan {scanning ? "In Progress" : "Complete"}</p>
              <p className="text-lg font-semibold text-foreground mt-1">{url || "example.com"}</p>
            </div>
            <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">Demo Mode</Badge>
          </div>

          {scanning && (
            <div className="space-y-2.5">
              {scanProgressSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  {i < currentStep ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                  ) : i === currentStep ? (
                    <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-border shrink-0" />
                  )}
                  <span className={cn(
                    "text-sm",
                    i < currentStep ? "text-muted-foreground" : i === currentStep ? "text-foreground font-medium" : "text-muted-foreground/50"
                  )}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          )}

          {completed && !scanning && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary">{demoReport.score}</p>
                  <p className="text-sm text-muted-foreground mt-1">/ 10</p>
                </div>
                <Separator orientation="vertical" className="hidden sm:block h-16" />
                <div className="text-center">
                  <p className="text-5xl font-bold text-foreground">{demoReport.grade}</p>
                  <p className="text-sm text-muted-foreground mt-1">Grade</p>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                {[
                  { label: "Critical", count: 0, color: "text-destructive" },
                  { label: "High", count: 0, color: "text-orange-400" },
                  { label: "Medium", count: 2, color: "text-yellow-400" },
                  { label: "Low", count: 4, color: "text-blue-400" },
                  { label: "Info", count: 7, color: "text-muted-foreground" },
                ].map((f) => (
                  <div key={f.label} className="p-2 rounded-md bg-muted/20">
                    <p className={cn("text-xl font-bold", f.color)}>{f.count}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{f.label}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-md border border-border/50 bg-muted/20">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <Lock className="inline h-3 w-3 mr-1" />
                  This is demo data. ANPU's web interface is not yet connected to the Go scanning engine. The CLI performs real scans.
                </p>
              </div>
              <Button size="lg" className="w-full gap-2" onClick={() => navigate("/reports/demo-scan-001")}>
                View Full Report <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
