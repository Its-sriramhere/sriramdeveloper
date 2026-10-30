"use client";
import { useState } from "react";
import { GameShell } from "@/components/games/GameShell";
import { useGameXP } from "@/components/games/useGameXP";

const FX = ["GLITCH", "WHIP", "ZOOM", "FLASH", "RGB SPLIT", "FILM BURN", "PIXEL", "LIQUID"] as const;

const A = "https://picsum.photos/seed/scene-a/1000/600";
const B = "https://picsum.photos/seed/scene-b/1000/600";

function fxStyle(fx: string, phase: number): React.CSSProperties {
  switch (fx) {
    case "ZOOM": return { transform: `scale(${1 + phase * 0.6})`, opacity: 1 - phase * 0.3 };
    case "WHIP": return { transform: `translateX(${-phase * 100}%) skewX(${-phase * 12}deg)` };
    case "FLASH": return { opacity: 1 - phase, filter: `brightness(${1 + phase * 3})` };
    case "RGB SPLIT": return { transform: `translateX(${phase * 24}px)`, filter: `hue-rotate(${phase * 60}deg) saturate(2)` };
    case "GLITCH": return { transform: `translate(${(phase * 97) % 14 - 7}px, ${(phase * 61) % 10 - 5}px)`, filter: `contrast(${1 + phase}) saturate(2)` };
    case "FILM BURN": return { filter: `brightness(${1 + phase * 2}) sepia(${phase})` };
    case "PIXEL": return { transform: `scale(${1 - phase * 0.3})`, filter: `blur(${phase * 8}px)` };
    default: return { transform: `skewX(${phase * 20}deg) scaleY(${1 + phase * 0.4})`, opacity: 1 - phase * 0.4 };
  }
}

export default function TransitionLabPage() {
  const { play, complete } = useGameXP("transition-lab");
  const [fx, setFx] = useState<string>("GLITCH");
  const [tried, setTried] = useState<string[]>([]);
  const [phase, setPhase] = useState(0);

  const preview = (f: string) => {
    play();
    setFx(f);
    setPhase(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setPhase(Math.min(i / 12, 1));
      if (i >= 12) clearInterval(id);
    }, 60);
    const next = tried.includes(f) ? tried : [...tried, f];
    setTried(next);
    if (next.length >= 3) complete("transition", "TRANSITION CONTROL — 3 FX PREVIEWED");
  };

  return (
    <GameShell no="08 / Transition lab" title="Transition control." intro="Eight ways to cut between worlds. Preview any three to master the board.">
      <div className="relative overflow-hidden border border-line">
        <img src={B} alt="Scene B" className="aspect-[16/9] w-full object-cover" loading="lazy" />
        <img
          src={A} alt="Scene A"
          className="absolute inset-0 h-full w-full object-cover"
          style={fxStyle(fx, phase)}
        />
        <span className="absolute left-4 top-4 bg-black/80 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-white">
          {fx} — {Math.round(phase * 100)}%
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-px bg-line hairline md:grid-cols-4">
        {FX.map((f) => (
          <button
            key={f}
            onClick={() => preview(f)}
            className={`min-h-[56px] px-4 font-mono text-xs tracking-[0.14em] ${fx === f ? "bg-red text-white" : "bg-black text-white hover:bg-surface"}`}
          >
            {tried.includes(f) ? "✓ " : ""}{f}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
