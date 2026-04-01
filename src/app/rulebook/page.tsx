"use client";

import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { FileText, ShieldAlert, AlertTriangle, Download, Info, CheckCircle2, ChevronRight } from "lucide-react";

export default function RulebookPage() {
  const sections = [
    {
      title: "GENERAL CONDUCT",
      icon: ShieldAlert,
      color: "text-cyan-electric",
      rules: [
        "Participants must carry a valid institutional ID (College/School).",
        "Maintain professional decorum at all times within the AITD arena.",
        "Any form of tampering with arena equipment or other teams' equipment will lead to immediate disqualification.",
        "The decisions of the event coordinators and judges are final and binding."
      ]
    },
    {
      title: "REGISTRATION PROTOCOLS",
      icon: Info,
      color: "text-magenta-cyber",
      rules: [
        "Universal registration requires a valid transaction ID (UTR) and payment screenshot.",
        "A team can consist of members from different institutions unless specified otherwise in event-specific rules.",
        "Refunds will not be processed once registration is confirmed in the grid."
      ]
    },
    {
      title: "ROBOWARS SAFETY",
      icon: AlertTriangle,
      color: "text-yellow-nuclear",
      rules: [
        "Bots must pass a mandatory 'Tech Check' before entering the combat zone.",
        "Remote systems must operate on non-interfering frequencies (2.4GHz preferred).",
        "Liquid, fire, and projectile weapons are strictly prohibited for safety protocols."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-ink">
      <Navbar />
      
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Header Section */}
        <header className="relative overflow-hidden terminal-panel border-cyan-electric/30 p-8 md:p-16 mb-12 bg-cyan-electric/5">
          <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="text-center md:text-left">
              <div className="inline-block border border-cyan-electric/50 bg-cyan-electric/10 px-3 py-1 text-[10px] tracking-[0.2em] text-cyan-electric uppercase mb-6">
                SYSTEM_DIRECTIVE // OPERATIONS_v2.6
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6">
                The <span className="text-cyan-electric">Rulebook</span>
              </h1>
              <p className="max-w-xl text-lg text-zinc-400 font-mono border-l-2 border-magenta-cyber pl-6 py-2">
                Operational guidelines for the Techurja 2K26 Digital Arena. 
                Failure to comply with these protocols may result in node disconnection.
              </p>
            </div>
            <div className="hidden md:block">
              <FileText size={120} className="text-cyan-electric opacity-20 animate-pulse" />
            </div>
          </div>
        </header>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 p-6 border-y border-white/5 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Protocol Status: ACTIVE</span>
          </div>
          <a 
            href="/rulebook.pdf" 
            target="_blank"
            className="cyber-button text-xs flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            DOWNLOAD MASTER_PDF <Download size={16} />
          </a>
        </div>

        {/* Rules Grid */}
        <div className="space-y-16">
          {sections.map((section, idx) => (
            <section key={idx} className="relative">
              <div className="flex items-center gap-4 mb-8">
                <section.icon size={24} className={section.color} />
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">{section.title}</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>

              <div className="grid gap-4">
                {section.rules.map((rule, i) => (
                  <div 
                    key={i} 
                    className="group flex items-start gap-4 p-5 border border-white/5 bg-zinc-950/50 hover:border-white/20 transition-all"
                  >
                    <ChevronRight size={18} className="text-magenta-cyber mt-0.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                    <p className="text-zinc-300 font-mono text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Disclaimer */}
        <footer className="mt-24 p-8 border border-yellow-nuclear/20 bg-yellow-nuclear/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-nuclear/20"></div>
          <div className="flex items-center justify-center gap-3 text-yellow-nuclear mb-4">
            <AlertTriangle size={20} />
            <span className="font-bold uppercase tracking-widest text-sm">Legal Disclaimer</span>
          </div>
          <p className="text-[10px] md:text-xs text-zinc-500 font-mono max-w-2xl mx-auto leading-relaxed">
            The organizers reserve the right to modify rules at any time during the event cycle. 
            Participants are responsible for staying updated with the latest system transmissions via our official social channels.
          </p>
        </footer>
      </main>
    </div>
  );
}
