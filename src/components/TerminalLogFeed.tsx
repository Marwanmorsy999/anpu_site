import { useEffect, useMemo, useRef, useState } from "react";

const BASE_LOGS = [
  ["INIT", "ANPU ENGINE v1.0.4..."],
  ["INFO", "RESOLVING TARGET: TARGET... [203.0.113.195]"],
  ["INFO", "PROBING TLS HANDSHAKE... TLS 1.3 VALIDATED [ECDHE-RSA-AES128-GCM-SHA256]"],
  ["INFO", "EXAMINING HTTP HEADERS..."],
  ["WARN", "[!] MISSING: Content-Security-Policy"],
  ["WARN", "[!] MISSING: Strict-Transport-Security (HSTS)"],
  ["INFO", "AGGREGATING SURFACE METRICS..."],
  ["DONE", "SCORE GENERATED: 7.8/10 [GRADE B] -- SCAN COMPLETE."],
] as const;

const pad = (n: number) => n.toString().padStart(2, "0");

export function TerminalLogFeed({ running, target }: { running: boolean; target: string }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const logs = useMemo(() => {
    const host = target.trim() || "https://example.com";
    return BASE_LOGS.map(([kind, message], index) => {
      const now = new Date();
      now.setSeconds(now.getSeconds() + index);
      const time = `[${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;
      return `${time} > ${message.replace("TARGET", host)}`;
    });
  }, [target]);

  useEffect(() => {
    if (!running) return;
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setVisibleLines([]);
    setCursor(0);

    logs.forEach((line, index) => {
      const timer = window.setTimeout(() => {
        setVisibleLines((current) => [...current, line]);
        setCursor(index + 1);
      }, index * 430);
      timers.current.push(timer);
    });

    return () => timers.current.forEach(window.clearTimeout);
  }, [running, logs]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleLines]);

  const fallback = logs.slice(0, 1);

  return (
    <div className="v7-terminal-feed" aria-live="polite" aria-label="ANPU terminal output">
      <div className="v7-terminal-feed-head"><span>ANPU://ENGINE/STDOUT</span><span>{running ? "STREAMING" : cursor >= logs.length ? "COMPLETE" : "STANDBY"}</span></div>
      <div className="v7-terminal-feed-body">
        {(visibleLines.length ? visibleLines : running ? [] : fallback).map((line, index) => (
          <div key={`${line}-${index}`} className={line.includes("[!]") ? "warn" : line.includes("SCORE GENERATED") ? "done" : ""}>{line}</div>
        ))}
        <div className="v7-terminal-cursor"><span>█</span></div>
        <div ref={endRef} />
      </div>
    </div>
  );
}

export default TerminalLogFeed;
