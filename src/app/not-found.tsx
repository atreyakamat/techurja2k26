import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center px-4 py-12 md:px-6">
        <section className="panel w-full p-8 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-pink-300">404 // Signal Lost</p>
          <h1 className="mt-3 text-4xl text-yellow-200 md:text-5xl">Page Not Found</h1>
          <p className="mt-3 text-zinc-300">
            The requested route does not exist in this grid.
          </p>
          <Link href="/" className="cyber-button mt-6 inline-flex px-6 py-3 text-sm">
            Return Home
          </Link>
        </section>
      </main>
    </div>
  );
}
