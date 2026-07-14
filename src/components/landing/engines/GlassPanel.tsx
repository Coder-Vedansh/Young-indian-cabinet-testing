"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function GlassPanel({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group border transition-all duration-500 
        ${isDark ? "border-[#F7F3EA]/10 bg-[#081B33]/20 hover:border-[#C89B2A]/40" 
                 : "border-[#081B33]/10 bg-[#F7F3EA]/20 hover:border-[#C89B2A]/40"} 
        backdrop-blur-xl rounded-3xl ${className}`}
    >
      {/* Interactive cursor glow tracking */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? "rgba(200,155,42,0.15)" : "rgba(8,27,51,0.08)"}, transparent 40%)`,
        }}
      />
      
      {/* Subtle top edge highlight */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${isDark ? "via-[#F7F3EA]/20" : "via-[#081B33]/20"} to-transparent`} />
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
