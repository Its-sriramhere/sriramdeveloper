"use client";
import dynamic from "next/dynamic";

const TechText = dynamic(() => import("@/components/fx/TechText"), {
  ssr: false,
  loading: () => <p className="display-hero mt-4 text-ivory">Sriram<br />V</p>,
});

export function HeroName() {
  return (
    <div className="mt-2 h-[clamp(180px,24vw,320px)]" aria-hidden="true">
      <TechText
        text="SRIRAM V"
        fontFamily="'Bodoni Moda', Georgia, serif"
        fontWeight={700}
        fontSize={170}
        letterSpacing={-0.02}
        color="#E7E5D8"
        accentColor="#D90000"
        reach={220}
        reveal="letter"
        specks={12}
        selection
        labels
        draggable
        sweep
      />
    </div>
  );
}
