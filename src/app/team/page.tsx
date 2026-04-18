"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { teamMembers, TeamMember } from "@/lib/team-data";
import { Check, Mail } from "lucide-react";
import Image from "next/image";

export default function TeamPage() {
  const faculty = teamMembers.filter(m => m.category === "Faculty");
  const studentCouncil = teamMembers.filter(m => m.category === "Student Council");
  const otherCouncils = teamMembers.filter(m => m.category === "Council" || m.category === "MBA" || m.category === "RoboClub");
  const designers = teamMembers.filter(m => m.category === "Designer");
  return (
    <main className="min-h-screen bg-deep-black">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 md:px-6 pt-24 md:pt-32 pb-24">
        {/* Header Section */}
        <header className="relative overflow-hidden terminal-panel border-magenta-cyber/30 p-6 md:p-12 mb-12 md:mb-16">
          <div className="absolute inset-0 scanline-mask opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-block border border-magenta-cyber/50 bg-magenta-cyber/10 px-3 py-1 text-[10px] tracking-[0.2em] text-magenta-cyber uppercase mb-4 md:mb-6 shadow-[0_0_10px_rgba(255,44,222,0.1)]">
                CORE_ARCHITECTURE // HUMAN_RESOURCES
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                The <span className="text-magenta-cyber drop-shadow-[0_0_10px_rgba(255,44,222,0.5)]">Architects</span>
              </h1>
              <p className="mt-6 md:mt-8 max-w-xl text-sm md:text-lg text-zinc-400 leading-relaxed border-l-2 border-cyan-electric pl-4 bg-black/20 py-2 uppercase font-mono tracking-tight">
                Meet the minds behind Techurja 2K26. From faculty mentors to student leads, 
                this collective is responsible for maintaining the digital arena.
              </p>
            </div>

            <div className="hidden md:block h-[300px] relative group overflow-hidden border border-magenta-cyber/20 bg-magenta-cyber/5 backdrop-blur-sm">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              >
                <source src="/architect-section.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-magenta-cyber/40 uppercase tracking-[0.3em] z-10">
                System_Status: SYNCHRONIZED
              </div>
            </div>
          </div>
        </header>

        {/* Student Council Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-magenta-cyber tracking-widest uppercase">Student Council</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-magenta-cyber/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentCouncil.map((member, i) => (
              <TeamCard key={member.number} member={member} index={i} />
            ))}
          </div>
        </section>

        {/* Department Councils Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-nuclear tracking-widest uppercase">Council Leads</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-yellow-nuclear/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCouncils.map((member, i) => (
              <TeamCard key={member.number} member={member} index={i} />
            ))}
          </div>
        </section>

        {/* Faculty Section */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-electric tracking-widest uppercase">Faculty Mentors</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-electric/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, i) => (
              <TeamCard key={member.number} member={member} index={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const TeamCard = React.memo(function TeamCard({ member, index }: { member: TeamMember, index: number }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(member.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="terminal-panel neon-border-magenta group hover:border-cyan-electric transition-all duration-500 overflow-hidden p-0 will-change-transform"
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Profile Image / Placeholder */}
        <div className="relative w-full aspect-square overflow-hidden border-b border-white/10 bg-zinc-900">
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
           {member.image ? (
             <Image 
               src={`${member.image}?v=2.6.2`} 
               alt={member.name}
               fill
               className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 scale-100"
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">
               <span className="text-5xl font-black uppercase">{member.name.charAt(0)}</span>
             </div>
           )}

          <div className="absolute bottom-6 left-6 right-6 z-20">
             <div className="text-[10px] font-mono text-cyan-electric uppercase tracking-[0.3em] mb-2 font-bold">
               {member.council || 'STAFF'}
             </div>
             <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter group-hover:text-magenta-cyber transition-colors drop-shadow-md">
               {member.name}
             </h3>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow relative">
          {member.specialMessage && (
            <motion.div 
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 5 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.5 
              }}
              className="absolute -top-12 right-4 z-30"
            >
              <div className="bg-yellow-nuclear text-black px-3 py-1 text-[10px] font-black uppercase tracking-tighter border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,44,222,0.8)] flex flex-col items-center">
                <span className="leading-none">SYSTEM_UPDATE</span>
                <span className="text-sm leading-none">{member.specialMessage}</span>
              </div>
              
              {/* Animated sparkles/dots */}
              <motion.div 
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-2 h-2 bg-magenta-cyber rounded-full"
              />
              <motion.div 
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                className="absolute -bottom-2 -left-2 w-2 h-2 bg-cyan-electric rounded-full"
              />
            </motion.div>
          )}

          <p className="text-yellow-nuclear text-xs md:text-sm font-mono uppercase tracking-[0.2em] mb-8 min-h-[3em] leading-relaxed drop-shadow-[0_0_8px_rgba(249,255,59,0.4)]">
            {member.role}
          </p>
          
          <button 
            onClick={copyEmail}
            className="mt-auto w-full py-4 border border-magenta-cyber/20 bg-magenta-cyber/5 hover:bg-magenta-cyber/10 hover:border-magenta-cyber/50 flex items-center justify-center gap-3 transition-all duration-300 group/btn relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div 
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-3 text-cyan-electric"
                >
                  <Check size={18} />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Copied</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="mail"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-3 text-magenta-cyber"
                >
                  <Mail size={18} className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Get Contact</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
      
      {/* Glitch Decorative Element */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity">
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 border-2 border-magenta-cyber rotate-45"></div>
      </div>
    </motion.div>
  );
});
