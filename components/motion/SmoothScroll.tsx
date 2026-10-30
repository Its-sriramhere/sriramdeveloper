"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const loop = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(loop);
    const gameOpen = (event: Event) => lenis.scrollTo((event as CustomEvent<HTMLElement>).detail, { immediate: true, offset: -85 });
    window.addEventListener("portfolio:game-open", gameOpen);
    const modal = (event: Event) => { if ((event as CustomEvent<boolean>).detail) lenis.stop(); else lenis.start(); };
    window.addEventListener("portfolio:modal", modal);
    const storyJump = (event: Event) => lenis.scrollTo((event as CustomEvent<number>).detail, { immediate: true });
    window.addEventListener("portfolio:story-jump", storyJump);
    return () => {
      gsap.ticker.remove(loop);
      window.removeEventListener("portfolio:game-open", gameOpen);
      window.removeEventListener("portfolio:modal", modal);
      window.removeEventListener("portfolio:story-jump", storyJump);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}
