"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import MagneticButton from "./engines/MagneticButton";

const navItems = [
  { name: "Journey", link: "#home" },
  { name: "Challenges", link: "#challenges" },
  { name: "Ecosystem", link: "#ecosystem" },
  { name: "Vision", link: "#vision" },
];

export default function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
        isScrolled ? "w-[90%] max-w-2xl" : "w-[95%] max-w-4xl top-6"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-full border border-[#081B33]/10 dark:border-white/10 bg-[#F7F3EA]/40 dark:bg-[#081B33]/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C89B2A] to-[#D97706] flex items-center justify-center shadow-[0_0_15px_rgba(200,155,42,0.3)] dark:shadow-[0_0_15px_rgba(200,155,42,0.5)] group-hover:shadow-[0_0_25px_rgba(200,155,42,0.6)] dark:group-hover:shadow-[0_0_25px_rgba(200,155,42,0.8)] transition-all duration-300">
            <span className="text-[#F7F3EA] dark:text-[#081B33] font-bold text-xs">YI</span>
          </div>
          <span className="text-[#081B33] dark:text-[#F7F3EA] font-semibold hidden sm:block tracking-wide">Youth Assembly</span>
        </Link>

        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="px-4 py-2 text-sm font-medium text-[#081B33]/70 dark:text-[#F7F3EA]/60 hover:text-[#081B33] dark:hover:text-[#F7F3EA] hover:bg-[#081B33]/5 dark:hover:bg-[#F7F3EA]/10 rounded-full transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-[#081B33]/80 dark:text-[#F7F3EA]/80 hover:text-[#081B33] dark:hover:text-[#F7F3EA] transition-colors duration-300"
          >
            Login
          </Link>
          <MagneticButton>
            <Link
              href="/auth/signup"
              className="px-6 py-2 text-sm font-semibold text-[#F7F3EA] dark:text-[#081B33] bg-[#C89B2A] rounded-full hover:bg-[#081B33] dark:hover:bg-white shadow-[0_0_15px_rgba(200,155,42,0.3)] dark:shadow-[0_0_15px_rgba(200,155,42,0.4)] hover:shadow-[0_0_25px_rgba(200,155,42,0.5)] dark:hover:shadow-[0_0_25px_rgba(200,155,42,0.7)] transition-all duration-300 inline-block"
            >
              Join Now
            </Link>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}
