"use client";
import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

export default function ColorGradingPage() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">06 / Color</p>
            <h1 className="display-hero mt-4 text-ivory">Colour<br />changes<br />everything.</h1>
            <p className="mt-4 max-w-[52ch] text-white">Contrast. Tone. Mood. The grade changes how the same frame feels.</p>
          </div>
        </div>
        <ScrollReveal variant="scale">
          <div className="relative mt-8 overflow-hidden hairline select-none">
          <img src="https://picsum.photos/seed/grade-after/1600/800" alt="Graded frame" className="block w-full" draggable={false} style={{ filter: "saturate(1.4) contrast(1.15)" }} />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img src="https://picsum.photos/seed/grade-after/1600/800" alt="" aria-hidden className="h-full max-w-none object-cover" draggable={false} style={{ width: "1600px", maxWidth: "none", filter: "grayscale(0.7) brightness(0.85)" }} />
          </div>
          <input
            type="range" min={0} max={100} value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            aria-label="Before after comparison slider"
          />
          <div className="absolute inset-y-0 bg-red" style={{ left: `${pos}%`, width: 2 }} />
          <span className="absolute left-4 top-4 bg-black/80 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-white">BEFORE</span>
          <span className="absolute right-4 top-4 bg-black/80 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-white">AFTER</span>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
