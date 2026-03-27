"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I register my unit for the combat arena?",
    answer: "Initiate the 'EXECUTE LOCK-IN' protocol on the registration terminal. Ensure all operator packets (details) are correctly routed to our intake nodes."
  },
  {
    question: "What hardware specifications are required for participation?",
    answer: "Most technical protocols (events) provide the necessary hardware on-site. For 'CODE SIEGE' or 'CTF Hackathon', bringing your own portable computation unit (laptop) is recommended."
  },
  {
    question: "Are there any credit (registration) fees?",
    answer: "Decryption of fee schedules is currently available on each event's specific protocol page. Some events may require a small contribution to the grid energy pool."
  },
  {
    question: "Can I switch combat units (teams) after lockdown?",
    answer: "Lockdown is final. However, you may contact the system administrators (event coordinators) for manual override in extreme tactical emergencies."
  }
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      <div className="mb-12 border-b border-cyan-electric/30 pb-4">
        <p className="text-xs tracking-[0.2em] text-magenta-cyber uppercase mb-2 font-bold font-mono">DECRYPTION LOGS</p>
        <h2 className="text-4xl md:text-5xl text-white font-black tracking-tight">Frequently Asked Packets</h2>
        <p className="text-ink mt-2">Answers to your most queried packets regarding TECHURJA 2K26.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`terminal-panel overflow-hidden transition-all duration-300 ${activeIndex === i ? 'border-cyan-electric shadow-[0_0_15px_rgba(41,244,255,0.2)]' : 'border-cyan-electric/20'}`}
          >
            <button
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className="font-bold text-white group-hover:text-cyan-electric transition-colors pr-4">
                <span className="text-magenta-cyber mr-2 font-mono text-sm">[Q]</span> {faq.question}
              </span>
              <ChevronDown 
                className={`text-cyan-electric transition-transform duration-300 ${activeIndex === i ? 'rotate-180' : ''}`} 
                size={20} 
              />
            </button>
            
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="pt-4 mt-4 border-t border-cyan-electric/10 text-ink text-sm leading-relaxed">
                    <span className="text-cyan-electric mr-2 font-mono text-sm">[A]</span> {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
