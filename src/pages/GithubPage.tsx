import { GitBranch, Star, GitFork, Code2, FileText, Users, Scale, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function GithubPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 mb-4 gold-glow">
          <GitBranch className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">ANPU on GitHub</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Open-source, built in Go, developed in the open.
        </p>
      </div>

      {/* Repo card */}
      <Card className="p-6 lg:p-8 bg-card/40 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-mono text-foreground">anpu/anpu</span>
          </div>
          <Badge variant="outline" className="text-primary border-primary/30">Go</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          ANPU — Web Security Intelligence. An open-source security scanning engine for analyzing
          publicly exposed website security posture.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Star className="h-4 w-4" /> 1.2k stars</span>
          <span className="flex items-center gap-1.5"><GitFork className="h-4 w-4" /> 87 forks</span>
          <span className="flex items-center gap-1.5"><Code2 className="h-4 w-4" /> Go</span>
        </div>
        <div className="mt-6">
          <Button size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="gap-2">
              <GitBranch className="h-4 w-4" />
              View ANPU on GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </Card>

      {/* Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {[
          { icon: Code2, title: "Source Code", desc: "Browse the Go scanning engine" },
          { icon: FileText, title: "Documentation", desc: "Guides and API references" },
          { icon: Users, title: "Contributing", desc: "How to contribute to ANPU" },
          { icon: Scale, title: "License", desc: "MIT License" },
          { icon: Star, title: "Star the Repo", desc: "Support the project" },
          { icon: GitFork, title: "Fork", desc: "Build your own version" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-4 bg-card/40 hover:bg-card/70 hover:border-primary/30 transition-all">
              <Icon className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </Card>
          );
        })}
      </div>

      <div className="p-3 rounded-md border border-yellow-500/20 bg-yellow-500/5 flex gap-2.5">
        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 shrink-0">Example</Badge>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Repository statistics shown are illustrative. Visit the actual GitHub repository for real data.
        </p>
      </div>
    </div>
  );
}
