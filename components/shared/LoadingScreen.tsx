"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import LatticeLoader from "@/components/fx/LatticeLoader";

const WORDS = ["BUILD.", "EDIT.", "MOVE."];

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [word, setWord] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const finish = () => {
      setDone(true);
      document.body.dataset.siteReady = "1";
      window.dispatchEvent(new Event("site:ready"));
    };
    if (reduce) {
      const t = setTimeout(finish, 200);
      return () => clearTimeout(t);
    }
    const w = setInterval(() => setWord((n) => (n + 1) % WORDS.length), 380);
    const t = setTimeout(finish, 1500);
    // Safety: re-open the gate in case hero mounted after the first dispatch
    // (client-side nav, background tab) so gated entrances always replay.
    const r = setTimeout(() => {
      document.body.dataset.siteReady = "1";
      window.dispatchEvent(new Event("site:ready"));
    }, 2500);
    return () => {
      clearInterval(w);
      clearTimeout(t);
      clearTimeout(r);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.4 }}
          aria-hidden
        >
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.5, delay: 1.1 }}
              style={{ animation: "redflash 0.5s 1.1s" }}
            />
          )}
          <div className="w-[min(440px,88vw)]">
            <p className="font-mono text-[11px] tracking-[0.3em] text-red">
              SRIRAM V / DIGITAL STUDIO
            </p>
            <div className="mt-4 flex items-center gap-4">
              <LatticeLoader
                label="INITIALIZING"
                doneLabel="ONLINE"
                status="working"
                pattern="orbit"
                color="#D90000"
                doneColor="#D90000"
                cellSize={8}
                fontSize={13}
                glow
              />
            </div>
            <p className="mt-5 font-display text-5xl uppercase text-ivory">
              {WORDS[word]}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
