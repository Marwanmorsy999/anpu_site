export type Severity = "critical" | "high" | "medium" | "low" | "info";
export type Grade = "A+" | "A" | "B" | "C" | "D" | "F";
export type ScanStatus = "pending" | "running" | "completed" | "failed";
export type ScanProfile = "surface" | "standard" | "deep";

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  category: string;
  description: string;
  evidence?: string;
  impact: string;
  recommendation: string;
  reference?: string;
}

export interface TlsInfo {
  version: string;
  cipher: string;
  grade: string;
  validUntil: string;
  issuer: string;
  subjectAltNames: string[];
}

export interface DnsInfo {
  a: string[];
  mx: string[];
  ns: string[];
  txt: string[];
  hasDnssec: boolean;
  hasDmarc: boolean;
  hasSpf: boolean;
}

export interface Technology {
  name: string;
  category: string;
  version?: string;
  confidence: number;
}

export interface FindingCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

export interface SecurityHeaderCheck {
  name: string;
  present: boolean;
  value?: string;
  status: "pass" | "warn" | "fail" | "info";
  recommendation?: string;
}

export interface ScanReport {
  id: string;
  target: string;
  url: string;
  scannedAt: string;
  profile: ScanProfile;
  score: number;
  grade: Grade;
  status: ScanStatus;
  findingCounts: FindingCounts;
  findings: Finding[];
  securityHeaders: SecurityHeaderCheck[];
  tls?: TlsInfo;
  dns?: DnsInfo;
  technologies: Technology[];
  redirectChain: string[];
  robotsTxt: boolean;
  sitemapXml: boolean;
  executiveSummary: string;
  isDemoData: boolean;
}

export interface ScanProgress {
  step: string;
  completed: boolean;
  active: boolean;
}
