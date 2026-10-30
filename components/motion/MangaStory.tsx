"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const acts = [
  {
    title: "A request in the rain.", phase: "THE BRIEF", image: "01-the-request.svg", location: "AFTER HOURS / THE CITY",
    alt: "Original manga illustration of a red-scarfed developer receiving a request in a rainy Japanese alley",
    line: "The story starts before the solution.", dialogue: "There’s a problem here. But what is it, really?",
    voice: "THE REQUEST", reply: "We need something better. We don’t know what yet.",
    caption: "A brief arrives with a long list of wishes. The builder puts the features aside and starts with the people behind them.",
    decision: "Name the problem before choosing the tools.", detail: "A request is a starting point, not a specification.", sound: "A NEW QUEST", atmosphere: "rain", inset: "50% 32%",
  },
  {
    title: "Listen between the lines.", phase: "DISCOVERY", image: "02-listen-first.svg", location: "THE NEXT MORNING / A SMALL CAFÉ",
    alt: "Original manga illustration of a developer listening to a client across a table in a Japanese café",
    line: "The first breakthrough isn’t technical.", dialogue: "Show me where the day gets difficult.",
    voice: "THE PERSON USING IT", reply: "It’s this step. We do it over and over.",
    caption: "Over a quiet conversation, the real friction appears. A repeated task. A confusing handoff. Something the original brief never mentioned.",
    decision: "Turn assumptions into questions, then priorities.", detail: "The useful product begins with a useful question.", sound: "LISTEN FIRST", atmosphere: "steam", inset: "50% 68%",
  },
  {
    title: "A map before the maze.", phase: "THE BLUEPRINT", image: "03-the-blueprint.svg", location: "THE WORKROOM / PAPER EVERYWHERE",
    alt: "Original manga illustration of hands drawing connected interface and system plans on a desk",
    line: "Every connection has a reason.", dialogue: "If this changes, what else needs to change?",
    voice: "THE BUILDER’S NOTE", reply: "Make the moving parts understandable first.",
    caption: "Screens become flows. Flows become responsibilities. The builder maps what happens in the interface, what belongs on the server, and where the data lives.",
    decision: "Choose boundaries that make the build easier to reason about.", detail: "A clear plan makes the next decision smaller.", sound: "CONNECT THE DOTS", atmosphere: "paper", inset: "50% 55%",
  },
  {
    title: "Make the first moment count.", phase: "THE FRONTEND", image: "04-the-interface.svg", location: "DAYLIGHT / THE FIRST WORKING SCREEN",
    alt: "Original manga illustration of a red-scarfed developer refining an interface beside a shoji window",
    line: "The screen should explain itself.", dialogue: "Can someone understand this without me beside them?",
    voice: "THE FIRST REVIEW", reply: "I know what to do next. That feels better.",
    caption: "The first screen takes shape. The builder checks the hierarchy, the small display, the keyboard path, and what happens while something is loading.",
    decision: "Build the experience around clear actions and feedback.", detail: "An interface is a conversation, not a decoration.", sound: "MAKE IT FEEL RIGHT", atmosphere: "paper", inset: "50% 42%",
  },
  {
    title: "The city behind the screen.", phase: "THE BACKEND", image: "05-the-hidden-system.svg", location: "LATE EVENING / EVERYTHING CONNECTS",
    alt: "Original manga illustration of a developer at a night-time workstation connecting application and data systems",
    line: "The invisible work carries the visible work.", dialogue: "What should happen when the request goes wrong?",
    voice: "THE SYSTEM’S CONTRACT", reply: "Validate it. Handle it. Return an answer that makes sense.",
    caption: "Behind each interaction is another journey: a request, some logic, a data boundary, and a response. The builder makes the happy path and the failure path explicit.",
    decision: "Keep responsibilities clear and failures understandable.", detail: "Reliability is part of the experience.", sound: "BEHIND THE SCENES", atmosphere: "signals", inset: "50% 20%",
  },
  {
    title: "Then everything stops.", phase: "THE PLOT TWIST", image: "06-the-plot-twist.svg", location: "PAST MIDNIGHT / AN UNEXPECTED RESULT",
    alt: "Original manga close-up of the developer discovering an unexpected error on a screen",
    line: "Every good build has an uncomfortable chapter.", dialogue: "It worked a moment ago. So what changed?",
    voice: "THE SECOND THOUGHT", reply: "Don’t guess. Find a way to make it happen again.",
    caption: "A strange edge case breaks the flow. The builder slows down, reproduces the failure, follows the evidence, and fixes the cause instead of hiding the symptom.",
    decision: "Reproduce, isolate, understand, then change.", detail: "The bug becomes a lesson the product can keep.", sound: "WAIT…", atmosphere: "impact", inset: "50% 40%",
  },
  {
    title: "Earn the ending.", phase: "THE PROOF", image: "07-earn-the-ending.svg", location: "BEFORE RELEASE / ONE MORE PASS",
    alt: "Original three-panel manga montage of device checks, the developer’s focused eyes, and a testing checklist",
    line: "Working once isn’t the same as working well.", dialogue: "Now try the thing nobody expected.",
    voice: "THE CHECKLIST", reply: "Small screen. Slow response. Empty state. Wrong input.",
    caption: "The work goes through its awkward moments on purpose. The builder checks the core flows, the edge cases, and the details that only appear away from the ideal setup.",
    decision: "Test the promises the product makes to its users.", detail: "Confidence comes from evidence, not a perfect demo.", sound: "ONE MORE CHECK", atmosphere: "signals", inset: "50% 15%",
  },
  {
    title: "A new morning.", phase: "THE RELEASE", image: "08-a-new-morning.svg", location: "SUNRISE / BACK TO THE PEOPLE",
    alt: "Original manga illustration of the developer on a Japanese rooftop at sunrise with a red scarf and falling petals",
    line: "The release is a beginning, too.", dialogue: "Ready for the people it was built for.",
    voice: "THE NEXT CHAPTER", reply: "Ship it with care. Then keep listening.",
    caption: "The product leaves the workroom. The builder prepares the handover, checks the release, and watches for what real use teaches next. The story stays open.",
    decision: "Deliver the work and leave a clear path forward.", detail: "A useful ending makes room for the next good idea.", sound: "TO BE CONTINUED", atmosphere: "petals", inset: "50% 40%",
  },
];

