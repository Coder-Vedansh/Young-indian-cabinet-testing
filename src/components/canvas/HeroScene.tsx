"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  // A procedural geometric assembly representing the "digital parliament"
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Floating effect reacting to mouse
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, (state.pointer.x * state.viewport.width) / 10, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, (state.pointer.y * state.viewport.height) / 10, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core glowing sphere */}
        <Sphere args={[1.5, 64, 64]} scale={1.2}>
          <MeshDistortMaterial 
            color="#c89b2a" 
            emissive="#c89b2a"
            emissiveIntensity={0.4}
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </Sphere>
        
        {/* Orbiting rings/elements representing nodes/members */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 3.5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <mesh key={i} position={[x, Math.sin(angle * 4) * 0.5, z]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.1, 0.6, 0.1]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff"
                emissiveIntensity={0.5}
                metalness={0.9} 
                roughness={0.1} 
              />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
}
