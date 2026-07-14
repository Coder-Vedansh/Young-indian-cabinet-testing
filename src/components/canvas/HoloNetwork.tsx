"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HoloNetwork({ position, isDark }: { position: [number, number, number], isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const [nodes, lines] = useMemo(() => {
    const n = [];
    const l = [];
    // Generate an abstract spherical network
    for (let i = 0; i < 40; i++) {
      const phi = Math.acos(-1 + (2 * i) / 40);
      const theta = Math.sqrt(40 * Math.PI) * phi;
      const r = 2 + Math.random() * 0.5;
      
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      n.push(new THREE.Vector3(x, y, z));
    }

    for (let i = 0; i < n.length; i++) {
      for (let j = i + 1; j < n.length; j++) {
        if (n[i].distanceTo(n[j]) < 1.5) {
          l.push(n[i], n[j]);
        }
      }
    }
    return [n, l];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color={isDark ? "#C89B2A" : "#081B33"} />
        </mesh>
      ))}

      {/* Connections */}
      {lines.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={lines.length}
              args={[new Float32Array(lines.flatMap(v => [v.x, v.y, v.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={isDark ? "#D97706" : "#081B33"} transparent opacity={0.3} />
        </lineSegments>
      )}
    </group>
  );
}
