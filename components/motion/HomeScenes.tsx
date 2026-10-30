"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Content stays in document flow. Only the non-interactive hero is briefly pinned. */
export function HomeScenes({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 900px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      const local = gsap.context(() => {
        const scenes = gsap.utils.toArray<HTMLElement>(".home-scene");
        scenes.forEach(scene => {
          const panel = scene.querySelector<HTMLElement>(".scene-panel")!;
          const enter = { trigger: scene, start: "top 96%", end: "top 48%", scrub: desktop ? 0.6 : 0.25, invalidateOnRefresh: true };
          if (!desktop) {
            gsap.fromTo(panel, { y: 22 }, { y: 0, ease: "none", scrollTrigger: enter });
            return;
          }
          switch (scene.dataset.scene) {
            case "stack": {
              const hero = root.current!.querySelector<HTMLElement>(".home-hero")!;
              ScrollTrigger.create({ trigger: hero, start: "bottom bottom", endTrigger: scene, end: "top 64px", pin: true, pinSpacing: false });
              gsap.fromTo(panel, { y: 100, scale: 0.96 }, { y: 0, scale: 1, ease: "none", scrollTrigger: enter });
              gsap.to(hero, { scale: 0.94, opacity: 0.4, ease: "none", scrollTrigger: { trigger: scene, start: "top bottom", end: "top 64px", scrub: 0.5 } });
              break;
            }
            case "assemble": {
              gsap.fromTo(panel, { xPercent: 8 }, { xPercent: 0, ease: "none", scrollTrigger: enter });
              scene.querySelectorAll<HTMLElement>(".assembly-layer").forEach((layer, index) => {
                gsap.fromTo(layer, { x: (index - 1) * 110, y: (index - 1) * 95, rotation: (index - 1) * 17, scale: 0.88 }, { x: 0, y: 0, rotation: 0, scale: 1, ease: "none", scrollTrigger: { trigger: scene, start: "top 85%", end: "top 12%", scrub: 0.8 } });
              });
              break;
            }
            case "portrait": {
              gsap.fromTo(scene.querySelector(".about-photo"), { clipPath: "inset(0 85% 0 0)", y: 40 }, { clipPath: "inset(0 0% 0 0)", y: 0, ease: "none", scrollTrigger: enter });
              gsap.fromTo(scene.querySelectorAll(".about-copy > *"), { y: 40 }, { y: 0, stagger: 0.09, ease: "power2.out", scrollTrigger: enter });
              break;
            }
            case "unfold":
              gsap.fromTo(panel, { rotationX: 7, y: 75, scale: 0.97, transformPerspective: 1600 }, { rotationX: 0, y: 0, scale: 1, ease: "none", scrollTrigger: enter });
              break;
          }
        });
      }, root);
      return () => local.revert();
    });
    let disposed = false;
    void document.fonts.ready.then(() => {
      if (disposed || !root.current) return;
      ScrollTrigger.refresh();
      const target = document.getElementById(window.location.hash.slice(1));
      if (target && root.current.contains(target)) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 64, behavior: "instant" });
    });
    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(() => ScrollTrigger.refresh(), 120); });
    root.current?.querySelectorAll(".scene-panel").forEach(panel => observer.observe(panel));
    return () => { disposed = true; clearTimeout(timer); observer.disconnect(); media.revert(); };
  }, []);

  return <div ref={root} className="home-page">{children}</div>;
}
