import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, ExternalLink, Search, Plus } from "lucide-react";
import { PharaohGuardian } from "@/components/PharaohGuardian";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockScanHistory } from "@/lib/mockData";

export function ReportsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = mockScanHistory.filter((report) =>
    report.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="mb-8">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> BACK TO DASHBOARD
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <PharaohGuardian size={40} state="stable" />
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            ANPU // SCAN REPORTS
          </h1>
        </div>
        <p className="text-muted-foreground">
          Browse and manage your security reports.
        </p>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6 border-border">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <Input
            type="text"
            placeholder="Search reports by domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>
      </Card>

      {/* Report list */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <Card
              key={report.id}
              className="p-4 hover:border-primary/30 transition-all cursor-pointer border-border"
              onClick={() => navigate(`/reports/${report.id}`)}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground truncate">{report.target}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{report.url}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">{report.score}</p>
                    <p className="text-xs text-muted-foreground">/ 10</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      report.grade === 'A+' || report.grade === 'A' ? 'text-[#7CFF4F] border-[#49D84A]' :
                      report.grade === 'B' ? 'text-[#FFD200] border-[#D88900]' :
                      'text-[#FF8C00] border-[#CC6600]'
                    }`}
                  >
                    {report.grade}
                  </Badge>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      SCANNED
                    </p>
                    <p className="text-xs text-muted-foreground">{getTimeAgo(report.id)}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/reports/${report.id}`);
                    }}
                  >
                    VIEW REPORT
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center border-border">
            <FileText className="h-12 w-12 text-primary opacity-50 mx-auto mb-4" />
            <p className="text-primary mb-2">NO REPORTS FOUND</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? `No reports match "${searchQuery}"` : "No reports have been generated yet."}
            </p>
            {searchQuery && (
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("")} className="mt-4">
                CLEAR SEARCH
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "TOTAL REPORTS", value: mockScanHistory.length, icon: "𓄿" },
          { label: "AVERAGE SCORE", value: "8.4", icon: "⭐" },
          { label: "BEST GRADE", value: "A+", icon: "🏆" },
          { label: "DEMO REPORTS", value: mockScanHistory.length, icon: "📋" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 text-center border-border">
            <p className="text-2xl mb-2 hieroglyph">{stat.icon}</p>
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <Button size="lg" onClick={() => navigate("/scan")} className="gap-2">
          <Plus className="h-4 w-4" />
          NEW SCAN
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="https://github.com/Marwanmorsy999/anpu" target="_blank" rel="noopener noreferrer" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            VIEW ON GITHUB
          </a>
        </Button>
      </div>
    </div>
  );
}

export default ReportsPage;
