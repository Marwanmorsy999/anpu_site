import { ArrowRight, Check, Code2, FileText, Github, LockKeyhole, Radar, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { SecurityScore } from "@/components/SecurityScore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const modules = [
  {
    title: "Surface reconnaissance",
    description: "Map the publicly visible signals around a target, from DNS and redirects to robots and sitemaps.",
    icon: Radar,
  },
  {
    title: "Security analysis",
    description: "Review transport security, headers, cookies, exposure signals, and other configuration details.",
    icon: ShieldCheck,
  },
  {
    title: "Actionable reports",
    description: "Turn technical observations into an easy-to-read report with evidence, severity, and recommendations.",
    icon: FileText,
  },
];

const findings = [
  ["HTTPS / TLS", "PASS", "Modern configuration"],
  ["HSTS", "PASS", "Enabled"],
  ["Content-Security-Policy", "PASS", "Present"],
  ["Cookie flags", "WARN", "Review recommended"],
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <section className="anpu-hero anpu-grid rounded-2xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="anpu-kicker">ANPU / WEB SECURITY INTELLIGENCE</span>
              <Badge variant="secondary">OPEN SOURCE</Badge>
            </div>

            <h1 className="anpu-glow max-w-3xl text-5xl font-semibold leading-[.96] tracking-[-0.04em] text-[#f2eee2] sm:text-6xl lg:text-7xl">
              Guard what you build.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#aaa79f] sm:text-lg">
              ANPU turns public security signals into useful intelligence for developers, security researchers, and teams.
            </p>

            <div className="mt-8 max-w-2xl rounded-2xl border border-[#d6ae54]/20 bg-black/30 p-3 shadow-[0_20px_70px_rgba(0,0,0,.3)]">
              <div className="mb-2 flex items-center justify-between px-2 text-[11px] uppercase tracking-[.16em] text-[#8d8a82]">
                <span>Target</span>
                <span className="font-mono text-[#73d67a]">Demo mode</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-h-12 flex-1 items-center rounded-xl border border-[#d6ae54]/15 bg-[#070706] px-4 font-mono text-sm text-[#cfcab9]">
                  https://example.com
                  <span className="ml-1 inline-block h-4 w-px bg-[#d6ae54] opacity-80" />
                </div>
                <Link to="/scan">
                  <Button size="lg" className="h-12 w-full sm:w-auto">
                    Scan website
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="px-2 pt-3 text-xs text-[#747169]">
                Only scan systems you own or have permission to test.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#8d8a82]">
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#73d67a]" /> Go-based engine</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#73d67a]" /> Developer focused</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#73d67a]" /> Open source</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="anpu-visual-frame anpu-grid min-h-[420px] rounded-2xl p-5 sm:p-7">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[.16em] text-[#807d74]">
                <span>ANPU / Guardian</span>
                <span className="inline-flex items-center gap-2 text-[#73d67a]"><span className="h-1.5 w-1.5 rounded-full bg-[#73d67a]" /> Stable</span>
              </div>

              <div className="relative flex min-h-[310px] items-center justify-center overflow-hidden">
                <div className="absolute inset-x-10 bottom-7 h-28 rounded-full bg-[#d6ae54]/8 blur-3xl" />
                <div className="relative z-10 drop-shadow-[0_0_45px_rgba(214,174,84,.14)]">
                  <PharaohGuardian size={270} state="stable" />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-[#d6ae54]/20 bg-[#0a0a09]/85 px-4 py-2 font-mono text-[11px] tracking-[.12em] text-[#d6ae54]">
                  𓂀 GUARDIAN ACTIVE
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#77736b]">Posture</div>
                  <div className="mt-1 text-lg font-semibold text-[#f2eee2]">A</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#77736b]">Checks</div>
                  <div className="mt-1 text-lg font-semibold text-[#f2eee2]">18</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#77736b]">Target</div>
                  <div className="mt-1 truncate text-sm font-semibold text-[#f2eee2]">example.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mb-8 max-w-2xl">
          <div className="anpu-kicker">01 / CAPABILITIES</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#f2eee2] sm:text-4xl">Security intelligence, without the noise.</h2>
          <p className="mt-3 text-[#9a978e]">A focused toolkit for discovering exposure, understanding findings, and communicating what matters.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {modules.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-[#d6ae54]/15 bg-[#d6ae54]/8 text-[#d6ae54]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#f2eee2]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#96938b]">{description}</p>
              <div className="mt-5 text-xs font-medium text-[#d6ae54] opacity-70 transition-opacity group-hover:opacity-100">Explore module →</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Card className="rounded-2xl p-6 sm:p-8">
          <div className="anpu-kicker">02 / SECURITY POSTURE</div>
          <h2 className="mt-3 text-2xl font-semibold text-[#f2eee2]">One clear signal for a noisy surface.</h2>
          <p className="mt-3 text-sm leading-6 text-[#96938b]">
            ANPU combines individual observations into a simple posture assessment so you can see what needs attention first.
          </p>
          <div className="mt-8 max-w-[240px]">
            <SecurityScore score={8.7} grade="A" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4"><div className="text-xs text-[#77736b]">CRITICAL</div><div className="mt-1 text-xl text-[#73d67a]">0</div></div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4"><div className="text-xs text-[#77736b]">MEDIUM</div><div className="mt-1 text-xl text-[#e7c46a]">2</div></div>
          </div>
        </Card>

        <Card className="rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="anpu-kicker">03 / DEMO REPORT</div>
              <h2 className="mt-3 text-2xl font-semibold text-[#f2eee2]">Evidence you can act on.</h2>
            </div>
            <Badge variant="secondary">Demo data</Badge>
          </div>

          <div className="mt-7 overflow-hidden rounded-xl border border-white/5 bg-[#080807]">
            <div className="flex flex-col gap-2 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-mono text-xs text-[#aaa79f]">example.com / deep scan</div>
              <div className="font-mono text-sm text-[#e7c46a]">8.7 / 10 · A</div>
            </div>
            <div className="divide-y divide-white/5">
              {findings.map(([name, status, result]) => (
                <div key={name} className="grid gap-1 px-4 py-3 sm:grid-cols-[1.4fr_.5fr_1fr] sm:items-center">
                  <div className="text-sm text-[#e9e5da]">{name}</div>
                  <div className={`text-[11px] font-semibold ${status === "PASS" ? "text-[#73d67a]" : "text-[#e7c46a]"}`}>{status}</div>
                  <div className="text-xs text-[#7f7b73]">{result}</div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/reports" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#d6ae54]">
            Open report archive <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </section>

      <section className="py-14 lg:py-20">
        <div className="grid items-center gap-8 rounded-2xl border border-[#d6ae54]/12 bg-gradient-to-br from-[#15140f] via-[#0d0d0b] to-[#090908] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
          <div>
            <div className="anpu-kicker">04 / OPEN SOURCE</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#f2eee2]">The web interface is only the front door.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#96938b]">
              The core ANPU engine lives in Go. Use the CLI for real analysis, then use this interface for a clearer view of the project, reports, and workflow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg">
              <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Open ANPU repository
              </a>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/docs"><Terminal className="mr-2 h-4 w-4" /> Read the CLI docs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          [LockKeyhole, "Permission-first", "Only assess targets you are authorized to test."],
          [Code2, "Developer-ready", "A Go CLI with a web layer designed around it."],
          [Sparkles, "Distinctive by design", "Egyptian guardian symbolism with modern product UX."],
        ].map(([Icon, title, text]) => (
          <div key={title as string} className="rounded-2xl border border-white/5 bg-white/[0.015] p-5">
            <Icon className="h-5 w-5 text-[#d6ae54]" />
            <h3 className="mt-4 font-semibold text-[#f2eee2]">{title as string}</h3>
            <p className="mt-1 text-sm leading-6 text-[#858178]">{text as string}</p>
          </div>
        ))}
      </section>

      <section className="py-16">
        <div className="overflow-hidden rounded-2xl border border-[#d6ae54]/15 bg-[#0b0b0a] px-6 py-10 text-center sm:px-10">
          <div className="flex justify-center">
            <div className="rounded-full border border-[#d6ae54]/20 bg-[#d6ae54]/5 p-3 text-[#d6ae54]"><PharaohGuardian size={52} state="awake" /></div>
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-[#f2eee2] sm:text-4xl">Know your attack surface.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#96938b]">Start with the scanner, inspect the intelligence, and keep the core open.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg"><Link to="/scan">Scan a website</Link></Button>
            <Button variant="outline" asChild size="lg"><Link to="/github">Explore the source</Link></Button>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[.14em] text-[#68645d]">
        <span>𓂀</span><span>ANPU SECURITY INTELLIGENCE</span><span>•</span><span>DEMO INTERFACE</span>
      </div>
    </div>
  );
}

export default HomePage;
