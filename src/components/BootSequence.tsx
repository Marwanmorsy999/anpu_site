import { useState, useEffect } from "react";
import { PharaohGuardian } from "./PharaohGuardian";

export function BootSequence() {
  const [lines, setLines] = useState<string[]>([]);
  const [showPharaoh, setShowPharaoh] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [completed, setCompleted] = useState(false);

  const bootSteps = [
    { text: "", delay: 200 },
    { text: "ANPU SECURITY INTELLIGENCE SYSTEM", delay: 400 },
    { text: "----------------------------------------", delay: 200 },
    { text: "", delay: 200 },
    { text: "ARCHITECTURE.............. ANPU CORE", delay: 300 },
    { text: "GUARDIAN.................. ANPU", delay: 300 },
    { text: "ORIGIN.................... NILE NODE", delay: 300 },
    { text: "PROTOCOL.................. EYE OF HORUS", delay: 300 },
    { text: "CLEARANCE................. OPERATOR", delay: 300 },
    { text: "", delay: 300 },
    { text: "[+] RECON ENGINE .......... ONLINE", delay: 500 },
    { text: "[+] TLS ENGINE ............ ONLINE", delay: 400 },
    { text: "[+] ANALYSIS ENGINE ....... ONLINE", delay: 400 },
    { text: "[+] REPORT ENGINE ......... ONLINE", delay: 400 },
    { text: "", delay: 500 },
    { text: "SYSTEM MEMORY.............. 640K", delay: 200 },
    { text: "ANPU CORE.................. ONLINE", delay: 200 },
    { text: "", delay: 500 },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const addLine = () => {
      if (currentIndex < bootSteps.length) {
        const step = bootSteps[currentIndex];
        const timer = setTimeout(() => {
          setLines(prev => [...prev, step.text]);
          currentIndex++;
          addLine();
        }, step.delay);
        timers.push(timer);
      } else {
        setTimeout(() => {
          setShowPharaoh(true);
          setTimeout(() => {
            setShowPrompt(true);
            setTimeout(() => {
              setCompleted(true);
            }, 1000);
          }, 300);
        }, 300);
      }
    };

    addLine();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        timers.forEach(clearTimeout);
        setCompleted(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const hasSeenBoot = localStorage.getItem('anpu-boot-seen');
    if (hasSeenBoot === 'true') {
      setCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (completed) {
      localStorage.setItem('anpu-boot-seen', 'true');
    }
  }, [completed]);

  if (completed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] crt-screen">
      <div className="absolute inset-0 bg-scanlines opacity-20" />
      
      <div className="relative w-full max-w-2xl px-6 py-8">
        <div className="space-y-1 select-none" style={{ 
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          {lines.map((line, index) => (
            <div 
              key={index}
              className={`text-left ${
                line.includes("ANPU SECURITY") ? "text-[#FFB000] text-center" :
                line.includes("--------") ? "text-[#6A6A6A] text-center" :
                line.includes("[+") ? "text-[#7CFF4F]" :
                line.includes("ARCHITECTURE\|GUARDIAN\|ORIGIN\|PROTOCOL\|CLEARANCE") ? "text-[#C89B3C]" :
                line.includes("SYSTEM\|CORE") ? "text-[#FFB000]" :
                "text-[#D8FFD0]"
              }`}
            >
              {line}
            </div>
          ))}
          
          {showPharaoh && (
            <div className="flex justify-center my-4">
              <PharaohGuardian size={100} state="awake" pulse={true} />
            </div>
          )}
          
          {showPharaoh && (
            <div className="text-center text-[#7CFF4F] text-lg font-bold tracking-wider">
              GUARDIAN STATUS: AWAKE
            </div>
          )}
          
          {showPrompt && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-[#FFB000]">WELCOME, OPERATOR.</span>
              <span className="text-[#7CFF4F]">&gt;_</span>
              <span className="terminal-cursor" style={{ background: '#7CFF4F' }} />
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-4 text-xs text-[#6A6A6A] select-none">
        PRESS ESC TO SKIP
      </div>
    </div>
  );
}

export default BootSequence;
