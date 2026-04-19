"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, MapPin, Clock, Tag } from "lucide-react";

interface EventSchedule {
  department: string;
  event: string;
  time: string;
  venue: string;
  day: "Day 1" | "Day 2" | "Both";
}

const scheduleData: EventSchedule[] = [
  // Both Days
  { department: "STUDENT COUNCIL", event: "ROBOWAR (15KG)", time: "11AM ONWARDS", venue: "ROBOWAR ARENA", day: "Both" },
  { department: "STUDENT COUNCIL", event: "ROBOWAR (8KGS)", time: "11AM ONWARDS", venue: "ROBOWAR ARENA", day: "Both" },
  { department: "STUDENT COUNCIL", event: "ROBOWAR (3LBS)", time: "11AM ONWARDS", venue: "ROBOWAR ARENA", day: "Both" },
  { department: "MECH", event: "ROBO TUG OF WAR", time: "11AM ONWARDS", venue: "GYMKHANA", day: "Both" },
  { department: "ECE", event: "VIRTUAL CRICKET", time: "10AM - 5PM", venue: "LIBRARY", day: "Both" },
  { department: "IIC", event: "HACKATHON", time: "2PM-2PM (24HRS)", venue: "MULTIPURPOSE HALL", day: "Both" },
  
  // Day 1 - 29 April
  { department: "MECH", event: "BRIDGE CONSTRUCTION", time: "11AM ONWARDS", venue: "DHM1", day: "Day 1" },
  { department: "COMP", event: "ROBO SOCCER", time: "11AM ONWARDS", venue: "AITD FOYER", day: "Day 1" },
  { department: "COMP", event: "CODING EVENT", time: "11AM ONWARDS", venue: "LBC5, LBC6", day: "Day 1" },
  { department: "ECE", event: "LINE FOLLOWER ROBOT", time: "11AM ONWARDS", venue: "LHE 2, 3", day: "Day 1" },
  { department: "ECE", event: "TREASURE HUNT", time: "10AM - 5PM", venue: "ECE TUTORIAL HALL", day: "Day 1" },
  { department: "MBA", event: "BUSINESS PITCH", time: "11AM ONWARDS", venue: "FY MBA", day: "Day 1" },
  { department: "ROBOCLUB", event: "ROBO MAZE SOLVER", time: "11AM ONWARDS", venue: "LHC3, LHC2", day: "Day 1" },
  { department: "BSH", event: "SYMMETRY ART", time: "10AM ONWARDS", venue: "PHYSICS LAB", day: "Day 1" },
  { department: "BSH", event: "STRUCTOMAT", time: "10AM ONWARDS", venue: "DHM2", day: "Day 1" },

  // Day 2 - 30 April
  { department: "MECH", event: "ROBO SUMO", time: "10AM ONWARDS", venue: "AITD FOYER", day: "Day 2" },
  { department: "MECH", event: "FIFA", time: "10AM ONWARDS", venue: "SY MBA", day: "Day 2" },
  { department: "COMP", event: "CLASH ROYAL", time: "10AM ONWARDS", venue: "LHC4", day: "Day 2" },
  { department: "COMP", event: "CAPTURE THE FLAG", time: "10AM ONWARDS", venue: "LBC4", day: "Day 2" },
  { department: "ECE", event: "PROJECT PRESENTATION", time: "10AM - 5PM", venue: "SEMINAR HALL", day: "Day 2" },
  { department: "ECE", event: "CIRCUIT SIMULATION", time: "10AM - 5PM", venue: "LBE 2,3,4,5,6", day: "Day 2" },
  { department: "ROBOCLUB", event: "ROBO RACE", time: "10AM ONWARDS", venue: "BASKETBALL COURT", day: "Day 2" },
];

