import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { ScanPage } from "@/pages/ScanPage";
import { ReportPage } from "@/pages/ReportPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { BadgePage } from "@/pages/BadgePage";
import { DocsPage } from "@/pages/DocsPage";
import { ApiPage } from "@/pages/ApiPage";
import { AboutPage } from "@/pages/AboutPage";
import { GithubPage } from "@/pages/GithubPage";

export function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/scan/:id" element={<ReportPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/:id" element={<ReportPage />} />
            <Route path="/badge" element={<BadgePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/github" element={<GithubPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
