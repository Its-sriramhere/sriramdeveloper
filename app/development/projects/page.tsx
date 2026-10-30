import { projects } from "@/data/projects";
import Link from "next/link";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";
import { RevealGrid, RevealItem } from "@/components/motion/ScrollReveal";

export const metadata = { title: "Projects — Sriram V" };

export default function ProjectsPage() {
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">02 / Selected work</p>
            <h1 className="display-hero mt-4 text-ivory">Things<br />I&apos;ve built.</h1>
          </div>
        </div>
        <RevealGrid variant="right" className="mt-10 grid gap-px bg-line hairline md:grid-cols-3">
          {projects.map((p, i) => (
            <RevealItem key={p.slug} variant="right">
              <Link href={`/development/projects/${p.slug}`} data-cursor="view" className="group block h-full bg-surface p-6 hover:bg-raised">
              <p className="font-display text-5xl text-line transition-colors group-hover:text-red">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl uppercase text-ivory">{p.title}</h3>
              <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-gray">{p.ownership.toUpperCase()} / {p.category.toUpperCase()}</p>
              <p className="mt-2 text-sm text-white">{p.tagline}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-white group-hover:text-ember">VIEW PROJECT →</span>
              </Link>
            </RevealItem>
          ))}
        </RevealGrid>
      </div>
    </div>
  );
}
