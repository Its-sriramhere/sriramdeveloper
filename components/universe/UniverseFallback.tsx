import Link from "next/link";
import { PLANETS } from "@/lib/universe/planets";
import { RevealGrid, RevealItem } from "@/components/motion/ScrollReveal";

export function UniverseFallback() {
  return (
    <nav aria-label="Universe fallback navigation">
    <RevealGrid variant="fade" className="grid gap-px bg-line hairline md:grid-cols-3">
      {PLANETS.map((p, i) => (
        <RevealItem key={p.id} variant="fade">
          <Link href={p.route} className="flex min-h-[88px] h-full flex-col justify-center bg-surface px-5 py-4 hover:bg-raised">
            <span className="font-mono text-[11px] tracking-[0.2em] text-ember">0{i + 1}</span>
            <span className="font-display font-bold text-ivory">{p.label}</span>
            <span className="mt-1 text-sm text-bone">{p.description}</span>
          </Link>
        </RevealItem>
      ))}
    </RevealGrid>
    </nav>
  );
}
