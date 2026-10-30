"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { Gamepad2, Pause, Play, X } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Game } from "./Arcade";

const Player = dynamic(() => import("./Arcade").then(module => module.ArcadePlayer), { loading: () => <div className="game-loading"><span />Setting up your game…</div>, ssr: false });
const choices: { id: Game; title: string }[] = [{ id: "snake", title: "Snake" }, { id: "breaker", title: "Brick Breaker" }, { id: "runner", title: "Jump Runner" }];

export function RoamingArcade() {
  const [active, setActive] = useState<Game | null>(null);
  const [character, setCharacter] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const isOpen = active !== null;
  const egg = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const freezeMotion = useRef<() => void>(() => {});
  const wakeMotion = useRef<() => void>(() => {});
  const position = useRef<{ x: number; y: number; angle: number } | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const hover = useRef(false);
  const paused = useRef(false);
  const pathname = usePathname();
  const open = useCallback((game: Game) => {
    previousFocus.current = document.activeElement as HTMLElement;
    setActive(game);
  }, []);
  const close = useCallback(() => {
    dialog.current?.close();
    setActive(null);
    requestAnimationFrame(() => {
      const target = previousFocus.current?.isConnected ? previousFocus.current : egg.current;
      target?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    const handle = (event: Event) => {
      const value = (event as CustomEvent<Game>).detail;
      open(choices.some(game => game.id === value) ? value : "snake");
    };
    window.addEventListener("portfolio:open-arcade", handle);
    return () => window.removeEventListener("portfolio:open-arcade", handle);
  }, [open]);

  useEffect(() => {
    if (!isOpen) return;
    const node = dialog.current;
    node?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("portfolio:modal", { detail: true }));
    return () => {
      document.body.style.overflow = overflow;
      window.dispatchEvent(new CustomEvent("portfolio:modal", { detail: false }));
    };
  }, [isOpen]);

  useEffect(() => {
    const node = egg.current;
    if (!node || isOpen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, last = 0, clock = 0;
    const head = position.current ?? { x: window.innerWidth - 105, y: window.innerHeight - 100, angle: Math.PI };
    let target = { x: 65, y: window.innerHeight - 120 };
    const trail = Array.from({ length: 100 }, (_, index) => ({ x: head.x + index * 2, y: head.y }));
    const segments = Array.from(node.querySelectorAll<HTMLElement>(".living-snake-segment"));
    const runner = node.querySelector<HTMLElement>(".living-runner");
    const ball = node.querySelector<HTMLElement>(".living-ball");
    const paddle = node.querySelector<HTMLElement>(".living-paddle");

    const chooseTarget = () => {
      for (let attempt = 0; attempt < 18; attempt++) {
        const x = 55 + Math.random() * Math.max(1, window.innerWidth - 110);
        const y = 125 + Math.random() * Math.max(1, window.innerHeight - 210);
        const nearEdge = Math.min(x, window.innerWidth - x) < Math.min(230, window.innerWidth * 0.35);
        const blocked = document.elementsFromPoint(x, y).some(element => !node.contains(element) && element.closest("header, a, button, input, textarea, form"));
        if (nearEdge && !blocked) { target = { x, y: character === 2 ? window.innerHeight - 85 : y }; return; }
      }
      target = { x: head.x < window.innerWidth / 2 ? window.innerWidth - 65 : 65, y: window.innerHeight - 100 };
    };
    chooseTarget();

    const render = () => {
      node.style.transform = `translate3d(${head.x - 35}px,${head.y - 35}px,0)`;
      segments.forEach((segment, index) => {
        const sample = index === 0 ? head : trail[Math.min(trail.length - 1, index * 6)];
        const before = trail[Math.max(0, index * 6 - 2)];
        const angle = index === 0 ? head.angle : Math.atan2(before.y - sample.y, before.x - sample.x);
        segment.style.transform = `translate3d(${sample.x - head.x + 27}px,${sample.y - head.y + 27}px,0) rotate(${angle}rad)`;
      });
      if (runner) runner.style.transform = `translateY(${-Math.max(0, Math.sin(clock * 2.8)) * 24}px) scaleX(${Math.cos(head.angle) < 0 ? -1 : 1})`;
      if (ball) ball.style.transform = `translate3d(${Math.sin(clock * 2.5) * 40}px,${-Math.abs(Math.sin(clock * 2.5)) * 52}px,0)`;
      if (paddle) paddle.style.transform = `translateX(${Math.sin(clock * 2.5 - 0.15) * 34}px)`;
    };
    function frame(time: number) {
      raf = 0;
      const dt = Math.min((time - (last || time)) / 1000, 0.04); last = time;
      if (reduce.matches || paused.current || hover.current || document.hidden) return;
      clock += dt;
      const desired = Math.atan2(target.y - head.y, target.x - head.x);
      const turn = Math.atan2(Math.sin(desired - head.angle), Math.cos(desired - head.angle));
      head.angle += Math.max(-1.8 * dt, Math.min(1.8 * dt, turn));
      const speed = window.innerWidth < 768 ? 28 : character === 2 ? 65 : 43;
      head.x = Math.max(45, Math.min(window.innerWidth - 45, head.x + Math.cos(head.angle) * speed * dt));
      head.y = Math.max(110, Math.min(window.innerHeight - 55, head.y + Math.sin(head.angle) * speed * dt));
      if (Math.hypot(target.x - head.x, target.y - head.y) < 45) chooseTarget();
      if (Math.hypot(trail[0].x - head.x, trail[0].y - head.y) >= 1.8) { trail.unshift({ x: head.x, y: head.y }); trail.length = 100; }
      render();
      raf = requestAnimationFrame(frame);
    }
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const wake = () => { if (!raf && !reduce.matches && !paused.current && !hover.current && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } };
    const reset = () => { head.x = Math.min(head.x, window.innerWidth - 65); head.y = Math.min(head.y, window.innerHeight - 80); chooseTarget(); render(); wake(); };
    const visibility = () => { if (document.hidden) stop(); else wake(); };
    freezeMotion.current = stop; wakeMotion.current = wake;
    render(); wake();
    const cycle = setInterval(() => { if (!hover.current && !paused.current && !document.hidden) setCharacter(value => (value + 1) % choices.length); }, 26000);
    window.addEventListener("resize", reset);
    document.addEventListener("visibilitychange", visibility);
    reduce.addEventListener("change", reset);
    return () => { position.current = head; stop(); clearInterval(cycle); window.removeEventListener("resize", reset); document.removeEventListener("visibilitychange", visibility); reduce.removeEventListener("change", reset); };
  }, [isOpen, pathname, character]);

  const freeze = () => { hover.current = true; freezeMotion.current(); };
  const unfreeze = () => { hover.current = false; if (!paused.current) wakeMotion.current(); };
  const current = choices[character];
  return <>
    {!active && <div className="living-arcade" data-paused={motionPaused}><button ref={egg} className={`living-visitor visitor-${current.id}`} aria-label={`Play ${current.title} — roaming Easter egg`} aria-haspopup="dialog" onClick={() => open(current.id)} onPointerEnter={freeze} onPointerLeave={unfreeze} onFocus={freeze} onBlur={unfreeze}><span className="living-hit-area" aria-hidden="true" /><span className="living-hint">Play {current.title} ↗</span>{current.id === "snake" ? Array.from({ length: 9 }, (_, index) => <span key={index} aria-hidden="true" className={`living-snake-segment ${index === 0 ? "snake-head" : ""}`} />) : current.id === "breaker" ? <span aria-hidden="true" className="living-breaker"><i className="living-ball" /><i className="living-paddle" /><span className="living-bricks"><i /><i /><i /></span></span> : <span aria-hidden="true" className="living-runner"><i className="runner-head" /><i className="runner-body" /><i className="runner-leg leg-left" /><i className="runner-leg leg-right" /><i className="runner-arm" /></span>}</button><button className="living-pause" aria-label={motionPaused ? "Resume Easter egg movement" : "Pause Easter egg movement"} aria-pressed={motionPaused} onClick={() => { const next = !motionPaused; setMotionPaused(next); paused.current = next; if (next) freezeMotion.current(); else wakeMotion.current(); }}>{motionPaused ? <Play size={13} /> : <Pause size={13} />}</button></div>}
    {active && typeof document !== "undefined" && createPortal(<dialog ref={dialog} className="arcade-dialog" aria-label="Secret arcade" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close(); } }}><div className="arcade-modal-content" data-lenis-prevent><div className="secret-arcade-heading"><span><Gamepad2 size={16} /> YOU FOUND THE SIDE QUEST</span><span>NO QUARTERS REQUIRED</span><button type="button" onClick={close} aria-label="Close arcade"><X size={18} /></button></div><div className="arcade-tabs" role="group" aria-label="Choose a game">{choices.map(game => <button key={game.id} aria-pressed={active === game.id} onClick={() => setActive(game.id)}>{game.title}</button>)}</div><Player key={active} game={active} onClose={close} /><p className="arcade-modal-note">A little break. Your place on the page is saved. <span>ESC TO CLOSE</span></p></div></dialog>, document.body)}
  </>;
}
