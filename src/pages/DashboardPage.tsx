import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Clock, ExternalLink, ArrowRight } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockScanHistory } from "@/lib/mockData";

export function DashboardPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("scans");

  const filteredScans = mockScanHistory.filter((scan) =>
    scan.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (score: number) => {
    if (score >= 9) return { label: "EXCELLENT", severity: "pass" as const, color: "text-[#7CFF4F]" };
    if (score >= 8) return { label: "GOOD", severity: "pass" as const, color: "text-[#7CFF4F]" };
    if (score >= 6) return { label: "NEEDS ATTENTION", severity: "warn" as const, color: "text-[#FFD200]" };
    if (score >= 4) return { label: "POOR", severity: "warn" as const, color: "text-[#FF8C00]" };
    if (score >= 2) return { label: "HIGH RISK", severity: "fail" as const, color: "text-[#FF8C00]" };
    return { label: "CRITICAL", severity: "critical" as const, color: "text-[#FF2A2A]" };
  };

  const getTimeAgo = (id: string) => {
    switch (id) {
      case "scan-001": return "2 hours ago";
      case "scan-002": return "Yesterday";
      case "scan-003": return "Aug 24";
      case "scan-004": return "Aug 23";
      default: return "Unknown";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PharaohGuardian size={40} state="stable" />
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
              ANPU // DASHBOARD
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your security scans and reports.
          </p>
        </div>

        <Button size="lg" onClick={() => navigate("/scan")} className="gap-2">
          <Plus className="h-4 w-4" />
          NEW SCAN
        </Button>
      </div>

      {/* Tabs */}
      <Card className="p-2 mb-6 border-border">
        <div className="flex flex-wrap gap-1">
          {[
            { value: "scans", label: "SCANS", count: mockScanHistory.length },
            { value: "reports", label: "REPORTS", count: mockScanHistory.length },
            { value: "history", label: "HISTORY", count: mockScanHistory.length },
            { value: "settings", label: "SETTINGS", count: 0 },
          ].map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.value)}
              className="gap-2 text-xs"
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </Card>

      {/* Search */}
      <Card className="p-4 mb-6 border-border">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <Input
            type="text"
            placeholder="Search scans by domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>
      </Card>

      {/* Scan list */}
      <div className="space-y-4">
        {filteredScans.length > 0 ? (
          filteredScans.map((scan) => {
            const status = getStatusBadge(scan.score);
            return (
              <Card
                key={scan.id}
                className="p-4 hover:border-primary/30 transition-all cursor-pointer border-border"
                onClick={() => navigate(`/reports/${scan.id}`)}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <PharaohGuardian size={32} state="dormant" />
                      <div>
                        <p className="text-sm font-semibold text-foreground truncate">{scan.target}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{scan.url}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-primary">{scan.score}</p>
                      <p className="text-xs text-muted-foreground">/ 10</p>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary/30 text-xs">
                      {scan.grade}
                    </Badge>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        SCANNED
                      </p>
                      <p className="text-xs text-muted-foreground">{getTimeAgo(scan.id)}</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1" onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/reports/${scan.id}`);
                    }}>
                      VIEW <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-8 text-center border-border">
            <PharaohGuardian size={64} state="dormant" className="mx-auto mb-4 opacity-50" />
            <p className="text-primary mb-2">NO SCANS FOUND</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? `No scans match "${searchQuery}"` : "Start by running your first scan."}
            </p>
            {searchQuery && (
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("")} className="mt-4">
                CLEAR SEARCH
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "TOTAL SCANS", value: mockScanHistory.length, icon: "🔍" },
          { label: "AVG SCORE", value: "8.4", icon: "⭐" },
          { label: "HIGHEST GRADE", value: "A+", icon: "🏆" },
          { label: "RECENT SCANS", value: mockScanHistory.filter(s => s.id !== "scan-004").length, icon: "⏱️" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 text-center border-border">
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 text-center">
        <Button variant="outline" size="sm" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2">
            <ExternalLink className="h-3.5 w-3.5" />
            VIEW ON GITHUB
          </a>
        </Button>
      </div>
    </div>
  );
}

export default DashboardPage;
