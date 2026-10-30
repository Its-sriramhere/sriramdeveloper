"use client";
import { useState } from "react";
import { useXPStore } from "@/lib/store/site";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

const DECK = ["React", "Next.js", "Python", "Postgres", "Docker", "Premiere", "AfterFX", "TypeScript"];

// Deterministic layout (seeded order) — avoids impure shuffle during render, still playable
const CARDS = ["React", "Python", "Docker", "Next.js", "Premiere", "Postgres", "TypeScript", "AfterFX", "Docker", "AfterFX", "React", "Postgres", "Next.js", "TypeScript", "Python", "Premiere"];

export default function MemoryStackPage() {
  const { addXP, unlock } = useXPStore();
  const [cards] = useState<string[]>(CARDS);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);

  const flip = (i: number) => {
    if (open.includes(i) || open.length === 2) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length === 2) {
      const [a, b] = next;
      if (cards[a] === cards[b] && !matched.includes(cards[a])) {
        setTimeout(() => {
          setMatched((m) => [...m, cards[a]]);
          setOpen([]);
          addXP(50);
          toast.success(`+50 XP — ${cards[a]} matched`);
          if (matched.length + 1 === DECK.length) {
            addXP(200);
            unlock("stack");
            toast.success("STACK MASTER — +200 XP");
          }
        }, 400);
      } else {
        setTimeout(() => setOpen([]), 600);
      }
    }
  };

  return (
    <div className="relative mx-auto max-w-[900px] px-4 py-16">
      <MatrixRain />
      <div className="relative overflow-hidden">
        <AeroHero />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold">Memory Stack</h1>
          <p className="mt-2 text-bone">Match pairs. Touch-friendly, no hover required.</p>
        </div>
      </div>
      <ScrollReveal variant="rise">
        <div className="mt-8 grid grid-cols-4 gap-3">
        {cards.map((c, i) => {
          const face = open.includes(i) || matched.includes(c);
          return (
            <button
              key={i}
              onClick={() => flip(i)}
              className="flex min-h-[88px] items-center justify-center rounded-sm bg-surface hairline p-2 text-center text-sm font-bold hover:bg-raised"
              aria-label={face ? c : "Hidden card"}
            >
              {face ? c : "?"}
            </button>
          );
        })}
        </div>
      </ScrollReveal>
    </div>
  );
}
