"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function PageTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [flash, setFlash] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;
    // Route-change transient overlay: syncs visual state with navigation events.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 320);
    return () => clearTimeout(t);
  }, [pathname, reduce]);

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[68] bg-red"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32 }}
          aria-hidden
        />
      )}
    </AnimatePresence>
  );
}
