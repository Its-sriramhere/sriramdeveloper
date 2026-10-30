import Link from "next/link";
import { DebugStrip } from "@/components/games/DebugStrip";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";
import { RevealGrid, RevealItem, ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata = { title: "Development — Sriram V" };

const CARDS: [string, string, string, string][] = [
  ["Projects", "/development/projects", "Case studies with problem → solution → architecture.", "EXPLORE THE BUILD →"],
  ["Skills", "/development/skills", "Tools of the trade. No fake proficiency scores.", "VIEW TREES →"],
  ["GitHub", "/development/github", "The code behind the work. Verified data only.", "OPEN LAB →"],
  ["Universe", "/universe", "Planet navigation with camera dives + 2D fallback.", "ENTER →"],
];

export default function DevelopmentPage() {
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">02 / Work</p>
            <h1 className="display-hero mt-4 text-ivory">I build<br />systems.</h1>
            <p className="mt-4 max-w-[52ch] text-white">From interface to API, from database to deployment — I like understanding how the whole thing works.</p>
          </div>
        </div>
        <RevealGrid variant="right" className="mt-10 grid gap-px bg-line hairline md:grid-cols-2">
          {CARDS.map(([t, href, d, cta]) => (
            <RevealItem key={href} variant="right">
              <Link href={href} data-cursor="view" className="group block h-full bg-black p-8 hover:bg-surface">
                <h3 className="font-display text-3xl uppercase text-ivory">{t}</h3>
                <p className="mt-2 max-w-[52ch] text-sm text-white">{d}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-white group-hover:text-ember">{cta}</span>
              </Link>
            </RevealItem>
          ))}
        </RevealGrid>
        <ScrollReveal variant="rise">
          <DebugStrip />
        </ScrollReveal>
      </div>
    </div>
  );
}
