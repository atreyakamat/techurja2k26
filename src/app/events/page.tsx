"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/navbar";
import { getFilteredEvents } from "@/lib/event-data";
import { Zap } from "lucide-react";

function EventsContent() {
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

  const events = getFilteredEvents(search, category, level);
  const hssEvents = events.filter(e => e.level === "higher secondary");
  const regularEvents = events.filter(e => e.level !== "higher secondary");

  function handleFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (level !== "all") params.set("level", level);

    router.push(`/events?${params.toString()}`);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:gap-12 px-6 pb-24 pt-20 md:pt-24">
      <header className="relative overflow-hidden terminal-panel border-cyan-electric/30 p-6 md:p-12">
        <div className="absolute inset-0 scanline-mask opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="inline-block border border-cyan-electric/50 bg-cyan-electric/10 px-3 py-1 text-[9px] md:text-[10px] tracking-[0.2em] text-cyan-electric uppercase mb-4 md:mb-6 shadow-[0_0_10px_rgba(41,244,255,0.1)]">
              PROTOCOL // EVENT_DATABASE_v2.6
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter">
              All <span className="text-cyan-electric drop-shadow-[0_0_10px_rgba(41,244,255,0.5)]">Events</span>
            </h1>
            <p className="mt-6 md:mt-8 max-w-xl text-sm md:text-lg text-zinc-400 leading-relaxed border-l-2 border-magenta-cyber pl-4 bg-black/20 py-2">
              Filter by category and level, then drill down into event details before registration. 
              Each node in our grid represents a unique challenge for the digital arena.
            </p>

            <form className="mt-8 md:mt-10 flex flex-col gap-4" onSubmit={handleFilter}>
              <div className="relative w-full">
                <input
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SEARCH_ALL_EVENTS_MATRIX..."
                  className="w-full border border-cyan-electric/30 bg-black/50 px-6 py-4 text-white font-mono text-sm md:text-base outline-none focus:border-cyan-electric focus:shadow-[0_0_20px_rgba(41,244,255,0.2)] transition-all placeholder:text-cyan-electric/30"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-electric/50 font-mono text-[10px] hidden md:block">
                  [PRESS_ENTER_TO_SYNC_URL]
                </div>
              </div>

              <button type="submit" className="cyber-button py-4 text-xs tracking-[0.3em] font-black group overflow-hidden relative">
                <span className="relative z-10 group-hover:text-black transition-colors">SEARCH</span>
                <div className="absolute inset-0 bg-cyan-electric translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>
          </div>

          <div className="hidden md:block h-[400px] relative group overflow-hidden border border-cyan-electric/20 bg-cyan-electric/5 backdrop-blur-sm">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
            >
              <source src="/event-section.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
            
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-cyan-electric/40 uppercase tracking-[0.3em] z-10">
              Node_Status: ACTIVE
            </div>
          </div>
        </div>
      </header>

      {events.length === 0 ? (
        <section className="panel p-6">
          <p className="text-zinc-300">No events matched your filters. Reset and try again.</p>
          <Link href="/events" className="mt-4 inline-flex border border-cyan-300 px-3 py-2 text-xs uppercase tracking-[0.12em] text-cyan-200">
            Reset Filters
          </Link>
        </section>
      ) : (
        <div className="space-y-16">
          {/* Regular Events Section */}
          {regularEvents.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-[0.3em]">
                  <span className="text-cyan-electric">/</span> Main Arena
                </h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-electric/30 to-transparent"></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {regularEvents.map((event, index) => (
                  <EventCard key={event.slug} event={event} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Higher Secondary Section - Separate Card/Section */}
          {hssEvents.length > 0 && level === "all" && category === "all" && !search && (
            <section className="terminal-panel border-yellow-nuclear/30 p-8 md:p-12 bg-yellow-nuclear/5 relative overflow-hidden group">
              <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/3">
                  <div className="inline-block border border-yellow-nuclear/50 bg-yellow-nuclear/10 px-3 py-1 text-[10px] tracking-[0.2em] text-yellow-nuclear uppercase mb-6 shadow-[0_0_10px_rgba(249,255,59,0.1)]">
                    EXCLUSIVE_ACCESS // HSS_DIVISION
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6">
                    Higher <span className="text-yellow-nuclear drop-shadow-[0_0_10px_rgba(249,255,59,0.5)]">Secondary</span>
                  </h2>
                  <p className="text-zinc-400 font-mono text-sm border-l-2 border-yellow-nuclear pl-4 py-2 mb-8">
                    Dedicated arena protocols for the next generation of engineers and artists. 
                    Valid only for HSS students.
                  </p>
                  <div className="flex items-center gap-2 text-yellow-nuclear/60 text-[10px] font-mono uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-yellow-nuclear animate-pulse"></div>
                    {hssEvents.length} Active Node{hssEvents.length !== 1 ? 's' : ''} Identified
                  </div>
                </div>

                <div className="lg:w-2/3 w-full grid md:grid-cols-2 gap-6">
                  {hssEvents.map((event, index) => (
                    <EventCard key={event.slug} event={event} index={index} />
                  ))}
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none flex items-center justify-center -mr-8 -mt-8 rotate-12">
                <Zap size={128} className="text-yellow-nuclear" />
              </div>
            </section>
          )}

          {/* Show HSS events in grid if filters are active */}
          {(level !== "all" || category !== "all" || search) && hssEvents.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-[0.3em]">
                  <span className="text-yellow-nuclear">/</span> HSS Division
                </h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-yellow-nuclear/30 to-transparent"></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {hssEvents.map((event, index) => (
                  <EventCard key={event.slug} event={event} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

export default function EventsPage() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div className="p-10 text-center text-cyan-200">Loading Matrix...</div>}>
        <EventsContent />
      </Suspense>
    </div>
  );
}
