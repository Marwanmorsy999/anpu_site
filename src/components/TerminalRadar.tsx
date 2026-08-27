import { useEffect, useRef } from "react";

export function TerminalRadar({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let angle = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.38;
      const delta = Math.min(40, time - last);
      last = time;
      angle += delta * (active ? 0.0014 : 0.00035);

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(34,255,102,.18)";

      for (let i = 1; i <= 4; i += 1) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius * i) / 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(cx - radius, cy); ctx.lineTo(cx + radius, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - radius); ctx.lineTo(cx, cy + radius); ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const gradient = ctx.createLinearGradient(0, 0, radius, 0);
      gradient.addColorStop(0, "rgba(34,255,102,.02)");
      gradient.addColorStop(.6, "rgba(34,255,102,.08)");
      gradient.addColorStop(1, "rgba(34,255,102,.75)");
      ctx.strokeStyle = gradient;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(radius, 0); ctx.stroke();
      ctx.restore();

      const blips = [[.68, -.12], [-.36, .42], [.22, .58], [-.5, -.28]];
      ctx.fillStyle = "#22FF66";
      blips.forEach(([x, y], index) => {
        ctx.globalAlpha = active ? .65 + Math.sin(angle * 4 + index) * .3 : .45;
        ctx.beginPath(); ctx.arc(cx + x * radius, cy + y * radius, 2.2, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, [active]);

  return <canvas ref={canvasRef} className="v7-radar-canvas" aria-label="ANPU radar sweep" role="img" />;
}

export default TerminalRadar;
