import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getEventBySlug, events } from "@/lib/event-data";
<<<<<<< HEAD
import { BookOpen, FileText } from "lucide-react";
=======
>>>>>>> e93dc8dd5caed80f5d6325fec51321e70c3c69d2

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

type EventDetailsProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailsPage({ params }: EventDetailsProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-deep-black">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-32 md:px-6">
        <section className="terminal-panel neon-border grid gap-8 p-6 md:grid-cols-[1.2fr,1fr] md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
          
          {/* Event Visual */}
          <div className="relative min-h-64 border border-cyan-electric/30 bg-black/60 flex flex-col items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-electric/5 to-transparent z-10"></div>
            {event.image ? (
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/050505/29F4FF?text=${encodeURIComponent(event.name)}`;
                }}
              />
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-mono text-cyan-electric/50 uppercase tracking-[0.5em] animate-pulse">
                  SIGNAL_LOST // LOAD_POSTER
                </div>
              </div>
            )}
            <div className="absolute bottom-6 left-6 right-6 border border-magenta-cyber/50 bg-black/80 p-4 backdrop-blur-md z-20">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-magenta-cyber">
                <span>CAT: {event.category}</span>
                <span>LVL: {event.level}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter">
              {event.name}
            </h1>
            
            <p className="text-zinc-400 text-lg leading-relaxed border-l-2 border-magenta-cyber pl-4">
              {event.description}
            </p>

            <div className="grid gap-4 py-6 border-y border-white/5 font-mono text-xs uppercase tracking-widest text-zinc-300">
              <div className="flex items-center gap-3">
                <span className="text-cyan-electric">[DATE]</span>
                <span>{new Date(event.date).toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-electric">[VENUE]</span>
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-electric">[FEE]</span>
                <span className="text-yellow-nuclear font-bold text-lg">₹{event.registrationFee}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/register/${event.slug}`} className="cyber-button px-8 py-4 text-center">
                INITIATE REGISTRATION
              </Link>
              
              {event.rulebookUrl && (
                <a 
                  href={event.rulebookUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cyber-button-alt px-8 py-4 text-center flex items-center justify-center gap-2"
                >
                  <BookOpen size={18} />
                  RULEBOOK.PDF
                </a>
              )}
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-[1.5fr,1fr] gap-8">
          {/* Rules Section */}
          <section className="terminal-panel border-cyan-electric/20 p-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-cyan-electric uppercase tracking-widest">
                Core Guidelines
              </h2>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-electric/50 to-transparent"></div>
            </div>
            
            <ul className="space-y-4">
              {event.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-4 text-zinc-300">
                  <span className="text-magenta-cyber font-mono font-bold mt-1 text-sm">{String(i+1).padStart(2, '0')}</span>
                  <p className="leading-relaxed">{rule}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Quick Support / Rulebook Notice */}
          <section className="flex flex-col gap-6">
            <div className="terminal-panel border-yellow-nuclear/30 p-8 bg-yellow-nuclear/5">
              <div className="flex items-center gap-3 mb-4 text-yellow-nuclear">
                <FileText size={24} />
                <h3 className="text-lg font-bold uppercase tracking-widest">System Notice</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-6 font-mono leading-relaxed">
                Participants must adhere to the official rulebook. Violations of protocol will result in immediate disqualification from the arena.
              </p>
              
              {event.rulebookUrl ? (
                <a 
                  href={event.rulebookUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-yellow-nuclear hover:text-white transition-colors text-xs font-mono uppercase underline underline-offset-8 decoration-yellow-nuclear/30"
                >
                  View Full Decrypted Rulebook
                </a>
              ) : (
                <p className="text-[10px] text-zinc-600 font-mono uppercase italic">
                  // Rulebook decryption in progress...
                </p>
              )}
            </div>

            <div className="terminal-panel border-magenta-cyber/30 p-8">
              <h3 className="text-lg font-bold text-magenta-cyber uppercase tracking-widest mb-4">Support</h3>
              <p className="text-sm text-zinc-400 font-mono">
                Facing issues? Contact the node administrator via the Team page.
              </p>
              <Link href="/team" className="mt-4 inline-block text-[10px] text-zinc-500 hover:text-magenta-cyber transition-colors uppercase tracking-widest">
                &gt; ACCESS_SUPPORT_TEAM
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
