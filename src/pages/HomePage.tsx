import { ArrowRight, ShieldCheck, Search, Code2, FileText, Server, Terminal, GitBranch } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Module Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <PharaohGuardian size={64} state="awake" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
          ANPU // SECURITY INTELLIGENCE SYSTEM
        </h1>
        <p className="text-lg text-muted-foreground">
          Guard what you build.
        </p>
        <Badge variant="outline" className="mt-4 text-muted-foreground border-muted-foreground/30">
          1997 PHARAOH CYBER INTELLIGENCE TERMINAL
        </Badge>
      </div>

      {/* System Description */}
      <Card className="p-6 mb-8 border-border">
        <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
          ANPU is an ancient Egyptian web security intelligence system. 
          Named after Anubis, the guardian of the dead, ANPU stands watch over your web applications, 
          protecting them from security vulnerabilities and threats.
        </p>
      </Card>

      {/* Core Modules Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "SCAN TERMINAL",
            desc: "Run security scans on your web applications. Choose from Surface, Standard, or Deep profiles.",
            icon: <Terminal className="h-8 w-8" />,
            href: "/scan",
            color: "text-[#7CFF4F]",
            bgColor: "bg-[#7CFF4F]/20",
          },
          {
            title: "COMMAND CENTER",
            desc: "Monitor system status, view scan archive, and track threat index across all targets.",
            icon: <ShieldCheck className="h-8 w-8" />,
            href: "/dashboard",
            color: "text-[#FFB000]",
            bgColor: "bg-[#FFB000]/20",
          },
          {
            title: "INTELLIGENCE REPORTS",
            desc: "Access detailed security intelligence dossiers with findings, evidence, and recommendations.",
            icon: <FileText className="h-8 w-8" />,
            href: "/reports",
            color: "text-[#FFD200]",
            bgColor: "bg-[#FFD200]/20",
          },
        ].map((module, i) => (
          <Card
            key={i}
            className="p-6 border-border hover:border-primary/30 transition-all cursor-pointer"
            onClick={() => window.location.href = module.href}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${module.bgColor}`}>
                <span className={`text-2xl ${module.color}`}>{module.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground">{module.desc}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </Card>
        ))}
      </div>

      {/* Secondary Modules Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "SECURITY BADGE",
            desc: "Generate security badges for your GitHub repositories and websites.",
            icon: <Code2 className="h-8 w-8" />,
            href: "/badge",
            color: "text-[#7CFF4F]",
            bgColor: "bg-[#7CFF4F]/20",
          },
          {
            title: "TECHNICAL DOCUMENTATION",
            desc: "Complete guide to using ANPU CLI and web interface.",
            icon: <Server className="h-8 w-8" />,
            href: "/docs",
            color: "text-[#FFB000]",
            bgColor: "bg-[#FFB000]/20",
          },
          {
            title: "API INTERFACE",
            desc: "REST API documentation for programmatic access to ANPU security intelligence.",
            icon: <Search className="h-8 w-8" />,
            href: "/api",
            color: "text-[#FFD200]",
            bgColor: "bg-[#FFD200]/20",
          },
        ].map((module, i) => (
          <Card
            key={i}
            className="p-6 border-border hover:border-primary/30 transition-all cursor-pointer"
            onClick={() => window.location.href = module.href}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${module.bgColor}`}>
                <span className={`text-2xl ${module.color}`}>{module.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground">{module.desc}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </Card>
        ))}
      </div>

      {/* Archive Modules Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          {
            title: "PROJECT ARCHIVE",
            desc: "Learn about ANPU's origin, mission, and development history.",
            icon: <FileText className="h-8 w-8" />,
            href: "/about",
            color: "text-[#C89B3C]",
            bgColor: "bg-[#C89B3C]/20",
          },
          {
            title: "SOURCE ARCHIVE",
            desc: "View the ANPU repository on GitHub and contribute to the project.",
            icon: <GitBranch className="h-8 w-8" />,
            href: "/github",
            color: "text-[#C89B3C]",
            bgColor: "bg-[#C89B3C]/20",
          },
        ].map((module, i) => (
          <Card
            key={i}
            className="p-6 border-border hover:border-primary/30 transition-all cursor-pointer"
            onClick={() => window.location.href = module.href}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${module.bgColor}`}>
                <span className={`text-2xl ${module.color}`}>{module.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground">{module.desc}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </Card>
        ))}
      </div>

      {/* System Status Footer */}
      <Card className="p-6 border-amber/30 bg-amber/5 text-center">
        <p className="text-amber mb-2">
          ⚠️ DEMO MODE
        </p>
        <p className="text-sm text-muted-foreground">
          This is the ANPU Security Intelligence System visualization. 
          The web interface uses mock data and does not perform live scans. 
          Use the CLI for actual security analysis.
        </p>
      </Card>
    </div>
  );
}

export default HomePage;
