"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { events } from "@/lib/event-data";

export function EventsSection() {
  // Select top 4 gold events and 2 higher secondary events
  const goldEvents = events.filter(e => e.flair === "Gold").slice(0, 4);
  const hssEvents = events.filter(e => e.level === "higher secondary").slice(0, 2);
  const rosterEvents = [...goldEvents, ...hssEvents];

  return (
    <section id="events" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-12 border-b border-cyan-electric/30 pb-4">
        <p className="text-xs tracking-[0.2em] text-magenta-cyber uppercase mb-2 font-bold">COMBAT PROTOCOLS</p>
        <h2 className="text-4xl md:text-5xl text-white font-black tracking-tight">Events Roster</h2>
        <p className="text-ink mt-2">Choose your battlefield across robotics, coding, puzzles, and more.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rosterEvents.map((event, i) => {
          // Special link for Robowar to point to the category page
          const eventLink = event.slug === "robowar-15kg" ? "/events/robowars" : `/events/${event.slug}`;
          
          return (
            <Link key={event.slug} href={eventLink}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
                className="terminal-panel neon-border flex flex-col h-full justify-between group transition-colors hover:border-magenta-cyber hover:shadow-[0_0_15px_rgba(255,44,222,0.3)]"
              >
                <div>
                  <h3 className="text-xl text-yellow-nuclear font-bold uppercase glitch-hover" data-text={event.name}>
                    {event.name}
                  </h3>
                  <p className="text-sm text-ink mt-3">{event.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-[10px] uppercase border border-cyan-electric/50 px-2 py-1 text-cyan-electric bg-cyan-electric/10">
                      [{event.category}]
                    </span>
                    <span className="text-[10px] uppercase border border-magenta-cyber/50 px-2 py-1 text-magenta-cyber bg-magenta-cyber/10">
                      [{event.level}]
                    </span>
                    {event.flair && (
                      <span className="text-[10px] uppercase border border-yellow-nuclear/50 px-2 py-1 text-yellow-nuclear bg-yellow-nuclear/10 font-bold">
                        [{event.flair} STATUS]
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <div className="flex flex-col">
                    <span className="uppercase">Slots</span>
                    <span className="text-white">OPEN</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="uppercase text-cyan-electric font-bold">VIEW DETAILS &gt;</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link href="/events" className="cyber-button text-sm">ACCESS ALL EVENTS MATRIX</Link>
      </div>
    </section>
  );
}
