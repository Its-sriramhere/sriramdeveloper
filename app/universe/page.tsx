"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { UniverseFallback } from "@/components/universe/UniverseFallback";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

const Universe = dynamic(
  () => import("@/components/universe/Universe").then((m) => m.Universe),
  { ssr: false, loading: () => <div className="skeleton h-[480px] rounded" aria-label="Loading 3D universe" /> }
);

function webGLAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export default function UniversePage() {
  const reduce = useReducedMotion();
  const [choice, setChoice] = useState<"3d" | "2d" | null>(null);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    // One-time client capability probe: syncs React state with browser
    // capabilities (WebGL, pointer, viewport). Legitimate external-system sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebgl(webGLAvailable());
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    setChoice(coarse && small ? "2d" : "3d");
  }, []);

  const mode = choice ?? "3d";
  const effective = reduce || !webgl ? "2d" : mode;

  return (
    <div className="relative mx-auto max-w-[1700px] px-[5vw] py-16">
      <MatrixRain />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">09 / Universe</p>
            <h1 className="display-hero mt-4 text-ivory">Enter<br />the system.</h1>
            <p className="mt-4 max-w-[52ch] text-white">Click a planet: camera moves, node expands, content appears. Keyboard + 2D fallback included.</p>
          </div>
        </div>
        <div className="hairline flex rounded-full bg-surface p-1" role="tablist" aria-label="Universe view">
          {(["3d", "2d"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={effective === m}
              onClick={() => setChoice(m)}
              className={`min-h-[36px] rounded-full px-4 font-mono text-xs tracking-[0.18em] ${effective === m ? "bg-red text-white" : "text-gray hover:text-white"}`}
            >
              {m === "3d" ? "3D" : "2D"}
            </button>
          ))}
        </div>
      </div>
      {/* TODO: universe hero still, 1600x700 — generate via imagegen-web */}
      <div className="mt-8">
        {choice === null ? (
          <div className="skeleton h-[480px] rounded" />
        ) : effective === "3d" ? (
          <Universe />
        ) : (
          <UniverseFallback />
        )}
      </div>
      <ul className="mt-6 space-y-1 font-mono text-xs text-gray">
        <li>KEYBOARD: Tab through planet buttons, Enter to open.</li>
        <li>MOBILE: 2D grid default on small touch screens; switch to 3D anytime.</li>
        <li>REDUCED MOTION: 2D grid forced, no camera tweens.</li>
      </ul>
    </div>
  );
}
