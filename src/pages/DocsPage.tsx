import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, BookOpen, Terminal, Code2, Settings, HelpCircle, FileText, Server, ShieldCheck, GitBranch, Clock } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DocsPage() {
  const cliCommands = [
    { cmd: "anpu scan <url>", desc: "Run a security scan on a target URL using the standard profile." },
    { cmd: "anpu scan --profile surface <url>", desc: "Run a quick surface-level scan with basic checks." },
    { cmd: "anpu scan --profile standard <url>", desc: "Run a comprehensive scan with recommended checks." },
    { cmd: "anpu scan --profile deep <url>", desc: "Run an exhaustive scan with all available checks." },
    { cmd: "anpu scan --json <url>", desc: "Output scan results as JSON for programmatic processing." },
    { cmd: "anpu scan --timeout 60 <url>", desc: "Set a custom timeout of 60 seconds for the scan." },
    { cmd: "anpu version", desc: "Display the ANPU version information." },
    { cmd: "anpu help", desc: "Show complete help information and usage examples." },
  ];

  const configOptions = [
    { name: "Timeout", type: "number", default: "30", desc: "Request timeout in seconds. Maximum: 300." },
    { name: "Retries", type: "number", default: "3", desc: "Number of retry attempts for failed requests. Maximum: 5." },
    { name: "Output", type: "string", default: "text", desc: "Output format: json, markdown, or text." },
    { name: "Verbose", type: "boolean", default: "false", desc: "Enable verbose output with detailed information." },
    { name: "Concurrency", type: "number", default: "10", desc: "Maximum concurrent requests. Adjust based on target sensitivity." },
  ];

  const faqs = [
    {
      q: "What does ANPU scan for?",
      a: "ANPU performs reconnaissance and security analysis on publicly exposed web assets. This includes DNS configuration, TLS/SSL setup, security headers, cookie settings, redirect chains, robots.txt, sitemap.xml, and technology detection. It identifies misconfigurations and vulnerabilities that could be exploited by attackers."
    },
    {
      q: "Is ANPU safe to use?",
      a: "Yes, ANPU is completely safe. It only performs passive, non-intrusive checks on publicly available information. No active exploitation, intrusion, or denial-of-service attacks are performed. ANPU reads what any web browser or search engine can see."
    },
    {
      q: "Do I need an API key or account?",
      a: "No. ANPU is completely open-source and does not require any API keys, accounts, or authentication. You can download the binary and run it immediately without any setup or registration."
    },
    {
      q: "Can I self-host ANPU?",
      a: "Yes, ANPU is built in Go and compiles to a single static binary. You can self-host it on any infrastructure. The entire codebase is available on GitHub under the MIT License."
    },
    {
      q: "What is the difference between scan profiles?",
      a: "The Surface profile performs quick, lightweight checks and is ideal for rapid assessments. The Standard profile is recommended for most use cases and performs comprehensive checks. The Deep profile performs exhaustive analysis but takes significantly longer to complete."
    },
    {
      q: "How often should I scan my applications?",
      a: "Regular scanning is recommended. We suggest weekly scans for production systems, daily scans for active development environments, and automated scans on every CI/CD build or deployment."
    },
    {
      q: "Does ANPU store my scan data?",
      a: "No. When you use the CLI, all scan data remains on your local machine. The web interface demo uses mock data and does not perform actual scans or store any information."
    },
    {
      q: "Can ANPU detect all vulnerabilities?",
      a: "No security tool can detect all vulnerabilities. ANPU focuses on publicly exposed web application security issues. It should be used as part of a comprehensive security program that includes code analysis, penetration testing, and security monitoring."
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
        <Badge variant="outline" className="mt-4 text-muted-foreground border-muted-foreground/30">
          CLI DOCUMENTATION
        </Badge>
      </div>

      {/* Navigation */}
      <Card className="p-4 mb-6 border-border sticky top-20 z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: "01 GETTING STARTED", href: "#getting-started", icon: <ShieldCheck className="h-3 w-3" /> },
            { label: "02 CLI USAGE", href: "#cli", icon: <Terminal className="h-3 w-3" /> },
            { label: "03 CONFIGURATION", href: "#configuration", icon: <Settings className="h-3 w-3" /> },
            { label: "04 INTEGRATIONS", href: "#integrations", icon: <Server className="h-3 w-3" /> },
            { label: "05 FAQ", href: "#faq", icon: <HelpCircle className="h-3 w-3" /> },
          ].map((item) => (
            <Button
              key={item.href}
              variant="outline"
              size="sm"
              asChild
            >
              <a href={item.href} className="text-xs flex items-center gap-1.5">
                {item.icon}
                {item.label}
              </a>
            </Button>
          ))}
        </div>
      </Card>

      {/* Getting Started */}
      <section id="getting-started" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">01</span>
            <h2 className="text-xl font-semibold text-foreground">
              GETTING STARTED
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            ANPU is a command-line security scanner. This documentation covers installation, basic usage, and advanced configuration.
          </p>
          
          <div className="space-y-4">
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                INSTALLATION
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Install ANPU using Go (requires Go 1.20+):
              </p>
              <pre 
                className="p-3 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
                style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
              >
go install github.com/Marwanmorsy999/anpu@latest
              </pre>
              <p className="text-xs text-muted-foreground/70 mt-2">
                The binary will be installed to $GOPATH/bin. Make sure this directory is in your PATH.
              </p>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                VERIFY INSTALLATION
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Check that ANPU is installed correctly:
              </p>
              <pre 
                className="p-3 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
                style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
              >
anpu version
              </pre>
              <p className="text-xs text-muted-foreground/70 mt-2">
                This will display the current version of ANPU.
              </p>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                QUICK START
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Run your first security scan:
              </p>
              <pre 
                className="p-3 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
                style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
              >
anpu scan https://example.com
              </pre>
              <p className="text-xs text-muted-foreground/70 mt-2">
                This will run a standard scan on example.com and display the results in your terminal.
              </p>
            </Card>
          </div>
        </Card>
      </section>

      {/* CLI Usage */}
      <section id="cli" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">02</span>
            <h2 className="text-xl font-semibold text-foreground">
              CLI USAGE
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            ANPU provides a simple yet powerful command-line interface for security scanning.
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
          
          <Card className="p-4 bg-muted/20 border-border/30 mt-6">
            <p className="text-sm font-semibold text-secondary mb-2">
              COMMON FLAGS
            </p>
            <pre 
              className="p-3 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
              style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
            >
# Profile selection
anpu scan --profile surface https://example.com   # Quick scan
anpu scan --profile standard https://example.com  # Recommended
anpu scan --profile deep https://example.com      # Comprehensive

# Output format
anpu scan --json https://example.com      # JSON output
anpu scan --markdown https://example.com  # Markdown output

# Customization
anpu scan --timeout 60 https://example.com    # 60 second timeout
anpu scan --retries 5 https://example.com     # 5 retry attempts
anpu scan --verbose https://example.com        # Verbose output
            </pre>
          </Card>
        </Card>
      </section>

      {/* Configuration */}
      <section id="configuration" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">03</span>
            <h2 className="text-xl font-semibold text-foreground">
              CONFIGURATION
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Configure ANPU's behavior through command-line flags. All flags have sensible defaults.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {configOptions.map((opt) => (
              <Card key={opt.name} className="p-4 bg-muted/20 border-border/30">
                <p className="text-sm font-semibold text-foreground mb-1">{opt.name}</p>
                <p className="text-xs text-muted-foreground/70 mb-1">Type: {opt.type} | Default: {opt.default}</p>
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
            <span className="text-2xl">04</span>
            <h2 className="text-xl font-semibold text-foreground">
              INTEGRATIONS
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Integrate ANPU into your development workflow and security pipelines.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "CI/CD PIPELINE",
                desc: "Run ANPU scans in your CI/CD pipeline to catch security issues early in the development cycle.",
                icon: <Server className="h-4 w-4" />
              },
              {
                title: "GITHUB ACTIONS",
                desc: "Use the ANPU GitHub Action (planned) for automated security scanning on every push and pull request.",
                icon: <GitBranch className="h-4 w-4" />
              },
              {
                title: "LOCAL DEVELOPMENT",
                desc: "Run scans locally during development to catch issues before committing code.",
                icon: <Code2 className="h-4 w-4" />
              },
              {
                title: "SCHEDULED SCANS",
                desc: "Set up cron jobs or scheduled tasks to run regular scans on production systems.",
                icon: <Clock className="h-4 w-4" />
              },
              {
                title: "SECURITY MONITORING",
                desc: "Integrate with your monitoring stack to track security posture over time.",
                icon: <ShieldCheck className="h-4 w-4" />
              },
              {
                title: "REPORT EXPORT",
                desc: "Export results as JSON, Markdown, or text for integration with other tools.",
                icon: <FileText className="h-4 w-4" />
              },
            ].map((int, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <div className="text-primary mb-2">{int.icon}</div>
                <p className="text-sm font-semibold text-primary mb-2">{int.title}</p>
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
            <span className="text-2xl">05</span>
            <h2 className="text-xl font-semibold text-foreground">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Common questions about ANPU's functionality, safety, and usage.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <p className="text-sm font-semibold text-foreground mb-2">
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
              desc: "Source code, issues, and contributions",
              icon: <Code2 className="h-4 w-4" />
            },
            {
              title: "SECURITY BEST PRACTICES",
              href: "https://owasp.org",
              desc: "OWASP guidelines and resources",
              icon: <ShieldCheck className="h-4 w-4" />
            },
            {
              title: "WEB SECURITY",
              href: "https://developer.mozilla.org/en-US/docs/Web/Security",
              desc: "MDN Web Security documentation",
              icon: <BookOpen className="h-4 w-4" />
            },
          ].map((res, i) => (
            <Button key={i} variant="outline" size="lg" asChild className="text-left p-4">
              <a href={res.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3">
                <span className="text-primary">{res.icon}</span>
                <div>
                  <span className="text-sm font-semibold text-foreground">{res.title}</span>
                  <br />
                  <span className="text-xs text-muted-foreground">{res.desc}</span>
                </div>
                <ExternalLink className="h-3 w-3 text-primary mt-1 ml-auto" />
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
        <Button variant="outline" size="lg" asChild>
          <Link to="/api" className="gap-2">
            <Server className="h-4 w-4" />
            API REFERENCE
          </Link>
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BACK TO TOP
        </Button>
      </div>
    </div>
  );
}

export default DocsPage;
