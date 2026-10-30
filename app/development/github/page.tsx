import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

const REPOS = [
  { name: "Sriram-portfolio", lang: "TypeScript", desc: "Portfolio build." },
  { name: "chesswareneuro", lang: "TypeScript", desc: "Website." },
  { name: "Chessbishop-Expense", lang: "JavaScript", desc: "Track expense of the employe." },
  { name: "Fitness-Tracker", lang: "JavaScript", desc: "Tracks the diet chart, fitness, workout plan." },
  { name: "Sriram-efx", lang: "JavaScript", desc: "Effects playground." },
  { name: "portfolio1", lang: "—", desc: "Early portfolio iteration." },
];

export default function GithubPage() {
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">08 / GitHub Lab</p>
            <h1 className="display-hero mt-4 text-ivory">The code<br />behind the work.</h1>
            <p className="mt-4 max-w-[52ch] text-white">
              <a href="https://github.com/Its-sriramhere" target="_blank" rel="noreferrer" className="text-ember hover:text-white">@Its-sriramhere ↗</a>
              {" "}— 8 public repositories. 1 follower. Live API wiring lands with GITHUB_TOKEN.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-px bg-line hairline md:grid-cols-3">
          {REPOS.map((r, i) => (
            <ScrollReveal key={r.name} variant="wipeL" delay={Math.min(i * 0.05, 0.2)}>
              <a
                href={`https://github.com/Its-sriramhere/${r.name}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="group block h-full bg-black p-6 hover:bg-surface"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] text-ember">0{i + 1} / {r.lang.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-xl uppercase text-ivory group-hover:text-ember">{r.name}</h3>
                <p className="mt-1 text-sm text-bone">{r.desc}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-gray">TODO(live-api): GITHUB_TOKEN → contribution graph + star counts.</p>
      </div>
    </div>
  );
}
