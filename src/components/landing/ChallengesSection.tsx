"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SpotlightCard } from "@/components/premium/SpotlightCard";
import TextReveal from "./engines/TextReveal";

export default function ChallengesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "center center",
        scrub: 1,
      }
    });

    tl.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(cardsRef.current?.children as unknown as HTMLElement[], 
        { opacity: 0, y: 100, rotationX: 45 }, 
        { opacity: 1, y: 0, rotationX: 0, stagger: 0.2, duration: 1.5, ease: "power3.out" }, 
        "-=0.5"
      );
  }, []);

  return (
    <section ref={sectionRef} id="challenges" className="relative w-full min-h-screen flex items-center justify-center py-32 z-10 pointer-events-none">
      <div className="container px-4 md:px-6 relative z-10 pointer-events-auto">
        <div ref={textRef} className="text-center max-w-4xl mx-auto space-y-6 mb-24">
          <TextReveal text="The Current Disconnect" className="text-4xl md:text-6xl font-bold tracking-tighter text-[#081B33] dark:text-[#F7F3EA] justify-center" />
          <p className="text-xl text-[#081B33]/60 dark:text-[#F7F3EA]/60 leading-relaxed font-light">
            Today&apos;s youth leadership is fragmented across outdated systems, chaotic WhatsApp groups, scattered emails, and disconnected spreadsheets.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
          {[
            { title: "Communication", desc: "Chaotic WhatsApp groups and lost context.", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path> },
            { title: "Membership", desc: "Scattered spreadsheets and unverified identities.", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></> },
            { title: "Policy Development", desc: "Disconnected workflows and lost revisions.", icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></> },
            { title: "Leadership", desc: "Lack of centralized visibility and recognition.", icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon> }
          ].map((item, i) => (
            <SpotlightCard key={i} className="p-8 flex flex-col items-center justify-center text-center space-y-4 hover:-translate-y-2 cursor-pointer shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#081B33]/5 dark:bg-[#F7F3EA]/5 flex items-center justify-center text-[#081B33]/40 dark:text-[#F7F3EA]/40 group-hover:text-[#C89B2A] transition-colors duration-500 relative z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
              </div>
              <h3 className="text-lg font-semibold text-[#081B33]/80 dark:text-[#F7F3EA]/80 group-hover:text-[#081B33] dark:group-hover:text-[#F7F3EA] transition-colors relative z-10">{item.title}</h3>
              <p className="text-sm text-[#081B33]/50 dark:text-[#F7F3EA]/40 group-hover:text-[#081B33]/70 dark:group-hover:text-[#F7F3EA]/60 transition-colors relative z-10">{item.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
