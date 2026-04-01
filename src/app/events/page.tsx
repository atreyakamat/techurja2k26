"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/navbar";
import { categories, getFilteredEvents } from "@/lib/event-data";

import { SplineScene } from "@/components/SplineScene";

function EventsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [level, setLevel] = useState(searchParams.get("level") ?? "all");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setCategory(searchParams.get("category") ?? "all");
    setLevel(searchParams.get("level") ?? "all");
  }, [searchParams]);

  const events = getFilteredEvents(search, category, level);

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

          <div className="hidden md:block h-[400px] relative group">
            <div className="absolute inset-0 bg-cyan-electric/5 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
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
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard key={event.slug} event={event} index={index} />
          ))}
        </section>
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
