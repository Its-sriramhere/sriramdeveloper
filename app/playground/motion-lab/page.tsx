"use client";
import { useState } from "react";
import { GameShell } from "@/components/games/GameShell";
import { useGameXP } from "@/components/games/useGameXP";

export default function MotionLabPage() {
  const { play, complete } = useGameXP("motion-lab");
  const [pos, setPos] = useState(0);
  const [scale, setScale] = useState(100);
  const [rot, setRot] = useState(0);
  const [op, setOp] = useState(100);
  const [playing, setPlaying] = useState(false);

  const sliders: [string, number, number, number, (n: number) => void][] = [
    ["POSITION", pos, -120, 120, setPos],
    ["SCALE", scale, 50, 160, setScale],
    ["ROTATION", rot, -45, 45, setRot],
    ["OPACITY", op, 20, 100, setOp],
  ];

  const playAnim = () => {
    play();
    setPlaying((p) => !p);
    complete("motion", "MOTION DESIGNER — SEQUENCE PLAYED");
  };

  return (
    <GameShell no="06 / Motion lab" title="Make it move." intro="Dial the properties, then play the sequence. Black canvas, ivory object, red trail.">
      <div className="grid gap-px bg-line hairline md:grid-cols-2">
        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-black">
          <div
            className="flex h-24 w-24 items-center justify-center bg-ivory font-display text-xl text-black"
            style={{
              transform: `translateX(${pos}px) scale(${scale / 100}) rotate(${rot}deg)`,
              opacity: op / 100,
              transition: playing ? "transform 1.2s cubic-bezier(0.16,1,0.3,1), opacity 1.2s" : "none",
              boxShadow: "12px 0 0 rgba(217,0,0,0.55)",
            }}
          >
            SV
          </div>
          <span className="absolute bottom-3 left-4 font-mono text-[11px] tracking-[0.2em] text-gray">
            {playing ? "PLAYING" : "IDLE"} — 12F LOOP
          </span>
        </div>
        <div className="bg-black p-6">
          {sliders.map(([label, v, min, max, set]) => (
            <div key={label} className="mb-5">
              <div className="flex justify-between font-mono text-[11px] tracking-[0.2em] text-bone">
                <span>{label}</span><span className="text-ember">{v}</span>
              </div>
              <input
                type="range" min={min} max={max} value={v}
                onChange={(e) => { play(); set(Number(e.target.value)); }}
                className="mt-2 w-full accent-[#D90000]"
                aria-label={label}
              />
            </div>
          ))}
          <button onClick={playAnim} className="mt-2 inline-flex min-h-[44px] items-center border border-red px-8 text-sm font-bold tracking-[0.08em] text-white hover:bg-red">
            {playing ? "STOP" : "PLAY ANIMATION →"}
          </button>
        </div>
      </div>
    </GameShell>
  );
}
