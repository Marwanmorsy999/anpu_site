import { useNavigate } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockScanHistory } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function ReportsPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports</h1>
        <p className="mt-1 text-muted-foreground">Browse all generated security intelligence reports.</p>
      </div>
      <div className="space-y-3">
        {mockScanHistory.map((scan) => (
          <Card
            key={scan.id}
            className="p-5 bg-card/40 hover:bg-card/70 hover:border-primary/30 transition-all cursor-pointer flex items-center justify-between"
            onClick={() => navigate(`/reports/${scan.id}`)}
          >
            <div className="flex items-center gap-4">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">{scan.target}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Scanned {scan.id === "scan-001" ? "2 hours ago" : scan.id === "scan-002" ? "Yesterday" : scan.id === "scan-003" ? "Aug 24" : "Aug 23"} · Profile: {scan.profile}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{scan.score} <span className="text-xs text-muted-foreground font-normal">/ 10</span></p>
              </div>
              <Badge variant="outline" className={cn(
                "text-xs",
                scan.grade.startsWith("A") ? "text-green-400 border-green-500/30" :
                scan.grade === "B" ? "text-primary border-primary/30" :
                "text-yellow-400 border-yellow-500/30"
              )}>
                {scan.grade}
              </Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">Demo Data</Badge>
        <span className="ml-2 text-xs text-muted-foreground">Reports are generated from mock data until the backend is connected.</span>
      </div>
    </div>
  );
}
