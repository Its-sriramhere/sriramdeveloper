"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, Orbit, Radio, Telescope } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const systems = [
  { name: "Chessbishop", type: "COMPANY SYSTEM", designation: "CB / 01", description: "Commercial web work and a company tool. Three projects in the same orbit.", icon: Orbit, links: [["Chessbishop", "chessbishop"], ["Chesswareneuro", "chesswareneuro"], ["Expense Tracker", "chessbishop-expense-tracker"]] },
  { name: "Fetchup", type: "STARTUP SYSTEM", designation: "FU / 02", description: "Website work for a startup company. A different context, a new trajectory.", icon: Radio, links: [["Fetchup website", "fetchup"]] },
  { name: "Independent", type: "PERSONAL SYSTEM", designation: "SV / 03", description: "Room to follow an idea further. Personal work across an app and website, fitness, and my editing portfolio.", icon: Telescope, links: [["Migraine Detector", "migraine-detector"], ["Bi-Fit", "bi-fit"], ["Sriram-EFX", "sriram-efx"]] },
];

gsap.registerPlugin(ScrollTrigger);

export function SpaceExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const scrollStep = useRef(0);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".cosmos-starfield", { y: 60, scale: 1.05 }, { y: -60, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.fromTo(".planet-system", { y: 70, rotation: -12 }, { y: -15, rotation: 3, ease: "none", scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom 25%", scrub: 0.9 } });
        ScrollTrigger.create({ trigger: root.current, start: "top 55%", end: "bottom 55%", onUpdate: self => {
          const next = Math.min(2, Math.floor(self.progress * 3));
          if (next !== scrollStep.current) { scrollStep.current = next; setActive(next); }
        } });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  const current = systems[active];
  return <div ref={root} className={`cosmos cosmos-system-${active}`}>
    <div className="cosmos-starfield" aria-hidden="true">{Array.from({ length: 75 }, (_, index) => <i key={index} style={{ left: `${(index * 43.73 + 5) % 100}%`, top: `${(index * 29.37 + 3) % 100}%`, opacity: 0.18 + (index % 5) * 0.15, width: index % 9 === 0 ? 3 : 1, height: index % 9 === 0 ? 3 : 1 }} />)}</div>
    <div className="cosmos-topline"><span><span className="status-dot" /> EXPLORING THE WORK</span><span>THREE SYSTEMS. SEVEN PROJECTS.</span></div>
    <div className="cosmos-layout"><div className="cosmos-map"><span className="cosmos-map-label">MISSION MAP / {current.designation}</span><div className="planet-system" aria-hidden="true"><div className="cosmos-orbit orbit-outer" /><div className="cosmos-orbit orbit-middle" /><div className="cosmos-orbit orbit-inner" /><div className="planet"><div className="planet-surface" /><div className="planet-night" /></div><div className="cosmos-moon moon-one" /><div className="cosmos-moon moon-two" /><div className="orbit-beacon"><span />{current.name.toUpperCase()}</div></div><div className="cosmos-map-bottom"><span>COMPANY → STARTUP → INDEPENDENT</span><span>SCROLL TO TRAVEL <ArrowDown size={12} /></span></div></div>
      <div className="mission-control"><div className="system-selector" role="group" aria-label="Explore contribution systems">{systems.map((system, index) => <button key={system.name} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{system.name}</button>)}</div><div key={current.name} className="mission-brief"><span className="mission-type"><current.icon size={16} strokeWidth={1.5} />{current.type}</span><h3>{current.name}<span>.</span></h3><p>{current.description}</p><div className="mission-projects">{current.links.map(([name, slug], index) => <Link key={slug} href={`/development/projects/${slug}`}><span className="mission-project-number">0{index + 1}</span><span>{name}</span><ArrowUpRight size={18} /></Link>)}</div><span className="mission-signoff">REAL WORK. NEW HORIZONS.</span></div></div></div>
  </div>;
}
