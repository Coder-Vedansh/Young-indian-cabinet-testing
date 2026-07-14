"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Torus, Icosahedron } from "@react-three/drei";

export function DemocracyPillar({ isDark = true, position = [0, 0, 0] }: { isDark?: boolean, position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });
  
  return (
    <group ref={groupRef} position={position as [number, number, number]}>
      {/* The Republic Sphere: A vibrant glowing orb representing the globe/nation */}
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#0F6B4B" transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[2.05, 16, 16]}>
        <meshBasicMaterial color="#C89B2A" wireframe transparent opacity={0.6} />
      </Sphere>
      {/* Ambient glowing aura */}
      <Sphere args={[2.4, 32, 32]}>
        <meshBasicMaterial color="#D97706" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </Sphere>
    </group>
  );
}

export function BallotBox({ isDark = true, position = [0, 0, 0] }: { isDark?: boolean, position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position as [number, number, number]}>
      {/* The Connection Rings: Vibrant interlocking toruses representing unity and collaboration */}
      <Torus args={[1.5, 0.1, 16, 100]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#D97706" />
      </Torus>
      <Torus args={[1.5, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#0F6B4B" />
      </Torus>
      <Torus args={[1.5, 0.1, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
        <meshBasicMaterial color="#8B1E2D" />
      </Torus>
      {/* Glowing aura */}
      <Sphere args={[2, 32, 32]}>
        <meshBasicMaterial color="#C89B2A" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </Sphere>
    </group>
  );
}

export function JusticeGavel({ isDark = true, position = [0, 0, 0] }: { isDark?: boolean, position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={position as [number, number, number]}>
      {/* The Assembly Crystal: A highly vibrant geometric crystal representing the institution */}
      <Icosahedron args={[1.8, 0]}>
        <meshBasicMaterial color="#C89B2A" />
      </Icosahedron>
      <Icosahedron args={[2.0, 1]}>
        <meshBasicMaterial color="#D97706" wireframe transparent opacity={0.5} />
      </Icosahedron>
      {/* Outer energy shell */}
      <Sphere args={[2.5, 32, 32]}>
        <meshBasicMaterial color="#8B1E2D" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </Sphere>
    </group>
  );
}
