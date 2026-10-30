import { experience } from "@/data/site";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

export const metadata = { title: "Journey — Sriram V" };

const STAGES = ["LEARN", "BUILD", "EDIT", "EXPERIMENT", "SHIP", "REPEAT"];

export default function JourneyPage() {
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">02 / Journey</p>
            <h1 className="display-hero mt-4 text-ivory">Still<br />becoming.</h1>
            <p className="mt-4 font-mono text-xs tracking-[0.2em] text-gray">{STAGES.join(" → ")}</p>
          </div>
        </div>
        <div role="list" className="mt-12 border-l-2 border-red">
          {experience.map((e, i) => (
            <ScrollReveal key={e.title} variant="left" delay={Math.min(i * 0.05, 0.2)}>
              <div role="listitem" className="relative pb-12 pl-8">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-red" aria-hidden />
                <p className="font-display text-5xl text-line">0{i + 1}</p>
                <p className="mt-1 font-mono text-xs tracking-[0.2em] text-ember">{e.year}</p>
                <h3 className="mt-1 font-display text-2xl uppercase text-ivory">{e.title}</h3>
                <p className="mt-1 max-w-[52ch] text-sm text-white">{e.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-gray">VERIFIED MILESTONES ONLY — MORE AS THEY SHIP.</p>
      </div>
    </div>
  );
}
