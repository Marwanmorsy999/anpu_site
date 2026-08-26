import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, BookOpen, Terminal, Code2, Settings, HelpCircle } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DocsPage() {
  const navItems = [
    { label: "GETTING STARTED", href: "#getting-started" },
    { label: "CLI USAGE", href: "#cli" },
    { label: "CONFIGURATION", href: "#configuration" },
    { label: "INTEGRATIONS", href: "#integrations" },
    { label: "FAQ", href: "#faq" },
  ];

  const cliCommands = [
    { cmd: "anpu scan <url>", desc: "Run a security scan on a target URL" },
    { cmd: "anpu scan --profile deep <url>", desc: "Run a deep scan with more checks" },
    { cmd: "anpu scan --json <url>", desc: "Output results as JSON" },
    { cmd: "anpu version", desc: "Display ANPU version" },
    { cmd: "anpu help", desc: "Show help information" },
  ];

  const configOptions = [
    { name: "Timeout", desc: "Set request timeout (default: 30s)" },
    { name: "Retries", desc: "Set number of retries (default: 3)" },
    { name: "Output", desc: "Set output format (json, markdown, text)" },
    { name: "Verbose", desc: "Enable verbose output" },
  ];

  const faqs = [
    {
      q: "What does ANPU scan for?",
      a: "ANPU performs reconnaissance and security analysis on publicly exposed web assets, including DNS, TLS, security headers, cookies, redirects, robots.txt, sitemap.xml, and technology detection."
    },
    {
      q: "Is ANPU safe to use?",
      a: "Yes. ANPU only performs passive, non-intrusive checks on publicly available information. No active exploitation or intrusion is performed."
    },
    {
      q: "Do I need an API key?",
      a: "No. ANPU is completely open-source and does not require any API keys or authentication."
    },
    {
      q: "Can I self-host ANPU?",
      a: "Yes. ANPU is built in Go and can be self-hosted. The entire codebase is available on GitHub."
    },
    {
      q: "What's the difference between scan profiles?",
      a: "Surface profile is quick and lightweight. Standard is recommended for most use cases. Deep performs comprehensive checks but takes longer."
    },
    {
      q: "How often should I scan?",
      a: "Regular scanning is recommended. Weekly for production systems, daily for active development, and on every CI/CD build."
    },
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
          <BookOpen className="h-10 w-10 text-primary" />
          <PharaohGuardian size={48} state="stable" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          ANPU // DOCUMENTATION
        </h1>
        <p className="mt-3 text-muted-foreground">
          Complete guide to using ANPU web security intelligence.
        </p>
      </div>

      {/* Navigation */}
      <Card className="p-4 mb-6 border-border">
        <div className="flex flex-wrap gap-2 justify-center">
          {navItems.map((item) => (
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

      {/* Getting Started */}
      <section id="getting-started" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            GETTING STARTED
          </h2>
          <div className="space-y-4">
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                INSTALLATION
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Install ANPU using Go:
              </p>
              <pre 
                className="p-3 bg-[#050505] border border-border/50 text-xs text-primary font-mono overflow-x-auto"
                style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
              >
go install github.com/Marwanmorsy999/anpu@latest
</pre>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                QUICK START
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Run your first scan:
              </p>
              <pre 
                className="p-3 bg-[#050505] border border-border/50 text-xs text-primary font-mono overflow-x-auto"
                style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
              >
anpu scan https://example.com
</pre>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                WEB INTERFACE
              </p>
              <p className="text-xs text-muted-foreground">
                Visit the web interface at <span className="text-primary">https://anpu.example</span> to run scans and view reports.
              </p>
            </Card>
          </div>
        </Card>
      </section>

      {/* CLI Usage */}
      <section id="cli" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              CLI USAGE
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            ANPU provides a powerful command-line interface for security scanning.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {cliCommands.map((cmd) => (
              <Card key={cmd.cmd} className="p-4 bg-muted/20 border-border/30">
                <pre 
                  className="text-xs text-primary font-mono mb-2 overflow-x-auto"
                  style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
                >
{cmd.cmd}
                </pre>
                <p className="text-xs text-muted-foreground">{cmd.desc}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Configuration */}
      <section id="configuration" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              CONFIGURATION
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {configOptions.map((opt) => (
              <Card key={opt.name} className="p-4 bg-muted/20 border-border/30">
                <p className="text-sm font-semibold text-foreground mb-1">{opt.name}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Integrations */}
      <section id="integrations" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              INTEGRATIONS
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            ANPU can be integrated into your development workflow.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "CI/CD PIPELINE", desc: "Run ANPU scans in your CI/CD pipeline to catch security issues early." },
              { title: "GITHUB ACTIONS", desc: "Use the ANPU GitHub Action for automated security scanning." },
              { title: "API", desc: "Integrate ANPU into your applications using the REST API." },
              { title: "WEBHOOKS", desc: "Receive notifications when security issues are detected." },
              { title: "SLACK", desc: "Get scan results delivered to your Slack channels." },
              { title: "DISCORD", desc: "Receive security alerts in your Discord server." },
            ].map((int, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <p className="text-sm font-semibold text-primary mb-1">{int.title}</p>
                <p className="text-xs text-muted-foreground">{int.desc}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <p className="text-sm font-semibold text-secondary mb-2">
                  Q: {faq.q}
                </p>
                <p className="text-xs text-muted-foreground">
                  A: {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Additional Resources */}
      <Card className="p-6 mb-8 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          ADDITIONAL RESOURCES
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "GITHUB REPOSITORY",
              href: "https://github.com/Marwanmorsy999/anpu",
              desc: "Source code, issues, and contributions"
            },
            {
              title: "SECURITY BEST PRACTICES",
              href: "https://owasp.org",
              desc: "OWASP guidelines and resources"
            },
            {
              title: "WEB SECURITY",
              href: "https://developer.mozilla.org/en-US/docs/Web/Security",
              desc: "MDN Web Security documentation"
            },
          ].map((res, i) => (
            <Button key={i} variant="outline" size="lg" asChild className="text-left p-4">
              <a href={res.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-start">
                <span className="text-sm font-semibold text-foreground mb-1">{res.title}</span>
                <span className="text-xs text-muted-foreground">{res.desc}</span>
                <ExternalLink className="h-3 w-3 text-primary mt-1" />
              </a>
            </Button>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button size="lg" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            VIEW ON GITHUB
          </a>
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BACK TO TOP
        </Button>
      </div>
    </div>
  );
}

export default DocsPage;
