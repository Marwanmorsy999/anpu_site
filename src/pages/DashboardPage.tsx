import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, ArrowRight, Search, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockScanHistory } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type SortKey = "score" | "target" | "date";

export function DashboardPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");

  const filtered = mockScanHistory
    .filter((s) => s.target.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === "score") return b.score - a.score;
      if (sortKey === "target") return a.target.localeCompare(b.target);
      return b.scannedAt.localeCompare(a.scannedAt);
    });

  const avgScore = (mockScanHistory.reduce((sum, s) => sum + s.score, 0) / mockScanHistory.length).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Track and manage your security scans.</p>
        </div>
        <Button onClick={() => navigate("/scan")} className="gap-2">
          <Zap className="h-4 w-4" /> New Scan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Scans", value: mockScanHistory.length },
          { label: "Average Score", value: avgScore },
          { label: "Best Grade", value: "A+" },
          { label: "Active Targets", value: mockScanHistory.length },
        ].map((stat) => (
          <Card key={stat.label} className="p-5 bg-card/40">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by target..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1.5">
          {(["date", "score", "target"] as SortKey[]).map((k) => (
            <Button
              key={k}
              variant={sortKey === k ? "default" : "outline"}
              size="sm"
              onClick={() => setSortKey(k)}
              className="gap-1.5 capitalize"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {k}
            </Button>
          ))}
        </div>
      </div>

      {/* Scan list */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((scan) => (
          <Card
            key={scan.id}
            className="p-5 bg-card/40 hover:bg-card/70 hover:border-primary/30 transition-all cursor-pointer"
            onClick={() => navigate(`/reports/${scan.id}`)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground truncate">{scan.target}</p>
              </div>
              <Badge variant="outline" className={cn(
                "text-xs",
                scan.grade.startsWith("A") ? "text-green-400 border-green-500/30" :
                scan.grade === "B" ? "text-primary border-primary/30" :
                "text-yellow-400 border-yellow-500/30"
              )}>
                {scan.grade}
              </Badge>
            </div>
            <p className="text-3xl font-bold text-primary mb-1">
              {scan.score} <span className="text-sm text-muted-foreground font-normal">/ 10</span>
            </p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">
                {scan.id === "scan-001" ? "2 hours ago" : scan.id === "scan-002" ? "Yesterday" : scan.id === "scan-003" ? "Aug 24" : "Aug 23"}
              </p>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground">No scans match your filter.</p>
        </div>
      )}

      <div className="mt-6">
        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">Demo Data</Badge>
        <span className="ml-2 text-xs text-muted-foreground">Scan history is not persisted until the backend is connected.</span>
      </div>
    </div>
  );
}
