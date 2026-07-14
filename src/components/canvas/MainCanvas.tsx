"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import CameraRig from "./CameraRig";
import * as THREE from "three";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useTheme } from "next-themes";
import { useFrame } from "@react-three/fiber";
import AnimatedBackground from "@/components/landing/engines/AnimatedBackground";

function AmbientParticles({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, scales] = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      scl[i] = Math.random();
    }
    return [pos, scl];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" count={scales.length} args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color={isDark ? "#C89B2A" : "#081B33"} 
        transparent 
        opacity={isDark ? 0.4 : 0.1} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function MainCanvas() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme !== "light";

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full transition-colors duration-500">
      <AnimatedBackground />
      
      {mounted && (
        <Canvas gl={{ antialias: false, powerPreference: "high-performance" }}>
          <fog attach="fog" args={[isDark ? "#040e1b" : "#ffffff", 5, 20]} />
          <CameraRig />
          
          <ambientLight intensity={isDark ? 0.4 : 0.8} color={isDark ? "#F7F3EA" : "#ffffff"} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 1} color="#C89B2A" />
          <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.5 : 0.2} color="#D97706" />
          
          <Suspense fallback={null}>
            <AmbientParticles isDark={isDark} />
          </Suspense>
          
          {/* Post-Processing for cinematic feel */}
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={isDark ? 0.2 : 0.5} luminanceSmoothing={0.9} height={300} opacity={isDark ? 1.2 : 0.5} />
            <Noise opacity={isDark ? 0.03 : 0.015} />
            <Vignette eskil={false} offset={0.1} darkness={isDark ? 1.0 : 0.3} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
