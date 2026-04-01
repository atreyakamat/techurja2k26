"use client";

import Link from "next/link";
<<<<<<< HEAD
import { motion } from "framer-motion";
=======
import React from "react";
>>>>>>> e93dc8dd5caed80f5d6325fec51321e70c3c69d2
import type { EventRecord } from "@/lib/event-data";
import { MapPin, Users, Zap, ArrowRight } from "lucide-react";

<<<<<<< HEAD
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
            <img 
              src={event.image} 
              alt={event.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/600x400/050505/29F4FF?text=${encodeURIComponent(event.name)}`;
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 relative">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-[radial-gradient(circle,var(--electric-cyan)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>
              <Zap size={40} className="text-cyan-electric/20 group-hover:text-cyan-electric/50 transition-colors mb-2" />
              <span className="text-[10px] font-mono text-zinc-700 tracking-[0.5em] uppercase">No_Signal // Data_Link_Required</span>
            </div>
          )}
=======
const levelLabel: Record<EventRecord["level"], string> = {
  college: "College",
  school: "School",
};

export const EventCard = React.memo(function EventCard({ event }: { event: EventRecord }) {
  return (
    <article className="panel flex h-full flex-col gap-4 p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,0,122,0.35)] will-change-transform">
      <div className="flex items-center justify-between gap-3">
        <span className="border border-cyan-300 px-2 py-1 text-xs uppercase tracking-[0.12em] text-cyan-200">
          {event.category}
        </span>
        <span className="border border-yellow-300/80 px-2 py-1 text-xs uppercase tracking-[0.12em] text-yellow-200">
          {levelLabel[event.level]}
        </span>
      </div>
>>>>>>> e93dc8dd5caed80f5d6325fec51321e70c3c69d2

          {/* Category Tag */}
          <div className="absolute top-4 right-4 z-20 border border-cyan-electric/30 bg-black/60 backdrop-blur-md px-2 py-1 text-[8px] font-mono text-cyan-electric uppercase tracking-widest">
            {event.category}
          </div>

          {/* Level Badge */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-magenta-cyber animate-pulse"></div>
            <span className="text-[10px] font-mono text-magenta-cyber uppercase tracking-widest font-bold">
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
                <span className="text-white">₹{event.registrationFee}</span>
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
});
