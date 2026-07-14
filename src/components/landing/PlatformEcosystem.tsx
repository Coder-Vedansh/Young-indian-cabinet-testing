"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Users, Vote, Calendar, Shield, Activity, Lightbulb, Monitor, MessageSquare } from "lucide-react";
import GlassPanel from "./engines/GlassPanel";
import TextReveal from "./engines/TextReveal";

const modules = [
  { name: "Member Portal", icon: Users, desc: "Digital Identity & Roles" },
  { name: "Policy Lab", icon: Lightbulb, desc: "Drafting & Amendments" },
  { name: "Learning Hub", icon: Monitor, desc: "Knowledge & Resources" },
  { name: "Meetings", icon: MessageSquare, desc: "Virtual Chambers" },
  { name: "Events", icon: Calendar, desc: "Sessions & Summits" },
  { name: "Recognition", icon: Shield, desc: "Badges & Certificates" },
  { name: "Analytics", icon: Activity, desc: "Impact Tracking" },
  { name: "Administration", icon: Vote, desc: "Secure Ballot System" },
];

export default function PlatformEcosystem() {
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
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 1, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <section ref={sectionRef} id="ecosystem" className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 z-10 pointer-events-none">
      <div className="container px-4 md:px-6 relative z-10 pointer-events-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-24">
          <TextReveal text="The Digital Ecosystem" className="text-4xl md:text-6xl font-bold tracking-tighter text-[#081B33] dark:text-[#F7F3EA] justify-center" />
          <p className="text-xl text-[#081B33]/60 dark:text-[#F7F3EA]/60 leading-relaxed font-light">
            A futuristic digital city where every module represents a core pillar of the Youth Assembly platform.
          </p>
        </div>

        <div ref={itemsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {modules.map((mod, i) => (
            <GlassPanel key={i} className="p-6 cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(200,155,42,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C89B2A]/0 via-transparent to-[#D97706]/0 group-hover:from-[#C89B2A]/10 group-hover:to-transparent transition-colors duration-500" />
              
              <mod.icon className="w-8 h-8 text-[#081B33]/40 dark:text-[#F7F3EA]/40 mb-4 group-hover:text-[#C89B2A] group-hover:scale-110 transition-all duration-500 relative z-10" />
              
              <h3 className="text-lg font-bold text-[#081B33] dark:text-[#F7F3EA] mb-2 relative z-10">{mod.name}</h3>
              <p className="text-xs text-[#081B33]/50 dark:text-[#F7F3EA]/50 font-light group-hover:text-[#081B33]/70 dark:group-hover:text-[#F7F3EA]/70 transition-colors relative z-10">{mod.desc}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
