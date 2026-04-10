"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { events } from "@/lib/event-data";
import { RegisterForm } from "@/components/register-form";

export function RegistrationTerminalSection() {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  
  const selectedEvent = events.find(e => e.slug === selectedSlug);

  return (
    <section id="register" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="terminal-panel neon-border p-0 overflow-hidden will-change-transform"
      >
        <div className="bg-cyan-electric/20 border-b border-cyan-electric p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e] animate-pulse"></span>
            <span className="font-mono text-xs text-cyan-electric tracking-widest uppercase">Target_Node_Selection {"//"} Access_Protocol</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">v3.1.0</span>
        </div>

        <div className="p-6 md:p-10 relative">
          <div className="absolute inset-0 scanline-mask opacity-50 pointer-events-none"></div>
          
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <label className="text-xs text-magenta-cyber uppercase font-mono tracking-[0.2em] font-bold">
                [1] SELECT TARGET NODE
              </label>
              <div className="relative">
                <select 
                  value={selectedSlug}
                  className="w-full bg-black/50 border border-cyan-electric/30 p-4 text-sm text-white font-mono focus:outline-none focus:border-cyan-electric appearance-none transition-all hover:border-cyan-electric/60"
                  onChange={(e) => setSelectedSlug(e.target.value)}
                >
                  <option value="" className="bg-black">-- INITIALIZE_NODE_SCAN --</option>
                  {events
                    .filter(ev => !ev.isClosed)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(ev => (
                      <option key={ev.slug} value={ev.slug} className="bg-black">
                        {ev.name} (₹{ev.registrationFee})
                      </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-electric font-mono text-xs">▼</div>
              </div>
            </div>

            {selectedEvent && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={selectedSlug}
                className="space-y-6 pt-6 border-t border-white/10"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-electric font-mono">
                    Node_Identified // {selectedEvent.category}
                  </p>
                  <h3 className="text-3xl md:text-4xl text-yellow-nuclear font-black tracking-tighter uppercase">
                    {selectedEvent.name}
                  </h3>
                </div>

                <div className="terminal-panel p-0 border-magenta-cyber/30">
                  <RegisterForm event={selectedEvent} />
                </div>
              </motion.div>
            )}

            {!selectedEvent && (
              <div className="py-20 flex flex-col items-center justify-center border border-white/5 bg-black/20 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.5em] text-center px-6">
                <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center mb-6 animate-pulse">
                  ?
                </div>
                awaiting_node_selection_from_grid_administrator...
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
