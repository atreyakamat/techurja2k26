"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [logs, setLogs] = useState<string[]>([]);
  const initialLogs = [
    "> BOOTSTRAP: DIGITAL ARENA v2.6.",
    "> SECURE CONNECTION ESTABLISHED.",
    "> LOADING COMBAT PROTOCOLS...",
    "> EVENTS ONLINE: ROBO WARS / CODE SIEGE / NEURO PUZZLE RIFT",
    "> AWAITING USER INPUT..."
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Component */}
      <div className="absolute inset-0 z-0">
        <div className="neon-grid"></div>
        <div className="scanline-mask"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.9)_80%)] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start gap-6"
        >
          <div className="inline-block border border-cyan-electric/50 bg-cyan-electric/10 px-3 py-1 text-xs tracking-[0.2em] text-cyan-electric uppercase shadow-[0_0_10px_rgba(41,244,255,0.2)]">
            TECHURJA 2K26 // DIGITAL ARENA TERMINAL
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight">
            <span className="block text-white">ENTER THE</span>
            <span className="block text-cyan-electric glitch-hover drop-shadow-[0_0_15px_rgba(41,244,255,0.8)]" data-text="DIGITAL ARENA">DIGITAL ARENA</span>
            <span className="block text-white border-b-4 border-yellow-nuclear pb-2 inline-block">TERMINAL</span>
          </h1>
          
          <p className="max-w-xl text-lg md:text-xl text-ink leading-relaxed border-l-2 border-magenta-cyber pl-4">
            Agnel Institute of Technology & Design's high-octane cyberpunk tech festival. Hack, build, and battle through the grid.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="#register" className="cyber-button text-sm md:text-base glitch-hover" data-text="INITIATE REGISTRATION">
              INITIATE REGISTRATION
            </Link>
            <Link href="#events" className="cyber-button-alt text-sm md:text-base">
              VIEW COMBAT EVENTS
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Fake System Log */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block terminal-panel font-mono text-sm text-cyan-electric h-64 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-electric to-transparent opacity-50"></div>
          <div className="flex flex-col gap-2">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-pre-wrap"
              >
                {log}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-cyan-electric mt-2"
            />
          </div>
        </motion.div>
      </div>

      {/* Floating HUD Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] opacity-30 text-cyan-electric pointer-events-none"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      </motion.div>
    </section>
  );
}
