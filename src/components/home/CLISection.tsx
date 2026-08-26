import { Terminal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scanProgressSteps } from "@/lib/mockData";

export function CLISection() {
  return (
    <section className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Badge variant="outline" className="text-primary border-primary/30 mb-4">Developer Experience</Badge>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">CLI / Developer Experience</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              ANPU is not only a website. The Go-based CLI runs the same scanning engine locally, in CI, or in automation.
            </p>
            <div className="mt-8">
              <Button variant="outline" size="lg" asChild>
                <a href="/docs" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  View Documentation
                </a>
              </Button>
            </div>
          </div>
          <div>
            <div className="rounded-xl border border-border/60 bg-black/50 overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/20">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono flex items-center gap-1.5">
                  <Terminal className="h-3 w-3" /> anpu
                </span>
              </div>
              <div className="p-5 font-mono text-sm space-y-1.5">
                <p className="text-muted-foreground">$ <span className="text-primary">anpu</span> scan https://example.com</p>
                <p className="text-muted-foreground/50 mt-4">ANPU Web Security Intelligence</p>
                <p className="text-muted-foreground/50">Target: <span className="text-foreground">example.com</span></p>
                <p className="text-muted-foreground/50">Profile: <span className="text-foreground">deep</span></p>
                <div className="mt-4 space-y-1">
                  {scanProgressSteps.slice(1, 7).map((s) => (
                    <p key={s} className="text-green-400 flex items-center gap-2">
                      <span className="text-green-400">&#10003;</span> {s}
                    </p>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/30">
                  <p className="text-foreground">Risk Score: <span className="text-primary font-bold">8.7/10</span></p>
                  <p className="text-foreground">Grade: <span className="text-primary font-bold">A</span></p>
                  <p className="text-muted-foreground/50 mt-2">$ <span className="terminal-cursor text-primary">_</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
