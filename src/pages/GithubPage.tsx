import { ExternalLink, GitBranch, GitCommit, GitPullRequest, Star, Terminal, Package, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const REPO_STRUCTURE = [
  { path: "cmd/anpu/", desc: "CLI entry point (scan, history, show, diff, tools)" },
  { path: "internal/scanner/", desc: "Scanner interface, target validation, pipeline orchestrator" },
  { path: "internal/diff/", desc: "Historical scan comparison and attack-surface change detection" },
  { path: "internal/recon/", desc: "DNS, robots.txt, sitemap.xml, redirects" },
  { path: "internal/http/", desc: "Shared HTTP client and SSRF/redirect guards" },
  { path: "internal/technology/", desc: "Technology fingerprinting" },
  { path: "internal/tls/", desc: "Passive TLS analysis" },
  { path: "internal/headers/", desc: "Security headers + cookie analysis" },
  { path: "internal/endpoints/", desc: "Endpoint discovery / normalization" },
  { path: "internal/subdomains/", desc: "Subdomain enumeration" },
  { path: "internal/portscan/", desc: "TCP connect port scanning" },
  { path: "internal/dirs/", desc: "Sensitive-path discovery and soft-404 filtering" },
  { path: "internal/secrets/", desc: "Token / key pattern detection" },
  { path: "internal/cors/", desc: "CORS auditing" },
  { path: "internal/methods/", desc: "HTTP method auditing" },
  { path: "internal/findings/", desc: "Deduplication engine" },
  { path: "internal/scoring/", desc: "Transparent risk scoring" },
  { path: "internal/storage/", desc: "SQLite persistence for scan history" },
  { path: "internal/integrations/", desc: "Nuclei integration + prepared ZAP interface" },
  { path: "internal/reporting/", desc: "JSON / SARIF / HTML generation and terminal UI" },
  { path: "internal/config/", desc: "YAML config loading and CLI-flag resolution" },
  { path: "pkg/models/", desc: "Shared scanner-agnostic data model" },
  { path: "docs/", desc: "CLI, configuration, scanner, development, release, scoring, CI/CD docs" },
];

const DOCS_LINKS = [
  { file: "docs/cli.md", label: "CLI Reference", desc: "All commands, flags, and examples" },
  { file: "docs/configuration.md", label: "Configuration", desc: "anpu.yaml shape and precedence rules" },
  { file: "docs/scanners.md", label: "Scanner Reference", desc: "Engine matrix, behavior, safety boundary" },
  { file: "docs/scoring.md", label: "Risk Scoring", desc: "Deterministic scoring formula explained" },
  { file: "docs/ci-cd.md", label: "CI/CD Integration", desc: "GitHub Actions example and pipeline setup" },
  { file: "docs/releases.md", label: "Releases", desc: "Install methods, verification, Docker" },
  { file: "docs/development.md", label: "Development", desc: "Contributor workflow, testing, scanner extensions" },
  { file: "CONTRIBUTING.md", label: "Contributing", desc: "How to contribute — start here" },
  { file: "SECURITY.md", label: "Security Policy", desc: "Responsible disclosure and security contacts" },
  { file: "CHANGELOG.md", label: "Changelog", desc: "Release history and migration notes" },
];

const INSTALL_METHODS = [
  {
    label: "Build from source",
    badge: "RECOMMENDED",
    color: "var(--crt-green-1)",
    code: "git clone https://github.com/Marwanmorsy999/anpu\ncd anpu\ngo build -o anpu ./cmd/anpu\n./anpu --help",
  },
  {
    label: "Docker",
    badge: "CONTAINERIZED",
    color: "#2496ED",
    code: "docker build -t anpu .\ndocker run --rm -v \"$(pwd)/reports:/reports\" anpu scan https://example.com --output /reports",
  },
  {
    label: "Pre-built binary",
    badge: "RELEASES PAGE",
    color: "var(--egypt-gold-1)",
    code: "# Download from GitHub Releases\n# Targets: Linux, macOS, Windows — amd64 + arm64\nsha256sum anpu_<version>_linux_amd64.tar.gz\n# Compare with checksums.txt",
  },
];

const DEV_COMMANDS = [
  "gofmt -l $(find . -name '*.go')",
  "go build ./...",
  "go vet ./...",
  "go test -v -race ./...",
  "docker build -t anpu .",
];

export function GithubPage() {
  return (
    <div className="github-shell">

      {/* Header */}
      <div className="github-header">
        <div className="github-header-inner">
          <div className="anpu-eyebrow" style={{ marginBottom: "0.75rem" }}>𓂀 ANPU / SOURCE ARCHIVE</div>
          <h1 className="github-h1">
            Open source.<br />
            <span style={{ color: "var(--crt-green-1)" }}>Apache-2.0.</span>
            <span className="anpu-cursor-blink" style={{ fontSize: "0.5em", marginLeft: "0.3em" }}>█</span>
          </h1>
          <p className="github-subtitle">
            ANPU is built in Go and fully open-source. All scan analysis happens locally —
            no cloud backend, no telemetry, no mandatory account.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
            <a
              href="https://github.com/Marwanmorsy999/anpu"
              target="_blank" rel="noopener noreferrer"
              className="anpu-btn-primary"
              style={{ fontSize: "0.72rem" }}
            >
              <GitBranch size={13} /> VIEW ON GITHUB
            </a>
            <a
              href="https://github.com/Marwanmorsy999/anpu/releases"
              target="_blank" rel="noopener noreferrer"
              className="anpu-btn-secondary"
              style={{ fontSize: "0.72rem" }}
            >
              <Package size={13} /> RELEASES
            </a>
            <a
              href="https://github.com/Marwanmorsy999/anpu/issues"
              target="_blank" rel="noopener noreferrer"
              className="anpu-btn-ghost"
              style={{ fontSize: "0.72rem" }}
            >
              <GitPullRequest size={13} /> ISSUES
            </a>
          </div>
        </div>

        {/* Repo stats */}
        <div className="github-stats-strip">
          {[
            { icon: <GitBranch size={14} />, label: "Repository", value: "Marwanmorsy999/anpu" },
            { icon: <Terminal size={14} />, label: "Language", value: "Go 1.25+" },
            { icon: <Star size={14} />, label: "License", value: "Apache-2.0" },
            { icon: <GitCommit size={14} />, label: "Branch", value: "main" },
            { icon: <Layers size={14} />, label: "Storage", value: "SQLite — local only" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="github-stat-item">
              <span className="github-stat-icon">{icon}</span>
              <div>
                <div className="github-stat-label">{label}</div>
                <div className="github-stat-val">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="github-body">

        {/* Installation */}
        <section className="github-section">
          <div className="anpu-eyebrow">// INSTALLATION</div>
          <h2 className="github-h2">Three ways to install</h2>
          <div className="github-install-grid">
            {INSTALL_METHODS.map(({ label, badge, color, code }) => (
              <div key={label} className="github-install-card" style={{ borderColor: color + "33" }}>
                <div className="github-install-head">
                  <span className="github-install-label" style={{ color }}>{label}</span>
                  <span className="docs-badge" style={{ color, borderColor: color + "55" }}>{badge}</span>
                </div>
                <pre className="github-code-block">{code}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* Repo structure */}
        <section className="github-section">
          <div className="anpu-eyebrow">// REPOSITORY STRUCTURE</div>
          <h2 className="github-h2">Codebase layout</h2>
          <p className="github-p">
            <code>internal/scanner</code> defines the pipeline boundary.
            Concrete analyzers are wired together in <code>cmd/anpu/scan.go</code>.
            The orchestrator works with scanner interfaces rather than hard-coding internals.
          </p>
          <div className="github-tree">
            {REPO_STRUCTURE.map(({ path, desc }) => (
              <div key={path} className="github-tree-row">
                <code className="github-tree-path">
                  <span className="github-tree-bullet">├─</span> {path}
                </code>
                <span className="github-tree-desc">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Documentation index */}
        <section className="github-section">
          <div className="anpu-eyebrow">// DOCUMENTATION</div>
          <h2 className="github-h2">Reference files in the repo</h2>
          <div className="github-docs-grid">
            {DOCS_LINKS.map(({ file, label, desc }) => (
              <a
                key={file}
                href={`https://github.com/Marwanmorsy999/anpu/blob/main/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="github-doc-card"
              >
                <div className="github-doc-top">
                  <span className="github-doc-label">{label}</span>
                  <ExternalLink size={11} style={{ color: "#444", flexShrink: 0 }} />
                </div>
                <code className="github-doc-file">{file}</code>
                <p className="github-doc-desc">{desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Development */}
        <section className="github-section">
          <div className="anpu-eyebrow">// DEVELOPMENT</div>
          <h2 className="github-h2">Contributor workflow</h2>
          <p className="github-p">
            Read <a href="https://github.com/Marwanmorsy999/anpu/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="docs-link">CONTRIBUTING.md</a> and{" "}
            <a href="https://github.com/Marwanmorsy999/anpu/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="docs-link">SECURITY.md</a> first.
            Good starter work is tracked with the <code>good first issue</code> label on GitHub.
          </p>
          <div className="github-dev-block">
            <div className="github-dev-bar">// DEV COMMANDS</div>
            {DEV_COMMANDS.map((cmd) => (
              <div key={cmd} className="github-dev-line">
                <span className="docs-prompt">$</span> {cmd}
              </div>
            ))}
          </div>

          <div className="github-ci-note">
            <div className="anpu-eyebrow" style={{ marginBottom: "0.5rem", fontSize: "0.6rem" }}>// CI PIPELINE</div>
            <p className="github-p" style={{ marginBottom: 0 }}>
              The repository's CI runs <code>gofmt</code> verification → <code>go build</code> → <code>go vet</code> →{" "}
              <code>go test -v -race</code> → Docker build on every push and pull request to <code>main</code>.
              A separate security workflow builds ANPU, runs it against a controlled Juice Shop target,
              validates the generated SARIF, and uploads reports as artifacts.
            </p>
          </div>
        </section>

        {/* Responsible use */}
        <section className="github-section">
          <div className="about-warning-banner">
            <div className="about-warning-title">⚠ RESPONSIBLE USE</div>
            <p>
              ANPU performs network requests and may perform active discovery depending on the profile.
              <strong> Only scan targets you own or are explicitly authorized to test.</strong>
              Built-in SSRF guardrails reduce accidental harm but do not establish authorization.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="github-cta-row">
          <a
            href="https://github.com/Marwanmorsy999/anpu"
            target="_blank" rel="noopener noreferrer"
            className="about-cta-card"
          >
            <GitBranch size={18} />
            <div>
              <div className="about-cta-title">View Repository</div>
              <div className="about-cta-sub">Marwanmorsy999/anpu on GitHub</div>
            </div>
            <ExternalLink size={13} className="about-cta-arrow" />
          </a>
          <Link to="/docs" className="about-cta-card">
            <Terminal size={18} />
            <div>
              <div className="about-cta-title">Documentation</div>
              <div className="about-cta-sub">Install, configure, and integrate</div>
            </div>
            <ArrowRight size={13} className="about-cta-arrow" />
          </Link>
          <Link to="/scan" className="about-cta-card">
            <Star size={18} />
            <div>
              <div className="about-cta-title">Run a Scan</div>
              <div className="about-cta-sub">Try the web scanner now</div>
            </div>
            <ArrowRight size={13} className="about-cta-arrow" />
          </Link>
        </section>

      </div>
    </div>
  );
}

export default GithubPage;
