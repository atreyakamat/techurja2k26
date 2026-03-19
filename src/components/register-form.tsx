"use client";

import { FormEvent, useState } from "react";
import type { EventRecord } from "@/lib/event-data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  institution: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  institution: "",
};

export function RegisterForm({ event }: { event: EventRecord }) {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, eventSlug: event.slug }),
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        setStatus({ ok: false, message: data.message ?? "Registration failed." });
        return;
      }

      setStatus({ ok: true, message: data.message ?? "Registered successfully." });
      setFormData(initialState);
    } catch {
      setStatus({ ok: false, message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel w-full space-y-4 p-6" onSubmit={onSubmit}>
      <p className="text-sm uppercase tracking-[0.12em] text-cyan-200">Register For {event.name}</p>

      <label className="flex flex-col gap-2 text-sm text-zinc-200">
        Name
        <input
          required
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-zinc-200">
        Email
        <input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-zinc-200">
        Phone
        <input
          required
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-zinc-200">
        College / School
        <input
          required
          value={formData.institution}
          onChange={(e) => setFormData((prev) => ({ ...prev, institution: e.target.value }))}
          className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
        />
      </label>

      <button disabled={loading} className="cyber-button w-full px-4 py-3 text-sm disabled:opacity-60">
        {loading ? "Sending..." : "Submit Registration"}
      </button>

      {status && (
        <p className={`text-sm ${status.ok ? "text-green-300" : "text-red-300"}`}>{status.message}</p>
      )}
    </form>
  );
}
