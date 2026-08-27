import { useEffect, useState } from "react";

export function TelemetryCounter({ value, duration = 900, precision = 0 }: { value: number; duration?: number; precision?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = value * eased;
      setDisplay(precision ? Number(next.toFixed(precision)) : Math.round(next));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, precision]);
  return <>{precision ? display.toFixed(precision) : display}</>;
}

export default TelemetryCounter;
