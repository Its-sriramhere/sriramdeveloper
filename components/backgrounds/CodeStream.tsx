"use client";
import { useReducedMotion } from "motion/react";

const ROWS = [
  "git commit -m \"pressure settle 1.8s\" · npm run build ✓ 38 routes · render pass 12f · dx +4.2 · palette #D90000 ·",
  "wipeL 1.2s → wipeR 1.2s → lattice orbit · split-flap 0.12s · countup spring 100/20 · techtext lens 220 ·",
  "export const hero = async () => { build(); edit(); move(); } · suspense <TechText/> · dpr ≤ 1.5 ·",
];

export function CodeStream() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: "linear-gradient(180deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(180deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      {ROWS.map((row, i) => (
        <p
          key={i}
          className="font-mono whitespace-nowrap text-gray opacity-40"
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            marginTop: i === 0 ? "6vh" : "26vh",
            animation: `codestream-${i % 2 === 0 ? "l" : "r"} ${90 + i * 30}s linear infinite`,
          }}
        >
          {row.repeat(4)}
        </p>
      ))}
      <style>{`
        @keyframes codestream-l { from { transform: translateX(0); } to { transform: translateX(-25%); } }
        @keyframes codestream-r { from { transform: translateX(-25%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          .codestream-row { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
