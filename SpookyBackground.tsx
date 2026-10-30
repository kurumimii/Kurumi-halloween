import { useEffect, useRef } from "react";

/**
 * Animated Halloween backdrop: ember particle canvas + CSS fog layers,
 * drifting bats, a glowing moon and corner spiderwebs.
 */
export default function SpookyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    const colors = ["255,140,30", "255,180,60", "160,255,140", "190,140,255"];
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.6,
      speed: Math.random() * 0.5 + 0.15,
      drift: Math.random() * 0.6 - 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      tw: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.tw += 0.02;
        const alpha = 0.25 + 0.55 * Math.abs(Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.shadowColor = `rgba(${p.color},0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#2a0f3d_0%,_#140a22_45%,_#070308_100%)]" />

      {/* hero photo backdrop, faded */}
      <div
        className="absolute inset-0 bg-cover bg-top opacity-25 mix-blend-screen"
        style={{ backgroundImage: "url('/images/halloween-hero.jpg')" }}
      />

      {/* glowing moon */}
      <div className="absolute -top-16 right-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,_#ffdf9e_0%,_#ffb84d_35%,_transparent_72%)] opacity-70 blur-[2px] animate-moon-pulse sm:h-52 sm:w-52" />

      {/* purple / orange ambient glows */}
      <div className="absolute top-[-120px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,_rgba(168,85,247,0.18)_0%,_transparent_70%)]" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(ellipse,_rgba(255,117,24,0.12)_0%,_transparent_70%)]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(ellipse,_rgba(124,255,143,0.08)_0%,_transparent_70%)]" />

      {/* ember particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* fog layers */}
      <div className="fog-layer fog-1" />
      <div className="fog-layer fog-2" />

      {/* corner spiderwebs */}
      <svg
        className="absolute left-0 top-0 h-24 w-24 opacity-30 sm:h-32 sm:w-32"
        viewBox="0 0 100 100"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.6"
      >
        <path d="M0 0 L100 40 M0 0 L80 100 M0 0 L30 100 M0 0 L100 0" />
        <path d="M0 0 Q20 20 10 45 Q40 30 55 15 Q25 10 0 0" />
        <path d="M0 0 Q45 25 35 70 Q70 55 90 25 Q45 35 0 0" />
      </svg>
      <svg
        className="absolute right-0 top-0 h-24 w-24 -scale-x-100 opacity-30 sm:h-32 sm:w-32"
        viewBox="0 0 100 100"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.6"
      >
        <path d="M0 0 L100 40 M0 0 L80 100 M0 0 L30 100 M0 0 L100 0" />
        <path d="M0 0 Q20 20 10 45 Q40 30 55 15 Q25 10 0 0" />
      </svg>

      {/* bats flying */}
      <div className="bat bat-1">🦇</div>
      <div className="bat bat-2">🦇</div>
      <div className="bat bat-3">🦇</div>
    </div>
  );
}
