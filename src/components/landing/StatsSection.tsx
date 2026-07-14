"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { label: "States Connected", value: "28" },
  { label: "Active Members", value: "15,000+" },
  { label: "Committees", value: "45" },
  { label: "Policies Created", value: "120+" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "center center",
        scrub: 1,
      }
    });

    tl.fromTo(itemsRef.current?.children as unknown as HTMLElement[],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1 }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center py-32 z-10 pointer-events-none">
      <div className="container px-4 md:px-6 relative z-10 pointer-events-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#081B33] dark:text-[#F7F3EA]">
            Connecting <span className="text-[#C89B2A]">India</span>
          </h2>
          <p className="text-xl text-[#081B33]/70 dark:text-[#F7F3EA]/70 leading-relaxed font-light">
            A rapidly expanding network of young minds collaborating across the nation. Data flows continuously, bridging the gap between states.
          </p>
        </div>

        <div ref={itemsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center space-y-2 p-6 rounded-2xl bg-[#081B33]/5 dark:bg-[#F7F3EA]/5 border border-[#081B33]/10 dark:border-[#F7F3EA]/10 backdrop-blur-md">
              <span className="text-4xl md:text-5xl font-bold text-[#081B33] dark:text-[#F7F3EA] tracking-tighter">{stat.value}</span>
              <span className="text-sm text-[#C89B2A] font-medium tracking-wide uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
