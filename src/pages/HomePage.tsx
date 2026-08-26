import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronRight, Copy, FileText, GitBranch, LockKeyhole, Radar, ScanLine, ShieldCheck, Terminal, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const capabilities = [
  { title: "Discover exposure", description: "Map public DNS, TLS, redirects, robots, sitemaps, technologies, and other visible signals.", icon: Radar, accent: "gold" },
  { title: "Analyze security", description: "Inspect transport, headers, cookies, and configuration details that shape the public security posture.", icon: ShieldCheck, accent: "green" },
  { title: "Explain the result", description: "Translate raw observations into findings with evidence, impact, severity, and recommendations.", icon: FileText, accent: "sand" },
];

const checks = [
  ["HTTPS / TLS", "PASS", "Modern configuration"],
  ["HSTS", "PASS", "Enabled"],
  ["Content-Security-Policy", "WARN", "Review recommended"],
  ["Cookie flags", "WARN", "Review recommended"],
  ["Public surface", "PASS", "No obvious exposure"],
];

const scanSteps = ["Validating target", "Resolving DNS", "Inspecting TLS", "Reviewing headers", "Mapping public surface", "Preparing report"];
const signals = [["DNS", 92], ["TLS", 96], ["HEADERS", 78], ["COOKIES", 68], ["ROBOTS", 84], ["SURFACE", 74]];

