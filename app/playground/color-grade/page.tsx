"use client";
import { useState } from "react";
import { GameShell } from "@/components/games/GameShell";
import { useGameXP } from "@/components/games/useGameXP";

const GRADES = [
  { id: "warm", label: "A — WARM", filter: "sepia(0.5) saturate(1.4) contrast(1.05)", note: "Golden skin tones, cozy shadows. Works for lifestyle and food." },
  { id: "cool", label: "B — COOL", filter: "hue-rotate(-15deg) saturate(1.1) brightness(1.02)", note: "Steel shadows, detached mood. Tech, night, tension." },
  { id: "contrast", label: "C — HIGH CONTRAST", filter: "contrast(1.5) saturate(1.3)", note: "Crushed blacks, punchy highlights. Trailers and sport." },
  { id: "desat", label: "D — DESATURATED", filter: "saturate(0.35) contrast(1.1)", note: "Muted, documentary honesty. Realism over gloss." },
];

export default function ColorGradePage() {
  const [pick, setPick] = useState<string | null>(null);
  const { play, complete } = useGameXP("color-grade");
  const active = GRADES.find((g) => g.id === pick);

  const choose = (id: string) => {
    play();
    setPick(id);
    complete("colorist", "COLORIST — MOOD FOUND");
  };

  return (
    <GameShell no="05 / Color grade" title="Find the mood." intro="One frame, four moods. Pick the grade that tells the story — there is no score, only intent.">
      <div className="grid gap-px bg-line hairline md:grid-cols-2">
        <div className="relative bg-black">
          <img
            src="https://picsum.photos/seed/grade-game/1000/700"
            alt="Frame to grade"
            className="aspect-[10/7] w-full object-cover transition-all duration-500"
            style={{ filter: active?.filter ?? "none" }}
          />
          <span className="absolute left-4 top-4 bg-black/80 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-white">
            {active ? active.label : "RAW"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line">
          {GRADES.map((g) => (
            <button
              key={g.id}
              onClick={() => choose(g.id)}
              className={`min-h-[120px] p-5 text-left ${pick === g.id ? "bg-red text-white" : "bg-black text-white hover:bg-surface"}`}
            >
              <span className="font-mono text-xs tracking-[0.18em]">{g.label}</span>
            </button>
          ))}
        </div>
      </div>
      {active && (
        <p className="mt-6 max-w-[62ch] border-l-2 border-red pl-4 text-white">{active.note}</p>
      )}
    </GameShell>
  );
}
