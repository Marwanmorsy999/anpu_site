import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Info, ShieldCheck, Users, Heart, Award, Clock, GitBranch, BookOpen, Code2 } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AboutPage() {
  const features = [
    { title: "OPEN SOURCE", desc: "Completely free and open-source under MIT License. No hidden costs, no paywalls, no telemetry." },
    { title: "PRIVACY FIRST", desc: "All scans are performed locally or on your infrastructure. No data is sent to third parties." },
    { title: "FAST & ACCURATE", desc: "Optimized for speed without sacrificing accuracy. Built in Go for performance." },
    { title: "EASY TO USE", desc: "Simple CLI and web interface. No complex configuration required to get started." },
    { title: "EXTENSIBLE", desc: "Modular architecture makes it easy to add new checks and features." },
    { title: "CROSS PLATFORM", desc: "Works on Windows, macOS, and Linux. Single binary deployment." },
  ];

  const team = [
    { name: "MARWAN MORSY", role: "CREATOR & MAINTAINER", github: "Marwanmorsy999", commits: 200 },
  ];

  const timeline = [
    { date: "2024.01", event: "ANPU project started - initial concept and design" },
    { date: "2024.03", event: "First public release (v1.0.0) - core scanning engine" },
    { date: "2024.06", event: "Web interface launched - visualization layer" },
    { date: "2025.01", event: "Reached 1000+ GitHub stars" },
    { date: "2025.05", event: "Enterprise features added - team collaboration" },
    { date: "2026.08", event: "Pharaoh Cyber Intelligence Terminal aesthetic - full redesign" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> BACK HOME
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Info className="h-10 w-10 text-primary" />
          <PharaohGuardian size={48} state="awake" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          ANPU ARCHIVE // ORIGIN
        </h1>
        <p className="mt-3 text-muted-foreground">
          The ancient Egyptian web security intelligence system.
        </p>
      </div>

      {/* Project Status */}
      <Card className="p-6 mb-6 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          PROJECT STATUS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "STATUS", value: "ACTIVE", color: "text-[#7CFF4F]" },
            { label: "SOURCE", value: "PUBLIC", color: "text-[#7CFF4F]" },
            { label: "ENGINE", value: "GO", color: "text-[#FFB000]" },
            { label: "LICENSE", value: "MIT", color: "text-muted-foreground" },
            { label: "VERSION", value: "1.x", color: "text-muted-foreground" },
            { label: "STARS", value: "1000+", color: "text-yellow-400" },
            { label: "MAINTAINER", value: "1", color: "text-muted-foreground" },
            { label: "CONTRIBUTORS", value: "5+", color: "text-muted-foreground" },
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
            { label: "01 ORIGIN", href: "#origin" },
            { label: "02 MISSION", href: "#mission" },
            { label: "03 PHILOSOPHY", href: "#philosophy" },
            { label: "04 FEATURES", href: "#features" },
            { label: "05 TEAM", href: "#team" },
            { label: "06 TIMELINE", href: "#timeline" },
            { label: "07 ACKNOWLEDGEMENTS", href: "#acknowledgements" },
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

      {/* Origin */}
      <section id="origin" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              01 ORIGIN
            </h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            ANPU (named after the ancient Egyptian god Anubis, guardian of the dead and protector of tombs) 
            was created to be a modern guardian of web security. Just as Anubis protected the pharaohs' tombs 
            from intruders and ensured safe passage to the afterlife, ANPU protects your web applications from 
            security vulnerabilities and ensures safe operation in the digital realm.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-3">
            The name ANPU is derived from the ancient Egyptian name for Anubis, connecting the ancient world's 
            concepts of protection and judgment with modern cybersecurity needs.
          </p>
        </Card>
      </section>

      {/* Mission */}
      <section id="mission" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              02 MISSION
            </h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our mission is to make web security accessible to everyone. We believe that security should not be 
            a luxury reserved for large corporations with deep pockets and dedicated security teams. 
            ANPU is our contribution to making the web a safer place for all developers, organizations, and users.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-3">
            By providing a free, open-source, and easy-to-use security scanning tool, we empower developers to 
            identify and fix security issues before they can be exploited by malicious actors.
          </p>
        </Card>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              03 PHILOSOPHY
            </h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We believe in transparency, privacy, and empowering developers. ANPU is built on the principles of 
            open-source software: freedom to use, study, modify, and share. These principles are non-negotiable.
          </p>
          <ul className="mt-3 space-y-2">
            {[
              { icon: "🔓", text: "No telemetry, tracking, or data collection" },
              { icon: "💾", text: "All scan data stays on your infrastructure" },
              { icon: "📜", text: "Source code is always available and auditable" },
              { icon: "🆓", text: "Free to use for any purpose, including commercial" },
              { icon: "🤝", text: "Community-driven development and support" },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Features */}
      <section id="features" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              04 CORE FEATURES
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <p className="text-sm font-semibold text-primary mb-2">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Team */}
      <section id="team" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              05 THE TEAM
            </h2>
          </div>
          <div className="space-y-4">
            {team.map((member, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    <p className="text-xs text-muted-foreground/70">{member.commits} commits</p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 mt-4 text-center">
            Contributions welcome. See CONTRIBUTING.md on GitHub.
          </p>
        </Card>
      </section>

      {/* Timeline */}
      <section id="timeline" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              06 PROJECT TIMELINE
            </h2>
          </div>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <div className="flex items-center gap-4">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold">
                    {item.date}
                  </span>
                  <p className="text-xs text-muted-foreground">{item.event}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Statistics */}
      <Card className="p-6 mb-8 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            PROJECT STATISTICS
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "STARS", value: "1,000+", icon: <Award className="h-4 w-4" /> },
            { label: "FORKS", value: "100+", icon: <GitBranch className="h-4 w-4" /> },
            { label: "CONTRIBUTORS", value: "5+", icon: <Users className="h-4 w-4" /> },
            { label: "RELEASES", value: "20+", icon: <Clock className="h-4 w-4" /> },
          ].map((stat, i) => (
            <Card key={i} className="p-4 bg-muted/20 border-border/30 text-center">
              <div className="text-primary mb-1">{stat.icon}</div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </Card>

      {/* Acknowledgements */}
      <section id="acknowledgements" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              07 ACKNOWLEDGEMENTS
            </h2>
          </div>
          <div className="space-y-4">
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                OPEN SOURCE COMMUNITY
              </p>
              <p className="text-xs text-muted-foreground">
                ANPU stands on the shoulders of giants. We would like to thank all the open-source projects 
                that have inspired us and made this project possible. Special thanks to the Go community, 
                React community, Vite, Tailwind CSS, and all the amazing open-source security tools that have 
                paved the way.
              </p>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                CONTRIBUTORS
              </p>
              <p className="text-xs text-muted-foreground">
                Thank you to everyone who has contributed to ANPU through code, bug reports, feature requests, 
                and feedback. Your contributions are what make ANPU better every day.
              </p>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                USERS
              </p>
              <p className="text-xs text-muted-foreground">
                Thank you to all our users for trusting ANPU with their security needs. Your feedback and 
                support motivate us to continue improving and adding new features.
              </p>
            </Card>
          </div>
        </Card>
      </section>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button size="lg" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            VIEW ON GITHUB
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/docs" className="gap-2">
            <BookOpen className="h-4 w-4" />
            DOCUMENTATION
          </Link>
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BACK TO TOP
        </Button>
      </div>
    </div>
  );
}

export default AboutPage;
