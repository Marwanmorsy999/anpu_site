import { useState } from "react";
import { Copy, CheckCheck, Terminal, BookOpen, GitBranch, Layers, ExternalLink, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Tab = "docs" | "api" | "about" | "github";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "docs",   label: "Docs",    icon: <BookOpen size={13} /> },
  { id: "api",    label: "API",     icon: <Terminal size={13} /> },
  { id: "about",  label: "About",   icon: <Layers size={13} /> },
  { id: "github", label: "Source",  icon: <GitBranch size={13} /> },
];

function CodeBlock({ code, lang = "sh" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="docs-code-block">
      <div className="docs-code-lang">{lang}</div>
      <button className="docs-copy-btn" onClick={copy}>
        {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
        {copied ? "COPIED" : "COPY"}
      </button>
      <pre>{code}</pre>
    </div>
  );
}

/* ─── DOCS TAB ─── */
function DocsTab() {
  return (
    <div className="dtab-body">
      <section className="docs-section">
        <div className="anpu-eyebrow">01 / INSTALLATION</div>
        <h2 className="docs-section-h2">Get ANPU running</h2>
        <h3 className="docs-h3">Build from source <span className="docs-badge green">RECOMMENDED</span></h3>
        <CodeBlock code={`git clone https://github.com/Marwanmorsy999/anpu\ncd anpu\ngo build -o anpu ./cmd/anpu\n./anpu --help`} />
        <p className="docs-p">Requires Go 1.25+. Dependencies locked in <code>go.mod</code> / <code>go.sum</code>.</p>
        <h3 className="docs-h3">Docker</h3>
        <CodeBlock code={`docker build -t anpu .\ndocker run --rm -v "$(pwd)/reports:/reports" anpu scan https://example.com --output /reports`} />
        <h3 className="docs-h3">Verify</h3>
        <CodeBlock code={`./anpu --version\n./anpu tools`} />
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">02 / QUICK START</div>
        <h2 className="docs-section-h2">First scan</h2>
        <CodeBlock code={`# Default safe profile — passive\n./anpu scan https://example.com\n\n# Standard — adds active checks\n./anpu scan https://example.com --profile standard\n\n# Deep — full analysis\n./anpu scan https://example.com --profile deep`} />
        <div className="docs-terminal-output">
          <div className="docs-terminal-bar">// SAMPLE OUTPUT</div>
          <pre>{`ANPU Web Security Intelligence\n\nTarget: https://example.com\n\nRecon ✓  TLS ✓  Headers ✓  Cookies ✓  Endpoints ✓\n\nCRITICAL 0  HIGH 0  MEDIUM 2  LOW 5  INFO 11\n\nRisk Score: 3.4/10  Grade: A\nReport: ./reports/example.com-2026-01-01.html`}</pre>
        </div>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">03 / CLI REFERENCE</div>
        <h2 className="docs-section-h2">Commands &amp; flags</h2>
        <div className="docs-cmd-grid">
          {[
            ["anpu scan https://example.com",                    "Run safe profile (default)"],
            ["anpu scan <url> --profile standard",              "Standard — adds active checks"],
            ["anpu scan <url> --profile deep",                  "Deep — full discovery"],
            ["anpu scan <url> --json --sarif",                  "JSON + SARIF 2.1.0 output"],
            ["anpu scan <url> --fail-on high",                  "Exit non-zero on high/critical"],
            ["anpu scan <url> --output ./reports",              "Set output directory"],
            ["anpu history",                                     "List previous scans"],
            ["anpu show scan-1234567890-1",                     "Display a past scan"],
            ["anpu diff scan-old scan-new",                     "Compare two scans"],
            ["anpu tools",                                       "Show integrations status"],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="docs-cmd-row">
              <div className="docs-cmd-code"><span className="docs-prompt">$</span> {cmd}</div>
              <div className="docs-cmd-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">04 / CONFIGURATION</div>
        <h2 className="docs-section-h2">anpu.yaml</h2>
        <CodeBlock lang="yaml" code={`target:\n  url: https://example.com\n\nscan:\n  profile: safe   # safe | standard | deep\n\nreport:\n  html: true\n  json: true\n  sarif: false`} />
        <p className="docs-p">CLI flags override config file values. Config overrides profile defaults.</p>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">05 / CI/CD</div>
        <h2 className="docs-section-h2">GitHub Actions</h2>
        <CodeBlock lang="yaml" code={`name: ANPU Security Scan\non:\n  push:\n    branches: [main]\njobs:\n  scan:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-go@v5\n        with:\n          go-version: '1.25'\n      - run: go build -o anpu ./cmd/anpu\n      - run: |\n          ./anpu scan https://staging.example.com \\\n            --profile standard \\\n            --fail-on high \\\n            --sarif --output ./reports\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: anpu-sarif\n          path: ./reports/*.sarif`} />
      </section>
    </div>
  );
}

/* ─── API TAB ─── */
const ENDPOINTS = [
  { method: "POST",   path: "/api/v1/scan",           desc: "Start a scan. Returns scan ID.", body: `{"url":"https://example.com","profile":"standard"}`, response: `202 Accepted\n{"id":"scan-1748291837-1","status":"queued"}` },
  { method: "GET",    path: "/api/v1/scan/:id/status", desc: "Poll scan progress.",             body: null, response: `200 OK\n{"id":"...","status":"running","progress":65,"stage":"headers"}` },
  { method: "GET",    path: "/api/v1/scan/:id",        desc: "Get full scan result.",           body: null, response: `200 OK\n{"score":3.4,"grade":"A","findings":{"critical":0,"high":0,"medium":2}}` },
  { method: "GET",    path: "/api/v1/scans",           desc: "List scan history.",              body: null, response: `200 OK\n{"total":42,"scans":[...]}` },
  { method: "DELETE", path: "/api/v1/scan/:id",        desc: "Delete a scan from history.",     body: null, response: `204 No Content` },
];
const METHOD_COLOR: Record<string, string> = { GET: "var(--crt-green-1)", POST: "var(--egypt-gold-1)", DELETE: "#FF4444" };

function ApiTab() {
  const [open, setOpen] = useState<string | null>("POST /api/v1/scan");
  return (
    <div className="dtab-body">
      <section className="docs-section">
        <div className="anpu-eyebrow">// STATUS</div>
        <h2 className="docs-section-h2">REST Interface</h2>
        <div className="api-status-badge">
          <span style={{ color: "#FF8C00" }}>⚠</span>
          API not yet externally available — documenting the intended interface.
        </div>
        <p className="docs-p" style={{ marginTop: "1rem" }}>
          ANPU is CLI-first. Use <Link to="/scan" className="docs-link">the web scanner</Link> or the CLI directly.
          This documents the planned programmatic HTTP layer.
        </p>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">// ENDPOINTS</div>
        <h2 className="docs-section-h2">HTTP Reference</h2>
        <CodeBlock code="https://anpu.example/api/v1" lang="base url" />
        <div className="api-endpoints-list" style={{ marginTop: "1rem" }}>
          {ENDPOINTS.map(ep => {
            const key = `${ep.method} ${ep.path}`;
            const isOpen = open === key;
            return (
              <div key={key} className={`api-endpoint-card ${isOpen ? "is-open" : ""}`}>
                <button className="api-endpoint-head" onClick={() => setOpen(isOpen ? null : key)}>
                  <span className="api-method" style={{ color: METHOD_COLOR[ep.method] }}>{ep.method}</span>
                  <code className="api-path">{ep.path}</code>
                  <span className="api-chevron">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="api-endpoint-body">
                    <p className="docs-p" style={{ marginBottom: "0.75rem" }}>{ep.desc}</p>
                    {ep.body && <><div className="anpu-eyebrow" style={{ fontSize: "0.58rem", marginBottom: "0.3rem" }}>BODY</div><CodeBlock code={ep.body} lang="json" /></>}
                    <div className="anpu-eyebrow" style={{ fontSize: "0.58rem", marginBottom: "0.3rem", marginTop: ep.body ? "0.75rem" : 0 }}>RESPONSE</div>
                    <CodeBlock code={ep.response} lang="http" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">// STATUS CODES</div>
        <h2 className="docs-section-h2">HTTP Status Reference</h2>
        <div className="docs-table-wrap">
          <table className="docs-table">
            <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
            <tbody>
              {[["200","Success"],["202","Scan queued"],["204","Deleted"],["400","Bad request / invalid URL"],["404","Scan ID not found"],["409","Scan already running for this target"],["429","Too many concurrent scans"],["500","Internal scanner failure"]].map(([c, m]) => (
                <tr key={c}><td><code style={{ color: c.startsWith("2") ? "var(--crt-green-1)" : "#FF8C00" }}>{c}</code></td><td style={{ color: "#94a3b8" }}>{m}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ─── ABOUT TAB ─── */
const MODULES = [
  { name: "Recon",      scope: "All",          active: "Passive", desc: "DNS, robots.txt, sitemap, redirects, source-map exposure" },
  { name: "Technology", scope: "All",          active: "Passive", desc: "Web servers, frameworks, CDNs, JS libraries" },
  { name: "TLS",        scope: "All",          active: "Passive", desc: "Certificate, protocol version, HSTS, HTTPS redirect" },
  { name: "Headers",    scope: "All",          active: "Passive", desc: "CSP, X-Frame-Options, Referrer-Policy, disclosure headers" },
  { name: "Cookies",    scope: "All",          active: "Passive", desc: "Secure, HttpOnly, SameSite attribute analysis" },
  { name: "Endpoints",  scope: "All",          active: "Passive", desc: "Links, forms, scripts, API paths — normalized" },
  { name: "Subdomains", scope: "Standard+",    active: "Active",  desc: "Certificate Transparency + DNS enumeration" },
  { name: "Secrets",    scope: "Standard+",    active: "Active",  desc: "API key and token pattern detection" },
  { name: "CORS",       scope: "Standard+",    active: "Active",  desc: "Wildcard, reflection, credential behavior" },
  { name: "PortScan",   scope: "Deep",         active: "Active",  desc: "TCP connect scan on common service ports" },
  { name: "Dirs",       scope: "Standard+",    active: "Active",  desc: "Sensitive-path probing with soft-404 filtering" },
  { name: "Methods",    scope: "Standard+",    active: "Active",  desc: "HTTP method auditing — OPTIONS, TRACE" },
  { name: "Nuclei",     scope: "Standard+",    active: "Active",  desc: "Optional external vulnerability templates" },
];

function AboutTab() {
  return (
    <div className="dtab-body">
      <section className="docs-section">
        <div className="anpu-eyebrow">// WHAT ANPU IS</div>
        <h2 className="docs-section-h2">Local-first security scanner</h2>
        <p className="docs-p">
          ANPU orchestrates passive and active analyzers, normalizes findings into one evidence-backed model,
          deduplicates overlapping signals, scores deterministically, and produces HTML/JSON/SARIF reports.
          No cloud backend. No telemetry. No account required.
        </p>
        <div className="about-status-strip" style={{ marginTop: "1rem", border: "1px solid #1a4a1a" }}>
          {[["ENGINE","Go 1.25+"],["LICENSE","Apache-2.0"],["STORAGE","SQLite local"],["TELEMETRY","None"],["OUTPUTS","HTML / JSON / SARIF"]].map(([l, v]) => (
            <div key={l} className="about-status-item">
              <span className="about-status-label">{l}</span>
              <span className="about-status-val" style={{ color: "var(--crt-green-2)" }}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">// ENGINE MODULES</div>
        <h2 className="docs-section-h2">13 analyzer modules</h2>
        <div className="about-module-grid">
          {MODULES.map(({ name, scope, active, desc }) => (
            <div key={name} className="about-module-card">
              <div className="about-module-top">
                <span className="about-module-name">{name}</span>
                <span className="about-module-scope">{scope}</span>
                <span className="about-module-activity" style={{ color: active === "Passive" ? "var(--crt-green-1)" : "var(--egypt-gold-1)" }}>{active}</span>
              </div>
              <p className="about-module-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">// SCORING</div>
        <h2 className="docs-section-h2">Transparent risk scoring</h2>
        <div className="about-scoring-formula">
          <div className="about-formula-label">// FORMULA</div>
          <pre className="about-formula-code">{`Score = (Severity Base × Confidence) + Category Weight\n\nSeverity:   Critical=9.0  High=7.0  Medium=4.5  Low=2.0  Info=0\nConfidence: Confirmed=1.0  High=0.9  Medium=0.75  Low=0.55\nCategory:   Vulnerability+1.0  Auth+0.7  TLS+0.5  Headers+0.1\n\nAggregate = max_finding + volume_bonus (capped at 10.0)`}</pre>
        </div>
      </section>

      <section className="docs-section">
        <div className="about-warning-banner">
          <div className="about-warning-title">⚠ RESPONSIBLE USE</div>
          <p>Only scan targets you own or are explicitly authorized to test. Standard and Deep profiles perform active network requests.</p>
        </div>
      </section>
    </div>
  );
}

/* ─── GITHUB TAB ─── */
const TREE = [
  ["cmd/anpu/",              "CLI entry point (scan, history, show, diff, tools)"],
  ["internal/scanner/",     "Pipeline orchestrator and scanner interface"],
  ["internal/recon/",       "DNS, robots.txt, sitemap, redirects"],
  ["internal/tls/",         "Passive TLS analysis"],
  ["internal/headers/",     "Security headers + cookie analysis"],
  ["internal/endpoints/",   "Endpoint discovery and normalization"],
  ["internal/secrets/",     "Token and key pattern detection"],
  ["internal/scoring/",     "Transparent risk scoring engine"],
  ["internal/storage/",     "SQLite local scan history"],
  ["internal/reporting/",   "HTML / JSON / SARIF report generation"],
  ["pkg/models/",           "Shared scanner-agnostic data model"],
  ["docs/",                 "CLI, config, scanners, scoring, CI/CD docs"],
];

const DOCS_LINKS = [
  ["docs/cli.md",           "CLI Reference"],
  ["docs/configuration.md", "Configuration"],
  ["docs/scanners.md",      "Scanner Reference"],
  ["docs/scoring.md",       "Risk Scoring"],
  ["docs/ci-cd.md",         "CI/CD Integration"],
  ["docs/releases.md",      "Releases & Install"],
  ["CONTRIBUTING.md",       "Contributing"],
  ["SECURITY.md",           "Security Policy"],
];

function GithubTab() {
  return (
    <div className="dtab-body">
      <section className="docs-section">
        <div className="anpu-eyebrow">// REPOSITORY</div>
        <h2 className="docs-section-h2">Marwanmorsy999/anpu</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="anpu-btn-primary" style={{ fontSize: "0.72rem" }}>
            <GitBranch size={13} /> VIEW ON GITHUB
          </a>
          <a href="https://github.com/Marwanmorsy999/anpu/releases" target="_blank" rel="noopener noreferrer" className="anpu-btn-secondary" style={{ fontSize: "0.72rem" }}>
            Releases <ExternalLink size={11} />
          </a>
          <a href="https://github.com/Marwanmorsy999/anpu/issues" target="_blank" rel="noopener noreferrer" className="anpu-btn-ghost" style={{ fontSize: "0.72rem" }}>
            Issues <ExternalLink size={11} />
          </a>
        </div>
        <h3 className="docs-h3">Install</h3>
        <CodeBlock code={`git clone https://github.com/Marwanmorsy999/anpu\ncd anpu && go build -o anpu ./cmd/anpu`} />
        <CodeBlock code={`docker build -t anpu .\ndocker run --rm -v "$(pwd)/reports:/reports" anpu scan https://example.com --output /reports`} lang="docker" />
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">// CODEBASE</div>
        <h2 className="docs-section-h2">Repository structure</h2>
        <div className="github-tree">
          {TREE.map(([path, desc]) => (
            <div key={path} className="github-tree-row">
              <code className="github-tree-path"><span className="github-tree-bullet">├─</span> {path}</code>
              <span className="github-tree-desc">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">// DOCUMENTATION FILES</div>
        <h2 className="docs-section-h2">Reference docs in the repo</h2>
        <div className="github-docs-grid">
          {DOCS_LINKS.map(([file, label]) => (
            <a key={file} href={`https://github.com/Marwanmorsy999/anpu/blob/main/${file}`} target="_blank" rel="noopener noreferrer" className="github-doc-card">
              <div className="github-doc-top">
                <span className="github-doc-label">{label}</span>
                <ExternalLink size={10} style={{ color: "#444" }} />
              </div>
              <code className="github-doc-file">{file}</code>
            </a>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="anpu-eyebrow">// DEVELOPMENT</div>
        <h2 className="docs-section-h2">Contributor workflow</h2>
        <div className="github-dev-block">
          <div className="github-dev-bar">// BUILD + TEST</div>
          {["go build ./...","go vet ./...","go test -v -race ./...","docker build -t anpu ."].map(cmd => (
            <div key={cmd} className="github-dev-line"><span className="docs-prompt">$</span> {cmd}</div>
          ))}
        </div>
        <p className="docs-p" style={{ marginTop: "1rem" }}>
          Read <a href="https://github.com/Marwanmorsy999/anpu/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="docs-link">CONTRIBUTING.md</a> and{" "}
          <a href="https://github.com/Marwanmorsy999/anpu/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="docs-link">SECURITY.md</a> before contributing.
        </p>
      </section>
    </div>
  );
}

/* ─── PAGE SHELL ─── */
export function DocsPage() {
  const [tab, setTab] = useState<Tab>("docs");

  return (
    <div className="docs-shell">
      {/* Header */}
      <div className="docs-header">
        <div className="docs-header-inner">
          <div className="anpu-eyebrow" style={{ marginBottom: "0.5rem" }}>𓁹 ANPU / INTELLIGENCE CENTER</div>
          <h1 className="docs-h1">
            {tab === "docs"   ? "Documentation" :
             tab === "api"    ? "API Reference" :
             tab === "about"  ? "About ANPU" :
             "Source Archive"}
            <span className="anpu-cursor-blink" style={{ fontSize: "0.5em", marginLeft: "0.25em" }}>█</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.75rem" }}>
          <Link to="/scan" className="anpu-btn-primary" style={{ fontSize: "0.72rem" }}>
            <Shield size={13} /> Run Scanner <ArrowRight size={12} />
          </Link>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="anpu-btn-secondary" style={{ fontSize: "0.72rem" }}>
            <GitBranch size={13} /> GitHub
          </a>
        </div>
      </div>

      {/* Tab bar */}
      <div className="docs-tabbar">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            className={`docs-tab-btn ${tab === id ? "is-active" : ""}`}
            onClick={() => setTab(id)}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="docs-tab-content">
        {tab === "docs"   && <DocsTab />}
        {tab === "api"    && <ApiTab />}
        {tab === "about"  && <AboutTab />}
        {tab === "github" && <GithubTab />}
      </div>
    </div>
  );
}

export default DocsPage;
