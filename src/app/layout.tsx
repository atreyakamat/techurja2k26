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
  title: "TECHURJA 2K26 | DIGITAL ARENA TERMINAL",
  description:
    "Agnel Institute of Technology & Design's high-octane cyberpunk tech festival. Hack, build, and battle through the grid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-black text-zinc-100 pb-[30px] relative">
        <div className="crt-noise"></div>
        
        {children}

        {/* Bottom Status Ticker Bar */}
        <div className="ticker-wrap flex items-center">
          <div className="whitespace-nowrap animate-[scroll_30s_linear_infinite] inline-block pr-12">
            {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot;
          </div>
          <div className="whitespace-nowrap animate-[scroll_30s_linear_infinite] inline-block pr-12">
            {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot;
          </div>
        </div>
      </body>
    </html>
  );
}
