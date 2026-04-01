"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SplineScene } from "@/components/SplineScene";

export function HeroSection() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile for Spline optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let currentIndex = 0;
    const initialLogs = [
      "> BOOTSTRAP: DIGITAL ARENA v2.6.",
      "> SECURE CONNECTION ESTABLISHED.",
      "> LOADING COMBAT PROTOCOLS...",
      "> EVENTS ONLINE: ROBO WARS / CODE SIEGE",
      "> AWAITING USER INPUT..."
    ];
    const interval = setInterval(() => {
      if (currentIndex < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {!isMobile ? (
          // Desktop: Load Spline Scene
          <div className="absolute inset-0 opacity-80 transition-opacity duration-1000">
            <SplineScene />
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          </div>
        ) : (
          // Mobile: Moving Grid Only (Optimized)
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#29F4FF_1px,transparent_1px),linear-gradient(to_bottom,#29F4FF_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-[grid-move_20s_linear_infinite]"></div>
          </div>
        )}
      </div>

      {/* Common Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="scanline-mask opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] md:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="inline-block border border-cyan-electric/50 bg-cyan-electric/10 px-3 py-1 text-[9px] md:text-[10px] tracking-[0.3em] text-cyan-electric uppercase shadow-[0_0_20px_rgba(41,244,255,0.2)] backdrop-blur-md">
            TECHURJA 2K26 // DIGITAL ARENA TERMINAL
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter text-glow flex flex-col items-center">
            <span className="block text-white opacity-90 text-[10px] md:text-sm tracking-[0.5em] font-mono mb-2">ENTER THE</span>
            <span className="block text-yellow-nuclear glitch-hover drop-shadow-[0_0_25px_rgba(249,255,59,0.7)]" data-text="DIGITAL ARENA">DIGITAL ARENA</span>
            <span className="block text-white/50 text-xl md:text-4xl tracking-[0.4em] mt-2 font-mono uppercase">TERMINAL</span>
          </h1>

          <div className="max-w-xl text-xs md:text-base text-ink leading-relaxed font-mono py-4 px-6 bg-black/40 backdrop-blur-sm border-x border-cyan-electric/20 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-electric"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-electric"></div>
            Agnel Institute of Technology &amp; Design&apos;s high-octane cyberpunk tech festival. Hack, build, and battle through the grid.
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full sm:w-auto px-10 sm:px-0">
            <Link href="/#register" className="cyber-button text-[10px] md:text-sm px-6 py-4 md:py-3 glitch-hover w-full sm:w-auto" data-text="INITIATE REGISTRATION">
              INITIATE REGISTRATION
            </Link>
            <Link href="/events" className="cyber-button-alt text-[10px] md:text-sm px-6 py-4 md:py-3 w-full sm:w-auto">
              VIEW COMBAT EVENTS
            </Link>
          </div>

          {/* System logs centered bottom */}
          <div className="mt-8 flex flex-col gap-1 items-center font-mono text-[8px] md:text-[9px] text-cyan-electric/50 uppercase tracking-widest min-h-[30px]">
            {logs.slice(-2).map((log, i) => (
              <div key={i} className="animate-pulse">{log}</div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating HUD Elements - Hidden on small mobile */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] opacity-20 md:opacity-30 text-cyan-electric pointer-events-none hidden sm:block"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      </motion.div>
    </section>
  );
}
