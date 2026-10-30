"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { RevealGrid, RevealItem } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

const items = ["Typography", "Logo animation", "Motion graphics", "Transitions", "VFX", "UI animation"];

export default function MotionPage() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [awake, setAwake] = useState(false);

  const trail = (e: React.MouseEvent) => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!awake) setAwake(true);
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    ref.current.style.transform = `translateX(${x}px)`;
    ref.current.style.textShadow = `${-x}px 0 0 #D90000`;
  };

  return (
    <div className="relative bg-black" onMouseMove={trail}>
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">05 / Motion</p>
            <h1 ref={ref} className="display-hero mt-4 text-ivory transition-transform duration-150">Make<br />static<br />move.</h1>
            <p className="mt-4 max-w-[52ch] text-sm text-gray">Move the cursor — the type answers with red echo trails. After Effects thinking, live in the browser.</p>
            {awake && (
              <p className="mt-3 font-mono text-xs tracking-[0.2em] text-ember">
                TYPE IS AWAKE — <Link href="/playground/motion-lab" className="underline underline-offset-4 hover:text-white">OPEN MOTION LAB →</Link>
              </p>
            )}
          </div>
        </div>
        <RevealGrid variant="left" className="mt-10 grid gap-px bg-line hairline md:grid-cols-3">
          {items.map((t, i) => (
            <RevealItem key={t} variant="left" className="bg-black p-8 hover:bg-surface">
              <p className="font-mono text-[11px] tracking-[0.2em] text-ember">0{i + 1}</p>
              <p className="mt-2 font-display text-2xl uppercase text-ivory">{t}</p>
            </RevealItem>
          ))}
        </RevealGrid>
      </div>
    </div>
  );
}
