"use client";

import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trophy, Users, Zap, ExternalLink } from "lucide-react";

export default function Archives2025() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stats = [
    { label: "PARTICIPANTS", value: "1500+", icon: Users, color: "text-cyan-electric" },
    { label: "EVENTS", value: "25+", icon: Zap, color: "text-yellow-nuclear" },
    { label: "PRIZE POOL", value: "₹2.5L+", icon: Trophy, color: "text-magenta-cyber" },
  ];

  return (
    <div className="min-h-screen bg-black text-ink">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        {/* Header - No animation on mobile */}
        <header className="relative overflow-hidden terminal-panel border-cyan-electric/30 p-8 md:p-16 mb-16 bg-cyan-electric/5">
          <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-block border border-cyan-electric/50 bg-cyan-electric/10 px-3 py-1 text-[10px] tracking-[0.2em] text-cyan-electric uppercase mb-6">
              LEGACY_DATA // ARCHIVE_2025
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6">
              Techurja <span className="text-cyan-electric">2025 Highlights</span>
            </h1>
            <p className="max-w-2xl text-lg text-zinc-400 font-mono border-l-2 border-magenta-cyber pl-6 py-2">
              The revival of the digital arena. A milestone year that set the foundation for the high-octane 
              combat and innovation we see today.
            </p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div 
              key={stat.label}
              className="terminal-panel border-white/10 p-8 flex flex-col items-center text-center group hover:border-cyan-electric/50 transition-colors"
            >
              <stat.icon size={40} className={`${stat.color} mb-4 opacity-50 group-hover:opacity-100 transition-opacity`} />
              <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter flex items-center gap-4">
              <span className="text-magenta-cyber">/</span> Retrospective
            </h2>
            <div className="space-y-6 text-zinc-400 font-mono text-sm leading-relaxed">
              <p>
                &gt; Techurja 2025 was organized by the Agnel Institute of Technology and Design, bringing together 
                the brightest minds from across the state.
              </p>
              <p>
                &gt; The event featured the first-ever high-stakes RoboWars arena in Assagao, which saw massive participation 
                in the 15kg and 8kg categories.
              </p>
              <p>
                &gt; Innovation Hub showcased over 15 sustainable prototypes addressing local environmental challenges.
              </p>
            </div>
          </div>

          <div className="terminal-panel border-yellow-nuclear/20 p-8 md:p-12 relative overflow-hidden bg-yellow-nuclear/5">
            <h3 className="text-xl font-bold text-yellow-nuclear uppercase mb-8 flex items-center gap-3">
              <Zap size={20} /> Hall of Fame
            </h3>
            <ul className="space-y-6">
              {[
                { event: "ROBOWARS 15KG", winner: "Team Bolt (GEC)" },
                { event: "CODING MARATHON", winner: "Cipher_X (AITD)" },
                { event: "TECH QUIZ", winner: "The Alchemists (BITS)" },
                { event: "WEB DESIGN", winner: "Neon Devs (PCC)" }
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">{item.event}</span>
                  <span className="text-white font-bold text-sm tracking-tight italic">{item.winner}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bento Grid Gallery */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
              Captured <span className="text-cyan-electric">Frames</span>
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-electric/50 to-transparent"></div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">ARCHIVE_MEDIA_STREAM</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
            {[
              { id: 1, span: "col-span-2 row-span-2", label: "ROBOWAR_FINALS" },
              { id: 2, span: "col-span-1 row-span-1", label: "CODE_SIEGE" },
              { id: 3, span: "col-span-1 row-span-2", label: "CROWD_PULSE" },
              { id: 4, span: "col-span-1 row-span-1", label: "WINNERS_CIRCLE" },
              { id: 5, span: "col-span-2 row-span-1", label: "INNOVATION_HUB" },
            ].map((item) => (
              <div 
                key={item.id} 
                className={`relative group overflow-hidden border border-white/10 bg-zinc-950 ${item.span} transition-all duration-500 hover:border-cyan-electric/50`}
              >
                <img 
                  src={`/archives/2025/${item.id}.jpg`} 
                  alt={item.label}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-40 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                {/* Overlay for missing images */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-0">
                  <div className="w-full h-full bg-[radial-gradient(circle,var(--electric-cyan)_1px,transparent_1px)] bg-[size:15px_15px] opacity-10 absolute inset-0"></div>
                  <Zap size={24} className="text-cyan-electric/20 mb-2" />
                  <span className="text-[8px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">{item.label}</span>
                  <span className="text-[7px] font-mono text-zinc-800 mt-1">ENCRYPTED_MEDIA_DATA</span>
                </div>

                {/* Decorative border corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-electric/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-electric/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
