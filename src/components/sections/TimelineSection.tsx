"use client";

import { motion } from "framer-motion";

export function TimelineSection() {
  const schedule = [
    { day: "DAY 01 // MAR 26", phase: "INTAKE & INITIATION", highlights: ["Registration Terminal Opens", "Opening Ceremony", "Code Siege Begins"] },
    { day: "DAY 02 // MAR 27", phase: "COMBAT PROTOCOLS", highlights: ["Robo Wars Arena Live", "CTF Hackathon Day 2", "Logic Puzzles Prelims"] },
    { day: "DAY 03 // MAR 28", phase: "FINALE & DECRYPTION", highlights: ["Championship Matches", "Prize Distribution", "System Shutdown"] },
  ];

  return (
    <section id="schedule" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-12 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl text-white font-black tracking-tight border-b-2 border-yellow-nuclear pb-2 inline-block">GRID FLOW OPERATIONS</h2>
        <p className="text-ink mt-4 max-w-2xl">Official operational schedule for TECHURJA 2K26. Ensure your units are synced to this timeline.</p>
      </div>

      <div className="relative mt-16">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-cyan-electric/20 hidden md:block -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-cyan-electric shadow-[0_0_10px_#29F4FF] hidden md:block -translate-y-1/2 scale-x-0 origin-left animate-[scaleX_3s_ease-out_forwards]" style={{ animationTimeline: 'view()' }}></div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-8 justify-between relative z-10">
          {schedule.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2 }}
              className="flex-1 terminal-panel border-t-4 border-t-cyan-electric"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-black border-2 border-cyan-electric rounded-full hidden md:block shadow-[0_0_10px_#29F4FF]"></div>
              
              <div className="text-center mb-6">
                <p className="text-magenta-cyber font-mono text-xs tracking-widest">{item.day}</p>
                <h3 className="text-xl text-yellow-nuclear font-bold mt-2 uppercase">{item.phase}</h3>
              </div>

              <ul className="space-y-3">
                {item.highlights.map((hl, j) => (
                  <li key={j} className="text-sm text-ink flex items-start gap-2">
                    <span className="text-cyan-electric mt-1">]</span> {hl}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
