import { Navbar } from "@/components/navbar";
import { events } from "@/lib/event-data";
import { EventCard } from "@/components/event-card";
import { Bot } from "lucide-react";

export default function RobowarsPage() {
  const robowarEvents = events.filter(e => e.slug.startsWith("robowar-"));

  return (
    <div className="min-h-screen bg-deep-black text-ink">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-24 pt-32">
        <header className="relative overflow-hidden terminal-panel border-yellow-nuclear/30 p-8 md:p-12 bg-yellow-nuclear/5">
          <div className="absolute inset-0 scanline-mask opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div>
              <div className="inline-block border border-yellow-nuclear/50 bg-yellow-nuclear/10 px-3 py-1 text-[10px] tracking-[0.2em] text-yellow-nuclear uppercase mb-6 shadow-[0_0_10px_rgba(249,255,59,0.1)]">
                PROTOCOL // COMBAT_DIVISION_ALPHA
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                Robo<span className="text-yellow-nuclear drop-shadow-[0_0_10px_rgba(249,255,59,0.5)]">wars</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-zinc-400 leading-relaxed border-l-2 border-yellow-nuclear pl-4 bg-black/20 py-2 font-mono">
                The ultimate mechanical showdown. Three weight classes, one arena. 
                Experience high-octane destruction and engineering excellence.
              </p>
            </div>
            <div className="hidden md:block">
              <Bot size={120} className="text-yellow-nuclear opacity-20 animate-pulse" />
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {robowarEvents.map((event, index) => (
            <EventCard key={event.slug} event={event} index={index} />
          ))}
        </section>
      </main>
    </div>
  );
}
