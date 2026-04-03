"use client";

import { FormEvent, useState } from "react";
import type { EventRecord } from "@/lib/event-data";

import Image from "next/image";

type FormState = {
  name: string;
  email: string;
  phone: string;
  participant2: string;
  email2: string;
  phone2: string;
  participant3: string;
  email3: string;
  phone3: string;
  participant4: string;
  email4: string;
  phone4: string;
  teamName: string;
  institution: string;
  transactionId: string;
  needsAccommodation: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  participant2: "",
  email2: "",
  phone2: "",
  participant3: "",
  email3: "",
  phone3: "",
  participant4: "",
  email4: "",
  phone4: "",
  teamName: "",
  institution: "",
  transactionId: "",
  needsAccommodation: false,
};

export function RegisterForm({ event }: { event: EventRecord }) {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  const [screenshot, setScreenshot] = useState<File | null>(null);

  const config = event.formConfig || { minParticipants: 1, maxParticipants: 1, hasTeamName: true };
  
  const participantNums = [];
  for (let i = 1; i <= config.maxParticipants; i++) {
    participantNums.push(i);
  }

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
      setScreenshot(null);
    } catch {
      setStatus({ ok: false, message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel w-full space-y-6 p-6" onSubmit={onSubmit}>
      <p className="text-sm uppercase tracking-[0.12em] text-cyan-200">Register For {event.name}</p>

      {participantNums.map((num) => {
        const isLead = num === 1;
        const nameField = isLead ? "name" : `participant${num}` as keyof FormState;
        const emailField = isLead ? "email" : `email${num}` as keyof FormState;
        const phoneField = isLead ? "phone" : `phone${num}` as keyof FormState;
        const isRequired = num <= config.minParticipants;
        
        return (
          <div key={num} className="space-y-4 p-4 border border-cyan-electric/10 bg-cyan-electric/5 animate-in fade-in slide-in-from-left-2 duration-300">
             <p className="text-[10px] text-magenta-cyber uppercase font-mono tracking-widest">
                Participant {num} {isLead && "(Lead Operator)"} {isRequired ? "[Required]" : "[Optional]"}
             </p>
             <div className="grid md:grid-cols-3 gap-4">
                <label className="flex flex-col gap-2 text-xs text-zinc-300">
                    Full Name
                    <input
                    required={isRequired}
                    value={formData[nameField] as string}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [nameField]: e.target.value }))}
                    className="border border-cyan-300/40 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300 transition-colors"
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs text-zinc-300">
                    Email Link
                    <input
                    required={isRequired}
                    type="email"
                    value={formData[emailField] as string}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [emailField]: e.target.value }))}
                    className="border border-cyan-300/40 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300 transition-colors"
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs text-zinc-300">
                    Phone Link (WhatsApp)
                    <input
                    required={isRequired}
                    value={formData[phoneField] as string}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [phoneField]: e.target.value }))}
                    className="border border-cyan-300/40 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300 transition-colors"
                    />
                </label>
             </div>
          </div>
        );
      })}

      <div className="grid md:grid-cols-2 gap-6">
        <label className="flex flex-col gap-2 text-sm text-zinc-200">
          Team Handle (Required)
          <input
            required
            placeholder="unique team identifier"
            value={formData.teamName}
            onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
            className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300 transition-colors"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-zinc-200">
          Faction / Institution
          <input
            required
            placeholder="e.g. AITD, Goa"
            value={formData.institution}
            onChange={(e) => setFormData((prev) => ({ ...prev, institution: e.target.value }))}
            className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300 transition-colors"
          />
        </label>
      </div>

      {config.isRobowar && (
        <div className="p-4 border border-yellow-500/30 bg-yellow-500/5 animate-in zoom-in-95 duration-500">
            <p className="text-xs text-yellow-500 uppercase font-mono tracking-widest mb-3">Accommodation Required?</p>
            <div className="flex gap-4">
                <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, needsAccommodation: true }))}
                    className={`flex-1 py-2 border font-mono text-xs transition-all ${formData.needsAccommodation ? 'bg-yellow-500 text-black border-yellow-500' : 'border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10'}`}
                >
                    YES_PLEASE
                </button>
                <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, needsAccommodation: false }))}
                    className={`flex-1 py-2 border font-mono text-xs transition-all ${!formData.needsAccommodation ? 'bg-zinc-700 text-white border-zinc-600' : 'border-zinc-700 text-zinc-500 hover:bg-zinc-700/20'}`}
                >
                    NO_NEED
                </button>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 italic">{"//"} Required for outstation teams only. Terms apply.</p>
        </div>
      )}

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
          <div className="flex-grow space-y-4 w-full">
            <div>
              <p className="text-xs text-magenta-cyber font-mono uppercase tracking-widest mb-1">Fee Required</p>
              <p className="text-3xl text-white font-black font-display tracking-tight">
                {typeof event.registrationFee === 'number' ? `₹${event.registrationFee}` : event.registrationFee}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] text-cyan-electric uppercase font-mono tracking-widest">Transaction ID / UTR</label>
              <input
                required={event.registrationFee !== "Free"}
                placeholder="ENTER_12_DIGIT_ID"
                value={formData.transactionId}
                onChange={(e) => setFormData((prev) => ({ ...prev, transactionId: e.target.value }))}
                className="w-full border border-cyan-electric/30 bg-black/50 px-3 py-2 text-white font-mono text-xs outline-none focus:border-cyan-electric transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-cyan-electric uppercase font-mono tracking-widest">Payment Screenshot</label>
              <input
                type="file"
                accept="image/*"
                required={event.registrationFee !== "Free"}
                onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                className="w-full text-[10px] text-zinc-400 file:mr-4 file:py-1 file:px-4 file:border-0 file:text-[10px] file:font-mono file:bg-cyan-electric/20 file:text-cyan-electric hover:file:bg-cyan-electric/30 transition-all cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <button disabled={loading} className="cyber-button w-full px-4 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-widest font-black">
        {loading ? "DATA_SYNC_IN_PROGRESS..." : "INITIALIZE_REGISTRATION"}
      </button>

      {status && (
        <div className={`mt-4 p-3 border ${status.ok ? "border-green-500/50 bg-green-500/10 text-green-300" : "border-red-500/50 bg-red-500/10 text-red-300"} text-xs font-mono`}>
          {status.ok ? "> SUCCESS: " : "> ERROR: "} {status.message}
        </div>
      )}
    </form>
  );
}
