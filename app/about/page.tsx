import CountUp from "@/components/fx/CountUp";
import BlurText from "@/components/fx/BlurText";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";
import { RevealGrid, RevealItem } from "@/components/motion/ScrollReveal";

export const metadata = { title: "About — Sriram V" };

const STATS: [number, string, string][] = [
  [20, "+", "PROJECTS"],
  [15, "+", "TECHNOLOGIES"],
  [30, "+", "EDITING PROJECTS"],
  [2027, "", "B.E. ECE"],
];

export default function AboutPage() {
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="relative mx-auto max-w-[1700px] overflow-hidden px-[5vw] py-20">
        <AeroHero />
        <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">01 / Behind the screen</p>
        <h1 className="display-hero mt-4 text-ivory">About<br />the person<br />behind the screen.</h1>
        <p className="mt-6 max-w-[52ch] text-lg text-white">Developer by logic. Editor by instinct. Motion designer by obsession.</p>
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-white">
          I&apos;m Sriram V, a B.E. Electronics and Communication Engineering student graduating in 2027,
          working across full-stack development, video editing and motion design.
        </p>
        <div className="mt-8 border border-line bg-surface p-6 font-mono text-sm leading-relaxed text-white">
          <p className="text-ivory">SRIRAM V</p>
          <p className="text-gray">B.E. ECE — 2027</p>
          <p className="text-gray">CREATIVE FULL-STACK DEVELOPER</p>
          <p className="text-gray">VIDEO EDITOR × MOTION DESIGNER</p>
        </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1700px] px-[5vw] py-16">
          <h2 className="display-section text-ivory">
            <BlurText as="span" text="Code should feel good." delay={130} direction="top" />
            <br />
            <BlurText as="span" text="Design should feel alive." delay={130} direction="bottom" />
          </h2>
          {/* TODO(real-data): replace with real counts */}
          <RevealGrid variant="rise" className="mt-10 grid grid-cols-2 gap-px bg-line hairline md:grid-cols-4">
            {STATS.map(([n, suffix, l]) => (
              <RevealItem key={l} variant="rise" className="bg-black p-6 text-center">
                <p className="font-mono text-3xl font-bold text-ivory">
                  <CountUp to={n} from={l === "B.E. ECE" ? 2000 : 0} suffix={suffix} duration={l === "B.E. ECE" ? 2.2 : 1.6} />
                </p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-gray">{l}</p>
              </RevealItem>
            ))}
          </RevealGrid>
        </div>
      </div>
    </div>
  );
}
