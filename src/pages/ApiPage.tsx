import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Server, Terminal, Code2, TestTube2, AlertTriangle, Clock, Zap } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ApiPage() {
  const baseUrl = "https://anpu.example/api/v1";
  const apiStatus = "NOT YET IMPLEMENTED"; // Clearly mark as not implemented

  const endpoints = [
    {
      method: "POST",
      path: "/scan",
      desc: "Initiate a new security scan",
      body: [
        { name: "url", type: "string", required: true, desc: "Target URL to scan (must include protocol)" },
        { name: "profile", type: "string", required: false, desc: "Scan profile: 'surface', 'standard', or 'deep' (default: 'standard')" },
        { name: "timeout", type: "number", required: false, desc: "Request timeout in seconds (default: 30, max: 300)" },
        { name: "retries", type: "number", required: false, desc: "Number of retry attempts (default: 3, max: 5)" },
      ],
      response: {
        status: 202,
        body: `{
  "id": "scan-xxxxxxxx",
  "url": "https://example.com",
  "profile": "standard",
  "status": "queued",
  "queued_at": "2026-08-26T14:30:00Z",
  "estimated_duration": "45-90 seconds"
}`
      }
    },
    {
      method: "GET",
      path: "/scan/:id",
      desc: "Retrieve scan results",
      body: [],
      response: {
        status: 200,
        body: `{
  "id": "scan-xxxxxxxx",
  "url": "https://example.com",
  "status": "completed",
  "score": 8.7,
  "grade": "A",
  "profile": "standard",
  "scanned_at": "2026-08-26T14:30:45Z",
  "completed_at": "2026-08-26T14:31:30Z",
  "findings": [...],
  "finding_counts": {
    "critical": 0,
    "high": 0,
    "medium": 2,
    "low": 4,
    "info": 7
  }
}`
      }
    },
    {
      method: "GET",
      path: "/scan/:id/status",
      desc: "Get scan status only (lightweight)",
      body: [],
      response: {
        status: 200,
        body: `{
  "id": "scan-xxxxxxxx",
  "status": "running",
  "progress": 65,
  "current_step": "TLS analysis"
}`
      }
    },
    {
      method: "GET",
      path: "/scans",
      desc: "List all scans",
      body: [
        { name: "limit", type: "number", required: false, desc: "Maximum results (default: 50, max: 100)" },
        { name: "offset", type: "number", required: false, desc: "Pagination offset (default: 0)" },
        { name: "status", type: "string", required: false, desc: "Filter by status: 'queued', 'running', 'completed', 'failed'" },
        { name: "sort", type: "string", required: false, desc: "Sort by: 'created', 'completed', 'score' (default: 'created')" },
        { name: "order", type: "string", required: false, desc: "Sort order: 'asc' or 'desc' (default: 'desc')" },
      ],
      response: {
        status: 200,
        body: `{
  "total": 42,
  "limit": 50,
  "offset": 0,
  "scans": [...]
}`
      }
    },
    {
      method: "DELETE",
      path: "/scan/:id",
      desc: "Delete a scan report",
      body: [],
      response: {
        status: 204,
        body: "(No content)"
      }
    },
  ];

  const statusCodes = [
    { code: 200, desc: "OK - Request successful" },
    { code: 202, desc: "Accepted - Scan queued" },
    { code: 204, desc: "No Content - Delete successful" },
    { code: 400, desc: "Bad Request - Invalid parameters" },
    { code: 404, desc: "Not Found - Scan not found" },
    { code: 429, desc: "Too Many Requests - Rate limit exceeded" },
    { code: 500, desc: "Internal Server Error" },
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
          <Server className="h-10 w-10 text-primary" />
          <PharaohGuardian size={48} state="analyzing" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          ANPU // API REFERENCE
        </h1>
        <p className="mt-3 text-muted-foreground">
          REST API for programmatic access to ANPU security intelligence.
        </p>
        
        {/* Status Badge */}
        <Badge variant="outline" className="mt-4 text-yellow-400 border-yellow-500/30">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {apiStatus}
        </Badge>
      </div>

      {/* Warning */}
      <Card className="p-4 mb-6 border-amber/30 bg-amber/5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-400 font-semibold mb-1">
              API NOT YET AVAILABLE
            </p>
            <p className="text-xs text-muted-foreground">
              The ANPU REST API is planned for future development. This documentation 
              describes the intended API design. Currently, ANPU operates as a CLI-only tool 
              with the web interface serving as a demo/visualization layer.
            </p>
          </div>
        </div>
      </Card>

      {/* Base URL */}
      <Card className="p-6 mb-6 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          BASE URL
        </h2>
        <pre 
          className="p-4 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
          style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
        >
{baseUrl}
        </pre>
      </Card>

      {/* Authentication */}
      <Card className="p-6 mb-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            AUTHENTICATION
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          No authentication required. ANPU API will be completely open and free to use.
        </p>
        <pre 
          className="p-4 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
          style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
        >
# No API key or token required
# All endpoints are publicly accessible
        </pre>
      </Card>

      {/* Quick Start */}
      <Card className="p-6 mb-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            QUICK START
          </h2>
        </div>
        
        <Card className="p-4 bg-muted/20 border-border/30 mb-4">
          <p className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">
            START A SCAN
          </p>
          <pre 
            className="p-3 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
            style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
          >
{`curl -X POST ${baseUrl}/scan \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com", "profile": "standard"}'`}
          </pre>
        </Card>

        <Card className="p-4 bg-muted/20 border-border/30 mb-4">
          <p className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">
            CHECK SCAN STATUS
          </p>
          <pre 
            className="p-3 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
            style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
          >
{`curl -X GET ${baseUrl}/scan/scan-xxxxxxxx`}
          </pre>
        </Card>

        <Card className="p-4 bg-muted/20 border-border/30">
          <p className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">
            LIST ALL SCANS
          </p>
          <pre 
            className="p-3 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
            style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
          >
{`curl -X GET ${baseUrl}/scans`}
          </pre>
        </Card>
      </Card>

      {/* Endpoints */}
      <Card className="p-6 mb-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            ENDPOINTS
          </h2>
        </div>
        
        <div className="space-y-4">
          {endpoints.map((endpoint, i) => (
            <Card key={i} className="p-4 bg-muted/20 border-border/30">
              <div className="flex items-start gap-3 mb-3">
                <span className={`px-2 py-1 text-xs font-bold ${
                  endpoint.method === "POST" ? "bg-green-500/20 text-green-400" :
                  endpoint.method === "GET" ? "bg-blue-500/20 text-blue-400" :
                  endpoint.method === "DELETE" ? "bg-red-500/20 text-red-400" :
                  "bg-purple-500/20 text-purple-400"
                }`}>
                  {endpoint.method}
                </span>
                <pre 
                  className="text-sm text-primary font-mono"
                  style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
                >
{endpoint.path}
                </pre>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{endpoint.desc}</p>
              
              {endpoint.body.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border/30">
                  <p className="text-xs font-semibold text-secondary mb-1 uppercase tracking-wide">
                    REQUEST BODY
                  </p>
                  <div className="space-y-1">
                    {endpoint.body.map((param, j) => (
                      <div key={j} className="text-xs">
                        <span className="text-primary">{param.name}</span>
                        <span className="text-muted-foreground"> ({param.type})</span>
                        {param.required && <span className="text-red-400"> *</span>}
                        <br />
                        <span className="text-muted-foreground/70">{param.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-2 pt-2 border-t border-border/30">
                <p className="text-xs font-semibold text-secondary mb-1 uppercase tracking-wide">
                  RESPONSE
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  Status: <span className="text-primary">{endpoint.response.status}</span>
                </p>
                <pre 
                  className="p-3 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
                  style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
                >
{endpoint.response.body}
                </pre>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Status Codes */}
      <Card className="p-6 mb-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <TestTube2 className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            HTTP STATUS CODES
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {statusCodes.map((code, i) => (
            <Card key={i} className="p-3 bg-muted/20 border-border/30">
              <p className="text-lg font-bold text-primary">{code.code}</p>
              <p className="text-xs text-muted-foreground">{code.desc}</p>
            </Card>
          ))}
        </div>
      </Card>

      {/* Rate Limits */}
      <Card className="p-6 mb-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            RATE LIMITS
          </h2>
        </div>
        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 mb-4">
          <AlertTriangle className="h-3 w-3 mr-1" />
          NOT YET IMPLEMENTED
        </Badge>
        <p className="text-xs text-muted-foreground">
          Rate limiting will be implemented when the API launches. Expected limits:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            { limit: "60 requests per minute", desc: "Per IP address for scan initiation" },
            { limit: "10 concurrent scans", desc: "Maximum active scans per IP" },
            { limit: "1000 requests per day", desc: "Total daily limit per IP" },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-muted-foreground">-</span>
              <span className="text-sm">{item.limit}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Error Responses */}
      <Card className="p-6 mb-8 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          ERROR RESPONSES
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          All error responses follow the same format:
        </p>
        <pre 
          className="p-4 bg-[#050505] rounded-md border border-border/50 text-xs text-primary font-mono overflow-x-auto"
          style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
        >
{`{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'url' parameter is required and must be a valid URL",
    "details": {
      "parameter": "url",
      "expected": "valid URL string"
    }
  },
  "request_id": "req-xxxxxxxx"
}`}
        </pre>
        <p className="text-xs text-muted-foreground mt-3">
          Error codes include: INVALID_PARAMETER, NOT_FOUND, RATE_LIMITED, SERVER_ERROR
        </p>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" size="lg" asChild>
          <Link to="/docs" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            DOCUMENTATION
          </Link>
        </Button>
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

export default ApiPage;
