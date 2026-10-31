"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ChevronDown, Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyChapters, type JourneyChapter } from "@/data/journey";
import { JourneyWalker } from "./JourneyWalker";

gsap.registerPlugin(ScrollTrigger);

const acts = [
  { number: "I", name: "Roots", chapters: "01—04", line: "Before the first line of code, there was a horizon." },
  { number: "II", name: "Learning to build", chapters: "05—09", line: "Some connections lead to questions. Others lead somewhere new." },
  { number: "III", name: "Creating & continuing", chapters: "10—12", line: "Another way to tell a story. Another reason to keep going." },
];

function SceneProps({ chapter }: { chapter: JourneyChapter }) {
  if (chapter.motion === "departure") return <div className="journey-departure-props" aria-hidden="true"><svg className="journey-route-line" viewBox="0 0 800 160"><path pathLength="1" d="M20 125C160 130 160 35 310 50S500 145 590 70 710 25 780 30" /></svg><span className="route-origin">NAGAPATTINAM</span><span className="route-destination">COIMBATORE</span><div className="journey-traveller"><JourneyWalker /></div></div>;
  if (chapter.motion === "circuit" || chapter.motion === "lab") return <div className="journey-circuit-props" aria-hidden="true"><svg className="journey-trace" viewBox="0 0 600 180"><path pathLength="1" d="M0 90h70l30-45h90l35 90h70l40-90h90l35 45h140" /><path pathLength="1" d="M50 160h90V20h110v140h90V20h110v140h120" /></svg>{chapter.motion === "lab" && <div className="journey-hand-rig solder-hand"><Image src="/images/journey/prop-solder-hand.webp" width={530} height={310} alt="" unoptimized /></div>}</div>;
  if (chapter.motion === "build") return <div className="journey-build-props" aria-hidden="true"><div className="journey-interface-blocks"><i /><i /><i /></div><div className="journey-hand-rig typing-hand"><Image src="/images/journey/prop-typing-hand.webp" width={970} height={180} alt="" unoptimized /></div></div>;
  if (chapter.motion === "wires") return <svg className="journey-wire-traces" viewBox="0 0 600 200" aria-hidden="true">{[0, 1, 2, 3].map(i => <path key={i} pathLength="1" d={`M${20 + i * 20} 175C${250 - i * 15} -90 ${100 + i * 40} 270 ${440 + i * 30} 25`} />)}</svg>;
  if (chapter.motion === "error") return <div className="journey-error-stamp" aria-hidden="true"><span>UNEXPECTED PLOT TWIST</span><b>It worked a minute ago.</b></div>;
  if (chapter.motion === "edit") return <div className="journey-editor-prop" aria-hidden="true"><span>STORIES BETWEEN THE FRAMES</span><div className="journey-edit-tracks"><i /><i /><i /><div className="journey-playhead" /></div></div>;
  if (chapter.motion === "exports") return <div className="journey-export-props" aria-hidden="true">{["final.mp4", "final_v2.mp4", "final_THIS_ONE.mp4"].map((file, i) => <span key={file} className={`export-label export-${i}`}>{file}</span>)}</div>;
  return <svg className="journey-sea-lines" viewBox="0 0 1000 150" aria-hidden="true"><path pathLength="1" d="M0 60q80-40 160 0t160 0 160 0 160 0 160 0 200 0" /><path pathLength="1" d="M0 100q80-30 160 0t160 0 160 0 160 0 160 0 200 0" /></svg>;
}

