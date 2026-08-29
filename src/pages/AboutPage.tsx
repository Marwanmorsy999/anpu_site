import { Link } from "react-router-dom";
import { GitBranch, Terminal, Shield, Layers, FileCode2, ArrowRight } from "lucide-react";

const MODULES = [
  { name: "Recon", scope: "All", activity: "Passive", desc: "DNS, robots.txt, sitemap.xml, redirects, source-map exposure" },
  { name: "Technology", scope: "All", activity: "Passive", desc: "Web servers, frameworks, CMSs, CDNs, JS libraries via observed signals" },
  { name: "TLS", scope: "All", activity: "Passive", desc: "Certificate validity, expiry, hostname match, protocol version, HTTPS redirect" },
  { name: "Headers", scope: "All", activity: "Passive", desc: "CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, disclosure headers" },
  { name: "Cookies", scope: "All", activity: "Passive", desc: "Secure, HttpOnly, SameSite attributes with context-aware severity" },
  { name: "Endpoints", scope: "All", activity: "Passive", desc: "Links, forms, scripts, and API path references — normalized and deduplicated" },
  { name: "Subdomains", scope: "Standard/Deep", activity: "Active", desc: "Certificate Transparency logs and profile-gated DNS enumeration" },
  { name: "PortScan", scope: "Deep", activity: "Active", desc: "TCP connect scan against curated common service ports" },
  { name: "Dirs", scope: "Standard/Deep", activity: "Active", desc: "Sensitive-path probing with soft-404 baseline filtering" },
  { name: "Secrets", scope: "Standard/Deep", activity: "Active", desc: "API key, token, and private-key pattern detection in discovered assets" },
  { name: "CORS", scope: "Standard/Deep", activity: "Active", desc: "Wildcard, reflection, and credential behavior analysis" },
  { name: "Methods", scope: "Standard/Deep", activity: "Active", desc: "OPTIONS/Allow behavior and live TRACE verification" },
  { name: "Nuclei", scope: "Standard/Deep", activity: "Active", desc: "Optional: profile-scoped external vulnerability templates when Nuclei binary is present" },
];

const ARCHITECTURE = [
  { path: "cmd/anpu/", desc: "CLI entry point — scan, history, show, diff, tools" },
  { path: "internal/scanner/", desc: "Scanner interface, target validation, pipeline orchestrator" },
  { path: "internal/recon/", desc: "DNS, robots.txt, sitemap.xml, redirects" },
  { path: "internal/tls/", desc: "Passive TLS analysis" },
  { path: "internal/headers/", desc: "Security headers + cookie analysis" },
  { path: "internal/technology/", desc: "Technology fingerprinting" },
  { path: "internal/endpoints/", desc: "Endpoint discovery / normalization" },
  { path: "internal/secrets/", desc: "Token / key pattern detection" },
  { path: "internal/findings/", desc: "Deduplication engine" },
  { path: "internal/scoring/", desc: "Transparent deterministic risk scoring" },
  { path: "internal/storage/", desc: "SQLite persistence for scan history" },
  { path: "internal/reporting/", desc: "JSON / SARIF / HTML report generation and terminal UI" },
  { path: "pkg/models/", desc: "Shared scanner-agnostic data model" },
];

const SCORING_ROWS = [
  { sev: "Info", base: "0.0", color: "#6a6a6a" },
  { sev: "Low", base: "2.0", color: "#87CEEB" },
  { sev: "Medium", base: "4.5", color: "var(--egypt-gold-1)" },
  { sev: "High", base: "7.0", color: "#FF8C00" },
  { sev: "Critical", base: "9.0", color: "#FF4444" },
];

const CATEGORY_WEIGHTS = [
  ["Vulnerability", "+1.0"],
  ["Authentication", "+0.7"],
  ["TLS", "+0.5"],
  ["Endpoint", "+0.3"],
  ["Configuration", "+0.3"],
  ["Cookies", "+0.2"],
  ["Exposure", "+0.2"],
  ["Headers", "+0.1"],
  ["Technology", "+0.1"],
];

