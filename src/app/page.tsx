import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { OpsFeedSection } from "@/components/sections/OpsFeedSection";
import { TransmissionVenueSection } from "@/components/sections/TransmissionVenueSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { RegistrationTerminalSection } from "@/components/sections/RegistrationTerminalSection";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-slate-100">
      <Navbar />

      <div className="flex w-full flex-col">
        <HeroSection />
        <TimelineSection />
        <EventsSection />
        <OpsFeedSection />
        <TransmissionVenueSection />
        <RegistrationTerminalSection />
        <FAQSection />
      </div>
    </main>
  );
}
