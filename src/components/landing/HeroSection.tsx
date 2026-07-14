"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import React from 'react';
import TextReveal from './engines/TextReveal';
import { GlowButton } from '@/components/premium/GlowButton';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.to(heroRef.current, {
      y: "20vh",
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <section className="relative w-full h-[120vh] flex flex-col justify-center overflow-hidden pointer-events-none">
      <div ref={heroRef} className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center pointer-events-auto h-screen justify-center">
        <div className="space-y-8 max-w-5xl mt-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#081B33]/10 dark:border-[#F7F3EA]/10 bg-[#081B33]/5 dark:bg-[#F7F3EA]/5 backdrop-blur-md text-sm font-medium text-[#C89B2A] tracking-wider uppercase mb-8 shadow-[0_0_15px_rgba(200,155,42,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#C89B2A] mr-2 animate-pulse"></span>
            System Online
          </div>
          
          <TextReveal 
            text="The Digital Future of <br/> Youth Leadership Starts Here." 
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter text-[#081B33] dark:text-[#F7F3EA] leading-[1.1] justify-center"
          />
          
          <p className="text-[#081B33]/70 dark:text-[#F7F3EA]/70 md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-light mt-6">
            Enter the digital headquarters of a nationwide movement. This is the definitive institutional framework to elevate young leaders through technology, transparency, and collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 pointer-events-auto">
            <GlowButton onClick={() => document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Platform
            </GlowButton>
            
            <a href="#vision" className="group relative inline-flex items-center justify-center h-14 px-8 font-semibold text-[#081B33] dark:text-[#F7F3EA] border border-[#081B33]/20 dark:border-[#F7F3EA]/20 bg-[#081B33]/5 dark:bg-[#F7F3EA]/5 backdrop-blur-lg rounded-full overflow-hidden transition-all duration-300 hover:bg-[#081B33]/10 dark:hover:bg-[#F7F3EA]/10 hover:border-[#081B33]/30 dark:hover:border-[#F7F3EA]/30">
              Watch Vision
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
