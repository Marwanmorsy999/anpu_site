import { useEffect, useState } from "react";

const GLYPHS = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";

export function TerminalTitle({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    const steps = 11;
    const timer = window.setInterval(() => {
      frame += 1;
      const reveal = Math.floor((frame / steps) * text.length);
      setDisplay(text.split("").map((char, index) => {
        if (char === " ") return " ";
        if (index < reveal) return char;
        return GLYPHS[(index * 7 + frame * 3) % GLYPHS.length];
      }).join(""));
      if (frame >= steps) { window.clearInterval(timer); setDisplay(text); }
    }, 42);
    return () => window.clearInterval(timer);
  }, [text]);

  return <span className={className} aria-label={text}>{display}<span className="cursor-blink">█</span></span>;
}

export default TerminalTitle;
