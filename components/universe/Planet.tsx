"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { PlanetConfig } from "@/lib/universe/planets";

export function Planet({
  planet,
  selected,
  onSelect,
}: {
  planet: PlanetConfig;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.004;
    const s = selected ? 1.5 : hover ? 1.2 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    ref.current.position.y =
      planet.position[1] + Math.sin(state.clock.elapsedTime * 0.8 + planet.position[0]) * 0.08;
  });

  return (
    <group position={planet.position}>
      <mesh
        ref={ref}
        onClick={() => onSelect(planet.id)}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
      >
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial color={planet.color} roughness={0.35} metalness={0.15} emissive={planet.color} emissiveIntensity={selected ? 0.5 : 0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.95, 0.015, 8, 64]} />
        <meshBasicMaterial color={planet.color} transparent opacity={selected ? 0.9 : 0.35} />
      </mesh>
      <Html distanceFactor={9} position={[0, -1.1, 0]} center zIndexRange={[20, 0]}>
        <button
          onClick={() => onSelect(planet.id)}
          aria-label={`Open ${planet.label}`}
          className={`min-h-[44px] whitespace-nowrap rounded-full px-4 font-mono text-[11px] tracking-[0.18em] backdrop-blur transition ${
            selected ? "bg-red text-white" : "bg-black/70 text-white hairline hover:bg-raised"
          }`}
        >
          {planet.label}
        </button>
      </Html>
    </group>
  );
}
