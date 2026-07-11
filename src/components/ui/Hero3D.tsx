"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function RotatingStructure() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotate the entire group slowly
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core Institutional Block */}
        <mesh position={[0, 0, 0]} castShadow>
          <icosahedronGeometry args={[2.2, 1]} />
          {/* Midnight Republic Blue */}
          <meshStandardMaterial color="#081B33" metalness={0.7} roughness={0.2} />
        </mesh>
        
        {/* Wireframe outer shell (Revolution Gold) */}
        <mesh position={[0, 0, 0]} scale={[1.05, 1.05, 1.05]}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial color="#C89B2A" wireframe={true} transparent opacity={0.4} />
        </mesh>
        
        {/* Orbiting particles representing delegates/youth */}
        {Array.from({ length: 24 }).map((_, i) => (
          <OrbitingNode key={i} index={i} total={24} />
        ))}
      </Float>
    </group>
  );
}

function OrbitingNode({ index, total }: { index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  // Create different orbital rings
  const ring = index % 3;
  const radius = 3.5 + ring * 0.8;
  const speed = (0.3 + ring * 0.15) * (index % 2 === 0 ? 1 : -1);
  const yOffset = (index % 5 - 2) * 0.8;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed;
      meshRef.current.position.x = Math.cos(angle + time) * radius;
      meshRef.current.position.z = Math.sin(angle + time) * radius;
      meshRef.current.position.y = yOffset + Math.sin(time * 2 + angle) * 0.3;
    }
  });

  // Colors: Parliament Ivory (#F7F3EA) and Emerald India (#0F6B4B)
  const isEmerald = index % 4 === 0;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial 
        color={isEmerald ? "#0F6B4B" : "#F7F3EA"} 
        emissive={isEmerald ? "#0F6B4B" : "#F7F3EA"} 
        emissiveIntensity={0.6} 
      />
    </mesh>
  );
}

export function Hero3D() {
  return (
    <div className="w-full h-full min-h-[500px] relative rounded-[2.5rem] bg-gradient-to-tr from-primary/5 to-transparent border border-border/50 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]}>
        {/* Lighting setup for cinematic mood */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#C89B2A" />
        
        {/* The 3D Composition */}
        <RotatingStructure />
        
        {/* Soft shadow plane underneath */}
        <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#081B33" />
        
        {/* Interactive Controls */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.5} />
      </Canvas>
      
      {/* Optional Overlay Text or HTML element to anchor the 3D space */}
      <div className="absolute bottom-6 left-6 right-6 border-t border-border/30 pt-4 pointer-events-none">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest text-center">Interactive Model: YIC Institutional Framework</p>
      </div>
    </div>
  );
}
