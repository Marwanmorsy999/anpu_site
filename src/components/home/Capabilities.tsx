import { Radar, ShieldCheck, Gauge, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Capabilities() {
  const features = [
    {
      icon: Radar,
      title: "Reconnaissance",
      desc: "DNS, redirects, robots.txt, sitemap, and public attack-surface information.",
    },
    {
      icon: ShieldCheck,
      title: "Security Analysis",
      desc: "Identify security configuration issues and weaknesses across your target.",
    },
    {
      icon: Gauge,
      title: "Risk Scoring",
      desc: "Convert findings into an understandable ANPU security score.",
    },
    {
      icon: FileText,
      title: "Reporting",
      desc: "Generate professional reports for developers and clients.",
    },
  ];

  return (
    <section className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">ANPU Capabilities</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete security intelligence pipeline, from reconnaissance to report.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="p-7 bg-card/40 hover:bg-card/60 hover:border-primary/30 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 mb-5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{f.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
