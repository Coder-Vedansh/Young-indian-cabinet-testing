"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AssemblyScene({ isDark = true }: { isDark?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create parliamentary semi-circle seating (nodes)
  const [nodes, connections] = useMemo(() => {
    const nodePositions: THREE.Vector3[] = [];
    const lines: THREE.Vector3[] = [];
    
    const tiers = 7;
    for (let t = 1; t <= tiers; t++) {
      const radius = t * 0.55; // Distance from center
      const height = t * 0.2; // Tier elevation
      const seatsInTier = t * 12; // More seats in outer rings
      
      for (let s = 0; s <= seatsInTier; s++) {
        // Semi-circle (from 0 to PI)
        const angle = (s / seatsInTier) * Math.PI;
        
        // Convert to Cartesian
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle); // Since it's semi-circle, Z is positive
        const y = height;
        
        const pos = new THREE.Vector3(x, y, z);
        nodePositions.push(pos);
      }
    }
    
    // Create some vertical data beams connecting random nodes to the "cloud"
    for (let i = 0; i < 40; i++) {
      const randomNode = nodePositions[Math.floor(Math.random() * nodePositions.length)];
      lines.push(randomNode);
      lines.push(new THREE.Vector3(randomNode.x, randomNode.y + Math.random() * 2 + 1, randomNode.z));
    }

    return [nodePositions, lines];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation for cinematic effect
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      // Gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.5; 
      
      // Interactive tilt based on mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.pointer.y * Math.PI) / 15 + 0.3, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, (state.pointer.x * Math.PI) / 15, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, -3.5, 0]}>
      
      {/* The Central Pillar / Core (The Constitution/Speaker) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1.2, 32]} />
        <meshStandardMaterial 
          color={isDark ? "#C89B2A" : "#081B33"} 
          emissive={isDark ? "#D97706" : "#000000"}
          emissiveIntensity={isDark ? 0.8 : 0.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Glowing rings around the core */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.8, 0.01, 16, 64]} />
        <meshBasicMaterial color={isDark ? "#F7F3EA" : "#081B33"} transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[1.2, 0.01, 16, 64]} />
        <meshBasicMaterial color={isDark ? "#F7F3EA" : "#081B33"} transparent opacity={0.2} />
      </mesh>

      {/* Assembly Nodes */}
      <group>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.06, 0.02, 0.06]} />
            <meshStandardMaterial 
              color={isDark ? "#F7F3EA" : "#081B33"} 
              emissive={isDark ? "#F7F3EA" : "#081B33"}
              emissiveIntensity={Math.random() * 0.8 + 0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Data Beams */}
      {connections.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={connections.length}
              args={[new Float32Array(connections.flatMap(v => [v.x, v.y, v.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} transparent opacity={0.2} />
        </lineSegments>
      )}

      {/* Ashoka Chakra Base (Foundation of Democracy) */}
      <group position={[0, -0.6, 0]} rotation={[Math.PI/2, 0, 0]}>
        <mesh>
          <torusGeometry args={[4.5, 0.015, 16, 64]} />
          <meshBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} transparent opacity={0.3} />
        </mesh>
        
        {/* 24 Spokes */}
        {Array.from({ length: 24 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 12]}>
            <cylinderGeometry args={[0.008, 0.008, 9, 8]} />
            <meshBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} transparent opacity={0.15} />
          </mesh>
        ))}
        
        {/* Center Hub */}
        <mesh>
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} transparent opacity={0.2} />
        </mesh>
      </group>

    </group>
  );
}
