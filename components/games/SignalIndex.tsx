"use client";
import Link from "next/link";
import { gamesList } from "@/data/site";
import { useXPStore } from "@/lib/store/site";
import { RevealGrid, RevealItem } from "@/components/motion/ScrollReveal";

const GAME_ACHIEVEMENT: Record<string, string> = {
  "memory-stack": "stack",
  "debug-matrix": "debugger",
  "api-runner": "api",
  "color-grade": "colorist",
  "motion-lab": "motion",
  "shot-builder": "director",
  "transition-lab": "transition",
  "editor-timeline": "editor",
  "escape-room": "escape",
};

/** Signal Index: discovered games reveal titles, the rest stay locked glyphs. */
export function SignalIndex() {
  const { achievements } = useXPStore();
  return (
    <RevealGrid variant="rise" className="mt-10 grid gap-px bg-line hairline md:grid-cols-3">
      {gamesList.map((g, i) => {
        const found = achievements.includes(GAME_ACHIEVEMENT[g.slug] ?? "");
        return found ? (
          <RevealItem key={g.slug} variant="rise">
            <Link href={`/playground/${g.slug}`} data-cursor="play" className="group block h-full bg-black p-8 hover:bg-surface">
              <p className="font-mono text-[11px] tracking-[0.2em] text-ember">0{i + 1} / DECODED</p>
              <h3 className="mt-2 font-display text-2xl uppercase text-ivory">{g.title}</h3>
              <p className="mt-2 text-sm text-white">{g.text}</p>
            </Link>
          </RevealItem>
        ) : (
          <RevealItem key={g.slug} variant="rise">
            <div className="h-full bg-black p-8" aria-label={`Locked signal 0${i + 1}`}>
              <p className="font-mono text-[11px] tracking-[0.2em] text-gray">0{i + 1} / SIGNAL WEAK</p>
              <p className="mt-2 font-display text-2xl uppercase text-gray">?¿? LOCKED</p>
              <p className="mt-2 font-mono text-[11px] text-gray">PLAY THE SITE TO DECODE.</p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGrid>
  );
}
