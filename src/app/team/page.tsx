"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { teamMembers } from "@/lib/team-data";
import { SplineScene } from "@/components/SplineScene";

export default function TeamPage() {
  const faculty = teamMembers.filter(m => m.category === "Faculty");
  const students = teamMembers.filter(m => m.category === "Student Coordinator");

  return (
    <main className="min-h-screen bg-deep-black">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        {/* Header Section */}
        <header className="relative overflow-hidden terminal-panel border-magenta-cyber/30 p-8 md:p-12 mb-16">
          <div className="absolute inset-0 scanline-mask opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block border border-magenta-cyber/50 bg-magenta-cyber/10 px-3 py-1 text-[10px] tracking-[0.2em] text-magenta-cyber uppercase mb-6 shadow-[0_0_10px_rgba(255,44,222,0.1)]">
                CORE_ARCHITECTURE // HUMAN_RESOURCES
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                The <span className="text-magenta-cyber drop-shadow-[0_0_10px_rgba(255,44,222,0.5)]">Architects</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-zinc-400 leading-relaxed border-l-2 border-cyan-electric pl-4 bg-black/20 py-2">
                Meet the minds behind Techurja 2K26. From faculty mentors to student leads, 
                this collective is responsible for maintaining the digital arena.
              </p>
            </div>

            <div className="hidden md:block h-[300px] relative group">
              <div className="absolute inset-0 bg-magenta-cyber/5 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
            </div>
          </div>
        </header>

        {/* Faculty Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-electric tracking-widest uppercase">Faculty Mentors</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-electric/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </section>

        {/* Students Section */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-nuclear tracking-widest uppercase">Student Coordinators</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-yellow-nuclear/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const TeamCard = React.memo(function TeamCard({ member, index }: { member: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="terminal-panel neon-border-magenta group hover:border-cyan-electric transition-colors duration-500 will-change-transform"
    >
      <div className="relative z-10">
        <div className="mb-4 flex justify-between items-start">
          <div className="w-12 h-12 border border-magenta-cyber/30 bg-magenta-cyber/5 flex items-center justify-center font-mono text-magenta-cyber text-xs">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
            Status: Active
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-electric transition-colors uppercase tracking-tight">
          {member.name}
        </h3>
        <p className="text-magenta-cyber text-xs font-mono uppercase tracking-widest mb-4">
          {member.role}
        </p>
        
        {member.department && (
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-magenta-cyber/50"></span>
            {member.department}
          </div>
        )}
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10px] right-[-10px] w-10 h-10 border border-magenta-cyber rotate-45"></div>
      </div>
    </motion.div>
  );
}
