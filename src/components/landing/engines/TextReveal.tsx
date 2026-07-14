"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TextReveal({ text, className }: { text: string, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Handle line breaks correctly if provided
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 20, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
      transition: { type: "spring" as const, damping: 20, stiffness: 100 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em] inline-block">
          {word.includes("<br/>") ? <br /> : word}
        </motion.span>
      ))}
    </motion.div>
  );
}
