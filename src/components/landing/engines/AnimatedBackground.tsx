"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme !== "light";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 bg-gradient-to-br ${isDark ? "from-[#081B33] via-[#040e1b] to-[#0a192f]" : "from-[#F7F3EA] via-[#ffffff] to-[#f0efe9]"}`} />
      
      {/* Moving Grid Pattern for high-tech feel */}
      <motion.div 
        className={`absolute inset-0 opacity-20 ${isDark ? "bg-[linear-gradient(rgba(247,243,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(247,243,234,0.05)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(8,27,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(8,27,51,0.05)_1px,transparent_1px)]"}`}
        style={{ backgroundSize: '50px 50px' }}
        animate={{ y: [0, 50] }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
      />
      
      {/* Fast Animated Glowing Orbs for Volumetric Depth */}
      <motion.div 
        animate={{
          x: ["0%", "30%", "-20%", "0%"],
          y: ["0%", "-30%", "30%", "0%"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        className={`absolute top-0 left-[10%] w-[40vw] h-[40vw] rounded-full blur-[80px] ${isDark ? "bg-[#C89B2A]/30" : "bg-[#C89B2A]/40"}`} 
      />
      
      <motion.div 
        animate={{
          x: ["0%", "-40%", "20%", "0%"],
          y: ["0%", "40%", "-20%", "0%"],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        className={`absolute top-[40%] right-[10%] w-[45vw] h-[45vw] rounded-full blur-[100px] ${isDark ? "bg-[#0F6B4B]/30" : "bg-[#D97706]/40"}`} 
      />
      
      <motion.div 
        animate={{
          x: ["0%", "20%", "-40%", "0%"],
          y: ["0%", "20%", "40%", "0%"],
        }}
        transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
        className={`absolute bottom-0 left-[30%] w-[50vw] h-[50vw] rounded-full blur-[90px] ${isDark ? "bg-[#D97706]/20" : "bg-[#081B33]/20"}`} 
      />
      
      {/* High-frequency static noise overlay for a premium film-grain look */}
      <div className="absolute inset-0 mix-blend-overlay opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </div>
  );
}
