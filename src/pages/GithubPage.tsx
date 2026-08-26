import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Code2, Bug, GitBranch, Star, BookOpen } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GithubPage() {

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> BACK HOME
      </Link>

      {/* Module Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Code2 className="h-10 w-10 text-primary" />
          <PharaohGuardian size={48} state="stable" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          ANPU // ARCHIVE // SOURCE
        </h1>
        <p className="mt-3 text-muted-foreground">
          Source code repository and development archive.
        </p>
      </div>

      {/* Project Status Panel */}
      <Card className="p-6 mb-6 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          PROJECT STATUS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "SOURCE", value: "PUBLIC", color: "text-[#7CFF4F]" },
            { label: "LANGUAGE", value: "GO", color: "text-[#FFB000]" },
            { label: "LICENSE", value: "MIT", color: "text-muted-foreground" },
            { label: "STATUS", value: "ACTIVE", color: "text-[#7CFF4F]" },
          ].map((stat, i) => (
            <Card key={i} className="p-4 bg-muted/20 border-border/30 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </Card>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <Card className="p-4 mb-6 border-border">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: "01 PROJECT", href: "#project" },
            { label: "02 REPOSITORY", href: "#repository" },
            { label: "03 TECHNOLOGY", href: "#technology" },
            { label: "04 DEVELOPMENT", href: "#development" },
            { label: "05 CONTRIBUTING", href: "#contributing" },
          ].map((item) => (
            <Button
              key={item.href}
              variant="outline"
              size="sm"
              asChild
            >
              <a href={item.href} className="text-xs">
                {item.label}
              </a>
            </Button>
          ))}
        </div>
      </Card>

      {/* Project Section */}
      <section id="project" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              01 PROJECT
            </h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            ANPU (Ancient Pharaoh Intelligence) is an open-source web security scanner 
            built in Go. It performs reconnaissance and security analysis on publicly exposed 
            web assets to identify vulnerabilities and misconfigurations.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The name ANPU is derived from Anubis, the ancient Egyptian god who was the guardian 
            of the dead and protector of tombs. Just as Anubis protected the pharaohs' resting places, 
            ANPU protects your web applications from security threats.
          </p>
        </Card>
      </section>

      {/* Repository Section */}
      <section id="repository" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              02 REPOSITORY
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Repository: <span className="text-primary font-mono">github.com/Marwanmorsy999/anpu</span>
          </p>
          <div className="space-y-4">
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                DESCRIPTION
              </p>
              <p className="text-xs text-muted-foreground">
                Ancient Egyptian web security intelligence system. ANPU performs reconnaissance 
                and security analysis on publicly exposed web assets.
              </p>
            </Card>
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                PRIMARY LANGUAGE
              </p>
              <p className="text-xs text-muted-foreground">
                Go (Golang) - High-performance, statically typed, compiled language
              </p>
            </Card>
          </div>
          <Button size="lg" asChild className="mt-4 w-full sm:w-auto">
            <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              VIEW ON GITHUB
            </a>
          </Button>
        </Card>
      </section>

      {/* Technology Section */}
      <section id="technology" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              03 TECHNOLOGY
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            ANPU is built using modern, performant technologies:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Go", desc: "Core scanning engine - fast, efficient, cross-platform" },
              { name: "React", desc: "Web interface - component-based UI library" },
              { name: "TypeScript", desc: "Type-safe JavaScript for web interface" },
              { name: "Vite", desc: "Modern build tool for fast development" },
              { name: "Tailwind CSS", desc: "Utility-first CSS framework for styling" },
              { name: "shadcn/ui", desc: "Accessible, customizable UI components" },
            ].map((tech, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <p className="text-sm font-semibold text-primary mb-1">{tech.name}</p>
                <p className="text-xs text-muted-foreground">{tech.desc}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Development Section */}
      <section id="development" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              04 DEVELOPMENT
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            ANPU is actively maintained and developed. Contributions are welcome.
          </p>
          <div className="space-y-4">
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                DEVELOPMENT STATUS
              </p>
              <p className="text-xs text-muted-foreground">
                Actively maintained by Marwan Morsy. New features and improvements are 
                regularly added. The project follows semantic versioning.
              </p>
            </Card>
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                RELEASE CADENCE
              </p>
              <p className="text-xs text-muted-foreground">
                Regular releases with bug fixes, new features, and security improvements. 
                Major versions may include breaking changes.
              </p>
            </Card>
          </div>
        </Card>
      </section>

      {/* Contributing Section */}
      <section id="contributing" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              05 CONTRIBUTING
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            We welcome contributions from the community. Here's how you can help:
          </p>
          <div className="space-y-4">
            {[
              {
                title: "REPORT BUGS",
                desc: "Found a bug? Please report it on GitHub Issues with as much detail as possible.",
                icon: <Bug className="h-4 w-4" />,
                href: "https://github.com/Marwanmorsy999/anpu/issues"
              },
              {
                title: "REQUEST FEATURES",
                desc: "Have an idea? Create a feature request on GitHub Issues.",
                icon: <Star className="h-4 w-4" />,
                href: "https://github.com/Marwanmorsy999/anpu/issues"
              },
              {
                title: "SUBMIT CODE",
                desc: "Want to contribute code? Fork the repo, create a branch, and submit a PR.",
                icon: <GitBranch className="h-4 w-4" />,
                href: "https://github.com/Marwanmorsy999/anpu/fork"
              },
            ].map((item, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <div className="flex items-start gap-3">
                  <span className="text-primary">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <Button variant="outline" size="xs" asChild className="mt-3">
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                    <ExternalLink className="h-3 w-3" />
                    {item.title}
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Demo Warning */}
      <Card className="p-4 mb-8 border-amber/30 bg-amber/5">
        <p className="text-amber mb-2">
          ⚠️ NOTE
        </p>
        <p className="text-xs text-muted-foreground">
          This page provides information about the ANPU project. The web interface is a visualization 
          layer - the actual security scanning is performed by the Go CLI.
        </p>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button size="lg" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2">
            <Star className="h-4 w-4" />
            STAR ON GITHUB
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu/fork" target="_blank" rel="noopener noreferrer" className="gap-2">
            <GitBranch className="h-4 w-4" />
            FORK REPOSITORY
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/about" className="gap-2">
            <BookOpen className="h-4 w-4" />
            PROJECT ARCHIVE
          </Link>
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BACK TO TOP
        </Button>
      </div>
    </div>
  );
}

export default GithubPage;
