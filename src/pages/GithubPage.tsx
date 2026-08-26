import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, GitBranch, Star, Eye, Fork, Code2, Download, Bug, PullRequest, Commit, Users } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GithubPage() {
  const repoStats = [
    { label: "STARS", value: "1,000+", icon: <Star className="h-5 w-5" />, color: "text-yellow-400" },
    { label: "FORKS", value: "100+", icon: <GitBranch className="h-5 w-5" />, color: "text-purple-400" },
    { label: "WATCHERS", value: "50+", icon: <Eye className="h-5 w-5" />, color: "text-blue-400" },
    { label: "OPEN ISSUES", value: "5", icon: <Bug className="h-5 w-5" />, color: "text-red-400" },
    { label: "OPEN PRS", value: "3", icon: <PullRequest className="h-5 w-5" />, color: "text-green-400" },
    { label: "COMMITS", value: "200+", icon: <Commit className="h-5 w-5" />, color: "text-orange-400" },
  ];

  const features = [
    { title: "OPEN SOURCE", desc: "Completely free and open-source under MIT License" },
    { title: "ACTIVE DEVELOPMENT", desc: "Regular updates and new features" },
    { title: "COMMUNITY DRIVEN", desc: "Built by the community, for the community" },
    { title: "WELL DOCUMENTED", desc: "Comprehensive documentation and examples" },
    { title: "TESTED", desc: "Extensive test coverage for reliability" },
    { title: "PERFORMANT", desc: "Optimized for speed and efficiency" },
  ];

  const languages = [
    { name: "Go", percentage: 85, color: "bg-cyan-500" },
    { name: "TypeScript", percentage: 10, color: "bg-blue-500" },
    { name: "HTML/CSS", percentage: 5, color: "bg-orange-500" },
  ];

  const topContributors = [
    { name: "MARWAN MORSY", commits: 180, avatar: "MM" },
    { name: "CONTRIBUTOR 1", commits: 15, avatar: "C1" },
    { name: "CONTRIBUTOR 2", commits: 10, avatar: "C2" },
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
          <Code2 className="h-10 w-10 text-primary" />
          <PharaohGuardian size={48} state="stable" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          ANPU ON GITHUB
        </h1>
        <p className="mt-3 text-muted-foreground">
          Contribute, report issues, and star the repository.
        </p>
      </div>

      {/* Navigation */}
      <Card className="p-4 mb-6 border-border">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: "REPOSITORY", href: "#repository" },
            { label: "STATISTICS", href: "#statistics" },
            { label: "FEATURES", href: "#features" },
            { label: "CONTRIBUTORS", href: "#contributors" },
            { label: "HOW TO CONTRIBUTE", href: "#contribute" },
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

      {/* Repository Card */}
      <section id="repository" className="mb-8">
        <Card className="p-6 mb-6 border-border bg-muted/20">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-muted border border-border rounded-lg flex items-center justify-center flex-shrink-0">
              <PharaohGuardian size={32} state="awake" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-2">
                MARWANMORSY999/ANPU
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                Ancient Egyptian web security intelligence system. ANPU performs reconnaissance and security analysis on publicly exposed web assets.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs">
                  GO
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs">
                  SECURITY
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs">
                  WEB
                </span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs">
                  OPEN SOURCE
                </span>
              </div>
              <Button size="lg" asChild>
                <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2 w-full sm:w-auto">
                  <ExternalLink className="h-4 w-4" />
                  VIEW ON GITHUB
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Statistics */}
      <section id="statistics" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            REPOSITORY STATISTICS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {repoStats.map((stat, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30 text-center">
                <div className={`text-2xl ${stat.color} mb-2`}>{stat.icon}</div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Language Distribution */}
      <Card className="p-6 mb-8 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          LANGUAGES
        </h2>
        <div className="space-y-4">
          {languages.map((lang, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.percentage}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${lang.color}`}
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Features */}
      <section id="features" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            PROJECT FEATURES
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <p className="text-sm font-semibold text-primary mb-2">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* Top Contributors */}
      <section id="contributors" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              TOP CONTRIBUTORS
            </h2>
          </div>
          <div className="space-y-4">
            {topContributors.map((contributor, i) => (
              <Card key={i} className="p-4 bg-muted/20 border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted border border-border rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-muted-foreground">{contributor.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">{contributor.commits} commits</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href="#" className="text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* How to Contribute */}
      <section id="contribute" className="mb-8">
        <Card className="p-6 mb-6 border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            HOW TO CONTRIBUTE
          </h2>
          <div className="space-y-4">
            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                REPORT BUGS
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                Found a bug? Please report it on our GitHub Issues page. Include as much detail as possible: steps to reproduce, expected behavior, actual behavior, and any relevant screenshots or logs.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/Marwanmorsy999/anpu/issues" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Bug className="h-4 w-4" />
                  REPORT ISSUE
                </a>
              </Button>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                REQUEST FEATURES
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                Have an idea for a new feature? Create a feature request on GitHub Issues. Describe your use case and how the feature would help you and other users.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/Marwanmorsy999/anpu/issues" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  REQUEST FEATURE
                </a>
              </Button>
            </Card>

            <Card className="p-4 bg-muted/20 border-border/30">
              <p className="text-sm font-semibold text-secondary mb-2">
                SUBMIT CODE
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                Want to contribute code? Fork the repository, create a feature branch, make your changes, and submit a pull request. Please follow our coding standards and include tests for new features.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/Marwanmorsy999/anpu/fork" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <GitBranch className="h-4 w-4" />
                  FORK & CONTRIBUTE
                </a>
              </Button>
            </Card>
          </div>
        </Card>
      </section>

      {/* Quick Links */}
      <Card className="p-6 mb-8 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          QUICK LINKS
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "SOURCE CODE",
              href: "https://github.com/Marwanmorsy999/anpu",
              desc: "View the complete source code on GitHub",
              icon: <Code2 className="h-4 w-4" />
            },
            {
              title: "ISSUES",
              href: "https://github.com/Marwanmorsy999/anpu/issues",
              desc: "Report bugs and request features",
              icon: <Bug className="h-4 w-4" />
            },
            {
              title: "PULL REQUESTS",
              href: "https://github.com/Marwanmorsy999/anpu/pulls",
              desc: "View open pull requests",
              icon: <PullRequest className="h-4 w-4" />
            },
            {
              title: "RELEASES",
              href: "https://github.com/Marwanmorsy999/anpu/releases",
              desc: "View all releases and changelogs",
              icon: <Download className="h-4 w-4" />
            },
          ].map((link, i) => (
            <Button key={i} variant="outline" size="lg" asChild className="text-left p-4">
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3">
                <span className="text-primary">{link.icon}</span>
                <div>
                  <span className="text-sm font-semibold text-foreground">{link.title}</span>
                  <br />
                  <span className="text-xs text-muted-foreground">{link.desc}</span>
                </div>
                <ExternalLink className="h-3 w-3 text-primary mt-1 ml-auto" />
              </a>
            </Button>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button size="lg" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2">
            <Star className="h-4 w-4" />
            STAR ON GITHUB
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu/fork" target="_blank" rel="noopener noreferrer" className="gap-2">
            <GitBranch className="h-4 w-4" />
            FORK REPOSITORY
          </a>
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BACK TO TOP
        </Button>
      </div>
    </div>
  );
}

export default GithubPage;
