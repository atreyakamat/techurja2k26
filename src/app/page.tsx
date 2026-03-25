import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { TransmissionVenueSection } from "@/components/sections/TransmissionVenueSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { RegistrationTerminalSection } from "@/components/sections/RegistrationTerminalSection";

export default function Home() {
  return (
    <div className="relative overflow-x-clip font-sans">
      <Navbar />

      <main className="flex w-full flex-col">
        <HeroSection />
        <EventsSection />
        <TransmissionVenueSection />
        <TimelineSection />
        <RegistrationTerminalSection />
      </main>
    </div>
  );
}
