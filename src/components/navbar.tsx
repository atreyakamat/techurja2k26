"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "/events", label: "Events" },
  { href: "/#venue", label: "Venue" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#register", label: "Register" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-electric/30 bg-black/80 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Left: Emblem */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 border border-cyan-electric flex items-center justify-center rotate-45 group-hover:bg-cyan-electric transition-colors duration-300">
            <span className="text-[10px] font-bold text-cyan-electric group-hover:text-black -rotate-45">T</span>
          </div>
          <span className="font-display text-xl tracking-[0.2em] text-white">
            TECHURJA <span className="text-cyan-electric">2K26</span>
          </span>
        </Link>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.2em] text-ink hover:text-cyan-electric transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-electric transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right: CTA Button */}
        <Link href="/#register" className="cyber-button py-2 px-4 text-[10px] tracking-widest h-10 flex items-center">
          ENTER TERMINAL
        </Link>
      </div>
    </motion.header>
  );
}
