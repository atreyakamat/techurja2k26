"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SplineScene } from "@/components/SplineScene";

export function HeroSection() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-04-29T09:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black py-20">
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
          className="flex flex-col items-center gap-4 md:gap-6"
        >
          <div className="inline-block border border-cyan-electric/50 bg-cyan-electric/10 px-3 py-1 text-[9px] md:text-[10px] tracking-[0.3em] text-cyan-electric uppercase shadow-[0_0_20px_rgba(41,244,255,0.2)] backdrop-blur-md">
            TECHURJA 2K26 // DIGITAL ARENA TERMINAL
          </div>

          <h1 className="flex flex-col items-center gap-2 md:gap-4 mb-4">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter text-yellow-nuclear drop-shadow-[0_0_20px_rgba(249,255,59,0.8)] glitch-hover cursor-default" 
              data-text="TECHURJA 2K26"
            >
              TECHURJA 2K26
            </motion.span>
            
            <div className="flex flex-wrap justify-center font-mono uppercase font-bold tracking-[0.15em] md:tracking-[0.3em]">
              {isMobile ? (
                <span className="text-xs text-white/50">
                  ENTER THE <span className="text-cyan-electric">DIGITAL ARENA</span>
                </span>
              ) : (
                "ENTER THE DIGITAL ARENA".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ 
                      delay: 1.0 + (i * 0.04),
                      duration: 0.2
                    }}
                    className={`text-[10px] sm:text-xs md:text-xl lg:text-2xl ${
                      i >= 10 // "ENTER THE " is 10 chars
                      ? "text-cyan-electric drop-shadow-[0_0_10px_rgba(41,244,255,0.5)] animate-pulse" 
                      : "text-white/50"
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))
              )}
            </div>
          </h1>

          {/* Countdown Timer */}
          <div className="flex gap-4 md:gap-8 mb-8 font-mono">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HRS", value: timeLeft.hours },
              { label: "MINS", value: timeLeft.mins },
              { label: "SECS", value: timeLeft.secs },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="text-2xl md:text-4xl font-black text-white bg-white/5 border border-white/10 px-3 py-2 min-w-[60px] md:min-w-[80px] shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <span className="text-[8px] md:text-[10px] text-cyan-electric mt-2 tracking-[0.2em] font-bold">{unit.label}</span>
              </div>
            ))}
          </div>

          <div className="max-w-xl text-[10px] sm:text-xs md:text-base text-ink leading-relaxed font-mono py-4 px-6 bg-black/40 backdrop-blur-sm border-x border-cyan-electric/20 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-electric"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-electric"></div>
            Agnel Institute of Technology &amp; Design&apos;s high-octane cyberpunk tech festival. Hack, build, and battle through the grid.
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/#register" className="cyber-button text-[10px] md:text-sm px-6 py-4 md:py-3 glitch-hover w-full sm:w-auto" data-text="INITIATE REGISTRATION">
              INITIATE REGISTRATION
            </Link>
            <Link href="/events" className="cyber-button-alt text-[10px] md:text-sm px-6 py-4 md:py-3 w-full sm:w-auto">
              VIEW COMBAT EVENTS
            </Link>
            <a href="/rulebook.pdf" target="_blank" className="cyber-button-alt border-magenta-cyber text-magenta-cyber hover:bg-magenta-cyber/10 text-[10px] md:text-sm px-6 py-4 md:py-3 w-full sm:w-auto">
              GENERAL RULEBOOK
            </a>
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
