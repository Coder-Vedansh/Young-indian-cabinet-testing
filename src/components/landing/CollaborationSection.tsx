"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CollaborationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current, 
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
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
    <section ref={sectionRef} className="relative w-full min-h-[80vh] flex items-center justify-center py-32 z-10 pointer-events-none">
      <div className="container px-4 md:px-6 relative z-10 pointer-events-auto">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#081B33] dark:text-[#F7F3EA]">
            National <span className="text-[#C89B2A]">Collaboration</span>
          </h2>
          <p className="text-xl text-[#081B33]/60 dark:text-[#F7F3EA]/60 leading-relaxed font-light">
            Committees coordinating in real-time. Policy approvals flowing instantly. A truly interconnected digital headquarters for youth governance.
          </p>
        </div>
      </div>
    </section>
  );
}
