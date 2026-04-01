"use client";

import { motion } from "framer-motion";
import { Package, Clock, ShieldAlert } from "lucide-react";

export function TimelineSection() {
  return (
    <section id="schedule" className="py-24 px-6 max-w-7xl mx-auto relative z-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,var(--nuclear-yellow)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10">
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="inline-block border border-yellow-nuclear/50 bg-yellow-nuclear/10 px-4 py-1 text-[10px] tracking-[0.4em] text-yellow-nuclear uppercase mb-6 shadow-[0_0_15px_rgba(249,255,59,0.2)]">
            SYSTEM_STATUS // PENDING_DECRYPTION
          </div>
          <h2 className="text-5xl md:text-7xl text-white font-black tracking-tighter uppercase leading-none">
            GRID FLOW <span className="text-yellow-nuclear drop-shadow-[0_0_15px_rgba(249,255,59,0.5)]">OPERATIONS</span>
          </h2>
          <p className="text-ink mt-8 max-w-2xl font-mono text-sm tracking-wide border-l-2 border-yellow-nuclear pl-6 py-2 bg-yellow-nuclear/5">
            // OPERATIONAL TIMELINE CURRENTLY ENCRYPTED. <br/>
            // CORE PROCESSORS ARE FINALIZING EVENT SEQUENCES.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="terminal-panel neon-border-yellow bg-black/80 backdrop-blur-xl p-12 md:p-20 text-center relative overflow-hidden group"
        >
          {/* Animated scanline inside the panel */}
          <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-nuclear/20 blur-[40px] rounded-full animate-pulse"></div>
              <Package size={80} className="text-yellow-nuclear relative animate-bounce" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Event Schedule
              </h3>
              <div className="flex items-center justify-center gap-4 text-yellow-nuclear">
                <ShieldAlert size={20} className="animate-pulse" />
                <span className="text-xl md:text-2xl font-mono font-bold tracking-[0.2em] uppercase">
                  Package Dropping Soon
                </span>
                <ShieldAlert size={20} className="animate-pulse" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
              <div className="p-6 border border-yellow-nuclear/20 bg-yellow-nuclear/5 rounded-none group-hover:border-yellow-nuclear/40 transition-colors">
                <Clock className="text-yellow-nuclear mb-4 mx-auto" size={24} />
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Status</p>
                <p className="text-white font-bold uppercase mt-1 tracking-tight">Compiling...</p>
              </div>
              <div className="p-6 border border-yellow-nuclear/20 bg-yellow-nuclear/5 rounded-none group-hover:border-yellow-nuclear/40 transition-colors">
                <div className="w-6 h-6 border-2 border-yellow-nuclear border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Progress</p>
                <p className="text-white font-bold uppercase mt-1 tracking-tight">87% Synchronized</p>
              </div>
              <div className="p-6 border border-yellow-nuclear/20 bg-yellow-nuclear/5 rounded-none group-hover:border-yellow-nuclear/40 transition-colors">
                <Package className="text-yellow-nuclear mb-4 mx-auto opacity-50" size={24} />
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Payload</p>
                <p className="text-white font-bold uppercase mt-1 tracking-tight">Encrypted Bundle</p>
              </div>
            </div>
          </div>

          {/* Decorative Corner Glitch Elements */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-nuclear opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-nuclear opacity-40"></div>
        </motion.div>
      </div>
    </section>
  );
}
