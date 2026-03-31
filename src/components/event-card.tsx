import Link from "next/link";
import type { EventRecord } from "@/lib/event-data";

const levelLabel: Record<EventRecord["level"], string> = {
  college: "College",
  school: "School",
};

export function EventCard({ event }: { event: EventRecord }) {
  return (
    <article className="panel flex h-full flex-col gap-4 p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,0,122,0.35)] will-change-transform">
      <div className="flex items-center justify-between gap-3">
        <span className="border border-cyan-300 px-2 py-1 text-xs uppercase tracking-[0.12em] text-cyan-200">
          {event.category}
        </span>
        <span className="border border-yellow-300/80 px-2 py-1 text-xs uppercase tracking-[0.12em] text-yellow-200">
          {levelLabel[event.level]}
        </span>
      </div>

      <h3 className="text-2xl leading-tight text-zinc-100">{event.name}</h3>
      <p className="flex-1 text-base text-zinc-300">{event.shortDescription}</p>

      <div className="mt-3 flex items-center justify-between text-sm text-zinc-300">
        <span>{new Date(event.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
        <span>{event.venue}</span>
      </div>

      <Link
        href={`/events/${event.slug}`}
        className="cyber-button mt-2 px-4 py-2 text-sm"
      >
        View Details
      </Link>
    </article>
  );
}
