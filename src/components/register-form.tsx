"use client";

import { FormEvent, useState } from "react";
import type { EventRecord } from "@/lib/event-data";

import Image from "next/image";

type FormState = {
  name: string;
  participant2: string;
  teamName: string;
  email: string;
  phone: string;
  institution: string;
  transactionId: string;
};

const initialState: FormState = {
  name: "",
  participant2: "",
  teamName: "",
  email: "",
  phone: "",
  institution: "",
  transactionId: "",
};

export function RegisterForm({ event }: { event: EventRecord }) {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  const [screenshot, setScreenshot] = useState<File | null>(null);

  // Events requiring 2 participants: Coding, Soccer. CTF is 1 or 2.
  const isTeamOfTwo = event.slug === "escape-the-matrix" || event.slug === "cyber-strike";
  const isCTF = event.slug === "ghostgrid";
  const showSecondParticipant = isTeamOfTwo || isCTF;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      let base64Image = "";
      if (screenshot) {
        base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(screenshot);
        });
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          eventSlug: event.slug,
          eventName: event.name,
          paymentScreenshot: base64Image || "NO_SCREENSHOT",
          screenshotName: screenshot?.name || "unknown.jpg"
        }),
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
        Participant 1 Name
        <input
          required
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
        />
      </label>

      {showSecondParticipant && (
        <label className="flex flex-col gap-2 text-sm text-zinc-200 animate-in fade-in slide-in-from-left-2 duration-300">
          Participant 2 Name {isTeamOfTwo && "(Required)"} {isCTF && "(Optional)"}
          <input
            required={isTeamOfTwo}
            value={formData.participant2}
            onChange={(e) => setFormData((prev) => ({ ...prev, participant2: e.target.value }))}
            className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
          />
        </label>
      )}

      <label className="flex flex-col gap-2 text-sm text-zinc-200">
        Team Name (If applicable)
        <input
          value={formData.teamName}
          onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
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
        College / School / Organisation
        <input
          required
          placeholder="college/school/organisation"
          value={formData.institution}
          onChange={(e) => setFormData((prev) => ({ ...prev, institution: e.target.value }))}
          className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300"
        />
      </label>

      {/* Payment Section */}
      <div className="mt-8 border border-cyan-electric/30 bg-black/40 p-5 relative">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-electric"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-electric"></div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-40 h-40 bg-white p-1 rounded flex-shrink-0">
            <Image 
              src="/payment-techurja.jpeg" 
              alt="Payment QR" 
              width={160} 
              height={160} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-grow space-y-4">
            <div>
              <p className="text-xs text-magenta-cyber font-mono uppercase tracking-widest mb-1">Fee Required</p>
              <p className="text-3xl text-white font-black font-display tracking-tight">₹{event.registrationFee}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] text-cyan-electric uppercase font-mono tracking-widest">Transaction ID / UTR</label>
              <input
                required
                placeholder="ENTER_12_DIGIT_ID"
                value={formData.transactionId}
                onChange={(e) => setFormData((prev) => ({ ...prev, transactionId: e.target.value }))}
                className="w-full border border-cyan-electric/30 bg-black/50 px-3 py-2 text-white font-mono text-xs outline-none focus:border-cyan-electric transition-all"
              />
              <p className="text-[9px] text-zinc-500 font-mono italic">{"//"} Upload screenshot in the next prompt (demo simulated)</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-cyan-electric uppercase font-mono tracking-widest">Payment Screenshot</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                className="w-full text-[10px] text-zinc-400 file:mr-4 file:py-1 file:px-4 file:border-0 file:text-[10px] file:font-mono file:bg-cyan-electric/20 file:text-cyan-electric hover:file:bg-cyan-electric/30"
              />
            </div>
          </div>
        </div>
      </div>

      <button disabled={loading} className="cyber-button w-full px-4 py-3 text-sm disabled:opacity-60">
        {loading ? "Sending..." : "Submit Registration"}
      </button>

      {status && (
        <p className={`text-sm ${status.ok ? "text-green-300" : "text-red-300"}`}>{status.message}</p>
      )}
    </form>
  );
}
