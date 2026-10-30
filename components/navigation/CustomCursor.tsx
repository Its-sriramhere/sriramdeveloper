"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function CustomCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35 });
  const sy = useSpring(y, { stiffness: 400, damping: 35 });
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"dot" | "ring" | "label">("dot");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null;
      if (t) {
        const kind = t.dataset.cursor ?? "ring";
        if (kind === "ring") {
          setMode("ring");
        } else {
          setMode("label");
          setLabel(kind.toUpperCase());
        }
      } else {
        setMode("dot");
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[65] hidden md:block"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      {mode === "dot" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
      {mode === "ring" && <div className="-ml-3 -mt-3 h-8 w-8 rounded-full border border-red" />}
      {mode === "label" && (
        <div className="-ml-8 -mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-red font-mono text-[10px] tracking-[0.18em] text-white">
          {label}
        </div>
      )}
    </motion.div>
  );
}
