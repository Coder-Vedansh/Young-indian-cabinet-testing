"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cameraProxy } from "./CameraState";

export default function CameraRig() {
  const { camera } = useThree();
  const currentTarget = new THREE.Vector3(0, 0, 0);

  useFrame((state, delta) => {
    // Interpolate camera position towards the GSAP proxy values
    const targetPosition = new THREE.Vector3(cameraProxy.px, cameraProxy.py, cameraProxy.pz);
    
    // Add subtle mouse parallax on top of the base position
    const mouseX = (state.pointer.x * state.viewport.width) / 100;
    const mouseY = (state.pointer.y * state.viewport.height) / 100;
    
    targetPosition.x += mouseX * 0.5;
    targetPosition.y += mouseY * 0.5;

    camera.position.lerp(targetPosition, 0.05);

    // Interpolate the lookAt target
    const targetLookAt = new THREE.Vector3(cameraProxy.tx, cameraProxy.ty, cameraProxy.tz);
    currentTarget.lerp(targetLookAt, 0.05);
    
    camera.lookAt(currentTarget);
  });

  return null;
}
