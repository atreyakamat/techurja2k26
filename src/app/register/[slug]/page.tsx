import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { RegisterForm } from "@/components/register-form";
import { getEventBySlug } from "@/lib/event-data";

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
        <section className="panel p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Registration Terminal</p>
          <h1 className="mt-2 text-4xl text-yellow-200 md:text-5xl">{event.name}</h1>
          <p className="mt-2 text-zinc-300">
            Complete this form to lock your spot. Invalid or incomplete entries are rejected automatically.
          </p>
        </section>

        <RegisterForm event={event} />

        <Link href={`/events/${event.slug}`} className="inline-flex w-fit border border-cyan-300 px-4 py-2 text-xs uppercase tracking-[0.12em] text-cyan-200">
          Back To Event Details
        </Link>
      </main>
    </div>
  );
}
