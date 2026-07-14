"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export function GlowButton({
  children,
  className,
  ...props
}: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative group inline-flex items-center justify-center px-8 py-3 font-medium text-[#09090b] bg-[#00e5ff] rounded-full overflow-visible transition-colors",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-10 bg-[#00e5ff] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
      <div className="absolute inset-0 rounded-full border border-black/10 group-hover:border-white/40 transition-colors pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children as React.ReactNode}</span>
    </motion.button>
  );
}
