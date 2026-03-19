import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/navbar";
import { categories, getFilteredEvents } from "@/lib/event-data";

type EventsPageProps = {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    level?: string;
  }>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const search = params?.search ?? "";
  const category = params?.category ?? "all";
  const level = params?.level ?? "all";

  const events = getFilteredEvents(search, category, level);

  return (
    <div>
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 md:px-6">
        <header className="panel p-5 md:p-7">
          <h1 className="text-4xl text-yellow-200 md:text-6xl">All Events</h1>
          <p className="mt-3 max-w-3xl text-zinc-300">
            Filter by category and level, then drill down into event details before registration.
          </p>

          <form className="mt-6 grid gap-3 md:grid-cols-4">
            <input
              name="search"
              defaultValue={search}
              placeholder="Search events"
              className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
            />

            <select
              name="category"
              defaultValue={category}
              className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>

            <select
              name="level"
              defaultValue={level}
              className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
            >
              <option value="all">All levels</option>
              <option value="college">College</option>
              <option value="school">School</option>
            </select>

            <button className="cyber-button px-4 py-2 text-sm">Apply Filters</button>
          </form>
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
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
