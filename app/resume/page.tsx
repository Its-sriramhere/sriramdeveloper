import { Button } from "@/components/ui/Button";
import { RevealGrid, RevealItem, ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

export const metadata = { title: "Resume — Sriram V" };

export default function ResumePage() {
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[900px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">09 / Resume</p>
            <h1 className="display-hero mt-4 text-ivory">The<br />short<br />version.</h1>
          </div>
        </div>
        <ScrollReveal variant="rise">
          <div className="mt-8 border border-line bg-surface p-8">
          <p className="font-display text-2xl uppercase text-ivory">Sriram V</p>
          <p className="mt-1 text-sm text-white">Creative Full-Stack Developer — Video Editor & Motion Designer</p>
          <p className="mt-1 font-mono text-xs text-gray">B.E. ELECTRONICS AND COMMUNICATION — 2027</p>
          <RevealGrid variant="rise" className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2">
            <RevealItem variant="rise" className="bg-black p-4 font-mono text-sm text-white">
              <p className="text-[11px] tracking-[0.2em] text-ember">STACK</p>
              <p className="mt-1">Next.js / TypeScript / APIs / Postgres / AI</p>
            </RevealItem>
            <RevealItem variant="rise" className="bg-black p-4 font-mono text-sm text-white">
              <p className="text-[11px] tracking-[0.2em] text-ember">CREATIVE</p>
              <p className="mt-1">Premiere Pro / After Effects / Motion / Color</p>
            </RevealItem>
          </RevealGrid>
          <p className="mt-4 font-mono text-[11px] text-gray">DEV RESUME — PDF · 138 KB. EDITOR CUT ON REQUEST.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href="/resume/SriramV-Resume.pdf" download className="inline-flex min-h-[44px] items-center border border-red px-8 text-sm font-bold tracking-[0.08em] text-white hover:bg-red">
              DOWNLOAD RESUME →
            </a>
            <Button href="/contact" variant="ghost">CONTACT</Button>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
