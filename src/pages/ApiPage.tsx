import { useState } from "react";
import { Copy, CheckCheck, AlertTriangle, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

function CodeBlock({ code, lang = "sh" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
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

const ENDPOINTS = [
  {
    method: "POST", path: "/api/v1/scan",
    desc: "Initiate a security scan against a target URL. Returns a scan ID for polling.",
    body: `{\n  "url": "https://example.com",\n  "profile": "standard"\n}`,
    response: `HTTP/1.1 202 Accepted\n{\n  "id": "scan-1748291837-1",\n  "status": "queued",\n  "profile": "standard",\n  "target": "https://example.com",\n  "created_at": "2026-01-01T12:00:00Z"\n}`,
  },
  {
    method: "GET", path: "/api/v1/scan/:id/status",
    desc: "Get lightweight progress telemetry for a running scan.",
    body: null,
    response: `HTTP/1.1 200 OK\n{\n  "id": "scan-1748291837-1",\n  "status": "running",\n  "progress": 65,\n  "stage": "headers"\n}`,
  },
  {
    method: "GET", path: "/api/v1/scan/:id",
    desc: "Retrieve a completed scan result with findings, risk score, and evidence.",
    body: null,
    response: `HTTP/1.1 200 OK\n{\n  "id": "scan-1748291837-1",\n  "status": "completed",\n  "score": 3.4,\n  "grade": "A",\n  "findings": {\n    "critical": 0,\n    "high": 0,\n    "medium": 2,\n    "low": 5,\n    "info": 11\n  },\n  "report_html": "/reports/example.com-2026-01-01-120000.html"\n}`,
  },
  {
    method: "GET", path: "/api/v1/scans",
    desc: "List all scans in local history. Supports pagination via limit and offset.",
    body: null,
    response: `HTTP/1.1 200 OK\n{\n  "total": 42,\n  "limit": 20,\n  "offset": 0,\n  "scans": [\n    { "id": "scan-1748291837-1", "target": "example.com", "score": 3.4, "status": "completed" }\n  ]\n}`,
  },
  {
    method: "DELETE", path: "/api/v1/scan/:id",
    desc: "Delete a scan and its associated reports from local history.",
    body: null,
    response: `HTTP/1.1 204 No Content`,
  },
];

const STATUS_CODES = [
  { code: "200", label: "OK", desc: "Request succeeded. Result returned." },
  { code: "202", label: "Accepted", desc: "Scan queued successfully. Poll for status." },
  { code: "204", label: "No Content", desc: "Delete succeeded. No body returned." },
  { code: "400", label: "Bad Request", desc: "Invalid or missing parameters (e.g. bad URL, unknown profile)." },
  { code: "404", label: "Not Found", desc: "Scan ID does not exist in local history." },
  { code: "409", label: "Conflict", desc: "A scan against this target is already in progress." },
  { code: "429", label: "Rate Limited", desc: "Too many concurrent scans. Wait and retry." },
  { code: "500", label: "Server Error", desc: "Internal scanner failure. Check --verbose output." },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "var(--crt-green-1)",
  POST: "var(--egypt-gold-1)",
  DELETE: "#FF4444",
};

export function ApiPage() {
  const [openEndpoint, setOpenEndpoint] = useState<string | null>("POST /api/v1/scan");

  return (
    <div className="docs-shell">
      <div className="docs-header">
        <div className="docs-header-inner">
          <div className="anpu-eyebrow" style={{ marginBottom: "0.75rem" }}>ANPU / API REFERENCE</div>
          <h1 className="docs-h1">
            Build on the intelligence layer.
            <span className="anpu-cursor-blink" style={{ fontSize: "0.5em", marginLeft: "0.25em" }}>█</span>
          </h1>
          <p className="docs-subtitle">
            The planned REST interface for programmatic scan creation, status polling, result retrieval,
            and CI/CD automation. ANPU is CLI-first — this API layer is the web interface companion.
          </p>
          <div className="api-status-badge">
            <AlertTriangle size={13} style={{ color: "#FF8C00" }} />
            <span>API not yet available for external consumers. Documenting the intended interface.</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <Link to="/docs" className="anpu-btn-secondary" style={{ fontSize: "0.72rem" }}>
              <Terminal size={13} /> CLI DOCS
            </Link>
            <Link to="/scan" className="anpu-btn-primary" style={{ fontSize: "0.72rem" }}>
              [&gt;] USE SCANNER NOW
            </Link>
          </div>
        </div>
      </div>

      <div className="docs-layout">
        <aside className="docs-toc">
          <div className="docs-toc-label">// CONTENTS</div>
          {[
            { id: "overview", label: "01 / OVERVIEW" },
            { id: "quickstart", label: "02 / QUICK START" },
            { id: "endpoints", label: "03 / ENDPOINTS" },
            { id: "codes", label: "04 / STATUS CODES" },
            { id: "notes", label: "05 / DESIGN NOTES" },
          ].map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="docs-toc-link">
              <span className="docs-toc-arrow">›</span> {label}
            </a>
          ))}

          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #2a1a00", background: "#080500" }}>
            <div className="anpu-eyebrow" style={{ marginBottom: "0.5rem", fontSize: "0.58rem", color: "#FF8C00" }}>
              // CLI EQUIVALENT
            </div>
            <code style={{ display: "block", fontSize: "0.68rem", color: "var(--egypt-gold-1)", lineHeight: 1.9 }}>
              anpu scan https://target.com<br />
              --profile standard<br />
              --json<br />
              --fail-on high
            </code>
          </div>
        </aside>

        <main className="docs-main">

          {/* Overview */}
          <section id="overview" className="docs-section">
            <div className="anpu-eyebrow">01 / OVERVIEW</div>
            <h2 className="docs-section-h2">Base URL</h2>
            <CodeBlock code="https://anpu.example/api/v1" lang="url" />
            <div className="api-note-box">
              <strong>CLI-first product.</strong> ANPU's scanner runs locally as a Go binary.
              The API described here is the planned programmatic interface — the same scan pipeline
              exposed over HTTP for integration with dashboards and automation tools.
              Use the CLI directly for the current production-ready interface.
            </div>
            <h3 className="docs-h3">Request format</h3>
            <p className="docs-p">All requests use JSON bodies with <code>Content-Type: application/json</code>. No authentication design is implemented in the current demo layer.</p>
            <h3 className="docs-h3">Response format</h3>
            <p className="docs-p">All responses return JSON. Error responses include a <code>message</code> field describing the problem.</p>
            <CodeBlock code={`{\n  "error": "invalid_url",\n  "message": "Target must be an http or https URL"\n}`} lang="json" />
          </section>

          {/* Quick start */}
          <section id="quickstart" className="docs-section">
            <div className="anpu-eyebrow">02 / QUICK START</div>
            <h2 className="docs-section-h2">Initiate and poll a scan</h2>
            <CodeBlock lang="sh" code={`# 1. Start a scan\ncurl -X POST https://anpu.example/api/v1/scan \\\n  -H "Content-Type: application/json" \\\n  -d '{"url":"https://example.com","profile":"standard"}'\n\n# 2. Poll status\ncurl https://anpu.example/api/v1/scan/scan-1748291837-1/status\n\n# 3. Get full result\ncurl https://anpu.example/api/v1/scan/scan-1748291837-1`} />
            <p className="docs-p">
              The scan ID returned from the POST can be used to poll for progress and retrieve the full result.
              Scan IDs are stable — they reference entries in the local SQLite history database.
            </p>
          </section>

          {/* Endpoints */}
          <section id="endpoints" className="docs-section">
            <div className="anpu-eyebrow">03 / ENDPOINTS</div>
            <h2 className="docs-section-h2">HTTP interface</h2>
            <div className="api-endpoints-list">
              {ENDPOINTS.map((ep) => {
                const key = `${ep.method} ${ep.path}`;
                const isOpen = openEndpoint === key;
                return (
                  <div key={key} className={`api-endpoint-card ${isOpen ? "is-open" : ""}`}>
                    <button
                      className="api-endpoint-head"
                      onClick={() => setOpenEndpoint(isOpen ? null : key)}
                    >
                      <span className="api-method" style={{ color: METHOD_COLORS[ep.method] || "#fff" }}>
                        {ep.method}
                      </span>
                      <code className="api-path">{ep.path}</code>
                      <span className="api-chevron">{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && (
                      <div className="api-endpoint-body">
                        <p className="docs-p" style={{ marginBottom: "1rem" }}>{ep.desc}</p>
                        {ep.body && (
                          <>
                            <div className="anpu-eyebrow" style={{ fontSize: "0.6rem", marginBottom: "0.4rem" }}>REQUEST BODY</div>
                            <CodeBlock code={ep.body} lang="json" />
                          </>
                        )}
                        <div className="anpu-eyebrow" style={{ fontSize: "0.6rem", marginBottom: "0.4rem", marginTop: ep.body ? "1rem" : 0 }}>RESPONSE</div>
                        <CodeBlock code={ep.response} lang="http" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Status codes */}
          <section id="codes" className="docs-section">
            <div className="anpu-eyebrow">04 / STATUS CODES</div>
            <h2 className="docs-section-h2">HTTP status reference</h2>
            <div className="docs-table-wrap">
              <table className="docs-table">
                <thead><tr><th>Code</th><th>Label</th><th>Meaning</th></tr></thead>
                <tbody>
                  {STATUS_CODES.map(({ code, label, desc }) => (
                    <tr key={code}>
                      <td>
                        <code style={{ color: code.startsWith("2") ? "var(--crt-green-1)" : code.startsWith("4") || code.startsWith("5") ? "#FF8C00" : "var(--egypt-gold-1)" }}>
                          {code}
                        </code>
                      </td>
                      <td>{label}</td>
                      <td style={{ color: "#94a3b8" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Design notes */}
          <section id="notes" className="docs-section">
            <div className="anpu-eyebrow">05 / DESIGN NOTES</div>
            <h2 className="docs-section-h2">Architecture decisions</h2>
            {[
              {
                title: "Local-first, no cloud backend",
                body: "ANPU is designed to run on your infrastructure. Scan history is stored in a local SQLite database at ~/.anpu/anpu.db. No scan data is sent to external services.",
              },
              {
                title: "SARIF 2.1.0 output",
                body: "The scanner emits SARIF 2.1.0 reports compatible with GitHub Code Scanning, security tooling, and CI artifact workflows. Use --sarif to enable.",
              },
              {
                title: "Deterministic scoring",
                body: "Every finding score is computed from a documented formula: severity base × confidence multiplier + category weight + corroboration bonus. Reports include the exact inputs so results can be reproduced and audited.",
              },
              {
                title: "Nuclei integration — optional",
                body: "ANPU does not silently download or install Nuclei. When the binary is unavailable, it warns and continues with built-in analysis. Run `anpu tools` to see integration status.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="api-design-note">
                <div className="api-design-title">// {title}</div>
                <p className="docs-p" style={{ marginBottom: 0 }}>{body}</p>
              </div>
            ))}
          </section>

        </main>
      </div>
    </div>
  );
}

export default ApiPage;