export function HomePage() {
  const [target, setTarget] = useState("https://example.com");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCheck, setSelectedCheck] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    const interval = window.setInterval(() => setProgress((current) => Math.min(current + 12, 100)), 360);
    return () => window.clearInterval(interval);
  }, [scanning]);

  useEffect(() => {
    if (!scanning || progress < 100) return;
    const timeout = window.setTimeout(() => setScanning(false), 650);
    return () => window.clearTimeout(timeout);
  }, [scanning, progress]);

  const activeStep = Math.min(Math.floor(progress / 17), scanSteps.length - 1);

  const startDemoScan = () => {
    if (!target.trim() || scanning) return;
    setProgress(0);
    setScanning(true);
  };

  const copyCli = async () => {
    try {
      await navigator.clipboard.writeText("anpu scan https://example.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="anpu-home-shell">
      <section className="anpu-hero-v3">
        <div className="anpu-hero-noise" aria-hidden="true" />
        <div className="anpu-hero-glyphs" aria-hidden="true"><span>𓂀</span><span>𓆣</span><span>𓁹</span><span>𓆙</span></div>
        <div className="anpu-hero-main">
          <div className="anpu-hero-content">
            <div className="anpu-brand-row"><span className="anpu-eyebrow"><span>𓂀</span> ANPU / WEB SECURITY INTELLIGENCE</span><Badge variant="secondary">OPEN SOURCE</Badge></div>
            <h1>Guard what<br /><span>you build.</span></h1>
            <p className="anpu-hero-description">Discover what your web application exposes, understand the security posture, and turn the result into intelligence you can act on.</p>
            <div className="anpu-launch-card">
              <div className="anpu-launch-header"><span>SCAN A WEBSITE</span><span className={scanning ? "anpu-state is-active" : "anpu-state"}><i /> {scanning ? "SCAN IN PROGRESS" : "DEMO READY"}</span></div>
              <div className="anpu-launch-row">
                <div className="anpu-url-field"><span className="anpu-url-prefix">https://</span><input value={target.replace(/^https?:\/\//, "")} onChange={(event) => setTarget(`https://${event.target.value}`)} onKeyDown={(event) => event.key === "Enter" && startDemoScan()} aria-label="Target website" /></div>
                <Button size="lg" onClick={startDemoScan} disabled={scanning}><ScanLine className="h-4 w-4" />{scanning ? "Analyzing…" : "Scan website"}<ArrowRight className="h-4 w-4" /></Button>
              </div>
              <div className="anpu-launch-footer"><LockKeyhole className="h-3.5 w-3.5" /> Only scan systems you own or have permission to test.</div>
              {scanning && <div className="anpu-scan-progress-panel"><div className="anpu-progress-top"><span>{scanSteps[activeStep]}</span><b>{progress}%</b></div><div className="anpu-progress-line"><span style={{ width: `${progress}%` }} /></div><div className="anpu-progress-list">{scanSteps.map((step, index) => <span key={step} className={index <= activeStep ? "is-done" : ""}>{index <= activeStep ? "✓" : "○"} {step}</span>)}</div></div>}
              {!scanning && progress === 100 && <div className="anpu-demo-complete"><CheckCheck className="h-4 w-4" /> Demo scan complete · <Link to="/reports/scan-001">View example report</Link></div>}
            </div>
            <div className="anpu-proof-row"><span><Check /> Go engine</span><span><Check /> CLI first</span><span><Check /> Permission-first</span><span><Check /> No lock-in</span></div>
          </div>

          <div className="anpu-hero-art"><div className="anpu-art-frame">
            <div className="anpu-art-topline"><span>THE GUARDIAN</span><span>ANPU CORE</span></div>
            <div className="anpu-art-stage">
              <div className="anpu-halo halo-one" /><div className="anpu-halo halo-two" /><div className="anpu-halo halo-three" />
              <div className="anpu-glyph-ring" aria-hidden="true"><span>𓂀</span><span>𓆣</span><span>𓏏</span><span>𓁹</span><span>𓂻</span><span>𓆙</span></div>
              <div className={`anpu-guardian-wrap ${scanning ? "is-scanning" : ""}`}><PharaohGuardian size={360} state={scanning ? "scanning" : "stable"} pulse={scanning} /></div>
              <div className="anpu-guardian-state"><span>Guardian state</span><b>{scanning ? "ANALYZING" : "WATCHING"}</b></div>
            </div>
            <div className="anpu-art-metrics"><div><small>POSTURE</small><strong>A</strong></div><div><small>SIGNALS</small><strong>18</strong></div><div><small>MODE</small><strong>SAFE</strong></div></div>
          </div></div>
        </div>
        <div className="anpu-trust-strip"><span>BUILT AROUND THE ANPU GO CORE</span><span>OPEN SOURCE</span><span>DEVELOPER FOCUSED</span><span>AUTHORIZED TESTING</span></div>
      </section>

      <section className="anpu-section anpu-section-intro"><div className="anpu-section-heading"><div className="anpu-eyebrow">01 / THE WORKFLOW</div><h2>See the surface.<br />Understand the signal.</h2><p>ANPU keeps the path simple: discover what is visible, analyze security-relevant signals, and explain what needs attention.</p></div><div className="anpu-module-grid">{capabilities.map(({ title, description, icon: Icon, accent }) => <Card key={title} className={`anpu-module-card accent-${accent}`}><div className="anpu-module-top"><div className="anpu-module-icon"><Icon /></div><span>0{capabilities.findIndex((item) => item.title === title) + 1}</span></div><h3>{title}</h3><p>{description}</p><div className="anpu-module-link">Explore <ChevronRight /></div></Card>)}</div></section>

      <section className="anpu-section anpu-live-section"><div className="anpu-section-heading center"><div className="anpu-eyebrow">02 / LIVE SAMPLE</div><h2>A security report with context.</h2><p>Not just a number. ANPU keeps the evidence visible so the result is useful.</p></div><Card className="anpu-live-console"><div className="anpu-console-head"><div><span className="anpu-console-target">example.com</span><span className="anpu-console-meta">Deep profile · Demo</span></div><span className="anpu-console-score">8.7 <small>/10</small> <b>A</b></span></div><div className="anpu-console-grid"><div className="anpu-console-nav">{checks.map(([name, status], index) => <button key={name} type="button" className={selectedCheck === index ? "is-selected" : ""} onClick={() => setSelectedCheck(index)}><span className={status === "PASS" ? "dot-pass" : "dot-warn"} />{name}<ChevronRight /></button>)}</div><div className="anpu-console-detail"><div className="anpu-detail-label">{checks[selectedCheck][1]}</div><h3>{checks[selectedCheck][0]}</h3><p>{checks[selectedCheck][2]}. ANPU records the observation, explains why it matters, and points toward a practical next step.</p><div className="anpu-evidence"><span>OBSERVATION</span><code>response security policy detected</code></div><div className="anpu-detail-actions"><Button variant="outline" asChild><Link to="/reports/scan-001">Open full report <ArrowRight /></Link></Button><Badge variant="secondary">Demo data</Badge></div></div></div></Card></section>

      <section className="anpu-section anpu-process-section-v3"><div className="anpu-section-heading center"><div className="anpu-eyebrow">03 / FROM TARGET TO REPORT</div><h2>One scan. Five clear stages.</h2></div><div className="anpu-process-v3">{["Target","Discover","Analyze","Score","Report"].map((step, index) => <div className="anpu-process-v3-step" key={step}><span>0{index + 1}</span><div><strong>{step}</strong><small>{["Choose an authorized target.","Collect public signals.","Evaluate relevant controls.","Prioritize the findings.","Make the result useful."][index]}</small></div>{index < 4 && <i />}</div>)}</div></section>

      <section className="anpu-section anpu-monitor-section"><div className="anpu-monitor-copy"><div className="anpu-eyebrow">04 / SIGNAL MONITOR</div><h2>Built to make the invisible visible.</h2><p>ANPU brings disparate public signals into one place so developers can understand their external security posture without drowning in noise.</p><Link to="/scan" className="anpu-inline-link">Open scanner <ArrowRight /></Link></div><Card className="anpu-monitor-card"><div className="anpu-monitor-head"><span>PUBLIC SIGNALS</span><span><i /> NOMINAL</span></div><div className="anpu-signal-list">{signals.map(([name, value]) => <div key={name}><span>{name}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}%</b></div>)}</div><div className="anpu-monitor-foot">Signal visualization · representative demo data</div></Card></section>

      <section className="anpu-section anpu-cli-section"><div className="anpu-cli-card"><div className="anpu-cli-header"><span>ANPU CLI</span><span>GO · OPEN SOURCE</span></div><div className="anpu-cli-body"><div className="anpu-cli-copy"><div className="anpu-eyebrow">05 / THE CORE</div><h2>The web is the front door.</h2><p>The original ANPU project is the open-source Go security engine. Run it from your terminal, automate it in your workflow, and keep the core inspectable.</p><div className="anpu-cli-actions"><Button asChild><a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer"><GitBranch /> Open ANPU repository</a></Button><Button variant="outline" asChild><Link to="/docs"><Terminal /> Read the docs</Link></Button></div></div><div className="anpu-cli-terminal"><div className="anpu-terminal-bar"><span>ANPU TERMINAL</span><button type="button" onClick={copyCli} aria-label="Copy CLI command">{copied ? <CheckCheck /> : <Copy />}</button></div><pre><span className="prompt">$</span> anpu scan https://example.com{"\n\n"}<span className="good">✓</span> DNS reconnaissance{"\n"}<span className="good">✓</span> TLS analysis{"\n"}<span className="good">✓</span> Security headers{"\n"}<span className="good">✓</span> Public surface{"\n\n"}<span className="gold">Risk Score: 8.7/10{"\n"}Grade: A</span>{"\n"}<span className="cursor">█</span></pre></div></div></div></section>

      <section className="anpu-section anpu-source-banner"><div><div className="anpu-eyebrow">06 / OPEN SOURCE SECURITY</div><h2>Guard it. Understand it. Improve it.</h2><p>ANPU combines a recognizable identity with a practical security workflow. The source stays public; the product stays clear.</p></div><div className="anpu-source-mark"><span>𓂀</span><small>ANPU</small></div></section>
      <section className="anpu-final-cta-v3"><div className="anpu-final-glyph">𓂀</div><div><div className="anpu-eyebrow">ANPU / GUARDIAN READY</div><h2>Know what your web surface reveals.</h2><p>Start with an authorized scan and see the result in context.</p></div><Button asChild size="lg"><Link to="/scan">Open the scanner <ArrowRight /></Link></Button></section>
    </div>
  );
}

export default HomePage;