function ChapterScene({ chapter, refresh }: { chapter: JourneyChapter; refresh: () => void }) {
  const reversed = ["02", "04", "06", "08", "10", "11"].includes(chapter.id);
  return <article id={`journey-${chapter.id}`} className={`journey-chapter chapter-${chapter.motion} ${reversed ? "is-reversed" : ""}`} data-chapter={chapter.id} aria-labelledby={`journey-title-${chapter.id}`}>
    <div className="journey-scene">
      <div className="journey-world" aria-hidden="true"><div className="journey-world-camera"><Image className="journey-world-image" src={`/images/journey/world-${chapter.id}.webp`} fill sizes="(max-width: 767px) 100vw, 75vw" alt="" loading={chapter.id === "01" ? "eager" : "lazy"} unoptimized /></div><div className="journey-world-wash" />
        {chapter.actor && <div className={`journey-actor actor-${chapter.actor}`}><Image src={`/images/journey/character-${chapter.actor}.webp`} fill sizes="(max-width: 767px) 120vw, 100vw" alt="" unoptimized /></div>}
        <div className="journey-foreground"><SceneProps chapter={chapter} /></div>
      </div>
      <div className="journey-chapter-copy"><span className="journey-chapter-no">{chapter.id}<span> / {chapter.beat}</span></span><h3 id={`journey-title-${chapter.id}`}>{chapter.title}<span>.</span></h3><p className="journey-narration">{chapter.narration}</p><p className="journey-dialogue">“{chapter.dialogue}”</p>{chapter.aside && <p className="journey-aside">{chapter.aside}</p>}</div>
      <figure className="journey-detail"><Image src={`/images/journey/detail-${chapter.id}.webp`} width={800} height={230} alt={chapter.detailAlt} sizes="(max-width: 767px) 70vw, 30vw" unoptimized /><figcaption>ANOTHER LITTLE DETAIL / {chapter.id}</figcaption></figure>
      <div className="journey-reaction" aria-label={`A ${chapter.expression} expression shifts to ${chapter.reaction}`} role="img"><div className="reaction-image reaction-from"><Image src={`/images/journey/expression-${chapter.expression}.webp`} fill sizes="180px" alt="" unoptimized /></div><div className="reaction-image reaction-to"><Image src={`/images/journey/expression-${chapter.reaction}.webp`} fill sizes="180px" alt="" unoptimized /></div><span className="reaction-ink" aria-hidden="true">{["wires", "error", "exports"].includes(chapter.motion) ? "…?!" : ""}</span></div>
    </div>
    <details className="journey-source-page" onToggle={refresh}><summary>Read the complete illustrated chapter <ChevronDown size={14} /></summary><Image src={`/images/journey/chapter-${chapter.id}.webp`} width={960} height={1440} alt={`Complete owner-supplied manga page for chapter ${chapter.id}: ${chapter.title}. ${chapter.alt}. The narration and dialogue are also available as text above.`} sizes="(max-width: 767px) 92vw, 780px" unoptimized /></details>
  </article>;
}

