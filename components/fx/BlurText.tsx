"use client";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ElementType, type ReactNode, type Ref } from "react";

type EasingFn = (t: number) => number;
type Snapshot = Record<string, number | string>;

const buildKeyframes = (from: Snapshot, steps: Snapshot[]): Record<string, (number | string)[]> => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes: Record<string, (number | string)[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  as?: ElementType;
  animateBy?: "words" | "chars";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  easing?: EasingFn;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  as = "p",
  animateBy = "words",
  direction = "top",
  threshold = 0.05,
  rootMargin = "0px 0px 10% 0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Fire once and stay: headlines resolve on entry and never blur back out.
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo<Snapshot>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo<Snapshot[]>(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));
  const Tag = as as unknown as (props: {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    ref?: Ref<HTMLElement>;
  }) => ReactNode;

  return (
    <Tag ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={{ duration: totalDuration, times, delay: (index * delay) / 1000, ease: easing }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === " " ? " " : segment}
            {animateBy === "words" && index < elements.length - 1 && " "}
          </motion.span>
        );
      })}
    </Tag>
  );
}
