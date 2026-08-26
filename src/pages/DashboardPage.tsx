import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, ArrowRight, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { GuardianStatus } from "@/components/GuardianStatus";
import { ThreatIndex } from "@/components/ThreatIndex";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockScanHistory } from "@/lib/mockData";

export function DashboardPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScans = mockScanHistory.filter((scan) =>
    scan.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate average score from mock data
  const avgScore = mockScanHistory.reduce((sum, scan) => sum + scan.score, 0) / mockScanHistory.length;
  const avgGrade = avgScore >= 9 ? "A+" : avgScore >= 8 ? "A" : avgScore >= 6 ? "B" : avgScore >= 4 ? "C" : "D";

  const getTimeAgo = (id: string) => {
    switch (id) {
      case "scan-001": return "2 HOURS AGO";
      case "scan-002": return "1 DAY AGO";
      case "scan-003": return "2 DAYS AGO";
      case "scan-004": return "4 DAYS AGO";
      default: return "UNKNOWN";
    }
  };

  const getSeverityBadge = (severity: string, count: number) => {
    if (count === 0) return null;
    const icons = {
      critical: <XCircle className="h-3 w-3" />,
      high: <AlertTriangle className="h-3 w-3" />,
      medium: <AlertTriangle className="h-3 w-3" />,
      low: <CheckCircle className="h-3 w-3" />,
      info: <Info className="h-3 w-3" />,
    };
    const colors = {
      critical: "text-[#FF2A2A]",
      high: "text-[#FF8C00]",
      medium: "text-[#FFD200]",
      low: "text-[#7CFF4F]",
      info: "text-muted-foreground",
    };
    const icon = icons[severity as keyof typeof icons] || <Info className="h-3 w-3" />;
    const color = colors[severity as keyof typeof colors] || "text-muted-foreground";
    return (
      <Badge key={severity} variant="outline" className={`gap-1 ${color} border-current/30`}>
        {icon}
        {severity.toUpperCase()} {count > 1 ? `(${count})` : ""}
      </Badge>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Module Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-2">
          ANPU // COMMAND CENTER
        </h1>
        <p className="text-muted-foreground">
          Central operations room for ANPU Security Intelligence.
        </p>
      </div>

      {/* System Status Matrix */}
      <Card className="p-6 mb-6 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          SYSTEM STATUS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "CORE", status: "ONLINE", color: "text-[#7CFF4F]", barColor: "bg-[#7CFF4F]" },
            { label: "SCAN ENGINE", status: "READY", color: "text-[#7CFF4F]", barColor: "bg-[#7CFF4F]" },
            { label: "REPORT ENGINE", status: "READY", color: "text-[#7CFF4F]", barColor: "bg-[#7CFF4F]" },
            { label: "GUARDIAN", status: "AWAKE", color: "text-[#FFB000]", barColor: "bg-[#FFB000]" },
          ].map((item, i) => (
            <Card key={i} className="p-4 bg-muted/20 border-border/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  {item.label}
                </span>
                <span className={`text-xs font-bold ${item.color}`}>
                  {item.status}
                </span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${item.barColor} rounded-full`} style={{ width: "100%" }} />
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Threat Index Centerpiece */}
      <div className="mb-8">
        <ThreatIndex score={avgScore} grade={avgGrade} guardianStatus="awake" size="lg" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Scan Archive */}
        <div className="lg:col-span-2">
          <Card className="p-6 border-border h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                SCAN ARCHIVE
              </h2>
              <Button size="sm" onClick={() => navigate("/scan")} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                NEW SCAN
              </Button>
            </div>
            
            {/* Search */}
            <Card className="p-3 mb-4 border-border/50 bg-muted/20">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                <Input
                  type="text"
                  placeholder="Filter by domain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-xs"
                />
              </div>
            </Card>

            {/* Scan list */}
            <div className="space-y-2">
              {filteredScans.length > 0 ? (
                filteredScans.map((scan, i) => (
                  <Card
                    key={scan.id}
                    className="p-3 hover:border-primary/30 transition-all cursor-pointer border-border/50 flex items-center justify-between"
                    onClick={() => navigate(`/reports/${scan.id}`)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs text-muted-foreground/70 w-8 text-right">
                        [{i + 1 < 10 ? `00${i + 1}` : `0${i + 1}`}]
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {scan.target}
                        </p>
                        <p className="text-xs text-muted-foreground">{scan.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{scan.score}</p>
                        <p className="text-xs text-muted-foreground">/ 10</p>
                      </div>
                      <Badge variant="outline" className="text-secondary border-secondary/30 text-xs">
                        {scan.grade}
                      </Badge>
                      <span className="text-xs text-muted-foreground/70">
                        {getTimeAgo(scan.id)}
                      </span>
                      <Button variant="ghost" size="xs" className="h-6 w-6 p-0" onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/reports/${scan.id}`);
                      }}>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center border-border/30 bg-muted/20">
                  <PharaohGuardian size={64} state="dormant" className="mx-auto mb-4 opacity-50" />
                  <p className="text-primary mb-2">NO SCANS FOUND</p>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? `No scans match "${searchQuery}"` : "Start by running your first scan."}
                  </p>
                  {searchQuery && (
                    <Button variant="outline" size="sm" onClick={() => setSearchQuery("")} className="mt-4">
                      CLEAR FILTER
                    </Button>
                  )}
                </Card>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Guardian & Active Findings */}
        <div className="space-y-6">
          {/* Guardian Panel */}
          <Card className="p-6 border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              GUARDIAN STATUS
            </h2>
            <GuardianStatus status="awake" size={80} showLabel={true} className="mx-auto" />
            <div className="mt-4 pt-4 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                ANPU CORE
              </p>
              <p className="text-sm text-[#7CFF4F] font-semibold">
                OPERATIONAL
              </p>
            </div>
          </Card>

          {/* Active Findings */}
          <Card className="p-6 border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              ACTIVE FINDINGS
            </h2>
            <div className="space-y-2">
              {mockScanHistory.length > 0 && (
                <>
                  {getSeverityBadge("critical", mockScanHistory[0].findingCounts.critical)}
                  {getSeverityBadge("high", mockScanHistory[0].findingCounts.high)}
                  {getSeverityBadge("medium", mockScanHistory[0].findingCounts.medium)}
                  {getSeverityBadge("low", mockScanHistory[0].findingCounts.low)}
                  {getSeverityBadge("info", mockScanHistory[0].findingCounts.info)}
                </>
              )}
              {mockScanHistory.length === 0 && (
                <Card className="p-4 text-center border-border/30 bg-muted/20">
                  <CheckCircle className="h-6 w-6 text-[#7CFF4F] mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    NO ACTIVE FINDINGS
                  </p>
                </Card>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Targets */}
      <Card className="p-6 mb-8 border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          RECENT TARGETS
        </h2>
        <div className="flex flex-wrap gap-2">
          {mockScanHistory.map((scan) => (
            <Button
              key={scan.id}
              variant="outline"
              size="sm"
              onClick={() => navigate(`/reports/${scan.id}`)}
              className="gap-2"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              {scan.target}
            </Button>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "TOTAL SCANS", value: mockScanHistory.length, icon: "🔍" },
          { label: "AVG SCORE", value: avgScore.toFixed(1), icon: "⭐" },
          { label: "HIGHEST GRADE", value: avgGrade, icon: "🏆" },
          { label: "MODULES", value: "9", icon: "📋" },
        ].map((stat, i) => (
          <Card key={i} className="p-4 text-center border-border">
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      {/* System Footer Note */}
      <Card className="p-4 border-amber/30 bg-amber/5 text-center">
        <p className="text-amber mb-2">
          ⚠️ DEMO MODE
        </p>
        <p className="text-xs text-muted-foreground">
          This is a visualization of the ANPU Command Center. 
          The dashboard uses mock data and does not perform live scans.
        </p>
      </Card>

      {/* Actions */}
      <div className="mt-8 text-center">
        <Button size="lg" onClick={() => navigate("/scan")} className="gap-2">
          <Plus className="h-4 w-4" />
          NEW SCAN
        </Button>
      </div>
    </div>
  );
}

export default DashboardPage;
