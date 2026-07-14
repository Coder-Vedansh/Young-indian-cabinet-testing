"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Global proxy object for GSAP to animate
export const cameraProxy = {
  px: 0, py: 0, pz: 10, // Position
  tx: 0, ty: 0, tz: 0,  // Target (LookAt)
};

export const initCameraTimeline = (triggerElement: HTMLElement) => {
  // Clear any existing triggers to prevent duplicates on HMR
  ScrollTrigger.getAll().forEach(t => {
    if (t.vars.id === "camera-timeline") t.kill();
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "camera-timeline",
      trigger: triggerElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5, // Super smooth scrubbing
    }
  });

  // The timeline is evenly distributed across the scroll height.
  // We have 7 sections, so 6 transitions.

  // 1. Hero -> Stats (Move slightly, Assembly stays visible)
  tl.to(cameraProxy, { px: 0, py: 1, pz: 12, tx: 0, ty: -1, ease: "power1.inOut" }, 0)
    
  // 2. Stats -> Challenges (Shift camera right so Assembly is on the left, framing the cards)
  .to(cameraProxy, { px: 6, py: -2, pz: 8, tx: 0, ty: -3, ease: "power1.inOut" }, 1)
  
  // 3. Challenges -> Ecosystem (Dive down towards the Ecosystem Node Cluster)
  .to(cameraProxy, { px: 0, py: -8, pz: 5, tx: -6, ty: -8, ease: "power1.inOut" }, 2)
  
  // 4. Ecosystem -> Collaboration (Swing up to look at Collaboration Node Cluster)
  .to(cameraProxy, { px: 0, py: 0, pz: 10, tx: 6, ty: 2, ease: "power1.inOut" }, 3)
  
  // 5. Collaboration -> Vision (Epic climax, zoom out, look back at Assembly)
  .to(cameraProxy, { px: 0, py: -2, pz: 16, tx: 0, ty: -2, ease: "power2.inOut" }, 4)
  
  // 6. Vision -> CTA (Slight float)
  .to(cameraProxy, { px: 0, py: -1, pz: 18, ease: "power1.inOut" }, 5);

  return tl;
};
