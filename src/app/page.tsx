import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/navbar";
import { categories, events, getFeaturedEvents } from "@/lib/event-data";

export default function Home() {
  const featured = getFeaturedEvents();
  const spotlightEvents = events.slice(0, 6);
  const sponsorLogos = ["NEXA LABS", "CYBERGRID", "ROBOMECH", "BYTEFORGE", "EDU-CORE", "SYNAPSE"];

  return (
    <div className="relative overflow-x-clip">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-16 pt-6 md:px-6 md:pt-10">
        <section className="scanline grid-lines panel relative isolate overflow-hidden p-6 md:min-h-[76vh] md:p-10">
          <div className="absolute -left-24 top-0 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute right-0 top-20 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="hero-character hero-character-left" aria-hidden />
          <div className="hero-character hero-character-right" aria-hidden />

          <div className="relative z-10 max-w-3xl pt-2 md:pt-8">
            <p className="mb-3 inline-block border border-cyan-300 px-3 py-1 text-xs tracking-[0.18em] text-cyan-200">
              ENTER THE SYSTEM
            </p>
            <h1 className="max-w-4xl text-4xl leading-[1.05] text-yellow-200 glow-text md:text-7xl">
              TECHURJA 2K26
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-zinc-200 md:text-xl">
              A high-voltage technical battleground where you choose your domain, execute your mission, and dominate the grid.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/events" className="cyber-button px-6 py-3 text-sm md:text-base">
                Explore Events
              </Link>
              <Link href="/events?level=college" className="cyber-button px-6 py-3 text-sm md:text-base">
                Register Now
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl text-cyan-200 md:text-4xl">Choose Your Domain</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((item) => (
              <article
                key={item.title}
                className="panel group relative overflow-hidden p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(0,240,255,0.3)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(0,240,255,0.06)_40%,transparent_100%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                <p className="text-xs tracking-[0.16em] text-yellow-200">{item.tone}</p>
                <h3 className="mt-2 text-2xl text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-zinc-300">{item.description}</p>
                <Link
                  href={`/events?category=${encodeURIComponent(item.title)}`}
                  className="mt-5 inline-flex border border-cyan-300 px-3 py-2 text-xs uppercase tracking-[0.12em] text-cyan-200 transition hover:bg-cyan-500/15"
                >
                  View Category
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl text-cyan-200 md:text-4xl">Featured Missions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((event, index) => (
              <article key={event.slug} className={`panel relative overflow-hidden p-6 ${index === 0 ? "md:col-span-2" : ""}`}>
                <div className="absolute right-0 top-0 h-full w-40 bg-[linear-gradient(100deg,transparent,rgba(255,0,122,0.17))]" />
                <p className="text-xs tracking-[0.16em] text-cyan-200">{event.category}</p>
                <h3 className="mt-2 text-3xl text-yellow-200">{event.name}</h3>
                <p className="mt-2 max-w-2xl text-zinc-300">{event.shortDescription}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
                  <span className="border border-cyan-300/70 px-2 py-1">{new Date(event.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                  <span className="border border-yellow-300/70 px-2 py-1">{event.venue}</span>
                </div>
                <div className="mt-6 flex gap-3">
                  <Link href={`/events/${event.slug}`} className="cyber-button px-4 py-2 text-xs">
                    View
                  </Link>
                  <Link href={`/register/${event.slug}`} className="cyber-button px-4 py-2 text-xs">
                    Register
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl text-cyan-200 md:text-4xl">All Events Grid</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {spotlightEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
          <Link href="/events" className="cyber-button w-fit px-6 py-3 text-sm">
            Open Full Events Directory
          </Link>
        </section>

        <section className="panel p-6 md:p-8">
          <p className="text-xs tracking-[0.16em] text-pink-300">How It Works</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="border border-cyan-300/65 bg-black/40 p-4">
              <h3 className="text-xl text-yellow-200">1. Choose Event</h3>
              <p className="mt-2 text-zinc-300">Filter by domain and level, then inspect rules and schedule.</p>
            </article>
            <article className="border border-cyan-300/65 bg-black/40 p-4">
              <h3 className="text-xl text-yellow-200">2. Register Fast</h3>
              <p className="mt-2 text-zinc-300">Submit participant details through the secure registration terminal.</p>
            </article>
            <article className="border border-cyan-300/65 bg-black/40 p-4">
              <h3 className="text-xl text-yellow-200">3. Enter Arena</h3>
              <p className="mt-2 text-zinc-300">Report on schedule and execute your mission at TECHURJA 2K26.</p>
            </article>
          </div>
        </section>

        <section className="neon-border bg-yellow-300/90 p-6 text-black md:p-9">
          <p className="text-xs tracking-[0.16em]">REGISTRATION WINDOW OPEN</p>
          <h2 className="mt-2 text-3xl md:text-5xl">Secure your slot before system lock.</h2>
          <p className="mt-3 max-w-2xl text-base md:text-lg">Final intake is live for robotics, coding, puzzle, and school-level tracks.</p>
          <Link
            href="/events"
            className="mt-6 inline-flex border-2 border-black bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-yellow-200 transition hover:-translate-y-1"
          >
            Register Now
          </Link>
        </section>

        <section className="panel relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.14),transparent_70%)]" />
          <p className="text-xs tracking-[0.16em] text-cyan-200">Interactive Zone</p>
          <h2 className="mt-2 text-3xl text-yellow-200 md:text-4xl">Character Feed Reacts To Scroll</h2>
          <p className="mt-3 max-w-2xl text-zinc-300">
            As you move deeper, the cyber operatives charge up with animated neon pulses and tactical overlays. Mission layers unlock as you scroll.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="character-stage">
              <div className="hero-character hero-character-mini" aria-hidden />
              <p className="character-stage-tag">Operator // A1</p>
            </div>
            <div className="character-stage">
              <div className="hero-character hero-character-mini hero-character-alt" aria-hidden />
              <p className="character-stage-tag">Operator // B7</p>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl text-cyan-200 md:text-4xl">Sponsors & Partners</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {sponsorLogos.map((name) => (
              <article key={name} className="panel px-4 py-5 text-center text-sm tracking-[0.15em] text-zinc-100 transition hover:border-cyan-300 hover:text-cyan-200">
                {name}
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-cyan-300/35 pt-8 text-sm text-zinc-300">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-lg text-yellow-200">Techurja 2K26</h3>
              <p className="mt-2">Entering a game-like event universe for builders, thinkers, and challengers.</p>
            </div>
            <div>
              <h3 className="text-lg text-yellow-200">Quick Links</h3>
              <div className="mt-2 flex flex-col gap-1">
                <Link href="/events" className="hover:text-cyan-200">Events</Link>
                <Link href="/events?level=college" className="hover:text-cyan-200">College Tracks</Link>
                <Link href="/events?level=school" className="hover:text-cyan-200">School Tracks</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg text-yellow-200">Connect</h3>
              <p className="mt-2">Instagram / LinkedIn / GitHub</p>
              <p className="mt-1 text-zinc-400">Built for an immersive cyberpunk event experience.</p>
            </div>
          </div>
        </section>

        <section className="panel flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs tracking-[0.18em] text-pink-300">SYSTEM ALERT</p>
            <h2 className="mt-2 text-3xl text-yellow-200">Registration closes when slots fill.</h2>
          </div>
          <Link href="/events" className="cyber-button px-6 py-3 text-sm md:text-base">
            View All {events.length} Events
          </Link>
        </section>
      </main>
    </div>
  );
}
