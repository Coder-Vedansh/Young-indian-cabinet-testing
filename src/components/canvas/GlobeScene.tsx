"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";

export default function GlobeScene({ isDark = true }: { isDark?: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);

  const [nodePositions, setNodePositions] = useState<THREE.Vector3[]>([]);
  const [lines, setLines] = useState<THREE.Vector3[]>([]);

  useEffect(() => {
    const nodes = [];
    const linesArray = [];
    
    // Abstract cluster of nodes on the sphere surface (latitude ~20, longitude ~80)
    for (let i = 0; i < 30; i++) {
      const lat = (Math.random() * 20 + 8) * (Math.PI / 180);
      const lon = (Math.random() * 30 + 68) * (Math.PI / 180);
      
      const r = 2.05; // Slightly above globe surface
      const x = r * Math.cos(lat) * Math.cos(lon);
      const y = r * Math.sin(lat);
      const z = r * Math.cos(lat) * Math.sin(lon);
      
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect them
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 0.8) {
          linesArray.push(nodes[i], nodes[j]);
        }
      }
    }
    
    setNodePositions(nodes);
    setLines(linesArray);
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Gentle floating
      globeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Interactive rotation
      globeRef.current.rotation.x = THREE.MathUtils.lerp(globeRef.current.rotation.x, (state.pointer.y * Math.PI) / 10, 0.05);
      globeRef.current.rotation.z = THREE.MathUtils.lerp(globeRef.current.rotation.z, (state.pointer.x * Math.PI) / 10, 0.05);
    }
  });

  return (
    <group ref={globeRef} position={[0, 0, 0]}>
      {/* Dark/Light stylized Earth */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color={isDark ? "#040e1b" : "#F7F3EA"} 
          emissive={isDark ? "#020810" : "#e0ddd5"}
          roughness={0.8}
          metalness={0.2}
          wireframe={true}
          transparent
          opacity={isDark ? 0.15 : 0.05}
        />
      </Sphere>
      
      <Sphere args={[1.98, 64, 64]}>
        <meshStandardMaterial 
          color={isDark ? "#081B33" : "#ffffff"} 
          roughness={1}
        />
      </Sphere>

      {/* Nodes and Connections (India Highlight) */}
      <group ref={nodesRef}>
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} />
          </mesh>
        ))}
        
        {lines.length > 0 && (
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={lines.length}
                args={[new Float32Array(lines.flatMap(v => [v.x, v.y, v.z])), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#C89B2A" transparent opacity={0.4} />
          </lineSegments>
        )}
      </group>
      
      {/* Outer atmosphere glow */}
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial color="#C89B2A" transparent opacity={0.03} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
}
