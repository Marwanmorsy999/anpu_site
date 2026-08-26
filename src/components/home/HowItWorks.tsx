export function HowItWorks() {
  const steps = [
    { num: "01", label: "Target", desc: "Enter the URL you want to analyze." },
    { num: "02", label: "Recon", desc: "ANPU collects DNS, TLS, headers, and public surface data." },
    { num: "03", label: "Analyze", desc: "Each signal is evaluated against security best practices." },
    { num: "04", label: "Score", desc: "Findings are weighted into an understandable score." },
    { num: "05", label: "Report", desc: "Receive a clear, shareable security intelligence report." },
  ];

  return (
    <section className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">How ANPU Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">From target to report in five steps.</p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:flex items-start justify-between gap-2">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-start">
              <div className="flex flex-col items-center text-center w-44">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/25 text-primary text-lg font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center pt-7">
                  <div className="w-8 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden flex flex-col items-center gap-2">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center">
              <div className="flex items-center gap-4 px-6 py-4 rounded-lg border border-border/50 bg-card/40 w-full max-w-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/25 text-primary text-sm font-bold">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{step.label}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && <div className="w-px h-6 bg-border/50" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