export function AboutPage() {
  return (
    <div className="about-shell">

      {/* Page header */}
      <div className="about-header">
        <div className="about-header-inner">
          <div className="anpu-eyebrow" style={{ marginBottom: "0.75rem" }}>𓁹 ANPU / ORIGIN &amp; ARCHITECTURE</div>
          <h1 className="about-h1">
            What ANPU is.<span className="anpu-cursor-blink" style={{ fontSize: "0.5em", marginLeft: "0.3em" }}>█</span>
          </h1>
          <p className="about-subtitle">
            ANPU is a local-first security analysis CLI. It orchestrates passive and active analyzers,
            normalizes findings into one evidence-backed model, deduplicates overlapping signals,
            scores them deterministically, and produces machine-readable and human-readable reports.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="anpu-btn-primary" style={{ fontSize: "0.72rem" }}>
              <GitBranch size={13} /> SOURCE REPOSITORY
            </a>
            <Link to="/docs" className="anpu-btn-secondary" style={{ fontSize: "0.72rem" }}>
              <Terminal size={13} /> DOCUMENTATION
            </Link>
          </div>
        </div>

        {/* Status strip */}
        <div className="about-status-strip">
          {[
            { label: "ENGINE", value: "Go 1.25+", color: "#00ADD8" },
            { label: "LICENSE", value: "Apache-2.0", color: "var(--crt-green-1)" },
            { label: "STORAGE", value: "SQLite local", color: "var(--egypt-gold-1)" },
            { label: "TELEMETRY", value: "None", color: "var(--crt-green-1)" },
            { label: "PLATFORMS", value: "Linux / macOS / Windows", color: "#94a3b8" },
            { label: "OUTPUTS", value: "HTML / JSON / SARIF", color: "#94a3b8" },
          ].map(({ label, value, color }) => (
            <div key={label} className="about-status-item">
              <span className="about-status-label">{label}</span>
              <span className="about-status-val" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-body">

        {/* What it does */}
        <section className="about-section">
          <div className="about-section-head">
            <Shield size={16} className="about-section-icon" />
            <div className="anpu-eyebrow">// CAPABILITY MATRIX</div>
          </div>
          <h2 className="about-h2">Engine modules</h2>
          <p className="about-p">
            ANPU combines its own passive analyzers with optional external scanners.
            The orchestration layer normalizes results into one finding model regardless of source.
          </p>
          <div className="about-module-grid">
            {MODULES.map(({ name, scope, activity, desc }) => (
              <div key={name} className="about-module-card">
                <div className="about-module-top">
                  <span className="about-module-name">{name}</span>
                  <span className="about-module-scope">{scope}</span>
                  <span
                    className="about-module-activity"
                    style={{ color: activity === "Passive" ? "var(--crt-green-1)" : "var(--egypt-gold-1)" }}
                  >
                    {activity}
                  </span>
                </div>
                <p className="about-module-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring */}
        <section className="about-section">
          <div className="about-section-head">
            <FileCode2 size={16} className="about-section-icon" />
            <div className="anpu-eyebrow">// SCORING ENGINE</div>
          </div>
          <h2 className="about-h2">Transparent risk scoring</h2>
          <p className="about-p">
            Every finding gets a deterministic score with an explanation. No opaque or AI-generated numbers.
          </p>

          <div className="about-scoring-formula">
            <div className="about-formula-label">// FINDING SCORE FORMULA</div>
            <pre className="about-formula-code">{`Finding Score = (Severity Base × Confidence Multiplier)
              + Category Weight
              + Corroboration Bonus

Capped at 10.0`}</pre>
          </div>

          <div className="about-scoring-grid">
            {/* Severity */}
            <div className="about-scoring-card">
              <div className="about-scoring-card-title">Severity Base</div>
              <table className="docs-table">
                <thead><tr><th>Severity</th><th>Base</th></tr></thead>
                <tbody>
                  {SCORING_ROWS.map(({ sev, base, color }) => (
                    <tr key={sev}>
                      <td style={{ color }}>{sev}</td>
                      <td><code>{base}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Confidence */}
            <div className="about-scoring-card">
              <div className="about-scoring-card-title">Confidence Multiplier</div>
              <table className="docs-table">
                <thead><tr><th>Confidence</th><th>Multiplier</th></tr></thead>
                <tbody>
                  {[["Low","0.55"],["Medium","0.75"],["High","0.90"],["Confirmed","1.00"]].map(([c,m]) => (
                    <tr key={c}><td>{c}</td><td><code>{m}</code></td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Category weights */}
            <div className="about-scoring-card">
              <div className="about-scoring-card-title">Category Weight</div>
              <table className="docs-table">
                <thead><tr><th>Category</th><th>Weight</th></tr></thead>
                <tbody>
                  {CATEGORY_WEIGHTS.map(([cat, w]) => (
                    <tr key={cat}><td>{cat}</td><td><code>{w}</code></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="about-scoring-example">
            <div className="about-formula-label">// EXAMPLE: MISSING HSTS (MEDIUM, CONFIRMED)</div>
            <pre className="about-formula-code">{`Severity base         = 4.5   (Medium)
Confidence multiplier = 1.00  (Confirmed)
Category weight       = 0.1   (Headers)
Corroboration bonus   = 0.0   (single source)

Finding score = (4.5 × 1.00) + 0.1 + 0.0 = 4.6 / 10`}</pre>
          </div>

          <div className="about-agg-box">
            <div className="about-formula-label">// AGGREGATE SCAN SCORE</div>
            <pre className="about-formula-code">{`Aggregate = min(Max Finding Score + Volume Bonus, 10.0)

Volume Bonus = min(0.15 × count_of_medium_or_higher_findings, 1.5)

→ Score is sensitive to both the most serious issue AND the breadth
  of the problem — not dominated by low-severity volume.`}</pre>
          </div>
        </section>

        {/* Architecture */}
        <section className="about-section">
          <div className="about-section-head">
            <Layers size={16} className="about-section-icon" />
            <div className="anpu-eyebrow">// ARCHITECTURE</div>
          </div>
          <h2 className="about-h2">Codebase structure</h2>
          <p className="about-p">
            <code>internal/scanner</code> defines the scanner boundary and pipeline orchestration.
            Concrete analyzer packages are wired together in <code>cmd/anpu/scan.go</code>.
            The orchestrator works with scanner interfaces rather than hard-coding analyzer internals.
          </p>
          <div className="about-arch-grid">
            {ARCHITECTURE.map(({ path, desc }) => (
              <div key={path} className="about-arch-row">
                <code className="about-arch-path">{path}</code>
                <span className="about-arch-desc">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Responsible use */}
        <section className="about-section">
          <div className="about-warning-banner">
            <div className="about-warning-title">⚠ RESPONSIBLE USE</div>
            <p>
              ANPU performs network requests and, depending on the profile, may perform active discovery.
              <strong> Only scan targets you own or are explicitly authorized to test.</strong> Built-in SSRF guardrails
              reduce accidental harm but do not establish authorization. The default <code>safe</code> profile
              is passive and low-impact — <code>standard</code> and <code>deep</code> enable additional active checks.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta-row">
          <Link to="/docs" className="about-cta-card">
            <Terminal size={18} />
            <div>
              <div className="about-cta-title">Documentation</div>
              <div className="about-cta-sub">Install, configure, and run ANPU</div>
            </div>
            <ArrowRight size={14} className="about-cta-arrow" />
          </Link>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="about-cta-card">
            <GitBranch size={18} />
            <div>
              <div className="about-cta-title">Source Repository</div>
              <div className="about-cta-sub">Browse code, issues, and releases</div>
            </div>
            <ArrowRight size={14} className="about-cta-arrow" />
          </a>
          <Link to="/scan" className="about-cta-card">
            <Shield size={18} />
            <div>
              <div className="about-cta-title">Run a Scan</div>
              <div className="about-cta-sub">Initialize the scanner now</div>
            </div>
            <ArrowRight size={14} className="about-cta-arrow" />
          </Link>
        </section>

      </div>
    </div>
  );
}

export default AboutPage;
