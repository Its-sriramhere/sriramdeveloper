import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { RevealGrid, RevealItem, ScrollReveal } from "@/components/motion/ScrollReveal";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

export const metadata = { title: "Creative Studio — Sriram V" };

const cards: [string, string, string][] = [
  ["Showreel", "/creative/showreel", "Full-screen cinematic reel. Poster-first playback."],
  ["Editing", "/creative/editing", "Reels, commercial and cinematic cuts."],
  ["Motion", "/creative/motion", "Logo animation, typography, transitions, VFX."],
  ["Color Grading", "/creative/color-grading", "Interactive before/after comparisons."],
];

export default function CreativePage() {
  return (
    <div>
      <ScrollReveal variant="wipeL">
        <div className="bg-red">
        <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/80">03 / Creative studio</p>
          <h1 className="display-hero mt-4 text-white">I make<br />stories move.</h1>
          <p className="mt-4 max-w-[52ch] text-white">Video editing, motion graphics, VFX and visual storytelling built frame by frame.</p>
          <div className="mt-6">
            <Link href="/creative/showreel" className="inline-flex min-h-[44px] items-center border border-white px-8 text-sm font-bold tracking-[0.08em] text-white hover:bg-black hover:border-black">
              WATCH SHOWREEL →
            </Link>
          </div>
        </div>
        </div>
      </ScrollReveal>
      <div className="relative bg-black">
        <MatrixRain />
        <div className="relative mx-auto max-w-[1700px] px-[5vw] py-16">
          <RevealGrid variant="scale" className="grid gap-px bg-line hairline md:grid-cols-2">
            {cards.map(([t, href, d], i) => (
              <RevealItem key={href} variant="scale">
                <Link href={href} data-cursor="view" className="group block h-full bg-black p-8 hover:bg-surface">
                  <p className="font-display text-5xl text-line transition-colors group-hover:text-red">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-3xl uppercase text-ivory">{t}</h3>
                  <p className="mt-2 text-sm text-white">{d}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGrid>
          <ScrollReveal variant="rise">
            <div className="mt-8"><Button href="/creative/showreel">WATCH SHOWREEL →</Button></div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
