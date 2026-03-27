"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  {
    title: "Festival",
    links: [
      { label: "About", href: "#" },
      { label: "Our Mission", href: "#" },
      { label: "Techurja v2.0", href: "#" },
      { label: "Team Nodes", href: "#" },
    ],
  },
  {
    title: "Combat Events",
    links: [
      { label: "Robo Wars", href: "#" },
      { label: "Code Siege", href: "#" },
      { label: "Neuro Rift", href: "#" },
      { label: "Cyber Drift", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Code of Conduct", href: "#" },
      { label: "Discord Hub", href: "#" },
      { label: "Social Packets", href: "#" },
      { label: "Media Feed", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Protocol", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Security Clearance", href: "#" },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="relative mt-20 pb-16 pt-20 border-t border-cyan-electric/20 overflow-hidden">
      {/* Decorative scanline for footer */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-electric/5 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-sm tracking-[0.2em] text-cyan-electric uppercase mb-6 border-l-2 border-magenta-cyber pl-3">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display text-lg tracking-[0.2em] text-white">
              TECHURJA <span className="text-cyan-electric">2K26</span>
            </span>
            <p className="text-[10px] font-mono text-zinc-500 uppercase mt-2">
              &copy; 2026 AITD Goa &middot; Digital Arena Terminal
            </p>
          </div>

          <div className="flex gap-4">
            {[Instagram, Twitter, Github, Linkedin].map((Icon, i) => (
              <Link 
                key={i} 
                href="#" 
                className="w-10 h-10 border border-cyan-electric/20 flex items-center justify-center hover:bg-cyan-electric hover:text-black transition-all group"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker placeholder since it is in layout, but let's make sure footer doesn't overlap it */}
      <div className="h-8"></div>
    </footer>
  );
}
