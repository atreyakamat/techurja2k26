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
  agreedToRefundPolicy: boolean;
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
  agreedToRefundPolicy: false,
};

export function RegisterForm({ event, showTitle = true }: { event: EventRecord; showTitle?: boolean }) {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  const [screenshot, setScreenshot] = useState<File | null>(null);

  // Persistence logic
  const storageKey = `techurja_draft_${event.slug}`;

  // Load draft on mount
  useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Only merge if it's not the initial state (primitive check)
          setFormData(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
    }
  });

  // Save draft on change
  const updateForm = (updates: Partial<FormState>) => {
    const next = { ...formData, ...updates };
    setFormData(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

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
          reader.onload = (e) => {
            const img = new window.Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              let width = img.width;
              let height = img.height;
              const MAX_SIZE = 1024;
              
              if (width > height && width > MAX_SIZE) {
                height *= MAX_SIZE / width;
                width = MAX_SIZE;
              } else if (height > MAX_SIZE) {
                width *= MAX_SIZE / height;
                height = MAX_SIZE;
              }
              
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              ctx?.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL("image/jpeg", 0.7));
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(screenshot);
        });
      }

      const res = await fetch("/api/register/", {
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
      const data = (await res.json()) as { message?: string, details?: string };

      if (!res.ok) {
        setStatus({ ok: false, message: data.details ? `${data.message} [DETAILS: ${data.details}]` : (data.message ?? "Registration failed.") });
        return;
      }

      setStatus({ ok: true, message: data.message ?? "Registered successfully." });
      localStorage.removeItem(storageKey);
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
      {showTitle && <p className="text-sm uppercase tracking-[0.12em] text-cyan-200">Register For {event.name}</p>}

      {event.isClosed && (
        <div className="p-6 border border-red-500 bg-red-500/10 text-red-500 text-center animate-pulse">
          <p className="text-lg font-black uppercase tracking-tighter">Access Denied // Registration Closed</p>
          <p className="text-xs font-mono mt-2">This event node is no longer accepting new entries.</p>
        </div>
      )}

      {participantNums.map((num) => {
        const isLead = num === 1;
        const nameField = isLead ? "name" : `participant${num}` as keyof FormState;
        const emailField = isLead ? "email" : `email${num}` as keyof FormState;
        const phoneField = isLead ? "phone" : `phone${num}` as keyof FormState;
        
        // Use generic labels unless it is Robowar
        const participantLabel = config.isRobowar 
            ? `Node Operator ${num} ${isLead ? "(Lead)" : ""}`
            : `Participant ${num} ${isLead ? "(Lead)" : ""}`;

        return (
          <div key={num} className="space-y-4 p-4 border border-cyan-electric/10 bg-cyan-electric/5 animate-in fade-in slide-in-from-left-2 duration-300">
             <p className="text-[10px] text-magenta-cyber uppercase font-mono tracking-widest">
                {participantLabel}
             </p>
             <div className="grid md:grid-cols-3 gap-4">
                <label className="flex flex-col gap-2 text-xs text-zinc-300">
                    <div className="flex justify-between items-center">
                      <span>Full Name</span>
                      <span className={`text-[10px] font-mono ${(formData[nameField] as string).length >= 100 ? 'text-magenta-cyber animate-pulse' : 'text-zinc-500'}`}>
                        {(formData[nameField] as string).length}/100_CHARS
                      </span>
                    </div>
                    <input
                    required={num <= config.minParticipants}
                    maxLength={100}
                    value={formData[nameField] as string}
                    onChange={(e) => updateForm({ [nameField]: e.target.value })}
                    className={`border bg-black/70 px-3 py-2 outline-none transition-colors ${(formData[nameField] as string).length >= 100 ? 'border-magenta-cyber' : 'border-cyan-300/40 focus:border-yellow-300'}`}
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs text-zinc-300">
                    Email Address
                    <input
                    required={num <= config.minParticipants}
                    type="email"
                    value={formData[emailField] as string}
                    onChange={(e) => updateForm({ [emailField]: e.target.value })}
                    className="border border-cyan-300/40 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300 transition-colors"
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs text-zinc-300">
                    Phone Number (10 Digits)
                    <input
                    required={num <= config.minParticipants}
                    type="tel"
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit phone number"
                    value={formData[phoneField] as string}
                    onChange={(e) => updateForm({ [phoneField]: e.target.value })}
                    className="border border-cyan-300/40 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300 transition-colors"
                    />
                </label>
             </div>
          </div>
        );
      })}

      <div className="grid md:grid-cols-2 gap-6">
        {config.hasTeamName !== false && (
          <label className="flex flex-col gap-2 text-sm text-zinc-200">
            Team Handle
            <input
              required
              placeholder="unique team identifier"
              value={formData.teamName}
              onChange={(e) => updateForm({ teamName: e.target.value })}
              className="border border-cyan-300/80 bg-black/70 px-3 py-2 outline-none focus:border-yellow-300 transition-colors"
            />
          </label>
        )}

        <label className={`flex flex-col gap-2 text-sm text-zinc-200 ${config.hasTeamName === false ? 'md:col-span-2' : ''}`}>
          <div className="flex justify-between items-center">
            <span>Faction / Institution</span>
            <span className={`text-[10px] font-mono ${formData.institution.length >= 100 ? 'text-magenta-cyber animate-pulse' : 'text-zinc-500'}`}>
              {formData.institution.length}/100_CHARS
            </span>
          </div>
          <input
            required
            maxLength={100}
            placeholder="e.g. AITD, Goa"
            value={formData.institution}
            onChange={(e) => updateForm({ institution: e.target.value })}
            className={`border bg-black/70 px-3 py-2 outline-none transition-colors ${formData.institution.length >= 100 ? 'border-magenta-cyber' : 'border-cyan-300/80 focus:border-yellow-300'}`}
          />
        </label>
      </div>

      {config.isRobowar && (
        <div className="p-4 border border-yellow-500/30 bg-yellow-500/5 animate-in zoom-in-95 duration-500">
            <p className="text-xs text-yellow-500 uppercase font-mono tracking-widest mb-3">Accommodation Required?</p>
            <div className="flex gap-4">
                <button 
                    type="button"
                    onClick={() => updateForm({ needsAccommodation: true })}
                    className={`flex-1 py-2 border font-mono text-xs transition-all ${formData.needsAccommodation ? 'bg-yellow-500 text-black border-yellow-500' : 'border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10'}`}
                >
                    YES_PLEASE
                </button>
                <button 
                    type="button"
                    onClick={() => updateForm({ needsAccommodation: false })}
                    className={`flex-1 py-2 border font-mono text-xs transition-all ${!formData.needsAccommodation ? 'bg-zinc-700 text-white border-zinc-600' : 'border-zinc-700 text-zinc-500 hover:bg-zinc-700/20'}`}
                >
                    NO_NEED
                </button>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 italic">{"//"} Required for outstation teams only. Terms apply.</p>
        </div>
      )}

      {/* Payment Section - Only show if not Free */}
      {event.registrationFee !== "Free" && (
        <>
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
                    required
                    placeholder="ENTER_12_DIGIT_ID"
                    value={formData.transactionId}
                    onChange={(e) => updateForm({ transactionId: e.target.value })}
                    className="w-full border border-cyan-electric/30 bg-black/50 px-3 py-2 text-white font-mono text-xs outline-none focus:border-cyan-electric transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-cyan-electric uppercase font-mono tracking-widest">Payment Screenshot</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                    className="w-full text-[10px] text-zinc-400 file:mr-4 file:py-1 file:px-4 file:border-0 file:text-[10px] file:font-mono file:bg-cyan-electric/20 file:text-cyan-electric hover:file:bg-cyan-electric/30 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border border-magenta-cyber/30 bg-magenta-cyber/5">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={formData.agreedToRefundPolicy}
                onChange={(e) => updateForm({ agreedToRefundPolicy: e.target.checked })}
                className="mt-1 w-4 h-4 border-magenta-cyber/50 bg-black text-magenta-cyber focus:ring-magenta-cyber transition-all"
              />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 group-hover:text-magenta-cyber transition-colors">
                I understand and agree that <span className="text-magenta-cyber font-bold">once registered, the money will not be returned or refunded</span> if I decide to back out of the event.
              </span>
            </label>
          </div>
        </>
      )}

      <button 
        disabled={loading || event.isClosed} 
        className="cyber-button w-full px-4 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-widest font-black"
      >
        {loading ? "DATA_SYNC_IN_PROGRESS..." : event.isClosed ? "REGISTRATION_OFFLINE" : "INITIALIZE_REGISTRATION"}
      </button>

      {status && (
        <div className={`mt-4 p-3 border ${status.ok ? "border-green-500/50 bg-green-500/10 text-green-300" : "border-red-500/50 bg-red-500/10 text-red-300"} text-xs font-mono`}>
          {status.ok ? "> SUCCESS: " : "> ERROR: "} {status.message}
        </div>
      )}
    </form>
  );
}
