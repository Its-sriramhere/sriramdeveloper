"use client";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

export function CameraController({ focus }: { focus: [number, number, number] | null }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 9));
  const look = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (!focus) {
      gsap.to(target.current, { x: 0, y: 0, z: 9, duration: 1, ease: "power3.inOut" });
      gsap.to(look.current, { x: 0, y: 0, z: 0, duration: 1, ease: "power3.inOut" });
      return;
    }
    gsap.to(target.current, {
      x: focus[0] * 0.55,
      y: focus[1] * 0.55,
      z: 5.2,
      duration: 1.1,
      ease: "power3.inOut",
    });
    gsap.to(look.current, { x: focus[0] * 0.7, y: focus[1] * 0.7, z: 0, duration: 1.1, ease: "power3.inOut" });
  }, [focus]);

  useFrame(() => {
    camera.position.lerp(target.current, 0.08);
    camera.lookAt(look.current);
  });

  return null;
}
