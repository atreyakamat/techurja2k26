import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { RegisterForm } from "@/components/register-form";
import { getEventBySlug, events } from "@/lib/event-data";
import { Lock } from "lucide-react";

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

type RegisterPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-16 pt-8 md:px-6">
        <section className="panel p-6 border-magenta-cyber/30 bg-magenta-cyber/5">
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Registration Terminal</p>
          <h1 className="mt-2 text-4xl text-yellow-200 md:text-5xl">{event.name}</h1>
          <p className="mt-2 text-zinc-300">
            Complete this form to lock your spot. Invalid or incomplete entries are rejected automatically.
          </p>
          <div className="mt-4 p-3 border border-magenta-cyber/30 bg-black/40 text-magenta-cyber text-[10px] font-mono uppercase tracking-widest font-bold">
            IMPORTANT: Once registered, the money will not be returned or refunded if you decide to back out.
          </div>
        </section>

        {event.isClosed ? (
          <div className="panel p-8 border-red-500/40 bg-red-500/10 flex flex-col items-center gap-6 text-center">
            <Lock size={48} className="text-red-400" />
            <div>
              <h2 className="text-2xl font-black text-red-400 uppercase tracking-widest mb-3">REGISTRATION CLOSED</h2>
              <p className="text-zinc-300 font-mono text-sm uppercase tracking-widest">
                This event is fully booked. No new registrations are being accepted.
              </p>
            </div>
          </div>
        ) : (
          <RegisterForm event={event} />
        )}

        <Link href={`/events/${event.slug}`} className="inline-flex w-fit border border-cyan-300 px-4 py-2 text-xs uppercase tracking-[0.12em] text-cyan-200">
          Back To Event Details
        </Link>
      </main>
    </div>
  );
}
