"use client";
import { useState } from "react";
import { GameShell } from "@/components/games/GameShell";
import { useGameXP } from "@/components/games/useGameXP";

const GROUPS: Record<string, string[]> = {
  CAMERA: ["WIDE", "MEDIUM", "CLOSE-UP", "OVERHEAD", "LOW ANGLE"],
  LIGHT: ["HARD RED", "SOFT IVORY", "LOW KEY", "NEON RIM"],
  MOVEMENT: ["STATIC", "SLOW PUSH", "DOLLY", "HANDHELD"],
  MOOD: ["TENSION", "DREAM", "TRIUMPH", "DREAD"],
};

export default function ShotBuilderPage() {
  const { play, complete } = useGameXP("shot-builder");
  const [shot, setShot] = useState<Record<string, string>>({});

  const pick = (g: string, v: string) => {
    play();
    const next = { ...shot, [g]: v };
    setShot(next);
    if (Object.keys(next).length === Object.keys(GROUPS).length) {
      complete("director", "DIRECTOR — SHOT LOCKED");
    }
  };

  return (
    <GameShell no="07 / Shot builder" title="Direct the shot." intro="Four decisions. One frame. Lock every department to reveal the shot profile.">
      <div className="grid gap-px bg-line hairline md:grid-cols-2">
        <div className="bg-black p-6">
          {Object.entries(GROUPS).map(([g, opts]) => (
            <div key={g} className="mb-6">
              <p className="font-mono text-[11px] tracking-[0.24em] text-ember">{g}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {opts.map((o) => (
                  <button
                    key={o}
                    onClick={() => pick(g, o)}
                    className={`min-h-[44px] border px-4 font-mono text-xs tracking-[0.12em] ${shot[g] === o ? "border-red bg-red text-white" : "border-line text-white hover:border-red"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex min-h-[320px] flex-col justify-end overflow-hidden bg-surface p-6">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: shot.LIGHT === "HARD RED" ? "linear-gradient(160deg,#F00000,#7A0000 70%,#000)" : shot.LIGHT === "NEON RIM" ? "linear-gradient(200deg,#7A0000,#000 60%,#D90000)" : "linear-gradient(180deg,#171717,#000)" }}
          />
          <div className="relative border border-line bg-black/85 p-5 font-mono text-sm text-white">
            <p className="text-[11px] tracking-[0.24em] text-ember">SHOT PROFILE</p>
            {Object.keys(GROUPS).map((g) => (
              <p key={g} className="mt-1">{g}: <span className="text-ivory">{shot[g] ?? "—"}</span></p>
            ))}
          </div>
        </div>
      </div>
    </GameShell>
  );
}
