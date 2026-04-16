"use client";

import { motion } from "framer-motion";

const feeds = [
  { id: "CAM-01", label: "MAIN ARENA", timestamp: "14:23:05", color: "bg-cyan-electric" },
  { id: "CAM-02", label: "CODE SECTOR", timestamp: "14:24:12", color: "bg-magenta-cyber" },
  { id: "CAM-03", label: "GRID NODE 7", timestamp: "14:22:58", color: "bg-yellow-nuclear" },
  { id: "CAM-04", label: "DRONE HUB", timestamp: "14:25:30", color: "bg-cyan-electric" },
];

export function OpsFeedSection() {
  return (
    <section id="media" className="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-8 md:mb-12 border-b border-cyan-electric/30 pb-4 flex justify-between items-end">
        <div>
          <p className="text-[10px] md:text-xs tracking-[0.2em] text-cyan-electric uppercase mb-2 font-bold uppercase">LIVE TRANSMISSION FEED</p>
          <h2 className="text-3xl md:text-5xl text-white font-black tracking-tight uppercase">Operational Logs</h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          LIVE_STREAMING_ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {feeds.map((feed, i) => (
          <motion.div
            key={feed.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            className="terminal-panel neon-border p-0 group overflow-hidden will-change-transform"
          >
            <div className="bg-black/80 border-b border-cyan-electric/20 p-2 flex justify-between items-center text-[10px] font-mono">
              <span className="text-white">{feed.id} {"//"} {feed.label}</span>
              <span className="text-zinc-500">{feed.timestamp}</span>
            </div>
            
            <div className="aspect-video relative bg-zinc-900 overflow-hidden">
              {/* Fake Media Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent z-10"></div>
              <div className={`absolute inset-0 opacity-20 ${feed.color} z-0 transition-opacity group-hover:opacity-40`}></div>
              
              {/* Scanlines overlay for the feed */}
              <div className="absolute inset-0 scanline-mask opacity-30 pointer-events-none z-20"></div>
              
              {/* Overlay HUD elements */}
              <div className="absolute top-2 left-2 flex items-center gap-1 z-30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-[8px] text-white font-mono uppercase tracking-tighter">REC</span>
              </div>
              
              <div className="absolute bottom-2 right-2 z-30 opacity-50">
                <div className="w-8 h-8 border border-white/20 relative">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20"></div>
                  <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/20"></div>
                </div>
              </div>

              {/* Viewport Jitter on Hover */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[10px] font-mono text-white/30 tracking-[0.5em] group-hover:text-white/60 transition-colors uppercase">
                  No Signal
                </p>
              </div>
            </div>

            <div className="p-3 bg-black/40 text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex justify-between">
              <span>Bitrate: 45.2 Mbps</span>
              <span>Enc: H.265_SEC</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
