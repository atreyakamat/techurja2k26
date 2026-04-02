"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { EventRecord } from "@/lib/event-data";
import { MapPin, Zap, ArrowRight, Medal } from "lucide-react";

const flairColors = {
  Gold: "text-yellow-400 border-yellow-400/50 bg-yellow-400/10 shadow-[0_0_10px_rgba(250,204,21,0.3)]",
  Silver: "text-zinc-300 border-zinc-300/50 bg-zinc-300/10 shadow-[0_0_10px_rgba(212,212,216,0.3)]",
  Bronze: "text-orange-400 border-orange-400/50 bg-orange-400/10 shadow-[0_0_10px_rgba(251,146,60,0.3)]",
  Flagship: "text-red-500 border-red-500/50 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.4)]",
};

export function EventCard({ event, index }: { event: EventRecord; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="terminal-panel neon-border group hover:border-magenta-cyber transition-all duration-500 overflow-hidden flex flex-col h-full p-0"
    >
      <Link href={`/events/${event.slug}`} className="flex flex-col h-full">
        {/* Event Image / Placeholder */}
        <div className="relative w-full aspect-video overflow-hidden border-b border-white/10 bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          
          {event.image ? (
            <Image 
              src={`${event.image}?v=2.6.2`} 
              alt={event.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110 will-change-[filter,transform]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 relative">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-[radial-gradient(circle,var(--electric-cyan)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>
              <Zap size={40} className="text-cyan-electric/20 group-hover:text-cyan-electric/50 transition-colors mb-2" />
              <span className="text-[10px] font-mono text-zinc-700 tracking-[0.5em] uppercase text-center px-4">DATA_LINK_ENCRYPTED</span>
            </div>
          )}

          {/* Flair Badge */}
          {event.flair && (
            <div className={`absolute top-4 left-4 z-20 border px-2 py-1 flex items-center gap-1.5 backdrop-blur-md ${flairColors[event.flair]}`}>
              <Medal size={10} />
              <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em]">
                {event.flair} EVENT
              </span>
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute top-4 right-4 z-20 border border-cyan-electric/30 bg-black/60 backdrop-blur-md px-2 py-1 text-[8px] font-mono text-cyan-electric uppercase tracking-widest">
            {event.category}
          </div>

          {/* Level Badge */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${event.level === 'higher secondary' ? 'bg-yellow-nuclear' : 'bg-magenta-cyber'} animate-pulse`}></div>
            <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${event.level === 'higher secondary' ? 'text-yellow-nuclear' : 'text-magenta-cyber'}`}>
              {event.level}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-electric transition-colors uppercase tracking-tighter leading-tight">
              {event.name}
            </h3>
          </div>
          
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-6 font-mono">
            {event.shortDescription}
          </p>

          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-cyan-electric" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={12} className="text-yellow-nuclear" />
                <span className="text-white">
                  {typeof event.registrationFee === 'number' && event.registrationFee > 0 ? `₹${event.registrationFee}` : event.registrationFee}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between group/link">
              <span className="text-[10px] font-mono text-cyan-electric font-bold tracking-widest uppercase">
                Access Node
              </span>
              <ArrowRight size={14} className="text-cyan-electric -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
