import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, ExternalLink } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoReport } from "@/lib/mockData";

export function BadgePage() {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("https://example.com");

  const badgeTypes = [
    {
      name: "Markdown",
      code: `[![ANPU Security](https://img.shields.io/badge/ANPU-${demoReport.score}/10-7CFF4F?style=flat-square&logo=shield)](https://anpu.example/report/${demoReport.id})`
    },
    {
      name: "HTML",
      code: `<a href="https://anpu.example/report/${demoReport.id}"><img src="https://img.shields.io/badge/ANPU-${demoReport.score}/10-7CFF4F?style=flat-square&logo=shield" alt="ANPU Security Score" /></a>`
    },
    {
      name: "Dynamic",
      code: `<a href="https://anpu.example/report/${url}"><img src="https://anpu.example/badge/${url}" alt="ANPU Security Badge" /></a>`
    },
  ];

  const [selectedType, setSelectedType] = useState("Dynamic");
  const selectedCode = badgeTypes.find((t) => t.name === selectedType)?.code || "";

  const copyCode = () => {
    navigator.clipboard.writeText(selectedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> BACK HOME
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <PharaohGuardian size={48} state="stable" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          ANPU // SECURITY BADGE
        </h1>
        <p className="mt-3 text-muted-foreground">
          Display your security score on your website or GitHub repository.
        </p>
      </div>

      {/* Badge Preview */}
      <Card className="p-6 mb-6 border-border">
        <p className="text-xs uppercase tracking-wider text-secondary mb-4">
          PREVIEW
        </p>
        <div className="flex justify-center gap-8">
          {[
            { label: "LIGHT", bg: "#f0f0f0", text: "#000", score: demoReport.score, grade: demoReport.grade },
            { label: "DARK", bg: "#1a1a1a", text: "#fff", score: demoReport.score, grade: demoReport.grade },
          ].map((theme) => (
            <div key={theme.label} className="p-4" style={{ background: theme.bg }}>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                {theme.label} THEME
              </p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <PharaohGuardian size={24} state="stable" />
                <span className="text-2xl font-bold" style={{ color: theme.text }}>
                  {theme.grade}
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: theme.text }}>
                {theme.score} / 10
              </p>
              <p className="text-xs mt-1 text-muted-foreground">ANPU Security</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Code Generation */}
      <Card className="p-6 mb-6 border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            GENERATE BADGE CODE
          </h2>
        </div>

        {/* Badge type selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          {badgeTypes.map((type) => (
            <Button
              key={type.name}
              variant={selectedType === type.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type.name)}
            >
              {type.name}
            </Button>
          ))}
        </div>

        {/* URL input for dynamic badge */}
        {selectedType === "Dynamic" && (
          <div className="mb-4">
            <label className="text-sm text-secondary uppercase tracking-wider mb-2 block">
              TARGET URL
            </label>
            <Input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>
        )}

        {/* Code display */}
        <div className="relative">
          <pre 
            className="p-4 bg-[#050505] border border-border/50 text-xs text-muted-foreground font-mono overflow-x-auto whitespace-pre-wrap"
            style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
          >
{selectedCode}
          </pre>
          <Button
            variant="outline"
            size="sm"
            onClick={copyCode}
            className="absolute top-2 right-2 gap-1.5"
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "COPIED!" : "COPY CODE"}
          </Button>
        </div>
      </Card>

      {/* Features */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: "✅", title: "REAL-TIME UPDATES", desc: "Badges update automatically when new scans are run." },
          { icon: "🔗", title: "CLICKABLE", desc: "Clicking the badge links to the full report." },
          { icon: "📊", title: "SCORE DISPLAY", desc: "Shows the current ANPU security score." },
          { icon: "🎯", title: "GRADE BADGE", desc: "Displays the security grade (A+, A, B, etc.)." },
        ].map((feature) => (
          <Card key={feature.title} className="p-4 text-center border-border">
            <p className="text-2xl mb-2">{feature.icon}</p>
            <p className="text-sm font-semibold text-foreground mb-1">{feature.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.desc}
            </p>
          </Card>
        ))}
      </div>

      {/* Usage instructions */}
      <Card className="p-6 mb-8 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          HOW TO USE
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "ADD TO MARKDOWN", desc: "Paste the Markdown code in your README.md file." },
            { step: "2", title: "ADD TO HTML", desc: "Paste the HTML code anywhere on your website." },
            { step: "3", title: "COMMIT & PUSH", desc: "Commit and push the changes to see the badge live." },
            { step: "4", title: "RUN SCANS", desc: "Run ANPU scans to update the badge automatically." },
          ].map((step) => (
            <div key={step.step} className="flex gap-3 p-3 border border-border/30">
              <span className="flex h-6 w-6 items-center justify-center border border-primary/30 text-primary text-xs font-bold shrink-0">
                {step.step}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Note */}
      <Card className="p-4 mb-6 border-amber/30 bg-amber/5">
        <p className="text-amber mb-2">
          ⚠️ BADGE GENERATION IS NOT YET IMPLEMENTED
        </p>
        <p className="text-xs text-muted-foreground">
          This is a preview of the badge system. The actual badge generation API is planned for future development.
        </p>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button size="lg" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            VIEW ON GITHUB
          </a>
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.history.back()}>
          BACK
        </Button>
      </div>
    </div>
  );
}

export default BadgePage;
