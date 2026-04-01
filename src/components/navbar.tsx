"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Zap } from "lucide-react";

const navItems = [
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/#venue", label: "Venue" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on link click
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
          scrolled 
            ? "bg-black/90 backdrop-blur-xl border-cyan-electric/40 py-3" 
            : "bg-black/60 backdrop-blur-md border-cyan-electric/20 py-5"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          {/* Left: Emblem */}
          <Link href="/" className="group flex items-center gap-3 shrink-0" onClick={closeMenu}>
            <div className="w-9 h-9 border-2 border-cyan-electric flex items-center justify-center rotate-45 group-hover:bg-cyan-electric transition-all duration-300 shadow-[0_0_15px_rgba(41,244,255,0.2)] group-hover:shadow-[0_0_20px_rgba(41,244,255,0.5)]">
              <span className="text-xs font-black text-cyan-electric group-hover:text-black -rotate-45 transition-colors">T</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg md:text-xl tracking-[0.2em] text-white">
                TECHURJA <span className="text-cyan-electric drop-shadow-[0_0_8px_rgba(41,244,255,0.4)]">2K26</span>
              </span>
              <span className="text-[8px] font-mono text-zinc-500 tracking-[0.4em] uppercase mt-1 hidden sm:block">
                AITD_ARENA // CONNECTED
              </span>
            </div>
          </Link>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink hover:text-cyan-electric transition-all relative group flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-cyan-electric/0 group-hover:bg-cyan-electric transition-all"></span>
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-cyan-electric transition-all group-hover:w-full shadow-[0_0_8px_#29F4FF]"></span>
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/#register" 
              className="hidden sm:flex cyber-button py-2 px-6 text-[10px] tracking-[0.2em] font-bold h-10 items-center gap-2 group"
            >
              <Zap size={12} className="group-hover:animate-pulse" />
              REGISTER_NOW
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-cyan-electric border border-cyan-electric/30 bg-cyan-electric/5 hover:bg-cyan-electric/20 transition-all rounded-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[350px] z-[110] bg-zinc-950 border-l border-cyan-electric/30 p-8 lg:hidden flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-12">
                <span className="text-[10px] font-mono text-cyan-electric uppercase tracking-[0.3em]">NAV_TERMINAL</span>
                <button onClick={closeMenu} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between p-4 border border-white/5 bg-white/5 hover:bg-cyan-electric/10 hover:border-cyan-electric/40 transition-all duration-300"
                    >
                      <span className="font-display text-lg tracking-widest text-white group-hover:text-cyan-electric">
                        {item.label}
                      </span>
                      <ChevronRight size={18} className="text-zinc-600 group-hover:text-cyan-electric group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="mt-8"
                >
                  <Link 
                    href="/#register" 
                    onClick={closeMenu}
                    className="cyber-button w-full py-5 text-center flex items-center justify-center gap-3 text-sm"
                  >
                    <Zap size={16} />
                    INITIALIZE_REGISTRATION
                  </Link>
                </motion.div>
              </div>

              <div className="mt-auto pt-12 text-center">
                <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.4em]">
                  Techurja v2.0 // Node_Assagao
                </p>
                <div className="flex justify-center gap-4 mt-6">
                   <div className="w-1 h-1 rounded-full bg-cyan-electric/30 animate-pulse"></div>
                   <div className="w-1 h-1 rounded-full bg-magenta-cyber/30 animate-pulse delay-150"></div>
                   <div className="w-1 h-1 rounded-full bg-yellow-nuclear/30 animate-pulse delay-300"></div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
