import { editingWorks } from "@/data/site";
import { RevealGrid, RevealItem } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

export const metadata = { title: "Editing — Sriram V" };

export default function EditingPage() {
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">04 / Editing</p>
            <h1 className="display-hero mt-4 text-ivory">Cut.<br />Pace.<br />Story.</h1>
            <p className="mt-4 max-w-[52ch] text-sm text-gray">
              Every cut has a grade. <a href="/playground/color-grade" className="text-ember underline underline-offset-4 hover:text-white">FIND THE MOOD →</a>
            </p>
          </div>
        </div>
        <RevealGrid variant="scale" className="mt-10 grid gap-px bg-line hairline md:grid-cols-3">
          {editingWorks.map((w) => (
            <RevealItem key={w.slug} variant="scale">
              <article data-cursor="play" className="group h-full bg-black">
              <div className="relative overflow-hidden">
                <img src={w.poster} alt={`${w.title} poster`} className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <span className="absolute inset-0 bg-red/0 transition-colors group-hover:bg-red/25" aria-hidden />
              </div>
              <div className="border-t border-line p-5">
                <p className="font-mono text-[11px] tracking-[0.2em] text-ember">{w.kind.toUpperCase()}</p>
                <h3 className="mt-1 font-display text-2xl uppercase text-ivory">{w.title}</h3>
                <p className="mt-1 font-mono text-[11px] text-gray">RAW FOOTAGE → EDIT → MOTION → COLOR → FINAL</p>
              </div>
              </article>
            </RevealItem>
          ))}
        </RevealGrid>
      </div>
    </div>
  );
}
