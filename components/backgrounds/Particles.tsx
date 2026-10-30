"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function Particles({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    const n = coarse && small ? 30 : count;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) tick();
    };
    document.addEventListener("visibilitychange", onVis);
    // Deterministic pseudo-random field — stable across renders.
    const pts = Array.from({ length: n }, (_, i) => {
      const h = (seed: number): number => {
        const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
        return x - Math.floor(x);
      };
      return {
        x: h(1),
        y: h(2),
        v: 0.0003 + h(3) * 0.0009,
        r: 0.8 + h(4) * 1.6,
        red: h(5) > 0.45,
        ph: h(6) * Math.PI * 2,
      };
    });
    let t = 0;
    const tick = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) p.y = 1;
        const tw = 0.25 + 0.25 * Math.sin(t + p.ph);
        ctx.fillStyle = p.red
          ? `rgba(217, 0, 0, ${tw})`
          : `rgba(231, 229, 216, ${tw * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [count, reduce]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