export function TimelineSection() {
  const [activeDay, setActiveDay] = useState<"Day 1" | "Day 2">("Day 1");

  const filteredEvents = scheduleData.filter(
    (event) => event.day === activeDay || event.day === "Both"
  );

  return (
    <section id="schedule" className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,var(--nuclear-yellow)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10">
        <div className="mb-10 md:mb-16 text-center flex flex-col items-center">
          <div className="inline-block border border-yellow-nuclear/50 bg-yellow-nuclear/10 px-4 py-1 text-[8px] md:text-[10px] tracking-[0.4em] text-yellow-nuclear uppercase mb-4 md:mb-6 shadow-[0_0_15px_rgba(249,255,59,0.2)]">
            SYSTEM_STATUS // GRID_SYNCHRONIZED
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl text-white font-black tracking-tighter uppercase leading-none">
            GRID FLOW <span className="text-yellow-nuclear drop-shadow-[0_0_15px_rgba(249,255,59,0.5)]">OPERATIONS</span>
          </h2>
          <p className="text-xs md:text-sm text-ink mt-6 md:mt-8 max-w-2xl font-mono tracking-wide border-l-2 border-yellow-nuclear pl-4 md:pl-6 py-2 bg-yellow-nuclear/5">
            {"//"} OPERATIONAL TIMELINE DECRYPTED. <br/>
            {"//"} ACCESSING EVENT PROTOCOLS FOR APRIL 29-30.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setActiveDay("Day 1")}
            className={`px-6 py-2 font-bold uppercase tracking-tighter transition-all duration-300 ${
              activeDay === "Day 1" 
                ? "bg-yellow-nuclear text-black shadow-[0_0_20px_rgba(249,255,59,0.4)]" 
                : "border border-yellow-nuclear/40 text-yellow-nuclear/60 hover:border-yellow-nuclear hover:text-yellow-nuclear"
            }`}
          >
            Day 01 - 29 April
          </button>
          <button 
            onClick={() => setActiveDay("Day 2")}
            className={`px-6 py-2 font-bold uppercase tracking-tighter transition-all duration-300 ${
              activeDay === "Day 2" 
                ? "bg-yellow-nuclear text-black shadow-[0_0_20px_rgba(249,255,59,0.4)]" 
                : "border border-yellow-nuclear/40 text-yellow-nuclear/60 hover:border-yellow-nuclear hover:text-yellow-nuclear"
            }`}
          >
            Day 02 - 30 April
          </button>
        </div>

        <motion.div 
          key={activeDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="terminal-panel neon-border-yellow bg-black/80 backdrop-blur-xl overflow-hidden relative group max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-yellow-nuclear/30 bg-yellow-nuclear/5">
                  <th className="p-4 text-yellow-nuclear font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} /> Time
                  </th>
                  <th className="p-4 text-yellow-nuclear font-mono text-xs uppercase tracking-widest">
                    <div className="flex items-center gap-2"><Tag size={14} /> Event</div>
                  </th>
                  <th className="p-4 text-yellow-nuclear font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Venue
                  </th>
                </tr>
              </thead>
              <tbody className="text-white/80 font-mono text-xs md:text-sm">
                {filteredEvents.map((item, index) => (
                  <tr key={index} className="border-b border-yellow-nuclear/10 hover:bg-yellow-nuclear/5 transition-colors group/row">
                    <td className="p-4 font-bold text-yellow-nuclear whitespace-nowrap">
                      {item.time}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-zinc-500 font-bold tracking-tighter uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-yellow-nuclear rounded-full animate-pulse"></span>
                          {item.department}
                        </span>
                        <span className="uppercase text-white font-black tracking-tight group-hover/row:text-yellow-nuclear transition-colors">
                          {item.event}
                        </span>
                        {item.day === "Both" && (
                          <span className="text-[8px] bg-yellow-nuclear/10 text-yellow-nuclear border border-yellow-nuclear/20 w-fit px-1">
                            MULTI-DAY
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 opacity-70 italic group-hover/row:opacity-100 transition-opacity">
                      {item.venue || "TBA"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Decorative Corner Glitch Elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-nuclear opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-nuclear opacity-40"></div>
        </motion.div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest">
            <Calendar size={12} className="text-yellow-nuclear" />
            [ SYSTEM STATUS: DATA_FLOW_STABLE ]
          </div>
        </div>
      </div>
    </section>
  );
}
