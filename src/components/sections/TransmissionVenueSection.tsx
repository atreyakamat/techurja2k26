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

          <div className="mt-8 border-t border-cyan-electric/20 pt-6 flex flex-col sm:flex-row gap-4">
            <a href="https://www.google.com/maps/place/Agnel+Institute+of+Technology+and+Design/@15.5949964,73.7924315,799m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bbfeb0074e556bd:0x8df5557f01b8a85!8m2!3d15.5949912!4d73.7950064!16s%2Fg%2F11h1vbjvly?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="cyber-button text-sm flex-1">
              OPEN ROUTE IN MAPS
            </a>
            <a href="https://www.google.com/maps/search/places+to+visit+near+Agnel+institute+of+technology+and+design,+goa/@15.6115311,73.7715448,25553m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="cyber-button-alt text-sm flex-1">
              NEARBY ATTRACTIONS
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

            <a href="https://www.google.com/maps/dir/Thivim+Railway+Station+%7C+Konkan+Railway+Division,+Diash+tea+stall+thivim+platform,+403502/Agnel+Institute+of+Technology+and+Design,+Agnel+Technical+Educational+Complex,+Assagao,+Goa+403507/@15.6035642,73.8049821,7838m/data=!3m1!1e3!4m13!4m12!1m5!1m1!1s0x3bbf950006fad507:0x4800f93364ae1c23!2m2!1d73.8768265!2d15.6299527!1m5!1m1!1s0x3bbfeb0074e556bd:0x8df5557f01b8a85!2m2!1d73.7950064!2d15.5949912?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="text-xs text-yellow-nuclear hover:text-white flex items-center gap-1 transition-colors">
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

            <a href="https://www.google.com/maps/dir/Manohar+International+Airport+(GOX)+-+Goa,+Taluka+Pernem,+Mopa,+Goa+403512/Agnel+Institute+of+Technology+and+Design,+Agnel+Technical+Educational+Complex,+Assagao,+Goa+403507/@15.6594722,73.7509614,25547m/data=!3m2!1e3!4b1!4m13!4m12!1m5!1m1!1s0x3bbf8d4ebff4c7bb:0x1b82a0d04cf6def6!2m2!1d73.8669245!2d15.7312475!1m5!1m1!1s0x3bbfeb0074e556bd:0x8df5557f01b8a85!2m2!1d73.7950064!2d15.5949912?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="text-xs text-yellow-nuclear hover:text-white flex items-center gap-1 transition-colors">
              <Navigation size={12} /> ENGAGE ROUTE
            </a>
          </motion.div>

          {/* South Air Node */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="terminal-panel neon-border-magenta group"
          >
            <p className="text-[10px] text-magenta-cyber tracking-[0.2em] font-mono mb-1">TRANSMISSION NODE // SOUTH AIR</p>
            <h4 className="text-xl text-white font-bold uppercase">Goa Dabolim Airport</h4>
            <p className="text-sm text-ink mt-2">South Goa air terminal. ~1 hour estimated transit to AITD campus.</p>
            
            <div className="mt-4 mb-4 flex gap-1">
              <span className="h-1 flex-1 bg-magenta-cyber/50"></span>
              <span className="h-1 flex-1 bg-zinc-800"></span>
              <span className="h-1 flex-1 bg-zinc-800"></span>
              <span className="h-1 flex-1 bg-zinc-800"></span>
            </div>

            <a href="https://www.google.com/maps/dir/Goa+Dabolim+International+Airport,+Airport+Rd,+Dabolim,+Goa+403801/Agnel+Institute+of+Technology+and+Design,+Agnel+Technical+Educational+Complex,+Assagao,+Goa+403507/@15.4887667,73.7692046,25569m/data=!3m2!1e3!4b1!4m13!4m12!1m5!1m1!1s0x3bbfc7fa8c0cf84d:0xb7d429222d347557!2m2!1d73.8331652!2d15.3804965!1m5!1m1!1s0x3bbfeb0074e556bd:0x8df5557f01b8a85!2m2!1d73.7950064!2d15.5949912?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="text-xs text-yellow-nuclear hover:text-white flex items-center gap-1 transition-colors">
              <Navigation size={12} /> ENGAGE ROUTE
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
