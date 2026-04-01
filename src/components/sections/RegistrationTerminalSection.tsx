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
    name: "",
    email: "",
    phone: "",
    institution: "",
    transactionId: ""
  });

  const [screenshot, setScreenshot] = useState<File | null>(null);

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
      alert("Please select at least one event.");
      return;
    }
    
    setLoading(true);
    setStatus(null);
    setTransmissionLogs(["> STANDBY: PREPARING_TRANSMISSION..."]);

    try {
      // Register each event separately in the DB for easier management
      const promises = selectedEvents.map(slug => {
        const event = events.find(e => e.slug === slug);
        return fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            eventSlug: slug,
            eventName: event?.name,
            paymentScreenshot: screenshot ? `multi_${Date.now()}_${screenshot.name}` : "TERMINAL_MULTI_REG"
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
        viewport={{ once: true }}
        className="terminal-panel neon-border p-0 overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-cyan-electric/20 border-b border-cyan-electric p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e] animate-pulse"></span>
            <span className="font-mono text-xs text-cyan-electric tracking-widest">UNIVERSAL REGISTRATION {"//"} LOCK YOUR SLOT</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">v2.6.0</span>
        </div>

        <div className="p-6 md:p-10 relative">
          <div className="absolute inset-0 scanline-mask opacity-50 pointer-events-none"></div>
          
          {submitted ? (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
            >
            <h3 className="text-3xl text-green-400 font-bold mb-4 glitch-hover" data-text="REGISTRATION COMPLETE">REGISTRATION COMPLETE</h3>
            <p className="text-yellow-nuclear font-mono mb-2">{"//"} SLOTS LOCKED & PAYMENT UNDER VERIFICATION</p>
            <p className="text-zinc-500 text-xs mt-8">Your data has been transmitted to the digital arena cores.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Operator Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                    <input required 
                      type="text" 
                      placeholder="type your handle" 
                      className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric focus:shadow-[inset_0_0_10px_rgba(41,244,255,0.2)] transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Comm Link (Email)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                    <input required 
                      type="email" 
                      placeholder="route email packets here" 
                      className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric focus:shadow-[inset_0_0_10px_rgba(41,244,255,0.2)] transition-all" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Faction / Organization</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                    <input required 
                      type="text" 
                      placeholder="declare your faction (college/school/organisation)" 
                      className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric focus:shadow-[inset_0_0_10px_rgba(41,244,255,0.2)] transition-all" 
                      value={formData.institution}
                      onChange={e => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                    <input required 
                      type="tel" 
                      placeholder="enter comms line" 
                      className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-electric focus:shadow-[inset_0_0_10px_rgba(41,244,255,0.2)] transition-all" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-magenta-cyber uppercase font-mono tracking-widest">Target Events (Select to Add)</label>
                <div className="relative">
                  <select 
                    className="w-full bg-black/50 border border-cyan-electric/30 p-3 text-sm text-white font-mono focus:outline-none focus:border-cyan-electric appearance-none"
                    onChange={(e) => {
                      if (e.target.value && !selectedEvents.includes(e.target.value)) {
                        handleEventToggle(e.target.value);
                      }
                      e.target.value = ""; // Reset select
                    }}
                  >
                    <option value="" className="bg-black">-- INITIALIZE SELECTION --</option>
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

                {/* Selected Events Chips */}
                {selectedEvents.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 p-3 border border-cyan-electric/20 bg-cyan-electric/5">
                    {selectedEvents.map(slug => {
                      const ev = events.find(e => e.slug === slug);
                      return (
                        <div key={slug} className="flex items-center gap-2 bg-cyan-electric/20 border border-cyan-electric/40 px-3 py-1.5 rounded-sm">
                          <span className="text-[10px] font-mono text-cyan-electric uppercase tracking-tighter">
                            {ev?.name}
                          </span>
                          <button 
                            type="button"
                            onClick={() => handleEventToggle(slug)}
                            className="text-magenta-cyber hover:text-white transition-colors text-xs font-bold px-1"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Payment Section */}
              <div className="mt-8 p-6 border border-cyan-electric/30 bg-black/40 relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-electric"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-electric"></div>
                
                <h4 className="text-magenta-cyber font-mono tracking-widest text-sm mb-4 uppercase flex justify-between">
                  Universal Payment Gateway
                  <span className="text-white">TOTAL: ₹{totalFee}</span>
                </h4>
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="w-full max-w-[200px] aspect-square bg-white p-2 rounded flex-shrink-0 relative overflow-hidden group">
                    <Image src="/payment-techurja.jpeg" alt="Universal Payment QR" width={200} height={200} className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-cyan-electric/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="space-y-4 flex-grow w-full">
                    <p className="text-[10px] sm:text-sm font-mono text-zinc-400">Scan the QR code to pay the total fee. All selections will be verified manually.</p>
                    
                    <div className="space-y-2">
                      <label className="text-xs text-cyan-electric uppercase font-mono tracking-widest">Transaction ID (UTR)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-cyan-electric font-mono">&gt;</span>
                        <input required 
                          type="text" 
                          placeholder="12-digit UTR" 
                          className="w-full bg-black/50 border border-cyan-electric/30 pl-8 pr-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-cyan-electric focus:shadow-[inset_0_0_10px_rgba(41,244,255,0.2)] transition-all" 
                          value={formData.transactionId}
                          onChange={e => setFormData({...formData, transactionId: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-cyan-electric uppercase font-mono tracking-widest">Payment Screenshot</label>
                      <input
                        required
                        type="file"
                        accept="image/*"
                        onChange={e => setScreenshot(e.target.files?.[0] || null)}
                        className="w-full text-[10px] sm:text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-mono file:bg-cyan-electric/20 file:text-cyan-electric hover:file:bg-cyan-electric/30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-4 pt-4 border-t border-cyan-electric/20">
                <input required type="checkbox" id="human-check" className="mt-1 w-4 h-4 accent-magenta-cyber bg-black border-cyan-electric" />
                <label htmlFor="human-check" className="text-sm text-ink cursor-pointer font-mono">Confirm you are a human operator and the payment transaction is accurate.</label>
              </div>

              <button type="submit" disabled={loading} className="w-full cyber-button mt-6 group disabled:opacity-50">
                <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-magenta-cyber group-hover:to-cyan-electric transition-all">
                  {loading ? "TRANSMITTING DATA..." : "SUBMIT UNIVERSAL REGISTRATION"}
                </span>
              </button>
              </form>
              )}

              {/* Transmission Terminal Display */}
              {(loading || transmissionLogs.length > 0) && !submitted && (
              <div className="mt-8 p-6 bg-black border border-cyan-electric/20 font-mono text-[10px] md:text-xs space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-electric/10 animate-pulse"></div>
              {transmissionLogs.map((log, i) => (
                <div key={i} className={`${log.includes('FAILED') || log.includes('REJECTED') ? 'text-magenta-cyber' : 'text-cyan-electric'} flex items-center gap-3`}>
                  <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
                  <span className="animate-pulse">{log}</span>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-white/40 italic">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                  <span>WAITING_FOR_HANDSHAKE...</span>
                </div>
              )}
              {status && (
                <div className={`mt-4 p-3 border ${status.ok ? 'border-green-500/30 bg-green-500/5 text-green-400' : 'border-magenta-cyber/30 bg-magenta-cyber/5 text-magenta-cyber'} uppercase font-black tracking-widest text-center`}>
                  {status.message}
                </div>
              )}
              </div>
              )}
              </div>
          {/* Transmission Terminal Display */}
          {(loading || transmissionLogs.length > 0) && (
            <div className="mt-8 p-6 bg-black border border-cyan-electric/20 font-mono text-[10px] md:text-xs space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-electric/10 animate-pulse"></div>
              {transmissionLogs.map((log, i) => (
                <div key={i} className={`${log.includes('FAILED') || log.includes('REJECTED') ? 'text-magenta-cyber' : 'text-cyan-electric'} flex items-center gap-3`}>
                  <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
                  <span className="animate-pulse">{log}</span>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-white/40 italic">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                  <span>WAITING_FOR_HANDSHAKE...</span>
                </div>
              )}
              {status && (
                <div className={`mt-4 p-3 border ${status.ok ? 'border-green-500/30 bg-green-500/5 text-green-400' : 'border-magenta-cyber/30 bg-magenta-cyber/5 text-magenta-cyber'} uppercase font-black tracking-widest text-center`}>
                  {status.message}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
