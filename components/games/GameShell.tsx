"use client";
import { useXPStore } from "@/lib/store/site";
import CountUp from "@/components/fx/CountUp";
import BlurText from "@/components/fx/BlurText";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";
import type { ReactNode } from "react";

export function GameShell({
  no,
  title,
  intro,
  children,
}: {
  no: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  const { xp } = useXPStore();
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">{no}</p>
            <h1 className="display-hero mt-4 text-ivory">
              <BlurText as="span" text={title} delay={140} direction="top" stepDuration={0.4} />
            </h1>
            <p className="mt-4 max-w-[52ch] text-white">{intro}</p>
          </div>
          <div className="border border-line bg-surface px-5 py-3 font-mono text-xs tracking-[0.18em] text-white">
            XP <span className="text-ember"><CountUp key={xp} to={xp} from={Math.max(0, xp - 100)} duration={0.8} /></span>
          </div>
          </div>
        </div>
        <ScrollReveal variant="rise">
          <div className="mt-10">{children}</div>
        </ScrollReveal>
      </div>
    </div>
  );
}
