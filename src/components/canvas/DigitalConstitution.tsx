"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DigitalConstitution({ isDark = true, position = [0, 0, 0] }: { isDark?: boolean, position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Data streams flying out of the constitution
  const streams = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      x: (Math.random() - 0.5) * 3,
      y: Math.random() * 6 + 1,
      z: (Math.random() - 0.5) * 3,
      height: Math.random() * 2 + 1,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group position={position as [number, number, number]}>
      <group ref={groupRef}>
        
        {/* Left Cover */}
        <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
          <boxGeometry args={[2, 0.1, 3]} />
          <meshStandardMaterial color={isDark ? "#081B33" : "#F7F3EA"} roughness={0.3} metalness={0.8} emissive={isDark ? "#C89B2A" : "#081B33"} emissiveIntensity={0.2} />
        </mesh>
        
        {/* Right Cover */}
        <mesh position={[1, 0, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <boxGeometry args={[2, 0.1, 3]} />
          <meshStandardMaterial color={isDark ? "#081B33" : "#F7F3EA"} roughness={0.3} metalness={0.8} emissive={isDark ? "#C89B2A" : "#081B33"} emissiveIntensity={0.2} />
        </mesh>

        {/* Pages (Left) */}
        <mesh position={[-0.9, 0.15, 0]} rotation={[0, 0, Math.PI / 10]}>
          <boxGeometry args={[1.8, 0.2, 2.9]} />
          <meshStandardMaterial color={isDark ? "#F7F3EA" : "#081B33"} roughness={0.9} emissive={isDark ? "#C89B2A" : "#081B33"} emissiveIntensity={0.4} />
        </mesh>
        
        {/* Pages (Right) */}
        <mesh position={[0.9, 0.15, 0]} rotation={[0, 0, -Math.PI / 10]}>
          <boxGeometry args={[1.8, 0.2, 2.9]} />
          <meshStandardMaterial color={isDark ? "#F7F3EA" : "#081B33"} roughness={0.9} emissive={isDark ? "#C89B2A" : "#081B33"} emissiveIntensity={0.4} />
        </mesh>

        {/* Spine */}
        <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 3, 16]} />
          <meshStandardMaterial color={isDark ? "#C89B2A" : "#081B33"} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Holographic Data Streams arising from the book */}
        <group>
          {streams.map((stream, i) => (
            <mesh key={i} position={[stream.x, stream.y, stream.z]}>
              <cylinderGeometry args={[0.02, 0.02, stream.height, 8]} />
              <meshBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
        
        {/* Glowing Aura */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} transparent opacity={0.05} />
        </mesh>

      </group>
    </group>
  );
}
