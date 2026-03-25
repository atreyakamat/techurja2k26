"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { events } from "@/lib/event-data";

export function RegistrationTerminalSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Hide success message after 4s to simulate a fresh terminal
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="register" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="terminal-panel neon-border p-0 overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-cyan-electric/20 border-b border-cyan-electric p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e] animate-pulse"></span>
            <span className="font-mono text-xs text-cyan-electric tracking-widest">REGISTRATION TERMINAL // LOCK YOUR SLOT</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">v2.6.0</span>
        </div>

        <div className="p-6 md:p-10 relative">
          <div className="absolute inset-0 scanline-mask opacity-50 pointer-events-none"></div>
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <h3 className="text-3xl text-green-400 font-bold mb-4 glitch-hover" data-text="ACCESS GRANTED">ACCESS GRANTED</h3>
              <p className="text-yellow-nuclear font-mono mb-2">// SLOT LOCKED (SIMULATED)</p>
              <p className="text-zinc-500 text-xs mt-8">Demo UI only – no actual data was transmitted.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Operator Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                    <input required type="text" placeholder="type your handle" className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric focus:shadow-[inset_0_0_10px_rgba(41,244,255,0.2)] transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Comm Link</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                    <input required type="email" placeholder="route email packets here" className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric focus:shadow-[inset_0_0_10px_rgba(41,244,255,0.2)] transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Faction / Organization</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                  <input required type="text" placeholder="declare your faction (college/school)" className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric focus:shadow-[inset_0_0_10px_rgba(41,244,255,0.2)] transition-all" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Combat Event</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                    <select required className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric appearance-none">
                      <option value="">Select Target Event</option>
                      {events.map(ev => <option key={ev.slug} value={ev.slug}>{ev.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Unit Size</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                    <input required type="number" min="1" max="4" placeholder="1-4" className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-4 pt-4 border-t border-cyan-electric/20">
                <input required type="checkbox" id="human-check" className="mt-1 w-4 h-4 accent-magenta-cyber bg-black border-cyan-electric" />
                <label htmlFor="human-check" className="text-sm text-ink cursor-pointer font-mono">Confirm you are a human operator, not an offline bot.</label>
              </div>

              <button type="submit" className="w-full cyber-button mt-6 group">
                <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-magenta-cyber group-hover:to-cyan-electric transition-all">
                  EXECUTE LOCK-IN
                </span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
