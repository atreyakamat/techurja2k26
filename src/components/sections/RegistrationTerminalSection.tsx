"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { events } from "@/lib/event-data";

export function RegistrationTerminalSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    participant2: "", email2: "", phone2: "",
    participant3: "", email3: "", phone3: "",
    participant4: "", email4: "", phone4: "",
    teamName: "",
    institution: "",
    transactionId: "",
    needsAccommodation: false
  });

  const [screenshot, setScreenshot] = useState<File | null>(null);

  // Calculate max participants needed for the selected events
  const selectedEventDetails = selectedEvents.map(slug => events.find(e => e.slug === slug)).filter(Boolean);
  const maxNeeded = selectedEventDetails.reduce((max, ev) => Math.max(max, ev?.formConfig?.maxParticipants || 1), 1);
  const isAnyRobowar = selectedEventDetails.some(ev => ev?.formConfig?.isRobowar);

  const startTransmission = async (isSuccess: boolean, finalMessage: string) => {
    const logs = [
      "> INITIATING_SECURE_HANDSHAKE...",
      "> ENCRYPTING_DATA_PACKETS...",
      "> UPLOADING_TO_GRID_NODE...",
      "> VERIFYING_TRANSACTION_HASH..."
    ];

    setTransmissionLogs([]);
    for (const log of logs) {
      setTransmissionLogs(prev => [...prev, log]);
      await new Promise(r => setTimeout(r, 600));
    }

    if (isSuccess) {
      setTransmissionLogs(prev => [...prev, "> TRANSMISSION_COMPLETE", "> ACCESS_GRANTED"]);
      setStatus({ ok: true, message: finalMessage });
      setTimeout(() => setSubmitted(true), 1000);
    } else {
      setTransmissionLogs(prev => [...prev, "> TRANSMISSION_FAILED", "> NODE_REJECTED"]);
      setStatus({ ok: false, message: finalMessage });
    }
  };

  const totalFee = selectedEvents.reduce((acc, slug) => {
    const event = events.find(e => e.slug === slug);
    const fee = typeof event?.registrationFee === "number" ? event.registrationFee : 0;
    return acc + fee;
  }, 0);

  const handleEventToggle = (slug: string) => {
    setSelectedEvents(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvents.length === 0) {
      alert("Please select at least one target node.");
      return;
    }
    
    setLoading(true);
    setStatus(null);
    setTransmissionLogs(["> STANDBY: PREPARING_TRANSMISSION..."]);

    try {
      let base64Image = "";
      if (screenshot) {
        base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(screenshot);
        });
      }

      const promises = selectedEvents.map(slug => {
        const event = events.find(e => e.slug === slug);
        return fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            eventSlug: slug,
            eventName: event?.name,
            paymentScreenshot: base64Image || "NO_SCREENSHOT",
            screenshotName: screenshot?.name || "terminal_upload.jpg"
          })
        });
      });

      const results = await Promise.all(promises);
      const allOk = results.every(r => r.ok);
      
      await startTransmission(allOk, allOk ? "REGISTERED_SUCCESSFULLY" : "TRANSMISSION_PARTIAL_FAILURE");
    } catch (error) {
      console.error(error);
      await startTransmission(false, "CONNECTION_ERROR: NODE_UNREACHABLE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="terminal-panel neon-border p-0 overflow-hidden will-change-transform"
      >
        <div className="bg-cyan-electric/20 border-b border-cyan-electric p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e] animate-pulse"></span>
            <span className="font-mono text-xs text-cyan-electric tracking-widest">UNIVERSAL REGISTRATION {"//"} MULTI-NODE ACCESS</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">v2.7.5</span>
        </div>

        <div className="p-6 md:p-10 relative">
          <div className="absolute inset-0 scanline-mask opacity-50 pointer-events-none"></div>
          
          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <h3 className="text-3xl text-green-400 font-bold mb-4">REGISTRATION COMPLETE</h3>
                <p className="text-yellow-nuclear font-mono mb-2">{"//"} ALL SELECTED SLOTS LOCKED</p>
                <button 
                    onClick={() => {
                        setSubmitted(false);
                        setSelectedEvents([]);
                        setFormData({
                            name: "", email: "", phone: "",
                            participant2: "", email2: "", phone2: "",
                            participant3: "", email3: "", phone3: "",
                            participant4: "", email4: "", phone4: "",
                            teamName: "", institution: "", transactionId: "",
                            needsAccommodation: false
                        });
                    }}
                    className="mt-10 border border-cyan-electric/40 px-6 py-2 text-cyan-electric font-mono text-xs hover:bg-cyan-electric/10 transition-all"
                >
                    &gt; INITIALIZE_NEW_TRANSMISSION
                </button>
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                
                {/* Dynamic Participant Clusters */}
                {[...Array(maxNeeded)].map((_, i) => {
                    const num = i + 1;
                    const isLead = num === 1;
                    const nKey = isLead ? "name" : `participant${num}`;
                    const eKey = isLead ? "email" : `email${num}`;
                    const pKey = isLead ? "phone" : `phone${num}`;

                    const label = isAnyRobowar 
                        ? `Node Operator ${num} ${isLead ? "(Lead)" : ""}`
                        : `Participant ${num} ${isLead ? "(Team Lead)" : ""}`;

                    return (
                        <div key={num} className="space-y-4 p-4 border border-cyan-electric/20 bg-black/40 relative group animate-in fade-in slide-in-from-top-2">
                            <div className="absolute -top-2 left-4 bg-black px-2 text-[10px] text-magenta-cyber font-mono tracking-widest uppercase">
                                {label}
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-zinc-500 uppercase font-mono tracking-tighter">Full Handle</label>
                                    <input required={isLead}
                                        type="text" 
                                        className="w-full bg-black/50 border border-cyan-electric/30 px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-electric"
                                        value={(formData as Record<string, string | boolean>)[nKey] as string}
                                        onChange={e => setFormData({...formData, [nKey]: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-zinc-500 uppercase font-mono tracking-tighter">Comm Link (Email)</label>
                                    <input required={isLead}
                                        type="email" 
                                        className="w-full bg-black/50 border border-cyan-electric/30 px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-electric"
                                        value={(formData as Record<string, string | boolean>)[eKey] as string}
                                        onChange={e => setFormData({...formData, [eKey]: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-zinc-500 uppercase font-mono tracking-tighter">Signal (Phone)</label>
                                    <input required={isLead}
                                        type="tel" 
                                        className="w-full bg-black/50 border border-cyan-electric/30 px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-electric"
                                        value={(formData as Record<string, string | boolean>)[pKey] as string}
                                        onChange={e => setFormData({...formData, [pKey]: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Faction / Organization</label>
                    <input required 
                        type="text" 
                        placeholder="declare your faction" 
                        className="w-full bg-black/50 border border-cyan-electric/30 px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric transition-all" 
                        value={formData.institution}
                        onChange={e => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Team Handle (Required)</label>
                    <input required
                      type="text" 
                      placeholder="team identifier" 
                      className="w-full bg-black/50 border border-cyan-electric/30 px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric transition-all" 
                      value={formData.teamName}
                      onChange={e => setFormData({...formData, teamName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Target Nodes (Select Events)</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-black/50 border border-cyan-electric/30 p-3 text-sm text-white font-mono focus:outline-none focus:border-cyan-electric appearance-none"
                      onChange={(e) => {
                        if (e.target.value && !selectedEvents.includes(e.target.value)) {
                          handleEventToggle(e.target.value);
                        }
                        e.target.value = "";
                      }}
                    >
                      <option value="" className="bg-black">-- SELECT TARGET NODE --</option>
                      {events
                        .filter(ev => !selectedEvents.includes(ev.slug))
                        .map(ev => (
                          <option key={ev.slug} value={ev.slug} className="bg-black">
                            {ev.name} (₹{ev.registrationFee})
                          </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none text-cyan-electric font-mono">▼</div>
                  </div>

                  {selectedEvents.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 p-3 border border-cyan-electric/20 bg-cyan-electric/5">
                      {selectedEvents.map(slug => {
                        const ev = events.find(e => e.slug === slug);
                        return (
                          <div key={slug} className="flex items-center gap-2 bg-cyan-electric/20 border border-cyan-electric/40 px-3 py-1.5 rounded-sm">
                            <span className="text-[10px] font-mono text-cyan-electric uppercase tracking-tighter">
                              {ev?.name}
                            </span>
                            <button type="button" onClick={() => handleEventToggle(slug)} className="text-magenta-cyber hover:text-white text-xs font-bold px-1">×</button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {isAnyRobowar && (
                  <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 animate-in slide-in-from-bottom-2 duration-500">
                    <p className="text-[10px] text-yellow-500 uppercase font-mono tracking-widest mb-3">Accommodation Required for Robowar team?</p>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, needsAccommodation: true }))}
                        className={`flex-1 py-2 border font-mono text-[10px] transition-all ${formData.needsAccommodation ? 'bg-yellow-500 text-black border-yellow-500' : 'border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10'}`}
                      >
                        YES_PLEASE
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, needsAccommodation: false }))}
                        className={`flex-1 py-2 border font-mono text-[10px] transition-all ${!formData.needsAccommodation ? 'bg-zinc-800 text-white border-zinc-700' : 'border-zinc-800 text-zinc-500'}`}
                      >
                        NO_NEED
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 p-6 border border-cyan-electric/30 bg-black/40 relative">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-electric"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-electric"></div>
                  <h4 className="text-magenta-cyber font-mono tracking-widest text-sm mb-4 uppercase flex justify-between">
                    Combined Energy Cost <span className="text-white">₹{totalFee}</span>
                  </h4>
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-40 h-40 bg-white p-2 rounded flex-shrink-0">
                      <Image src="/payment-techurja.jpeg" alt="Universal Payment QR" width={160} height={160} className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-4 flex-grow w-full">
                      <div className="space-y-2">
                        <label className="text-[10px] text-cyan-electric uppercase font-mono tracking-widest">Transaction ID (UTR)</label>
                        <input required={totalFee > 0} type="text" placeholder="12-digit ID" className="w-full bg-black/50 border border-cyan-electric/30 px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-electric" 
                            value={formData.transactionId} onChange={e => setFormData({...formData, transactionId: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-cyan-electric uppercase font-mono tracking-widest">Payment Proof</label>
                        <input required={totalFee > 0} type="file" accept="image/*" onChange={e => setScreenshot(e.target.files?.[0] || null)}
                          className="w-full text-[10px] text-zinc-400 file:mr-4 file:py-1 file:px-4 file:border-0 file:text-[10px] file:font-mono file:bg-cyan-electric/20 file:text-cyan-electric hover:file:bg-cyan-electric/30 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full cyber-button mt-6 disabled:opacity-50">
                    {loading ? "DATA_TRANSMISSION_ACTIVE..." : "INITIALIZE_UNIVERSAL_REGISTRATION"}
                </button>
              </form>

              {/* Logs */}
              {(loading || transmissionLogs.length > 0) && (
                <div className="mt-8 p-6 bg-black border border-cyan-electric/20 font-mono text-[10px] space-y-2">
                  {transmissionLogs.map((log, i) => (
                    <div key={i} className={`${log.includes('FAILED') ? 'text-magenta-cyber' : 'text-cyan-electric'} flex items-center gap-3`}>
                      <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
                      <span className="animate-pulse">{log}</span>
                    </div>
                  ))}
                  {status && (
                    <div className={`mt-4 p-3 border ${status.ok ? 'border-green-500/30 text-green-400' : 'border-magenta-cyber/30 text-magenta-cyber'} uppercase font-black text-center`}>
                      {status.message}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
