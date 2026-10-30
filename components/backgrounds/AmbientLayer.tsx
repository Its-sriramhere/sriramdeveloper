"use client";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Particles } from "./Particles";
import { CodeStream } from "./CodeStream";
import { AeroField } from "./AeroField";

/** Global fixed ambient layer: WebGPU shards primary, dust fallback, code stream overlay. */
export function AmbientLayer() {
  const reduce = useReducedMotion();
  const [light, setLight] = useState(false);
  const [shardsFailed, setShardsFailed] = useState(false);
  const onFail = useCallback(() => setShardsFailed(true), []);

  useEffect(() => {
    // One-time device-capability sync (pointer + viewport → layer density).
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLight(coarse && window.innerWidth < 768);
  }, []);

  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      {shardsFailed ? <Particles /> : <AeroField onFail={onFail} />}
      {!light && <CodeStream />}
    </div>
  );
}
