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

            <form className="mt-8 md:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={handleFilter}>
              <div className="relative col-span-full lg:col-span-2">
                <input
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SEARCH_QUERY"
                  className="w-full border border-cyan-electric/30 bg-black px-4 py-3 text-white font-mono text-sm outline-none focus:border-cyan-electric focus:shadow-[0_0_15px_rgba(41,244,255,0.2)] transition-all"
                />
              </div>

              <div className="relative">
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-cyan-electric/30 bg-black px-4 py-3 text-white font-mono text-sm outline-none focus:border-cyan-electric appearance-none cursor-pointer"
                >
                  <option value="all">ALL_CATEGORIES</option>
                  {categories.map((item) => (
                    <option key={item.title} value={item.title} className="bg-black">
                      {item.title.toUpperCase()}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-3.5 pointer-events-none text-cyan-electric text-xs">▼</span>
              </div>

              <div className="relative">
                <select
                  name="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full border border-cyan-electric/30 bg-black px-4 py-3 text-white font-mono text-sm outline-none focus:border-cyan-electric appearance-none cursor-pointer"
                >
                  <option value="all">ALL_LEVELS</option>
                  <option value="college">COLLEGE</option>
                  <option value="school">SCHOOL</option>
                </select>
                <span className="absolute right-4 top-3.5 pointer-events-none text-cyan-electric text-xs">▼</span>
              </div>

              <button type="submit" className="cyber-button py-3 text-xs col-span-full lg:col-span-4 mt-2 h-14 tracking-[0.2em]">
                EXECUTE_GRID_QUERY
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
