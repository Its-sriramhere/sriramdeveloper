"use client";
import { achievements } from "@/data/site";
import { useXPStore } from "@/lib/store/site";
import CountUp from "@/components/fx/CountUp";
import { RevealGrid, RevealItem } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

export default function AchievementsPage() {
  const { xp, achievements: unlocked } = useXPStore();
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">11 / Achievements</p>
            <h1 className="display-hero mt-4 text-ivory">Unlocked.</h1>
            <p className="mt-4 font-mono text-sm tracking-[0.18em] text-white">
              LEVEL — XP <span className="text-ember"><CountUp key={xp} to={xp} from={Math.max(0, xp - 200)} duration={1} /></span>
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 w-full max-w-md bg-raised">
          <div className="h-full bg-red transition-all" style={{ width: `${Math.min((xp % 1000) / 10, 100)}%` }} />
        </div>
        <RevealGrid variant="rise" className="mt-10 grid gap-px bg-line hairline md:grid-cols-3">
          {achievements.map((a) => {
            const has = unlocked.includes(a.id);
            return (
              <RevealItem key={a.id} variant="rise" className={`p-6 ${has ? "border border-red bg-surface" : "bg-black"}`}>
                <p className={`font-display text-xl uppercase ${has ? "text-ivory" : "text-gray"}`}>{a.title}</p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-ember">{has ? "UNLOCKED" : "LOCKED"}</p>
              </RevealItem>
            );
          })}
        </RevealGrid>
        <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-gray">PROGRESS LIVES IN YOUR BROWSER — NO ACCOUNT NEEDED.</p>
      </div>
    </div>
  );
}
