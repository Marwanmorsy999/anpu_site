import { useEffect, useRef } from "react";

export function TerminalRadar({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let angle = 0;
    let last = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      const radius = Math.max(20, Math.min(w, h) * 0.42);
      const delta = Math.min(48, time - last);
      last = time;
      angle += delta * (active ? 0.0018 : 0.0005);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(5, 8, 5, 0.16)";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(20, 66, 30, 0.9)";
      ctx.lineWidth = 1;
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
      const sweep = ctx.createLinearGradient(0, 0, radius, 0);
      sweep.addColorStop(0, "rgba(34,255,102,0)");
      sweep.addColorStop(0.72, "rgba(34,255,102,0.16)");
      sweep.addColorStop(1, "rgba(34,255,102,0.88)");
      ctx.strokeStyle = sweep;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(radius, 0); ctx.stroke();
      ctx.restore();

      const blips = [[0.55, -0.2], [-0.32, 0.42], [0.18, 0.54], [-0.58, -0.24]];
      blips.forEach(([x, y], index) => {
        ctx.globalAlpha = active ? Math.max(0.18, 0.55 + Math.sin(angle * 4 + index) * 0.35) : 0.35;
        ctx.fillStyle = "#22FF66";
        ctx.beginPath();
        ctx.arc(cx + x * radius, cy + y * radius, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="v7-radar-canvas" aria-label="ANPU live radar sweep" role="img" />;
}

export default TerminalRadar;
