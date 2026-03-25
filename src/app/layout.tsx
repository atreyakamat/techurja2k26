import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TECHURJA 2K26 | Cyberpunk Tech Fest",
  description:
    "Enter the system. Explore robotics, coding, puzzle, and school-level events at TECHURJA 2K26.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-zinc-100 pb-[30px] relative">
        <div className="crt-noise"></div>
        {children}
        <div className="ticker-wrap flex items-center">
          <div className="whitespace-nowrap animate-[scroll_20s_linear_infinite] inline-block">
            // SYSTEM: ONLINE &middot; LATENCY: 7ms &middot; TERRITORY: GOA // AITD NODE ACTIVE &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; // SYSTEM: ONLINE &middot; LATENCY: 7ms &middot; TERRITORY: GOA // AITD NODE ACTIVE
          </div>
        </div>
      </body>
    </html>
  );
}
