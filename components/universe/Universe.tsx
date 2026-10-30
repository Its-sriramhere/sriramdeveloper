"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { PLANETS, SUN } from "@/lib/universe/planets";
import { Planet } from "./Planet";
import { CameraController } from "./CameraController";
import { useXPStore } from "@/lib/store/site";
import Link from "next/link";

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.1;
  });
  return (
    <mesh ref={ref} position={SUN.position}>
      <sphereGeometry args={[0.9, 32, 32]} />
      <meshStandardMaterial color="#D90000" emissive="#D90000" emissiveIntensity={0.9} roughness={0.4} />
    </mesh>
  );
}

function Starfield({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  // Deterministic pseudo-random (pure function of index) — stable across renders
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      arr[i] = (x - Math.floor(x) - 0.5) * 22;
    }
    return arr;
  }, [count]);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.01;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#E7E5D8" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export function Universe() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { addXP } = useXPStore();
  const selected = PLANETS.find((p) => p.id === selectedId) ?? null;

  const select = (id: string) => {
    setSelectedId(id);
    addXP(25);
  };

  return (
    <div className="relative h-[min(78vh,720px)] min-h-[480px] overflow-hidden rounded bg-black hairline">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 50 }}
        role="application"
        aria-label="Developer universe: 3D planet navigation"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 6]} intensity={1.1} color="#F00000" />
        <pointLight position={[-6, -4, 4]} intensity={0.5} color="#D90000" />
        <Starfield />
        <Sun />
        {PLANETS.map((p) => (
          <Planet key={p.id} planet={p} selected={p.id === selectedId} onSelect={select} />
        ))}
        <CameraController focus={selected ? selected.position : null} />
      </Canvas>

      {selected && (
        <div className="absolute bottom-4 left-4 right-4 rounded-sm bg-black/85 p-4 backdrop-blur hairline md:left-auto md:right-4 md:w-[320px]">
          <p className="font-mono text-[11px] tracking-[0.2em] text-ember">PLANET SELECTED</p>
          <h3 className="mt-1 font-display text-lg font-bold text-ivory">{selected.label}</h3>
          <p className="mt-1 text-sm text-bone">{selected.description}</p>
          <div className="mt-3 flex gap-2">
            <Link href={selected.route} className="inline-flex min-h-[44px] items-center rounded-sm bg-red px-5 text-sm font-bold text-white hover:bg-ember">
              ENTER →
            </Link>
            <button onClick={() => setSelectedId(null)} className="inline-flex min-h-[44px] items-center rounded-sm px-4 text-sm text-white hairline hover:bg-raised">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
