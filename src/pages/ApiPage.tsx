import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Server, Code2, Plug2, TestTube2, BookOpen } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ApiPage() {
  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/scan",
      desc: "Initiate a new security scan",
      body: [
        { name: "url", type: "string", required: true, desc: "Target URL to scan" },
        { name: "profile", type: "string", required: false, desc: "Scan profile: surface, standard, deep" },
        { name: "timeout", type: "number", required: false, desc: "Request timeout in seconds" },
      ]
    },
    {
      method: "GET",
      path: "/api/v1/scan/:id",
      desc: "Get scan results",
      body: []
    },
    {
      method: "GET",
      path: "/api/v1/scans",
      desc: "List all scans",
      body: [
        { name: "limit", type: "number", required: false, desc: "Maximum number of results" },
        { name: "offset", type: "number", required: false, desc: "Pagination offset" },
      ]
    },
    {
      method: "DELETE",
      path: "/api/v1/scan/:id",
      desc: "Delete a scan",
      body: []
    },
  ];

  const responseExample = `{
  "id": "abc123",
  "url": "https://example.com",
  "status": "completed",
  "score": 85,
  "grade": "B",
  "findings": [
    {
      "category": "Headers",
      "severity": "high",
      "description": "Missing X-Content-Type-Options header"
    }
  ],
  "created_at": "2026-08-26T00:00:00Z"
}`;

  const requestExample = `{
  "url": "https://example.com",
  "profile": "standard",
  "timeout": 30
}`;

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
          ANPU // API DOCUMENTATION
        </h1>
        <p className="mt-3 text-muted-foreground">
          REST API for programmatic access to ANPU security intelligence.
        </p>
      </div>

      {/* Navigation */}
      <Card className="p-4 mb-6 border-border">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: "OVERVIEW", href: "#overview" },
            { label: "ENDPOINTS", href: "#endpoints" },
            { label: "REQUEST EXAMPLE", href: "#request" },
            { label: "RESPONSE EXAMPLE", href: "#response" },
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

      {/* Overview */}
      <section id="overview" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            API OVERVIEW
          </h2>
          <div className="space-y-4">
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                BASE URL
              </p>
              <pre 
                className="p-3 bg-[#050505] border border-border/50 text-xs text-primary font-mono overflow-x-auto"
                style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
              >
https://anpu.example/api/v1
              </pre>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                AUTHENTICATION
              </p>
              <p className="text-xs text-muted-foreground">
                No authentication required. ANPU API is completely open and free to use.
              </p>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                CONTENT TYPE
              </p>
              <pre 
                className="p-3 bg-[#050505] border border-border/50 text-xs text-primary font-mono overflow-x-auto"
                style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
              >
application/json
              </pre>
            </Card>
          </div>
        </Card>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Plug2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              API ENDPOINTS
            </h2>
          </div>
          <div className="space-y-4">
            {endpoints.map((endpoint, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-bold ${
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
                    <p className="text-xs font-semibold text-secondary mb-1">
                      REQUEST BODY
                    </p>
                    <div className="space-y-1">
                      {endpoint.body.map((param, j) => (
                        <div key={j} className="text-xs">
                          <span className="text-primary">{param.name}</span>
                          <span className="text-muted-foreground"> ({param.type})</span>
                          {param.required && <span className="text-red-400"> [REQUIRED]</span>}
                          <br />
                          <span className="text-muted-foreground/70">{param.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Request Example */}
      <section id="request" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              REQUEST EXAMPLE
            </h2>
          </div>
          <pre 
            className="p-4 bg-[#050505] border border-border/50 text-xs text-primary font-mono overflow-x-auto"
            style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
          >
{requestExample}
          </pre>
        </Card>
      </section>

      {/* Response Example */}
      <section id="response" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <TestTube2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              RESPONSE EXAMPLE
            </h2>
          </div>
          <pre 
            className="p-4 bg-[#050505] border border-border/50 text-xs text-primary font-mono overflow-x-auto"
            style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
          >
{responseExample}
          </pre>
        </Card>
      </section>

      {/* SDKs */}
      <Card className="p-6 mb-8 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          SDKS & LIBRARIES
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "JAVASCRIPT",
              desc: "Official Node.js SDK for ANPU API",
              href: "#"
            },
            {
              title: "PYTHON",
              desc: "Python client library for ANPU",
              href: "#"
            },
            {
              title: "GO",
              desc: "Native Go client for ANPU",
              href: "#"
            },
          ].map((sdk, i) => (
            <Button key={i} variant="outline" size="lg" asChild className="text-left p-4">
              <a href={sdk.href} className="flex flex-col items-start">
                <span className="text-sm font-semibold text-foreground mb-1">{sdk.title}</span>
                <span className="text-xs text-muted-foreground">{sdk.desc}</span>
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

export default ApiPage;
