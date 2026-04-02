import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
});

const rajdhani = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TECHURJA 2K26 | DIGITAL ARENA TERMINAL",
  description:
    "Agnel Institute of Technology & Design's high-octane cyberpunk tech festival. Hack, build, and battle through the grid.",
  openGraph: {
    title: "TECHURJA 2K26 | DIGITAL ARENA TERMINAL",
    description: "ENTER THE DIGITAL ARENA. Agnel Institute of Technology & Design's high-octane tech festival.",
    url: "https://techurja.aitdgoa.edu.in",
    siteName: "TECHURJA 2K26",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image to public/
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TECHURJA 2K26 | DIGITAL ARENA TERMINAL",
    description: "ENTER THE DIGITAL ARENA. Agnel Institute of Technology & Design's high-octane tech festival.",
    images: ["/og-image.jpg"],
  },
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
      <body className="min-h-full bg-black text-zinc-100 relative">
        <div className="crt-noise"></div>

        {children}

        {/* Magenta Status Ticker Bar (Top) */}
        <div className="ticker-wrap-magenta flex items-center">
          <div className="whitespace-nowrap animate-[scroll_45s_linear_infinite] animate-scroll inline-block pr-12">
            {"//"} NOTICE: THE PRIZE MONEY WILL BE TRANSFERRED TO THE WINNING TEAM’S BANK ACCOUNT VIA NEFT WITHIN 15 DAYS AFTER THE EVENT. &middot; PARTICIPANTS SHOULD CARRY THEIR VALID, ORIGINAL COLLEGE ID PROOFS. &middot; PARTICIPANTS ARE REQUESTED TO FURNISH THEIR BANKING PROOFS IN THE FORM OF EITHER CANCELLED CHEQUE OR A COPY OF THE FIRST PAGE OF THE BANK PASSBOOK FOR THE TRANSFER OF PRIZE MONEY. &middot; {"//"} NOTICE: THE PRIZE MONEY WILL BE TRANSFERRED TO THE WINNING TEAM’S BANK ACCOUNT VIA NEFT WITHIN 15 DAYS AFTER THE EVENT. &middot; PARTICIPANTS SHOULD CARRY THEIR VALID, ORIGINAL COLLEGE ID PROOFS. &middot; PARTICIPANTS ARE REQUESTED TO FURNISH THEIR BANKING PROOFS IN THE FORM OF EITHER CANCELLED CHEQUE OR A COPY OF THE FIRST PAGE OF THE BANK PASSBOOK FOR THE TRANSFER OF PRIZE MONEY. &middot;
          </div>
          <div className="whitespace-nowrap animate-[scroll_45s_linear_infinite] animate-scroll inline-block pr-12">
            {"//"} NOTICE: THE PRIZE MONEY WILL BE TRANSFERRED TO THE WINNING TEAM’S BANK ACCOUNT VIA NEFT WITHIN 15 DAYS AFTER THE EVENT. &middot; PARTICIPANTS SHOULD CARRY THEIR VALID, ORIGINAL COLLEGE ID PROOFS. &middot; PARTICIPANTS ARE REQUESTED TO FURNISH THEIR BANKING PROOFS IN THE FORM OF EITHER CANCELLED CHEQUE OR A COPY OF THE FIRST PAGE OF THE BANK PASSBOOK FOR THE TRANSFER OF PRIZE MONEY. &middot; {"//"} NOTICE: THE PRIZE MONEY WILL BE TRANSFERRED TO THE WINNING TEAM’S BANK ACCOUNT VIA NEFT WITHIN 15 DAYS AFTER THE EVENT. &middot; PARTICIPANTS SHOULD CARRY THEIR VALID, ORIGINAL COLLEGE ID PROOFS. &middot; PARTICIPANTS ARE REQUESTED TO FURNISH THEIR BANKING PROOFS IN THE FORM OF EITHER CANCELLED CHEQUE OR A COPY OF THE FIRST PAGE OF THE BANK PASSBOOK FOR THE TRANSFER OF PRIZE MONEY. &middot;
          </div>
        </div>

        {/* Bottom Status Ticker Bar (Cyan) */}
        <div className="ticker-wrap flex items-center">

          <div className="whitespace-nowrap animate-[scroll_30s_linear_infinite] animate-scroll inline-block pr-12">
            {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot;
          </div>
          <div className="whitespace-nowrap animate-[scroll_30s_linear_infinite] animate-scroll inline-block pr-12">
            {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot; {"//"} SYSTEM: ONLINE &middot; TERRITORY: GOA // NODE: AITD ASSAGAO &middot; LATENCY: 7ms &middot; TECHURJA 2K26 DIGITAL ARENA TERMINAL &middot;
          </div>
        </div>
      </body>
    </html>
  );
}
