import { LogoEgg } from "@/components/games/LogoEgg";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="mx-auto max-w-[1700px] px-[5vw] py-16">
        <ScrollReveal variant="fade">
          <p className="font-display uppercase leading-[0.95] text-ivory" style={{ fontSize: "clamp(2.5rem,8vw,7rem)" }}>
            Sriram V
          </p>
          <p className="mt-2 font-mono text-xs tracking-[0.24em] text-ember">
            BUILD IT. CODE IT. MAKE IT MOVE.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="fade" delay={0.1}>
          <nav className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium tracking-[0.12em] text-white" aria-label="Footer">
          <Link className="hover:text-ember" href="/#work">WORK</Link>
           <Link className="hover:text-ember" href="/#process">PROCESS</Link>
           <Link className="hover:text-ember" href="/#experience">EXPERIENCE</Link>
          <Link className="hover:text-ember" href="/#about">ABOUT</Link>
          <a className="hover:text-ember" href="/achievements">UNLOCKED</a>
          <a className="hover:text-ember" href="https://github.com/Its-sriramhere" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a className="hover:text-ember" href="/resume">RESUME</a>
          <Link className="hover:text-ember" href="/#contact">CONTACT</Link>
        </nav>
        </ScrollReveal>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.2em] text-gray" aria-label="Social">
          <a className="hover:text-ember" href="https://www.instagram.com/its.sriramhere" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
          <a className="hover:text-ember" href="https://www.instagram.com/sriram.visual" target="_blank" rel="noreferrer">EDITING ↗</a>
          <a className="hover:text-ember" href="https://www.linkedin.com/in/sriram-sundaram-801b51410" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a className="hover:text-ember" href="https://github.com/Its-sriramhere" target="_blank" rel="noreferrer">GITHUB ↗</a>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] tracking-[0.18em] text-gray md:flex-row md:justify-between">
          <span>© 2026 <LogoEgg /></span>
          <span>BUILT WITH CODE + MOTION</span>
        </div>
      </div>
    </footer>
  );
}
