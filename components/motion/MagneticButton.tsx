"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

export function MagneticButton({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="inline-block"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.span>
  );
}
