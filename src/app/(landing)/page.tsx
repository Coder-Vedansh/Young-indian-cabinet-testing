"use client";

import SmoothScroll from "@/components/landing/SmoothScroll";
import FloatingNav from "@/components/landing/FloatingNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ChallengesSection from "@/components/landing/ChallengesSection";
import PlatformEcosystem from "@/components/landing/PlatformEcosystem";
import CollaborationSection from "@/components/landing/CollaborationSection";
import VisionSection from "@/components/landing/VisionSection";
import CTASection from "@/components/landing/CTASection";
import MainCanvas from "@/components/canvas/MainCanvas";
import { useEffect, useRef } from "react";
import { initCameraTimeline } from "@/components/canvas/CameraState";

export default function LandingPage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      const tl = initCameraTimeline(mainRef.current);
      return () => {
        tl.kill();
      };
    }
  }, []);

  return (
    <div className="text-[#081B33] dark:text-[#F7F3EA] min-h-screen font-sans selection:bg-[#C89B2A]/30 transition-colors duration-500">
      <MainCanvas />
      
      <SmoothScroll>
        <FloatingNav />
        <main ref={mainRef} className="relative z-10 w-full overflow-hidden pt-20">
          <HeroSection />
          <StatsSection />
          <ChallengesSection />
          <PlatformEcosystem />
          <CollaborationSection />
          <VisionSection />
          <CTASection />
        </main>
      </SmoothScroll>
    </div>
  );
}
