import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, Loader2, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { GuardianStatus } from "@/components/GuardianStatus";
import { SecurityScore } from "@/components/SecurityScore";
import { demoReport, scanProgressSteps } from "@/lib/mockData";
import type { ScanProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

const profileOptions = [
  { value: "surface", label: "Surface", desc: "Quick public-surface check" },
  { value: "standard", label: "Standard", desc: "Balanced recommended scan" },
  { value: "deep", label: "Deep", desc: "Broader, more detailed analysis" },
];

export function ScanPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState(searchParams.get("url") ?? "");
  const [profile, setProfile] = useState<ScanProfile>("standard");
  const [scanning, setScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [guardianState, setGuardianState] = useState<"dormant" | "scanning" | "analyzing" | "stable">("dormant");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScan = () => {
    if (!url.trim() || scanning) return;
    setScanning(true);
    setCompleted(false);
    setCurrentStep(0);
    setGuardianState("scanning");
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = Math.min(prev + 1, scanProgressSteps.length - 1);
        if (next >= Math.floor(scanProgressSteps.length / 2)) setGuardianState("analyzing");
        if (next === scanProgressSteps.length - 1) {
          window.setTimeout(() => {
            setScanning(false);
            setCompleted(true);
            setGuardianState("stable");
          }, 450);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return next;
      });
    }, 480);
  };

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const queryUrl = searchParams.get("url");
    if (!queryUrl) return;
    setUrl(queryUrl);
    const timer = window.setTimeout(() => startScan(), 300);
    return () => window.clearTimeout(timer);
  }, [searchParams]);

  const completionPercent = completed ? 100 : Math.round(((currentStep + 1) / scanProgressSteps.length) * 100);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="anpu-eyebrow">ANPU / SCANNER</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#f2eee1] sm:text-5xl">Scan a website.</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#9c978c]">Use the demo interface to see how ANPU moves from a target URL to a security intelligence report.</p>
        </div>
        <Badge variant="secondary">Demo interface</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6ae54]/18 bg-[#d6ae54]/6 text-[#d6ae54]"><ScanLine className="h-5 w-5" /></div><div><h2 className="text-lg font-semibold text-[#f2eee2]">Target &amp; scan profile</h2><p className="text-xs text-[#777168]">Configure a target for the demo workflow.</p></div></div>

          <div className="mt-7">
            <Label htmlFor="url" className="text-sm font-medium text-[#d6ae54]">Target URL</Label>
            <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} disabled={scanning} placeholder="https://example.com" className="mt-2 h-12 font-mono" />
            <p className="mt-2 text-xs text-[#6d685f]">Only scan systems you own or have explicit permission to test.</p>
          </div>

          <div className="mt-7">
            <Label className="text-sm font-medium text-[#d6ae54]">Scan profile</Label>
            <RadioGroup value={profile} onValueChange={(value) => setProfile(value as ScanProfile)} className="mt-3 grid gap-3 sm:grid-cols-3">
              {profileOptions.map((option) => <Label key={option.value} htmlFor={`profile-${option.value}`} className={cn("cursor-pointer border p-4 transition-all", profile === option.value ? "border-[#d6ae54]/45 bg-[#d6ae54]/7" : "border-white/6 bg-white/[0.01] hover:border-[#d6ae54]/22")}>
                <RadioGroupItem id={`profile-${option.value}`} value={option.value} className="sr-only" /><span className="block text-sm font-semibold text-[#eee8da]">{option.label}</span><span className="mt-1 block text-xs leading-5 text-[#777168]">{option.desc}</span>
              </Label>)}
            </RadioGroup>
          </div>

          <div className="mt-7 flex gap-3 border border-yellow-500/15 bg-yellow-500/[0.03] p-4"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#e7c46a]" /><p className="text-xs leading-5 text-[#908a7f]"><strong className="text-[#e7c46a]">Authorization required.</strong> This web UI is a demo and does not send a real scan to the Go engine yet.</p></div>

          <Button size="lg" className="mt-6 h-12 w-full gap-2" onClick={startScan} disabled={scanning || !url.trim()}>{scanning ? <><Loader2 className="h-4 w-4 animate-spin" /> Running demo scan…</> : <><ScanLine className="h-4 w-4" /> Run demo scan <ArrowRight className="h-4 w-4" /></>}</Button>
        </Card>

        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between"><div><div className="anpu-eyebrow">GUARDIAN</div><h2 className="mt-2 text-xl font-semibold text-[#f2eee2]">ANPU is watching.</h2></div><span className={scanning ? "text-xs text-[#d6ae54]" : "text-xs text-[#73d67a]"}>● {scanning ? "Active" : "Ready"}</span></div>
          <div className="flex min-h-[260px] items-center justify-center"><div className="anpu-scan-guardian-halo"><PharaohGuardian size={245} state={guardianState} pulse={scanning} /></div></div>
          <GuardianStatus status={guardianState} size={58} showLabel={true} className="mx-auto" />
        </Card>
      </div>

      {(scanning || completed) && <Card className="mt-6 overflow-hidden p-0"><div className="flex flex-col gap-2 border-b border-white/6 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="anpu-eyebrow">SCAN ACTIVITY</p><h2 className="mt-1 text-lg font-semibold text-[#eee8da]">{url || "example.com"}</h2></div><span className="font-mono text-sm text-[#d6ae54]">{completionPercent}%</span></div><div className="grid gap-6 p-5 lg:grid-cols-[1.1fr_.9fr]"><div><div className="h-2 overflow-hidden bg-[#1b1a16]"><div className="h-full bg-gradient-to-r from-[#9b7837] to-[#f0d27a] transition-all duration-300" style={{ width: `${completionPercent}%` }} /></div><div className="mt-5 grid gap-2">{scanProgressSteps.map((step, index) => <div key={step} className={cn("flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm", index <= currentStep ? "border-[#d6ae54]/12 bg-[#d6ae54]/[0.035] text-[#d7cfbd]" : "border-white/4 text-[#5f5b53]")}>{index < currentStep || completed ? <CheckCircle2 className="h-4 w-4 text-[#73d67a]" /> : index === currentStep ? <Loader2 className="h-4 w-4 animate-spin text-[#d6ae54]" /> : <span className="h-4 w-4 rounded-full border border-current" />}{step}</div>)}</div></div><div className="flex flex-col justify-center rounded-xl border border-[#d6ae54]/10 bg-[#0b0b09] p-5"><div className="anpu-eyebrow">RESULT</div><div className="mt-3 flex items-end gap-4"><SecurityScore score={demoReport.score} grade={demoReport.grade} size={150} /><div><div className="text-xs uppercase tracking-wider text-[#69645b]">Findings</div><div className="mt-2 text-3xl font-semibold text-[#eee8da]">{demoReport.findings.length}</div><div className="mt-1 text-xs text-[#827d73]">across public signals</div></div></div>{completed && <Button className="mt-5 w-full" onClick={() => navigate("/reports/demo-scan-001")}><ExternalLink className="h-4 w-4" /> View full report</Button>}</div></div></Card>}

      {!scanning && !completed && <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="p-5 border border-white/5 bg-white/[0.012]"><div className="text-sm font-semibold text-[#eee8da]">Surface first</div><p className="mt-2 text-xs leading-5 text-[#777168]">Start with publicly visible signals before deeper analysis.</p></div><div className="p-5 border border-white/5 bg-white/[0.012]"><div className="text-sm font-semibold text-[#eee8da]">Evidence matters</div><p className="mt-2 text-xs leading-5 text-[#777168]">Findings are easier to act on when the observation is visible.</p></div><div className="p-5 border border-white/5 bg-white/[0.012]"><div className="text-sm font-semibold text-[#eee8da]">Open core</div><p className="mt-2 text-xs leading-5 text-[#777168]">The real ANPU engine remains open-source and CLI-first.</p></div></div>}
    </div>
  );
}

export default ScanPage;
