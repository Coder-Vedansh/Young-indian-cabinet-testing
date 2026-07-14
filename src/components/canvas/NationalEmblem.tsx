"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NationalEmblem({ isDark = true, position = [0, 0, 0] }: { isDark?: boolean, position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group position={position as [number, number, number]}>
      <group ref={groupRef}>
        
        {/* Base Steps */}
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.5, 32]} />
          <meshStandardMaterial color={isDark ? "#C89B2A" : "#081B33"} roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[1.2, 1.5, 0.5, 32]} />
          <meshStandardMaterial color={isDark ? "#C89B2A" : "#081B33"} roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Main Pillar */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.8, 1.2, 4, 32]} />
          <meshStandardMaterial color={isDark ? "#C89B2A" : "#081B33"} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Abacus (Drum) */}
        <mesh position={[0, 2.7, 0]}>
          <cylinderGeometry args={[1.1, 0.8, 0.6, 32]} />
          <meshStandardMaterial color={isDark ? "#F7F3EA" : "#ffffff"} roughness={0.2} metalness={0.9} emissive={isDark ? "#C89B2A" : "#081B33"} emissiveIntensity={0.2} />
        </mesh>
        
        {/* Ashoka Chakra embedded on Abacus */}
        {[0, Math.PI/2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh key={`chakra-${i}`} position={[Math.sin(angle) * 1.15, 2.7, Math.cos(angle) * 1.15]} rotation={[Math.PI/2, angle, 0]}>
            <torusGeometry args={[0.2, 0.05, 16, 32]} />
            <meshBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} />
          </mesh>
        ))}

        {/* 4 Abstract Lions (Crystals) */}
        {[0, Math.PI/2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh key={`lion-${i}`} position={[Math.sin(angle) * 0.4, 3.8, Math.cos(angle) * 0.4]} rotation={[0.2, angle, 0]}>
            <coneGeometry args={[0.6, 1.8, 4]} />
            <meshStandardMaterial color={isDark ? "#C89B2A" : "#081B33"} roughness={0.1} metalness={1.0} emissive={isDark ? "#D97706" : "#000000"} emissiveIntensity={0.4} />
          </mesh>
        ))}
        
        {/* Glowing Data Rings around the pillar */}
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[2.0, 0.015, 16, 64]} />
          <meshBasicMaterial color={isDark ? "#F7F3EA" : "#081B33"} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 64]} />
          <meshBasicMaterial color={isDark ? "#F7F3EA" : "#081B33"} transparent opacity={0.2} />
        </mesh>

      </group>
    </group>
  );
}
