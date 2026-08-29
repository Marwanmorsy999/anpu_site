import { useState } from "react";
import { Copy, CheckCheck, Terminal, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const TOC = [
  { id: "install",  label: "01 / INSTALLATION" },
  { id: "quickstart", label: "02 / QUICK START" },
  { id: "cli",     label: "03 / CLI REFERENCE" },
  { id: "profiles", label: "04 / SCAN PROFILES" },
  { id: "config",  label: "05 / CONFIGURATION" },
  { id: "output",  label: "06 / OUTPUT FORMATS" },
  { id: "cicd",    label: "07 / CI/CD" },
];

const SCAN_PROFILES = [
  { name: "safe", badge: "DEFAULT", desc: "Passive and low-impact baseline. DNS, TLS, headers, cookies, endpoints. No active probing.", color: "var(--crt-green-1)" },
  { name: "standard", badge: "RECOMMENDED", desc: "Adds broader active checks: subdomains, secrets, CORS, HTTP methods, Nuclei when available.", color: "var(--egypt-gold-1)" },
  { name: "deep", badge: "ADVANCED", desc: "Adds deeper discovery: DNS brute-force, TCP port scanning, sensitive paths, full active analysis.", color: "#FF8C00" },
];

const CLI_COMMANDS = [
  { cmd: "anpu scan https://example.com", desc: "Run safe profile scan (default)" },
  { cmd: "anpu scan https://example.com --profile standard", desc: "Standard profile with active checks" },
  { cmd: "anpu scan https://example.com --profile deep", desc: "Deep discovery and full active analysis" },
  { cmd: "anpu scan https://example.com --json --sarif", desc: "Machine-readable JSON + SARIF 2.1.0 output" },
  { cmd: "anpu scan https://example.com --fail-on high", desc: "Exit non-zero if high/critical findings found" },
  { cmd: "anpu history", desc: "List previous local scans" },
  { cmd: "anpu history --limit 50", desc: "List up to 50 previous scans" },
  { cmd: "anpu show scan-1234567890-1", desc: "Display a past scan from local history" },
  { cmd: "anpu diff scan-old scan-new", desc: "Compare two historical scans" },
  { cmd: "anpu diff scan-old scan-new --json", desc: "Machine-readable diff output" },
  { cmd: "anpu tools", desc: "Show available engines and integrations" },
];

const SCAN_FLAGS = [
  ["--profile <name>", "safe", "Select safe, standard, or deep"],
  ["--html", "true", "Write HTML report"],
  ["--json", "false", "Write JSON report"],
  ["--sarif", "false", "Write SARIF 2.1.0 report"],
  ["--output <dir>", "./reports", "Output directory for reports"],
  ["--fail-on <severity>", "none", "Exit non-zero at low / medium / high / critical"],
  ["--no-nuclei", "false", "Disable Nuclei for this run"],
  ["--skip-pre-check", "false", "Skip initial connectivity check"],
];

function CodeBlock({ code, copyable = true }: { code: string; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="docs-code-block">
      {copyable && (
        <button className="docs-copy-btn" onClick={copy}>
          {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
          {copied ? "COPIED" : "COPY"}
        </button>
      )}
      <pre>{code}</pre>
    </div>
  );
}

export function DocsPage() {
  const [active, setActive] = useState("install");

  return (
    <div className="docs-shell">
      <div className="docs-header">
        <div className="docs-header-inner">
          <div className="anpu-eyebrow" style={{ marginBottom: "0.75rem" }}>ANPU / DOCUMENTATION</div>
          <h1 className="docs-h1">Operator Reference<span className="anpu-cursor-blink" style={{ fontSize: "0.6em", marginLeft: "0.25em" }}>█</span></h1>
          <p className="docs-subtitle">
            Install ANPU, run your first scan, configure profiles, and integrate into CI/CD pipelines.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <a
              href="https://github.com/Marwanmorsy999/anpu/releases"
              target="_blank" rel="noopener noreferrer"
              className="anpu-btn-primary" style={{ fontSize: "0.72rem" }}
            >
              <Terminal size={13} /> GET RELEASES
            </a>
            <Link to="/api" className="anpu-btn-secondary" style={{ fontSize: "0.72rem" }}>
              API REFERENCE <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <div className="docs-layout">
        {/* TOC */}
        <aside className="docs-toc">
          <div className="docs-toc-label">// CONTENTS</div>
          {TOC.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`docs-toc-link ${active === id ? "is-active" : ""}`}
              onClick={() => setActive(id)}
            >
              <span className="docs-toc-arrow">›</span> {label}
            </a>
          ))}
          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #1a4a1a", background: "#020502" }}>
            <div className="anpu-eyebrow" style={{ marginBottom: "0.5rem", fontSize: "0.58rem" }}>// QUICK INSTALL</div>
            <code style={{ display: "block", fontSize: "0.68rem", color: "var(--crt-green-1)", lineHeight: 1.8 }}>
              git clone github.com/<br />
              Marwanmorsy999/anpu<br />
              cd anpu<br />
              go build -o anpu ./cmd/anpu
            </code>
          </div>
        </aside>

        {/* Main content */}
        <main className="docs-main">

          {/* INSTALLATION */}
          <section id="install" className="docs-section">
            <div className="anpu-eyebrow">01 / INSTALLATION</div>
            <h2 className="docs-section-h2">Get ANPU running</h2>

            <h3 className="docs-h3">Build from source <span className="docs-badge green">RECOMMENDED</span></h3>
            <CodeBlock code={`git clone https://github.com/Marwanmorsy999/anpu\ncd anpu\ngo build -o anpu ./cmd/anpu\n./anpu --help`} />
            <p className="docs-p">Requires Go 1.25+. Dependencies are locked in <code>go.mod</code> / <code>go.sum</code>.</p>

            <h3 className="docs-h3">Pre-built binaries</h3>
            <p className="docs-p">
              Release archives for Linux, Windows, and macOS (amd64 + arm64) are published via GoReleaser on the{" "}
              <a href="https://github.com/Marwanmorsy999/anpu/releases" target="_blank" rel="noopener noreferrer" className="docs-link">
                Releases page
              </a>. Each release includes <code>checksums.txt</code> for verification.
            </p>
            <CodeBlock code={`# Linux amd64 example\nsha256sum anpu_<version>_linux_amd64.tar.gz\n# Compare with checksums.txt`} />

            <h3 className="docs-h3">Docker</h3>
            <CodeBlock code={`docker build -t anpu .\ndocker run --rm -v "$(pwd)/reports:/reports" anpu scan https://example.com --output /reports`} />

            <h3 className="docs-h3">Verify installation</h3>
            <CodeBlock code={`./anpu --version\n./anpu tools`} />
          </section>

          {/* QUICK START */}
          <section id="quickstart" className="docs-section">
            <div className="anpu-eyebrow">02 / QUICK START</div>
            <h2 className="docs-section-h2">First scan</h2>
            <CodeBlock code={`# Default safe profile — passive, low-impact\n./anpu scan https://example.com`} />
            <div className="docs-terminal-output">
              <div className="docs-terminal-bar">// SAMPLE OUTPUT</div>
              <pre>{`        ▄▀█ █▄░█ █▀█ █░█
        █▀█ █░▀█ █▀▀ █▄█
   Web Security Intelligence

Target: https://example.com

Recon              ✓
Technology         ✓
TLS                ✓
Headers            ✓
Cookies            ✓
Endpoints          ✓

Results
CRITICAL     0
HIGH         0
MEDIUM       2
LOW          5
INFO         11

Risk Score: 3.4/10
Report: ./reports/example.com-2026-01-01-120000.html`}</pre>
            </div>
            <p className="docs-p">ANPU stores scan history locally at <code>~/.anpu/anpu.db</code> — no cloud backend required.</p>
          </section>

          {/* CLI REFERENCE */}
          <section id="cli" className="docs-section">
            <div className="anpu-eyebrow">03 / CLI REFERENCE</div>
            <h2 className="docs-section-h2">Commands &amp; flags</h2>
            <p className="docs-p">ANPU exposes five subcommands: <code>scan</code>, <code>history</code>, <code>show</code>, <code>diff</code>, and <code>tools</code>.</p>

            <div className="docs-cmd-grid">
              {CLI_COMMANDS.map(({ cmd, desc }) => (
                <div key={cmd} className="docs-cmd-row">
                  <div className="docs-cmd-code">
                    <span className="docs-prompt">$</span> {cmd}
                  </div>
                  <div className="docs-cmd-desc">{desc}</div>
                </div>
              ))}
            </div>

            <h3 className="docs-h3" style={{ marginTop: "1.5rem" }}>Scan flags</h3>
            <div className="docs-table-wrap">
              <table className="docs-table">
                <thead><tr><th>Flag</th><th>Default</th><th>Purpose</th></tr></thead>
                <tbody>
                  {SCAN_FLAGS.map(([flag, def, purpose]) => (
                    <tr key={flag}>
                      <td><code>{flag}</code></td>
                      <td><code>{def}</code></td>
                      <td>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="docs-h3" style={{ marginTop: "1.5rem" }}>Global flags</h3>
            <div className="docs-table-wrap">
              <table className="docs-table">
                <thead><tr><th>Flag</th><th>Purpose</th></tr></thead>
                <tbody>
                  <tr><td><code>--config &lt;path&gt;</code></td><td>Use a specific YAML config file</td></tr>
                  <tr><td><code>--verbose</code></td><td>Show per-stage finding and warning counts</td></tr>
                  <tr><td><code>--version</code></td><td>Print ANPU version</td></tr>
                  <tr><td><code>--help</code></td><td>Show command help</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* PROFILES */}
          <section id="profiles" className="docs-section">
            <div className="anpu-eyebrow">04 / SCAN PROFILES</div>
            <h2 className="docs-section-h2">Safe · Standard · Deep</h2>
            <p className="docs-p">
              Only use <code>standard</code> and <code>deep</code> profiles against systems you own or are explicitly authorized to test.
            </p>
            <div className="docs-profile-grid">
              {SCAN_PROFILES.map(({ name, badge, desc, color }) => (
                <div key={name} className="docs-profile-card" style={{ borderColor: color + "44" }}>
                  <div className="docs-profile-top">
                    <code className="docs-profile-name" style={{ color }}>{name}</code>
                    <span className="docs-badge" style={{ borderColor: color + "66", color }}>{badge}</span>
                  </div>
                  <p className="docs-p" style={{ marginBottom: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
            <CodeBlock code={`# Profile examples\nanpu scan https://example.com                          # safe (default)\nanpu scan https://example.com --profile standard       # standard\nanpu scan https://example.com --profile deep           # deep\nanpu scan https://example.com --profile deep --no-nuclei  # deep, skip Nuclei`} />
          </section>

          {/* CONFIGURATION */}
          <section id="config" className="docs-section">
            <div className="anpu-eyebrow">05 / CONFIGURATION</div>
            <h2 className="docs-section-h2">anpu.yaml</h2>
            <p className="docs-p">
              ANPU loads <code>anpu.yaml</code> from the current directory, or from a path supplied with <code>--config</code>.
              CLI flags always take precedence over config file values.
            </p>
            <CodeBlock code={`target:\n  url: https://example.com\n\nscan:\n  profile: safe\n\nmodules:\n  recon: true\n  technology: true\n  tls: true\n  headers: true\n  cookies: true\n  endpoints: true\n  subdomains: false   # standard/deep\n  portscan: false     # deep only\n  dirs: false         # standard/deep\n  secrets: false      # standard/deep\n  cors: false         # standard/deep\n  methods: false      # standard/deep\n  nuclei: false       # optional, standard/deep\n\nreport:\n  html: true\n  json: true\n  sarif: false`} />
            <p className="docs-p">Precedence: <code>CLI flags → resolved config → profile defaults → built-in defaults</code></p>
          </section>

          {/* OUTPUT */}
          <section id="output" className="docs-section">
            <div className="anpu-eyebrow">06 / OUTPUT FORMATS</div>
            <h2 className="docs-section-h2">HTML · JSON · SARIF</h2>
            <p className="docs-p">ANPU can write three report formats per scan. Reports include observed evidence and score explanations — no manufactured data.</p>
            <div className="docs-output-grid">
              {[
                { fmt: "HTML", flag: "--html", desc: "Human-readable security review. Includes evidence, scoring breakdowns, and findings with context.", default: "ON" },
                { fmt: "JSON", flag: "--json", desc: "Machine-readable format for automation, downstream processing, and diff comparisons.", default: "OFF" },
                { fmt: "SARIF", flag: "--sarif", desc: "SARIF 2.1.0 compatible with GitHub Code Scanning, security tooling, and CI artifact upload.", default: "OFF" },
              ].map(({ fmt, flag, desc, default: def }) => (
                <div key={fmt} className="docs-output-card">
                  <div className="docs-output-top">
                    <span className="docs-output-fmt">{fmt}</span>
                    <code className="docs-output-flag">{flag}</code>
                    <span className="docs-badge" style={{ color: def === "ON" ? "var(--crt-green-1)" : "#6a6a6a", borderColor: def === "ON" ? "var(--crt-green-dim)" : "#333" }}>{def}</span>
                  </div>
                  <p className="docs-p" style={{ marginBottom: 0, fontSize: "0.8rem" }}>{desc}</p>
                </div>
              ))}
            </div>
            <CodeBlock code={`# Report filenames include target host + timestamp\nreports/example.com-2026-01-01-120000.html\nreports/example.com-2026-01-01-120000.json\nreports/example.com-2026-01-01-120000.sarif\n\n# In CI, glob for the exact name:\nfind ./reports -name "*.sarif"`} />
          </section>

          {/* CI/CD */}
          <section id="cicd" className="docs-section">
            <div className="anpu-eyebrow">07 / CI/CD</div>
            <h2 className="docs-section-h2">Pipeline integration</h2>
            <p className="docs-p">
              ANPU is local-first: no cloud backend, no API key required. Run it directly in any CI runner.
              Use <code>--fail-on high</code> as your security gate.
            </p>
            <h3 className="docs-h3">GitHub Actions</h3>
            <CodeBlock code={`name: ANPU Security Scan\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\npermissions:\n  contents: read\n\njobs:\n  security-scan:\n    runs-on: ubuntu-latest\n    timeout-minutes: 20\n\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-go@v5\n        with:\n          go-version: '1.25'\n\n      - name: Build ANPU\n        run: go build -o anpu ./cmd/anpu\n\n      - name: Run ANPU\n        run: |\n          mkdir -p reports\n          ./anpu scan https://staging.example.com \\\\\n            --profile standard \\\\\n            --fail-on high \\\\\n            --sarif \\\\\n            --output ./reports\n\n      - name: Upload SARIF\n        if: always()\n        uses: actions/upload-artifact@v4\n        with:\n          name: anpu-sarif\n          path: ./reports/*.sarif\n          if-no-files-found: error`} />
            <p className="docs-p">
              Replace the target URL with a system you own or are explicitly authorized to test.
              The same pattern works in GitLab CI, Azure Pipelines, and Jenkins.
            </p>
            <div className="docs-warning-box">
              <span style={{ color: "#FF8C00" }}>⚠</span>
              {" "}Only scan systems you own or are explicitly authorized to test.
              Built-in SSRF guardrails reduce accidental harm but do not establish authorization.
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default DocsPage;
