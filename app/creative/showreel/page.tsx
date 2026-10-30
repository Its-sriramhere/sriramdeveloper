"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

export default function ShowreelPage() {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="relative mx-auto max-w-[1700px] overflow-hidden px-[5vw] py-20 text-center">
        <AeroHero />
        <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.24em] text-red">SHOWREEL</p>
          <h1 className="display-hero mt-4 text-ivory">Showreel<br />2026</h1>
          <p className="mt-4 font-mono text-xs tracking-[0.2em] text-gray">EDITING — MOTION — VFX — COLOR <a href="/playground/transition-lab" aria-label="Signal anomaly" className="text-line hover:text-red">∷</a></p>
        </div>
        <ScrollReveal variant="scale">
          <div className="relative mt-8 overflow-hidden hairline">
          {!play ? (
            <button onClick={() => setPlay(true)} data-cursor="play" className="group relative block w-full" aria-label="Play showreel">
              <img src="https://picsum.photos/seed/showreel-poster/1600/700" alt="Showreel poster" className="aspect-[21/9] w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="border border-red bg-black/70 px-8 py-4 font-bold tracking-[0.1em] text-white group-hover:bg-red">PLAY REEL — 01:24</span>
              </span>
            </button>
          ) : (
            <video controls poster="https://picsum.photos/seed/showreel-poster/1600/700" className="w-full" preload="metadata">
              {/* TODO: add public/videos/showreel.mp4 */}
              <source src="" type="video/mp4" />
              Add showreel.mp4 to public/videos to enable playback.
            </video>
          )}
          </div>
        </ScrollReveal>
        <ScrollReveal variant="rise">
          <p className="display-section mt-10 text-ivory">Every frame<br />has a purpose.</p>
        </ScrollReveal>
        <div className="mt-6"><Button href="/creative/editing">EXPLORE EDITING</Button></div>
      </div>
    </div>
  );
}
