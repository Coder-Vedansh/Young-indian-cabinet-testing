"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextReveal from "./engines/TextReveal";

export default function VisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When this section comes into view, the main page will trigger the globe to zoom out
    // This component just holds the text
    gsap.fromTo(sectionRef.current, 
      { opacity: 0 },
      { 
        opacity: 1, 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="vision" className="relative w-full min-h-screen flex items-center justify-center py-32 z-10 pointer-events-none">
      <div className="container px-4 md:px-6 relative z-10 pointer-events-auto text-center flex flex-col items-center">
        <TextReveal 
          text="The Operating System of <br/> Tomorrow's Leaders" 
          className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#081B33] dark:text-[#F7F3EA] mb-6 justify-center" 
        />
        <p className="text-xl md:text-2xl text-[#081B33]/60 dark:text-[#F7F3EA]/60 font-light max-w-3xl mx-auto mt-4">
          Every state illuminated. Thousands of digital connections. The definitive ecosystem powering the Youth Assembly.
        </p>
      </div>
    </section>
  );
}
