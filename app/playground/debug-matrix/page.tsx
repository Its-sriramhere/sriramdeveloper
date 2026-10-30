"use client";
import { useState } from "react";
import { useXPStore } from "@/lib/store/site";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

const OPTIONS = [
  "Guard against undefined before .join()",
  "Delete the console.log",
  "Rename developer to admin",
];

export default function DebugMatrixPage() {
  const { addXP, unlock } = useXPStore();
  const [picked, setPicked] = useState<string | null>(null);

  const choose = (o: string) => {
    setPicked(o);
    if (o.startsWith("Guard")) {
      addXP(200);
      unlock("debugger");
      toast.success("BUG FIXED — +200 XP, DEBUGGER unlocked");
    } else {
      toast.error("Still broken. Check the terminal output.");
    }
  };

  return (
    <div className="relative mx-auto max-w-[900px] px-4 py-16">
      <MatrixRain />
      <div className="relative overflow-hidden">
        <AeroHero />
        <div className="relative">
          <p className="font-mono text-xs tracking-[0.2em] text-ember">ROOM 01 // DEBUG MATRIX</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ivory">Find the bug</h1>
        </div>
      </div>
      <ScrollReveal variant="wipeL">
        <pre className="mt-6 overflow-x-auto rounded bg-surface hairline p-5 font-mono text-sm leading-relaxed text-white">
{`const developer = {
  name: "Developer",
  skills: undefined
};

console.log(developer.skills.join(", "));
// TypeError: Cannot read properties of undefined`}
        </pre>
      </ScrollReveal>
      <ScrollReveal variant="rise">
        <div className="mt-6 grid gap-3">
        {OPTIONS.map((o) => (
          <button
            key={o}
            onClick={() => choose(o)}
            className={`min-h-[44px] rounded-sm border px-4 text-left text-sm text-white ${picked === o ? "border-red bg-raised" : "hairline bg-surface hover:bg-raised"}`}
          >
            {o}
          </button>
        ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
