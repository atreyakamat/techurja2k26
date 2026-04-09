import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getEventBySlug, events } from "@/lib/event-data";
import { BookOpen, FileText, Trophy, Phone, User, Zap, Medal, ShieldAlert, Lock } from "lucide-react";
import Image from "next/image";

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

type EventDetailsProps = {
  params: Promise<{ slug: string }>;
};

const flairColors = {
  Gold: "text-yellow-400 border-yellow-400/50 bg-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.2)]",
  Silver: "text-zinc-300 border-zinc-300/50 bg-zinc-300/10 shadow-[0_0_20px_rgba(212,212,216,0.2)]",
  Bronze: "text-orange-400 border-orange-400/50 bg-orange-400/10 shadow-[0_0_20px_rgba(251,146,60,0.2)]",
  Flagship: "text-red-500 border-red-500/50 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.3)]",
};

export default async function EventDetailsPage({ params }: EventDetailsProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-deep-black text-ink">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-24 pt-32 md:px-6">
        
        {/* Header Section */}
        <section className="terminal-panel neon-border grid gap-12 p-6 md:grid-cols-[1fr,1.2fr] md:p-16 relative overflow-hidden bg-black/40 backdrop-blur-xl">
          <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
          
          {/* Left: Visual */}
          <div className="relative aspect-[4/5] md:aspect-square border border-cyan-electric/30 bg-zinc-950 flex flex-col items-center justify-center group overflow-hidden shadow-[inset_0_0_30px_rgba(41,244,255,0.1)]">
            {event.image ? (
              <Image 
                src={`${event.image}?v=2.6.2`} 
                alt={event.name}
                fill
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-zinc-800 group-hover:text-cyan-electric/20 transition-colors text-center p-8">
                <Zap size={64} className="animate-pulse" />
                <div className="text-[10px] font-mono uppercase tracking-[0.5em]">
                  POSTER_ENCRYPTED // NO_SIGNAL
                </div>
              </div>
            )}

            {/* Flair Large */}
            {event.flair && (
              <div className={`absolute top-6 left-6 z-20 border px-4 py-2 flex items-center gap-3 backdrop-blur-md ${flairColors[event.flair]}`}>
                <Medal size={16} />
                <span className="text-xs font-mono font-black uppercase tracking-[0.3em]">
                  {event.flair} STATUS
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 border-t border-magenta-cyber/50 bg-black/90 p-6 backdrop-blur-md z-20">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em] text-magenta-cyber font-bold">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-magenta-cyber animate-pulse"></div> {event.category}</span>
                <span>LVL: {event.level}</span>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-block px-3 py-1 border border-cyan-electric/30 bg-cyan-electric/10 text-[10px] font-mono text-cyan-electric uppercase tracking-[0.3em] mb-6 shadow-[0_0_10px_rgba(41,244,255,0.1)]">
                Event_Node // {event.slug}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.85] uppercase tracking-tighter mb-6 drop-shadow-md">
                {event.name}
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed border-l-2 border-magenta-cyber pl-6 bg-white/5 py-4">
                {event.description}
              </p>
            </div>

            {/* Special Notice for Higher Secondary */}
            {event.level === 'higher secondary' && (
              <div className="p-4 border border-yellow-nuclear/30 bg-yellow-nuclear/5 flex items-center gap-4 text-yellow-nuclear shadow-[0_0_15px_rgba(249,255,59,0.1)]">
                <ShieldAlert className="shrink-0" />
                <p className="text-xs font-mono uppercase font-bold tracking-widest">
                  Restricted Access: Valid only for Higher Secondary Students. College participants are strictly prohibited.
                </p>
              </div>
            )}

            {/* Important Notice: Refund Policy */}
            <div className="p-4 border border-magenta-cyber/30 bg-magenta-cyber/5 flex items-center gap-4 text-magenta-cyber shadow-[0_0_15px_rgba(255,0,255,0.1)]">
              <ShieldAlert className="shrink-0" />
              <p className="text-xs font-mono uppercase font-bold tracking-widest">
                IMPORTANT: Once registered, the money will not be returned or refunded if you decide to back out.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/10 font-mono text-xs uppercase tracking-widest text-zinc-300">
              <div className="space-y-1">
                <span className="text-cyan-electric block mb-1 opacity-50 font-bold">[DATE]</span>
                <span className="text-white font-bold">{event.date}</span>
              </div>
              <div className="space-y-1">
                <span className="text-cyan-electric block mb-1 opacity-50 font-bold">[TIME]</span>
                <span className="text-white font-bold">{event.time}</span>
              </div>
              <div className="space-y-1">
                <span className="text-cyan-electric block mb-1 opacity-50 font-bold">[VENUE]</span>
                <span className="text-white font-bold">{event.venue}</span>
              </div>
              <div className="space-y-1">
                <span className="text-magenta-cyber block mb-1 opacity-50 font-bold">[PRIZE_POOL]</span>
                <span className="text-yellow-nuclear font-black text-2xl drop-shadow-[0_0_8px_rgba(249,255,59,0.3)]">{event.prizePool || "TBD"}</span>
              </div>
              <div className="space-y-1">
                <span className="text-magenta-cyber block mb-1 opacity-50 font-bold">[FEE]</span>
                <span className="text-white font-bold text-lg uppercase">
                  {typeof event.registrationFee === 'number' && event.registrationFee > 0 ? `₹${event.registrationFee}` : event.registrationFee}
                </span>
              </div>
            </div>

            {/* Registration Closed Notice */}
            {event.registrationClosed && (
              <div className="p-4 border border-red-500/50 bg-red-500/10 flex items-center gap-4 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <Lock className="shrink-0" size={20} />
                <p className="text-xs font-mono uppercase font-bold tracking-widest">
                  REGISTRATION CLOSED: This event is fully booked. No new registrations are being accepted.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
<<<<<<< HEAD
              {event.isClosed ? (
                <div className="px-10 py-5 text-center text-sm font-bold flex-1 border border-red-500/50 bg-red-500/10 text-red-500 uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                  REGISTRATION CLOSED
=======
              {event.registrationClosed ? (
                <div className="flex-1 flex items-center justify-center gap-3 px-10 py-5 border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-sm font-black uppercase tracking-widest cursor-not-allowed opacity-70">
                  <Lock size={16} />
                  REGISTRATION_FULL
>>>>>>> 63f2e156b6926cafc859619ed9495b7e6957bc5f
                </div>
              ) : (
                <Link href={`/register/${event.slug}`} className="cyber-button px-10 py-5 text-center text-sm font-bold flex-1 shadow-[0_0_20px_rgba(41,244,255,0.2)]">
                  INITIATE REGISTRATION
                </Link>
              )}
              
              {event.rulebookUrl && (
                <a 
                  href={event.rulebookUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cyber-button-alt px-10 py-5 text-center flex items-center justify-center gap-3 text-sm font-bold flex-1"
                >
                  <BookOpen size={20} />
                  RULEBOOK.PDF
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12">
          
          {/* Left Column: Rules & Prizes */}
          <div className="space-y-12">
            {/* Rules Section */}
            <section className="terminal-panel border-cyan-electric/20 p-10 bg-black/20 relative">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 border border-cyan-electric flex items-center justify-center text-cyan-electric bg-cyan-electric/5 shadow-[0_0_15px_rgba(41,244,255,0.1)]">
                  <FileText size={20} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                  Operational Guidelines
                </h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-electric/50 to-transparent"></div>
              </div>
              
              <ul className="space-y-6">
                {event.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-6 text-zinc-300 group">
                    <span className="text-cyan-electric font-mono font-bold mt-1 text-sm bg-cyan-electric/5 px-2 py-1 border border-cyan-electric/20 group-hover:border-cyan-electric/50 transition-colors shadow-[0_0_10px_rgba(41,244,255,0.05)]">
                      {String(i+1).padStart(2, '0')}
                    </span>
                    <p className="leading-relaxed text-lg group-hover:text-white transition-colors">{rule}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Prize Breakdown (If exists) */}
            {event.prizes && (
              <section className="terminal-panel border-yellow-nuclear/30 p-10 bg-yellow-nuclear/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 border border-yellow-nuclear flex items-center justify-center text-yellow-nuclear bg-yellow-nuclear/5 shadow-[0_0_15px_rgba(249,255,59,0.1)]">
                    <Trophy size={20} />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                    Reward Structure
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {event.prizes.first && (
                    <div className="p-8 border border-yellow-nuclear/20 bg-black/40 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 opacity-5 pointer-events-none -mr-4 -mt-4">
                        <Trophy size={64} className="text-yellow-nuclear" />
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Primary Node // 1st</p>
                      <p className="text-4xl font-black text-yellow-nuclear drop-shadow-[0_0_10px_rgba(249,255,59,0.2)]">{event.prizes.first}</p>
                    </div>
                  )}
                  {event.prizes.second && (
                    <div className="p-8 border border-white/10 bg-black/40 relative">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Secondary Node // 2nd</p>
                      <p className="text-4xl font-black text-zinc-300">{event.prizes.second}</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Coordinators & Status */}
          <div className="space-y-8">
            {/* Coordinators Section */}
            <section className="terminal-panel border-magenta-cyber/30 p-10 bg-magenta-cyber/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none -mr-8 -mt-8">
                <User size={128} className="text-magenta-cyber" />
              </div>
              
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-10 flex items-center gap-3">
                <span className="text-magenta-cyber">/</span> Node Administrators
              </h3>
              
              <div className="space-y-6">
                {event.coordinators.map((coord, i) => (
                  <div key={i} className="group p-6 border border-white/5 bg-black/40 hover:border-magenta-cyber/50 transition-all duration-300">
                    <h4 className="text-2xl font-bold text-white mb-6 uppercase tracking-tighter group-hover:text-magenta-cyber transition-colors">{coord.name}</h4>
                    <a 
                      href={`tel:${coord.phone}`} 
                      className="w-full flex items-center justify-center gap-3 py-3 border border-white/10 text-sm font-mono text-zinc-400 hover:text-cyan-electric hover:border-cyan-electric/30 transition-all bg-white/5"
                    >
                      <Phone size={14} className="text-cyan-electric" />
                      {coord.phone}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Registration Box */}
            <div className="terminal-panel border-cyan-electric/30 p-10 bg-black/60 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none"></div>
              <h3 className="text-xl font-black text-cyan-electric uppercase tracking-widest mb-8 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-electric animate-pulse shadow-[0_0_10px_#29F4FF]"></div>
                System Status
              </h3>
              <div className="space-y-5 font-mono text-xs uppercase tracking-[0.2em]">
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-zinc-500">Terminal</span>
                  <span className="text-white font-bold">AITD_ONLINE</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-zinc-500">Security</span>
                  <span className="text-green-500 font-bold">ENCRYPTED</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-zinc-500">Queue_Load</span>
                  {event.registrationClosed ? (
                    <span className="text-red-500 font-bold">CAPACITY_FULL</span>
                  ) : (
                    <span className="text-yellow-nuclear font-bold">MODERATE</span>
                  )}
                </div>
                {event.registrationClosed && (
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-zinc-500">Reg_Status</span>
                    <span className="text-red-500 font-bold">CLOSED</span>
                  </div>
                )}
              </div>
              {event.registrationClosed ? (
                <div className="mt-10 flex items-center justify-center gap-3 w-full py-5 border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-xs font-black tracking-[0.2em] cursor-not-allowed opacity-70">
                  <Lock size={14} />
                  REGISTRATION_CLOSED
                </div>
              ) : (
                <Link href={`/register/${event.slug}`} className="mt-10 cyber-button w-full py-5 text-xs font-black tracking-[0.2em] shadow-[0_0_20px_rgba(41,244,255,0.1)]">
                  ENTER_REGISTRATION_QUEUE
                </Link>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
