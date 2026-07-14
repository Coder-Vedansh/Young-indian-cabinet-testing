"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center py-32 z-10 pointer-events-none">
      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center pointer-events-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#081B33] dark:text-[#F7F3EA] mb-8">
          The Future of Youth Leadership <br className="hidden md:block" />
          <span className="text-[#C89B2A]">Starts Today.</span>
        </h2>
        <Link href="/register" className="group relative inline-flex items-center justify-center h-16 px-10 font-semibold text-[#F7F3EA] dark:text-[#081B33] bg-[#C89B2A] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(200,155,42,0.4)] hover:shadow-[0_0_40px_rgba(200,155,42,0.6)]">
          <span className="relative z-10 flex items-center text-lg">
            Enter Portal <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  );
}