export function MangaJourney() {
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState("01");
  const [motionEnabled, setMotionEnabled] = useState(true);
  const reduce = useReducedMotion();
  const refresh = () => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => ScrollTrigger.refresh(), 140);
  };

  useEffect(() => {
    const element = root.current!;
    const visible = new Set<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target as HTMLElement); else visible.delete(entry.target as HTMLElement); });
      const point = window.innerHeight * 0.35;
      const candidates = [...visible].map(chapter => ({ chapter, rect: chapter.getBoundingClientRect() }));
      const current = candidates.find(({ rect }) => rect.top <= point && rect.bottom > point) ?? candidates.sort((a, b) => Math.abs(a.rect.top - point) - Math.abs(b.rect.top - point))[0];
      if (current) setActive(current.chapter.dataset.chapter!);
    }, { rootMargin: "-20% 0px -35% 0px", threshold: [0, 0.2, 0.5] });
    element.querySelectorAll(".journey-chapter").forEach(chapter => observer.observe(chapter));
    return () => { observer.disconnect(); if (refreshTimer.current) clearTimeout(refreshTimer.current); };
  }, []);

  useEffect(() => {
    if (!motionEnabled) return;
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 900px) and (min-height: 650px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      const ctx = gsap.context(() => {
        root.current!.querySelectorAll<HTMLElement>(".journey-chapter").forEach(chapter => {
          const scene = chapter.querySelector<HTMLElement>(".journey-scene")!;
          if (!desktop) {
            gsap.fromTo(chapter.querySelector(".journey-chapter-copy"), { y: 12, opacity: 0.85 }, { y: 0, opacity: 1, duration: 0.3, scrollTrigger: { trigger: chapter, start: "top 88%", once: true } });
            return;
          }
          const id = chapter.dataset.chapter!;
          if (["01", "03", "07", "10"].includes(id)) ScrollTrigger.create({ trigger: scene, start: "top 116px", end: () => `+=${Math.min(window.innerHeight * 0.22, 200)}`, pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true });
          const timeline = gsap.timeline({ scrollTrigger: { trigger: chapter, start: "top 85%", end: "bottom 25%", scrub: 0.5, invalidateOnRefresh: true } });
          timeline.fromTo(chapter.querySelector(".journey-world-camera"), { scale: 1, x: 0 }, { scale: 1.04, x: chapter.classList.contains("is-reversed") ? 12 : -12, duration: 0.4, ease: "none" }, 0.2);
          timeline.fromTo(chapter.querySelector(".journey-foreground"), { y: 10 }, { y: -10, duration: 0.4, ease: "none" }, 0.2);
          const actor = chapter.querySelector(".journey-actor");
          if (actor) timeline.fromTo(actor, { x: -10, y: 8, rotation: -0.3 }, { x: 10, y: 0, rotation: 0.3, duration: 0.4, ease: "none" }, 0.2);
          timeline.fromTo(chapter.querySelector(".journey-detail"), { x: -12, rotation: -2 }, { x: 0, rotation: 0, duration: 0.3, ease: "power1.out" }, 0.3);
          timeline.fromTo(chapter.querySelector(".reaction-to"), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.5);
          timeline.to(chapter.querySelector(".reaction-from"), { opacity: 0, duration: 0.12 }, 0.5);
          timeline.fromTo(chapter.querySelector(".journey-reaction"), { y: 12, scale: 0.98, rotation: -1 }, { y: 0, scale: 1, rotation: 0, duration: 0.2 }, 0.45);
          timeline.fromTo(chapter.querySelector(".journey-dialogue"), { y: 14, opacity: 0.65 }, { y: 0, opacity: 1, duration: 0.2 }, 0.6);
          const traces = chapter.querySelectorAll(".journey-trace path, .journey-route-line path, .journey-wire-traces path");
          if (traces.length) timeline.fromTo(traces, { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.04, duration: 0.3, ease: "none" }, 0.25);
          const hand = chapter.querySelector(".journey-hand-rig");
          if (hand) timeline.fromTo(hand, { rotation: -3, y: 5, transformOrigin: "15% 70%" }, { rotation: 2, y: -3, duration: 0.3 }, 0.25);
          if (id === "03") {
            timeline.fromTo(chapter.querySelector(".journey-traveller"), { x: -24 }, { x: 24, duration: 0.45, ease: "none" }, 0.2);
            const walker = chapter.querySelector(".journey-walker")!;
            const front = walker.querySelectorAll(".walker-leg-front, .walker-arm-back");
            const back = walker.querySelectorAll(".walker-leg-back, .walker-arm-front");
            [0.2, 0.35, 0.5].forEach((start, step) => {
              timeline.fromTo(front, { rotation: step % 2 ? -16 : 16, transformOrigin: "50% 0%" }, { rotation: step % 2 ? 16 : -16, duration: 0.15, ease: "sine.inOut" }, start);
              timeline.fromTo(back, { rotation: step % 2 ? 16 : -16, transformOrigin: "50% 0%" }, { rotation: step % 2 ? -16 : 16, duration: 0.15, ease: "sine.inOut" }, start);
            });
            timeline.fromTo(walker.querySelectorAll(".walker-knee-front, .walker-elbow-front"), { rotation: -8, transformOrigin: "50% 0%" }, { rotation: 8, duration: 0.4, yoyo: true }, 0.25);
            timeline.fromTo(walker.querySelector(".walker-torso"), { rotation: -1, transformOrigin: "50% 85%" }, { rotation: 1, duration: 0.4 }, 0.2);
          }
          if (id === "06" || id === "08") timeline.to(chapter.querySelector(".journey-reaction"), { scale: 1.035, duration: 0.05 }, 0.52).to(chapter.querySelector(".journey-reaction"), { scale: 1, duration: 0.1 }, 0.57);
          if (id === "07") timeline.fromTo(chapter.querySelectorAll(".journey-interface-blocks i"), { y: 12, opacity: 0.3 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.15 }, 0.25);
          if (id === "10") timeline.fromTo(chapter.querySelector(".journey-playhead"), { x: 0 }, { x: () => chapter.querySelector<HTMLElement>(".journey-edit-tracks")!.clientWidth * 0.82, duration: 0.4, ease: "none" }, 0.2);
          if (id === "11") timeline.fromTo(chapter.querySelectorAll(".export-label"), { y: 18, rotation: -4, opacity: 0.3 }, { y: 0, rotation: i => i * 2 - 2, opacity: 1, stagger: 0.08, duration: 0.15 }, 0.25);
          // The final 20% is deliberately still: the reading hold is part of the story.
          timeline.to({}, { duration: 0.2 }, 0.8);
        });
      }, root);
      return () => ctx.revert();
    });
    let disposed = false;
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, [motionEnabled]);

  const jumpToChapter = (id: string) => {
    menu.current?.removeAttribute("open");
    const target = document.getElementById(`journey-${id}`);
    if (!target) return;
    const hash = `#journey-${id}`;
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    const top = target.getBoundingClientRect().top + window.scrollY - 118;
    window.scrollTo({ top, behavior: "instant" });
    window.dispatchEvent(new CustomEvent("portfolio:story-jump", { detail: top }));
    setActive(id);
  };
  const indexLinks = <>{journeyChapters.map(chapter => <a key={chapter.id} href={`#journey-${chapter.id}`} aria-label={`${chapter.id}: ${chapter.title}`} aria-current={active === chapter.id ? "step" : undefined} onClick={event => { event.preventDefault(); jumpToChapter(chapter.id); }}>{chapter.id}</a>)}</>;

  return <section id="process" ref={root} className="home-scene journey-section" aria-labelledby="process-title" data-lenis-prevent>
    <header className="journey-intro"><div className="journey-overline"><span>03 / HOW I BUILD</span><span>A PERSONAL STORY IN TWELVE CHAPTERS</span></div><p className="journey-intro-location">NAGAPATTINAM → COIMBATORE → STILL BECOMING</p><h2 id="process-title">From coast<br />to <em>code.</em></h2><div className="journey-intro-bottom"><p>The places, the questions, and the little plot twists that made me a builder. A story about learning, creating, and staying curious.</p><a href="#journey-01">ENTER THE STORY <ArrowDown size={17} /></a></div><span className="journey-hero-wave" aria-hidden="true">∿</span></header>
    <div className="journey-index-bar"><span className="journey-index-label">FROM COAST TO CODE <span>{active} / 12</span></span><nav className="journey-desktop-index" aria-label="Story chapters">{indexLinks}</nav><details className="journey-mobile-index" ref={menu}><summary>CHAPTER {active} <ChevronDown size={14} /></summary><nav aria-label="Mobile story chapters">{indexLinks}</nav></details><div className="journey-index-actions"><button type="button" aria-label="Toggle journey animation" aria-pressed={!motionEnabled || !!reduce} disabled={!!reduce} onClick={() => setMotionEnabled(enabled => !enabled)}>{motionEnabled && !reduce ? <Pause size={13} /> : <Play size={13} />}<span>{motionEnabled && !reduce ? "MOTION ON" : "MOTION OFF"}</span></button><a href="#experience">SKIP STORY <ArrowDown size={13} /></a></div></div>
    {journeyChapters.map((chapter, index) => <div key={chapter.id} className="journey-chapter-group">{(index === 0 || chapter.act !== journeyChapters[index - 1].act) && <div className="journey-act-divider"><span>ACT {acts[chapter.act - 1].number} / {acts[chapter.act - 1].chapters}</span><h3>{acts[chapter.act - 1].name}</h3><p>{acts[chapter.act - 1].line}</p></div>}<ChapterScene chapter={chapter} refresh={refresh} /></div>)}
    <footer className="journey-ending"><span>THIS IS WHERE THE STORY OPENS UP.</span><h3>The next chapter?<br /><em>Let’s create it.</em></h3><div><a href="#contact" className="journey-next-chapter">Start a conversation <ArrowUpRight size={20} /></a><Link href="/#work" className="journey-return">Back to the work <ArrowUpRight size={16} /></Link></div><p>Based on my journey. The inner dialogue and comic reactions take a little creative license.</p></footer>
  </section>;
}
