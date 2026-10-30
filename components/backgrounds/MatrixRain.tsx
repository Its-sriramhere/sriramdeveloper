"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS =
  "アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>+×/=+#*@$%&?!:;-_()[]{}".split("");

/** Single shared config — every matrix instance on the site is identical. */
export const MATRIX_CONFIG = {
  density: 0.85,
  opacity: 1,
  glyphSize: 14,
  speedMin: 0.15,
  speedRange: 0.35,
} as const;

/** Dense red/green/ivory matrix rain, fully visible. Absolute-fill; parent must be relative. */
export function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const size = MATRIX_CONFIG.glyphSize;
    let cols = 0;
    let drops: { y: number; speed: number; tone: number; seed: number; phase: number }[] = [];
    let raf = 0;
    let running = true;

    const seed = (i: number, k: number): number => {
      const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      cols = Math.ceil(canvas.width / dpr / size);
      const active = Math.floor(cols * MATRIX_CONFIG.density);
      drops = Array.from({ length: cols }, (_, i) => ({
        y: seed(i, 1) * (canvas.height / dpr / size),
        speed: MATRIX_CONFIG.speedMin + seed(i, 2) * MATRIX_CONFIG.speedRange,
        tone: seed(i, 3),
        seed: i,
        phase: seed(i, 5) * Math.PI * 2,
      })).filter((_, i) => i < active);
    };
    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && document.visibilityState === "visible";
        if (running) tick();
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) tick();
    };
    document.addEventListener("visibilitychange", onVis);

    let t = 0;
    const tick = () => {
      if (!running) return;
      t += 0.016;
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${size * dpr}px "JetBrains Mono", monospace`;
      drops.forEach((d, i) => {
        const ch = GLYPHS[Math.floor(seed(d.seed, Math.floor(d.y)) * GLYPHS.length)];
        const blink = 0.35 + 0.65 * Math.abs(Math.sin(t * (0.8 + d.speed) + d.phase));
        const base = d.tone > 0.66 ? [217, 0, 0] : d.tone > 0.33 ? [0, 200, 80] : [231, 229, 216];
        const strength = d.tone > 0.66 ? 0.9 : d.tone > 0.33 ? 0.8 : 0.7;
        ctx.fillStyle = `rgba(${base[0]}, ${base[1]}, ${base[2]}, ${(strength * blink).toFixed(3)})`;
        ctx.fillText(ch, i * size * dpr, d.y * size * dpr);
        d.y += d.speed;
        if (d.y * size > canvas.height / dpr + size && seed(d.seed, 9) > 0.4) {
          d.y = -seed(d.seed, 4) * 8;
        }
      });
      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: MATRIX_CONFIG.opacity }}
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