gsap.registerPlugin(ScrollTrigger);

export function MangaStory() {
  const root = useRef<HTMLDivElement>(null);
  const sequence = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const count = acts.length;

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)", () => {
      const element = root.current!;
      element.dataset.enhanced = "true";
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: element, start: "top 64px", end: () => `+=${(count - 1) * Math.max(650, window.innerHeight * 0.8)}`,
          pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: self => {
            const next = Math.round(self.progress * (count - 1));
            if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
          },
        } });
        sequence.current = timeline;
        timeline.to(".manga-track", { xPercent: -100 * (count - 1) / count, ease: "none", duration: count }, 0);
        timeline.fromTo(".manga-reading-progress span", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: count }, 0);
        element.querySelectorAll<HTMLElement>(".manga-episode").forEach((episode, index) => {
          const start = Math.max(0, index - 0.35);
          timeline.fromTo(episode.querySelector(".manga-protagonist"), { scale: 1.12, xPercent: -3 }, { scale: 1, xPercent: 2, duration: 1.3, ease: "none" }, start);
          timeline.fromTo(episode.querySelector(".manga-atmosphere"), { yPercent: -10, xPercent: 6 }, { yPercent: 12, xPercent: -5, duration: 1.3, ease: "none" }, start);
          timeline.fromTo(episode.querySelector(".manga-inset-image"), { scale: 1.15, xPercent: 4 }, { scale: 1.03, xPercent: -2, duration: 1.2, ease: "none" }, start);
          timeline.fromTo(episode.querySelector(".manga-dialogue"), { y: 24, rotation: -3 }, { y: 0, rotation: 0, duration: 0.45 }, Math.max(0, index - 0.15));
          timeline.fromTo(episode.querySelectorAll(".manga-narrative-beat"), { y: 18 }, { y: 0, stagger: 0.06, duration: 0.5 }, Math.max(0, index - 0.1));
        });
      }, element);
      return () => { ctx.revert(); sequence.current = null; delete element.dataset.enhanced; };
    });
    return () => media.revert();
  }, [count]);

  const jump = (index: number) => {
    const next = Math.max(0, Math.min(count - 1, index));
    const trigger = sequence.current?.scrollTrigger;
    if (trigger) {
      const position = trigger.start + (trigger.end - trigger.start) * next / (count - 1);
      window.scrollTo({ top: position, behavior: "instant" });
      window.dispatchEvent(new CustomEvent("portfolio:story-jump", { detail: position }));
    } else root.current?.querySelectorAll(".manga-episode")[next]?.scrollIntoView({ behavior: "instant", block: "start" });
    activeRef.current = next; setActive(next);
  };

  return <div ref={root} className="manga-stage manga-illustrated" style={{ "--manga-act-count": count, "--manga-act-width": `${100 / count}%` } as CSSProperties}>
    <div className="manga-edition"><span>THE QUIET BUILD / VOL. 01</span><span>AN ORIGINAL ILLUSTRATED STORY</span><button type="button" onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "instant", block: "start" })}>SKIP STORY <ArrowDown size={12} /></button></div>
    <div className="manga-viewport"><div className="manga-track">
      {acts.map((act, index) => <article key={act.phase} className={`manga-episode manga-act-${index}`} aria-label={`Chapter ${index + 1}: ${act.phase.toLowerCase()}`}>
        <div className="manga-act-heading"><span>CHAPTER {String(index + 1).padStart(2, "0")} / {act.phase}</span><h3>{act.title}</h3><p>{act.line}</p></div>
        <div className="manga-spread">
          <div className="manga-portrait-frame"><Image className="manga-protagonist" src={`/images/manga/${act.image}`} alt={act.alt} fill unoptimized sizes="(max-width: 767px) 90vw, 45vw" loading={index < 2 ? "eager" : "lazy"} /><div className={`manga-atmosphere atmosphere-${act.atmosphere}`} aria-hidden="true">{Array.from({ length: 8 }, (_, particle) => <i key={particle} style={{ "--particle": particle } as CSSProperties} />)}</div><span className="manga-location">{act.location}</span><span className="manga-sound" aria-hidden="true">{act.sound}</span><p className="manga-dialogue">{act.dialogue}</p><span className="manga-frame-number">SV — {String(index + 1).padStart(2, "0")}</span></div>
          <div className="manga-story-panels">
            <div className="manga-inset-panel"><Image className="manga-inset-image" src={`/images/manga/${act.image}`} alt="" fill unoptimized sizes="(max-width: 767px) 40vw, 35vw" style={{ objectPosition: act.inset }} /><div className="manga-inset-dialogue"><span>{act.voice}</span><p>{act.reply}</p></div></div>
            <div className="manga-caption-panel"><span>THE TURNING POINT</span><p className="manga-narrative-beat">{act.caption}</p><div className="manga-engineering-note manga-narrative-beat"><span>THE ENGINEERING DECISION</span><p>{act.decision}</p></div><span className="manga-next manga-narrative-beat">{act.detail}<ArrowRight size={16} /></span></div>
          </div>
        </div>
      </article>)}
    </div></div>
    <div className="manga-reader-footer"><span>HOW I BUILD / EIGHT CHAPTERS</span><div className="manga-reader-controls"><button type="button" onClick={() => jump(active - 1)} disabled={active === 0} aria-label="Previous manga chapter"><ArrowLeft size={16} /></button><div className="manga-chapter-indicators" role="group" aria-label="Choose a manga chapter">{acts.map((act, index) => <button type="button" key={act.phase} className={active === index ? "is-current" : ""} aria-current={active === index ? "step" : undefined} aria-label={`Chapter ${index + 1}: ${act.phase.toLowerCase()}`} onClick={() => jump(index)}>{String(index + 1).padStart(2, "0")}</button>)}</div><button type="button" onClick={() => jump(active + 1)} disabled={active === count - 1} aria-label="Next manga chapter"><ArrowRight size={16} /></button></div><span className="manga-scroll-hint">SCROLL TO READ <ArrowDown size={13} /></span></div>
    <div className="manga-reading-progress" aria-hidden="true"><span /></div>
  </div>;
}
