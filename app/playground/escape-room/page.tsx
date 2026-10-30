"use client";
import { useState } from "react";
import { GameShell } from "@/components/games/GameShell";
import { useXPStore } from "@/lib/store/site";
import { toast } from "sonner";
import Link from "next/link";

const STAGES = [
  { id: "code", title: "01 / FIND THE CODE", hint: "The console screams: skills is undefined. What guard saves the .join()?", answers: ["guard", "if", "optional", "?."] },
  { id: "api", title: "02 / FIX THE API", hint: "Which endpoint returns the project list?", answers: ["/api/projects", "projects"] },
  { id: "frame", title: "03 / IDENTIFY THE FRAME", hint: "Which grade crushes blacks for trailers? (one word)", answers: ["contrast", "high contrast"] },
  { id: "transition", title: "04 / CHOOSE THE TRANSITION", hint: "Which FX splits color channels?", answers: ["rgb", "rgb split"] },
  { id: "final", title: "05 / FINAL PUZZLE", hint: "Type the three words: BUILD. EDIT. ___?", answers: ["move"] },
] as const;

export default function EscapeRoomPage() {
  const { addXP, unlock } = useXPStore();
  const [stage, setStage] = useState(0);
  const [input, setInput] = useState("");
  const [won, setWon] = useState(false);

  const submit = () => {
    const s = STAGES[stage];
    const ok = s.answers.some((a) => input.trim().toLowerCase().includes(a));
    if (!ok) {
      toast.error("LOCKED — WRONG ANSWER. RE-READ THE HINT.");
      return;
    }
    addXP(100);
    if (stage + 1 >= STAGES.length) {
      setWon(true);
      addXP(500);
      unlock("escape");
      toast.success("CREATIVE ENGINEER MODE UNLOCKED — +500 XP");
    } else {
      setStage(stage + 1);
      setInput("");
      toast.success(`ROOM 0${stage + 1} CLEARED — +100 XP`);
    }
  };

  return (
    <GameShell no="10 / Escape room" title="Can you break out?" intro="Five rooms. Five locks. Clues hide in the games you already played. Escaping is optional — work stays open.">
      {!won ? (
        <div className="border border-line bg-surface p-8">
          <div className="flex gap-1" aria-hidden>
            {STAGES.map((s, i) => (
              <div key={s.id} className={`h-1.5 flex-1 ${i <= stage ? "bg-red" : "bg-line"}`} />
            ))}
          </div>
          <h2 className="mt-6 font-display text-3xl uppercase text-ivory">{STAGES[stage].title}</h2>
          <p className="mt-2 max-w-[52ch] text-white">{STAGES[stage].hint}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="TYPE ANSWER…"
              className="h-[44px] flex-1 border border-line bg-black px-4 font-mono text-sm text-white placeholder:text-gray"
              aria-label="Room answer"
            />
            <button onClick={submit} className="inline-flex min-h-[44px] items-center justify-center border border-red px-8 text-sm font-bold tracking-[0.08em] text-white hover:bg-red">
              UNLOCK →
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-red bg-surface p-10 text-center">
          <p className="font-mono text-xs tracking-[0.24em] text-ember">ACCESS GRANTED</p>
          <h2 className="display-section mt-3 text-ivory">Creative engineer mode unlocked.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex min-h-[44px] items-center border border-red bg-red px-8 text-sm font-bold text-white hover:bg-ember">
              START A PROJECT →
            </Link>
            <Link href="/playground" className="inline-flex min-h-[44px] items-center border border-line px-8 text-sm font-bold text-white hover:border-red">
              REPLAY GAMES
            </Link>
          </div>
        </div>
      )}
    </GameShell>
  );
}
