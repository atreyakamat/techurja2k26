import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { TransmissionVenueSection } from "@/components/sections/TransmissionVenueSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { RegistrationTerminalSection } from "@/components/sections/RegistrationTerminalSection";
import { OpsFeedSection } from "@/components/sections/OpsFeedSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-slate-100">
      <Navbar />

      <div className="flex w-full flex-col">
        <HeroSection />
        <EventsSection />
        <TransmissionVenueSection />
        <TimelineSection />
        <RegistrationTerminalSection />
        {/* <OpsFeedSection /> */}
        <FAQSection />
        <FooterSection />
      </div>
    </main>
  );
}
