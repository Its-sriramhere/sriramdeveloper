"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const Shards = dynamic(() => import("./AeroShards"), { ssr: false });

/** Universal WebGPU shard field. Reports failure so the layer falls back to dust. */
export function AeroField({ onFail }: { onFail: () => void }) {
  const reduce = useReducedMotion();
  const [webgpu, setWebgpu] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    // One-time capability probe for the WebGPU background.
    const supported = typeof navigator !== "undefined" && "gpu" in navigator;
    if (!supported) {
      onFail();
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebgpu(true);
    setMobile(window.innerWidth < 768);
  }, [onFail]);

  if (reduce || !webgpu) return null;
  return (
    <div className="absolute inset-0">
      <Shards
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
        density={mobile ? 0.7 : 1.5}
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
        onError={onFail}
      />
    </div>
  );
}
