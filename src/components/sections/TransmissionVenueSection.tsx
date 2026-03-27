"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export function TransmissionVenueSection() {
  return (
    <section id="venue" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-12 border-b border-cyan-electric/30 pb-4">
        <p className="text-xs tracking-[0.2em] text-cyan-electric uppercase mb-2 font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-electric animate-pulse"></span>
          TRANSMISSION: VENUE
        </p>
        <h2 className="text-4xl md:text-5xl text-white font-black tracking-tight">Agnel Institute of Technology and Design</h2>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="terminal-panel neon-border flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-magenta-cyber" size={32} />
              <div>
                <h3 className="text-2xl text-yellow-nuclear font-bold uppercase">Main Campus Node</h3>
                <p className="text-xs text-cyan-electric font-mono">Assagao, Goa // Grid Ref: 15.5977° N, 73.7909° E</p>
              </div>
            </div>
            
            <ul className="mt-6 space-y-4 text-ink">
              <li className="flex gap-2">
                <span className="text-cyan-electric">&gt;</span> Spacious campus with state-of-the-art battle-tested labs.
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-electric">&gt;</span> Located in the heart of Assagao, combining tech focus with coastal vibes.
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-electric">&gt;</span> Dedicated combat zones for Robo Wars and CTF Hackathons.
              </li>
            </ul>
          </div>

          <div className="mt-8 border-t border-cyan-electric/20 pt-6">
            <a href="https://maps.app.goo.gl/B9p6v9U1Yx5pX5uG9" target="_blank" rel="noreferrer" className="cyber-button text-sm w-full md:w-auto">
              OPEN ROUTE IN MAPS
            </a>
          </div>
        </motion.div>

        {/* Right Panel */}
        <div className="flex flex-col gap-6">
          {/* Rail Node */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="terminal-panel neon-border-magenta group"
          >
            <p className="text-[10px] text-magenta-cyber tracking-[0.2em] font-mono mb-1">TRANSMISSION NODE // RAIL</p>
            <h4 className="text-xl text-white font-bold uppercase">Thivim Railway Station</h4>
            <p className="text-sm text-ink mt-2">Closest major rail hub. ~15 mins estimated transit to AITD campus.</p>
            
            <div className="mt-4 mb-4 flex gap-1">
              <span className="h-1 flex-1 bg-magenta-cyber/50"></span>
              <span className="h-1 flex-1 bg-magenta-cyber/50"></span>
              <span className="h-1 flex-1 bg-magenta-cyber"></span>
              <span className="h-1 flex-1 bg-zinc-800"></span>
            </div>

            <a href="https://maps.app.goo.gl/9y8YjFj8y8YjFj8Y8" target="_blank" rel="noreferrer" className="text-xs text-yellow-nuclear hover:text-white flex items-center gap-1 transition-colors">
              <Navigation size={12} /> ENGAGE ROUTE
            </a>
          </motion.div>

          {/* Air Node */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="terminal-panel neon-border group"
          >
            <p className="text-[10px] text-cyan-electric tracking-[0.2em] font-mono mb-1">TRANSMISSION NODE // AIR</p>
            <h4 className="text-xl text-white font-bold uppercase">Manohar Int&apos;l Airport (MOPA)</h4>
            <p className="text-sm text-ink mt-2">North Goa air terminal. ~30 mins estimated transit to AITD campus.</p>
            
            <div className="mt-4 mb-4 flex gap-1">
              <span className="h-1 flex-1 bg-cyan-electric/50"></span>
              <span className="h-1 flex-1 bg-cyan-electric/50"></span>
              <span className="h-1 flex-1 bg-zinc-800"></span>
              <span className="h-1 flex-1 bg-zinc-800"></span>
            </div>

            <a href="https://maps.app.goo.gl/mopa-airport" target="_blank" rel="noreferrer" className="text-xs text-yellow-nuclear hover:text-white flex items-center gap-1 transition-colors">
              <Navigation size={12} /> ENGAGE ROUTE
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
