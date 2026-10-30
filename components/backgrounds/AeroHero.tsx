"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const Shards = dynamic(() => import("./AeroShards"), { ssr: false });

/** Hero-scoped shard field: absolute within the hero, calm density, silent on failure. */
export function AeroHero() {
  const reduce = useReducedMotion();
  const [webgpu, setWebgpu] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebgpu(typeof navigator !== "undefined" && "gpu" in navigator);
  }, []);

  if (reduce || !webgpu || failed) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Shards
        onError={() => setFailed(true)}
        backgroundColor="#000000"
        shardColor="#101010"
        accentColor="#D90000"
        placement="full"
        flow="stream"
        material="pearl"
        detail="balanced"
        effect="none"
        scale={1}
        spread={1}
        depth={1}
        speed={0.7}
        spin={1.25}
        interaction="repel"
        density={0.7}
        shardSize={0.9}
        stretch={1}
        turbulence={1}
        glow={1}
        edgeSoftness={2}
        bloom={0.4}
        grain={0.05}
        chromaticAberration={0.004}
        transitionDuration={1}
        interactionRadius={1.5}
        interactionStrength={0.5}
        rippleIntensity={1}
        holdToGather
      />
    </div>
  );
}
