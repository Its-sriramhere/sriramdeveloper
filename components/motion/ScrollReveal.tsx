"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export type RevealVariant = "rise" | "left" | "right" | "scale" | "wipeL" | "wipeR" | "fade";

const hidden: Record<RevealVariant, Record<string, number | string>> = {
  rise: { opacity: 0, y: 24 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  scale: { opacity: 0, scale: 0.96 },
  wipeL: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  wipeR: { opacity: 0, clipPath: "inset(0 0 0 100%)" },
  fade: { opacity: 0 },
};

const shown: Record<RevealVariant, Record<string, number | string>> = {
  rise: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  wipeL: { opacity: 1, clipPath: "inset(0 0 0 0)" },
  wipeR: { opacity: 1, clipPath: "inset(0 0 0 0)" },
  fade: { opacity: 1 },
};

export function ScrollReveal({
  children,
  delay = 0,
  variant = "rise",
  duration,
}: {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  // Directional wipes run cinematic-slow; all other landings stay snappy.
  const effective = duration ?? (variant === "wipeL" || variant === "wipeR" ? 1.2 : 0.6);
  return (
    <motion.div
      initial={false}
      whileInView={shown[variant]}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px 12% 0px" }}
      transition={{ duration: reduce ? 0 : effective, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const gridParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export function RevealGrid({
  children,
  variant = "rise",
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      data-reveal={variant}
      variants={gridParent}
      initial={false}
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px 12% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  variant = "rise",
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
}) {
  const item: Variants = {
    hidden: hidden[variant],
    show: { ...shown[variant], transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
