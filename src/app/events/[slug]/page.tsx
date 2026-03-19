import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getEventBySlug } from "@/lib/event-data";

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
    <div>
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 md:px-6">
        <section className="panel grid gap-6 p-6 md:grid-cols-[1.05fr,1fr] md:p-8">
          <div className="grid-lines relative min-h-64 border border-cyan-300/60 bg-black/40 p-4 md:min-h-80">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Event Poster Slot</p>
            <div className="absolute inset-x-5 bottom-5 border border-yellow-300/70 p-3 text-sm text-yellow-100">
              {event.category} • {event.level.toUpperCase()}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl leading-tight text-yellow-200 md:text-5xl">{event.name}</h1>
            <p className="text-zinc-200">{event.description}</p>

            <div className="grid gap-2 text-sm text-zinc-300">
              <p>
                <span className="text-cyan-200">Date & Time:</span>{" "}
                {new Date(event.date).toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })}
              </p>
              <p>
                <span className="text-cyan-200">Venue:</span> {event.venue}
              </p>
              <p>
                <span className="text-cyan-200">Eligibility:</span>{" "}
                {event.level === "college" ? "College participants" : "School participants"}
              </p>
            </div>

            <Link href={`/register/${event.slug}`} className="cyber-button mt-2 px-6 py-3 text-sm md:text-base">
              Register For This Event
            </Link>
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="text-3xl text-cyan-200">Rules & Guidelines</h2>
          <ul className="mt-4 space-y-3 text-zinc-200">
            {event.rules.map((rule) => (
              <li key={rule} className="border-l-2 border-cyan-300 pl-3">
                {rule}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
