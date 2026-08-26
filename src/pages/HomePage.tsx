import { ArrowRight, Check, Code2, FileText, Github, LockKeyhole, Radar, ShieldCheck, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { SecurityScore } from "@/components/SecurityScore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    title: "Discover exposure",
    description: "Map publicly visible DNS, TLS, redirects, robots, sitemaps, and technology signals.",
    icon: Radar,
  },
  {
    title: "Analyze security",
    description: "Inspect headers, cookies, transport configuration, and other security-relevant signals.",
    icon: ShieldCheck,
  },
  {
    title: "Explain the result",
    description: "Turn raw observations into findings with evidence, impact, severity, and recommendations.",
    icon: FileText,
  },
];

const demoChecks = [
  ["HTTPS / TLS", "PASS", "Modern configuration"],
  ["HSTS", "PASS", "Enabled"],
  ["Content-Security-Policy", "WARN", "Review recommended"],
  ["Cookie flags", "WARN", "Review recommended"],
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <section className="anpu-hero rounded-3xl px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative z-10">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="anpu-kicker">ANPU / WEB SECURITY INTELLIGENCE</span>
              <Badge variant="secondary">Open source</Badge>
            </div>

            <h1 className="anpu-glow max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-0.045em] text-[#f2eee2] sm:text-6xl lg:text-[76px]">
              Guard what you build.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#aaa79f] sm:text-lg">
              ANPU discovers what your web application exposes, analyzes the public security posture, and turns the results into actionable intelligence.
            </p>

            <div className="mt-8 rounded-2xl border border-[#d6ae54]/18 bg-[#060605]/70 p-3 shadow-[0_20px_70px_rgba(0,0,0,.28)]">
              <div className="mb-2 flex items-center justify-between px-2 text-[11px] uppercase tracking-[.15em] text-[#8b877e]">
                <span>Target</span>
                <span className="font-mono text-[#73d67a]">Demo mode</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-h-12 flex-1 items-center rounded-xl border border-white/7 bg-[#090908] px-4 font-mono text-sm text-[#d7d1bf]">
                  https://example.com
                  <span className="ml-1 h-4 w-px bg-[#d6ae54]/70" />
                </div>
                <Button asChild size="lg" className="h-12 w-full sm:w-auto">
                  <Link to="/scan">
                    Scan a website <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="px-2 pt-3 text-xs text-[#746f66]">Only scan systems you own or have permission to test.</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#8d8980]">
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#73d67a]" /> Go engine</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#73d67a]" /> CLI first</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#73d67a]" /> Open source</span>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[540px]">
            <div className="anpu-visual-frame rounded-3xl p-5 sm:p-7">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[.15em] text-[#807b72]">
                <span>Guardian</span>
                <span className="inline-flex items-center gap-2 text-[#73d67a]"><span className="h-1.5 w-1.5 rounded-full bg-[#73d67a]" /> Stable</span>
              </div>

              <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden">
                <div className="absolute h-56 w-56 rounded-full bg-[#d6ae54]/8 blur-3xl" />
                <div className="absolute inset-x-10 bottom-5 h-px bg-gradient-to-r from-transparent via-[#d6ae54]/20 to-transparent" />
                <div className="relative z-10 drop-shadow-[0_0_45px_rgba(214,174,84,.16)]">
                  <PharaohGuardian size={290} state="stable" />
                </div>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-[#d6ae54]/20 bg-[#0a0a09]/90 px-4 py-2 font-mono text-[10px] tracking-[.12em] text-[#d6ae54]">
                  𓂀 GUARDIAN ACTIVE
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/6 bg-white/[0.018] p-3.5"><div className="text-[10px] uppercase tracking-wider text-[#77736b]">Posture</div><div className="mt-1 text-xl font-semibold text-[#f2eee2]">A</div></div>
                <div className="rounded-xl border border-white/6 bg-white/[0.018] p-3.5"><div className="text-[10px] uppercase tracking-wider text-[#77736b]">Checks</div><div className="mt-1 text-xl font-semibold text-[#f2eee2]">18</div></div>
                <div className="rounded-xl border border-white/6 bg-white/[0.018] p-3.5"><div className="text-[10px] uppercase tracking-wider text-[#77736b]">Target</div><div className="mt-1 truncate text-sm font-semibold text-[#f2eee2]">example.com</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mb-8 max-w-2xl">
          <div className="anpu-kicker">01 / WHAT ANPU DOES</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#f2eee2] sm:text-4xl">Three steps. One clear picture.</h2>
          <p className="mt-3 text-[#9a978e]">ANPU keeps the security workflow focused: discover the surface, analyze the signals, explain what matters.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map(({ title, description, icon: Icon }, index) => (
            <Card key={title} className="group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d6ae54]/15 bg-[#d6ae54]/7 text-[#d6ae54]"><Icon className="h-5 w-5" /></div>
                <span className="font-mono text-xs text-[#5f5b54]">0{index + 1}</span>
              </div>
              <h3 className="mt-7 text-lg font-semibold text-[#f2eee2]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#96938b]">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card className="rounded-3xl p-6 sm:p-8">
          <div className="anpu-kicker">02 / SECURITY POSTURE</div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#f2eee2]">A signal you can understand.</h2>
              <p className="mt-3 text-sm leading-6 text-[#96938b]">A simple posture assessment summarizes the result without hiding the underlying evidence.</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center"><SecurityScore score={8.7} grade="A" size={210} /></div>
          <p className="mt-5 text-center text-xs text-[#726e66]">ANPU score is an internal posture assessment, not a certification.</p>
        </Card>

        <Card className="rounded-3xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="anpu-kicker">03 / DEMO REPORT</div>
              <h2 className="mt-3 text-2xl font-semibold text-[#f2eee2]">Evidence, not just a score.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#96938b]">Every result can be traced to a concrete observation and a practical recommendation.</p>
            </div>
            <Badge variant="secondary">Demo</Badge>
          </div>

          <div className="anpu-terminal mt-7 overflow-hidden rounded-2xl">
            <div className="flex flex-col gap-2 border-b border-white/6 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono text-xs text-[#aaa79f]">example.com · standard scan</span>
              <span className="font-mono text-sm font-medium text-[#e7c46a]">8.7 / 10 · A</span>
            </div>
            <div className="divide-y divide-white/6">
              {demoChecks.map(([name, status, result]) => (
                <div key={name} className="grid gap-1 px-4 py-4 sm:grid-cols-[1.35fr_.45fr_1fr] sm:items-center">
                  <span className="text-sm text-[#e9e5da]">{name}</span>
                  <span className={`font-mono text-[11px] font-semibold ${status === "PASS" ? "text-[#73d67a]" : "text-[#e7c46a]"}`}>{status}</span>
                  <span className="text-xs text-[#77736e]">{result}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/reports" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#d6ae54]">Explore reports <ArrowRight className="h-4 w-4" /></Link>
        </Card>
      </section>

      <section className="py-14 lg:py-20">
        <div className="grid items-center gap-8 rounded-3xl border border-[#d6ae54]/14 bg-[radial-gradient(circle_at_80%_20%,rgba(214,174,84,.10),transparent_24%),linear-gradient(135deg,#14130f,#0b0b09_60%,#090908)] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
          <div>
            <div className="anpu-kicker">04 / OPEN SOURCE</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#f2eee2] sm:text-4xl">The core lives in Go.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#96938b]">The website is the front door. The original ANPU repository contains the Go CLI and security engine used for real analysis.</p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#77736b]"><span className="rounded-full border border-white/6 px-3 py-1.5">Go</span><span className="rounded-full border border-white/6 px-3 py-1.5">CLI</span><span className="rounded-full border border-white/6 px-3 py-1.5">Open source</span></div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg"><a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" /> Open ANPU repository</a></Button>
            <Button variant="outline" asChild size="lg"><Link to="/docs"><Terminal className="h-4 w-4" /> Read CLI docs</Link></Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/6 bg-white/[0.015] p-5"><LockKeyhole className="h-5 w-5 text-[#d6ae54]" /><h3 className="mt-4 font-semibold text-[#f2eee2]">Permission first</h3><p className="mt-1 text-sm leading-6 text-[#858178]">Only assess systems you own or have authorization to test.</p></div>
        <div className="rounded-2xl border border-white/6 bg-white/[0.015] p-5"><Code2 className="h-5 w-5 text-[#d6ae54]" /><h3 className="mt-4 font-semibold text-[#f2eee2]">Developer ready</h3><p className="mt-1 text-sm leading-6 text-[#858178]">A practical Go CLI with a web interface around it.</p></div>
        <div className="rounded-2xl border border-white/6 bg-white/[0.015] p-5"><Sparkles className="hidden" /><span className="text-xl text-[#d6ae54]">𓂀</span><h3 className="mt-4 font-semibold text-[#f2eee2]">Guardian by design</h3><p className="mt-1 text-sm leading-6 text-[#858178]">A distinct Egyptian identity without sacrificing clarity.</p></div>
      </section>

      <section className="py-16">
        <div className="overflow-hidden rounded-3xl border border-[#d6ae54]/15 bg-[#0b0b0a] px-6 py-11 text-center sm:px-10">
          <PharaohGuardian size={58} state="awake" className="mx-auto" />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-[#f2eee2] sm:text-4xl">Know your attack surface.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#96938b]">Start with the scanner, inspect the intelligence, and keep the core open.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild size="lg"><Link to="/scan">Scan a website</Link></Button><Button variant="outline" asChild size="lg"><Link to="/github">Explore the source</Link></Button></div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
