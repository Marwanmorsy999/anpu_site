import { Shield, AlertTriangle, Lock, FileText, Users, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 mb-4 gold-glow">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">About ANPU</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          ANPU is an open-source web security intelligence platform — a Go-based scanning engine with a web interface, reporting layer, and future integrations.
        </p>
      </div>

      {/* Mission */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Mission</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          ANPU analyzes a website's publicly exposed security posture and produces an understandable
          security intelligence report for developers, security researchers, penetration testers, and
          website owners. The goal is to make security assessment accessible without sacrificing rigor.
        </p>
      </Card>

      {/* Principles */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { icon: Lock, title: "Responsible Scanning", desc: "Only scan systems you own or have explicit permission to test." },
          { icon: FileText, title: "Transparency", desc: "Open-source engine. Every check is auditable and documented." },
          { icon: Users, title: "Community", desc: "Built in the open. Contributions welcome from security professionals and developers." },
          { icon: Scale, title: "Privacy", desc: "ANPU does not store scan results without consent. Reports belong to you." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-5 bg-card/40">
              <Icon className="h-5 w-5 text-primary mb-3" />
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
            </Card>
          );
        })}
      </div>

      {/* Responsible scanning */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Responsible Scanning Policy</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Security testing requires authorization. ANPU is designed for use on systems you own or
              have written permission to test. Unauthorized scanning of third-party systems may violate
              laws including the Computer Fraud and Abuse Act, the Computer Misuse Act, and similar
              legislation in other jurisdictions.
            </p>
          </div>
        </div>
      </Card>

      {/* License */}
      <Card className="p-6 lg:p-8 bg-card/40">
        <h2 className="text-lg font-semibold text-foreground mb-3">License</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          ANPU is released under the MIT License. You are free to use, modify, and distribute the software.
        </p>
        <Badge variant="secondary" className="mt-3">MIT License</Badge>
      </Card>
    </div>
  );
}
