import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Lock, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { demoReport, scanProgressSteps } from "@/lib/mockData";
import type { ScanProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ScanPage() {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState(searchParams.get("url") ?? "");
  const [profile, setProfile] = useState<ScanProfile>("standard");
  const [scanning, setScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [guardianState, setGuardianState] = useState<'dormant' | 'scanning' | 'analyzing' | 'stable'>('dormant');
  const navigate = useNavigate();
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startScan = () => {
    if (!url.trim()) return;
    setScanning(true);
    setCompleted(false);
    setCurrentStep(0);
    setGuardianState('scanning');
    
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= scanProgressSteps.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setScanning(false);
          setCompleted(true);
          setGuardianState('stable');
          return prev;
        }
        // Change guardian state halfway through
        if (prev >= scanProgressSteps.length / 2) {
          setGuardianState('analyzing');
        }
        return prev + 1;
      });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("url")) startScan();
  }, [searchParams]);

  const profileOptions = [
    { value: "surface", label: "SURFACE", desc: "Quick check" },
    { value: "standard", label: "STANDARD", desc: "Recommended" },
    { value: "deep", label: "DEEP", desc: "Thorough" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <PharaohGuardian size={48} state={guardianState} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          ANPU // SCAN TERMINAL
        </h1>
        <p className="mt-3 text-muted-foreground">
          Analyze a website's publicly exposed security posture.
        </p>
      </div>

      {/* Scan form */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6 border-border">
        <div className="space-y-6">
          {/* URL Input */}
          <div>
            <Label htmlFor="url" className="text-sm font-medium mb-2 block text-secondary">
              TARGET
            </Label>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary">&gt;</span>
              <span className="text-muted-foreground">_</span>
            </div>
            <Input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={scanning}
              className="h-11 w-full bg-input"
              aria-label="Target URL"
            />
          </div>

          {/* Scan Profile */}
          <div>
            <Label className="text-sm font-medium mb-3 block text-secondary">
              SCAN PROFILE
            </Label>
            <RadioGroup
              value={profile}
              onValueChange={(v) => setProfile(v as ScanProfile)}
              className="grid grid-cols-3 gap-3"
            >
              {profileOptions.map((p) => (
                <div key={p.value}>
                  <Label
                    htmlFor={p.value}
                    className={cn(
                      "flex flex-col items-center gap-1 p-4 rounded-md border cursor-pointer transition-all",
                      profile === p.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border/50 hover:border-primary/30 bg-card/40"
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

          {/* Warning */}
          <div className="p-3 rounded-md border border-yellow-500/20 bg-yellow-500/5 flex gap-2.5">
            <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-yellow-400 font-medium">Authorization required.</span> 
              Only scan systems you own or have explicit permission to test. 
              Unauthorized scanning may be illegal.
            </p>
          </div>

          {/* Scan Button */}
          <Button
            size="lg"
            className="w-full h-11 gap-2"
            onClick={startScan}
            disabled={scanning || !url.trim()}
          >
            {scanning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                SCANNING...
              </>
            ) : (
              <>
                EXECUTE SCAN
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Progress / Results */}
      {(scanning || completed) && (
        <Card className="p-6 lg:p-8 bg-card/40 border-border">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                ANPU SCAN {scanning ? "IN PROGRESS" : "COMPLETE"}
              </p>
              <p className="text-lg font-semibold text-foreground mt-1">{url || "example.com"}</p>
            </div>
            <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
              Demo Mode
            </Badge>
          </div>

          {/* Scan Output Terminal */}
          <div className="bg-[#050505] rounded-md border border-border/50 p-4 font-mono text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary">[ANPU]</span>
              <span className="text-muted-foreground">Establishing connection...</span>
            </div>
            
            <div className="space-y-1">
              {scanProgressSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  {i < currentStep ? (
                    <span className="text-[#7CFF4F]">[+]</span>
                  ) : i === currentStep && scanning ? (
                    <span className="text-[#FFB000] animate-pulse">[...]</span>
                  ) : (
                    <span className="text-[#6A6A6A]">[ ]</span>
                  )}
                  <span 
                    className={cn(
                      "text-sm",
                      i < currentStep ? "text-[#7CFF4F]" : 
                      i === currentStep && scanning ? "text-[#FFB000]" : "text-[#6A6A6A]"
                    )}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
            
            {completed && !scanning && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary">[ANPU]</span>
                  <span className="text-[#7CFF4F]">Scan complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Risk Score:</span>
                  <span className="text-primary font-bold">{demoReport.score}/10</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Grade:</span>
                  <span className="text-secondary font-bold">{demoReport.grade}</span>
                </div>
              </div>
            )}
          </div>

          {/* Guardian Status */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-center gap-4">
              <PharaohGuardian size={64} state={guardianState} />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">GUARDIAN STATUS</p>
                <p className="text-lg font-bold text-primary">
                  {guardianState.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {completed && !scanning && (
            <>
              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-5 gap-2 text-center">
                {[
                  { label: "CRITICAL", count: demoReport.findingCounts.critical, color: "text-[#FF2A2A]" },
                  { label: "HIGH", count: demoReport.findingCounts.high, color: "text-[#FF8C00]" },
                  { label: "MEDIUM", count: demoReport.findingCounts.medium, color: "text-[#FFD200]" },
                  { label: "LOW", count: demoReport.findingCounts.low, color: "text-[#7CFF4F]" },
                  { label: "INFO", count: demoReport.findingCounts.info, color: "text-muted-foreground" },
                ].map((f) => (
                  <div key={f.label} className="p-2 rounded-md bg-muted/20">
                    <p className={`text-xl font-bold ${f.color}`}>{f.count}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Warning */}
              <div className="mt-4 p-3 rounded-md border border-border/50 bg-muted/20 flex gap-2">
                <Lock className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  This is demo data. ANPU's web interface is not yet connected to the Go scanning engine. 
                  The CLI performs real scans.
                </p>
              </div>

              {/* View Report Button */}
              <Button 
                size="lg" 
                className="w-full gap-2 mt-4"
                onClick={() => navigate("/reports/demo-scan-001")}
              >
                VIEW FULL REPORT <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </Card>
      )}
    </div>
  );
}

export default ScanPage;
