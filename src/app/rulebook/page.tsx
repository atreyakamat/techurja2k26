"use client";

import { Navbar } from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileText, AlertTriangle, Download, Search, ArrowUpRight } from "lucide-react";
import { categories, getFilteredEvents } from "@/lib/event-data";
import Image from "next/image";

function RulebookContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlSearch = searchParams.get("search") ?? "";
  const urlCategory = searchParams.get("category") ?? "all";
  const urlLevel = searchParams.get("level") ?? "all";

  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);
  const [level, setLevel] = useState(urlLevel);

  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  const [prevUrlCategory, setPrevUrlCategory] = useState(urlCategory);
  const [prevUrlLevel, setPrevUrlLevel] = useState(urlLevel);

  if (urlSearch !== prevUrlSearch || urlCategory !== prevUrlCategory || urlLevel !== prevUrlLevel) {
    setPrevUrlSearch(urlSearch);
    setPrevUrlCategory(urlCategory);
    setPrevUrlLevel(urlLevel);
    setSearch(urlSearch);
    setCategory(urlCategory);
    setLevel(urlLevel);
  }

  const filteredEvents = getFilteredEvents(search, category, level).filter(e => e.rulebookUrl);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (level !== "all") params.set("level", level);
    router.push(`/rulebook?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-16">
      {/* Search & Filter Header */}
      <div className="terminal-panel border-cyan-electric/20 p-6 bg-black/40">
        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
          <Search size={20} className="text-cyan-electric" />
          Filter Rulebook Matrix
        </h2>
        
        <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="SEARCH_EVENT_NODES..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:col-span-2 bg-black/50 border border-cyan-electric/30 p-3 text-white font-mono text-xs focus:border-cyan-electric outline-none"
          />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-black/50 border border-cyan-electric/30 p-3 text-white font-mono text-xs focus:border-cyan-electric outline-none"
          >
            <option value="all">ALL_CATEGORIES</option>
            {categories.map(c => <option key={c.title} value={c.title}>{c.title.toUpperCase()}</option>)}
          </select>
          <button type="submit" className="cyber-button text-[10px] py-3">SYNC_FILTERS</button>
        </form>

        <div className="flex gap-4 mt-4 overflow-x-auto pb-2 no-scrollbar">
          {["all", "college", "higher secondary"].map((l) => (
            <button
              key={l}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                if (l === "all") params.delete("level");
                else params.set("level", l);
                router.push(`/rulebook?${params.toString()}`, { scroll: false });
              }}
              className={`px-4 py-1.5 border text-[9px] font-mono uppercase tracking-widest transition-all shrink-0 ${
                level === l 
                ? "bg-magenta-cyber border-magenta-cyber text-white shadow-[0_0_10px_#FF2CDE]" 
                : "border-white/10 text-zinc-500 hover:border-magenta-cyber/50"
              }`}
            >
              {l === "all" ? "ALL_LEVELS" : l}
            </button>
          ))}
        </div>
      </div>

      {/* Rulebook Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.a
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={event.slug}
              href={event.rulebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-panel border-white/10 group hover:border-cyan-electric transition-all overflow-hidden flex flex-col h-full bg-zinc-950/50"
            >
              <div className="relative aspect-video overflow-hidden border-b border-white/5">
                {event.image ? (
                  <Image 
                    src={`${event.image}?v=2.6.2`} 
                    alt={event.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <FileText size={40} className="text-zinc-800" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${event.level === 'higher secondary' ? 'bg-yellow-nuclear' : 'bg-magenta-cyber'} animate-pulse`}></div>
                  <span className="text-[9px] font-mono uppercase text-white/70 tracking-widest">{event.category}</span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-black text-white group-hover:text-cyan-electric transition-colors uppercase tracking-tighter mb-2">
                  {event.name}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300">View Node Protocol</span>
                  <ArrowUpRight size={14} className="text-cyan-electric opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-20 border border-dashed border-white/10">
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">No rulebook nodes matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default function RulebookPage() {
  return (
    <div className="min-h-screen bg-black text-ink">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        {/* Header Section */}
        <header className="relative overflow-hidden terminal-panel border-cyan-electric/30 p-8 md:p-16 mb-12 bg-cyan-electric/5">
          <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="text-center md:text-left">
              <div className="inline-block border border-cyan-electric/50 bg-cyan-electric/10 px-3 py-1 text-[10px] tracking-[0.2em] text-cyan-electric uppercase mb-6">
                SYSTEM_DIRECTIVE // OPERATIONS_v2.6
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6">
                Arena <span className="text-cyan-electric text-glow-cyan">Protocols</span>
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

        {/* Main Master Rulebook Button */}
        <div className="mb-20">
          <a 
            href="https://drive.google.com/file/d/18w7REhdzLu3pvZyL3S1VbGHDHyA1Tu86/view?usp=drive_link" 
            target="_blank"
            className="w-full py-10 terminal-panel border-magenta-cyber/50 hover:border-magenta-cyber bg-magenta-cyber/5 hover:bg-magenta-cyber/10 transition-all flex flex-col items-center justify-center gap-4 group relative overflow-hidden shadow-[0_0_30px_rgba(255,44,222,0.1)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--cyber-magenta)_0%,transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <Download size={48} className="text-magenta-cyber group-hover:scale-110 transition-transform duration-500" />
            <div className="text-center space-y-2 relative z-10">
              <span className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Download Master Rulebook</span>
              <p className="text-magenta-cyber font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">Comprehensive directives for all arena sectors</p>
            </div>
          </a>
        </div>

        {/* Section Heading */}
        <div className="flex items-center gap-6 mb-12">
          <div className="h-[2px] w-12 bg-cyan-electric"></div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Check Out Other <span className="text-cyan-electric">Rulebooks</span></h2>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>

        <Suspense fallback={<div className="text-center p-20 text-cyan-electric font-mono animate-pulse">Initializing Rulebook Matrix...</div>}>
          <RulebookContent />
        </Suspense>

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
